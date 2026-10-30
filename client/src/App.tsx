import React, { useState, useEffect } from 'react';
import { Product, CartItem, CustomerUser, DeliveryZone, ClientOrder } from './types';
import { INITIAL_PRODUCTS } from './initialProducts';
import { HeaderNav } from './components/HeaderNav';
import { ShopView } from './components/ShopView';
import { CartView } from './components/CartView';
import { HomeView } from './components/HomeView';
import { AiRecipeView } from './components/AiRecipeView';
import { DeliveriesView } from './components/DeliveriesView';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { Language, TranslationDictionary, TRANSLATIONS } from './translations';

const CEYLON_DELIVERY_ZONES: DeliveryZone[] = [
  { name: 'București Sector 1 (Nord, Băneasa, Pipera)', coverage: 'Sector 1', fee: 15, eta: '25-35 min' },
  { name: 'București Sector 2 (Colentina, Pantelimon, Tei)', coverage: 'Sector 2', fee: 15, eta: '25-35 min' },
  { name: 'București Sector 3 (Centru Vechi, Titan, Dristor)', coverage: 'Sector 3', fee: 15, eta: '20-30 min' },
  { name: 'București Sector 4 (Berceni, Tineretului)', coverage: 'Sector 4', fee: 15, eta: '30-40 min' },
  { name: 'București Sector 5 (Cotroceni, Rahova)', coverage: 'Sector 5', fee: 15, eta: '30-40 min' },
  { name: 'București Sector 6 (Militari, Drumul Taberei)', coverage: 'Sector 6', fee: 15, eta: '30-40 min' },
  { name: 'Județul Ilfov (Otopeni, Voluntari, Chiajna)', coverage: 'Ilfov Express', fee: 25, eta: '45-60 min' },
  { name: 'Livrare Națională România (Sameday / Fan Courier)', coverage: 'Toată România', fee: 30, eta: '24-48 ore' }
];

export default function ClientWebSupermarket() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const langParam = params?.get('lang');
    if (langParam === 'en' || langParam === 'si' || langParam === 'ro') return langParam;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ceylonfoods_lang') : null;
    if (saved === 'en' || saved === 'si' || saved === 'ro') return saved as Language;
    return 'en'; // English is must as default
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ceylonfoods_lang', lang);
    }
  };

  const t: TranslationDictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('theme') === 'dark') return true;
    if (params?.get('theme') === 'light') return false;
    return typeof window !== 'undefined' && localStorage.getItem('ceylonfoods_theme') === 'dark';
  });

  const [currentPage, setCurrentPage] = useState<'HOME' | 'SHOP' | 'CART' | 'RECIPES' | 'DELIVERIES'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === 'cart') return 'CART';
      if (p === 'recipes') return 'RECIPES';
      if (p === 'home') return 'HOME';
      if (p === 'deliveries' || p === 'orders') return 'DELIVERIES';
    }
    return 'SHOP';
  });

  const [customerOrders, setCustomerOrders] = useState<ClientOrder[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ceylonfoods_client_orders') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'ord-101',
        orderNumber: 'CF-8921',
        placedAt: 'Astăzi • 10:15',
        status: 'PROCESSING',
        items: [
          { productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)', quantity: 1, price: 38.50 },
          { productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)', quantity: 2, price: 14.50 },
          { productTitle: 'Mysore Red Split Lentils / Dhal (1kg)', quantity: 1, price: 12.50 }
        ],
        subtotal: 80.00,
        deliveryFee: 15.00,
        totalAmount: 95.00,
        paymentMethod: 'CASH_ON_DELIVERY',
        paymentStatus: 'PENDING',
        customerName: 'Mihai Enache',
        customerPhone: '+40 722 456 789',
        address: 'Strada Mihai Eminescu nr. 42, Bl. 12, Sc. A, Ap. 14, București Sector 1',
        deliveryZone: 'București Sector 1',
        courierCompany: 'Glovo Express Bucharest',
        courierPhone: '+40 21 9988',
        riderName: 'Andrei Popescu (Glovo Rider)',
        riderPhone: '', // Not verified yet! Client CANNOT call rider!
        riderVerifiedByAdmin: false,
        pickupMinutes: 10,
        deliveryMinutes: 30,
        notes: 'Sunați la interfon 14. Am pregătit 95 lei numerar (Cash on Delivery).'
      },
      {
        id: 'ord-102',
        orderNumber: 'CF-8919',
        placedAt: 'Astăzi • 08:30',
        status: 'ON_THE_WAY',
        items: [
          { productTitle: 'Dilmah Pure Ceylon Single Origin BOPF Tea (400g)', quantity: 2, price: 22.50 },
          { productTitle: 'Woodfired Traditional Roast Paan (1 Loaf)', quantity: 2, price: 7.50 },
          { productTitle: 'Munchee Super Cream Crackers (500g)', quantity: 2, price: 12.00 }
        ],
        subtotal: 84.00,
        deliveryFee: 15.00,
        totalAmount: 99.00,
        paymentMethod: 'CASH_ON_DELIVERY',
        paymentStatus: 'PENDING',
        customerName: 'Mihai Enache',
        customerPhone: '+40 722 456 789',
        address: 'Strada Mihai Eminescu nr. 42, București Sector 1',
        deliveryZone: 'București Sector 1',
        courierCompany: 'Bolt Delivery Riders',
        courierPhone: '+40 31 229 5555',
        riderName: 'Alexandru Radu (Bolt Rider)',
        riderPhone: '+40 731 992 481', // VERIFIED BY ADMIN! Client CAN call!
        riderVerifiedByAdmin: true,
        pickupMinutes: 5,
        deliveryMinutes: 20
      },
      {
        id: 'ord-104',
        orderNumber: 'CF-8918',
        placedAt: 'Ieri • 16:20',
        status: 'DELIVERED',
        items: [
          { productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)', quantity: 2, price: 38.50 },
          { productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)', quantity: 2, price: 14.50 }
        ],
        subtotal: 106.00,
        deliveryFee: 15.00,
        totalAmount: 121.00,
        paymentMethod: 'CASH_ON_DELIVERY',
        paymentStatus: 'PAID',
        customerName: 'Mihai Enache',
        customerPhone: '+40 722 456 789',
        address: 'Strada Liviu Rebreanu nr. 15, București Sector 3',
        courierCompany: 'Glovo Express Bucharest',
        riderName: 'Ion Ionescu',
        riderPhone: '+40 732 441 902',
        riderVerifiedByAdmin: true
      }
    ];
  });

  // Save client orders to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('ceylonfoods_client_orders', JSON.stringify(customerOrders));
  }, [customerOrders]);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['prod-white-rice', 'prod-brinjal']);

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('ceylonfoods_customer_user');
    return saved ? JSON.parse(saved) : {
      id: 'cust-1',
      name: 'Mihai Enache',
      email: 'mihai@example.ro',
      phone: '+40 722 456 789',
      address: 'Strada Mihai Eminescu nr. 42',
      buildingDetails: 'Bloc 12, Scara A, Ap. 14, Interfon 14',
      sectorCity: 'București Sector 1',
      role: 'CUSTOMER'
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cart with Authentic Sri Lankan staples in Lei (Image 2 Theme)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: {
        id: 'prod-white-rice',
        sku: 'RIC-WHITE-001',
        title: 'Araliya Keeri Samba & White Raw Rice (5kg)',
        description: 'Authentic Sri Lankan white raw rice & premium aromatic Keeri Samba in traditional burlap sack.',
        category: 'Staples & Grains',
        brand: 'Araliya Lanka',
        price: 38.50,
        originalPrice: 45.00,
        unit: '5kg Bag',
        unitWeight: '5 kg',
        imageUrl: '/prod_white_rice.jpg', // User uploaded burlap sack of rice!
        stock: 95,
        store: 'Ceylon Foods Supermarket Bucharest',
        status: 'Active',
        aiFreshnessScore: 99,
        isOrganic: true,
        isFarmSourced: true,
        rating: 4.9,
        reviewsCount: 380,
        availableWeights: ['5kg', '10kg'],
        productType: 'Packaged Goods'
      },
      quantity: 1,
      selectedWeight: '5kg',
      effectivePrice: 38.50
    },
    {
      product: {
        id: 'prod-brinjal',
        sku: 'VEG-BRIN-004',
        title: 'Sri Lankan Purple Brinjal / Eggplant (1kg)',
        description: 'Glossy, tender violet eggplants. Essential for classic Wambatu Moju & curries.',
        category: 'Fruits & Veg',
        brand: 'Ceylon Fresh Greens',
        price: 14.50,
        originalPrice: 18.00,
        unit: 'kg',
        unitWeight: '1 kg',
        imageUrl: '/prod_brinjal.jpg',
        stock: 75,
        store: 'Ceylon Foods Supermarket Bucharest',
        status: 'Active',
        aiFreshnessScore: 97,
        isOrganic: true,
        isFarmSourced: true,
        rating: 4.8,
        reviewsCount: 310,
        availableWeights: ['500g', '1kg', '2kg'],
        productType: 'Fresh Produce'
      },
      quantity: 2,
      selectedWeight: '1kg',
      effectivePrice: 14.50
    },
    {
      product: {
        id: 'prod-dhal',
        sku: 'GRN-DHAL-003',
        title: 'Mysore Red Split Lentils / Dhal (1kg)',
        description: 'Premium red split lentils for daily creamy parippu curry.',
        category: 'Staples & Grains',
        brand: 'Ceylon Harvest',
        price: 12.50,
        originalPrice: 15.00,
        unit: 'kg',
        unitWeight: '1 kg',
        imageUrl: '/prod_dhal.jpg',
        stock: 150,
        store: 'Ceylon Foods Supermarket Bucharest',
        status: 'Active',
        aiFreshnessScore: 99,
        isOrganic: true,
        isFarmSourced: true,
        rating: 5.0,
        reviewsCount: 650,
        availableWeights: ['500g', '1kg', '2kg'],
        productType: 'Packaged Goods'
      },
      quantity: 1,
      selectedWeight: '1kg',
      effectivePrice: 12.50
    }
  ]);

  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(CEYLON_DELIVERY_ZONES[0]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; title: string; discount: number; freeDelivery?: boolean } | null>({
    code: 'CEYLON10',
    title: '10% Reducere la prima comandă',
    discount: 8.00
  });
  const [promoError, setPromoError] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>({
    orderNumber: 'CF-8921',
    status: 'PROCESSING',
    totalAmount: 87.00,
    items: ['Araliya Keeri Samba (5kg)', 'Purple Brinjal (2kg)', 'Mysore Dhal (1kg)'],
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    address: 'Strada Mihai Eminescu nr. 42, Bloc 12, Ap. 14, București Sector 1',
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    riderName: 'Ion Popescu (Glovo Rider #4412)',
    paymentMethod: 'CASH_ON_DELIVERY'
  });

  // Fetch live products
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const loadedProducts = data.data.map((p: Product) => ({
            ...p,
            availableWeights: p.unit === 'kg' ? ['500g', '1kg', '2kg'] : undefined,
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

  useEffect(() => {
    localStorage.setItem('ceylonfoods_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculations in Romanian Lei
  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const isFreeDeliveryQualified = subtotal >= 250 || appliedPromo?.freeDelivery === true;
  const effectiveDeliveryFee = isFreeDeliveryQualified ? 0 : selectedZone.fee;
  const promoDiscountAmount = appliedPromo ? appliedPromo.discount : 0;
  const totalAmount = Math.max(0, subtotal + effectiveDeliveryFee - promoDiscountAmount);

  const handleAddToCart = (product: Product, qty: number = 1, weight: string = '1kg') => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const multiplier = weight === '250g' ? 0.25 : weight === '500g' ? 0.5 : weight === '2kg' ? 2 : weight === '5kg' ? 5 : 1;
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

  const handleApplyPromo = (code: string) => {
    setPromoError('');
    const c = code.trim().toUpperCase();
    if (c === 'CEYLON10') {
      const disc = Math.round(subtotal * 0.10);
      setAppliedPromo({ code: 'CEYLON10', title: '10% Reducere la Comandă', discount: disc });
    } else if (c === 'LIVRAREGRATIS') {
      setAppliedPromo({ code: 'LIVRAREGRATIS', title: 'Livrare Gratuită Oferită', discount: selectedZone.fee, freeDelivery: true });
    } else {
      setPromoError('Cupon invalid. Încercați CEYLON10 sau LIVRAREGRATIS');
    }
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // CHECKOUT WITH CASH ON DELIVERY (PLATA LA LIVRARE)
  const handleCheckoutWithCod = async (payload: { address: string; phone: string; note: string; paymentMethod: string }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const orderData = {
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: payload.phone || currentUser.phone,
      address: payload.address,
      deliveryZone: selectedZone.name,
      deliveryFee: effectiveDeliveryFee,
      items: cart.map(c => ({
        productId: c.product.id,
        productTitle: c.product.title,
        quantity: c.quantity,
        price: c.effectivePrice,
        unit: c.selectedWeight || c.product.unit
      })),
      subtotal,
      totalAmount,
      paymentMethod: payload.paymentMethod || 'CASH_ON_DELIVERY',
      paymentStatus: 'PENDING',
      deliveryNote: payload.note,
      status: 'PROCESSING',
      courierCompany: 'Glovo Express Bucharest',
      courierPhone: '+40 21 9988',
      riderName: 'Ion Popescu (Glovo Courier #4412)'
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (data.data) {
        setActiveOrder(data.data);
      }
    } catch {
      setActiveOrder({
        orderNumber: 'CF-' + Math.floor(1000 + Math.random() * 9000),
        status: 'PROCESSING',
        totalAmount,
        paymentMethod: 'CASH_ON_DELIVERY',
        items: cart.map(c => c.product.title),
        customerName: currentUser.name,
        customerPhone: payload.phone,
        address: payload.address,
        courierCompany: 'Glovo Express Bucharest',
        courierPhone: '+40 21 9988',
        riderName: 'Ion Popescu (Glovo Courier #4412)'
      });
    }

    const newPlacedOrder: ClientOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: 'CF-' + Math.floor(1000 + Math.random() * 9000),
      placedAt: 'Astăzi • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PROCESSING',
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
      paymentMethod: payload.paymentMethod || 'CASH_ON_DELIVERY',
      paymentStatus: 'PENDING',
      customerName: currentUser.name,
      customerPhone: payload.phone,
      address: payload.address,
      deliveryZone: selectedZone.name,
      courierCompany: 'Glovo Express Bucharest',
      courierPhone: '+40 21 9988',
      riderName: 'Curier În Curs de Alocare',
      riderPhone: '', // LOCKED UNTIL ADMIN VERIFIES
      riderVerifiedByAdmin: false,
      pickupMinutes: 10,
      deliveryMinutes: 30,
      notes: payload.note
    };

    setCustomerOrders(prev => [newPlacedOrder, ...prev]);
    setActiveOrder(newPlacedOrder);

    setCart([]);
    setIsTrackingModalOpen(true);
  };

  const handleReorder = (order: ClientOrder) => {
    order.items.forEach(it => {
      const title = typeof it === 'string' ? it : it.productTitle;
      const foundProduct = products.find(p => p.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(p.title.toLowerCase()));
      if (foundProduct) {
        const qty = typeof it === 'string' ? 1 : it.quantity;
        handleAddToCart(foundProduct, qty, '1kg');
      }
    });
    setCurrentPage('CART');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0A0D0B] text-white' : 'bg-[#F9FAF9] text-slate-800'} font-sans flex flex-col transition-colors duration-200`}>
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
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        t={t}
        ongoingDeliveriesCount={customerOrders.filter(o => o.status === 'PROCESSING' || o.status === 'ON_THE_WAY' || o.status === 'PENDING').length}
      />

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
            t={t}
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
            onOpenCheckoutModal={handleCheckoutWithCod}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onNavigateHome={() => setCurrentPage('HOME')}
            isDarkMode={isDarkMode}
            t={t}
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
            t={t}
          />
        )}

        {currentPage === 'RECIPES' && (
          <AiRecipeView
            products={products}
            onAddToCart={handleAddToCart}
            isDarkMode={isDarkMode}
          />
        )}

        {currentPage === 'DELIVERIES' && (
          <DeliveriesView
            orders={customerOrders}
            onReorder={handleReorder}
            onNavigateShop={() => setCurrentPage('SHOP')}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}
      </main>

      <Footer
        onNavigatePage={setCurrentPage}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        t={t}
      />

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
        onNavigateDeliveries={() => setCurrentPage('DELIVERIES')}
        isCartDrawerOpen={isCartDrawerOpen}
        onCloseCartDrawer={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={subtotal}
        onNavigateToCartPage={() => setCurrentPage('CART')}
        isDarkMode={isDarkMode}
        t={t}
      />
    </div>
  );
}
