import React, { useState, useMemo } from 'react';
import {
  Star,
  Plus,
  Minus,
  Heart,
  ChevronRight,
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
  const itemsPerPage = 12;

  const ALL_BRANDS = ['Araliya Lanka', 'Ceylon Fresh Greens', 'Pure Ceylon Spices', 'Maggi Lanka', 'Dilmah', 'Munchee / Maliban', 'Ceylon Bakery Bucharest', 'Ceylon Orchard'];

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleProductType = (ptype: string) => {
    setSelectedProductTypes(prev =>
      prev.includes(ptype) ? prev.filter(t => t !== ptype) : [...prev, ptype]
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
      if (selectedCategory !== 'All' && selectedCategory !== 'All Categories') {
        const catLower = selectedCategory.toLowerCase();
        if (catLower.includes('rice') || catLower.includes('grain') || catLower.includes('staple')) {
          matchCat = p.category.toLowerCase().includes('staple') || p.category.toLowerCase().includes('grain') || p.title.toLowerCase().includes('rice');
        } else if (catLower.includes('veg') || catLower.includes('fruit')) {
          matchCat = p.category.toLowerCase().includes('veg') || p.category.toLowerCase().includes('fruit') || p.title.toLowerCase().includes('wambatu') || p.title.toLowerCase().includes('brinjal');
        } else if (catLower.includes('spice') || catLower.includes('pantry')) {
          matchCat = p.category.toLowerCase().includes('pantry') || p.category.toLowerCase().includes('spice') || p.title.toLowerCase().includes('curry') || p.title.toLowerCase().includes('cinnamon');
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
    const counts: Record<string, number> = { 'All': products.length };
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const hasActiveFilters = selectedCategory !== 'All' || maxPrice < 200 || minRating > 0 || selectedBrands.length > 0 || selectedProductTypes.length > 0 || onlyInStock || searchQuery;

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* 1. BREADCRUMB BANNER */}
      <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold border transition ${
        isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
            {t.breadcrumbHome}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A6847] dark:text-[#78F9B8] font-black">{t.breadcrumbShop}</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 dark:text-white">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
          🇷🇴 {t.depotNotice}
        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: FILTER SIDEBAR (LEFT) + PRODUCT GRID (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className={`lg:col-span-3 rounded-2xl p-5 border space-y-6 ${
          isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0A6847] dark:text-[#78F9B8]" />
              <h3 className="font-black text-sm uppercase tracking-wider">{t.filtersTitle}</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-bold text-red-500 hover:underline"
              >
                {t.clearFilters}
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              {t.filterCategories}
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
              <label
                onClick={() => setSelectedCategory('All')}
                className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0A6847] dark:text-[#78F9B8] font-black'
                    : 'hover:bg-slate-50 dark:hover:bg-zinc-800 font-semibold text-slate-600 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={selectedCategory === 'All'}
                    className="accent-[#0A6847] rounded cursor-pointer"
                  />
                  <span>{t.catAll}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500">
                  {products.length}
                </span>
              </label>

              {[
                { key: 'Staples & Grains', label: t.catRice },
                { key: 'Fruits & Veg', label: t.catVeg },
                { key: 'Pantry', label: t.catSpices },
                { key: 'Beverages', label: t.catTea },
                { key: 'Bakery', label: t.catBakery },
                { key: 'Snacks', label: t.catSnacks }
              ].map(cat => (
                <label
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
                    selectedCategory === cat.key
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0A6847] dark:text-[#78F9B8] font-black'
                      : 'hover:bg-slate-50 dark:hover:bg-zinc-800 font-semibold text-slate-600 dark:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedCategory === cat.key}
                      className="accent-[#0A6847] rounded cursor-pointer"
                    />
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500">
                    {categoryCounts[cat.key] || 3}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Price Range Slider in LEI */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {t.filterPriceRange}
              </h4>
              <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">
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
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>5 lei</span>
              <span>100 lei</span>
              <span>200 lei</span>
            </div>
          </div>

          {/* 3. Review Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
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
                  className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition ${
                    minRating === r.stars ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold' : 'hover:bg-slate-50 dark:hover:bg-zinc-800'
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
                        className={`w-3.5 h-3.5 ${i < r.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-zinc-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Authentic Sri Lankan Brands */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              {t.filterBrands}
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
              {ALL_BRANDS.map(brand => (
                <label
                  key={brand}
                  onClick={() => handleToggleBrand(brand)}
                  className="flex items-center justify-between p-1 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedBrands.includes(brand)}
                      className="accent-[#0A6847] rounded cursor-pointer"
                    />
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">{brand}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 5. In Stock Only */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <label
              onClick={() => setOnlyInStock(!onlyInStock)}
              className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition text-xs font-semibold"
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

        {/* RIGHT MAIN COLUMN: CATALOG & GRID (MATCHING IMAGE 1 THEME) */}
        <section className="lg:col-span-9 space-y-6">
          {/* Top Bar: Results Count, Active Filter Chips, Sort Dropdown */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
          }`}>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-500">
                {t.showingCount.replace('{count}', String(sortedProducts.length))}
              </span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0A6847] dark:bg-emerald-950 dark:text-[#78F9B8] text-[11px] font-bold">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {maxPrice < 200 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-[11px] font-bold">
                  Sub {maxPrice} lei
                  <button onClick={() => setMaxPrice(200)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] font-black text-red-500 hover:underline ml-1"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
              <span className="text-slate-400">{t.sortByLabel}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#0A6847]"
              >
                <option value="default">{t.sortFeatured}</option>
                <option value="priceLow">{t.sortPriceLow}</option>
                <option value="priceHigh">{t.sortPriceHigh}</option>
                <option value="rating">{t.sortRating}</option>
                <option value="freshness">AI Freshness</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid with Authentic Sri Lankan Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedProducts.map(product => {
              const inCartItem = cart.find(i => i.product.id === product.id);
              const isWishlisted = wishlist.includes(product.id);
              const discountPercent = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 15;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className={`group rounded-2xl p-4 border cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    isDarkMode
                      ? 'bg-[#141816] border-zinc-800 hover:border-emerald-800'
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="relative">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900 flex items-center justify-center p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/prod_white_rice.jpg';
                        }}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#0A6847] text-white shadow-xs">
                        {discountPercent}% REDUCERE
                      </span>
                      {product.isOrganic && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-[#E5A91A] text-amber-950 shadow-xs">
                          CEYLON EXPORT
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition ${
                        isWishlisted
                          ? 'bg-red-50 text-red-500'
                          : 'bg-white/80 dark:bg-zinc-800/80 text-slate-400 hover:text-red-500'
                      }`}
                      title="Adaugă la Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-black tracking-wider">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({product.reviewsCount || 18})</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#0A6847] dark:group-hover:text-[#78F9B8] transition" title={product.title}>
                      {product.title}
                    </h4>

                    <div className="text-[11px] font-bold text-slate-400">
                      {t.weightGramaj} <span className="text-slate-600 dark:text-zinc-300">{product.unitWeight || product.unit}</span>
                    </div>

                    {/* Price in LEI & Add to Cart */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-[#0A6847] dark:text-[#78F9B8]">
                            {product.price.toFixed(2)} lei
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {product.originalPrice.toFixed(2)} lei
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{t.codBadge}</span>
                      </div>

                      {inCartItem ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 bg-[#0A6847] text-white px-2.5 py-1.5 rounded-xl shadow-sm"
                        >
                          <button
                            onClick={() => onUpdateCartQty(product.id, inCartItem.selectedWeight, -1)}
                            className="text-white hover:text-amber-300 font-black"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black min-w-[16px] text-center">
                            {inCartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQty(product.id, inCartItem.selectedWeight, 1)}
                            className="text-white hover:text-amber-300 font-black"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1, '1kg');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs shadow-sm transition active:scale-95"
                          title={t.addToCart}
                        >
                          <ShoppingBasket className="w-3.5 h-3.5" />
                          <span>+ {t.addToCart}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedProducts.length === 0 && (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 space-y-3">
              <ShoppingBasket className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-extrabold text-base text-slate-700 dark:text-zinc-300">Niciun produs nu corespunde filtrelor selectate</h4>
              <p className="text-xs text-slate-400">Încercați să lărgiți intervalul de preț sau să resetați categoriile.</p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-[#0A6847] text-white text-xs font-bold"
              >
                Resetează Filtrele
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-xs font-bold disabled:opacity-40 hover:bg-slate-100"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPageNum(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                      currentPageNum === page
                        ? 'bg-[#0A6847] text-white shadow-sm'
                        : 'border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-xs font-bold disabled:opacity-40 hover:bg-slate-100"
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
