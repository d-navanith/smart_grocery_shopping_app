import React from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Leaf,
  Sparkles,
  Award,
  Truck,
  ShieldCheck,
  ChefHat,
  Star,
  Plus
} from 'lucide-react';
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
  cart,
  onAddToCart,
  onSelectProduct,
  onNavigateShop,
  onSelectCategory,
  isDarkMode,
  onOpenAppTour,
  t
}) => {
  const CATEGORY_CARDS = [
    { id: 'cat-rice', icon: '🌾', title: t.catRice, subtitle: 'Keeri Samba & Red Rice', image: '/prod_white_rice.jpg', filterKey: 'Staples & Grains' },
    { id: 'cat-wambatu', icon: '🍆', title: t.catVeg, subtitle: 'Brinjal & Okra', image: '/prod_brinjal.jpg', filterKey: 'Fruits & Veg' },
    { id: 'cat-spices', icon: '🌶️', title: t.catSpices, subtitle: 'Curry Powder & Cinnamon', image: '/prod_spices.jpg', filterKey: 'Pantry' },
    { id: 'cat-tea', icon: '☕', title: t.catTea, subtitle: 'Dilmah Ceylon BOPF', image: '/prod_tea.jpg', filterKey: 'Beverages' },
    { id: 'cat-bakery', icon: '🥖', title: t.catBakery, subtitle: 'Fresh Sri Lankan Roast Paan', image: '/prod_roast_paan.jpg', filterKey: 'Bakery' },
    { id: 'cat-fruits', icon: '🥭', title: t.catSnacks, subtitle: 'Ceylon Papaya & Mango', image: '/prod_papaya.jpg', filterKey: 'Fruits & Veg' }
  ];

  const popularProducts = products.slice(0, 8);

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* 1. ROMANIAN-SRI LANKAN CULTURAL TRUST RIBBON */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-amber-50/70 dark:bg-amber-950/20 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-300 dark:border-amber-700 shadow-xs">
            <span className="text-base">🇷🇴</span>
            <span className="text-base">🇱🇰</span>
            <span className="text-xs font-black text-amber-950 dark:text-amber-100">
              {t.ribbonAuthentic}
            </span>
            <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold hidden sm:inline">
              {t.ribbonCentralDepot}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/50 text-[#0A6847] dark:text-[#78F9B8] text-[11px] font-extrabold">
            <Leaf className="w-3.5 h-3.5" />
            <span>{t.ribbonDailyGroceries}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 dark:text-amber-200">
          <Award className="w-4 h-4 text-amber-600" />
          <span>{t.ribbonCodCourier}</span>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <div className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 border transition ${
        isDarkMode
          ? 'bg-gradient-to-r from-[#0C1A13] via-[#0E2018] to-[#122A1E] border-emerald-900/40 text-white'
          : 'bg-[#F2F7F4] border-[#D6E6DB] text-slate-800'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EFE7] dark:bg-emerald-950/80 text-[#0A6847] dark:text-[#78F9B8] text-xs font-black tracking-wide">
              <Leaf className="w-3.5 h-3.5 text-[#0A6847] dark:text-[#78F9B8]" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12]">
              {t.heroTitle1} <br />
              <span className="text-[#0A6847] dark:text-[#78F9B8]">{t.heroTitle2}</span>
            </h1>

            <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed max-w-lg">
              {t.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3.5 rounded-full bg-[#0A6847] hover:bg-[#085237] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 flex items-center gap-2 transition active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.heroShopBtn}</span>
              </button>

              <button
                onClick={onOpenAppTour}
                className="px-6 py-3.5 rounded-full border border-slate-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 hover:bg-white text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm shadow-xs transition active:scale-95"
              >
                {t.tourBtn}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xl flex items-center justify-center">
              <img
                src="/home_hero_basket.png"
                alt="Coș Produse Sri Lanka"
                className="w-full max-h-[380px] sm:max-h-[440px] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-4 px-4 py-2.5 rounded-2xl bg-[#0A6847] text-white shadow-xl flex items-center gap-2 border-2 border-white dark:border-zinc-900 animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">{t.depotNotice.split('•')[0] || 'Bucharest Hub'}</span>
                  <span className="text-xs font-black leading-none">{t.codBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VALUE PROPOSITIONS STRIP WITH PREMIUM 3D BADGES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: '🛵', bg: 'from-emerald-500 to-[#0A6847]', title: t.featureDeliveryTitle, desc: t.featureDeliveryDesc },
          { icon: '🌾', bg: 'from-amber-400 to-[#E5A91A]', title: t.featureRiceTitle, desc: t.featureRiceDesc },
          { icon: '🌶️', bg: 'from-rose-500 to-amber-700', title: t.featureSpicesTitle, desc: t.featureSpicesDesc },
          { icon: '🍆', bg: 'from-purple-500 to-[#0A6847]', title: t.featureVegTitle, desc: t.featureVegDesc }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border flex items-center gap-4 transition hover:shadow-lg ${
              isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} text-white flex items-center justify-center shrink-0 text-xl shadow-md shadow-emerald-950/10`}>
              {item.icon}
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SHOP BY CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.browseCategories}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t.storeSubtitle}
            </p>
          </div>
          <button
            onClick={onNavigateShop}
            className="text-xs sm:text-sm font-extrabold text-[#0A6847] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
          >
            <span>{t.tabShop}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORY_CARDS.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.filterKey);
                onNavigateShop();
              }}
              className={`group p-3 rounded-2xl border cursor-pointer transition transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-[#141816] border-zinc-800 hover:border-emerald-800'
                  : 'bg-white border-slate-200 hover:border-emerald-200 shadow-xs'
              }`}
            >
              <div className="h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center p-1 relative">
                <span className="absolute top-1.5 left-1.5 w-7 h-7 rounded-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs flex items-center justify-center text-sm shadow-xs border border-slate-200/60 dark:border-zinc-700/60">
                  {cat.icon}
                </span>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-[#0A6847] dark:group-hover:text-[#78F9B8] transition">
                  {cat.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">{cat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR THIS WEEK */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.popularTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t.popularDesc}
            </p>
          </div>
          <button
            onClick={onNavigateShop}
            className="text-xs sm:text-sm font-extrabold text-[#0A6847] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularProducts.map(product => {
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`group rounded-2xl p-4 border cursor-pointer transition transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#141816] border-zinc-800 hover:border-emerald-800'
                    : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div className="relative">
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900 flex items-center justify-center p-2">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black bg-[#0A6847] text-white">
                    100% CEYLON
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-black">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {product.rating}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-black text-[#0A6847] dark:text-[#78F9B8]">
                      {product.price.toFixed(2)} lei
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, 1, '1kg');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black flex items-center gap-1 shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. AI RECIPE INGREDIENT KITS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#E5A91A] flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {t.recipeKitsTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.recipeKitsDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <img
              src="/prod_brinjal.jpg"
              alt="Wambatu Moju"
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm">{t.recipeKit1Title}</h4>
                <span className="text-[11px] font-bold text-slate-400">⏱ 35 mins</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                {t.recipeKit1Desc}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">63.50 lei</span>
                <button
                  onClick={() => {
                    const pRice = products.find(p => p.id === 'prod-white-rice');
                    const pBrin = products.find(p => p.id === 'prod-brinjal');
                    if (pRice) onAddToCart(pRice, 1, '5kg');
                    if (pBrin) onAddToCart(pBrin, 1, '1kg');
                  }}
                  className="px-3.5 py-1.5 bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-bold rounded-xl transition"
                >
                  {t.addIngredientsBtn}
                </button>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <img
              src="/prod_dhal.jpg"
              alt="Parippu Curry"
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm">{t.recipeKit2Title}</h4>
                <span className="text-[11px] font-bold text-slate-400">⏱ 20 mins</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                {t.recipeKit2Desc}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">38.00 lei</span>
                <button
                  onClick={() => {
                    const pDhal = products.find(p => p.id === 'prod-dhal');
                    const pPaan = products.find(p => p.id === 'prod-roast-paan');
                    if (pDhal) onAddToCart(pDhal, 1, '1kg');
                    if (pPaan) onAddToCart(pPaan, 1, '1loaf');
                  }}
                  className="px-3.5 py-1.5 bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-bold rounded-xl transition"
                >
                  {t.addIngredientsBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
