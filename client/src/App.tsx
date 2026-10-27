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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('theme') === 'dark') return true;
    if (params?.get('theme') === 'light') return false;
    return typeof window !== 'undefined' && localStorage.getItem('ceylonfoods_theme') === 'dark';
  });
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('cart') === 'true') {
      return [
        {
          product: {
            id: 'sample-1',
            sku: 'STA-KEERI-01',
            title: 'Araliya Keeri Samba Rice (5kg)',
            description: 'Premium aged aromatic Keeri Samba rice',
            category: 'Staples & Grains',
            brand: 'Araliya',
            price: 1450,
            originalPrice: 1600,
            unit: '5kg Bag',
            unitWeight: '5kg',
            imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
            stock: 45,
            store: 'Colombo Central Hub',
            status: 'Active' as const,
            aiFreshnessScore: 98,
            isOrganic: true,
            isFarmSourced: true,
            rating: 4.9,
            reviewsCount: 142,
            availableWeights: ['5kg', '10kg']
          },
          quantity: 2,
          selectedWeight: '5kg',
          effectivePrice: 1450
        },
        {
          product: {
            id: 'sample-2',
            sku: 'DAI-HIGH-01',
            title: 'Highland Pasteurized Fresh Milk (1L)',
            description: '100% Pure Sri Lankan highland dairy milk',
            category: 'Dairy & Eggs',
            brand: 'Highland',
            price: 520,
            originalPrice: 550,
            unit: '1L Bottle',
            unitWeight: '1L',
            imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
            stock: 30,
            store: 'Colombo Central Hub',
            status: 'Active' as const,
            aiFreshnessScore: 99,
            isOrganic: false,
            isFarmSourced: true,
            rating: 4.8,
            reviewsCount: 88,
            availableWeights: ['1L', '2L']
          },
          quantity: 3,
          selectedWeight: '1L',
          effectivePrice: 520
        }
      ];
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('cart') === 'true') {
      return true;
    }
    return false;
  });
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_TIME_SLOTS[0]);
  const [substitutionPolicy, setSubstitutionPolicy] = useState<'CALL_ME' | 'REPLACE_BEST' | 'REFUND'>('REPLACE_BEST');
  const [paymentMethod, setPaymentMethod] = useState<'CARD_ONLINE' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY'>('CARD_ONLINE');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Customer Features matching Admin: Promo Codes & Delivery Zones
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; title: string; discount: number; freeDelivery?: boolean } | null>(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('cart') === 'true') {
      return { code: 'FRESH10', title: '10% Off Grocery Special (Admin Sync)', discount: 446 };
    }
    return null;
  });
  const [promoError, setPromoError] = useState('');
  const [selectedZone, setSelectedZone] = useState<{ name: string; coverage: string; fee: number }>({
    name: 'Colombo Central',
    coverage: 'Colombo 01–07',
    fee: 300
  });

  const CEYLON_DELIVERY_ZONES = [
    { name: 'Colombo Central', coverage: 'Colombo 01–07', fee: 300 },
    { name: 'Colombo South', coverage: 'Colombo 08–15, Dehiwala', fee: 300 },
    { name: 'Greater Colombo', coverage: 'Nugegoda, Rajagiriya, Battaramulla', fee: 350 },
    { name: 'Outer Suburbs', coverage: 'Maharagama, Pannipitiya, Kottawa', fee: 450 }
  ];

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

  // Promo Code Validation Handler
  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FRESH10') {
      if (subtotal < 3000) {
        setPromoError('FRESH10 requires a minimum order of Rs. 3,000');
        return;
      }
      const disc = Math.min(500, Math.round(subtotal * 0.10));
      setAppliedPromo({ code: 'FRESH10', title: '10% Off Farm Fresh (Max Rs. 500)', discount: disc });
      setPromoCodeInput('');
    } else if (code === 'FREESHIP') {
      if (subtotal < 3000) {
        setPromoError('FREESHIP requires a minimum basket of Rs. 3,000');
        return;
      }
      setAppliedPromo({ code: 'FREESHIP', title: 'Free Express Delivery Waived', discount: selectedZone.fee, freeDelivery: true });
      setPromoCodeInput('');
    } else if (code === 'AYUBOWAN') {
      setAppliedPromo({ code: 'AYUBOWAN', title: 'Rs. 500 Welcome Discount', discount: Math.min(500, subtotal) });
      setPromoCodeInput('');
    } else if (code === 'NOV500') {
      if (subtotal < 5000) {
        setPromoError('NOV500 requires a minimum basket of Rs. 5,000');
        return;
      }
      setAppliedPromo({ code: 'NOV500', title: 'Rs. 500 Essentials Discount', discount: 500 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promotion code. Try FRESH10, FREESHIP, or AYUBOWAN');
    }
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

  // Calculations (Integrated with Admin Settings & Promotions)
  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const vatAmount = 0; // Prices include tax as per Admin Settings
  const isFreeDeliveryQualified = subtotal >= 5000 || appliedPromo?.freeDelivery === true;
  const effectiveDeliveryFee = isFreeDeliveryQualified ? 0 : selectedZone.fee;
  const promoDiscountAmount = appliedPromo ? appliedPromo.discount : 0;
  const bundleDiscount = cart.length >= 3 ? 150.00 : 0.0;
  const totalAmount = Math.max(0, subtotal + effectiveDeliveryFee - bundleDiscount - promoDiscountAmount);

  // Category items matching Attachment 1 navigation ribbon
  const CATEGORY_RIBBON_ITEMS = [
    { id: 'all', label: 'All', icon: '☰', filterKey: 'All' },
    { id: 'fruits', label: 'Fruits', icon: '🍎', filterKey: 'Fruits' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥦', filterKey: 'Vegetables' },
    { id: 'dairy', label: 'Dairy & Eggs', icon: '🥛', filterKey: 'Dairy & Eggs' },
    { id: 'meat', label: 'Meat & Seafood', icon: '🥩', filterKey: 'Meat & Seafood' },
    { id: 'bakery', label: 'Bakery', icon: '🍞', filterKey: 'Bakery' },
    { id: 'pantry', label: 'Pantry', icon: '🌾', filterKey: 'Pantry' },
    { id: 'beverages', label: 'Beverages', icon: '🧃', filterKey: 'Beverages' },
    { id: 'household', label: 'Household', icon: '🧼', filterKey: 'Household' }
  ];

  // 6 visual category banner cards matching Attachment 1
  const CATEGORY_CARDS = [
    { id: 'cat-fruits', title: 'Fruits', subtitle: 'Sweet & juicy harvest', image: '/cat_fruits.jpg', filterKey: 'Fruits' },
    { id: 'cat-veg', title: 'Vegetables', subtitle: 'Fresh Nuwara Eliya greens', image: '/cat_vegetables.jpg', filterKey: 'Vegetables' },
    { id: 'cat-dairy', title: 'Dairy & Eggs', subtitle: 'Pure highland milk & eggs', image: '/cat_dairy.jpg', filterKey: 'Dairy & Eggs' },
    { id: 'cat-meat', title: 'Meat & Seafood', subtitle: 'Fresh poultry & local cuts', image: '/cat_meat.jpg', filterKey: 'Meat & Seafood' },
    { id: 'cat-bakery', title: 'Bakery', subtitle: 'Roast paan & fresh loaves', image: '/cat_bakery.jpg', filterKey: 'Bakery' },
    { id: 'cat-pantry', title: 'Pantry', subtitle: 'Keeri samba & Ceylon spices', image: '/cat_pantry.jpg', filterKey: 'Pantry' }
  ];

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
    let matchCat = true;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Fruits') {
        matchCat = p.category.toLowerCase().includes('fruit') ||
                   p.title.toLowerCase().includes('orange') ||
                   p.title.toLowerCase().includes('banana') ||
                   p.title.toLowerCase().includes('apple') ||
                   p.title.toLowerCase().includes('avocado') ||
                   p.title.toLowerCase().includes('දොඩම්') ||
                   p.title.toLowerCase().includes('කෙසෙල්') ||
                   p.title.toLowerCase().includes('අලිගැටපේර');
      } else if (selectedCategory === 'Vegetables') {
        matchCat = p.category.toLowerCase().includes('veg') ||
                   p.title.toLowerCase().includes('broccoli') ||
                   p.title.toLowerCase().includes('tomato') ||
                   p.title.toLowerCase().includes('pumpkin') ||
                   p.title.toLowerCase().includes('වට්ටක්කා') ||
                   p.title.toLowerCase().includes('තක්කාලි') ||
                   p.title.toLowerCase().includes('බ්‍රොකොලි');
      } else if (selectedCategory === 'Pantry' || selectedCategory === 'Staples & Grains') {
        matchCat = p.category.toLowerCase().includes('staple') ||
                   p.category.toLowerCase().includes('pantry') ||
                   p.category.toLowerCase().includes('grain');
      } else {
        matchCat = p.category.toLowerCase() === selectedCategory.toLowerCase();
      }
    }
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
      {/* 1. TOP ANNOUNCEMENT BAR (MATCHING ATTACHMENT 1) */}
      <div className="bg-[#0C6237] text-white text-xs py-2 px-6 flex items-center justify-between border-b border-emerald-950/40 select-none">
        <div className="flex items-center gap-2 font-bold mx-auto sm:mx-0">
          <Truck className="w-3.5 h-3.5 text-[#78F9B8]" />
          <span>Fresh groceries delivered to your doorstep across Sri Lanka</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              setOnboardingStep(0);
              setOnboardingView('SPLASH');
              setIsOnboardingOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 hover:bg-emerald-950 text-[#78F9B8] text-[11px] font-bold transition"
          >
            <Sparkles className="w-3 h-3 text-[#78F9B8]" />
            <span className="font-sinhala">ආයුබෝවන් (App Tour)</span>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 text-[11px] font-semibold transition"
          >
            {isDarkMode ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-[#78F9B8]" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER (MATCHING ATTACHMENT 1 LAYOUT) */}
      <header className={`sticky top-0 z-30 px-6 py-3 border-b backdrop-blur-md transition ${
        isDarkMode ? 'bg-[#0D0D0D]/95 border-zinc-800' : 'bg-white/95 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Ceylon Foods Brand Logo (Official Logo from Attachment 2) */}
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

          {/* Search Bar matching Attachment 1 */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search for fruits, vegetables, pantry essentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2.5 pl-11 pr-10 rounded-full text-xs font-semibold focus:outline-none transition ${
                isDarkMode
                  ? 'bg-[#18181A] text-white placeholder-zinc-500 border border-zinc-800 focus:border-[#78F9B8]'
                  : 'bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-[#0C6237]'
              }`}
            />
            <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0C6237] transition">
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Deliver to indicator matching Attachment 1 */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-[#18181A] px-3.5 py-2 rounded-full border border-slate-200 dark:border-zinc-800 cursor-pointer hover:border-[#0C6237] transition">
            <MapPin className="w-3.5 h-3.5 text-[#0C6237]" />
            <span>Deliver to <strong className="text-slate-900 dark:text-white">{currentUser?.address ? currentUser.address.split(',')[0] : 'Colombo'}</strong> ▾</span>
          </div>

          {/* Header Actions: Sign In & Cart with orange badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#0C6237] dark:text-[#78F9B8] text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/40 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0C6237] dark:text-[#78F9B8]" />
              <span>FreshBot</span>
            </button>

            {/* Customer Authentication Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800/80 pl-2 pr-1.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#0C6237] text-white font-black flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-extrabold max-w-[80px] truncate hidden sm:inline">
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
                className="px-4 py-2 rounded-full border border-slate-300 dark:border-zinc-700 hover:border-slate-400 text-slate-800 dark:text-white font-extrabold text-xs transition"
              >
                Sign In
              </button>
            )}

            {/* Cart Trigger with Circular Orange Badge matching Attachment 1 */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setAuthError('Please sign in or create an account to view your cart.');
                  setIsAuthModalOpen(true);
                } else {
                  setIsCartOpen(true);
                }
              }}
              className="relative p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-white transition active:scale-95 flex items-center justify-center"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800 dark:text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6515] text-white text-[10px] font-black flex items-center justify-center shadow">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Cultural Sri Lankan Trust & Free Delivery Ribbon */}
        <div className="w-full mt-2.5 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            {/* Left: Flag Badge + Sri Lankan Authentic Identity */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50/70 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300/80 dark:border-amber-700/60 shadow-xs hover:border-amber-400 transition cursor-default">
                <img
                  src="/sri_lanka_flag.svg"
                  alt="Flag of Sri Lanka"
                  className="shrink-0 rounded-xs shadow-xs object-cover border border-amber-400/50"
                  style={{ width: '24px', height: '15px' }}
                />
                <span className="text-[11px] font-black tracking-tight text-amber-950 dark:text-amber-100 whitespace-nowrap">
                  100% ශ්‍රී ලාංකික
                </span>
                <span className="text-[10px] text-amber-800 dark:text-amber-300 font-bold hidden sm:inline whitespace-nowrap">
                  • Authentic Sri Lankan Supermarket
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-extrabold text-[#0C6237] dark:text-[#78F9B8] whitespace-nowrap">
                <Leaf className="w-3.5 h-3.5 text-[#0C6237] dark:text-[#78F9B8]" />
                <span>Dambulla & Nuwara Eliya Fresh</span>
              </div>
            </div>

            {/* Center: Ceylon Quality Seal (Large screens) */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-zinc-300 whitespace-nowrap">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Lion Certified Quality</span>
              </span>
              <span className="text-slate-300 dark:text-zinc-700">•</span>
              <span className="text-slate-500 dark:text-zinc-400">
                LankaQR & Cash on Delivery
              </span>
            </div>

            {/* Right: Rupee Free Express Meter */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/80 shadow-xs text-[11px] shrink-0 ml-auto sm:ml-0">
              <Truck className="w-3.5 h-3.5 text-[#0C6237] dark:text-[#78F9B8] shrink-0" />
              <span className="font-bold text-slate-700 dark:text-zinc-200 hidden sm:inline whitespace-nowrap">
                Free Express over Rs. 5,000:
              </span>
              <div className="w-20 sm:w-24 h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0C6237] via-[#0284C7] to-[#78F9B8] transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                />
              </div>
              {subtotal >= 5000 ? (
                <span className="font-black text-[#0C6237] dark:text-[#78F9B8] flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Free Unlocked!
                </span>
              ) : (
                <span className="font-extrabold text-[#0C6237] dark:text-emerald-300 whitespace-nowrap">
                  +Rs. {Math.max(0, 5000 - Math.round(subtotal)).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2.5 CATEGORY NAVIGATION RIBBON (MATCHING ATTACHMENT 1) */}
      <div className={`border-b select-none transition ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORY_RIBBON_ITEMS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.filterKey);
                const el = document.getElementById('popular-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                selectedCategory === cat.filterKey
                  ? 'bg-[#0C6237] text-white shadow-sm'
                  : isDarkMode
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTAINER (EXACT ATTACHMENT 1 LAYOUT) */}
      <main className="max-w-7xl mx-auto w-full px-6 py-6 flex-1 space-y-10">
        {/* 3. HERO BANNER (MATCHING ATTACHMENT 1) */}
        <div className={`relative rounded-[32px] overflow-hidden p-8 sm:p-12 border transition ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#0E1A14] to-[#12231A] border-emerald-950/60'
            : 'bg-[#F4F7F2] border-[#E2ECE3]'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EFE7] dark:bg-emerald-950/60 text-[#0C6237] dark:text-[#78F9B8] text-xs font-black tracking-wide">
                <Leaf className="w-3.5 h-3.5 text-[#0C6237] dark:text-[#78F9B8]" />
                <span>Fresh from our island to your home.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Fresh from our island <br />
                <span className="text-[#0C6237] dark:text-[#78F9B8]">to your home.</span>
              </h1>

              <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed max-w-lg">
                Handpicked produce, organic harvest, and kitchen essentials delivered straight from Sri Lankan farms to your door.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('popular-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#0C6237] hover:bg-[#094d2b] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 flex items-center gap-2 transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop groceries</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('categories-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full border border-slate-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm shadow-sm transition active:scale-95"
                >
                  Explore categories
                </button>
              </div>
            </div>

            {/* Right Column (7 cols) - Large Hero Image with Scalloped Sunburst Badge */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-3xl flex items-center justify-center">
                <img
                  src="/home_hero_basket.png"
                  alt="Ceylon Foods Fresh Harvest Basket"
                  className="w-full max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
                />
                {/* Scalloped Sunburst Badge */}
                <div className="absolute top-2 right-2 sm:top-0 sm:right-6 px-4 py-2.5 rounded-2xl bg-[#0C6237] text-white shadow-2xl flex items-center gap-2 border-2 border-white dark:border-zinc-900 animate-pulse z-10">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">Fresh picks</span>
                    <span className="text-xs font-black leading-none">this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. VALUE PROPOSITION STRIP (MATCHING ATTACHMENT 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/70 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0C6237] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Same-day delivery</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Fast doorstep delivery across Colombo & suburbs within hours.</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/70 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0C6237] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Freshness you can trust</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Direct from certified local growers with AI quality grading.</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition hover:shadow-md ${
            isDarkMode ? 'bg-[#18181A] border-zinc-800' : 'bg-white border-slate-200/70 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0C6237] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Secure payments</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Pay safely via Card, Koko, Mintpay, or Cash on Delivery.</p>
            </div>
          </div>
        </div>

        {/* 5. SHOP BY CATEGORY (MATCHING ATTACHMENT 1) */}
        <section id="categories-section" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Shop by category
            </h2>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs sm:text-sm font-extrabold text-[#0C6237] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CATEGORY_CARDS.map(cat => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.filterKey);
                  const el = document.getElementById('popular-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group p-3 rounded-2xl border cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#18181A] border-zinc-800 hover:border-emerald-800'
                    : 'bg-white border-slate-200/80 hover:border-emerald-200 shadow-sm'
                }`}
              >
                <div className="h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-[#0C6237] dark:group-hover:text-[#78F9B8] transition">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. POPULAR THIS WEEK (MATCHING ATTACHMENT 1) */}
        <section id="popular-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#0C6237] dark:bg-emerald-950/80 dark:text-[#78F9B8]">
                Best sellers
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Popular this week
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Our most-loved groceries, picked fresh today from local island producers.
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {['All', 'Fruits', 'Vegetables', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Pantry'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0C6237] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Attachment 1 Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map(product => {
              const inCartItem = cart.find(i => i.product.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setModalSelectedWeight('1kg');
                  }}
                  className={`group rounded-2xl p-3.5 sm:p-4 border cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    isDarkMode
                      ? 'bg-[#18181A] border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="relative">
                    <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900 flex items-center justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
                        }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Badges on product image */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-950/80 backdrop-blur text-[#78F9B8] border border-[#78F9B8]/30 shadow">
                        ✨ {product.aiFreshnessScore}% Fresh
                      </span>
                      {product.isOrganic && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#0C6237] text-white shadow">
                          Organic
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur text-slate-400 hover:text-red-500 flex items-center justify-center transition shadow-sm"
                      title="Add to Wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-black tracking-wider">
                      <span>{product.category}</span>
                      <span className="flex items-center gap-0.5 font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.rating}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate" title={product.title}>
                      {product.title}
                    </h4>

                    {/* Weight selector chip */}
                    <div className="flex items-center gap-1 pt-0.5" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px] font-bold text-slate-400">Unit:</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-[10px] font-black text-slate-700 dark:text-zinc-300">
                        {product.unitWeight || (product.unit === 'kg' ? '1kg' : product.unit)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          Rs. {Math.round(product.price).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-0.5">/{product.unit}</span>
                      </div>

                      {inCartItem ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 bg-[#0C6237] text-white px-2.5 py-1 rounded-xl shadow"
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
                          className="w-9 h-9 rounded-full bg-[#0C6237] hover:bg-[#084928] text-white flex items-center justify-center shadow-md transition active:scale-90"
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

        {/* 7. LOCAL FARMER & ISLAND PROMISE BANNER (MATCHING ATTACHMENT 1) */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 text-white shadow-xl min-h-[200px] flex flex-col justify-between">
          <img
            src="/farmer_tea_banner.jpg"
            alt="Sri Lankan Farmer Tea Estate"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C6237]/95 via-[#0C6237]/85 to-transparent"></div>

          <div className="relative z-10 max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 text-[#78F9B8] text-[11px] font-black uppercase tracking-wider border border-[#78F9B8]/40">
              <Leaf className="w-3.5 h-3.5" /> OUR PROMISE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              A little more local. <br />
              <span className="text-[#78F9B8]">A lot more fresh.</span>
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Supporting Sri Lankan farmers and bringing you the best of our island — direct from Nuwara Eliya tea hills, Dambulla vegetable growers, and local coastal farms.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                setOnboardingStep(0);
                setOnboardingView('SPLASH');
                setIsOnboardingOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-white text-[#0C6237] hover:bg-emerald-50 font-black text-xs shadow-lg transition active:scale-95 flex items-center gap-2"
            >
              <span>Learn about our local growers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8. COOK FRESH TONIGHT WITH AI RECIPES */}
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
            {/* Meal 1 */}
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
                      const pPast = products.find(p => p.title.includes('Penne') || p.title.includes('Rice') || p.title.includes('Samba'));
                      if (pChik) requireAuthAndAddToCart(pChik, 1);
                      if (pPast) requireAuthAndAddToCart(pPast, 1);
                      if (currentUser) setIsCartOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#0C6237] hover:bg-emerald-950 text-[#78F9B8] text-xs font-bold rounded-xl transition"
                  >
                    + Add Ingredients
                  </button>
                </div>
              </div>
            </div>

            {/* Meal 2 */}
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
                      const pAvo = products.find(p => p.title.includes('Avocado') || p.title.includes('Dhal'));
                      const pTom = products.find(p => p.title.includes('Tomato') || p.title.includes('Paan'));
                      if (pAvo) requireAuthAndAddToCart(pAvo, 1);
                      if (pTom) requireAuthAndAddToCart(pTom, 1);
                      if (currentUser) setIsCartOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#0C6237] hover:bg-emerald-950 text-[#78F9B8] text-xs font-bold rounded-xl transition"
                  >
                    + Add Ingredients
                  </button>
                </div>
              </div>
            </div>
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
            <div className={`relative max-w-sm w-full rounded-[40px] overflow-hidden shadow-2xl border flex flex-col justify-between h-[690px] animate-scaleUp transition-all duration-300 ${
              isDarkMode ? 'bg-[#090C0B] border-emerald-900/40 text-white' : 'bg-[#FFFDF9] border-emerald-100 text-slate-800'
            }`}>
              {/* Skip / Close Top Button */}
              <button
                onClick={handleFinishOnboarding}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
                title="Close to Store"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Exact Attachment 3 Artwork with Sinhala script "ආයුබෝවන්.!" */}
              <div className="relative flex-1 overflow-hidden bg-[#FFFDF9]">
                <img
                  src="/ceylon_splash_artwork_sinhala.jpg"
                  alt="Ceylon Foods — ආයුබෝවන්.!"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Bottom Elevated Action Bar */}
              <div className="p-5 pt-3 text-center space-y-2.5 z-20 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-[#090C0B] dark:via-[#090C0B]/95">
                <button
                  onClick={handleFinishOnboarding}
                  className="w-full py-3.5 rounded-full bg-[#0C6237] hover:bg-[#084928] text-white font-extrabold text-sm shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <span>Shop Island Groceries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 text-xs">
                  <button
                    onClick={() => {
                      handleFinishOnboarding();
                      setIsAuthModalOpen(true);
                    }}
                    className="font-bold text-slate-500 hover:text-[#0C6237] dark:text-zinc-400 dark:hover:text-white transition"
                  >
                    Already have an account? <span className="underline text-[#0C6237] dark:text-[#78F9B8]">Sign In</span>
                  </button>
                  <span className="text-slate-300 dark:text-zinc-700">•</span>
                  <button
                    onClick={() => {
                      setOnboardingView('SLIDES');
                      setOnboardingStep(0);
                    }}
                    className="font-bold text-[#FF6515] hover:underline"
                  >
                    Feature Tour →
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

                {/* Delivery Zone Selector (from Admin Settings) */}
                {cart.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Select Delivery Zone
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {CEYLON_DELIVERY_ZONES.map(zone => (
                        <button
                          key={zone.name}
                          type="button"
                          onClick={() => setSelectedZone(zone)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition ${
                            selectedZone.name === zone.name
                              ? 'border-[#0C6237] bg-emerald-50/50 dark:bg-emerald-950/20 font-bold'
                              : 'border-slate-200 dark:border-zinc-800'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-[11px] text-slate-800 dark:text-white">{zone.name}</span>
                            <span className="text-[10px] text-[#0C6237] dark:text-[#78F9B8] font-black">
                              {isFreeDeliveryQualified ? 'FREE' : `Rs. ${zone.fee}`}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{zone.coverage}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promo Code Input (from Admin Promotions) */}
                {cart.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Have a promo code?
                      </span>
                      <span className="text-[10px] font-bold text-[#0C6237] dark:text-[#78F9B8]">
                        Try FRESH10 or FREESHIP
                      </span>
                    </div>

                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-[#0C6237] dark:text-[#78F9B8]">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{appliedPromo.code}: {appliedPromo.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          className="text-xs font-bold text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon (e.g. FRESH10)"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-mono font-bold uppercase focus:border-[#0C6237] focus:outline-none dark:bg-zinc-900"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-4 py-1.5 rounded-xl bg-[#0C6237] text-white text-xs font-extrabold hover:bg-[#094d2b] transition active:scale-95"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {promoError && (
                      <p className="text-[11px] font-bold text-red-500">{promoError}</p>
                    )}
                  </div>
                )}

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
                      <span>Delivery ({selectedZone.name})</span>
                      <span className="text-slate-800 dark:text-white font-bold">
                        {effectiveDeliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${effectiveDeliveryFee}`}
                      </span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-600 dark:text-[#78F9B8] font-bold">
                        <span>Promo ({appliedPromo.code})</span>
                        <span>-Rs. {appliedPromo.discount.toLocaleString()}</span>
                      </div>
                    )}
                    {bundleDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-[#78F9B8] font-bold">
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
                          deliveryFee: effectiveDeliveryFee,
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
