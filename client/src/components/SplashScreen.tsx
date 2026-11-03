import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Truck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface SplashScreenProps {
  onEnterStore: (selectedSector?: string) => void;
  isDarkMode?: boolean;
}

const DELIVERY_AREAS = [
  'București Sector 1 (Nord, Băneasa, Pipera)',
  'București Sector 2 (Colentina, Pantelimon, Tei)',
  'București Sector 3 (Centru Vechi, Titan, Dristor)',
  'București Sector 4 (Berceni, Olteniței)',
  'București Sector 5 (Rahova, 13 Septembrie)',
  'București Sector 6 (Militari, Drumul Taberei)',
  'Județul Ilfov (Otopeni, Voluntari, Chiajna, Mogoșoaia)',
  'Restul României (Livrare Rapidă Curier Național)'
];

const LOADING_MILESTONES = [
  { at: 15, text: 'Connecting to Bucharest Central Fresh Depot...' },
  { at: 40, text: 'Stocking Farm-Fresh Purple Brinjal, Okra & Ceylon Spices...' },
  { at: 75, text: 'Inspecting Keeri Samba Rice & Tropical Fruits Quality...' },
  { at: 95, text: 'Store Ready! Cash & Card on Delivery Doorstep Dispatch.' }
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnterStore }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Opening Ceylon Foods Supermarket...');
  const [selectedArea, setSelectedArea] = useState(DELIVERY_AREAS[0]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [autoEnterCountdown, setAutoEnterCountdown] = useState<number | null>(null);

  useEffect(() => {
    // Smooth progress simulation resembling Keells Super online loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 6;
        const next = Math.min(prev + delta, 100);

        // Update message based on milestone
        const matched = [...LOADING_MILESTONES].reverse().find(m => next >= m.at);
        if (matched) {
          setCurrentMessage(matched.text);
        }

        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100%, trigger short auto-dismiss countdown
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnterStore(selectedArea);
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#05352A] text-white overflow-hidden transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, #0A6847 0%, #064F41 45%, #03281F 100%)'
      }}
    >
      {/* Ambient background glow & soft botanical pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#80F6C7_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Quick Skip Button */}
      <button
        type="button"
        onClick={handleEnter}
        className="absolute top-5 right-5 sm:top-7 sm:right-8 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs font-semibold backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
      >
        <span>Skip Intro</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Main Splash Card Container */}
      <div className="relative z-10 w-full max-w-lg mx-4 px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-center flex flex-col items-center animate-modal-pop">
        
        {/* Multilingual Welcome Greeting Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F8C519]/20 border border-[#F8C519]/40 text-[#F8C519] text-[11px] sm:text-xs font-bold tracking-wide mb-5">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>ආයුබෝවන් • வணக்கம் • Welcome</span>
        </div>

        {/* Keells-Style Supermarket Fresh Cart Icon & Glow */}
        <div className="relative mb-4">
          <div className="absolute -inset-4 bg-[#80F6C7]/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3.5 shadow-2xl border-2 border-[#15875D] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src="/ceylon_cart_icon.png"
              alt="Ceylon Foods Supermarket"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          <span>Ceylon</span>
          <span className="text-[#FF632B]">Foods</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-[#80F6C7] mt-1">
          Sri Lanka's Fresh Produce in Romania • Supermarket Online
        </p>

        {/* Keells-style Animated Delivery Road & Progress Bar */}
        <div className="w-full mt-6 space-y-2">
          {/* Animated cart driving on track */}
          <div className="relative w-full h-8 overflow-hidden">
            <div
              className="absolute top-0 flex items-center gap-1.5 transition-all duration-300 ease-out"
              style={{ left: `calc(${Math.min(progress, 90)}% - 20px)` }}
            >
              <div className="p-1 rounded-md bg-[#F8C519] text-[#664E00] shadow-md animate-bounce">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            {/* Dashed Road line */}
            <div className="absolute bottom-1 left-0 right-0 h-[2px] border-b-2 border-dashed border-white/30" />
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#15875D] via-[#F8C519] to-[#FF632B] transition-all duration-200 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Milestone Status Text */}
          <div className="flex items-center justify-between text-[11px] text-white/80 font-medium px-1">
            <span className="truncate pr-2">{currentMessage}</span>
            <span className="font-bold text-[#F8C519] shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Keells Super Signature Feature: Delivery Location Confirmation */}
        <div className="w-full mt-6 p-4 rounded-2xl bg-black/25 border border-white/15 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#80F6C7]">
              <MapPin className="w-3.5 h-3.5 text-[#F8C519]" />
              <span>Select Your Delivery Area:</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#15875D] text-white">
              Bucharest Hub
            </span>
          </div>

          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white text-[#064F41] text-xs font-bold outline-none border border-slate-200 cursor-pointer shadow-inner"
          >
            {DELIVERY_AREAS.map(area => (
              <option key={area} value={area} className="text-slate-900 font-semibold py-1">
                {area}
              </option>
            ))}
          </select>

          {/* Trust Guarantee Badges */}
          <div className="pt-1 flex items-center justify-between text-[10px] text-white/85 font-medium border-t border-white/10">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#F8C519]" />
              <span>Cash / Card on Delivery</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#80F6C7]" />
              <span>Free Delivery &gt; 250 lei</span>
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={handleEnter}
          className="w-full mt-6 py-3.5 px-6 rounded-2xl bg-[#F8C519] hover:bg-[#EEAB1E] active:scale-98 text-[#664E00] font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition cursor-pointer group"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Enter Supermarket (Start Shopping)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Subtle footer credit */}
        <p className="text-[10px] text-white/60 mt-4">
          Bucharest Depot • Same-day Dispatch with Glovo, Bolt & Sameday
        </p>
      </div>
    </div>
  );
};
