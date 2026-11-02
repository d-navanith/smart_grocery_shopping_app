import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingCart,
  Sun,
  Moon,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Globe,
  Check,
  Truck,
  Sparkles,
  ChefHat
} from 'lucide-react';
import { CustomerUser, CartItem } from '../types';
import { Language, TranslationDictionary, LANGUAGE_OPTIONS } from '../translations';

export type AppPage =
  | 'HOME'
  | 'SHOP'
  | 'CART'
  | 'CHECKOUT'
  | 'ORDER_COMPLETED'
  | 'WISHLIST'
  | 'TRACK_ORDER'
  | 'DELIVERIES'
  | 'RECIPES'
  | 'ACCOUNT';

interface HeaderNavProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currentUser: CustomerUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  cart: CartItem[];
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenAppTour: () => void;
  subtotal: number;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationDictionary;
  ongoingDeliveriesCount?: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  setCurrentPage,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  currentUser,
  onOpenAuth,
  onLogout,
  cart,
  wishlistCount,
  onOpenAppTour,
  currentLanguage,
  onLanguageChange,
  t,
  ongoingDeliveriesCount = 0
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('menu') === 'open'
  );
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const selectedLangOption = LANGUAGE_OPTIONS.find(l => l.code === currentLanguage) || LANGUAGE_OPTIONS[0];
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Display name in golden pill (matches Figma "Brie" or logged-in user's first name)
  const displayUserName = currentUser ? currentUser.name.split(' ')[0] : 'Brie';

  return (
    <header className="w-full flex flex-col z-30 select-none">
      {/* 1. TOP ANNOUNCEMENT BAR (FIGMA EXACT #F8C519) */}
      <div className="bg-[#F8C519] text-[#664E00] min-h-[50px] px-4 sm:px-8 flex items-center">
        <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between gap-4 py-1.5">
          {/* Left spacer on desktop so greeting stays centered */}
          <div className="hidden xl:block w-[180px]" />

          {/* Center Greeting: ආයුබෝවන් · வணக்கம் · Welcome | The taste of Sri Lanka, delivered to your home. */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#664E00] mx-auto text-center flex-wrap">
            <img
              src="/figma_ayubowan.png"
              alt="ආයුබෝවන්"
              className="h-5 sm:h-6 w-auto object-contain inline-block"
            />
            <span className="text-[#664E00] font-bold">·</span>
            <span className="text-[#D84315] font-bold">வணக்கம்</span>
            <span className="text-[#664E00] font-bold">·</span>
            <span className="text-[#664E00] font-medium">
              {currentLanguage === 'en'
                ? 'Welcome | The taste of Sri Lanka, delivered to your home.'
                : t.announcement}
            </span>
          </div>

          {/* Right Controls: Language Pill & Dark Mode Pill (#EEAB1E with #C08512 border) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="h-[32px] px-3 rounded-md bg-[#EEAB1E] hover:bg-[#e59f10] border border-[#C08512] text-[#664E00] text-xs font-medium flex items-center gap-2 transition cursor-pointer"
                title="Change language / භාෂාව මාරු කරන්න / Schimbă limba"
              >
                <Globe className="w-3.5 h-3.5 text-[#664E00]" />
                <span>{selectedLangOption.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#664E00]" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl py-1.5 z-50 text-slate-800 dark:text-zinc-100">
                  <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span>Language / භාෂාව</span>
                    <span className="text-[9px] text-[#1B8057] font-extrabold">3 Active</span>
                  </div>
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(opt.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition text-left ${
                        currentLanguage === opt.code
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-[#1B8057] dark:text-[#78F9B8] font-black'
                          : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{opt.flag}</span>
                        <div>
                          <p className="leading-none text-xs">{opt.nativeName}</p>
                          <p className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.label}</p>
                        </div>
                      </div>
                      {currentLanguage === opt.code && (
                        <Check className="w-4 h-4 text-[#1B8057] dark:text-[#78F9B8]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-[32px] px-3 rounded-md bg-[#EEAB1E] hover:bg-[#e59f10] border border-[#C08512] text-[#664E00] text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-[#664E00]" /> : <Moon className="w-3.5 h-3.5 text-[#664E00]" />}
              <span>{isDarkMode ? t.themeLight : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & SUB-NAVBAR WRAPPER (FIGMA EXACT #1B8057) */}
      <div className="bg-[#1B8057] text-white px-4 sm:px-8">
        {/* Top Row: Logo Card + Pill Search Bar + Circle Actions + Golden User Pill */}
        <div className="max-w-[1240px] mx-auto pt-3 pb-4 flex items-center justify-between gap-4 lg:gap-6">
          {/* Left: White Rounded Logo Box (Figma 251x141 style scaled responsively) */}
          <div
            onClick={() => {
              setCurrentPage('HOME');
              setSelectedCategory('All');
            }}
            className="bg-[#FBFBFB] rounded-2xl px-4 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-[1.01] transition shrink-0 flex items-center justify-center"
          >
            <img
              src="/figma_logo_tight.png"
              alt="Ceylon Foods - Fresh from our island to your home"
              className="h-14 sm:h-[78px] w-auto object-contain"
            />
          </div>

          {/* Center: Unified Translucent Green Search Pill (#39906D with white border) */}
          <div className="flex-1 min-w-[240px] max-w-[532px] relative">
            <div className="h-[52px] sm:h-[60px] rounded-full bg-[#39906D] border border-white/80 flex items-center px-4 sm:px-6 shadow-xs focus-within:border-[#F8C519] transition">
              {/* All Categories Select Inside Pill */}
              <div className="hidden sm:flex items-center shrink-0 pr-3">
                <select
                  value={selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  onChange={(e) => {
                    const val = e.target.value === 'All Categories' ? 'All' : e.target.value;
                    setSelectedCategory(val);
                    if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                  }}
                  className="bg-transparent text-white text-xs sm:text-sm font-semibold outline-none cursor-pointer pr-1 [&>option]:text-slate-900"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Staples & Grains">Rice & Grains</option>
                  <option value="Fruits & Veg">Veggies & Fruits</option>
                  <option value="Pantry">Ceylon Spices</option>
                  <option value="Beverages">Ceylon Tea</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              {/* Vertical White Divider */}
              <div className="hidden sm:block h-9 w-[1.5px] bg-white/80 mx-2 shrink-0" />

              {/* Search Input */}
              <div className="flex-1 min-w-0 flex items-center relative">
                <input
                  type="text"
                  placeholder={currentLanguage === 'en' ? 'Search For Products' : t.searchPlaceholder}
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                  }}
                  className="w-full min-w-0 py-2 px-2 text-sm sm:text-base font-medium text-white placeholder-[#80F6C7] bg-transparent focus:outline-none"
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-white/70 hover:text-white p-1 text-xs mr-1"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Right Magnifier Button */}
              <button
                type="button"
                onClick={() => {
                  if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                }}
                className="p-1.5 text-[#80F6C7] hover:text-white transition shrink-0 cursor-pointer"
                title="Search"
              >
                <Search className="w-7 h-7 stroke-[2.2]" />
              </button>
            </div>

            {/* Quick Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 p-3 z-50 text-slate-800 dark:text-zinc-100"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800 text-[10px] uppercase font-black tracking-wider text-slate-400">
                  <span>Popular Ceylon Searches in Bucharest</span>
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Close ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    { label: 'Keeri Samba (5kg)', cat: 'Staples & Grains', icon: '🌾' },
                    { label: 'White Raw Rice', cat: 'Staples & Grains', icon: '🌾' },
                    { label: 'Purple Brinjal (Wambatu)', cat: 'Fruits & Veg', icon: '🍆' },
                    { label: 'Mysore Red Dhal', cat: 'Staples & Grains', icon: '🍲' },
                    { label: 'Roasted Curry Powder', cat: 'Pantry', icon: '🌶️' },
                    { label: 'Fresh Coconut', cat: 'Fruits & Veg', icon: '🥥' }
                  ].map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setSearchQuery(item.label);
                        setSelectedCategory(item.cat);
                        setCurrentPage('SHOP');
                        setIsSearchFocused(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-[#1B8057] hover:text-white text-slate-700 dark:text-zinc-300 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Heart Circle, Cart Circle, Golden User Pill */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Wishlist Circle Button (#39906D with white border) */}
            <button
              type="button"
              onClick={() => setCurrentPage('WISHLIST')}
              className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#39906D] hover:bg-[#2e7d5e] border border-white/80 flex items-center justify-center text-white transition cursor-pointer shadow-xs"
              title={t.wishlistTitle}
            >
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F8C519] text-[#664E00] text-[11px] font-black flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Circle Button (#39906D with white border) */}
            <button
              type="button"
              onClick={() => setCurrentPage('CART')}
              className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#39906D] hover:bg-[#2e7d5e] active:scale-95 border border-white/80 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-xs"
              title={t.myCart}
            >
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F8C519] text-[#664E00] text-[11px] font-black flex items-center justify-center shadow animate-badge-pop">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile or Sign In Button */}
            {!currentUser ? (
              <button
                type="button"
                onClick={onOpenAuth}
                className="h-[50px] sm:h-[60px] px-4 sm:px-5 rounded-full bg-[#F8C519] hover:bg-[#EEAB1E] text-[#664E00] flex items-center gap-2 sm:gap-2.5 shadow-xs transition cursor-pointer font-bold text-sm sm:text-base active:scale-95 shrink-0"
                title="Sign In / Register"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#664E00] flex items-center justify-center shrink-0">
                  <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#664E00] stroke-[2.2]" />
                </div>
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="h-[50px] sm:h-[60px] px-3.5 sm:px-4 rounded-full bg-[#F8C519] hover:bg-[#EEAB1E] text-[#664E00] flex items-center gap-2.5 sm:gap-3 shadow-xs transition cursor-pointer"
                  title={t.accountTitle}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-[#664E00] flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4 text-[#664E00] stroke-[2.2]" />
                  </div>
                  <div className="hidden sm:block h-9 w-[1px] bg-[#AA870F]" />
                  <span className="hidden sm:inline font-semibold text-base sm:text-lg text-[#664E00] tracking-tight">
                    {displayUserName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#664E00]" />
                </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl py-2 z-50 text-slate-800 dark:text-zinc-100">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800">
                    <p className="text-xs font-black text-[#1B8057] dark:text-emerald-400">
                      {currentUser ? currentUser.name : 'Brie (Customer Account)'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {currentUser ? currentUser.email : 'Bucharest • Cash on Delivery'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('ACCOUNT');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2.5"
                  >
                    <UserIcon className="w-4 h-4 text-[#1B8057]" />
                    <span>{t.accountTitle}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('DELIVERIES');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#1B8057]" />
                      <span>{t.tabDeliveries}</span>
                    </span>
                    {ongoingDeliveriesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F8C519] text-[#664E00] text-[10px] font-black">
                        {ongoingDeliveriesCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('TRACK_ORDER');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2.5"
                  >
                    <Truck className="w-4 h-4 text-[#F96D26]" />
                    <span>{t.trackOrderTitle}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('RECIPES');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2.5"
                  >
                    <ChefHat className="w-4 h-4 text-[#1B8057]" />
                    <span>{t.tabRecipes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenAppTour();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#EEAB1E]" />
                    <span>{t.tourBtn}</span>
                  </button>

                  <div className="border-t border-slate-100 dark:border-zinc-800 mt-1 pt-1">
                    {currentUser ? (
                      <button
                        type="button"
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenAuth();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs font-bold text-[#1B8057] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2.5"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Sign In / Register</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. SUB-NAVIGATION BAR (FIGMA EXACT #1B8057 WITH #39906D TOP BORDER & #F8C519 "All" BUTTON) */}
        <div className="max-w-[1240px] mx-auto border-t border-[#39906D] py-2.5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 sm:gap-9">
            {/* Golden "All" Button with Mega Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="h-[41px] min-w-[117px] px-5 rounded-lg bg-[#F8C519] hover:bg-[#EEAB1E] text-[#664E00] font-semibold text-sm flex items-center justify-center gap-3 shadow-xs transition cursor-pointer"
              >
                <Menu className="w-5 h-5 text-[#664E00] stroke-[2.2]" />
                <span>All</span>
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-3 w-[840px] max-w-[95vw] rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 z-50 text-slate-800 dark:text-zinc-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Column 1: Rice, Grains & Dhal */}
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          setSelectedCategory('Staples & Grains');
                          setCurrentPage('SHOP');
                          setIsCategoryMenuOpen(false);
                        }}
                        className="font-black text-xs uppercase tracking-wider text-[#1B8057] dark:text-[#78F9B8] pb-1 border-b border-slate-100 dark:border-zinc-800 cursor-pointer flex items-center justify-between hover:underline"
                      >
                        <span>🌾 {t.catRice}</span>
                        <span className="text-[10px]">→</span>
                      </div>
                      <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        {[
                          'Araliya Keeri Samba (5kg)',
                          'White Raw Kakulu Rice',
                          'Traditional Red Raw Rice',
                          'Mysore Red Split Dhal (1kg)',
                          'Pol Roti & String Hopper Flour'
                        ].map(item => (
                          <li
                            key={item}
                            onClick={() => {
                              setSelectedCategory('Staples & Grains');
                              setCurrentPage('SHOP');
                              setIsCategoryMenuOpen(false);
                            }}
                            className="hover:text-[#1B8057] dark:hover:text-white cursor-pointer transition flex items-center gap-1.5"
                          >
                            <span className="text-[10px] text-[#F8C519]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Ceylon Fresh Vegetables */}
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          setSelectedCategory('Fruits & Veg');
                          setCurrentPage('SHOP');
                          setIsCategoryMenuOpen(false);
                        }}
                        className="font-black text-xs uppercase tracking-wider text-[#1B8057] dark:text-[#78F9B8] pb-1 border-b border-slate-100 dark:border-zinc-800 cursor-pointer flex items-center justify-between hover:underline"
                      >
                        <span>🍆 {t.catVeg}</span>
                        <span className="text-[10px]">→</span>
                      </div>
                      <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        {[
                          'Sri Lankan Purple Brinjal (Wambatu)',
                          "Fresh Lady's Finger (Bandakka)",
                          'Bitter Gourd (Karavila)',
                          'Fresh Ceylon Papaya & Coconut',
                          'Fresh Green Hot Chillies'
                        ].map(item => (
                          <li
                            key={item}
                            onClick={() => {
                              setSelectedCategory('Fruits & Veg');
                              setCurrentPage('SHOP');
                              setIsCategoryMenuOpen(false);
                            }}
                            className="hover:text-[#1B8057] dark:hover:text-white cursor-pointer transition flex items-center gap-1.5"
                          >
                            <span className="text-[10px] text-[#F8C519]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Spices, Coconut & Tea */}
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          setSelectedCategory('Pantry');
                          setCurrentPage('SHOP');
                          setIsCategoryMenuOpen(false);
                        }}
                        className="font-black text-xs uppercase tracking-wider text-[#1B8057] dark:text-[#78F9B8] pb-1 border-b border-slate-100 dark:border-zinc-800 cursor-pointer flex items-center justify-between hover:underline"
                      >
                        <span>🌶️ {t.catSpices}</span>
                        <span className="text-[10px]">→</span>
                      </div>
                      <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        {[
                          'Roasted Ceylon Curry Powder',
                          'Jaffna Hot Curry Powder',
                          'Pure Ceylon Cinnamon Quills',
                          'Dilmah Single Origin BOPF Tea',
                          'Rich Coconut Milk & Cream'
                        ].map(item => (
                          <li
                            key={item}
                            onClick={() => {
                              setSelectedCategory('Pantry');
                              setCurrentPage('SHOP');
                              setIsCategoryMenuOpen(false);
                            }}
                            className="hover:text-[#1B8057] dark:hover:text-white cursor-pointer transition flex items-center gap-1.5"
                          >
                            <span className="text-[10px] text-[#F8C519]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 4: Promotional Banner Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#F8C519] via-amber-400 to-amber-500 p-5 text-[#664E00] flex flex-col justify-between shadow-lg relative overflow-hidden">
                      <div className="space-y-1 relative z-10">
                        <span className="px-2 py-0.5 rounded-full bg-amber-900/20 text-[#664E00] text-[10px] font-black uppercase tracking-wider">
                          Weekly Deals
                        </span>
                        <h4 className="font-black text-base leading-tight mt-1">
                          20% Off on Fresh Ceylon Veggies
                        </h4>
                        <p className="text-[11px] font-medium opacity-90">
                          Cash on Delivery in Bucharest & Ilfov.
                        </p>
                      </div>

                      <div className="mt-4 pt-2 relative z-10">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory('Fruits & Veg');
                            setCurrentPage('SHOP');
                            setIsCategoryMenuOpen(false);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition"
                        >
                          Shop Vegetables Now →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Uppercase Navigation Links Matching Figma */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium text-white tracking-wide uppercase">
              <button
                type="button"
                onClick={() => setCurrentPage('HOME')}
                className={`hover:text-[#F8C519] transition cursor-pointer ${
                  currentPage === 'HOME' ? 'text-[#F8C519] font-bold underline underline-offset-8' : ''
                }`}
              >
                {currentLanguage === 'en' ? 'HOME' : t.tabHome}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('SHOP');
                }}
                className={`hover:text-[#F8C519] transition cursor-pointer ${
                  currentPage === 'SHOP' && selectedCategory === 'All'
                    ? 'text-[#F8C519] font-bold underline underline-offset-8'
                    : ''
                }`}
              >
                {currentLanguage === 'en' ? 'SHOP' : t.tabShop}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Staples & Grains');
                  setCurrentPage('SHOP');
                }}
                className={`hover:text-[#F8C519] transition cursor-pointer ${
                  currentPage === 'SHOP' && selectedCategory === 'Staples & Grains'
                    ? 'text-[#F8C519] font-bold underline underline-offset-8'
                    : ''
                }`}
              >
                {currentLanguage === 'en' ? 'RICE & GRAINS' : t.tabRice}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Fruits & Veg');
                  setCurrentPage('SHOP');
                }}
                className={`hover:text-[#F8C519] transition cursor-pointer ${
                  currentPage === 'SHOP' && selectedCategory === 'Fruits & Veg'
                    ? 'text-[#F8C519] font-bold underline underline-offset-8'
                    : ''
                }`}
              >
                {currentLanguage === 'en' ? 'VEGGIES' : t.tabVegetables}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Fruits & Veg');
                  setCurrentPage('SHOP');
                }}
                className="hover:text-[#F8C519] transition cursor-pointer"
              >
                FRUITS
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Pantry');
                  setCurrentPage('SHOP');
                }}
                className={`hover:text-[#F8C519] transition cursor-pointer ${
                  currentPage === 'SHOP' && selectedCategory === 'Pantry'
                    ? 'text-[#F8C519] font-bold underline underline-offset-8'
                    : ''
                }`}
              >
                {currentLanguage === 'en' ? 'CEYLON SPICES' : t.tabSpices}
              </button>
            </nav>
          </div>

          {/* Right Quick Links for Track Order & My Deliveries */}
          <div className="hidden xl:flex items-center gap-5 text-xs font-semibold text-white/95 uppercase tracking-wide">
            <button
              type="button"
              onClick={() => setCurrentPage('TRACK_ORDER')}
              className={`hover:text-[#F8C519] transition cursor-pointer ${
                currentPage === 'TRACK_ORDER' ? 'text-[#F8C519] font-bold' : ''
              }`}
            >
              {t.trackOrderTitle}
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('DELIVERIES')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'DELIVERIES'
                  ? 'bg-[#F8C519] text-[#664E00] font-bold'
                  : 'bg-[#39906D] hover:bg-[#2e7d5e] text-white'
              }`}
            >
              <span>{t.tabDeliveries}</span>
              {ongoingDeliveriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#F8C519] text-[#664E00] text-[10px] font-black">
                  {ongoingDeliveriesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#39906D] py-3 space-y-2 text-sm font-semibold text-white">
            <button
              onClick={() => {
                setCurrentPage('HOME');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              HOME
            </button>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentPage('SHOP');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              SHOP
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Staples & Grains');
                setCurrentPage('SHOP');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              RICE & GRAINS
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Fruits & Veg');
                setCurrentPage('SHOP');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              VEGGIES & FRUITS
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Pantry');
                setCurrentPage('SHOP');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              CEYLON SPICES
            </button>
            <button
              onClick={() => {
                setCurrentPage('TRACK_ORDER');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 hover:text-[#F8C519]"
            >
              TRACK YOUR ORDER
            </button>
            <button
              onClick={() => {
                setCurrentPage('DELIVERIES');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 text-[#F8C519] font-bold"
            >
              MY DELIVERIES ({ongoingDeliveriesCount})
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
