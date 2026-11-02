import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  AlertCircle,
  LogIn,
  UserPlus,
  Truck,
  Phone,
  ArrowRight,
  Banknote,
  CheckCircle,
  Clock,
  MapPin,
  Lock,
  Sparkles,
  Star
} from 'lucide-react';
import { Product, CartItem, CustomerUser } from '../types';
import { TranslationDictionary } from '../translations';

export interface PopupNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  actionLabel?: string;
  onAction?: () => void;
}

interface ModalsProps {
  // Product Detail Modal
  selectedProduct: Product | null;
  onCloseProductModal: () => void;
  onAddToCart: (product: Product, qty: number, weight: string) => void;
  // Auth Modal
  isAuthOpen: boolean;
  onCloseAuth: () => void;
  onAuthSuccess: (user: CustomerUser) => void;
  // Splash / Onboarding Modal
  isOnboardingOpen: boolean;
  onCloseOnboarding: () => void;
  onOpenAuthFromOnboarding: () => void;
  // Order Tracking Modal
  isTrackingOpen: boolean;
  onCloseTracking: () => void;
  activeOrder: any;
  onConfirmReceived?: (orderIdOrNumber: string) => void;
  onNavigateDeliveries?: () => void;
  // Cart Drawer
  isCartDrawerOpen: boolean;
  onCloseCartDrawer: () => void;
  cart: CartItem[];
  onUpdateCartQty: (productId: string, weight: string | undefined, delta: number) => void;
  onRemoveFromCart: (productId: string, weight?: string) => void;
  subtotal: number;
  onNavigateToCartPage: () => void;
  // Figma Pop-up Toast Notification
  popupMessage?: PopupNotification | null;
  onClosePopupMessage?: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const Modals: React.FC<ModalsProps> = ({
  selectedProduct,
  onCloseProductModal,
  onAddToCart,
  isAuthOpen,
  onCloseAuth,
  onAuthSuccess,
  isOnboardingOpen,
  onCloseOnboarding,
  onOpenAuthFromOnboarding,
  isTrackingOpen,
  onCloseTracking,
  activeOrder,
  onConfirmReceived,
  onNavigateDeliveries,
  isCartDrawerOpen,
  onCloseCartDrawer,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  subtotal,
  onNavigateToCartPage,
  popupMessage,
  onClosePopupMessage,
  isDarkMode,
  t
}) => {
  // Product Modal State
  const [modalWeight, setModalWeight] = useState('1kg');
  const [modalQty, setModalQty] = useState(1);

  // Auth Modal State
  const [authTab, setAuthTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginForm, setLoginForm] = useState({ email: 'mihai@example.ro', password: 'password123' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: 'Strada Mihai Eminescu nr. 42, București Sector 1',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const calculateWeightMultiplier = (weightStr?: string) => {
    if (!weightStr) return 1;
    if (weightStr === '250g') return 0.25;
    if (weightStr === '500g') return 0.5;
    if (weightStr === '1kg') return 1.0;
    if (weightStr === '2kg') return 2.0;
    if (weightStr === '5kg') return 5.0;
    return 1;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/auth/customer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success && data.user) {
        onAuthSuccess(data.user);
        onCloseAuth();
      } else {
        setAuthError(data.message || 'Login failed. Check your email or password.');
      }
    } catch {
      setAuthError('Connection failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/auth/customer-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });
      const data = await res.json();
      if (data.success && data.user) {
        onAuthSuccess(data.user);
        onCloseAuth();
      } else {
        setAuthError(data.message || 'Registration failed.');
      }
    } catch {
      setAuthError('Connection failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      {/* 0. FIGMA-THEMED POP-UP NOTIFICATION BANNER / TOAST */}
      {popupMessage && (
        <div className="fixed bottom-6 right-6 z-[70] max-w-md w-full px-4 sm:px-0 animate-fadeIn">
          <div className="bg-white dark:bg-[#14201A] rounded-2xl shadow-[0_12px_36px_rgba(10,104,71,0.22)] border-2 border-[#15875D] overflow-hidden">
            {/* Top gold accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#1B8057] via-[#F8C519] to-[#F96D26]" />
            <div className="p-4 flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  popupMessage.type === 'warning'
                    ? 'bg-[#F8C519]/20 border-[#C08512] text-[#664E00]'
                    : 'bg-[#F0FAF3] border-[#15875D] text-[#0A6847]'
                }`}
              >
                {popupMessage.type === 'warning' ? (
                  <AlertCircle className="w-5 h-5 text-[#F96D26]" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-[#0A6847]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00]">
                    Ceylon Foods
                  </span>
                  {onClosePopupMessage && (
                    <button
                      onClick={onClosePopupMessage}
                      className="text-slate-400 hover:text-[#0A6847] transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#003D25] dark:text-white mt-1">
                  {popupMessage.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 leading-snug">
                  {popupMessage.message}
                </p>

                {popupMessage.actionLabel && popupMessage.onAction && (
                  <button
                    onClick={() => {
                      popupMessage.onAction?.();
                      onClosePopupMessage?.();
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-semibold shadow-sm transition"
                  >
                    <span>{popupMessage.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. PRODUCT DETAIL & WEIGHT SELECTOR POP-UP MODAL (FIGMA THEME) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#141A17] rounded-2xl max-w-xl w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-[#15875D] animate-modal-pop">
            {/* Figma Top Header Bar */}
            <div className="bg-[#1B8057] px-5 py-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="bg-white rounded-md px-2 py-1 shadow-sm">
                  <img src="/figma_logo_tight.png" alt="Ceylon Foods" className="h-5 w-auto object-contain" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-[#80F6C7]">
                  • {selectedProduct.category}
                </span>
              </div>
              <button
                onClick={onCloseProductModal}
                className="w-8 h-8 rounded-full bg-[#39906D] border border-white/60 text-white flex items-center justify-center hover:bg-[#0A6847] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product Image Showcase */}
            <div className="relative h-64 bg-[#F2F7F4] dark:bg-zinc-900 flex items-center justify-center p-6 border-b border-[#15875D]/20">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-full h-full object-contain drop-shadow-md"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#0A6847] text-white shadow-sm">
                  ✨ {selectedProduct.aiFreshnessScore}% Freshness
                </span>
                {selectedProduct.isOrganic && (
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#F8C519] text-[#664E00] border border-[#C08512]/40 shadow-sm">
                    Authentic Sri Lankan Import
                  </span>
                )}
              </div>
              {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-[#F96D26] text-white text-xs font-bold shadow-sm">
                  Save {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#F0FAF3] border border-[#15875D]/30 text-[#1B8057] text-[11px] font-semibold mb-1.5">
                    {selectedProduct.brand || 'Ceylon Foods Direct'}
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white leading-snug">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex items-center text-[#F8C519]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F8C519]" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      ({selectedProduct.reviewsCount || 120} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-2xl font-bold text-[#0A6847] dark:text-[#80F6C7] block">
                    {(selectedProduct.price * calculateWeightMultiplier(modalWeight) * modalQty).toFixed(2)} lei
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-[#C7C7C7] line-through font-medium block">
                      {(selectedProduct.originalPrice * calculateWeightMultiplier(modalWeight) * modalQty).toFixed(2)} lei
                    </span>
                  )}
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-[#F2F7F4] text-[#9E9E9E] text-xs font-medium">
                    {selectedProduct.availableWeights ? modalWeight : selectedProduct.unit}
                  </span>
                </div>
              </div>

              {/* Weight & Quantity Selector Row */}
              <div className="p-3.5 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D]/40 flex flex-wrap items-center justify-between gap-4">
                {selectedProduct.availableWeights && selectedProduct.availableWeights.length > 1 ? (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#003D25] dark:text-zinc-300 block">
                      Select Pack Weight:
                    </label>
                    <div className="flex gap-2">
                      {selectedProduct.availableWeights.map(w => (
                        <button
                          key={w}
                          onClick={() => setModalWeight(w)}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition border ${
                            modalWeight === w
                              ? 'bg-[#0A6847] text-white border-[#0A6847] shadow-sm'
                              : 'bg-white dark:bg-zinc-800 border-[#15875D]/30 text-[#003D25] dark:text-zinc-300 hover:border-[#15875D]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-[#003D25] dark:text-zinc-300">
                    Standard Pack: <span className="font-bold text-[#0A6847]">{selectedProduct.unit}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#003D25] dark:text-zinc-300">Qty:</span>
                  <div className="flex items-center bg-white dark:bg-zinc-800 rounded-md border border-[#15875D]/40 overflow-hidden">
                    <button
                      onClick={() => setModalQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#0A6847] hover:bg-[#F2F7F4] font-bold transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-black dark:text-white">
                      {modalQty}
                    </span>
                    <button
                      onClick={() => setModalQty(q => q + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#0A6847] hover:bg-[#F2F7F4] font-bold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#003D25] dark:text-zinc-300 leading-relaxed">
                {selectedProduct.description ||
                  'Authentic Sri Lankan grocery product imported directly for Ceylon Foods Bucharest. Carefully stored for peak aroma and freshness.'}
              </p>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  onClick={onCloseProductModal}
                  className="px-5 py-2.5 rounded-md border border-[#15875D] text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#F0FAF3] transition"
                >
                  {t.closeBtn}
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct, modalQty, modalWeight);
                    setModalQty(1);
                    onCloseProductModal();
                  }}
                  className="px-6 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-sm font-medium shadow-md inline-flex items-center gap-2 transition active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTHENTICATION POP-UP MODAL (FIGMA THEME) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#141A17] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-[#15875D] animate-modal-pop">
            {/* Figma Header */}
            <div className="bg-[#1B8057] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-md px-2.5 py-1 shadow-sm">
                  <img src="/figma_logo_tight.png" alt="Ceylon Foods" className="h-6 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-tight">{t.authModalTitle}</h3>
                  <span className="text-[11px] text-[#80F6C7] block">Authentic Sri Lankan Groceries</span>
                </div>
              </div>
              <button
                onClick={onCloseAuth}
                className="w-8 h-8 rounded-full bg-[#39906D] border border-white/60 text-white flex items-center justify-center hover:bg-[#0A6847] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {authError && (
                <div className="p-3 rounded-lg bg-[#FFF4EE] border border-[#F96D26] text-[#F96D26] text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 p-1 rounded-lg bg-[#F2F7F4] dark:bg-zinc-800 border border-[#15875D]/30 text-xs font-bold">
                <button
                  onClick={() => { setAuthTab('LOGIN'); setAuthError(''); }}
                  className={`py-2 rounded-md transition ${
                    authTab === 'LOGIN'
                      ? 'bg-[#0A6847] text-white shadow-sm'
                      : 'text-[#003D25] dark:text-zinc-400 hover:text-[#1B8057]'
                  }`}
                >
                  {t.tabSignIn}
                </button>
                <button
                  onClick={() => { setAuthTab('REGISTER'); setAuthError(''); }}
                  className={`py-2 rounded-md transition ${
                    authTab === 'REGISTER'
                      ? 'bg-[#0A6847] text-white shadow-sm'
                      : 'text-[#003D25] dark:text-zinc-400 hover:text-[#1B8057]'
                  }`}
                >
                  {t.tabRegister}
                </button>
              </div>

              {authTab === 'LOGIN' ? (
                <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.emailLabel}</label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.passwordLabel}</label>
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition"
                  >
                    {authLoading ? t.signingInBtn : <><LogIn className="w-4 h-4" /> {t.signInBtn}</>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.fullNameLabel}</label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.phoneLabel}</label>
                      <input
                        type="tel"
                        required
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.deliveryAddressRoLabel}</label>
                    <input
                      type="text"
                      required
                      value={registerForm.address}
                      onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                      className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#003D25] dark:text-zinc-300 mb-1 font-bold">{t.passwordLabel}</label>
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition"
                  >
                    {authLoading ? t.creatingAccountBtn : <><UserPlus className="w-4 h-4" /> {t.createAccountBtn}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. WELCOME / APP TOUR MODAL ("ආයුබෝවන්" — EXACT FIGMA THEME) */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#15875D] bg-[#F2F7F4] text-[#003D25] animate-modal-pop">
            {/* Top gold bar matching Figma header */}
            <div className="bg-[#F8C519] px-5 py-2 flex items-center justify-between text-[#664E00] text-xs font-semibold">
              <span>✨ Authentic Sri Lankan Grocery Store in Romania</span>
              <button
                onClick={onCloseOnboarding}
                className="w-6 h-6 rounded-full bg-[#EEAB1E] border border-[#C08512] text-[#664E00] flex items-center justify-center hover:bg-[#d99916] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="bg-white inline-block rounded-lg px-3 py-1.5 shadow-sm border border-[#15875D]/20">
                    <img src="/figma_logo_tight.png" alt="Ceylon Foods" className="h-8 w-auto object-contain" />
                  </div>
                  <img
                    src="/figma_ayubowan.png"
                    alt="ආයුබෝවන්"
                    className="h-14 w-auto object-contain"
                  />
                  <h3 className="text-xl font-bold text-[#1B8057] leading-snug">
                    Bringing the Authentic Taste of Home to You
                  </h3>
                </div>
                <img
                  src="/figma_hero_woman.png"
                  alt="Ceylon Foods Fresh"
                  className="w-32 sm:w-36 h-36 object-contain shrink-0 drop-shadow-md"
                />
              </div>

              {/* 3 Figma Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-[#F0FAF3] border border-[#15875D] rounded-lg p-3 flex items-center gap-2.5">
                  <img src="/figma_icon_delivery.png" alt="" className="w-9 h-9 object-contain shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1B8057]">Island-to-Door</h4>
                    <p className="text-[10px] text-[#1B8057]/80">Fast Bucharest & RO delivery</p>
                  </div>
                </div>
                <div className="bg-[#F0FAF3] border border-[#15875D] rounded-lg p-3 flex items-center gap-2.5">
                  <img src="/figma_icon_freshness.png" alt="" className="w-9 h-9 object-contain shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1B8057]">100% Fresh</h4>
                    <p className="text-[10px] text-[#1B8057]/80">Handpicked spices & rice</p>
                  </div>
                </div>
                <div className="bg-[#F0FAF3] border border-[#15875D] rounded-lg p-3 flex items-center gap-2.5">
                  <img src="/figma_icon_cod.png" alt="" className="w-9 h-9 object-contain shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1B8057]">Cash on Delivery</h4>
                    <p className="text-[10px] text-[#1B8057]/80">Pay when your order arrives</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={onCloseOnboarding}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 transition"
                >
                  <span>Shop Groceries Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onCloseOnboarding();
                    onOpenAuthFromOnboarding();
                  }}
                  className="text-xs font-bold text-[#1B8057] hover:underline px-3 py-2"
                >
                  Already have an account? <span className="text-[#F96D26] underline">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. REAL-TIME ORDER TRACKING POP-UP MODAL (RIDER DISPATCH & COD FLOW - FIGMA THEME) */}
      {isTrackingOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#141A17] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-[#15875D] animate-modal-pop">
            {/* Header */}
            <div className="bg-[#1B8057] px-6 py-4 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8C519] text-[#664E00] px-2.5 py-0.5 rounded">
                  {t.trackingSubtitle}
                </span>
                <h4 className="font-bold text-base text-white mt-1">
                  {t.trackingTitle} #{activeOrder.orderNumber}
                </h4>
              </div>
              <button
                onClick={onCloseTracking}
                className="w-8 h-8 rounded-full bg-[#39906D] border border-white/60 flex items-center justify-center text-white hover:bg-[#0A6847] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-semibold">
              {/* Cash on Delivery Notice */}
              <div className="p-4 rounded-xl bg-[#F8C519]/20 border border-[#C08512] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F8C519] text-[#664E00] flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#664E00] uppercase tracking-wider block">
                      {t.codOptionTitle}
                    </span>
                    <p className="font-bold text-sm text-[#003D25] dark:text-white mt-0.5">
                      {t.cashAmountToPrepare}:{' '}
                      <span className="text-[#0A6847] dark:text-[#80F6C7] font-extrabold">
                        {Number(activeOrder.totalAmount || 0).toFixed(2)} lei
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#F8C519] text-[#664E00] border border-[#C08512]/40">
                  {t.codBadge}
                </span>
              </div>

              {/* Courier Company & Rider Dispatch Status */}
              <div className="p-4 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0A6847]" />
                    <span className="font-bold text-xs text-[#003D25] dark:text-white">
                      {t.courierAssigned}: {activeOrder.courierCompany || 'Glovo / Bolt / Sameday'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0A6847] text-white">
                    Dispatched
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-[#15875D]/20">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-[#003D25] dark:text-zinc-200 flex items-center gap-1.5">
                        <span>Rider: {activeOrder.riderName || 'Assigning at store'}</span>
                        {activeOrder.riderVerifiedByAdmin && (
                          <span className="px-1.5 py-0.5 rounded bg-[#0A6847] text-white text-[9px] font-bold">
                            ✓ VERIFIED
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-[#1B8057]">
                        {t.deliveryEta}: <strong>~{activeOrder.deliveryMinutes || 25} mins</strong>
                      </p>
                    </div>

                    {/* DIRECT CALL CHECK: ONLY ACTIVE WHEN RIDER HAS ARRIVED AT STORE & ADMIN VERIFIED PHONE NUMBER */}
                    {activeOrder.riderVerifiedByAdmin && activeOrder.riderPhone ? (
                      <a
                        href={`tel:${activeOrder.riderPhone}`}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-[11px] font-bold shadow transition active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5 animate-bounce" />
                        <span>Call Rider: {activeOrder.riderPhone}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-[10px] font-bold border border-[#15875D]/40 cursor-not-allowed">
                        <Lock className="w-3 h-3 text-[#F96D26]" />
                        <span>Call Locked (Awaiting Rider Store Check-in)</span>
                      </div>
                    )}
                  </div>

                  {!activeOrder.riderVerifiedByAdmin && (
                    <p className="text-[10px] text-[#664E00] bg-[#F8C519]/25 p-2.5 rounded-lg border border-[#C08512]/40 leading-snug">
                      ℹ️ The rider is heading to our store to pick up your order. Direct calling will unlock automatically as soon as the rider arrives and verifies their mobile number with our admin.
                    </p>
                  )}
                </div>
              </div>

              {/* Live Step Progress */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase text-[#1B8057] tracking-wider block">
                  Delivery Progress:
                </span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-[#003D25] dark:text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-[#0A6847] shrink-0" />
                    <span>{t.orderStatusPlaced}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#003D25] dark:text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-[#0A6847] shrink-0" />
                    <span>{t.orderStatusProcessing}</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-bold text-[#0A6847] bg-[#F0FAF3] p-2.5 rounded-lg border border-[#15875D]">
                    <Clock className="w-4 h-4 animate-spin shrink-0 text-[#0A6847]" />
                    <span>{t.orderStatusDispatched}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{t.orderStatusDelivered}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F2F7F4] dark:bg-zinc-800 text-[11px] text-[#003D25] dark:text-zinc-300 border border-[#15875D]/20">
                <span>
                  {t.shippingAddressTitle}:{' '}
                  <strong className="text-black dark:text-white">
                    {activeOrder.address || 'Strada Mihai Eminescu nr. 42, București'}
                  </strong>
                </span>
              </div>

              {/* Confirm Parcel Received Action in Modal */}
              {activeOrder.status !== 'DELIVERED' && activeOrder.status !== 'CANCELLED' && onConfirmReceived && (
                <div className="p-3.5 rounded-xl bg-[#F0FAF3] dark:bg-emerald-950/40 border border-[#15875D] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-xs text-black dark:text-white block">
                      Parcel received & paid?
                    </span>
                    <span className="text-[10px] text-[#1B8057] dark:text-zinc-300">
                      Confirm you received your goods from the rider
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onConfirmReceived(activeOrder.id || activeOrder.orderNumber);
                      onCloseTracking();
                    }}
                    className="px-3.5 py-2 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-semibold shadow transition active:scale-95 shrink-0"
                  >
                    {t.confirmParcelReceivedBtn}
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F2F7F4] dark:bg-zinc-900 border-t border-[#15875D]/20 flex items-center justify-between">
              {onNavigateDeliveries && (
                <button
                  onClick={() => {
                    onCloseTracking();
                    onNavigateDeliveries();
                  }}
                  className="text-xs font-bold text-[#0A6847] hover:underline flex items-center gap-1"
                >
                  <span>{t.tabDeliveries} →</span>
                </button>
              )}
              <button
                onClick={onCloseTracking}
                className="px-6 py-2 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-semibold shadow transition active:scale-95"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. QUICK SLIDE-OUT CART DRAWER (FIGMA THEME) */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div onClick={onCloseCartDrawer} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div
              className={`w-screen max-w-md flex flex-col justify-between shadow-2xl border-l-2 border-[#15875D] ${
                isDarkMode ? 'bg-[#141816] text-white' : 'bg-white text-[#003D25]'
              }`}
            >
              {/* Drawer Header */}
              <div className="bg-[#1B8057] px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#F8C519]" />
                  <h3 className="text-base font-bold">
                    {t.myCart} ({cart.length})
                  </h3>
                </div>
                <button
                  onClick={onCloseCartDrawer}
                  className="w-8 h-8 rounded-full bg-[#39906D] border border-white/60 flex items-center justify-center text-white hover:bg-[#0A6847]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {cart.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="p-3.5 rounded-xl border border-[#15875D]/30 flex items-center justify-between bg-[#F0FAF3] dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-white p-1.5 border border-[#15875D]/20 flex items-center justify-center shrink-0">
                        <img src={item.product.imageUrl} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-black dark:text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <span className="inline-block px-2 py-0.5 rounded bg-white text-[#9E9E9E] text-[10px] font-medium my-0.5">
                          {item.selectedWeight || item.product.unit}
                        </span>
                        <p className="text-xs font-bold text-[#0A6847] dark:text-[#80F6C7]">
                          {(item.effectivePrice * item.quantity).toFixed(2)} lei
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, -1)}
                        className="w-6 h-6 rounded bg-white border border-[#15875D]/40 text-[#0A6847] font-bold hover:bg-[#0A6847] hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, 1)}
                        className="w-6 h-6 rounded bg-white border border-[#15875D]/40 text-[#0A6847] font-bold hover:bg-[#0A6847] hover:text-white transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id, item.selectedWeight)}
                        className="p-1 text-slate-400 hover:text-[#F96D26] transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="text-center py-14 space-y-2">
                    <ShoppingCart className="w-10 h-10 text-[#15875D]/40 mx-auto" />
                    <p className="text-xs font-semibold text-slate-400">{t.emptyCartTitle}</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-[#F2F7F4] dark:bg-zinc-900 border-t border-[#15875D]/30 space-y-3">
                  <div className="flex justify-between font-bold text-base">
                    <span>Subtotal:</span>
                    <span className="text-[#0A6847] dark:text-[#80F6C7]">{subtotal.toFixed(2)} lei</span>
                  </div>
                  <button
                    onClick={() => {
                      onCloseCartDrawer();
                      onNavigateToCartPage();
                    }}
                    className="w-full py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-sm font-medium shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t.checkoutCartDrawerBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
