import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Leaf, 
  Sparkles, 
  Award, 
  ShoppingBag, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Globe2
} from 'lucide-react';
import { AppPage } from './HeaderNav';
import { TranslationDictionary } from '../translations';

interface AboutUsViewProps {
  onNavigatePage: (page: AppPage) => void;
  isDarkMode?: boolean;
  t: TranslationDictionary;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigatePage, isDarkMode }) => {
  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-[#0B0F0D] text-white' : 'bg-[#F6F8F7] text-slate-900'} select-none pb-20`}>
      {/* 1. HERO HEADER WITH SRI LANKAN HERITAGE & LION FLAG */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#064F41] via-[#0A5F4F] to-[#15875D] text-white py-16 sm:py-24 px-4 sm:px-8">
        {/* Subtle patterned backdrop glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F8C519_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF632B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F8C519]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10 text-center space-y-6">
          {/* Authentic Island Badge with Flag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8C519] text-xs sm:text-sm font-bold shadow-lg">
            <img 
              src="/sri_lanka_flag.svg" 
              alt="Sri Lanka National Flag" 
              className="w-5 h-3.5 object-cover rounded-xs shadow-xs" 
            />
            <span>ආයුබෝවන් • வணக்கம் • Welcome to Ceylon Foods</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Bringing the Authentic Taste of <span className="text-[#F8C519] underline decoration-[#FF632B] decoration-wavy decoration-2">Sri Lanka</span> to Romania
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Your trusted bridge from the tropical island of Ceylon to your dinner table in Bucharest and across Romania. 100% genuine groceries, heirloom rice, and aromatic spices.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigatePage('SHOP')}
              className="px-7 py-3 rounded-full bg-[#F8C519] hover:bg-[#EEAB1E] active:scale-95 text-[#664E00] font-black text-sm shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Sri Lankan Groceries</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigatePage('CONTACT')}
              className="px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm border border-white/30 backdrop-blur-md shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#F8C519]" />
              <span>Contact Our Bucharest Team</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP WITH LION FLAGS */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141C18] border border-[#15875D]/30 shadow-xl">
          <div className="flex items-center gap-3.5 p-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
              <img src="/sri_lanka_flag.svg" alt="Sri Lanka Flag" className="w-7 h-auto rounded-xs shadow-xs" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black text-[#064F41] dark:text-[#78F9B8]">100%</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Authentic Ceylon Imports</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 text-[#15875D]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black text-[#064F41] dark:text-[#78F9B8]">Same-Day</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Bucharest & Ilfov Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex items-center justify-center shrink-0 text-[#FF632B]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black text-[#064F41] dark:text-[#78F9B8]">5,000+</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Happy Community Shoppers</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 text-[#1B8057]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black text-[#064F41] dark:text-[#78F9B8]">Cash on Delivery</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Pay at Doorstep in Romania</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY & ROOTS */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15875D]/10 text-[#064F41] dark:text-[#78F9B8] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF632B]" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#064F41] dark:text-white leading-tight">
              A Taste of Home, Sourced Directly from Ceylon to Romania
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded to serve the vibrant Sri Lankan community, expatriates, international students, and Romanian culinary enthusiasts, <strong>Ceylon Foods</strong> operates as the premier direct importer of authentic Sri Lankan food products in Romania.
              </p>
              <p>
                As part of the global <em>Ceylon Food Online</em> family, our mission is simple: to make sure you never have to miss the distinct, comforting taste of island home cooking. Whether you crave steaming <strong>Araliya Keeri Samba</strong>, fiery <strong>Jaffna curry</strong>, fresh purple <strong>wambatu (brinjal)</strong>, or a soothing cup of pure <strong>Dilmah Ceylon tea</strong>, we keep Romania’s largest dedicated Sri Lankan inventory in stock in Bucharest.
              </p>
              <p>
                Every single product on our shelves is rigorously vetted for authenticity, certified phytosanitary standards, and island origin. When you shop with us, you are buying 100% genuine Sri Lankan goods with absolute confidence.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Genuine Sri Lankan heritage brands (Araliya, Dilmah, Wijaya, MD)',
                'Fresh weekly shipments of island fruits & vegetables',
                'No advance payment required — Cash on Delivery accepted',
                'Multilingual team speaking Sinhala, Tamil, Romanian & English'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#15875D] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-zinc-200">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-7 bg-gradient-to-br from-[#064F41] to-[#15875D] text-white shadow-2xl relative overflow-hidden border-2 border-[#F8C519]/40">
              <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                <img src="/sri_lanka_flag.svg" alt="Lion Flag" className="w-40 h-auto" />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-xl p-2 shadow-md">
                    <img src="/figma_logo_tight.png" alt="Ceylon Foods" className="h-10 w-auto object-contain" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white">Ceylon Foods Supermarket</h3>
                    <p className="text-xs text-[#80F6C7] font-semibold">Bucharest, Sector 1 Hub</p>
                  </div>
                </div>

                <div className="h-[1px] bg-white/20 w-full" />

                <div className="space-y-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  <p className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#F8C519] shrink-0" />
                    <span>Global Network: <strong>ceylonfoodonline.com</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <img src="/sri_lanka_flag.svg" alt="Flag" className="w-4 h-3 rounded-xs shrink-0" />
                    <span>Direct Island Sourcing: Colombo, Jaffna, Kandy & Galle</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#F8C519] shrink-0" />
                    <span>Courier Handover: Sameday, Bolt, Glovo, Express Dispatch</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white space-y-1">
                  <p className="text-[#F8C519] font-bold uppercase tracking-wider text-[11px]">Sri Lankan Quality Guarantee</p>
                  <p className="opacity-95">"If any product does not meet the true standards of Ceylon origin and freshness, we replace it or refund with zero questions asked."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR CORE PILLARS */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-20">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF632B]">Our Commitments</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#064F41] dark:text-white">Why Shoppers Choose Ceylon Foods</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Everything we do is designed to give you peace of mind and the authentic island lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#064F41]/10 text-[#064F41] dark:text-[#78F9B8] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#064F41] dark:text-white">100% Genuine Origin</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Imported directly with official origin seals. Authentic Keeri Samba, Rathu Kekulu, roasted curry powder, and Dilmah tea.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#15875D]/10 text-[#15875D] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#064F41] dark:text-white">Fast Reliable Delivery</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Same-day courier in Bucharest & Ilfov. Express door-to-door delivery across all 41 Romanian counties in 24–48 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FF632B]/10 text-[#FF632B] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#064F41] dark:text-white">Pay on Delivery</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              No advance credit card risk. Inspect your parcel and pay cash or contactless card directly to the courier rider.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F8C519]/20 text-[#664E00] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#064F41] dark:text-white">Community First</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Dedicated customer service ready to assist you in Sinhala, Tamil, Romanian, or English by phone, email, and WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#064F41] via-[#0A5F4F] to-[#15875D] p-8 sm:p-12 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#F8C519]/30">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black uppercase text-[#F8C519] tracking-wider">
              <img src="/sri_lanka_flag.svg" alt="Flag" className="w-5 h-auto rounded-xs" />
              <span>Taste the Pride of the Island</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">Ready to Cook an Authentic Sri Lankan Meal?</h3>
            <p className="text-sm text-emerald-100/90 max-w-xl">
              Order today with Cash on Delivery and enjoy fast doorstep delivery in Bucharest and nationwide.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigatePage('SHOP')}
            className="px-8 py-3.5 rounded-full bg-[#F8C519] hover:bg-[#EEAB1E] active:scale-95 text-[#664E00] font-black text-sm shadow-xl transition shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
