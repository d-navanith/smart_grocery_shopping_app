import React, { useState } from 'react';
import {
  Phone,
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  Sparkles,
  Sun,
  Moon,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Truck,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X
} from 'lucide-react';
import { CustomerUser, CartItem } from '../types';

interface HeaderNavProps {
  currentPage: 'HOME' | 'SHOP' | 'CART' | 'RECIPES';
  setCurrentPage: (page: 'HOME' | 'SHOP' | 'CART' | 'RECIPES') => void;
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
  onOpenCartDrawer,
  onOpenAppTour,
  subtotal
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    'All Categories',
    'Staples & Grains',
    'Fruits & Veg',
    'Pantry & Spices',
    'Dairy & Eggs',
    'Bakery & Roast Paan',
    'Beverages & Ceylon Tea',
    'Snacks & Biscuits'
  ];

  return (
    <header className="w-full flex flex-col z-30 select-none">
      {/* 1. TOP NOTICE / ANNOUNCEMENT BAR (GOLDEN HARVEST YELLOW #E5A91A) */}
      <div className="bg-[#E5A91A] text-amber-950 text-xs font-bold py-1.5 px-4 sm:px-8 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Hotline in Romania */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-900" />
            <span className="font-extrabold tracking-tight">
              București Hub: <span className="underline">+40 721 345 678</span>
            </span>
          </div>

          {/* Center: Romanian Sri Lankan Market Context Announcement */}
          <div className="hidden md:flex items-center gap-2 text-center">
            <span>
              🇷🇴 🇱🇰 Autentice Alimente din Sri Lanka în România — <span className="font-black text-emerald-950 underline decoration-amber-900 decoration-2">Plata la Livrare (Cash on Delivery)</span> în București & Toată Țara!
            </span>
          </div>

          {/* Right: Social Media, Theme & App Tour */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAppTour}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-900/15 hover:bg-amber-900/25 text-amber-950 text-[11px] font-black transition"
            >
              <Sparkles className="w-3 h-3 text-amber-900" />
              <span>ආයුබෝවන් (Tour)</span>
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-900/15 hover:bg-amber-900/25 text-amber-950 text-[11px] font-bold transition"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (DEEP CEYLON FOREST GREEN #0A6847) */}
      <div className="bg-[#0A6847] text-white py-3.5 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Logo & Title */}
          <div
            onClick={() => {
              setCurrentPage('HOME');
              setSelectedCategory('All');
            }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="bg-white p-1 rounded-2xl shadow-sm border border-emerald-800">
              <img
                src="/ceylon_foods_logo.png"
                alt="Ceylon Foods Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                Ceylon <span className="text-[#FFB800]">Foods</span>
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-emerald-200 uppercase mt-0.5">
                Supermarket România • Sri Lankan Authentic
              </span>
            </div>
          </div>

          {/* Romanian Delivery Location Selector */}
          <div className="hidden xl:flex items-center gap-2 bg-emerald-900/70 border border-emerald-700/60 rounded-full px-3.5 py-2 text-xs font-bold text-emerald-100 hover:bg-emerald-900 transition cursor-pointer">
            <MapPin className="w-4 h-4 text-[#FFB800]" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-emerald-300">Livrare În România</span>
              <span className="font-extrabold text-white leading-none">București & Național ▾</span>
            </div>
          </div>

          {/* Search Bar with Integrated Category Dropdown */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center rounded-full bg-white text-slate-800 shadow-inner overflow-hidden border-2 border-transparent focus-within:border-[#FFB800] transition">
              <div className="hidden sm:flex items-center border-r border-slate-200 px-3 bg-slate-50 text-slate-700 text-xs font-bold shrink-0">
                <select
                  value={selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  onChange={(e) => {
                    const val = e.target.value === 'All Categories' ? 'All' : e.target.value;
                    setSelectedCategory(val);
                    if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                  }}
                  className="bg-transparent py-2.5 outline-none cursor-pointer text-xs font-semibold"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="text-slate-800 font-semibold">{c}</option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Caută orez alb, orez roșu, wambatu, condimente de Ceylon, ceai..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              <button
                onClick={() => {
                  if (currentPage !== 'SHOP') setCurrentPage('SHOP');
                }}
                className="bg-[#0A6847] hover:bg-[#085237] text-white p-2.5 m-1 rounded-full transition shrink-0"
                title="Căutare Produse"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Action Icons: Wishlist, Cart with Lei display */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => {
                if (currentPage !== 'SHOP') setCurrentPage('SHOP');
              }}
              className="relative p-2 rounded-full hover:bg-emerald-800/80 text-white transition flex items-center justify-center"
              title="Favorite"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5A91A] text-amber-950 text-[10px] font-black flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button with Total in LEI */}
            <div
              onClick={() => setCurrentPage('CART')}
              className="flex items-center gap-2.5 bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-700/80 rounded-full px-3 py-1.5 cursor-pointer transition active:scale-95"
              title="Vezi Coșul de Cumpărături"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#FFB800]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E5A91A] text-amber-950 text-[10px] font-black flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[9px] uppercase font-bold text-emerald-300">Coșul Meu</span>
                <span className="text-xs font-black text-white leading-tight">
                  {subtotal.toFixed(2)} lei
                </span>
              </div>
            </div>

            {/* User Account / Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/60 pl-2 pr-1.5 py-1 rounded-full text-xs">
                <div className="w-7 h-7 rounded-full bg-[#E5A91A] text-amber-950 font-black flex items-center justify-center text-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold max-w-[90px] truncate hidden lg:inline text-white">
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogout}
                  title="Deconectare"
                  className="p-1 text-emerald-300 hover:text-red-400 rounded-lg transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0A6847] font-extrabold text-xs shadow-sm transition active:scale-95"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Autentificare</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECONDARY SUB-NAVBAR WITH GOLDEN YELLOW BUTTON */}
      <div className={`border-b transition ${isDarkMode ? 'bg-[#121614] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Golden Yellow Category Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#E5A91A] hover:bg-[#d69b12] text-amber-950 font-black text-xs shadow-sm transition active:scale-95"
              >
                <span>☰</span>
                <span>Toate Categoriile (Browse)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl py-2 z-50">
                  {categories.map((c) => (
                    <div
                      key={c}
                      onClick={() => {
                        const val = c === 'All Categories' ? 'All' : c;
                        setSelectedCategory(val);
                        setCurrentPage('SHOP');
                        setIsCategoryMenuOpen(false);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-[#0A6847] dark:hover:text-[#78F9B8] cursor-pointer transition flex items-center justify-between"
                    >
                      <span>{c}</span>
                      <span className="text-[10px] text-slate-400">→</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-slate-700 dark:text-zinc-300">
              <button
                onClick={() => setCurrentPage('HOME')}
                className={`transition hover:text-[#0A6847] dark:hover:text-[#78F9B8] ${
                  currentPage === 'HOME' ? 'text-[#0A6847] dark:text-[#78F9B8] border-b-2 border-[#0A6847] pb-1' : ''
                }`}
              >
                Acasă
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('SHOP');
                }}
                className={`transition hover:text-[#0A6847] dark:hover:text-[#78F9B8] ${
                  currentPage === 'SHOP' ? 'text-[#0A6847] dark:text-[#78F9B8] border-b-2 border-[#0A6847] pb-1' : ''
                }`}
              >
                Magazin Alimentar (Shop)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Staples & Grains');
                  setCurrentPage('SHOP');
                }}
                className="transition hover:text-[#0A6847] dark:hover:text-[#78F9B8]"
              >
                Orez & Cereale (Rice)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Fruits & Veg');
                  setCurrentPage('SHOP');
                }}
                className="transition hover:text-[#0A6847] dark:hover:text-[#78F9B8]"
              >
                Legume & Wambatu
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Pantry');
                  setCurrentPage('SHOP');
                }}
                className="transition hover:text-[#0A6847] dark:hover:text-[#78F9B8]"
              >
                Condimente Ceylon (Spices)
              </button>
              <button
                onClick={() => setCurrentPage('CART')}
                className={`flex items-center gap-1.5 transition hover:text-[#0A6847] dark:hover:text-[#78F9B8] ${
                  currentPage === 'CART' ? 'text-[#0A6847] dark:text-[#78F9B8] border-b-2 border-[#0A6847] pb-1' : ''
                }`}
              >
                <span>Coș de Cumpărături</span>
                {totalCartCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#E5A91A] text-amber-950 text-[10px] font-black">
                    {totalCartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentPage('RECIPES')}
                className={`flex items-center gap-1 transition hover:text-[#0A6847] dark:hover:text-[#78F9B8] ${
                  currentPage === 'RECIPES' ? 'text-[#0A6847] dark:text-[#78F9B8] border-b-2 border-[#0A6847] pb-1' : ''
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0A6847] dark:text-[#78F9B8]" />
                <span>Rețete AI Chef</span>
              </button>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
            <Truck className="w-3.5 h-3.5 text-[#0A6847] dark:text-[#78F9B8]" />
            <span>Livrare Gratuită peste <strong>250 lei</strong></span>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-zinc-800 px-4 py-3 space-y-2 bg-white dark:bg-zinc-900 text-xs font-bold">
            <button
              onClick={() => { setCurrentPage('HOME'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 text-slate-800 dark:text-white"
            >
              Acasă
            </button>
            <button
              onClick={() => { setCurrentPage('SHOP'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 text-slate-800 dark:text-white"
            >
              Magazin Alimentar Sri Lanka
            </button>
            <button
              onClick={() => { setCurrentPage('CART'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 text-slate-800 dark:text-white"
            >
              Coș ({totalCartCount})
            </button>
            <button
              onClick={() => { setCurrentPage('RECIPES'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 text-slate-800 dark:text-white"
            >
              Rețete CeylonBot AI
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
