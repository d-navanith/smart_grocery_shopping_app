import React from 'react';
import {
  ShoppingCart,
  Star,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Quote,
  Sparkles,
  Heart
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { TranslationDictionary } from '../translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
  // Intersection Observer Scroll-Triggered Animation Hooks
  const brandsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const featuresReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  const categoriesReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  const popularReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const promoReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const aboutReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  const testimonialsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  // 4 Categories matching real grocery catalog
  const FIGMA_CATEGORIES = [
    {
      id: 'rice-grains',
      title: 'Rice & Grains',
      image: '/products/prod-supiri-keeri-rice.jpg',
      filterKey: 'Rice & Grains'
    },
    {
      id: 'spices',
      title: 'Ceylon Spices',
      image: '/products/prod-wijaya-chilli-powder.jpg',
      filterKey: 'Spices & Curry'
    },
    {
      id: 'dried-fish',
      title: 'Dried Fish & Sambals',
      image: '/products/prod-dried-katta-fish.jpg',
      filterKey: 'Dried Fish & Sambals'
    },
    {
      id: 'biscuits-tea',
      title: 'Tea & Biscuits',
      image: '/products/prod-maliban-lemon-puff.jpg',
      filterKey: 'Biscuits & Snacks'
    }
  ];

  // Authentic Brand Logos matching real Ceylon brands for Nonstop Marquee
  const BRAND_LOGOS = [
    { name: 'Wijaya Products', logo: '/brands/brand_wijaya.png', category: 'Spices & Curry' },
    { name: 'Maliban Biscuits', logo: '/brands/brand_maliban.png', category: 'Biscuits & Snacks' },
    { name: 'Araliya Lanka', logo: '/brands/brand_araliya.png', category: 'Rice & Grains' },
    { name: 'Nestlé / Milo / Maggi', logo: '/brands/brand_nestle.png', category: 'Coconut & Beverages' },
    { name: 'Dilmah Ceylon Tea', logo: '/brands/brand_dilmah.png', category: 'Tea & Beverages' },
    { name: 'MD Foods Pickles & Jam', logo: '/brands/brand_md.png', category: 'Sambals & Jams' },
    { name: 'Harischandra', logo: '/brands/brand_harischandra.png', category: 'Coffee & Flour' },
    { name: 'Watawala Tea', logo: '/brands/brand_watawala.png', category: 'Tea & Beverages' },
    { name: 'Annam', logo: '/brands/brand_annam.png', category: 'Spices & Coffee' }
  ];

  // Find backing store products so clicking "Add" or the card works seamlessly with Cart & Modals
  const riceProduct = products.find(p => p.id === 'prod-supiri-keeri-rice') || products[0];
  const curryProduct = products.find(p => p.id === 'prod-wijaya-roasted-curry-powder') || products[1];
  const coconutProduct = products.find(p => p.id === 'prod-maggi-coconut-powder') || products[2];
  const biscuitProduct = products.find(p => p.id === 'prod-maliban-lemon-puff') || products[3];

  const FIGMA_POPULAR_CARDS = [
    {
      id: 'pop-rice',
      displayTitle: 'Keeri Samba Rice',
      unitLabel: 'Bag : 5 kg',
      displayPrice: '44.50 lei',
      oldPrice: '52.00 lei',
      image: riceProduct?.imageUrl || '/products/prod-supiri-keeri-rice.jpg',
      product: riceProduct
    },
    {
      id: 'pop-curry',
      displayTitle: 'Wijaya Roasted Curry',
      unitLabel: 'Pack : 250g',
      displayPrice: '12.50 lei',
      oldPrice: '15.00 lei',
      image: curryProduct?.imageUrl || '/products/prod-wijaya-roasted-curry-powder.jpg',
      product: curryProduct
    },
    {
      id: 'pop-coconut',
      displayTitle: 'Maggi Coconut Powder',
      unitLabel: 'Pack : 300g',
      displayPrice: '19.50 lei',
      oldPrice: '23.00 lei',
      image: coconutProduct?.imageUrl || '/products/prod-maggi-coconut-powder.jpg',
      product: coconutProduct
    },
    {
      id: 'pop-biscuit',
      displayTitle: 'Maliban Lemon Puff',
      unitLabel: 'Pack : 200g',
      displayPrice: '9.50 lei',
      oldPrice: '12.00 lei',
      image: biscuitProduct?.imageUrl || '/products/prod-maliban-lemon-puff.jpg',
      product: biscuitProduct
    }
  ];

  // Customer reviews for Testimonials Section
  const TESTIMONIALS = [
    {
      id: 'review-1',
      author: 'Kasun Wickramasinghe',
      location: 'Bucharest, Sector 2',
      verified: true,
      rating: 5,
      favorite: 'Araliya Keeri Samba & Fresh Brinjal',
      comment:
        'Finding real Keeri Samba and fresh purple wambatu in Bucharest was impossible before Ceylon Foods. Ordered with cash on delivery and courier was at my door within 45 minutes. Super fresh and genuine quality!'
    },
    {
      id: 'review-2',
      author: 'Elena Ionescu',
      location: 'Bucharest, Sector 1 (Pipera)',
      verified: true,
      rating: 5,
      favorite: 'Roasted Curry Powder & Dilmah Tea',
      comment:
        'I fell in love with Sri Lankan curries during my trip to Kandy. Ceylon Foods has the exact roasted curry powder, coconut milk, and dhal needed to recreate the authentic flavours at home. Exceptional service!'
    },
    {
      id: 'review-3',
      author: 'Dilan Perera',
      location: 'Bucharest, Sector 3 (Titan)',
      verified: true,
      rating: 5,
      favorite: 'Red Baby Shallots & Ceylon Spices',
      comment:
        'The best grocery shopping app for Ceylon essentials in Romania. Real-time order tracking, polite courier support, and the baby shallots and curry leaves arrived in perfect fresh condition.'
    }
  ];

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* 1. HERO SECTION (FIGMA EXACT #F2F7F4 BACKGROUND WITH SMOOTH ENTRANCE) */}
      <section
        className={`w-full transition-colors ${
          isDarkMode ? 'bg-[#0E1E17] text-white' : 'bg-[#F2F7F4] text-black'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-6 lg:pt-4 pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative min-h-[500px] lg:min-h-[552px]">
          {/* Left Column: Text & CTA with Staggered Entrance Animations */}
          <div className="lg:col-span-7 py-8 lg:py-12 space-y-5 z-10">
            {/* Sri Lankan Authenticity Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
              <img
                src="/sri_lanka_flag.svg"
                alt="Sri Lanka Flag"
                className="w-5 h-3.5 object-cover rounded shadow-xs"
              />
              <span>100% Genuine Sri Lankan Imports Direct to Romania</span>
            </div>

            <div className="space-y-2">
              <h2 className="hero-animate-title text-3xl sm:text-[42px] font-bold text-black dark:text-white leading-tight tracking-tight">
                Taste of Home:
              </h2>
              <h1 className="hero-animate-title text-4xl sm:text-[54px] font-bold text-[#1B8057] dark:text-[#6EE7B7] leading-[1.12] tracking-tight">
                Daily Ceylon Groceries
                <br />
                in Bucharest
              </h1>
            </div>

            <p className="hero-animate-desc text-[#003D25] dark:text-emerald-100/85 text-base sm:text-[18px] leading-[1.58] max-w-[540px] font-normal">
              Authentic Araliya Keeri Samba white rice, Rathu Kekulu red rice, fresh wambatu (purple brinjal), roasted curry powder, Mysore dhal, and Dilmah Ceylon tea delivered to your doorstep with Cash on Delivery.
            </p>

            <div className="hero-animate-cta pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="h-[44px] px-5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2.5 shadow-sm hover:shadow-md transition active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
                <span>Shop Groceries</span>
              </button>
            </div>
          </div>

          {/* Right Column: Woman Holding Basket + Orange Starburst + Floating Pill Card */}
          <div className="hero-animate-image lg:col-span-5 relative flex items-end justify-center self-end pt-4 lg:pt-0">
            {/* Top-Right Orange Starburst Badge ("Fresh picks this week") */}
            <img
              src="/figma_starburst.png"
              alt="Fresh picks this week"
              className="w-28 sm:w-32 lg:w-[132px] h-auto object-contain absolute top-2 right-2 sm:right-0 lg:-right-6 z-20 drop-shadow-sm select-none pointer-events-none animate-float"
            />

            {/* Main Hero Woman Image */}
            <img
              src="/figma_hero_woman.png"
              alt="Daily Ceylon Groceries in Bucharest"
              className="w-full max-w-[460px] lg:max-w-[514px] h-auto object-contain relative z-10 select-none"
            />

            {/* Floating Card ("The taste of Sri Lanka, delivered to your home.") */}
            <div className="absolute bottom-6 sm:bottom-11 left-2 sm:-left-6 lg:-left-16 z-20 bg-white dark:bg-[#0E2E20] rounded-2xl px-6 py-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)] border border-slate-100 dark:border-[#15875D] text-center animate-float-delayed">
              <p className="text-[#1B8057] dark:text-[#80F6C7] font-bold text-sm sm:text-[17px] leading-snug">
                The taste of Sri Lanka,
                <br />
                delivered to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NONSTOP CONTINUOUS BRAND LOGO CAROUSEL WITH SCROLL REVEAL */}
      <section
        ref={brandsReveal.ref}
        className={`w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-0 pt-6 sm:pt-8 pb-2 scroll-reveal ${
          brandsReveal.isVisible ? 'is-revealed' : ''
        }`}
      >
        <div
          className={`relative rounded-2xl border border-slate-200/80 dark:border-zinc-800 py-3.5 sm:py-5 overflow-hidden shadow-xs ${
            isDarkMode ? 'bg-[#121A16]/95' : 'bg-white'
          }`}
        >
          {/* Subtle Left & Right Gradient Fade Masks for Infinite Edge Transition */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-white dark:from-[#121A16] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-white dark:from-[#121A16] to-transparent z-10" />

          {/* Continuous Nonstop Marquee Track */}
          <div className="animate-marquee flex items-center gap-5 sm:gap-8 select-none">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-700/60 shadow-2xs min-w-[130px] sm:min-w-[165px] h-[64px] sm:h-[78px] shrink-0 cursor-default pointer-events-none"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-[38px] sm:max-h-[48px] max-w-[110px] sm:max-w-[135px] w-auto h-auto object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THREE FEATURE HIGHLIGHTS STRIP WITH STAGGERED SCROLL REVEAL */}
      <section
        ref={featuresReveal.ref}
        className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-0 pt-8 pb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Fastest Delivery */}
          <div
            className={`group rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 scroll-reveal ${
              featuresReveal.isVisible ? 'is-revealed' : ''
            } ${isDarkMode ? 'bg-[#0E2E20]/90 border-[#15875D]' : 'bg-[#F0FAF3]'}`}
          >
            <img
              src="/figma_icon_delivery.png"
              alt="Fastest Delivery"
              className="w-[68px] h-[46px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-[#80F6C7] font-bold text-xl sm:text-[22px] leading-tight">
                Fastest Delivery
              </h3>
              <p className={`text-sm sm:text-base leading-snug mt-1.5 ${isDarkMode ? 'text-zinc-200' : 'text-[#003D25]'}`}>
                Glovo, Bolt & Sameday
                <br />
                door delivery.
              </p>
            </div>
          </div>

          {/* Card 2: Freshness you can trust */}
          <div
            className={`group rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 scroll-reveal delay-150 ${
              featuresReveal.isVisible ? 'is-revealed' : ''
            } ${isDarkMode ? 'bg-[#0E2E20]/90 border-[#15875D]' : 'bg-[#F0FAF3]'}`}
          >
            <img
              src="/figma_icon_freshness.png"
              alt="Freshness you can trust"
              className="w-[50px] h-[48px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-[#80F6C7] font-bold text-xl sm:text-[22px] leading-tight">
                Freshness you can trust
              </h3>
              <p className={`text-sm sm:text-base leading-snug mt-1.5 ${isDarkMode ? 'text-zinc-200' : 'text-[#003D25]'}`}>
                Quality produce, carefully
                <br />
                selected.
              </p>
            </div>
          </div>

          {/* Card 3: Cash on delivery */}
          <div
            className={`group rounded-xl border border-[#15875D] px-7 py-7 min-h-[155px] flex items-center gap-6 shadow-[0_3px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 scroll-reveal delay-300 ${
              featuresReveal.isVisible ? 'is-revealed' : ''
            } ${isDarkMode ? 'bg-[#0E2E20]/90 border-[#15875D]' : 'bg-[#F0FAF3]'}`}
          >
            <img
              src="/figma_icon_cod.png"
              alt="Cash on delivery"
              className="w-[52px] h-[48px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h3 className="text-[#0A6847] dark:text-[#80F6C7] font-bold text-xl sm:text-[22px] leading-tight">
                Cash on delivery
              </h3>
              <p className={`text-sm sm:text-base leading-snug mt-1.5 ${isDarkMode ? 'text-zinc-200' : 'text-[#003D25]'}`}>
                Shop with confident
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORIES SECTION WITH STAGGERED SCROLL REVEAL */}
      <section
        ref={categoriesReveal.ref}
        className="w-full max-w-[1104px] mx-auto px-4 sm:px-8 lg:px-0 py-8"
      >
        <h2
          className={`text-center text-2xl sm:text-[32px] font-bold tracking-tight mb-8 scroll-reveal ${
            categoriesReveal.isVisible ? 'is-revealed' : ''
          }`}
        >
          <span className="text-[#0A6847] dark:text-emerald-400">Shop by </span>
          <span className="text-[#F96D26]">Categories</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FIGMA_CATEGORIES.map((cat, idx) => {
            const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : 'delay-300';
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.filterKey);
                  onNavigateShop();
                }}
                className={`group cursor-pointer flex flex-col scroll-reveal ${delayClass} ${
                  categoriesReveal.isVisible ? 'is-revealed' : ''
                }`}
              >
                {/* Top Image Box with #15875D Border */}
                <div className="h-[168px] w-full rounded-t-md border border-[#15875D] bg-white p-1.5 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover rounded-xs group-hover:scale-110 transition-transform duration-500 ease-out"
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
            );
          })}
        </div>
      </section>

      {/* 5. POPULAR THIS WEEK SECTION WITH STAGGERED SCROLL REVEAL & HOVER ZOOM */}
      <section ref={popularReveal.ref} className="w-full pt-6">
        <h2
          className={`text-center text-2xl sm:text-[32px] font-bold tracking-tight mb-6 scroll-reveal ${
            popularReveal.isVisible ? 'is-revealed' : ''
          }`}
        >
          <span className="text-[#0A6847] dark:text-emerald-400">Popular </span>
          <span className="text-[#F96D26]">This week</span>
        </h2>

        {/* Full-Width Grey Band */}
        <div
          className={`w-full py-9 px-4 sm:px-8 transition-colors ${
            isDarkMode ? 'bg-zinc-900/60' : 'bg-[#F5F5F5]'
          }`}
        >
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIGMA_POPULAR_CARDS.map((card, idx) => {
              const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : 'delay-300';
              return (
                <div
                  key={card.id}
                  onClick={() => onSelectProduct(card.product)}
                  className={`group rounded-lg p-5 shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[450px] cursor-pointer transition hover:-translate-y-1.5 hover:shadow-xl scroll-reveal ${delayClass} ${
                    popularReveal.isVisible ? 'is-revealed' : ''
                  } ${isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}
                >
                  {/* Product Image Container with Smooth Hover Zoom */}
                  <div className="w-full h-[290px] flex items-center justify-center p-2 overflow-hidden rounded-md bg-white dark:bg-zinc-800/40">
                    <img
                      src={card.product?.imageUrl || card.image}
                      alt={card.product?.title || card.displayTitle}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = card.image;
                      }}
                      className="max-w-full max-h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out select-none"
                    />
                  </div>

                  {/* Product Metadata & Add Button */}
                  <div className="pt-3 flex flex-col">
                    {/* Authentic Origin Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0A6847] dark:text-emerald-400 mb-1.5">
                      <img src="/sri_lanka_flag.svg" alt="Sri Lanka" className="w-3.5 h-2.5 object-cover rounded-xs" />
                      <span>Direct Ceylon Import</span>
                    </div>

                    {/* Row 1: Title & Price */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-bold text-xl text-black dark:text-white line-clamp-1 group-hover:text-[#0A6847] transition">
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
                        className="h-[42px] px-5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm inline-flex items-center gap-2 shadow-xs hover:shadow-md transition active:scale-95 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 stroke-[2]" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WEEKLY DEALS PROMOTIONAL BANNER WITH ELEGANT SLIDE & FADE */}
      <section
        ref={promoReveal.ref}
        className="w-full max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-0 py-16"
      >
        <div className="bg-[#0A6847] rounded-2xl px-8 sm:px-12 py-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden min-h-[357px] shadow-lg">
          {/* Left Text Block with Slide from Left */}
          <div
            className={`lg:max-w-[600px] space-y-4 z-10 scroll-reveal-left ${
              promoReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8C519]/20 text-[#F8C519] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly Deals</span>
            </div>

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

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="h-[42px] px-6 rounded-lg bg-[#F8C519] hover:bg-[#EEAB1E] text-[#664E00] font-bold text-sm inline-flex items-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
              >
                <span>Browse Specials</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Right Vegetable Crate Image with Slide from Right */}
          <div
            className={`w-full lg:w-auto flex items-center justify-center lg:justify-end z-10 scroll-reveal-right delay-200 ${
              promoReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <img
              src="/figma_weekly_deals_crate.png"
              alt="Weekly Grocery Specials"
              className="w-full max-w-[440px] lg:max-w-[500px] h-auto object-contain select-none"
            />
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION (REVEAL TEXT & VISUAL SMOOTHLY WHILE SCROLLING) */}
      <section
        ref={aboutReveal.ref}
        className={`w-full py-16 px-4 sm:px-8 border-y transition-colors ${
          isDarkMode
            ? 'bg-[#0E1E17] border-zinc-800 text-white'
            : 'bg-[#F6F8F7] border-slate-200/70 text-[#003D25]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column: Smooth Slide Reveal */}
          <div
            className={`lg:col-span-7 space-y-5 scroll-reveal-left ${
              aboutReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#064F41]/10 dark:bg-emerald-950/60 text-[#064F41] dark:text-[#80F6C7] border border-[#15875D]/30">
              <span>🌿 Authentic Sri Lankan Heritage in Romania</span>
            </div>

            <h2 className="text-3xl sm:text-[40px] font-bold leading-tight tracking-tight">
              <span className="text-[#064F41] dark:text-white">About </span>
              <span className="text-[#FF632B]">Ceylon Foods</span>
            </h2>

            <p className="text-base sm:text-[17px] leading-relaxed text-[#003D25]/90 dark:text-emerald-100/85 font-normal">
              Founded to connect the vibrant Sri Lankan community and Romanian food lovers with 100% genuine Ceylon staples. We directly import certified Keeri Samba rice, traditional red raw rice, high-altitude Ceylon teas, and freshly sourced Asian vegetables right into our Bucharest fulfillment center.
            </p>

            {/* 3 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#122A1E] border border-slate-200/80 dark:border-[#15875D]/40 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#064F41]/10 text-[#064F41] dark:text-[#80F6C7] flex items-center justify-center font-bold">
                  🌾
                </div>
                <h4 className="font-bold text-sm text-[#064F41] dark:text-white">
                  100% Genuine
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-snug">
                  Araliya, Dilmah, Munchee & MD direct imports.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#122A1E] border border-slate-200/80 dark:border-[#15875D]/40 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#064F41]/10 text-[#064F41] dark:text-[#80F6C7] flex items-center justify-center font-bold">
                  ⚡
                </div>
                <h4 className="font-bold text-sm text-[#064F41] dark:text-white">
                  Fast Courier
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-snug">
                  Glovo, Bolt & Sameday door delivery in Bucharest.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#122A1E] border border-slate-200/80 dark:border-[#15875D]/40 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#064F41]/10 text-[#064F41] dark:text-[#80F6C7] flex items-center justify-center font-bold">
                  🤝
                </div>
                <h4 className="font-bold text-sm text-[#064F41] dark:text-white">
                  Cash on Delivery
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-snug">
                  Zero advance needed. Pay upon safe delivery.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="h-[42px] px-6 rounded-lg bg-[#064F41] hover:bg-[#043d32] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Right Visual Box: Smooth Slide from Right */}
          <div
            className={`lg:col-span-5 scroll-reveal-right delay-200 ${
              aboutReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#064F41] via-[#0A6847] to-[#15875D] text-white shadow-xl relative overflow-hidden space-y-6">
              {/* Background watermark badge */}
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <ShieldCheck className="w-64 h-64" />
              </div>

              <div className="space-y-2 relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[#80F6C7] text-xs font-bold uppercase tracking-wider">
                  Bucharest Store Guarantee
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
                  Taste of Home, Always Fresh.
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Every grain of rice, whole spice quill, and fresh vegetable is inspected in our store before reaching courier dispatch.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 relative z-10 border-t border-white/20">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C519]">4.9 / 5.0</p>
                  <p className="text-xs text-white/80 font-medium">Customer Rating</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C519]">1,500+ kg</p>
                  <p className="text-xs text-white/80 font-medium">Ceylon Rice Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION (STAGGERED FADE-UP ANIMATIONS FOR REVIEWS) */}
      <section
        ref={testimonialsReveal.ref}
        className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 py-16"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF632B]/10 text-[#FF632B] scroll-reveal ${
              testimonialsReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-[#FF632B]" />
            <span>Customer Stories</span>
          </div>

          <h2
            className={`text-2xl sm:text-[34px] font-bold tracking-tight scroll-reveal delay-100 ${
              testimonialsReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            <span className="text-[#064F41] dark:text-white">Loved by the </span>
            <span className="text-[#FF632B]">Community</span>
          </h2>

          <p
            className={`text-sm sm:text-base text-slate-600 dark:text-zinc-300 scroll-reveal delay-150 ${
              testimonialsReveal.isVisible ? 'is-revealed' : ''
            }`}
          >
            Real reviews from Sri Lankan families and Romanian home chefs in Bucharest.
          </p>
        </div>

        {/* 3 Review Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => {
            const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-150' : 'delay-300';
            return (
              <div
                key={item.id}
                className={`group rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between scroll-reveal ${delayClass} ${
                  testimonialsReveal.isVisible ? 'is-revealed' : ''
                } ${isDarkMode ? 'bg-[#121A16]' : 'bg-white'}`}
              >
                <div className="space-y-4">
                  {/* Top Row: 5 Stars + Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F8C519] text-[#F8C519]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#15875D]/30 group-hover:text-[#15875D] transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-zinc-200 italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Bottom Metadata: Author + Location + Favorite Item */}
                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-[#064F41] dark:text-white">
                      {item.author}
                    </h4>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15875D] dark:text-[#80F6C7]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {item.location}
                  </p>
                  <p className="text-[11px] font-medium text-[#FF632B] pt-0.5">
                    Order staple: {item.favorite}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. GOOGLE KNOWLEDGE & LOCAL OVERVIEW SECTION (SEO KNOWLEDGE GRAPH ACCELERATOR) */}
      <section className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-t border-[#15875D]/20 py-14">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <img src="/sri_lanka_flag.svg" alt="Sri Lanka" className="w-4 h-2.5 rounded-xs object-cover" />
                <span>About Ceylon Foods Romania</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#064F41] dark:text-white tracking-tight">
                Romania's Dedicated Sri Lankan Online Supermarket & Direct Food Distributor
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                <strong>Ceylon Foods</strong> is the premier authentic Sri Lankan supermarket in Romania, specializing in direct import and distribution of genuine island groceries, heirloom rice varieties, and fresh tropical produce based in Bucharest.
              </p>
              
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#15875D] dark:text-[#80F6C7]">
                  Core Business & Store Operations
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF632B] font-bold">•</span>
                    <span><strong>Heirloom Ceylon Rice & Grains:</strong> Araliya Keeri Samba, Rathu Kekulu red raw rice, Mysore red dhal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF632B] font-bold">•</span>
                    <span><strong>Fresh Tropical Produce:</strong> Purple brinjal (wambatu), fresh lady's finger (okra), yellow pumpkin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF632B] font-bold">•</span>
                    <span><strong>Authentic Spices & Tea:</strong> Roasted curry powder, Jaffna curry, Ceylon cinnamon quills, Dilmah BOPF tea.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF632B] font-bold">•</span>
                    <span><strong>Express Door-to-Door Delivery:</strong> 25–45 min dispatch in Bucharest Sectors 1–6, Ilfov, and Cash on Delivery.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: Google Knowledge Card Style Info Box */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <div>
                  <h3 className="font-bold text-base text-[#064F41] dark:text-white">Ceylon Foods Supermarket</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Asian & Sri Lankan Grocery Store • Bucharest</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-200/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
                  <span>★</span>
                  <span>4.9</span>
                  <span className="text-[10px] font-normal text-slate-500">(380)</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#064F41] dark:text-emerald-400 min-w-[70px]">Address:</span>
                  <span>Strada Mihai Eminescu nr. 42, Sector 1, București 010515, Romania</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#064F41] dark:text-emerald-400 min-w-[70px]">Phone:</span>
                  <a href="tel:+40722456789" className="text-[#15875D] font-bold hover:underline">+40 722 456 789</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#064F41] dark:text-emerald-400 min-w-[70px]">Hours:</span>
                  <span>Open Daily • 09:00 – 20:00 (Monday – Sunday)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#064F41] dark:text-emerald-400 min-w-[70px]">Payment:</span>
                  <span>Cash on Delivery (COD) & Mobile POS Card on Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#064F41] dark:text-emerald-400 min-w-[70px]">Coverage:</span>
                  <span>Bucharest (Sectors 1–6), Ilfov County & Nationwide Courier</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#064F41] hover:bg-[#043d32] text-white font-bold text-xs text-center transition cursor-pointer"
                >
                  Order Groceries Online
                </button>
                <a
                  href="https://maps.google.com/?q=Strada+Mihai+Eminescu+42+Bucuresti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold text-xs text-center transition"
                >
                  📍 View on Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
