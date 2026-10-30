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
      {/* 1. FEATURES PROPOSITIONS BANNER */}
      <div className="bg-[#F8FAF9] dark:bg-[#121614] border-t border-b border-slate-200 dark:border-zinc-800 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">Curieri Rapizi București</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Glovo, Bolt & Sameday în 30-45 min</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">Plata la Livrare (Cash)</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Ramburs numerar sau card la curier</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">Asistență Telefonică</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">+40 721 345 678 (București)</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">100% Export Autentic</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Orez, condimente & ceai de Ceylon</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER SUBSCRIPTION */}
      <div className="bg-[#0A6847] text-white py-10 px-4 sm:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Abonează-te la Noutăți & Sosiri de Produse Proaspete
            </h3>
            <p className="text-xs text-emerald-200">
              Află primul când sosesc transporturi noi de orez roșu, wambatu, frunze de curry și ceai de Ceylon în România.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Introduceți adresa de email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white text-slate-800 rounded-full pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none placeholder-slate-400 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#E5A91A] hover:bg-[#d69b12] text-amber-950 font-black text-xs shadow-md transition active:scale-95 shrink-0"
            >
              {isSubscribed ? 'Abonat!' : 'Abonează-mă'}
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
              Principalul magazin online de produse alimentare tradiționale din Sri Lanka în România. Deservim comunitatea din Sri Lanka și toți pasionații de arome autentice exotice cu livrare rapidă prin curieri.
            </p>

            <div className="space-y-1.5 text-xs text-emerald-100 font-semibold">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Strada Academiei 14, Sector 1, București, România</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Dispecerat Comenzi: +40 721 345 678 (Zilnic 08:00 - 21:00)</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-emerald-300 pt-2">
              <span className="hover:text-white cursor-pointer"><Facebook className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Instagram className="w-4 h-4" /></span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Link-uri Rapide
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => onNavigatePage('HOME')} className="hover:text-white transition">
                  Acasă
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('SHOP')} className="hover:text-white transition">
                  Magazin Alimentar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('CART')} className="hover:text-white transition">
                  Coș & Plata la Livrare
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('RECIPES')} className="hover:text-white transition">
                  Rețete CeylonBot AI
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Categorii Alimente
            </h4>
            <ul className="space-y-2 font-semibold">
              <li>
                <button onClick={() => { onSelectCategory('Staples & Grains'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Orez Alb Keeri Samba & Orez Roșu
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Fruits & Veg'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Wambatu & Legume de Ceylon
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Pantry'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Condimente de Ceylon & Pol
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Beverages'); onNavigatePage('SHOP'); }} className="hover:text-white transition">
                  Ceai Dilmah Single Origin
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Informații Curieri & Livrare
            </h4>
            <ul className="space-y-2 font-semibold text-emerald-200">
              <li>București Sectoare 1-6 (25-35 min)</li>
              <li>Județul Ilfov Express</li>
              <li>Livrare Națională Sameday / Fan Courier</li>
              <li>Plata Cash la Livrare (Ramburs)</li>
              <li>Garanție Prospețime 100%</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300">
          <p>© 2026 Ceylon Foods Supermarket România SRL. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-3">
            <span>Depozit Central: București Sector 1</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">Produse Autentice din Sri Lanka în România</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
