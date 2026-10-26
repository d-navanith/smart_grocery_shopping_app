import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  User,
  Search,
  Mic,
  Star,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  CheckCircle,
  Truck,
  Sun,
  Moon,
  Heart,
  Send,
  ChefHat,
  X,
  Filter,
  ShieldCheck,
  Zap,
  ShoppingBasket,
  CreditCard,
  Banknote,
  Award,
  Lock,
  LogIn,
  UserPlus,
  LogOut,
  ArrowUpDown,
  AlertCircle,
  Gift,
  Check,
  Leaf,
  Compass
} from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  title: string;
  description?: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  unit: string;
  unitWeight?: string;
  imageUrl: string;
  stock: number;
  store: string;
  status: 'Active' | 'Inactive';
  aiFreshnessScore: number;
  isOrganic: boolean;
  isFarmSourced: boolean;
  rating: number;
  reviewsCount: number;
  availableWeights?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
  effectivePrice: number;
}

interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const DELIVERY_TIME_SLOTS = [
  { id: 'slot-now', label: '⚡ Colombo Express 45 Min', time: 'Within 30-45 mins', fee: 350, quota: 'Express' },
  { id: 'slot-1', label: 'Today Afternoon', time: '01:30 PM – 03:30 PM', fee: 200, quota: 'Available' },
  { id: 'slot-2', label: 'Today Evening', time: '05:00 PM – 07:00 PM', fee: 200, quota: 'Available' },
  { id: 'slot-3', label: 'Today Night', time: '07:30 PM – 09:30 PM', fee: 200, quota: 'Available' },
  { id: 'slot-4', label: 'Tomorrow Morning (Free)', time: '08:30 AM – 10:30 AM', fee: 0, quota: 'Free Delivery' }
];

export default function ClientWebSupermarket() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'freshness'>('featured');

  // Filters
  const [organicFilter, setOrganicFilter] = useState(false);
  const [highFreshnessFilter, setHighFreshnessFilter] = useState(false);

  // Customer Authentication state (Mandatory to add to cart & buy)
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('ceylonfoods_customer_user') || localStorage.getItem('freshcart_customer_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [pendingAddProduct, setPendingAddProduct] = useState<{ product: Product; qty: number; weight: string } | null>(null);

  // Splash Onboarding state (triggered when user signs up or clicks Tour)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingView, setOnboardingView] = useState<'SPLASH' | 'SLIDES'>('SPLASH');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedDietPreferences, setSelectedDietPreferences] = useState<string[]>([
    'Organic Fresh Produce',
    'Artisan Bakery & Oven Breads'
  ]);

  // Form states for login/signup
  const [loginForm, setLoginForm] = useState({ email: 'brie@example.com', password: 'password123' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '33 York Street, Colombo 01',
    password: ''
  });

  // Cart & Drawers
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_TIME_SLOTS[0]);
  const [substitutionPolicy, setSubstitutionPolicy] = useState<'CALL_ME' | 'REPLACE_BEST' | 'REFUND'>('REPLACE_BEST');
  const [paymentMethod, setPaymentMethod] = useState<'CARD_ONLINE' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY'>('CARD_ONLINE');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Modals & Tracking
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalSelectedWeight, setModalSelectedWeight] = useState<string>('1kg');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);

  // AI Assistant Chat state
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; recipe?: any }>>([
    {
      sender: 'bot',
      text: 'Hello! 👋 I am CeylonBot, your Sri Lankan supermarket AI chef and shopping assistant. Tell me what meal you want to cook (e.g. "Healthy dinner for 2", "Chicken curry recipe") and I will prepare the grocery items for you!'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Fetch products & latest active order from server API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          const loadedProducts = data.data.map((p: Product) => ({
            ...p,
            availableWeights: p.unit === 'kg' ? ['250g', '500g', '1kg', '2kg'] : undefined
          }));
          setProducts(loadedProducts);
        }
      })
      .catch(err => console.error(err));

    fetch('/api/orders/latest')
      .then(res => res.json())
      .then(data => {
        if (data.data) setActiveOrder(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const calculateWeightMultiplier = (weightStr?: string) => {
    if (!weightStr) return 1;
    if (weightStr === '250g') return 0.25;
    if (weightStr === '500g') return 0.5;
    if (weightStr === '1kg') return 1.0;
    if (weightStr === '2kg') return 2.0;
    return 1;
  };

  // Add to cart with strict login enforcement
  const requireAuthAndAddToCart = (product: Product, qty: number = 1, weight: string = '1kg') => {
    if (!currentUser) {
      setPendingAddProduct({ product, qty, weight });
      setAuthError('Please sign in or create an account to start adding items to your cart.');
      setIsAuthModalOpen(true);
      return;
    }

    const multiplier = calculateWeightMultiplier(weight);
    const effectivePrice = product.price * multiplier;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedWeight === weight);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedWeight === weight
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty, selectedWeight: weight, effectivePrice }];
    });
  };

  const updateCartQuantity = (productId: string, weight: string | undefined, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId && item.selectedWeight === weight) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, weight?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedWeight === weight)));
  };

  // Authentication Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
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
        setCurrentUser(data.user);
        localStorage.setItem('ceylonfoods_customer_user', JSON.stringify(data.user));
        setIsAuthModalOpen(false);

        // Resume adding pending item if user tried to add before logging in
        if (pendingAddProduct) {
          requireAuthAndAddToCart(pendingAddProduct.product, pendingAddProduct.qty, pendingAddProduct.weight);
          setPendingAddProduct(null);
          setIsCartOpen(true);
        }
      } else {
        setAuthError(data.message || 'Login failed.');
      }
    } catch (err) {
      setAuthError('Unable to connect to login server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
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
        setCurrentUser(data.user);
        localStorage.setItem('ceylonfoods_customer_user', JSON.stringify(data.user));
        setIsAuthModalOpen(false);

        // TRIGGER ONBOARDING SPLASH SCREENS ON SIGNUP
        setIsOnboardingOpen(true);
        setOnboardingStep(0);
      } else {
        setAuthError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setAuthError('Unable to connect to server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleFinishOnboarding = () => {
    setIsOnboardingOpen(false);
    if (pendingAddProduct) {
      requireAuthAndAddToCart(pendingAddProduct.product, pendingAddProduct.qty, pendingAddProduct.weight);
      setPendingAddProduct(null);
      setIsCartOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ceylonfoods_customer_user'); localStorage.removeItem('ceylonfoods_customer_user'); localStorage.removeItem('freshcart_customer_user');
    setCart([]);
  };

  // AI Prompt handler
  const handleSendAiPrompt = async (promptText?: string) => {
    const textToSend = promptText || aiInput;
    if (!textToSend.trim()) return;

    setAiMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!promptText) setAiInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: data.message,
          recipe: data.recipe
        }
      ]);
    } catch (e) {
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "I selected fresh items for you. Click below to add them to your cart!"
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const vatAmount = subtotal * 0.05;
  const isFreeDeliveryQualified = subtotal >= 5000;
  const deliveryFee = isFreeDeliveryQualified ? 0.0 : selectedSlot.fee;
  const bundleDiscount = cart.length >= 3 ? 5.00 : 0.0;
  const totalAmount = Math.max(0, subtotal + vatAmount + deliveryFee - bundleDiscount);

  // All 8 realistic supermarket categories
  const categories = [
    'All',
    'Fruits & Veg',
    'Dairy & Eggs',
    'Bakery',
    'Meat & Seafood',
    'Staples & Grains',
    'Beverages',
    'Snacks',
    'Household'
  ];

  // Sorting & Filtering
  let filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchOrganic = !organicFilter || p.isOrganic;
    const matchFresh = !highFreshnessFilter || p.aiFreshnessScore >= 96;
    return matchCat && matchSearch && matchOrganic && matchFresh;
  });

  if (sortBy === 'priceLow') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'freshness') {
    filteredProducts.sort((a, b) => b.aiFreshnessScore - a.aiFreshnessScore);
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0D0D0D] text-white' : 'bg-[#F8FAF9] text-slate-800'} font-sans transition-colors duration-200 flex flex-col`}>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#033B31] text-emerald-100 text-xs py-2 px-6 flex items-center justify-between border-b border-emerald-900/60 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-[#78F9B8]">
            <Zap className="w-3.5 h-3.5" />
            <span>Ayubowan! සාදරයෙන් පිළිගනිමු — Ceylon Foods: Guaranteed 45-Min Doorstep Delivery Across Colombo & Suburbs</span>
          </span>
          <span className="hidden md:inline text-emerald-400/80">|</span>
          <span className="hidden md:inline text-emerald-200">
            🌿 Full Supermarket Range: Groceries, Fresh Produce, Dairy, Meats, Staples & Household
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setOnboardingStep(0);
              setIsOnboardingOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 hover:bg-emerald-900 text-[#78F9B8] text-[11px] font-bold transition"
          >
            <Sparkles className="w-3 h-3 text-[#78F9B8]" />
            <span>App Tour</span>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/70 hover:bg-emerald-900 text-emerald-200 text-[11px] font-semibold transition"
          >
            {isDarkMode ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-[#78F9B8]" />}
            <span>{isDarkMode ? 'Light Mode' : 'OLED Dark'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER (Clean, single store, with Login/Register) */}
      <header className={`sticky top-0 z-30 px-6 py-3.5 border-b backdrop-blur-md transition ${
        isDarkMode ? 'bg-[#0D0D0D]/90 border-zinc-800' : 'bg-white/90 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Ceylon Foods Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedCategory('All')}>
            <img
              src="/ceylon_foods_logo.png"
              alt="Ceylon Foods Logo"
              className="h-11 w-auto object-contain filter drop-shadow transition transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-[#0C6237] dark:text-[#78F9B8]">
                Ceylon <span className="text-[#FF6515]">Foods</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-widest text-[#0C6237]/80 dark:text-emerald-300/80 uppercase">
                Sri Lanka Online Supermarket
              </span>
            </div>
          </div>

          {/* Simple Clean Delivery Address Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-[#18181A] px-3.5 py-1.5 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <MapPin className="w-4 h-4 text-[#FF632B]" />
            <span>
              Deliver to: <strong className="text-slate-800 dark:text-white">{currentUser?.address || 'Colombo & Suburbs (Express)'}</strong>
            </span>
          </div>

          {/* Search Bar with Voice Mic */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search groceries, milk, rice, meats, tea, snacks, household..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2.5 pl-11 pr-10 rounded-full text-xs font-semibold focus:outline-none transition ${
                isDarkMode
                  ? 'bg-[#18181A] text-white placeholder-zinc-500 border border-zinc-800 focus:border-[#78F9B8]'
                  : 'bg-slate-100 text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-[#044F41]'
              }`}
            />
            <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FF632B] hover:scale-110 transition">
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Header Actions: FreshBot, Cart, and Customer Profile/Login */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-[#044F41] to-[#087F69] hover:opacity-95 text-white text-xs font-black shadow-md transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#78F9B8] animate-pulse" />
              <span>FreshBot AI</span>
            </button>

            {activeOrder && (
              <button
                onClick={() => setIsTrackingModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-xs font-bold transition hover:bg-amber-100"
              >
                <Truck className="w-4 h-4 animate-bounce" />
                <span>Track Order</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setAuthError('Please sign in or create an account to view your cart.');
                  setIsAuthModalOpen(true);
                } else {
                  setIsCartOpen(true);
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FF632B] hover:bg-[#e0521d] text-white text-xs font-black shadow-lg shadow-orange-500/20 transition active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-white text-[#FF632B] text-[9px] font-black flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Rs. {Math.round(totalAmount).toLocaleString()}</span>
            </button>

            {/* Customer Authentication Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800/80 pl-2 pr-1 py-1 rounded-2xl border border-slate-200 dark:border-zinc-700 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#044F41] text-[#78F9B8] font-black flex items-center justify-center">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-extrabold max-w-[90px] truncate hidden sm:inline">
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1 text-slate-400 hover:text-red-500 rounded-lg transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthError('');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] text-xs font-black shadow-md transition active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Free Delivery Threshold Bar */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 font-semibold">
            <span>Free Express Delivery on orders over Rs. 5,000:</span>
            <div className="w-36 h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#044F41] to-[#78F9B8] transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
              ></div>
            </div>
            {subtotal >= 5000 ? (
              <span className="font-extrabold text-[#044F41] dark:text-[#78F9B8]">🎉 Free Delivery Unlocked!</span>
            ) : (
              <span className="font-bold text-slate-700 dark:text-zinc-300">
                Add Rs. {Math.max(0, 5000 - Math.round(subtotal)).toLocaleString()} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
            <span>🛒 Complete Supermarket Catalog</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-6 py-6 flex-1 space-y-8">
        {/* 3. HERO PROMOTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden p-8 bg-gradient-to-r from-[#044F41] via-[#05604F] to-[#087F69] text-white flex flex-col justify-between shadow-xl min-h-[220px]">
            <div className="max-w-md space-y-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#78F9B8] text-[#044F41] text-xs font-black tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Full Supermarket Stocked Daily
              </span>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight">
                Ayubowan! Island-Fresh Groceries, <br />
                <span className="text-[#78F9B8]">Delivered in 45 Mins</span>
              </h1>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                From morning dairy, fresh bakery, and meats to pantry staples, Ceylon teas, and household cleaning essentials.
              </p>
            </div>

            <div className="pt-4 z-10 flex items-center gap-3">
              <button
                onClick={() => setSelectedCategory('Staples & Grains')}
                className="px-5 py-2.5 rounded-2xl bg-[#FF632B] hover:bg-[#e0521d] text-white font-extrabold text-xs shadow-lg transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Browse Sri Lankan Staples</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
              alt="Supermarket Produce"
              className="absolute right-0 bottom-0 w-80 h-full object-cover opacity-30 md:opacity-90 mask-radial"
            />
          </div>

          {/* Pantry & Breakfast Essentials Card */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden ${
            isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200/60'
          }`}>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF632B] bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full inline-block">
                Breakfast & Tea Special
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                Traditional Ceylon Tea & Breakfast Combo
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Roast Paan (4 slices) + Highland Fresh Milk (1L) + Dilmah Pure Ceylon BOPF Tea (400g).
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="text-xs text-slate-400 line-through">Rs. 1,840</span>
                <p className="text-lg font-black text-slate-900 dark:text-white">Rs. 1,640</p>
              </div>
              <button
                onClick={() => {
                  const pMilk = products.find(p => p.title.includes('Milk'));
                  const pBread = products.find(p => p.title.includes('Sourdough'));
                  const pTea = products.find(p => p.title.includes('Ceylon'));
                  if (pMilk) requireAuthAndAddToCart(pMilk, 1);
                  if (pBread) requireAuthAndAddToCart(pBread, 1);
                  if (pTea) requireAuthAndAddToCart(pTea, 1);
                  if (currentUser) setIsCartOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] font-bold text-xs shadow transition active:scale-95"
              >
                + Add Breakfast Kit
              </button>
            </div>
          </div>
        </div>

        {/* 4. AI RECIPES & MEAL COMBOS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF632B] flex items-center justify-center">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">Cook Fresh Tonight with AI Recipes</h2>
                <p className="text-xs text-slate-400">Add complete chef-curated ingredient kits to your cart with one click</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Meal 1: Creamy Chicken & Pasta Dinner */}
            <div className={`p-4 rounded-3xl border flex items-center gap-4 transition hover:shadow-md ${
              isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/80'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop&q=80"
                alt="Chicken Curry"
                className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm">Ceylon Black Pepper Village Chicken Curry</h4>
                  <span className="text-[11px] font-bold text-slate-400">⏱ 30 mins</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Includes Bairaha Chicken Fillets (1kg), Araliya Keeri Samba (5kg), and Pure Ceylon Spices.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black text-slate-900 dark:text-white">Rs. 3,820</span>
                  <button
                    onClick={() => {
                      const pChik = products.find(p => p.title.includes('Chicken'));
                      const pPast = products.find(p => p.title.includes('Penne'));
                      const pChse = products.find(p => p.title.includes('Cheddar'));
                      if (pChik) requireAuthAndAddToCart(pChik, 1);
                      if (pPast) requireAuthAndAddToCart(pPast, 1);
                      if (pChse) requireAuthAndAddToCart(pChse, 1);
                      if (currentUser) setIsCartOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] text-xs font-bold rounded-xl transition"
                  >
                    + Add Ingredients
                  </button>
                </div>
              </div>
            </div>

            {/* Meal 2: Fresh Mediterranean Salad */}
            <div className={`p-4 rounded-3xl border flex items-center gap-4 transition hover:shadow-md ${
              isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/80'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80"
                alt="Salad"
                className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm">Traditional Parippu (Dhal) & Roast Paan Combo</h4>
                  <span className="text-[11px] font-bold text-slate-400">⏱ 20 mins</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Includes Mysore Red Dhal (1kg), Crispy Roast Paan (4 pcs), and Virgin Coconut Oil (500ml).
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black text-slate-900 dark:text-white">Rs. 1,550</span>
                  <button
                    onClick={() => {
                      const pAvo = products.find(p => p.title.includes('Avocado'));
                      const pTom = products.find(p => p.title.includes('Tomato'));
                      const pOil = products.find(p => p.title.includes('Coconut'));
                      if (pAvo) requireAuthAndAddToCart(pAvo, 1);
                      if (pTom) requireAuthAndAddToCart(pTom, 1);
                      if (pOil) requireAuthAndAddToCart(pOil, 1);
                      if (currentUser) setIsCartOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] text-xs font-bold rounded-xl transition"
                  >
                    + Add Ingredients
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SUPERMARKET AISLE NAVIGATION (Positioned directly below AI Recipes) */}
        <section className={`p-3.5 rounded-2xl border text-xs select-none shadow-sm transition ${
          isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/90'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            {/* Department Aisles */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Aisle:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#044F41] text-[#78F9B8] shadow-sm'
                      : isDarkMode
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quality & Sorting Toolbar */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0">
              <button
                onClick={() => setOrganicFilter(!organicFilter)}
                className={`px-3 py-1.5 rounded-full font-semibold border flex items-center gap-1.5 transition ${
                  organicFilter
                    ? 'bg-emerald-100 text-[#044F41] border-emerald-300 font-extrabold shadow-sm'
                    : 'border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span>🌿 Organic</span>
              </button>

              <button
                onClick={() => setHighFreshnessFilter(!highFreshnessFilter)}
                className={`px-3 py-1.5 rounded-full font-semibold border flex items-center gap-1.5 transition ${
                  highFreshnessFilter
                    ? 'bg-emerald-100 text-[#044F41] border-emerald-300 font-extrabold shadow-sm'
                    : 'border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span>✨ &gt;95% Fresh</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-zinc-800">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="dark:bg-zinc-900">Featured</option>
                  <option value="freshness" className="dark:bg-zinc-900">AI Freshness</option>
                  <option value="priceLow" className="dark:bg-zinc-900">Price: Low to High</option>
                  <option value="priceHigh" className="dark:bg-zinc-900">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PRODUCT CATALOG GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight">
                {selectedCategory === 'All' ? 'All Supermarket Aisles' : `${selectedCategory} Aisle`}
              </h2>
              <p className="text-xs text-slate-400">
                Showing {filteredProducts.length} items in stock for 30-min delivery
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {filteredProducts.map(product => {
              const inCartItem = cart.find(i => i.product.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setModalSelectedWeight('1kg');
                  }}
                  className={`rounded-3xl p-4 border cursor-pointer transition transform hover:-translate-y-1 flex flex-col justify-between ${
                    isDarkMode
                      ? 'bg-[#18181A] border-zinc-800 hover:border-zinc-700 hover:shadow-xl'
                      : 'bg-white border-slate-200/70 hover:shadow-xl hover:border-slate-300'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
                      }}
                      className="w-full h-44 object-cover rounded-2xl"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-950/80 backdrop-blur text-[#78F9B8] border border-[#78F9B8]/40 shadow">
                      ✨ {product.aiFreshnessScore}% Fresh
                    </span>
                    {product.isOrganic && (
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FF632B] text-white shadow">
                        Organic
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{product.brand}</span>
                      <span className="flex items-center gap-0.5 font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.rating}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white truncate">
                      {product.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          Rs. {Math.round(product.price).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-0.5">/{product.unit}</span>
                      </div>

                      {inCartItem ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 bg-[#044F41] text-white px-2 py-1 rounded-xl"
                        >
                          <button
                            onClick={() => updateCartQuantity(product.id, inCartItem.selectedWeight, -1)}
                            className="text-[#78F9B8] hover:scale-110 font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black min-w-[16px] text-center">
                            {inCartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(product.id, inCartItem.selectedWeight, 1)}
                            className="text-[#78F9B8] hover:scale-110 font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            requireAuthAndAddToCart(product, 1, '1kg');
                          }}
                          className="w-9 h-9 rounded-full bg-[#044F41] hover:bg-[#033B31] text-[#78F9B8] flex items-center justify-center shadow-md transition active:scale-90"
                          title="Add to cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 7. CUSTOMER LOGIN & SIGN UP MODAL (MANDATORY GATEWAY) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#044F41] text-[#78F9B8] flex items-center justify-center font-bold">
                  <ShoppingBasket className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-base">Customer Account</h3>
              </div>
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setPendingAddProduct(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error / Instruction Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-[#FF632B] text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Auth Mode Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-xs font-extrabold">
              <button
                onClick={() => {
                  setAuthTab('LOGIN');
                  setAuthError('');
                }}
                className={`py-2 rounded-xl transition ${
                  authTab === 'LOGIN'
                    ? 'bg-[#044F41] text-[#78F9B8] shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthTab('REGISTER');
                  setAuthError('');
                }}
                className={`py-2 rounded-xl transition ${
                  authTab === 'REGISTER'
                    ? 'bg-[#044F41] text-[#78F9B8] shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* TAB 1: LOGIN FORM */}
            {authTab === 'LOGIN' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. brie@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#044F41]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#044F41]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 rounded-2xl bg-[#FF632B] hover:bg-[#e0521d] text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
                  >
                    {authLoading ? <span>Signing In...</span> : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In & Continue Shopping</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500">
                  <span>Demo customer email: <strong className="text-slate-800 dark:text-white">brie@example.com</strong> (Password: <strong className="text-slate-800 dark:text-white">password123</strong>)</span>
                </div>
              </form>
            ) : (
              /* TAB 2: REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#044F41]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 mb-1 font-bold">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
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
                      placeholder="+94 77 123 4567"
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
                    placeholder="House/Apartment #, Street, City"
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
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 rounded-2xl bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] font-black text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
                  >
                    {authLoading ? <span>Creating Account...</span> : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Create Account & Start Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7.5. CUSTOMER SPLASH SCREEN & ONBOARDING (EXACT FIGMA NODE 1-13587) */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          {onboardingView === 'SPLASH' ? (
            /* =========================================================================
               FIGMA FRAME (Node 1-13587): EXACT GRONUR / FRESHCART SPLASH SCREEN
            ========================================================================= */
            <div className={`relative max-w-sm w-full rounded-[44px] overflow-hidden shadow-2xl border flex flex-col justify-between h-[690px] animate-scaleUp transition-all duration-300 ${
              isDarkMode
                ? 'bg-[#090C0B] border-emerald-900/40 text-white'
                : 'bg-gradient-to-b from-[#EBF9EE] via-[#F6FCF8] to-white border-emerald-100 text-slate-800'
            }`}>
              {/* Skip / Close Top Button */}
              <button
                onClick={handleFinishOnboarding}
                className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition"
                title="Skip to Store"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative Floating Leaves (Matching Figma kit) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <span className="absolute top-24 left-6 text-2xl rotate-12 opacity-80 animate-bounce" style={{ animationDuration: '3s' }}>🍃</span>
                <span className="absolute top-36 right-8 text-xl -rotate-45 opacity-70 animate-bounce" style={{ animationDuration: '4s' }}>🌿</span>
                <span className="absolute top-64 left-8 text-lg rotate-45 opacity-60 animate-pulse">🌱</span>
                <span className="absolute top-72 right-10 text-2xl -rotate-12 opacity-80 animate-bounce" style={{ animationDuration: '3.5s' }}>🍃</span>
              </div>

              {/* Top Branding Section */}
              <div className="pt-8 px-6 text-center z-10 space-y-1">
                <img
                  src="/ceylon_foods_logo.png"
                  alt="Ceylon Foods Logo"
                  className="h-14 w-auto mx-auto object-contain filter drop-shadow-md"
                />
                <p className="text-xs font-extrabold tracking-wide text-[#0C6237] dark:text-[#78F9B8]">
                  Sri Lanka Online Supermarket
                </p>
              </div>

              {/* Center Hero: Authentic Ceylon Foods Cultural Emblem */}
              <div className="relative flex items-center justify-center px-6 my-auto z-10">
                <div className="absolute w-60 h-60 rounded-full bg-[#FF6515]/20 dark:bg-[#78F9B8]/15 blur-3xl pointer-events-none animate-pulse"></div>

                <div className="relative group hover:scale-105 transition-transform duration-500">
                  <img
                    src="/ceylon_foods_logo.png"
                    alt="Ceylon Foods Sri Lanka"
                    className="w-52 h-52 object-contain filter drop-shadow-2xl"
                  />
                  {/* Floating AI Freshness badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-[#0C6237] text-[#78F9B8] font-black text-[11px] shadow-lg flex items-center gap-1.5 border border-[#78F9B8]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#78F9B8]" />
                    <span>100% Fresh • Direct from Local Growers</span>
                  </div>
                </div>
              </div>

              {/* Bottom Elevated Card Section matching Figma */}
              <div className={`p-8 rounded-t-[40px] shadow-2xl z-20 space-y-4 text-center transition ${
                isDarkMode
                  ? 'bg-[#141816] border-t border-emerald-900/60'
                  : 'bg-white border-t border-slate-100 shadow-[0_-20px_40px_rgba(0,0,0,0.06)]'
              }`}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    Ayubowan! සාදරයෙන් පිළිගනිමු <br />
                    <span className="text-[#0C6237] dark:text-[#78F9B8]">Sri Lanka Online Supermarket</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xs mx-auto">
                    Island-fresh vegetables, Keeri Samba rice, Ceylon spices & daily groceries delivered to your door in 45 minutes.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {/* Primary "Get Started →" CTA button */}
                  <button
                    onClick={() => {
                      setOnboardingView('SLIDES');
                      setOnboardingStep(0);
                    }}
                    className={`w-full py-4 rounded-full font-black text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 ${
                      isDarkMode
                        ? 'bg-[#FF632B] hover:bg-[#e0521d] text-white shadow-orange-500/25'
                        : 'bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] shadow-emerald-900/20'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleFinishOnboarding}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition"
                  >
                    Direct to Supermarket Store →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
               ONBOARDING SLIDES: 4-STEP FEATURE WALKTHROUGH & PREFERENCES
            ========================================================================= */
            <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col max-h-[92vh] animate-fadeIn">
              {/* Top Bar with Brand, Back to Splash & Skip Button */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOnboardingView('SPLASH')}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                    title="Back to Splash"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="w-7 h-7 rounded-lg bg-[#044F41] text-[#78F9B8] flex items-center justify-center font-black text-xs shadow">
                    <Leaf className="w-3.5 h-3.5 text-[#78F9B8]" />
                  </span>
                  <span className="font-black text-sm tracking-tight text-[#0C6237] dark:text-white">
                    Ceylon <span className="text-[#FF6515]">Foods</span>
                  </span>
                  <span className="ml-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#FF632B] dark:bg-orange-950/60">
                    Step {onboardingStep + 1} of 4
                  </span>
                </div>

                <button
                  onClick={handleFinishOnboarding}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center gap-1 transition"
                >
                  <span>Skip Tour</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Content Body */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
                {/* SLIDE 0: Farm-Fresh Quality */}
                {onboardingStep === 0 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="relative h-60 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                        alt="Fresh Groceries"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#044F41] text-[#78F9B8] w-fit mb-2 shadow">
                          🌿 100% Farm-Fresh Guarantee
                        </span>
                        <h3 className="text-xl font-black text-white leading-tight">
                          Crisp Produce, Daily Dairy & Supermarket Staples
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Island-Fresh Produce Delivered in 45 Minutes
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Shop farm-harvested Dambulla vegetables, Nuwara Eliya fruits, fresh Mirissa seafood, Ambewela dairy, and Ceylon pantry staples delivered directly across Colombo & suburbs.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🍎</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Strict Quality</h4>
                        <p className="text-[10px] text-slate-400">100% inspected produce</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">⚡</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">20-Min Speed</h4>
                        <p className="text-[10px] text-slate-400">Direct doorstep courier</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🌱</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Farm Direct</h4>
                        <p className="text-[10px] text-slate-400">Zero artificial additives</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 1: Smart AI Recipes */}
                {onboardingStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="relative h-60 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
                        alt="AI Recipes"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#FF632B] text-white w-fit mb-2 shadow">
                          ✨ Powered by FreshBot AI
                        </span>
                        <h3 className="text-xl font-black text-white leading-tight">
                          Chef Recipes Tailored to Your Taste & Diet
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Cook Fresh Tonight with Smart AI Recipes
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Craving a healthy Mediterranean garden salad or velvety roasted pumpkin soup? FreshBot plans your menu, calculates exact portion weights, and adds all cooking ingredients into your cart with 1 click.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🤖</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">AI Concierge</h4>
                        <p className="text-[10px] text-slate-400">Instant meal answers</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🛒</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">1-Tap Bundling</h4>
                        <p className="text-[10px] text-slate-400">Full recipe to cart</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🥑</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Macro Calcs</h4>
                        <p className="text-[10px] text-slate-400">Calories & nutrition</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 2: Real-time Live GPS Delivery */}
                {onboardingStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="relative h-60 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800"
                        alt="Courier Delivery"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#044F41] text-[#78F9B8] w-fit mb-2 shadow">
                          📍 Real-Time Live GPS Dispatch
                        </span>
                        <h3 className="text-xl font-black text-white leading-tight">
                          Live Route Tracking from Supermarket to Doorstep
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Follow Your Driver on the Live Map
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Never wonder where your grocery bag is. Follow your electric courier's live route on our interactive GPS map from picking in our temperature-controlled store right to your kitchen.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">🛵</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Eco Couriers</h4>
                        <p className="text-[10px] text-slate-400">Electric scooters & vans</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">❄️</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Cold-Chain</h4>
                        <p className="text-[10px] text-slate-400">Dairy & meats stay ice cold</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-center space-y-1">
                        <span className="text-2xl">📦</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Doorstep Drop</h4>
                        <p className="text-[10px] text-slate-400">Safe contactless handover</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 3: Personalization Preferences & Welcome Bonus */}
                {onboardingStep === 3 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#FF632B] text-white shadow">
                        🎁 New Member Perk Unlocked
                      </span>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Personalize Your Supermarket Aisles
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400">
                        Select your favorite grocery categories and dietary preferences to customize your daily picks:
                      </p>
                    </div>

                    {/* Multi-Selectable Category & Dietary Chips */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      {[
                        'Organic Fresh Produce',
                        'Keto & Low Carb Healthy',
                        'Artisan Bakery & Oven Breads',
                        'Fresh Farm Meats & Seafood',
                        'Vegan & Plant-Based Choices',
                        'Pure Farm Dairy & Eggs',
                        'Specialty Coffee & Ceylon Teas',
                        'Eco Household & Cleaning'
                      ].map(pref => {
                        const isSelected = selectedDietPreferences.includes(pref);
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => {
                              setSelectedDietPreferences(prev =>
                                isSelected ? prev.filter(p => p !== pref) : [...prev, pref]
                              );
                            }}
                            className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                              isSelected
                                ? 'bg-[#044F41] text-[#78F9B8] border-emerald-600 shadow-md'
                                : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'
                            }`}
                          >
                            <span>{pref}</span>
                            {isSelected && <Check className="w-4 h-4 shrink-0 text-[#78F9B8]" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Welcome Gift Card */}
                    <div className="bg-gradient-to-r from-[#044F41] to-[#0A6D5B] text-white p-4 rounded-2xl flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-white/20 text-[#78F9B8] flex items-center justify-center text-xl shadow">
                          🎁
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#78F9B8] tracking-widest block">
                            Welcome Voucher Added
                          </span>
                          <h4 className="font-black text-sm">
                            Promo Code: <code className="bg-black/30 px-2 py-0.5 rounded text-[#78F9B8]">AYUBOWAN</code>
                          </h4>
                          <p className="text-[11px] text-emerald-100">
                            Rs. 500 Off Your First Order (Valid on orders over Rs. 4,000)
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-[#FF632B] text-white text-xs font-black rounded-xl shadow">
                        Ready to Use!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Controls (Progress Dots, Back & Next / Start Shopping Button) */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                {/* Dots Stepper */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map(step => (
                    <button
                      key={step}
                      onClick={() => setOnboardingStep(step)}
                      className={`h-2.5 rounded-full transition-all ${
                        onboardingStep === step
                          ? 'w-8 bg-[#FF632B]'
                          : 'w-2.5 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {onboardingStep > 0 && (
                    <button
                      onClick={() => setOnboardingStep(prev => prev - 1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 transition"
                    >
                      Back
                    </button>
                  )}

                  {onboardingStep < 3 ? (
                    <button
                      onClick={() => setOnboardingStep(prev => prev + 1)}
                      className="px-6 py-2.5 rounded-xl bg-[#FF632B] hover:bg-[#e0521d] text-white text-xs font-black shadow-md flex items-center gap-2 transition active:scale-95"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishOnboarding}
                      className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF632B] to-[#FF814A] hover:opacity-95 text-white text-xs font-black shadow-xl shadow-orange-500/20 flex items-center gap-2 transition active:scale-95 animate-pulse"
                    >
                      <span>Start Shopping Ceylon Foods</span>
                      <Sparkles className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. SLIDE-OUT CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className={`w-screen max-w-md p-6 flex flex-col justify-between shadow-2xl ${
              isDarkMode ? 'bg-[#141416] text-white' : 'bg-white text-slate-800'
            }`}>
              <div className="space-y-4 overflow-y-auto pr-1">
                {/* Cart Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#FF632B]" />
                    <h3 className="text-lg font-black">Supermarket Basket ({cart.length})</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Customer Delivery Address */}
                {currentUser && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Destination:</span>
                    <p className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF632B]" />
                      <span>{currentUser.address}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Contact: {currentUser.name} ({currentUser.phone})</p>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}`}
                      className={`p-3 rounded-2xl border flex items-center justify-between ${
                        isDarkMode ? 'bg-[#1C1C1E] border-zinc-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-extrabold">{item.product.title}</h4>
                          <p className="text-[10px] text-slate-400">
                            {item.selectedWeight || item.product.unitWeight} • {item.product.brand}
                          </p>
                          <p className="text-xs font-black text-[#FF632B] mt-0.5">
                            Rs. {Math.round(item.effectivePrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-2 py-1 rounded-xl shadow-sm">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, -1)}
                            className="w-5 h-5 rounded-md text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, 1)}
                            className="w-5 h-5 rounded-md text-[#FF632B] text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="p-1.5 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      Your basket is currently empty.
                    </div>
                  )}
                </div>

                {/* Delivery Time Slot Picker */}
                {cart.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Select Delivery Window
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {DELIVERY_TIME_SLOTS.map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2 rounded-xl border text-left text-xs transition ${
                            selectedSlot.id === slot.id
                              ? 'border-[#FF632B] bg-orange-50/50 dark:bg-orange-950/20 font-bold'
                              : 'border-slate-200 dark:border-zinc-800'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[11px]">{slot.label}</span>
                            <span className="text-[10px] text-[#FF632B] font-bold">
                              {slot.fee === 0 ? 'Free' : `Rs. ${slot.fee}`}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{slot.time}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Out of Stock Substitution Preference */}
                {cart.length > 0 && (
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Out of Stock Preference:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                      <button
                        onClick={() => setSubstitutionPolicy('REPLACE_BEST')}
                        className={`p-2 rounded-xl border text-center transition ${
                          substitutionPolicy === 'REPLACE_BEST'
                            ? 'bg-[#044F41] text-[#78F9B8] border-emerald-600'
                            : 'border-slate-200 dark:border-zinc-700 text-slate-500'
                        }`}
                      >
                        Auto-Replace Best
                      </button>
                      <button
                        onClick={() => setSubstitutionPolicy('CALL_ME')}
                        className={`p-2 rounded-xl border text-center transition ${
                          substitutionPolicy === 'CALL_ME'
                            ? 'bg-[#044F41] text-[#78F9B8] border-emerald-600'
                            : 'border-slate-200 dark:border-zinc-700 text-slate-500'
                        }`}
                      >
                        Call Me First
                      </button>
                      <button
                        onClick={() => setSubstitutionPolicy('REFUND')}
                        className={`p-2 rounded-xl border text-center transition ${
                          substitutionPolicy === 'REFUND'
                            ? 'bg-[#044F41] text-[#78F9B8] border-emerald-600'
                            : 'border-slate-200 dark:border-zinc-700 text-slate-500'
                        }`}
                      >
                        Refund Item
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment Options */}
                {cart.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Payment Method
                    </h4>
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                      <button
                        onClick={() => setPaymentMethod('CARD_ONLINE')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                          paymentMethod === 'CARD_ONLINE'
                            ? 'border-[#044F41] bg-emerald-50 dark:bg-emerald-950/40 text-[#044F41] dark:text-[#78F9B8]'
                            : 'border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[10px]">Online Card</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('CARD_ON_DELIVERY')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                          paymentMethod === 'CARD_ON_DELIVERY'
                            ? 'border-[#044F41] bg-emerald-50 dark:bg-emerald-950/40 text-[#044F41] dark:text-[#78F9B8]'
                            : 'border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px]">Card on Del.</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                          paymentMethod === 'CASH_ON_DELIVERY'
                            ? 'border-[#044F41] bg-emerald-50 dark:bg-emerald-950/40 text-[#044F41] dark:text-[#78F9B8]'
                            : 'border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <Banknote className="w-4 h-4" />
                        <span className="text-[10px]">Cash on Del.</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary & Final Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-3">
                  <div className="space-y-1.5 text-xs font-semibold">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-slate-800 dark:text-white font-bold">Rs. {Math.round(subtotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Estimated VAT (5%)</span>
                      <span className="text-slate-800 dark:text-white font-bold">Rs. {Math.round(vatAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery ({selectedSlot.label})</span>
                      <span className="text-slate-800 dark:text-white font-bold">
                        {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                      </span>
                    </div>
                    {bundleDiscount > 0 && (
                      <div className="flex justify-between text-[#78F9B8] font-bold">
                        <span>Multi-Item Supermarket Savings</span>
                        <span>-Rs. {bundleDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black pt-2 border-t border-slate-100 dark:border-zinc-800">
                      <span>Total to Pay</span>
                      <span className="text-[#FF6515] text-lg font-black">Rs. {Math.round(totalAmount).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!currentUser) {
                        setIsAuthModalOpen(true);
                        return;
                      }

                      const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          customerId: currentUser.id,
                          customerName: currentUser.name,
                          customerPhone: currentUser.phone,
                          items: cart.map(c => ({
                            productId: c.product.id,
                            productTitle: c.product.title,
                            quantity: c.quantity,
                            price: c.effectivePrice,
                            unit: c.selectedWeight || c.product.unit
                          })),
                          subtotal,
                          vatAmount,
                          deliveryFee,
                          discountAmount: bundleDiscount,
                          totalAmount,
                          deliveryType: selectedSlot.id === 'slot-now' ? 'EXPRESS' : 'STANDARD',
                          scheduledTimeSlot: selectedSlot.time,
                          deliveryAddress: {
                            street: currentUser.address,
                            city: 'Colombo',
                            coordinates: { lat: 37.7749, lng: -122.4194 }
                          },
                          deliveryNote: `Substitution: ${substitutionPolicy}. ${deliveryNote}`
                        })
                      });
                      const data = await res.json();
                      if (data.data) {
                        setActiveOrder(data.data);
                        setCart([]);
                        setIsCartOpen(false);
                        setIsTrackingModalOpen(true);
                      }
                    }}
                    className="w-full py-4 rounded-2xl bg-[#FF632B] hover:bg-[#e0521d] text-white font-black text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition active:scale-[0.98]"
                  >
                    <span>Place Order (Rs. {Math.round(totalAmount).toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. FLOATING FRESHBOT AI ASSISTANT PANEL */}
      {isAiDrawerOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white dark:bg-[#18181A] rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col h-[520px] overflow-hidden animate-slideUp">
          <div className="p-4 bg-gradient-to-r from-[#044F41] to-[#087F69] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-[#78F9B8]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm">CeylonBot AI Assistant</h3>
                <p className="text-[10px] text-[#78F9B8] font-bold">Personalized Grocery & Recipe Concierge</p>
              </div>
            </div>
            <button onClick={() => setIsAiDrawerOpen(false)} className="text-white hover:text-emerald-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {aiMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF632B] text-white rounded-br-none shadow-sm'
                      : isDarkMode
                      ? 'bg-[#242428] text-zinc-200 border border-zinc-700/60 rounded-bl-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.recipe && (
                    <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-zinc-700/60 space-y-2">
                      <span className="font-extrabold text-sm text-[#044F41] dark:text-[#78F9B8] block">
                        🥗 {msg.recipe.title}
                      </span>
                      <div className="space-y-1 bg-white/60 dark:bg-zinc-900/60 p-2 rounded-xl text-[11px]">
                        {msg.recipe.ingredients.map((ing: any, idx: number) => (
                          <div key={idx} className="flex justify-between">
                            <span>• {ing.title} ({ing.quantity})</span>
                            <span className="font-bold">Rs. {Math.round(ing.price).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          msg.recipe.ingredients.forEach((ing: any) => {
                            const found = products.find(p => p.id === ing.productId);
                            if (found) requireAuthAndAddToCart(found, 1, '1kg');
                          });
                          setIsAiDrawerOpen(false);
                          if (currentUser) setIsCartOpen(true);
                        }}
                        className="w-full py-2 bg-[#044F41] text-[#78F9B8] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                      >
                        + Add All To Cart (Rs. {Math.round(msg.recipe.totalPrice).toLocaleString()})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="text-slate-400 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#78F9B8]" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask for healthy dinners, gluten-free snacks..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
              className="flex-1 py-2 px-3.5 rounded-full text-xs border border-slate-200 dark:border-zinc-800 bg-transparent focus:outline-none"
            />
            <button
              onClick={() => handleSendAiPrompt()}
              className="w-8 h-8 rounded-full bg-[#FF632B] text-white flex items-center justify-center shadow"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 10. REAL-TIME LIVE GPS ORDER TRACKING MODAL */}
      {isTrackingModalOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
            <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#FF632B]" />
                <h3 className="font-extrabold text-sm">Live Supermarket Delivery Status</h3>
              </div>
              <button onClick={() => setIsTrackingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-56 bg-[#11221D] overflow-hidden">
              <svg className="w-full h-full opacity-30" width="100%" height="100%">
                <defs>
                  <pattern id="grid-web" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#78F9B8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-web)" />
              </svg>

              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 60 180 L 160 140 L 260 140 L 340 70 L 420 50"
                  fill="none"
                  stroke="#FF632B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />
                <circle cx="60" cy="180" r="14" fill="#044F41" stroke="#78F9B8" strokeWidth="3" />
                <circle cx="260" cy="140" r="12" fill="#FF632B" stroke="#ffffff" strokeWidth="2" />
                <circle cx="420" cy="50" r="14" fill="#FF632B" stroke="#ffffff" strokeWidth="3" />
              </svg>

              <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-xl text-white text-xs font-bold flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#78F9B8]" />
                <span>Courier is on the way (Arriving in ~25 mins)</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-base">Order #{activeOrder.orderNumber}</h4>
                  <p className="text-xs text-slate-400">Total: Rs. {Math.round(activeOrder.totalAmount || 0).toLocaleString()} • {activeOrder.items?.length || 2} items</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-700">
                  {activeOrder.status?.replace('_', ' ') || 'ON THE WAY'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                    alt="Driver"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#78F9B8]"
                  />
                  <div>
                    <h5 className="text-xs font-black">Brie Larson</h5>
                    <p className="text-[10px] text-slate-400">Delivery Partner • Electric Scooter</p>
                  </div>
                </div>
                <a
                  href="tel:+15552348971"
                  className="w-9 h-9 rounded-full bg-[#FF632B] text-white flex items-center justify-center shadow hover:bg-orange-600"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. PRODUCT DETAIL & WEIGHT SELECTOR MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="relative h-64">
              <img
                src={selectedProduct.imageUrl}
                alt=""
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950/80 backdrop-blur text-[#78F9B8] border border-[#78F9B8]/40 shadow">
                  ✨ AI Freshness {selectedProduct.aiFreshnessScore}%
                </span>
                {selectedProduct.isOrganic && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF632B] text-white shadow">
                    100% Organic
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">{selectedProduct.title}</h3>
                  <p className="text-xs text-slate-400">{selectedProduct.brand} • {selectedProduct.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#FF632B]">
                    Rs. {Math.round(selectedProduct.price * calculateWeightMultiplier(modalSelectedWeight)).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    {selectedProduct.availableWeights ? `for ${modalSelectedWeight}` : `per ${selectedProduct.unit}`}
                  </span>
                </div>
              </div>

              {/* Weight selection pills for produce (250g, 500g, 1kg, 2kg) */}
              {selectedProduct.availableWeights && selectedProduct.availableWeights.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-extrabold uppercase text-slate-400">
                    Select Produce Portion Weight:
                  </label>
                  <div className="flex gap-2">
                    {selectedProduct.availableWeights.map(w => (
                      <button
                        key={w}
                        onClick={() => setModalSelectedWeight(w)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                          modalSelectedWeight === w
                            ? 'bg-[#044F41] text-[#78F9B8] border-emerald-600 shadow-sm'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                {selectedProduct.description ||
                  'High quality, fresh supermarket staple. Sourced according to strict quality standards and handled with clean refrigeration.'}
              </p>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    requireAuthAndAddToCart(selectedProduct, 1, modalSelectedWeight);
                    setSelectedProduct(null);
                    if (currentUser) setIsCartOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] text-xs font-black shadow transition active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`mt-auto py-8 px-6 border-t text-xs text-center text-slate-400 ${
        isDarkMode ? 'bg-[#0A0A0C] border-zinc-900' : 'bg-white border-slate-200'
      }`}>
        <p className="font-semibold text-slate-600 dark:text-zinc-400">
          Ceylon Foods Supermarket — Sri Lanka Online Supermarket & Logistics.
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Central Distribution Supermarket Hub • Guaranteed 45-Min Delivery across Colombo & Suburbs.
        </p>
      </footer>
    </div>
  );
}
