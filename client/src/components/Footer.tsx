import React from 'react';
import {
  Mail,
  PhoneCall,
  Facebook,
  Instagram,
  Globe
} from 'lucide-react';
import { TranslationDictionary } from '../translations';
import { AppPage } from './HeaderNav';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onSelectCategory: (cat: string) => void;
  onOpenSplash?: () => void;
  t: TranslationDictionary;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onOpenSplash }) => {
  return (
    <footer className="w-full mt-auto flex flex-col select-none">
      {/* 1. MAIN FOOTER BAND (FIGMA EXACT #1B8057) */}
      <div className="bg-[#1B8057] text-white py-10 sm:py-12 px-4 sm:px-8">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Column 1: Logo Card, Description & Social Icons */}
          <div className="md:col-span-5 space-y-5">
            {/* White Rounded Logo Card (Figma 251x141 style) */}
            <div
              onClick={() => onNavigatePage('HOME')}
              className="bg-[#FBFBFB] rounded-2xl px-5 py-3 inline-flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-[1.01] transition"
            >
              <img
                src="/figma_logo_tight.png"
                alt="Ceylon Foods"
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </div>

            <p className="text-white text-base sm:text-[17px] leading-relaxed max-w-[350px] font-normal">
              Keeri Samba white rice, Rathu Kekulu red rice, fresh brinjal, dhal, and Ceylon spices in stock in Bucharest
            </p>

            {/* 3 Circular Social Icons (#32A778) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-[#32A778] hover:bg-[#288E65] flex items-center justify-center text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-[#32A778] hover:bg-[#288E65] flex items-center justify-center text-white transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#website"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-[#32A778] hover:bg-[#288E65] flex items-center justify-center text-white transition"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: All Categories / Quick Links */}
          <div className="md:col-span-3 space-y-3 md:pt-8">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-normal text-white/95">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('HOME')}
                  className="hover:text-[#F8C519] transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('SHOP')}
                  className="hover:text-[#F8C519] transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Grocery Shop</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('ABOUT_US')}
                  className="hover:text-[#F8C519] font-medium text-[#F8C519] transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>🇱🇰 About Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('CONTACT')}
                  className="hover:text-[#F8C519] font-medium text-[#F8C519] transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>📞 Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('TRACK_ORDER')}
                  className="hover:text-[#F8C519] transition cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('DELIVERIES')}
                  className="hover:text-[#F8C519] transition cursor-pointer"
                >
                  My Deliveries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('WISHLIST')}
                  className="hover:text-[#F8C519] transition cursor-pointer"
                >
                  My Wishlist
                </button>
              </li>
              {onOpenSplash && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenSplash}
                    className="hover:text-[#F8C519] text-[#F8C519]/90 font-semibold transition cursor-pointer flex items-center gap-1.5 pt-1"
                  >
                    <span>✨ Supermarket Welcome Tour</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact (Grounded in ceylonfoodonline.com) */}
          <div className="md:col-span-4 space-y-4 md:pt-8">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
              Contact & Hub
            </h4>

            <div className="space-y-3 text-sm font-normal text-white">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-[35px] h-[31px] rounded-md bg-[#32A778] border border-white/50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-base">📍</span>
                </div>
                <div className="leading-snug">
                  <span className="font-semibold block text-[#F8C519]">Bucharest Hub & Store</span>
                  <span className="text-white/90 text-xs">Strada Mihai Eminescu nr. 42, Sector 1, București</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-[35px] h-[31px] rounded-md bg-[#32A778] border border-white/50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <a href="mailto:ceylonfoodonline@gmail.com" className="hover:text-[#F8C519] block transition">ceylonfoodonline@gmail.com</a>
                  <a href="mailto:orders@ceylonfoods.ro" className="hover:text-[#F8C519] block text-white/80 transition">orders@ceylonfoods.ro</a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-[35px] h-[31px] rounded-md bg-[#32A778] border border-white/50 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-medium">+40 722 456 789 <span className="text-[10px] text-emerald-200">(Bucharest)</span></div>
                  <div className="text-white/80">+81 070 4710 5533 <span className="text-[10px] text-emerald-200">(International)</span></div>
                </div>
              </div>

              {/* Working Hours & Global Reference */}
              <div className="pt-2 border-t border-white/20 text-xs text-white/90 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-100">
                  <span>🕒</span>
                  <span>Monday – Sunday: <strong>09:00 – 20:00</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-100">
                  <Globe className="w-3.5 h-3.5 text-[#F8C519]" />
                  <span>Global network: <a href="https://www.ceylonfoodonline.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F8C519]">ceylonfoodonline.com</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SRI LANKAN AUTHENTICITY TRUST STRIP */}
      <div className="bg-[#0c402b] text-white py-3 px-4 border-t border-emerald-800/60">
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <img src="/sri_lanka_flag.svg" alt="Sri Lanka Flag" className="w-6 h-4 object-cover rounded shadow-xs" />
            <span>100% Genuine Sri Lankan Imports Direct to Romania</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-emerald-200">
            <span>✨ Authentic Sourcing</span>
            <span>⚡ Express Dispatch</span>
            <span>💵 Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM COPYRIGHT BAR (FIGMA EXACT WHITE BAR WITH #1B8057 TEXT) */}
      <div className="bg-white dark:bg-zinc-950 py-4 px-4 text-center border-t border-slate-100 dark:border-zinc-900">
        <p className="text-[#1B8057] dark:text-emerald-400 text-xs sm:text-sm font-medium">
          © 2026 Ceylon Foods Supermarket Romania. All right reserved.
        </p>
      </div>
    </footer>
  );
};
