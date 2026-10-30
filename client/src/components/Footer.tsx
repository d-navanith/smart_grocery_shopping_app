import React, { useState } from 'react';
import {
  Truck,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Send,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle
} from 'lucide-react';

interface FooterProps {
  onNavigatePage: (page: 'HOME' | 'SHOP' | 'CART' | 'RECIPES') => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full mt-auto flex flex-col select-none">
      {/* 1. FEATURES PROPOSITIONS BANNER (MATCHING IMAGE 1 & 2) */}
      <div className="bg-[#F8FAF9] dark:bg-[#121614] border-t border-b border-slate-200 dark:border-zinc-800 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">On all Colombo orders over Rs. 5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">Flexible Payment</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">LankaQR, Visa, Master, COD</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">24x7 Customer Support</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Dedicated assistance anytime</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">100% Quality Inspected</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Fresh from certified island farms</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER SUBSCRIPTION STRIP (IMAGE 1 & 2) */}
      <div className="bg-[#0A6847] text-white py-10 px-4 sm:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Subscribe to our Supermarket Newsletter
            </h3>
            <p className="text-xs text-emerald-200">
              Get e-mail updates about our freshest farm harvests, discounts & weekly special offers.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white text-slate-800 rounded-full pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none placeholder-slate-400 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#E5A91A] hover:bg-[#d69b12] text-amber-950 font-black text-xs shadow-md transition active:scale-95 shrink-0"
            >
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* 3. DEEP CEYLON FOREST GREEN FOOTER (IMAGE 1 & 2) */}
      <div className="bg-[#074428] text-emerald-100 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-2xl shadow-sm border border-emerald-800">
                <img
                  src="/ceylon_foods_logo.png"
                  alt="Ceylon Foods Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  Ceylon <span className="text-[#FFB800]">Foods</span>
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-emerald-300 uppercase mt-0.5">
                  Sri Lanka Online Supermarket
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Sri Lanka's leading digital supermarket connecting local island farmers with consumers for 45-minute fresh doorstep delivery across Colombo & suburbs.
            </p>

            <div className="space-y-1.5 text-xs text-emerald-100 font-semibold">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>33 York Street, Colombo 01, Sri Lanka</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Hotline: +94 11 234 5678 (24x7)</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-emerald-300 pt-2">
              <span className="hover:text-white cursor-pointer"><Facebook className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Twitter className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Instagram className="w-4 h-4" /></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => onNavigatePage('HOME')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('SHOP')} className="hover:text-white transition">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('CART')} className="hover:text-white transition">
                  Shopping Cart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('RECIPES')} className="hover:text-white transition">
                  AI Chef Recipes
                </button>
              </li>
              <li>
                <span className="text-emerald-400/60 cursor-default">About Us</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => { onSelectCategory('Fruits'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Fresh Fruits
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Vegetables'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Vegetables & Greens
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Dairy & Eggs'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Highland Dairy & Eggs
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Meat & Seafood'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Meat & Seafood
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Staples & Grains'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Rice & Ceylon Staples
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 font-semibold text-emerald-200">
              <li>Colombo Express Zones</li>
              <li>Track Active Order</li>
              <li>Quality Guarantee Policy</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300">
          <p>© 2026 Ceylon Foods Supermarket Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span>Central Hub: Colombo 01</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">100% Sri Lankan Owned & Operated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
