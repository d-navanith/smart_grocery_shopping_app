import React, { useState, useEffect } from 'react';
import { Product, CartItem, CustomerUser, DeliveryZone } from './types';
import { HeaderNav } from './components/HeaderNav';
import { ShopView } from './components/ShopView';
import { CartView } from './components/CartView';
import { HomeView } from './components/HomeView';
import { AiRecipeView } from './components/AiRecipeView';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

const CEYLON_DELIVERY_ZONES: DeliveryZone[] = [
  { name: 'Colombo Central', coverage: 'Colombo 01–07', fee: 300 },
  { name: 'Colombo South', coverage: 'Colombo 08–15, Dehiwala', fee: 300 },
  { name: 'Greater Colombo', coverage: 'Nugegoda, Rajagiriya, Battaramulla', fee: 350 },
  { name: 'Outer Suburbs', coverage: 'Maharagama, Pannipitiya, Kottawa', fee: 450 }
];

export default function ClientWebSupermarket() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('theme') === 'dark') return true;
    if (params?.get('theme') === 'light') return false;
    return typeof window !== 'undefined' && localStorage.getItem('ceylonfoods_theme') === 'dark';
  });

  // Navigation State: 'SHOP' is default or 'HOME'
  const [currentPage, setCurrentPage] = useState<'HOME' | 'SHOP' | 'CART' | 'RECIPES'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === 'cart') return 'CART';
      if (p === 'recipes') return 'RECIPES';
      if (p === 'home') return 'HOME';
    }
    return 'SHOP'; // Default to Shop view so user immediately sees the Image 1 theme!
  });

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['sample-1']);

  // Customer User Authentication
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('ceylonfoods_customer_user');
    return saved ? JSON.parse(saved) : {
      id: 'cust-1',
      name: 'Brie Larson',
      email: 'brie@example.com',
      phone: '+94 77 123 4567',
      address: '33 York Street, Colombo 01',
      role: 'CUSTOMER'
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cart State (Initialized with sample items matching Image 2)
  const [cart, setCart] = useState<CartItem[]>([
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
        status: 'Active',
        aiFreshnessScore: 98,
        isOrganic: true,
        isFarmSourced: true,
        rating: 4.9,
        reviewsCount: 142,
        availableWeights: ['5kg', '10kg'],
        productType: 'Packaged Goods'
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
        status: 'Active',
        aiFreshnessScore: 99,
        isOrganic: false,
        isFarmSourced: true,
        rating: 4.8,
        reviewsCount: 88,
        availableWeights: ['1L', '2L'],
        productType: 'Chilled & Frozen'
      },
      quantity: 3,
      selectedWeight: '1L',
      effectivePrice: 520
    }
  ]);

  // Delivery & Promo Settings
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(CEYLON_DELIVERY_ZONES[0]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; title: string; discount: number; freeDelivery?: boolean } | null>({
    code: 'FRESH10',
    title: '10% Off Supermarket Special',
    discount: 446
  });
  const [promoError, setPromoError] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>({
    orderNumber: 'CF-8921',
    status: 'OUT_FOR_DELIVERY',
    totalAmount: 4314,
    items: ['Araliya Keeri Samba', 'Highland Milk']
  });

  // Fetch live products & orders from server
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const loadedProducts = data.data.map((p: Product) => ({
            ...p,
            availableWeights: p.unit === 'kg' ? ['250g', '500g', '1kg', '2kg'] : undefined,
            productType: p.category.includes('Fruit') || p.category.includes('Veg')
              ? 'Fresh Produce'
              : p.category.includes('Dairy') || p.category.includes('Meat')
              ? 'Chilled & Frozen'
              : 'Packaged Goods'
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

  // Theme Sync
  useEffect(() => {
    localStorage.setItem('ceylonfoods_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const isFreeDeliveryQualified = subtotal >= 5000 || appliedPromo?.freeDelivery === true;
  const effectiveDeliveryFee = isFreeDeliveryQualified ? 0 : selectedZone.fee;
  const promoDiscountAmount = appliedPromo ? appliedPromo.discount : 0;
  const totalAmount = Math.max(0, subtotal + effectiveDeliveryFee - promoDiscountAmount);

  // Cart Operations
  const handleAddToCart = (product: Product, qty: number = 1, weight: string = '1kg') => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const multiplier = weight === '250g' ? 0.25 : weight === '500g' ? 0.5 : weight === '2kg' ? 2 : 1;
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

  const handleUpdateCartQty = (productId: string, weight: string | undefined, delta: number) => {
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

  const handleRemoveFromCart = (productId: string, weight?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedWeight === weight)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Promo Code Validation
  const handleApplyPromo = (code: string) => {
    setPromoError('');
    const c = code.trim().toUpperCase();
    if (c === 'FRESH10') {
      const disc = Math.round(subtotal * 0.10);
      setAppliedPromo({ code: 'FRESH10', title: '10% Off Supermarket Special', discount: disc });
    } else if (c === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', title: 'Free Express Delivery Waived', discount: selectedZone.fee, freeDelivery: true });
    } else if (c === 'AYUBOWAN') {
      setAppliedPromo({ code: 'AYUBOWAN', title: 'Rs. 500 Welcome Voucher', discount: Math.min(500, subtotal) });
    } else {
      setPromoError('Invalid coupon. Try FRESH10, FREESHIP, or AYUBOWAN');
    }
  };

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Checkout submission
  const handleCheckout = async () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
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
          deliveryFee: effectiveDeliveryFee,
          totalAmount,
          deliveryZone: selectedZone.name,
          address: currentUser.address,
          status: 'CONFIRMED'
        })
      });
      const data = await res.json();
      if (data.data) {
        setActiveOrder(data.data);
      }
    } catch {
      // Mock order fallback
      setActiveOrder({
        orderNumber: 'CF-' + Math.floor(1000 + Math.random() * 9000),
        status: 'CONFIRMED',
        totalAmount,
        items: cart.map(c => c.product.title)
      });
    }

    setCart([]);
    setIsTrackingModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0A0D0B] text-white' : 'bg-[#F9FAF9] text-slate-800'} font-sans flex flex-col transition-colors duration-200`}>
      {/* 1. HEADER & SUB-NAV WITH IMAGE 1/2 COLOR SCHEME */}
      <HeaderNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('ceylonfoods_customer_user');
        }}
        cart={cart}
        wishlistCount={wishlist.length}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenAppTour={() => setIsOnboardingOpen(true)}
        subtotal={subtotal}
      />

      {/* 2. DYNAMIC MAIN BODY VIEW */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'SHOP' && (
          <ShopView
            products={products}
            cart={cart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onSelectProduct={(p) => setSelectedProduct(p)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isDarkMode={isDarkMode}
            onNavigateHome={() => setCurrentPage('HOME')}
          />
        )}

        {currentPage === 'CART' && (
          <CartView
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            subtotal={subtotal}
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
            deliveryZones={CEYLON_DELIVERY_ZONES}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={() => setAppliedPromo(null)}
            promoError={promoError}
            totalAmount={totalAmount}
            effectiveDeliveryFee={effectiveDeliveryFee}
            isFreeDeliveryQualified={isFreeDeliveryQualified}
            currentUser={currentUser}
            onOpenCheckoutModal={handleCheckout}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onNavigateHome={() => setCurrentPage('HOME')}
            isDarkMode={isDarkMode}
          />
        )}

        {currentPage === 'HOME' && (
          <HomeView
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            isDarkMode={isDarkMode}
            onOpenAppTour={() => setIsOnboardingOpen(true)}
          />
        )}

        {currentPage === 'RECIPES' && (
          <AiRecipeView
            products={products}
            onAddToCart={handleAddToCart}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* 3. FOOTER */}
      <Footer
        onNavigatePage={setCurrentPage}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 4. MODALS & DRAWERS */}
      <Modals
        selectedProduct={selectedProduct}
        onCloseProductModal={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isAuthOpen={isAuthModalOpen}
        onCloseAuth={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('ceylonfoods_customer_user', JSON.stringify(user));
        }}
        isOnboardingOpen={isOnboardingOpen}
        onCloseOnboarding={() => setIsOnboardingOpen(false)}
        onOpenAuthFromOnboarding={() => setIsAuthModalOpen(true)}
        isTrackingOpen={isTrackingModalOpen}
        onCloseTracking={() => setIsTrackingModalOpen(false)}
        activeOrder={activeOrder}
        isCartDrawerOpen={isCartDrawerOpen}
        onCloseCartDrawer={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={subtotal}
        onNavigateToCartPage={() => setCurrentPage('CART')}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
