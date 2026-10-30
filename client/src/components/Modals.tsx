import React, { useState } from 'react';
import {
  X,
  Star,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Trash2,
  MapPin,
  AlertCircle,
  LogIn,
  UserPlus,
  Truck,
  Phone,
  ArrowRight,
  ChevronLeft,
  Leaf
} from 'lucide-react';
import { Product, CartItem, CustomerUser } from '../types';

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
  isDarkMode
}) => {
  // Product Modal State
  const [modalWeight, setModalWeight] = useState('1kg');

  // Auth Modal State
  const [authTab, setAuthTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginForm, setLoginForm] = useState({ email: 'brie@example.com', password: 'password123' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '33 York Street, Colombo 01',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Onboarding Slides State
  const [onboardingView, setOnboardingView] = useState<'SPLASH' | 'SLIDES'>('SPLASH');
  const [onboardingStep, setOnboardingStep] = useState(0);

  const calculateWeightMultiplier = (weightStr?: string) => {
    if (!weightStr) return 1;
    if (weightStr === '250g') return 0.25;
    if (weightStr === '500g') return 0.5;
    if (weightStr === '1kg') return 1.0;
    if (weightStr === '2kg') return 2.0;
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
                  ✨ {selectedProduct.aiFreshnessScore}% Fresh
                </span>
                {selectedProduct.isOrganic && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E5A91A] text-amber-950 shadow">
                    100% Organic
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
                    Rs. {Math.round(selectedProduct.price * calculateWeightMultiplier(modalWeight)).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 block font-bold">
                    {selectedProduct.availableWeights ? `for ${modalWeight}` : `per ${selectedProduct.unit}`}
                  </span>
                </div>
              </div>

              {/* Portion Weight Selection */}
              {selectedProduct.availableWeights && selectedProduct.availableWeights.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-extrabold uppercase text-slate-400">
                    Select Produce Portion:
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
                  'High quality, fresh supermarket staple. Sourced according to strict quality standards and handled with clean refrigeration.'}
              </p>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  onClick={onCloseProductModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct, 1, modalWeight);
                    onCloseProductModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition active:scale-95"
                >
                  Add to Cart
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
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Customer Account</h3>
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
                Sign In
              </button>
              <button
                onClick={() => { setAuthTab('REGISTER'); setAuthError(''); }}
                className={`py-2 rounded-xl transition ${
                  authTab === 'REGISTER' ? 'bg-[#0A6847] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Create Account
              </button>
            </div>

            {authTab === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Password</label>
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
                  {authLoading ? 'Signing In...' : <><LogIn className="w-4 h-4" /> Sign In & Continue</>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Full Name</label>
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
                    <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Mobile Phone</label>
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
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={registerForm.address}
                    onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Password</label>
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
                  {authLoading ? 'Creating Account...' : <><UserPlus className="w-4 h-4" /> Create Account</>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. SPLASH SCREEN & ONBOARDING ("ආයුබෝවන්.!") */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          {onboardingView === 'SPLASH' ? (
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
                  <span>Shop Island Groceries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 text-xs">
                  <button
                    onClick={() => { onCloseOnboarding(); onOpenAuthFromOnboarding(); }}
                    className="font-bold text-slate-500 hover:text-[#0A6847] transition"
                  >
                    Already have an account? <span className="underline text-[#0A6847]">Sign In</span>
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => { setOnboardingView('SLIDES'); setOnboardingStep(0); }}
                    className="font-bold text-[#E5A91A] hover:underline"
                  >
                    Feature Tour →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col max-h-[92vh]">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setOnboardingView('SPLASH')} className="p-1 rounded-lg text-slate-400">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-black text-sm tracking-tight text-[#0A6847] dark:text-white">
                    Ceylon <span className="text-[#E5A91A]">Foods</span> Tour
                  </span>
                </div>
                <button onClick={onCloseOnboarding} className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <span>Skip</span> <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-4">
                <div className="h-60 rounded-2xl overflow-hidden shadow">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                    alt="Groceries"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Island-Fresh Supermarket Quality</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct from certified Nuwara Eliya and Dambulla growers with AI freshness inspection and fast 45-minute delivery across Colombo.
                </p>
              </div>

              <div className="p-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={onCloseOnboarding}
                  className="px-6 py-2.5 rounded-full bg-[#0A6847] text-white text-xs font-black"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ORDER TRACKING MODAL */}
      {isTrackingOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
            <div className="p-4 border-b flex items-center justify-between">
              <h4 className="font-black text-sm">Order #{activeOrder.orderNumber} Live Tracking</h4>
              <button onClick={onCloseTracking}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 text-[#0A6847]">
                <Truck className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-black text-sm">Courier on the Way (Electric Scooter)</p>
                  <p className="text-[11px] text-emerald-800 font-semibold">Estimated arrival in ~25 minutes</p>
                </div>
              </div>
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
                    <h3 className="text-lg font-black">Shopping Basket ({cart.length})</h3>
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
                            Rs. {Math.round(item.effectivePrice * item.quantity).toLocaleString()}
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
                  {cart.length === 0 && <p className="text-center text-xs text-slate-400 py-10">Cart is empty.</p>}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-3">
                  <div className="flex justify-between font-black text-base">
                    <span>Subtotal:</span>
                    <span className="text-[#0A6847] dark:text-[#78F9B8]">Rs. {Math.round(subtotal).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      onCloseCartDrawer();
                      onNavigateToCartPage();
                    }}
                    className="w-full py-3 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow transition"
                  >
                    View Full Cart Page (Image 2 Theme)
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
