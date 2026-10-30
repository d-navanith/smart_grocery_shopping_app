import React from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Leaf,
  Sparkles,
  Award,
  Truck,
  ShieldCheck,
  CheckCircle,
  ChefHat,
  Star,
  Plus
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface HomeViewProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateShop: () => void;
  onSelectCategory: (cat: string) => void;
  isDarkMode: boolean;
  onOpenAppTour: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  cart,
  onAddToCart,
  onSelectProduct,
  onNavigateShop,
  onSelectCategory,
  isDarkMode,
  onOpenAppTour
}) => {
  // Category Cards
  const CATEGORY_CARDS = [
    { id: 'cat-fruits', title: 'Fresh Fruits', subtitle: 'Island mangoes & papaya', image: '/cat_fruits.jpg', filterKey: 'Fruits' },
    { id: 'cat-veg', title: 'Vegetables', subtitle: 'Nuwara Eliya crisp harvest', image: '/cat_vegetables.jpg', filterKey: 'Vegetables' },
    { id: 'cat-dairy', title: 'Dairy & Eggs', subtitle: 'Highland fresh milk', image: '/cat_dairy.jpg', filterKey: 'Dairy & Eggs' },
    { id: 'cat-meat', title: 'Meat & Seafood', subtitle: 'Mirissa catch & poultry', image: '/cat_meat.jpg', filterKey: 'Meat & Seafood' },
    { id: 'cat-bakery', title: 'Bakery', subtitle: 'Roast paan & tea buns', image: '/cat_bakery.jpg', filterKey: 'Bakery' },
    { id: 'cat-pantry', title: 'Rice & Staples', subtitle: 'Araliya Keeri Samba', image: '/cat_pantry.jpg', filterKey: 'Staples & Grains' }
  ];

  const popularProducts = products.slice(0, 8);

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* 1. SRI LANKAN AUTHENTIC CULTURAL TRUST RIBBON */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-amber-50/60 dark:bg-amber-950/20 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-300 dark:border-amber-700 shadow-xs">
            <img
              src="/sri_lanka_flag.svg"
              alt="Flag of Sri Lanka"
              className="w-6 h-4 rounded-xs object-cover border border-amber-400"
            />
            <span className="text-xs font-black text-amber-950 dark:text-amber-100">
              100% ශ්‍රී ලාංකික
            </span>
            <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold hidden sm:inline">
              • Authentic Sri Lankan Supermarket
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/50 text-[#0A6847] dark:text-[#78F9B8] text-[11px] font-extrabold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Direct from Dambulla & Nuwara Eliya Farms</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 dark:text-amber-200">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Lion Quality Assured & Freshness Certified</span>
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
              <span>Fresh from our island to your home.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12]">
              Fresh groceries delivered to your door <br />
              <span className="text-[#0A6847] dark:text-[#78F9B8]">across Sri Lanka.</span>
            </h1>

            <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed max-w-lg">
              Handpicked produce, organic harvest, and kitchen essentials delivered straight from Sri Lankan farms to your door in 45 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3.5 rounded-full bg-[#0A6847] hover:bg-[#085237] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 flex items-center gap-2 transition active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Catalog (Image 1 Theme)</span>
              </button>

              <button
                onClick={onOpenAppTour}
                className="px-6 py-3.5 rounded-full border border-slate-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm shadow-xs transition active:scale-95"
              >
                App Tour (ආයුබෝවන්)
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xl flex items-center justify-center">
              <img
                src="/home_hero_basket.png"
                alt="Fresh Harvest Basket"
                className="w-full max-h-[380px] sm:max-h-[440px] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-4 px-4 py-2.5 rounded-2xl bg-[#0A6847] text-white shadow-xl flex items-center gap-2 border-2 border-white dark:border-zinc-900 animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">Fresh picks</span>
                  <span className="text-xs font-black leading-none">this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VALUE PROPOSITION STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: <Truck className="w-6 h-6" />, title: '45-Min Express Delivery', desc: 'Fast doorstep delivery across Colombo & suburbs' },
          { icon: <Leaf className="w-6 h-6" />, title: 'Island Fresh Harvest', desc: 'Direct from certified Nuwara Eliya & Dambulla growers' },
          { icon: <ShieldCheck className="w-6 h-6" />, title: 'Secure Payments', desc: 'Pay safely with LankaQR, Cards or Cash on Delivery' },
          { icon: <Award className="w-6 h-6" />, title: '100% Quality Inspected', desc: 'Money-back guarantee or immediate item replacement' }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border flex items-center gap-3.5 transition hover:shadow-md ${
              isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
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
              Shop by category
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Browse top categories freshly restocked every morning
            </p>
          </div>
          <button
            onClick={onNavigateShop}
            className="text-xs sm:text-sm font-extrabold text-[#0A6847] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
          >
            <span>View all in Shop</span>
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
              <div className="h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              Popular this week
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Our most-loved groceries, picked fresh today from local island producers.
            </p>
          </div>
          <button
            onClick={onNavigateShop}
            className="text-xs sm:text-sm font-extrabold text-[#0A6847] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
          >
            <span>Explore full catalog</span>
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
                    25% OFF
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
                      Rs. {Math.round(product.price).toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, 1, '1kg');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black flex items-center gap-1 shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. AI RECIPE INGREDIENT BUNDLES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#E5A91A] flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Cook Fresh Tonight with AI Recipes
            </h2>
            <p className="text-xs text-slate-400">
              Add complete chef-curated ingredient kits to your cart with one click
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop&q=80"
              alt="Chicken Curry"
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm">Ceylon Black Pepper Village Chicken Curry</h4>
                <span className="text-[11px] font-bold text-slate-400">⏱ 30 mins</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Includes Bairaha Chicken Fillets (1kg), Araliya Keeri Samba (5kg), and Pure Ceylon Spices.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">Rs. 3,820</span>
                <button
                  onClick={() => {
                    const pChik = products.find(p => p.title.includes('Chicken'));
                    const pRice = products.find(p => p.title.includes('Rice') || p.title.includes('Samba'));
                    if (pChik) onAddToCart(pChik, 1, '1kg');
                    if (pRice) onAddToCart(pRice, 1, '5kg');
                  }}
                  className="px-3.5 py-1.5 bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-bold rounded-xl transition"
                >
                  + Add Ingredients
                </button>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80"
              alt="Dhal Curry"
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm">Traditional Parippu & Crispy Roast Paan Combo</h4>
                <span className="text-[11px] font-bold text-slate-400">⏱ 20 mins</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Includes Mysore Red Dhal (1kg), Crispy Roast Paan (4 pcs), and Virgin Coconut Oil (500ml).
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">Rs. 1,550</span>
                <button
                  onClick={() => {
                    const pAvo = products.find(p => p.title.includes('Avocado') || p.title.includes('Dhal'));
                    const pTom = products.find(p => p.title.includes('Tomato') || p.title.includes('Paan'));
                    if (pAvo) onAddToCart(pAvo, 1, '1kg');
                    if (pTom) onAddToCart(pTom, 1, '1kg');
                  }}
                  className="px-3.5 py-1.5 bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-bold rounded-xl transition"
                >
                  + Add Ingredients
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
