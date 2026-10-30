import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  AlertCircle,
  LogIn,
  UserPlus,
  Truck,
  Phone,
  ArrowRight,
  ChevronLeft,
  Banknote,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { Product, CartItem, CustomerUser } from '../types';
import { TranslationDictionary } from '../translations';

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
  // Cart Drawer
  isCartDrawerOpen: boolean;
  onCloseCartDrawer: () => void;
  cart: CartItem[];
  onUpdateCartQty: (productId: string, weight: string | undefined, delta: number) => void;
  onRemoveFromCart: (productId: string, weight?: string) => void;
  subtotal: number;
  onNavigateToCartPage: () => void;
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
  isCartDrawerOpen,
  onCloseCartDrawer,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  subtotal,
  onNavigateToCartPage,
  isDarkMode,
  t
}) => {
  // Product Modal State
  const [modalWeight, setModalWeight] = useState('1kg');

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

  // Onboarding Slides State
  const [onboardingView, setOnboardingView] = useState<'SPLASH' | 'SLIDES'>('SPLASH');

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
      {/* 1. PRODUCT DETAIL & WEIGHT SELECTOR MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="relative h-64 bg-slate-50 dark:bg-zinc-900 flex items-center justify-center p-4">
              <img
                src={selectedProduct.imageUrl}
                alt=""
                className="w-full h-full object-contain"
              />
              <button
                onClick={onCloseProductModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0A6847] text-white shadow">
                  ✨ {selectedProduct.aiFreshnessScore}% Prospețime
                </span>
                {selectedProduct.isOrganic && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E5A91A] text-amber-950 shadow">
                    Export Autentic Ceylon
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedProduct.title}</h3>
                  <p className="text-xs text-slate-400 font-bold">{selectedProduct.brand} • {selectedProduct.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#0A6847] dark:text-[#78F9B8]">
                    {(selectedProduct.price * calculateWeightMultiplier(modalWeight)).toFixed(2)} lei
                  </span>
                  <span className="text-xs text-slate-400 block font-bold">
                    {selectedProduct.availableWeights ? `pentru ${modalWeight}` : `per ${selectedProduct.unit}`}
                  </span>
                </div>
              </div>

              {selectedProduct.availableWeights && selectedProduct.availableWeights.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-extrabold uppercase text-slate-400">
                    Alege Gramajul:
                  </label>
                  <div className="flex gap-2">
                    {selectedProduct.availableWeights.map(w => (
                      <button
                        key={w}
                        onClick={() => setModalWeight(w)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition border ${
                          modalWeight === w
                            ? 'bg-[#0A6847] text-white border-emerald-600 shadow-sm'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                {selectedProduct.description ||
                  'Produs alimentar autentic importat direct din Sri Lanka, păstrat în condiții optime de temperatură și igienă în depozitul nostru din București.'}
              </p>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  onClick={onCloseProductModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                >
                  {t.closeBtn}
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct, 1, modalWeight);
                    onCloseProductModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition active:scale-95"
                >
                  {t.addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTHENTICATION MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#0A6847] text-white flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Cont Client România</h3>
              </div>
              <button
                onClick={onCloseAuth}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 text-orange-600 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-xs font-extrabold">
              <button
                onClick={() => { setAuthTab('LOGIN'); setAuthError(''); }}
                className={`py-2 rounded-xl transition ${
                  authTab === 'LOGIN' ? 'bg-[#0A6847] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Autentificare
              </button>
              <button
                onClick={() => { setAuthTab('REGISTER'); setAuthError(''); }}
                className={`py-2 rounded-xl transition ${
                  authTab === 'REGISTER' ? 'bg-[#0A6847] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Înregistrare Cont
              </button>
            </div>

            {authTab === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Adresă de Email</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Parolă</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition"
                >
                  {authLoading ? 'Se autentifică...' : <><LogIn className="w-4 h-4" /> Intră în Cont & Continuă</>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Nume și Prenume</label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Email</label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Telefon (+40)</label>
                    <input
                      type="tel"
                      required
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Adresă de Livrare în România</label>
                  <input
                    type="text"
                    required
                    value={registerForm.address}
                    onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Parolă</label>
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition"
                >
                  {authLoading ? 'Se creează contul...' : <><UserPlus className="w-4 h-4" /> Creează Cont & Comandă</>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. SPLASH SCREEN ("ආයුබෝවන්.!") */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          {onboardingView === 'SPLASH' && (
            <div className="relative max-w-sm w-full rounded-[40px] overflow-hidden shadow-2xl border border-emerald-100 flex flex-col justify-between h-[690px] bg-[#FFFDF9] text-slate-800">
              <button
                onClick={onCloseOnboarding}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex-1 overflow-hidden bg-[#FFFDF9]">
                <img
                  src="/ceylon_splash_artwork_sinhala.jpg"
                  alt="Ceylon Foods — ආයුබෝවන්.!"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-5 pt-3 text-center space-y-2.5 z-20 bg-gradient-to-t from-white via-white/95 to-transparent">
                <button
                  onClick={onCloseOnboarding}
                  className="w-full py-3.5 rounded-full bg-[#0A6847] hover:bg-[#085237] text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <span>Cumpără Alimente din Sri Lanka</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 text-xs">
                  <button
                    onClick={() => { onCloseOnboarding(); onOpenAuthFromOnboarding(); }}
                    className="font-bold text-slate-500 hover:text-[#0A6847] transition"
                  >
                    Ai deja cont? <span className="underline text-[#0A6847]">Autentificare</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. REAL-TIME ORDER TRACKING MODAL (RIDER DISPATCH & COD FLOW) */}
      {isTrackingOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {t.trackingSubtitle}
                </span>
                <h4 className="font-black text-base text-slate-900 dark:text-white mt-1">
                  {t.trackingTitle} #{activeOrder.orderNumber}
                </h4>
              </div>
              <button
                onClick={onCloseTracking}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs font-semibold">
              {/* Cash on Delivery Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                      {t.codOptionTitle}
                    </span>
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                      {t.cashAmountToPrepare}: <span className="text-[#0A6847] dark:text-[#78F9B8] font-black">{Number(activeOrder.totalAmount || 0).toFixed(2)} lei</span>
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#E5A91A] text-amber-950">
                  {t.codBadge}
                </span>
              </div>

              {/* Courier Company & Rider Dispatch Status */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0A6847] dark:text-[#78F9B8]" />
                    <span className="font-black text-xs text-slate-800 dark:text-white">
                      {t.courierAssigned}: {activeOrder.courierCompany || 'Glovo / Bolt / Sameday'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                    Dispatched
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-zinc-300">
                      Rider: {activeOrder.riderName || 'Rider Assigned'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {t.deliveryEta}: <strong>~25 - 35 mins</strong>
                    </p>
                  </div>

                  <a
                    href={`tel:${activeOrder.courierPhone || '+40219988'}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A6847] text-white text-[11px] font-black shadow-xs hover:bg-[#085237]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Rider</span>
                  </a>
                </div>
              </div>

              {/* Live Step Progress */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                  Delivery Progress:
                </span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.orderStatusPlaced}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.orderStatusProcessing}</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-bold text-[#0A6847] dark:text-[#78F9B8] bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <Clock className="w-4 h-4 animate-spin shrink-0 text-[#0A6847]" />
                    <span>{t.orderStatusDispatched}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{t.orderStatusDelivered}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 text-[11px] text-slate-500">
                <span>{t.shippingAddressTitle}: <strong className="text-slate-800 dark:text-white">{activeOrder.address || 'Strada Mihai Eminescu nr. 42, București'}</strong></span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={onCloseTracking}
                className="px-6 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition active:scale-95"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. QUICK SLIDE-OUT CART DRAWER */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div onClick={onCloseCartDrawer} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className={`w-screen max-w-md p-6 flex flex-col justify-between shadow-2xl ${
              isDarkMode ? 'bg-[#141816] text-white' : 'bg-white text-slate-800'
            }`}>
              <div className="space-y-4 overflow-y-auto pr-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#0A6847]" />
                    <h3 className="text-lg font-black">Coș de Cumpărături ({cart.length})</h3>
                  </div>
                  <button onClick={onCloseCartDrawer} className="p-1 rounded-full text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}`}
                      className="p-3 rounded-2xl border flex items-center justify-between bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.product.imageUrl} alt="" className="w-12 h-12 rounded-xl object-contain" />
                        <div>
                          <h4 className="text-xs font-extrabold">{item.product.title}</h4>
                          <p className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">
                            {(item.effectivePrice * item.quantity).toFixed(2)} lei
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, -1)} className="w-6 h-6 rounded bg-slate-200 dark:bg-zinc-800 font-bold">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, 1)} className="w-6 h-6 rounded bg-slate-200 dark:bg-zinc-800 font-bold">+</button>
                        <button onClick={() => onRemoveFromCart(item.product.id, item.selectedWeight)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <p className="text-center text-xs text-slate-400 py-10">Coșul este gol.</p>}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-3">
                  <div className="flex justify-between font-black text-base">
                    <span>Subtotal:</span>
                    <span className="text-[#0A6847] dark:text-[#78F9B8]">{subtotal.toFixed(2)} lei</span>
                  </div>
                  <button
                    onClick={() => {
                      onCloseCartDrawer();
                      onNavigateToCartPage();
                    }}
                    className="w-full py-3 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition"
                  >
                    Finalizează Comanda cu Plata la Livrare →
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
