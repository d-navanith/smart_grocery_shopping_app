import React, { useState } from 'react';
import {
  Truck,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Mail,
  MapPin,
  Facebook,
  Instagram
} from 'lucide-react';
import { TranslationDictionary } from '../translations';

import { AppPage } from './HeaderNav';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onSelectCategory: (cat: string) => void;
  t: TranslationDictionary;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onSelectCategory, t }) => {
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
      {/* 1. FEATURES PROPOSITIONS BANNER */}
      <div className="bg-[#F8FAF9] dark:bg-[#121614] border-t border-b border-slate-200 dark:border-zinc-800 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">{t.footerFeatureDelivery}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{t.footerFeatureDeliveryDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">{t.footerFeatureCod}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{t.footerFeatureCodDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">{t.footerFeaturePhone}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{t.footerFeaturePhoneDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">{t.footerFeatureExport}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{t.footerFeatureExportDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER SUBSCRIPTION */}
      <div className="bg-[#0A6847] text-white py-10 px-4 sm:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {t.newsletterTitle}
            </h3>
            <p className="text-xs text-emerald-200">
              {t.newsletterDesc}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder={t.newsletterPlaceholder}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white text-slate-800 rounded-full pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none placeholder-slate-400 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#E5A91A] hover:bg-[#d69b12] text-amber-950 font-black text-xs shadow-md transition active:scale-95 shrink-0"
            >
              {isSubscribed ? t.newsletterSubscribed : t.newsletterBtn}
            </button>
          </form>
        </div>
      </div>

      {/* 3. DEEP CEYLON FOREST GREEN FOOTER */}
      <div className="bg-[#074428] text-emerald-100 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
                  Supermarket România • Sri Lankan Products
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              {t.footerAboutDesc}
            </p>

            <div className="space-y-1.5 text-xs text-emerald-100 font-semibold">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{t.footerAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{t.footerOrderDispatch}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-emerald-300 pt-2">
              <span className="hover:text-white cursor-pointer"><Facebook className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Instagram className="w-4 h-4" /></span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {t.browseCategories}
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => onNavigatePage('HOME')} className="hover:text-white transition">
                  {t.tabHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('SHOP')} className="hover:text-white transition">
                  {t.tabShop}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('WISHLIST')} className="hover:text-white transition text-rose-300">
                  ❤️ {t.wishlistTitle}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('TRACK_ORDER')} className="hover:text-white transition text-emerald-300">
                  🚚 {t.trackOrderTitle}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('ACCOUNT')} className="hover:text-white transition">
                  👤 {t.accountTitle}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('DELIVERIES')} className="hover:text-white transition font-bold text-[#FFB800]">
                  🛵 {t.tabDeliveries}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {t.filterCategories}
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => { onSelectCategory('Staples & Grains'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  {t.catRice}
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Fruits & Veg'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  {t.catVeg}
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Pantry'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  {t.catSpices}
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Beverages'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  {t.catTea}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {t.footerCourierInfoTitle}
            </h4>
            <ul className="space-y-2 font-semibold text-emerald-200">
              <li>{t.footerCourierItem1}</li>
              <li>{t.footerCourierItem2}</li>
              <li>{t.footerCourierItem3}</li>
              <li>{t.footerCourierItem4}</li>
              <li>{t.footerCourierItem5}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300">
          <p>{t.footerRights}</p>
          <div className="flex items-center gap-3">
            <span>{t.ribbonCentralDepot.replace('• ', '')}</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">{t.ribbonAuthentic}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
