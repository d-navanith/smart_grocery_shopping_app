import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Product, CartItem, CustomerUser, DeliveryZone, ClientOrder } from './types';
import { INITIAL_PRODUCTS } from './initialProducts';
import { AppPage, HeaderNav } from './components/HeaderNav';
import { ShopView } from './components/ShopView';
import { CartView } from './components/CartView';
import { HomeView } from './components/HomeView';
import { AiRecipeView } from './components/AiRecipeView';
import { DeliveriesView } from './components/DeliveriesView';
import { WishlistView } from './components/WishlistView';
import { CheckoutView } from './components/CheckoutView';
import { OrderCompletedView } from './components/OrderCompletedView';
import { TrackOrderView } from './components/TrackOrderView';
import { AccountView } from './components/AccountView';
import { AboutUsView } from './components/AboutUsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { Modals, PopupNotification } from './components/Modals';
import { SplashScreen } from './components/SplashScreen';
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

  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === 'cart') return 'CART';
      if (p === 'recipes') return 'RECIPES';
      if (p === 'home') return 'HOME';
      if (p === 'deliveries' || p === 'orders') return 'DELIVERIES';
      if (p === 'wishlist') return 'WISHLIST';
      if (p === 'checkout') return 'CHECKOUT';
      if (p === 'completed') return 'ORDER_COMPLETED';
      if (p === 'track' || p === 'track-order') return 'TRACK_ORDER';
      if (p === 'account') return 'ACCOUNT';
      if (p === 'about' || p === 'about-us') return 'ABOUT_US';
      if (p === 'contact' || p === 'contact-us') return 'CONTACT';
      if (p === 'shop') return 'SHOP';
    }
    return 'HOME';
  });

  const [lastCompletedOrder, setLastCompletedOrder] = useState<ClientOrder | null>(null);
  const [initialTrackNumber, setInitialTrackNumber] = useState<string>('');

  const [customerOrders, setCustomerOrders] = useState<ClientOrder[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ceylonfoods_client_orders') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // Save client orders to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('ceylonfoods_client_orders', JSON.stringify(customerOrders));
  }, [customerOrders]);

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('ceylonfoods_customer_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Automatically restrict unauthenticated visitors from accessing internal order/account views
  useEffect(() => {
    if (!currentUser && (currentPage === 'DELIVERIES' || currentPage === 'TRACK_ORDER' || currentPage === 'ACCOUNT')) {
      setCurrentPage('HOME');
      setIsAuthModalOpen(true);
    }
  }, [currentUser, currentPage]);

  // Authenticated user's orders (EMPTY for unauthenticated guests)
  const userOrders = currentUser
    ? customerOrders.filter(
        o =>
          (currentUser.id && o.customerId === currentUser.id) ||
          (currentUser.email && o.customerEmail === currentUser.email) ||
          (currentUser.phone && o.customerPhone === currentUser.phone) ||
          (currentUser.name && o.customerName === currentUser.name)
      )
    : [];

  const ongoingDeliveriesCount = currentUser
    ? userOrders.filter(
        o => o.status === 'PROCESSING' || o.status === 'ON_THE_WAY' || o.status === 'PENDING'
      ).length
    : 0;

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const cat = p.get('category') || p.get('cat');
      if (cat) return cat;
    }
    return 'All';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('ceylonfoods_clean_v1')) {
        localStorage.removeItem('ceylonfoods_wishlist');
        localStorage.removeItem('ceylonfoods_cart');
        localStorage.setItem('ceylonfoods_clean_v1', 'true');
        return [];
      }
      const saved = localStorage.getItem('ceylonfoods_wishlist');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ceylonfoods_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dynamic SEO Title, Description, Canonical & Social Graph Management for Search Engines
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let pageTitle = 'Ceylon Foods — Sri Lanka Online Supermarket Romania | Authentic Groceries & Spices';
    let metaDesc = 'Authentic Sri Lankan grocery shopping in Romania. Buy Wijaya & Hiruni curry powders, Araliya Keeri Samba rice, red raw rice, Maldive fish, Ceylon spices, Maliban biscuits, and traditional kitchenware in Bucharest & Ilfov with Cash on Delivery.';
    let canonicalQuery = '';

    if (currentPage === 'SHOP') {
      if (selectedCategory && selectedCategory !== 'All') {
        const catName =
          selectedCategory === 'Staples & Grains'
            ? 'Rice & Grains'
            : selectedCategory === 'Vegetables'
            ? 'Fresh Ceylon Vegetables'
            : selectedCategory === 'Fruits'
            ? 'Tropical Ceylon Fruits'
            : selectedCategory === 'Pantry'
            ? 'Ceylon Spices & Curry Powders'
            : selectedCategory;
        pageTitle = `${catName} | Buy Online in Romania — Ceylon Foods`;
        metaDesc = `Buy authentic Sri Lankan ${catName.toLowerCase()} in Bucharest & Romania. Fresh imports, direct island sourcing, and cash on delivery.`;
        canonicalQuery = `?page=shop&category=${encodeURIComponent(selectedCategory)}`;
      } else {
        pageTitle = 'Shop Sri Lankan Groceries, Rice & Ceylon Spices | Ceylon Foods Romania';
        metaDesc = 'Browse authentic Araliya Keeri Samba rice, red raw rice, Ceylon spices, curry powders, coconut milk, and fresh vegetables in Bucharest. Fast door delivery.';
        canonicalQuery = '?page=shop';
      }
    } else if (currentPage === 'ABOUT_US') {
      pageTitle = 'About Us — Bringing Authentic Taste of Sri Lanka to Romania | Ceylon Foods';
      metaDesc = 'Discover Ceylon Foods Supermarket Romania. Direct sourcing from Colombo, Jaffna, Kandy & Galle. 100% genuine Ceylon staples, heirloom rice, and spices in Bucharest.';
      canonicalQuery = '?page=about-us';
    } else if (currentPage === 'CONTACT') {
      pageTitle = 'Contact Ceylon Foods Supermarket Bucharest | Hotline +40 722 456 789';
      metaDesc = 'Visit our Bucharest distribution store at Strada Mihai Eminescu nr. 42 or contact our customer support team for orders, inquiries, and wholesale.';
      canonicalQuery = '?page=contact';
    } else if (currentPage === 'TRACK_ORDER') {
      pageTitle = 'Track Your Grocery Delivery in Real-Time | Ceylon Foods Romania';
      metaDesc = 'Live 4-stage GPS fulfillment tracking for your Ceylon Foods grocery delivery across Bucharest and Romania.';
      canonicalQuery = '?page=track';
    } else if (currentPage === 'RECIPES') {
      pageTitle = 'Authentic Sri Lankan AI Recipes & Cooking Bundles | Ceylon Foods';
      metaDesc = 'Explore traditional Sri Lankan recipes with instant 1-click grocery cart bundling. Keeri Samba, Parippu, Pol Sambol, and Ceylon curries.';
      canonicalQuery = '?page=recipes';
    }

    document.title = pageTitle;

    const descElem = document.querySelector('meta[name="description"]');
    if (descElem) descElem.setAttribute('content', metaDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDesc);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', metaDesc);

    const canonicalElem = document.querySelector('link[rel="canonical"]');
    if (canonicalElem) {
      canonicalElem.setAttribute('href', `https://ceylonfoods.runasp.net/${canonicalQuery}`);
    }

    // Reflect clean deep link in browser address bar without reload
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const newUrl = canonicalQuery ? `${window.location.pathname}${canonicalQuery}` : window.location.pathname;
      window.history.replaceState({ page: currentPage, category: selectedCategory }, pageTitle, newUrl);
    }
  }, [currentPage, selectedCategory, currentLanguage]);

  // Clean Cart — Empty for fresh visitor, persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ceylonfoods_cart');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ceylonfoods_cart', JSON.stringify(cart));
  }, [cart]);

  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(CEYLON_DELIVERY_ZONES[0]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; title: string; discount: number; freeDelivery?: boolean } | null>(null);
  const [promoError, setPromoError] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('splash') === 'true') return true;
      if (p.get('splash') === 'false') return false;
      return !sessionStorage.getItem('ceylonfoods_splash_dismissed');
    }
    return false;
  });

  const handleEnterStoreFromSplash = (selectedSector?: string) => {
    setShowSplash(false);
    sessionStorage.setItem('ceylonfoods_splash_dismissed', 'true');
    if (selectedSector) {
      localStorage.setItem('ceylonfoods_selected_sector', selectedSector);
    }
  };

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState<PopupNotification | null>(null);

  const showPopupMessage = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = String(Date.now());
    setPopupMessage({ id, title, message, type, actionLabel, onAction });
    setTimeout(() => {
      setPopupMessage(prev => (prev?.id === id ? null : prev));
    }, 4000);
  };
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

    showPopupMessage(
      'Added to Cart',
      `${qty}x ${product.title} (${weight}) added to your basket.`,
      'success',
      'View Cart',
      () => setCurrentPage('CART')
    );
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
    const prod = products.find(p => p.id === productId);
    const alreadyIn = wishlist.includes(productId);
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    showPopupMessage(
      alreadyIn ? 'Removed from Wishlist' : 'Saved to Wishlist',
      alreadyIn
        ? `${prod?.title || 'Item'} was removed from your saved list.`
        : `${prod?.title || 'Item'} was added to your wishlist.`,
      'info',
      'Open Wishlist',
      () => setCurrentPage('WISHLIST')
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
    setLastCompletedOrder(newPlacedOrder);

    setCart([]);
    setCurrentPage('ORDER_COMPLETED');
  };

  const handleConfirmParcelReceived = (orderIdOrNumber: string) => {
    setCustomerOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderIdOrNumber || ord.orderNumber === orderIdOrNumber) {
          return {
            ...ord,
            status: 'DELIVERED',
            paymentStatus: 'PAID'
          };
        }
        return ord;
      })
    );

    setActiveOrder((prev: any) => {
      if (prev && (prev.id === orderIdOrNumber || prev.orderNumber === orderIdOrNumber)) {
        return {
          ...prev,
          status: 'DELIVERED',
          paymentStatus: 'PAID'
        };
      }
      return prev;
    });

    // Notify backend if API is live
    fetch(`/api/orders/${orderIdOrNumber}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'DELIVERED', paymentStatus: 'PAID' })
    }).catch(() => {});

    showPopupMessage(
      t.confirmParcelSuccessTitle,
      t.confirmParcelSuccessDesc,
      'success'
    );
  };

  const handleConfirmCallReceived = (orderIdOrNumber: string) => {
    setCustomerOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderIdOrNumber || ord.orderNumber === orderIdOrNumber) {
          return {
            ...ord,
            status: 'ON_THE_WAY',
            callConfirmed: true
          };
        }
        return ord;
      })
    );

    setActiveOrder((prev: any) => {
      if (prev && (prev.id === orderIdOrNumber || prev.orderNumber === orderIdOrNumber)) {
        return {
          ...prev,
          status: 'ON_THE_WAY',
          callConfirmed: true
        };
      }
      return prev;
    });

    fetch(`/api/orders/${orderIdOrNumber}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ON_THE_WAY' })
    }).catch(() => {});

    showPopupMessage(
      'Admin Call Confirmed',
      'Thank you! Your order is now On the Way with our delivery courier.',
      'success'
    );
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

  const handleMoveAllWishlistToCart = () => {
    wishlist.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (prod) {
        handleAddToCart(prod, 1, '1kg');
      }
    });
    setWishlist([]);
    setCurrentPage('CART');
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  const handleUpdateUser = (updated: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const merged = { ...currentUser, ...updated };
    setCurrentUser(merged);
    localStorage.setItem('ceylonfoods_customer_user', JSON.stringify(merged));
  };

  return (
    <div className={`min-h-screen overflow-x-hidden max-w-full ${showSplash ? 'h-screen overflow-hidden' : ''} ${isDarkMode ? 'dark bg-[#0A0D0B] text-white' : 'bg-white text-slate-900'} font-sans flex flex-col transition-colors duration-200`}>
      <HeaderNav
        currentPage={currentPage}
        setCurrentPage={(page) => {
          if (!currentUser && (page === 'DELIVERIES' || page === 'TRACK_ORDER' || page === 'ACCOUNT')) {
            setIsAuthModalOpen(true);
            return;
          }
          setCurrentPage(page);
        }}
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
        ongoingDeliveriesCount={ongoingDeliveriesCount}
      />

      <main className="flex-1 flex flex-col">
        <div key={currentPage} className="animate-fade-in-up flex-1 flex flex-col">
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
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenCheckoutModal={(payload) => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
                return;
              }
              handleCheckoutWithCod(payload);
            }}
            onNavigateCheckout={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
                return;
              }
              setCurrentPage('CHECKOUT');
            }}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onNavigateHome={() => setCurrentPage('HOME')}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}

        {currentPage === 'CHECKOUT' && (
          <CheckoutView
            cart={cart}
            subtotal={subtotal}
            totalAmount={totalAmount}
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
            deliveryZones={CEYLON_DELIVERY_ZONES}
            effectiveDeliveryFee={effectiveDeliveryFee}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={() => setAppliedPromo(null)}
            promoError={promoError}
            currentUser={currentUser}
            onSubmitOrder={handleCheckoutWithCod}
            onNavigateCart={() => setCurrentPage('CART')}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onNavigateHome={() => setCurrentPage('HOME')}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}

        {currentPage === 'ORDER_COMPLETED' && (
          <OrderCompletedView
            order={lastCompletedOrder || customerOrders[0]}
            onNavigateTrackOrder={(orderNumber) => {
              setInitialTrackNumber(orderNumber);
              setCurrentPage('TRACK_ORDER');
            }}
            onNavigateDeliveries={() => setCurrentPage('DELIVERIES')}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onOpenInvoiceModal={(ord) => {
              setActiveOrder(ord);
              setIsTrackingModalOpen(true);
            }}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}

        {currentPage === 'WISHLIST' && (
          <WishlistView
            wishlistIds={wishlist}
            products={products}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onMoveAllToCart={handleMoveAllWishlistToCart}
            onClearWishlist={handleClearWishlist}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onNavigateHome={() => setCurrentPage('HOME')}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}

        {currentPage === 'TRACK_ORDER' && (
          !currentUser ? (
            <div className="w-full flex-1 bg-white dark:bg-[#0D1210] py-16 px-4">
              <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#F0FAF3] dark:bg-[#141C18] border-2 border-[#15875D] shadow-xl text-center space-y-4 animate-modal-pop">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-[#0E2E20] border-2 border-[#0A6847] flex items-center justify-center mx-auto text-[#0A6847]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#003D25] dark:text-white">Sign In Required</h3>
                <p className="text-xs text-[#1B8057] dark:text-zinc-300 leading-relaxed">
                  Please sign in to your customer account to track your orders and view real-time delivery status.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#0A6847] hover:bg-[#075238] text-white font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            </div>
          ) : (
            <TrackOrderView
              orders={userOrders}
              initialOrderNumber={initialTrackNumber}
              onConfirmReceived={handleConfirmParcelReceived}
              onConfirmCallReceived={handleConfirmCallReceived}
              onNavigateDeliveries={() => setCurrentPage('DELIVERIES')}
              onNavigateShop={() => setCurrentPage('SHOP')}
              onNavigateHome={() => setCurrentPage('HOME')}
              isDarkMode={isDarkMode}
              t={t}
            />
          )
        )}

        {currentPage === 'ACCOUNT' && (
          <AccountView
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onNavigateDeliveries={() => setCurrentPage('DELIVERIES')}
            onNavigateShop={() => setCurrentPage('SHOP')}
            onLogout={() => {
              setCurrentUser(null);
              localStorage.removeItem('ceylonfoods_customer_user');
            }}
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
          !currentUser ? (
            <div className="w-full flex-1 bg-white dark:bg-[#0D1210] py-16 px-4">
              <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#F0FAF3] dark:bg-[#141C18] border-2 border-[#15875D] shadow-xl text-center space-y-4 animate-modal-pop">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-[#0E2E20] border-2 border-[#0A6847] flex items-center justify-center mx-auto text-[#0A6847]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#003D25] dark:text-white">Sign In Required</h3>
                <p className="text-xs text-[#1B8057] dark:text-zinc-300 leading-relaxed">
                  Please sign in to view your ongoing deliveries and past order history.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#0A6847] hover:bg-[#075238] text-white font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            </div>
          ) : (
            <DeliveriesView
              orders={userOrders}
              onReorder={handleReorder}
              onConfirmReceived={handleConfirmParcelReceived}
              onConfirmCallReceived={handleConfirmCallReceived}
              onNavigateShop={() => setCurrentPage('SHOP')}
              onNavigateHome={() => setCurrentPage('HOME')}
              isDarkMode={isDarkMode}
              t={t}
            />
          )
        )}
        {currentPage === 'ABOUT_US' && (
          <AboutUsView
            onNavigatePage={(p) => setCurrentPage(p)}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}

        {currentPage === 'CONTACT' && (
          <ContactView
            onNavigatePage={(p) => setCurrentPage(p)}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}
        </div>
      </main>

      <Footer
        onNavigatePage={setCurrentPage}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenSplash={() => setShowSplash(true)}
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
        onConfirmReceived={handleConfirmParcelReceived}
        onNavigateDeliveries={() => setCurrentPage('DELIVERIES')}
        isCartDrawerOpen={isCartDrawerOpen}
        onCloseCartDrawer={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={subtotal}
        onNavigateToCartPage={() => setCurrentPage('CART')}
        popupMessage={popupMessage}
        onClosePopupMessage={() => setPopupMessage(null)}
        isDarkMode={isDarkMode}
        t={t}
      />

      {/* Keells Super-Style Welcome & Location Splash Screen */}
      {showSplash && (
        <SplashScreen
          onEnterStore={handleEnterStoreFromSplash}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
