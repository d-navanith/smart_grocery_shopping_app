import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onEnterStore: (sector?: string) => void;
  isDarkMode?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnterStore, isDarkMode }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
    };
  }, []);

  useEffect(() => {
    // Calm, steady progress pacing (~3.6s total to reach 100%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth, gentle increments of 1-3% every 70ms
        const delta = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + delta, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100%, hold briefly so the user sees completion, then smoothly fade out
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Handle keyboard interaction (Esc to skip, Enter or Space to enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEnter = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onEnterStore();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ceylon Foods Welcome Screen"
      onClick={handleEnter}
      className={`fixed inset-0 select-none overflow-hidden cursor-pointer transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: '#F2F7F4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Bar with Skip button */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000000,
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-xs transition-all duration-200 cursor-pointer bg-white/95 hover:bg-white text-[#064F41] border-[#064F41]/15 hover:shadow-md"
          title="Skip to store (Esc)"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
        </button>
      </div>

      {/* Centerpiece: The Exact Ceylon Foods Splash Artwork */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          margin: 'auto 0',
        }}
      >
        {/* Main Artwork Image */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/splash_screen_exact.png"
            alt="Ceylon Foods - ආයුබෝවන් - வணக்கம் - Welcome | The taste of Sri Lanka, delivered to your home."
            style={{
              width: '100%',
              maxWidth: '680px',
              height: 'auto',
              maxHeight: '48vh',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            loading="eager"
          />
        </div>

        {/* Minimalist Progress Indicator */}
        <div
          style={{
            width: '100%',
            maxWidth: '240px',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Progress Track */}
          <div
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '9999px',
              overflow: 'hidden',
              backgroundColor: '#e0e9e4',
              padding: '1px',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #064F41 0%, #15875D 50%, #FF632B 100%)',
                transition: 'width 150ms ease-out',
              }}
            />
          </div>

          {/* Loading status line */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#064F41',
              padding: '0 2px',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {progress < 100 ? (
                <>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#15875D',
                    }}
                  />
                  Loading Store...
                </>
              ) : (
                <span style={{ color: '#15875D', fontWeight: 700 }}>
                  ✓ Welcome to Ceylon Foods
                </span>
              )}
            </span>
            <span style={{ fontWeight: 800 }}>{progress}%</span>
          </div>

          {/* Quick Enter Pill Button */}
          <button
            type="button"
            onClick={handleEnter}
            className="mt-1 inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold text-[#064F41] bg-white/95 hover:bg-white border border-[#064F41]/15 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            <span>Enter Supermarket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle bottom footer note */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          textAlign: 'center',
          pointerEvents: 'none',
          width: '100%',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(6, 79, 65, 0.45)',
            margin: 0,
          }}
        >
          Fresh Sri Lankan Groceries & Spices in Romania
        </p>
      </div>
    </div>
  );
};
