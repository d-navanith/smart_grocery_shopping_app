import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product, CartItem } from '../types';
import { TranslationDictionary } from '../translations';

interface HomeViewProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateShop: () => void;
  onSelectCategory: (cat: string) => void;
  isDarkMode: boolean;
  onOpenAppTour: () => void;
  t: TranslationDictionary;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  onNavigateShop,
  onSelectCategory,
  isDarkMode
}) => {
  // 4 Categories matching Figma "Shop by Categories"
  const FIGMA_CATEGORIES = [
    {
      id: 'veggies',
      title: 'Veggies',
      image: '/figma_cat_veggies.png',
      filterKey: 'Fruits & Veg'
    },
    {
      id: 'fruits',
      title: 'Fruits',
      image: '/figma_cat_fruits.png',
      filterKey: 'Fruits & Veg'
    },
    {
      id: 'rice-grains',
      title: 'Rice & Grains',
      image: '/figma_cat_rice.png',
      filterKey: 'Staples & Grains'
    },
    {
      id: 'spices',
      title: 'Spices',
      image: '/figma_cat_spices.png',
      filterKey: 'Pantry'
    }
  ];

  // Find backing store products so clicking "Add" or the card works seamlessly with Cart & Modals
  const coconutProduct = products.find(p => p.id.includes('coconut')) || products[0];
  const papayaProduct = products.find(p => p.id.includes('papaya')) || products[1] || products[0];
  const riceProduct = products.find(p => p.id.includes('white-rice')) || products[0];
  const onionProduct = products.find(p => p.id.includes('onion')) || products[2] || products[0];

  const FIGMA_POPULAR_CARDS = [
    {
      id: 'pop-coconut',
      displayTitle: 'Coconut',
      unitLabel: 'Unit : 3 pcs',
      displayPrice: 'RS. 546.00',
      oldPrice: 'RS. 600.00',
      image: '/figma_prod_coconut.png',
      product: coconutProduct
    },
    {
      id: 'pop-papaya',
      displayTitle: 'Coconut',
      unitLabel: 'kg: 100g',
      displayPrice: 'RS. 145.00',
      oldPrice: '',
      image: '/figma_prod_papaya.png',
      product: papayaProduct
    },
    {
      id: 'pop-rice',
      displayTitle: 'Coconut',
      unitLabel: 'kg: 1kg',
      displayPrice: 'RS. 242.00',
      oldPrice: 'RS. 250.00',
      image: '/figma_prod_rice_sack.png',
      product: riceProduct
    },
    {
      id: 'pop-onions',
      displayTitle: 'Coconut',
      unitLabel: 'Unit : 3 pcs',
      displayPrice: 'RS. 546.00',
      oldPrice: 'RS. 600.00',
      image: '/figma_prod_onions.png',
      product: onionProduct
    }
  ];

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* 1. HERO SECTION (FIGMA EXACT #F2F7F4 BACKGROUND) */}
      <section
        className={`w-full transition-colors ${
          isDarkMode ? 'bg-[#0E1E17] text-white' : 'bg-[#F2F7F4] text-black'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-6 lg:pt-4 pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative min-h-[500px] lg:min-h-[552px]">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 py-8 lg:py-12 space-y-5 z-10">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-[42px] font-bold text-black dark:text-white leading-tight tracking-tight">
                Taste of Home:
              </h2>
              <h1 className="text-4xl sm:text-[54px] font-bold text-[#1B8057] dark:text-[#6EE7B7] leading-[1.12] tracking-tight">
                Daily Ceylon Groceries
                <br />
                in Bucharest
              </h1>
            </div>

            <p className="text-[#003D25] dark:text-emerald-100/85 text-base sm:text-[18px] leading-[1.58] max-w-[540px] font-normal">
              Authentic Araliya Keeri Samba white rice, Rathu Kekulu red rice, fresh wambatu (purple brinjal), roasted curry powder, Mysore dhal, and Dilmah Ceylon tea delivered to your doorstep with Cash on Delivery.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="h-[44px] px-5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2.5 shadow-sm transition active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
                <span>Shop Groceries</span>
              </button>
            </div>
          </div>

          {/* Right Column: Woman Holding Basket + Orange Starburst + Floating Pill Card */}
          <div className="lg:col-span-5 relative flex items-end justify-center self-end pt-4 lg:pt-0">
            {/* Top-Right Orange Starburst Badge ("Fresh picks this week") */}
            <img
              src="/figma_starburst.png"
              alt="Fresh picks this week"
              className="w-28 sm:w-32 lg:w-[132px] h-auto object-contain absolute top-2 right-2 sm:right-0 lg:-right-6 z-20 drop-shadow-sm select-none pointer-events-none"
            />

            {/* Main Hero Woman Image */}
            <img
              src="/figma_hero_woman.png"
              alt="Daily Ceylon Groceries in Bucharest"
              className="w-full max-w-[460px] lg:max-w-[514px] h-auto object-contain relative z-10 select-none"
            />

            {/* Floating White Card ("The taste of Sri Lanka, delivered to your home.") */}
            <div className="absolute bottom-6 sm:bottom-11 left-2 sm:-left-6 lg:-left-16 z-20 bg-white dark:bg-zinc-900 rounded-2xl px-6 py-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-zinc-800 text-center">
              <p className="text-[#1B8057] dark:text-emerald-400 font-semibold text-sm sm:text-[17px] leading-snug">
                The taste of Sri Lanka,
                <br />
                delivered to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE FEATURE HIGHLIGHTS STRIP (FIGMA EXACT #F0FAF3 CARDS WITH #15875D BORDER) */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-0 pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Fastest Delivery */}
          <div
            className={`rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition ${
              isDarkMode ? 'bg-emerald-950/30' : 'bg-[#F0FAF3]'
            }`}
          >
            <img
              src="/figma_icon_delivery.png"
              alt="Fastest Delivery"
              className="w-[68px] h-[46px] object-contain shrink-0"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-emerald-400 font-bold text-xl sm:text-[22px] leading-tight">
                Fastest Delivery
              </h3>
              <p className="text-[#003D25] dark:text-emerald-100/80 text-sm sm:text-base leading-snug mt-1.5">
                Glovo, Bolt & Sameday
                <br />
                door delivery.
              </p>
            </div>
          </div>

          {/* Card 2: Freshness you can trust */}
          <div
            className={`rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition ${
              isDarkMode ? 'bg-emerald-950/30' : 'bg-[#F0FAF3]'
            }`}
          >
            <img
              src="/figma_icon_freshness.png"
              alt="Freshness you can trust"
              className="w-[50px] h-[48px] object-contain shrink-0"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-emerald-400 font-bold text-xl sm:text-[22px] leading-tight">
                Freshness you can trust
              </h3>
              <p className="text-[#003D25] dark:text-emerald-100/80 text-sm sm:text-base leading-snug mt-1.5">
                Quality produce, carefully
                <br />
                selected.
              </p>
            </div>
          </div>

          {/* Card 3: Cash on delivery */}
          <div
            className={`rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition ${
              isDarkMode ? 'bg-emerald-950/30' : 'bg-[#F0FAF3]'
            }`}
          >
            <img
              src="/figma_icon_cod.png"
              alt="Cash on delivery"
              className="w-[52px] h-[48px] object-contain shrink-0"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-emerald-400 font-bold text-xl sm:text-[22px] leading-tight">
                Cash on delivery
              </h3>
              <p className="text-[#003D25] dark:text-emerald-100/80 text-sm sm:text-base leading-snug mt-1.5">
                Shop with confident
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORIES SECTION */}
      <section className="w-full max-w-[1104px] mx-auto px-4 sm:px-8 lg:px-0 py-8">
        <h2 className="text-center text-2xl sm:text-[32px] font-bold tracking-tight mb-8">
          <span className="text-[#0A6847] dark:text-emerald-400">Shop by </span>
          <span className="text-[#F96D26]">Categories</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FIGMA_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.filterKey);
                onNavigateShop();
              }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Top Image Box with #15875D Border */}
              <div className="h-[168px] w-full rounded-t-md border border-[#15875D] bg-white p-1.5 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover rounded-xs group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Title Pill (#F2F7F4 with #0A6847 Bold Text) */}
              <div
                className={`mt-2 py-2 text-center rounded-b-md shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition ${
                  isDarkMode
                    ? 'bg-zinc-800 text-emerald-400'
                    : 'bg-[#F2F7F4] text-[#0A6847] group-hover:bg-[#e3f0e8]'
                }`}
              >
                <span className="font-bold text-lg sm:text-[20px]">{cat.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR THIS WEEK SECTION */}
      <section className="w-full pt-6">
        <h2 className="text-center text-2xl sm:text-[32px] font-bold tracking-tight mb-6">
          <span className="text-[#0A6847] dark:text-emerald-400">Popular </span>
          <span className="text-[#F96D26]">This week</span>
        </h2>

        {/* Full-Width #F5F5F5 Grey Band */}
        <div
          className={`w-full py-9 px-4 sm:px-8 transition-colors ${
            isDarkMode ? 'bg-zinc-900/60' : 'bg-[#F5F5F5]'
          }`}
        >
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIGMA_POPULAR_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelectProduct(card.product)}
                className={`group rounded-lg p-5 shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[450px] cursor-pointer transition hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'
                }`}
              >
                {/* Product Image Container */}
                <div className="w-full h-[290px] flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.product.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Metadata & Add Button */}
                <div className="pt-3 flex flex-col">
                  {/* Row 1: Title & Price */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-bold text-xl text-black dark:text-white">
                      {card.displayTitle}
                    </h4>
                    <span className="font-bold text-xl text-black dark:text-white whitespace-nowrap">
                      {card.displayPrice}
                    </span>
                  </div>

                  {/* Row 2: Unit Pill & Old Price Strikethrough */}
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        isDarkMode
                          ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-[#F2F7F4] text-[#9E9E9E]'
                      }`}
                    >
                      {card.unitLabel}
                    </span>

                    {card.oldPrice ? (
                      <span className="text-[#C7C7C7] text-base font-semibold line-through">
                        {card.oldPrice}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>

                  {/* Row 3: Bottom-Right Add Button (#0A6847) */}
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(card.product, 1, card.product.unitWeight || '1kg');
                      }}
                      className="h-[42px] px-5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm inline-flex items-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 stroke-[2]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WEEKLY DEALS PROMOTIONAL BANNER (FIGMA EXACT #0A6847 CONTAINER) */}
      <section className="w-full max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-0 py-16">
        <div className="bg-[#0A6847] rounded-2xl px-8 sm:px-12 py-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden min-h-[357px] shadow-lg">
          {/* Left Text Block */}
          <div className="lg:max-w-[600px] space-y-4 z-10">
            <p className="text-[#F8C519] font-semibold text-lg sm:text-xl">
              Weekly Deals
            </p>

            <h3 className="text-3xl sm:text-[42px] font-bold leading-[1.18] tracking-tight">
              <span className="text-white">Unbeatable Offers: </span>
              <span className="text-[#F8C519]">
                Your
                <br />
                Weekly Grocery Specials
              </span>
            </h3>

            <p className="text-white/95 text-base sm:text-[18px] leading-relaxed max-w-[530px] font-normal pt-1">
              Keeri Samba white rice, Rathu Kekulu red rice, fresh brinjal, dhal, and Ceylon spices in stock in Bucharest
            </p>
          </div>

          {/* Right Vegetable Crate Image */}
          <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end z-10">
            <img
              src="/figma_weekly_deals_crate.png"
              alt="Weekly Grocery Specials"
              className="w-full max-w-[440px] lg:max-w-[500px] h-auto object-contain select-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
