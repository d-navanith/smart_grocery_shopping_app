import React, { useState, useMemo } from 'react';
import {
  Star,
  Plus,
  Minus,
  Heart,
  ChevronRight,
  ShoppingCart,
  ShoppingBasket,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { TranslationDictionary } from '../translations';

interface ShopViewProps {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  onUpdateCartQty: (productId: string, weight: string | undefined, delta: number) => void;
  onSelectProduct: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  onNavigateHome: () => void;
  t: TranslationDictionary;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  cart,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onUpdateCartQty,
  onSelectProduct,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  onNavigateHome,
  t
}) => {
  // Filter States (in Lei)
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'priceLow' | 'priceHigh' | 'rating' | 'freshness'>('default');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const itemsPerPage = 24;

  const ALL_BRANDS = [
    'Wijaya Products',
    'Hiruni Products',
    'Annam',
    'Maliban',
    'MD Foods',
    'Harischandra',
    'Araliya Lanka',
    'Pure Ceylon Spices',
    'Ceylon Harvest',
    'Ceylon Seafood Hub',
    'Maggi Lanka',
    'Nestlé',
    'Watawala',
    'Dilmah Ceylon Tea',
    'Traditional Ceylon Crafts'
  ];

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(200);
    setMinRating(0);
    setSelectedBrands([]);
    setSelectedProductTypes([]);
    setOnlyInStock(false);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      let matchCat = true;
      if (selectedCategory !== 'All' && selectedCategory !== 'All Categories' && selectedCategory !== 'All Products') {
        const catLower = selectedCategory.toLowerCase();
        if (catLower.includes('spice') || catLower.includes('curry')) {
          matchCat = p.category === 'Spices & Curry' || p.category.includes('Spice');
        } else if (catLower.includes('rice') && (catLower.includes('dhal') || catLower.includes('flour') || catLower.includes('grain'))) {
          matchCat = p.category === 'Rice & Grains' || p.category === 'Flour & Grains';
        } else if (catLower.includes('rice') || catLower.includes('grain')) {
          matchCat = p.category === 'Rice & Grains';
        } else if (catLower.includes('flour')) {
          matchCat = p.category === 'Flour & Grains';
        } else if (catLower.includes('fish') || catLower.includes('sambal') || catLower.includes('pickle')) {
          matchCat = p.category === 'Dried Fish & Sambals' || p.category === 'Jams & Sweet Preserves';
        } else if (catLower.includes('jam')) {
          matchCat = p.category === 'Jams & Sweet Preserves';
        } else if (catLower.includes('tea') || catLower.includes('coffee') || catLower.includes('drink') || catLower.includes('beverage')) {
          matchCat = p.category === 'Tea, Coffee & Beverages';
        } else if (catLower.includes('biscuit') || catLower.includes('snack') || catLower.includes('noodle')) {
          matchCat = p.category === 'Biscuits & Snacks';
        } else if (catLower.includes('kitchen') || catLower.includes('utensil') || catLower.includes('pot') || catLower.includes('pan')) {
          matchCat = p.category === 'Kitchenware & Utensils';
        } else if (catLower.includes('coconut')) {
          matchCat = p.category === 'Coconut Products';
        } else {
          matchCat = p.category.toLowerCase().includes(catLower);
        }
      }

      const matchSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPrice = p.price <= maxPrice;
      const matchRating = minRating === 0 || p.rating >= minRating;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchStock = !onlyInStock || p.stock > 0;
      const matchType = selectedProductTypes.length === 0 ||
        (selectedProductTypes.includes('Fresh Produce') && (p.category.includes('Fruit') || p.category.includes('Veg') || p.isFarmSourced)) ||
        (selectedProductTypes.includes('Packaged Goods') && !p.isFarmSourced) ||
        (selectedProductTypes.includes('Chilled & Frozen') && (p.category.includes('Dairy') || p.category.includes('Meat')));

      return matchCat && matchSearch && matchPrice && matchRating && matchBrand && matchStock && matchType;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, selectedBrands, onlyInStock, selectedProductTypes]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'priceLow') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceHigh') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'freshness') list.sort((a, b) => b.aiFreshnessScore - a.aiFreshnessScore);
    return list;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice((currentPageNum - 1) * itemsPerPage, currentPageNum * itemsPerPage);

  const categoryCounts = useMemo(() => {
    let spicesCount = 0;
    let riceDhalCount = 0;
    let flourCount = 0;
    let driedFishCount = 0;
    let teaCoffeeCount = 0;
    let biscuitsNoodlesCount = 0;
    let kitchenwareCount = 0;

    products.forEach(p => {
      const cat = p.category;
      if (cat === 'Spices & Curry') spicesCount++;
      else if (cat === 'Rice & Grains') riceDhalCount++;
      else if (cat === 'Flour & Grains') flourCount++;
      else if (cat === 'Dried Fish & Sambals' || cat === 'Jams & Sweet Preserves' || cat === 'Coconut Products') driedFishCount++;
      else if (cat === 'Tea, Coffee & Beverages') teaCoffeeCount++;
      else if (cat === 'Biscuits & Snacks') biscuitsNoodlesCount++;
      else if (cat === 'Kitchenware & Utensils') kitchenwareCount++;
    });

    return {
      all: products.length,
      spices: spicesCount,
      riceDhal: riceDhalCount,
      flour: flourCount,
      driedFish: driedFishCount,
      teaCoffee: teaCoffeeCount,
      biscuitsNoodles: biscuitsNoodlesCount,
      kitchenware: kitchenwareCount
    };
  }, [products]);

  const hasActiveFilters = selectedCategory !== 'All' || maxPrice < 200 || minRating > 0 || selectedBrands.length > 0 || selectedProductTypes.length > 0 || onlyInStock || searchQuery;

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO / BREADCRUMB BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] mb-1.5">
              <button onClick={onNavigateHome} className="hover:underline">
                {t.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
              <span className="text-[#0A6847] dark:text-[#80F6C7] font-bold">{t.breadcrumbShop}</span>
              {selectedCategory !== 'All' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
                  <span className="text-[#F96D26] font-bold">{selectedCategory}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight leading-tight">
              <span className="text-[#0A6847] dark:text-white">Authentic Sri Lankan </span>
              <span className="text-[#F96D26]">Groceries</span>
            </h1>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <img src="/figma_icon_delivery.png" alt="" className="w-8 h-8 object-contain shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#1B8057] dark:text-[#80F6C7] block">Island-to-Door Bucharest & RO</span>
              <span className="text-[#003D25] dark:text-zinc-300 text-[11px]">{t.depotNotice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: FILTER SIDEBAR (LEFT) + PRODUCT GRID (RIGHT) */}
      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDEBAR: FILTERS (FIGMA MINT & GREEN THEME) */}
        <aside
          className={`lg:col-span-3 rounded-xl p-5 border space-y-6 ${
            isDarkMode
              ? 'bg-[#141816] border-[#15875D]/40 text-zinc-200'
              : 'bg-[#F0FAF3] border-[#15875D] text-[#003D25] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#15875D]/25">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0A6847] dark:text-[#80F6C7]" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#0A6847] dark:text-white">
                {t.filtersTitle}
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-bold text-[#F96D26] hover:underline"
              >
                {t.clearFilters}
              </button>
            )}
          </div>

          {/* 1. Category Filter (Real Groceries) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7]">
              FOOD CATEGORIES
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { key: 'All', label: 'All Products', count: categoryCounts.all },
                { key: 'Spices & Curry', label: 'Ceylon Spices & Curry Powders', count: categoryCounts.spices },
                { key: 'Rice & Grains', label: 'Rice, Dhal & Grains', count: categoryCounts.riceDhal },
                { key: 'Flour & Grains', label: 'Flour & Traditional Mixes', count: categoryCounts.flour },
                { key: 'Dried Fish & Sambals', label: 'Dried Fish, Sambals & Pickles', count: categoryCounts.driedFish },
                { key: 'Tea, Coffee & Beverages', label: 'Tea, Coffee & Malt Drinks', count: categoryCounts.teaCoffee },
                { key: 'Biscuits & Snacks', label: 'Maliban Biscuits & Noodles', count: categoryCounts.biscuitsNoodles },
                { key: 'Kitchenware & Utensils', label: 'Traditional Kitchenware', count: categoryCounts.kitchenware }
              ].map(cat => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <label
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#0A6847] text-white font-bold shadow-xs'
                        : 'bg-white/80 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 font-semibold text-[#003D25] dark:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        readOnly
                        checked={isSelected}
                        className="accent-[#F8C519] rounded cursor-pointer"
                      />
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-[#F8C519] text-[#664E00]'
                          : 'bg-[#F2F7F4] dark:bg-zinc-700 text-[#1B8057] dark:text-emerald-300'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range Slider in LEI */}
          <div className="space-y-3 pt-3 border-t border-[#15875D]/20">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7]">
                {t.filterPriceRange}
              </h4>
              <span className="text-xs font-bold text-[#0A6847] dark:text-[#80F6C7]">
                5 lei — {maxPrice} lei
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0A6847] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-semibold text-[#1B8057] dark:text-zinc-300">
              <span>5 lei</span>
              <span>100 lei</span>
              <span>200 lei</span>
            </div>
          </div>

          {/* 3. Review Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-[#15875D]/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7]">
              {t.filterRating}
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { stars: 5, label: '5.0 ★★★★★' },
                { stars: 4, label: '4.0 ★★★★☆' }
              ].map(r => (
                <label
                  key={r.stars}
                  onClick={() => setMinRating(minRating === r.stars ? 0 : r.stars)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                    minRating === r.stars
                      ? 'bg-[#F8C519] text-[#664E00] font-bold'
                      : 'bg-white/80 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={minRating === r.stars}
                    className="accent-[#0A6847] rounded cursor-pointer"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.stars ? 'fill-[#F96D26] text-[#F96D26]' : 'text-slate-300 dark:text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Authentic Sri Lankan Brands */}
          <div className="space-y-2 pt-3 border-t border-[#15875D]/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7]">
              {t.filterBrands}
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
              {ALL_BRANDS.map(brand => (
                <label
                  key={brand}
                  onClick={() => handleToggleBrand(brand)}
                  className="flex items-center justify-between p-1.5 rounded-lg cursor-pointer bg-white/70 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedBrands.includes(brand)}
                      className="accent-[#0A6847] rounded cursor-pointer"
                    />
                    <span className="font-semibold text-[#003D25] dark:text-zinc-200">{brand}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 5. In Stock Only */}
          <div className="space-y-2 pt-3 border-t border-[#15875D]/20">
            <label
              onClick={() => setOnlyInStock(!onlyInStock)}
              className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-white/80 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 text-[#003D25] dark:text-zinc-200 transition text-xs font-semibold"
            >
              <input
                type="checkbox"
                readOnly
                checked={onlyInStock}
                className="accent-[#0A6847] rounded cursor-pointer"
              />
              <span>{t.filterStockOnly}</span>
            </label>
          </div>
        </aside>

        {/* RIGHT MAIN COLUMN: CATALOG & GRID (ATTACHMENT 3 EXACT) */}
        <section className="lg:col-span-9 space-y-4">
          {/* HORIZONTAL CATEGORY TABS (REAL GROCERIES) */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold tracking-wider uppercase overflow-x-auto select-none pt-1 pb-1">
            {[
              { label: 'ALL PRODUCTS', key: 'All' },
              { label: 'SPICES & CURRY', key: 'Spices & Curry' },
              { label: 'RICE, DHAL & FLOUR', key: 'Rice & Grains' },
              { label: 'DRIED FISH & SAMBALS', key: 'Dried Fish & Sambals' },
              { label: 'TEA, COFFEE & DRINKS', key: 'Tea, Coffee & Beverages' },
              { label: 'BISCUITS & NOODLES', key: 'Biscuits & Snacks' },
              { label: 'KITCHENWARE', key: 'Kitchenware & Utensils' }
            ].map(tab => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.key);
                  }}
                  className={`pb-1 transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#0A6847] dark:text-[#80F6C7] underline underline-offset-8 decoration-2 font-black'
                      : 'text-[#475467] dark:text-zinc-400 hover:text-[#0A6847] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Top Bar: Results Count, Active Filter Chips, Sort Dropdown */}
          <div
            className={`p-3.5 sm:p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-[#141816] border-zinc-800 text-zinc-300'
                : 'bg-[#F2F7F4] border-[#15875D]/30 text-[#003D25]'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#1B8057]">
                Showing: {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0A6847] text-white text-[11px] font-semibold">
                  {selectedCategory === 'Staples & Grains'
                    ? 'Rice & Grains'
                    : selectedCategory === 'Vegetables'
                    ? 'Veggies'
                    : selectedCategory === 'Fruits'
                    ? 'Fruits'
                    : selectedCategory === 'Pantry'
                    ? 'Ceylon Spices'
                    : selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice < 200 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F8C519] text-[#664E00] text-[11px] font-bold">
                  Under {maxPrice} lei
                  <button onClick={() => setMaxPrice(200)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] font-bold text-[#F96D26] hover:underline ml-1"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-semibold">
              <span className="text-[#1B8057]">{t.sortByLabel}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3 py-1.5 text-xs font-bold text-[#003D25] dark:text-white focus:outline-none focus:border-[#0A6847]"
              >
                <option value="default">{t.sortFeatured}</option>
                <option value="priceLow">{t.sortPriceLow}</option>
                <option value="priceHigh">{t.sortPriceHigh}</option>
                <option value="rating">{t.sortRating}</option>
                <option value="freshness">AI Freshness</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid — Exact Figma Popular Products Card Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product, idx) => {
              const inCartItem = cart.find(i => i.product.id === product.id);
              const isWishlisted = wishlist.includes(product.id);
              const discountPercent =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : null;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  style={{ animationDelay: `${(idx % 9) * 45}ms` }}
                  className={`group rounded-lg p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between border animate-fade-in-up ${
                    isDarkMode
                      ? 'bg-[#141816] border-zinc-800 hover:border-[#15875D]'
                      : 'bg-white border-transparent hover:border-[#15875D] shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  {/* Top Image & Badges */}
                  <div className="relative">
                    <div className="w-full h-48 rounded-md overflow-hidden bg-white dark:bg-zinc-900 flex items-center justify-center p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/figma_prod_rice_sack.png';
                        }}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108 select-none"
                      />
                    </div>

                    {discountPercent && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#F96D26] text-white text-[10px] font-bold shadow-xs">
                        -{discountPercent}%
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border transition ${
                        isWishlisted
                          ? 'bg-[#FFF4EE] border-[#F96D26] text-[#F96D26]'
                          : 'bg-[#F2F7F4] border-[#15875D]/30 text-[#1B8057] hover:text-[#F96D26]'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#F96D26]' : ''}`} />
                    </button>
                  </div>

                  {/* Figma Card Details: Title + Price Row, Unit Pill + Old Price Row, Bottom-Right Add Button */}
                  <div className="mt-4 pt-2 space-y-2.5">
                    {/* Ceylon Origin Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0A6847] dark:text-emerald-400">
                      <img src="/sri_lanka_flag.svg" alt="Sri Lanka" className="w-3.5 h-2.5 object-cover rounded-xs" />
                      <span>Ceylon Sourced</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="text-base font-bold text-black dark:text-white line-clamp-1 group-hover:text-[#0A6847] transition"
                        title={product.title}
                      >
                        {product.title}
                      </h4>
                      <span className="text-base font-bold text-black dark:text-white shrink-0">
                        {product.price.toFixed(2)} lei
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-[#F2F7F4] dark:bg-zinc-800 text-[#9E9E9E] dark:text-zinc-300 text-xs font-medium">
                        {product.unitWeight || product.unit}
                      </span>
                      {product.originalPrice ? (
                        <span className="text-xs font-medium text-[#C7C7C7] line-through">
                          {product.originalPrice.toFixed(2)} lei
                        </span>
                      ) : (
                        <span className="text-xs text-[#1B8057] font-medium">In Stock</span>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7]">
                        <Star className="w-3.5 h-3.5 fill-[#F8C519] text-[#F8C519]" />
                        <span>{product.rating % 1 === 0 ? product.rating.toFixed(0) : product.rating}</span>
                      </div>

                      {inCartItem ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2.5 bg-[#0A6847] text-white h-[38px] px-3 rounded-lg shadow-xs"
                        >
                          <button
                            onClick={() => onUpdateCartQty(product.id, inCartItem.selectedWeight, -1)}
                            className="text-white hover:text-[#F8C519] font-bold p-0.5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-bold min-w-[16px] text-center">
                            {inCartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQty(product.id, inCartItem.selectedWeight, 1)}
                            className="text-white hover:text-[#F8C519] font-bold p-0.5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1, product.availableWeights?.[0] || '1kg');
                          }}
                          className="h-[38px] px-4 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                          title={t.addToCart}
                        >
                          <span>Add</span>
                          <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedProducts.length === 0 && (
            <div className="p-12 text-center rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-dashed border-[#15875D] space-y-3">
              <ShoppingBasket className="w-12 h-12 text-[#1B8057] mx-auto" />
              <h4 className="font-bold text-base text-[#003D25] dark:text-zinc-200">
                No products match your selected filters
              </h4>
              <p className="text-xs text-[#1B8057]">
                Try expanding the price range or resetting the category filter.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-md bg-[#0A6847] text-white text-xs font-semibold"
              >
                {t.clearFilters}
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-md border border-[#15875D]/40 flex items-center justify-center text-xs font-bold disabled:opacity-40 hover:bg-[#F0FAF3]"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPageNum(page)}
                    className={`w-9 h-9 rounded-md text-xs font-bold transition ${
                      currentPageNum === page
                        ? 'bg-[#0A6847] text-white shadow-sm'
                        : 'border border-[#15875D]/40 hover:bg-[#F0FAF3] text-[#003D25] dark:text-zinc-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-md border border-[#15875D]/40 flex items-center justify-center text-xs font-bold disabled:opacity-40 hover:bg-[#F0FAF3]"
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
