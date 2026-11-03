import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onEnterStore: () => void;
  isDarkMode?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnterStore }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth progress simulation matching high-end grocery mobile apps
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 7;
        return Math.min(prev + delta, 100);
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100%, smoothly auto-dismiss and enter supermarket
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnterStore();
    }, 450);
  };

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#064F41]/35 backdrop-blur-md cursor-pointer transition-all duration-500 select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Quick Skip Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleEnter();
        }}
        className="absolute top-4 right-4 sm:top-7 sm:right-8 z-30 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#064F41] border border-[#15875D]/30 shadow-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
      >
        <span>Skip</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Main Splash Phone/Screen Container (Exact Reference Theme & Layout) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-[92vh] sm:max-h-[740px] sm:max-w-[390px] sm:rounded-[40px] bg-[#FAFBFB] shadow-[0_25px_80px_rgba(6,79,65,0.35)] sm:border-[7px] sm:border-white overflow-hidden flex flex-col justify-between items-center text-center animate-modal-pop"
        style={{
          boxShadow: '0 30px 90px -20px rgba(6, 79, 65, 0.4), 0 0 0 1px rgba(21, 135, 93, 0.12)'
        }}
      >
        {/* Subtle background ambient glow */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#15875D]/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. TOP HANGING BOTANICAL SPICE / BERRIES ACCENT (Reference Image 1) */}
        <div className="w-full flex justify-center pt-0 pointer-events-none z-10">
          <img
            src="/splash_top_berries.png"
            alt="Ceylon Fresh Botanicals"
            className="w-32 sm:w-36 h-auto object-contain drop-shadow-sm -mt-0.5 animate-pulse"
            style={{ animationDuration: '3.5s' }}
          />
        </div>

        {/* 2. CENTER BRAND EMBLEM & TYPOGRAPHY (Harmonized with Ceylon Foods Theme) */}
        <div className="px-6 py-1 flex flex-col items-center justify-center my-auto z-10">
          {/* Fresh Sprouting Green Leaves */}
          <div className="relative mb-0.5 flex items-center justify-center">
            {/* Left Leaf */}
            <svg
              className="w-10 h-10 text-[#0F634A] transform -rotate-12 -mr-2 drop-shadow-xs"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
            {/* Right Leaf */}
            <svg
              className="w-12 h-12 text-[#559B28] transform rotate-12 drop-shadow-xs"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </div>

          {/* Typography matching "Fresh and READY FOODS" aesthetic */}
          <div className="space-y-0.5">
            <h1
              className="text-5xl sm:text-6xl font-black italic tracking-tight text-[#064F41]"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', cursive, sans-serif",
                textShadow: '0 2px 4px rgba(6,79,65,0.06)'
              }}
            >
              Fresh
            </h1>

            <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-black tracking-wider text-[#15875D]">
              <span className="text-sm font-semibold lowercase italic text-[#15875D]/80">and</span>
              <span className="uppercase">READY</span>
            </div>

            {/* Dark Green Banner Badge */}
            <div className="pt-2 flex justify-center">
              <div
                className="px-6 py-1.5 rounded-md bg-[#064F41] text-white text-xs sm:text-sm font-black tracking-widest uppercase shadow-md"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)' }}
              >
                <span>CEYLON FOODS</span>
              </div>
            </div>
          </div>

          {/* Multilingual Subtitle (Reference Image 2 style) */}
          <div className="mt-4 space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F8C519] bg-[#064F41] px-3 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>ආයුබෝවන් • வணக்கம் • Welcome</span>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-[#6B7280] uppercase mt-1">
              AUTHENTIC SRI LANKAN PRODUCE
            </p>
            <p className="text-[10px] font-semibold text-[#15875D]">
              Delivered Fresh Across Bucharest & Ilfov
            </p>
          </div>

          {/* Minimalist App Loading Line */}
          <div className="w-48 sm:w-56 mt-4 space-y-1">
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden p-[1px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#15875D] via-[#F8C519] to-[#FF632B] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-[#064F41]/75 px-0.5">
              <span>Loading Fresh Store...</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Enter Button */}
          <button
            type="button"
            onClick={handleEnter}
            className="mt-3.5 px-6 py-2 rounded-full bg-[#F8C519] hover:bg-[#EEAB1E] active:scale-95 text-[#664E00] font-black text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Enter Supermarket</span>
          </button>
        </div>

        {/* 3. BOTTOM FRESH FRUITS & VEGETABLES HARVEST MOUND (Reference Image 1) */}
        <div className="w-full relative pointer-events-none -mb-1 z-10 flex justify-center">
          <img
            src="/splash_bottom_produce.png"
            alt="Fresh Sri Lankan Produce"
            className="w-full h-auto object-cover transform scale-105"
          />
        </div>
      </div>
    </div>
  );
};
