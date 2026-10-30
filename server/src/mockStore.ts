export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description?: string;
  category: string;
  brand: string;
  price: number; // In Romanian Lei (lei / RON)
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
  nutrition?: NutritionInfo;
  createdAt: string;
}

export interface RiderPartner {
  id: string;
  name: string;
  company: string; // e.g., Glovo, Bolt, Sameday, Fan Courier, In-House
  phone: string;
  avatarUrl: string;
  vehicleType: string;
  rating: number;
  currentLocation: {
    lat: number;
    lng: number;
  };
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImageUrl: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  vatAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number; // In Romanian Lei (lei)
  paymentMethod: 'CASH_ON_DELIVERY' | 'CARD_ONLINE' | 'CARD_ON_DELIVERY';
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  deliveryType: 'STANDARD' | 'EXPRESS' | 'SCHEDULED';
  scheduledTimeSlot?: string;
  deliveryAddress: {
    id: string;
    label: string;
    street: string;
    buildingDetails?: string;
    city: string; // e.g. București Sector 1-6 / Ilfov
    coordinates: { lat: number; lng: number };
  };
  deliveryNote?: string;
  status: 'PLACED' | 'PROCESSING' | 'DISPATCHED_TO_COURIER' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  courierCompany?: string; // Glovo, Bolt, Sameday, Fan Courier
  courierPhone?: string;
  dispatchCallStatus?: 'NOT_CALLED' | 'CALLED_DISPATCHED' | 'RIDER_ASSIGNED';
  pickupMinutes?: number;
  deliveryMinutes?: number;
  rider?: RiderPartner;
  estimatedDeliveryMinutes?: number;
  placedAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// AUTHENTIC DAILY SRI LANKAN FOODS FOR ROMANIA SUPERMARKET (PRICES IN LEI / RON)
// ---------------------------------------------------------------------------
export const INITIAL_PRODUCTS: Product[] = [
  // 1. RICE & GRAINS (DAILY STAPLE)
  {
    id: 'prod-white-rice',
    sku: 'RIC-WHITE-001',
    title: 'Araliya Keeri Samba & White Raw Rice (සුදු කැකුළු සහල් - 5kg)',
    description: 'Authentic Sri Lankan white raw rice & premium aromatic Keeri Samba in traditional burlap sack. Fluffy, non-sticky grains essential for daily Sri Lankan rice and curry.',
    category: 'Staples & Grains',
    brand: 'Araliya Lanka',
    price: 38.50,
    originalPrice: 45.00,
    unit: '5kg Bag',
    unitWeight: '5 kg',
    imageUrl: '/prod_white_rice.jpg', // User-uploaded burlap sack of rice
    stock: 95,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 380,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-red-rice',
    sku: 'RIC-RED-002',
    title: 'Araliya Traditional Red Raw Rice (රතු කැකුළු සහල් - 5kg)',
    description: 'Nutritious unpolished Sri Lankan red rice packed with natural fiber, iron, and antioxidants. The favorite wholesome daily grain for authentic village-style meals.',
    category: 'Staples & Grains',
    brand: 'Araliya Lanka',
    price: 39.00,
    originalPrice: 46.00,
    unit: '5kg Bag',
    unitWeight: '5 kg',
    imageUrl: '/prod_red_rice.jpg',
    stock: 80,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 420,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-dhal',
    sku: 'GRN-DHAL-003',
    title: 'Mysore Red Split Lentils / Dhal (රතු පරිප්පු - 1kg)',
    description: 'Premium quick-cooking split red lentils for Sri Lanka’s national daily dish: creamy Parippu Curry with tempered onions, mustard seeds, and coconut milk.',
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
    createdAt: '2026-10-23'
  },

  // 2. FRESH VEGETABLES (DAILY CURRY VEGETABLES)
  {
    id: 'prod-brinjal',
    sku: 'VEG-BRIN-004',
    title: 'Sri Lankan Purple Brinjal / Eggplant (නැවුම් වම්බටු - 1kg)',
    description: 'Glossy, tender violet eggplants sourced fresh. The key ingredient for classic Sri Lankan Wambatu Moju (sweet & sour eggplant pickle) and village curry.',
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
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-okra',
    sku: 'VEG-OKRA-005',
    title: 'Fresh Lady’s Finger / Okra (බණ්ඩක්කා - 500g)',
    description: 'Tender, crisp green okra pods hand-picked at peak freshness. Ideal for traditional Bandakka Theldala (spicy stir fry) or mild coconut milk curry.',
    category: 'Fruits & Veg',
    brand: 'Ceylon Fresh Greens',
    price: 11.00,
    originalPrice: 13.50,
    unit: 'pack',
    unitWeight: '500g',
    imageUrl: '/prod_okra.jpg',
    stock: 60,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.7,
    reviewsCount: 220,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-pumpkin',
    sku: 'VEG-PUMP-006',
    title: 'Fresh Golden Pumpkin (වට්ටක්කා - 1kg)',
    description: 'Rich, sweet yellow pumpkin cubes that melt into a luscious, velvety golden coconut curry. Packed with dietary fiber and natural vitamins.',
    category: 'Fruits & Veg',
    brand: 'Ceylon Fresh Greens',
    price: 8.50,
    originalPrice: 10.50,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800',
    stock: 70,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 190,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-tomato',
    sku: 'VEG-TOMA-007',
    title: 'Roma Red Tomatoes (නැවුම් තක්කාලි - 1kg)',
    description: 'Firm, sun-ripened red tomatoes essential for curry tempering bases, fresh Lunu Miris sambols, and salads.',
    category: 'Fruits & Veg',
    brand: 'Nuwara Eliya Greens',
    price: 9.50,
    originalPrice: 12.00,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: '/prod_tomato.jpg',
    stock: 90,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 310,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-onions',
    sku: 'VEG-SHAL-008',
    title: 'Sri Lankan Red Baby Shallots (කුඩා රතු ළූණු - 500g)',
    description: 'Pungent, sweet small red shallots imported fresh from Sri Lanka. Unmatched aromatic base for authentic Pol Sambol, Seeni Sambol, and curries.',
    category: 'Fruits & Veg',
    brand: 'Ceylon Farm Direct',
    price: 10.50,
    originalPrice: 13.00,
    unit: 'pack',
    unitWeight: '500g',
    imageUrl: '/prod_onions.jpg',
    stock: 85,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 96,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 290,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-chillies',
    sku: 'VEG-CHIL-009',
    title: 'Fresh Green Chillies, Curry Leaves & Pandan (අමු මිරිස් සහ කරපිංචා)',
    description: 'Air-shipped fresh culinary herbs pack: fiery green chillies, aromatic fresh Karapincha (curry leaves), and fragrant Rampe (pandan leaves). Essential for every single meal.',
    category: 'Fruits & Veg',
    brand: 'Ceylon Fresh Greens',
    price: 9.50,
    originalPrice: 12.00,
    unit: 'pack',
    unitWeight: '250g',
    imageUrl: '/prod_chillies.jpg',
    stock: 120,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 5.0,
    reviewsCount: 480,
    createdAt: '2026-10-25'
  },

  // 3. CEYLON SPICES & COCONUT (HEART OF SRI LANKAN COOKING)
  {
    id: 'prod-spices',
    sku: 'SPI-ROAST-010',
    title: 'Roasted Ceylon Curry Powder & Spices (ලංකා බැදපු තුනපහ - 250g)',
    description: 'Signature Sri Lankan roasted black curry powder ground with roasted coriander, cumin, fennel, cinnamon, and curry leaves. Gives authentic dark color and rich aroma to meat & fish curries.',
    category: 'Pantry',
    brand: 'Araliya Spices',
    price: 16.00,
    originalPrice: 19.50,
    unit: 'pack',
    unitWeight: '250g',
    imageUrl: '/prod_spices.jpg',
    stock: 110,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 5.0,
    reviewsCount: 520,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-cinnamon',
    sku: 'SPI-CINN-011',
    title: 'Pure Ceylon Alba Cinnamon Quills & Black Pepper (කුරුඳු සහ ගම්මිරිස්)',
    description: '100% Genuine Ceylon True Cinnamon (Cinnamomum verum) and pungent whole Ceylon black peppercorns from Matale hills.',
    category: 'Pantry',
    brand: 'Pure Ceylon Spices',
    price: 18.00,
    originalPrice: 22.00,
    unit: 'glass jar',
    unitWeight: '100g',
    imageUrl: '/prod_cinnamon.jpg',
    stock: 80,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 340,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-coconut',
    sku: 'PAN-COCO-012',
    title: 'Pure Ceylon Coconut Milk & Grated Pol (පොල් කිරි සහ පොල් - 400ml)',
    description: 'Silky, rich, preservative-free coconut milk extracted from mature Sri Lankan coconuts. The irreplaceable backbone of all curries and hoppers.',
    category: 'Pantry',
    brand: 'Maggi Lanka',
    price: 8.50,
    originalPrice: 11.00,
    unit: 'can',
    unitWeight: '400 ml',
    imageUrl: '/prod_coconut.jpg',
    stock: 180,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 710,
    createdAt: '2026-10-24'
  },

  // 4. TROPICAL FRUITS
  {
    id: 'prod-papaya',
    sku: 'FRU-PAPA-013',
    title: 'Ceylon Red Lady Sweet Papaya (පැණි ගස්ලබු - 1kg)',
    description: 'Sweet, golden-red flesh tropical papaya ripened under the tropical sun. Luscious healthy breakfast treat with lime juice.',
    category: 'Fruits & Veg',
    brand: 'Ceylon Orchard',
    price: 16.50,
    originalPrice: 19.00,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: '/prod_papaya.jpg',
    stock: 45,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 160,
    createdAt: '2026-10-25'
  },
  {
    id: 'prod-mango',
    sku: 'FRU-MANG-014',
    title: 'Karthakolomban Sweet Mangoes (කාර්තකොලොම්බන් අඹ - 1kg)',
    description: 'Sri Lanka’s most prized sweet mango variety with rich floral perfume and silky non-fibrous pulp.',
    category: 'Fruits & Veg',
    brand: 'Jaffna Harvest',
    price: 19.50,
    originalPrice: 24.00,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: '/prod_mango.jpg',
    stock: 50,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 280,
    createdAt: '2026-10-25'
  },

  // 5. CEYLON TEA, BAKERY & SNACKS
  {
    id: 'prod-tea',
    sku: 'BEV-TEA-015',
    title: 'Dilmah Pure Ceylon Single Origin BOPF Black Tea (දිල්මා ලංකා තේ - 400g)',
    description: 'World-renowned 100% pure Ceylon single-origin tea from the central misty highlands. Bold, bright, rich liquor perfect for daily morning milk tea.',
    category: 'Beverages',
    brand: 'Dilmah',
    price: 22.50,
    originalPrice: 26.00,
    unit: 'pack',
    unitWeight: '400g',
    imageUrl: '/prod_tea.jpg',
    stock: 140,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 100,
    isOrganic: true,
    isFarmSourced: true,
    rating: 5.0,
    reviewsCount: 940,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-biscuits',
    sku: 'SNK-BISC-016',
    title: 'Munchee Super Cream Crackers & Maliban Biscuits (500g)',
    description: 'The iconic afternoon tea snack of Sri Lanka: crispy golden Cream Crackers and tangy Maliban Lemon Puff.',
    category: 'Snacks',
    brand: 'Munchee / Maliban',
    price: 12.00,
    originalPrice: 14.50,
    unit: 'pack',
    unitWeight: '500g',
    imageUrl: '/prod_biscuits.jpg',
    stock: 110,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 510,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-roast-paan',
    sku: 'BAK-ROAS-017',
    title: 'Traditional Woodfired Roast Paan (රෝස් පාන් - 1 Loaf)',
    description: 'Baked fresh daily in Bucharest: flat, crusty, golden woodfired loaves made with traditional Sri Lankan baking technique. Made to be dipped in hot pol sambol & parippu.',
    category: 'Bakery',
    brand: 'Ceylon Bakery Bucharest',
    price: 7.50,
    originalPrice: 9.00,
    unit: 'loaf',
    unitWeight: '450g',
    imageUrl: '/prod_roast_paan.jpg',
    stock: 65,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: 'Active',
    aiFreshnessScore: 100,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 380,
    createdAt: '2026-10-25'
  }
];

export const INITIAL_RIDER: RiderPartner = {
  id: 'rider-glovo-1',
  name: 'Andrei Popescu',
  company: 'Glovo Express Bucharest',
  phone: '+40 721 892 411',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  vehicleType: 'Electric Scooter (Glovo)',
  rating: 4.92,
  currentLocation: { lat: 44.4361, lng: 26.1027 } // Bucharest City Center
};

export interface FleetRider {
  id: string;
  name: string;
  phone: string;
  company: string; // Glovo, Bolt, Sameday, Fan Courier, Store In-House
  vehicleType: string;
  plateNumber: string;
  avatarUrl: string;
  status: 'AVAILABLE' | 'DELIVERING' | 'OFF_DUTY';
  currentOrderId?: string;
  completedDeliveries: number;
  rating: number;
  zone: string;
}

export const INITIAL_FLEET_RIDERS: FleetRider[] = [
  {
    id: 'rider-1',
    name: 'Andrei Popescu',
    phone: '+40 721 892 411',
    company: 'Glovo Express Bucharest',
    vehicleType: 'Electric Scooter',
    plateNumber: 'B-102-GLV',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'DELIVERING',
    currentOrderId: 'CF-8921',
    completedDeliveries: 412,
    rating: 4.92,
    zone: 'Sector 1 & 2 (București Nord)'
  },
  {
    id: 'rider-2',
    name: 'Ion Ionescu',
    phone: '+40 732 441 902',
    company: 'Bolt Delivery Riders',
    vehicleType: 'Yamaha 125cc Scooter',
    plateNumber: 'B-88-BLT',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 380,
    rating: 4.88,
    zone: 'Sector 3 & 4 (București Centru-Sud)'
  },
  {
    id: 'rider-3',
    name: 'Mihai Radu',
    phone: '+40 745 612 883',
    company: 'Sameday 2H Bucharest',
    vehicleType: 'Delivery Van (Chilled)',
    plateNumber: 'B-340-SMD',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 620,
    rating: 4.95,
    zone: 'Sector 5, 6 & Ilfov'
  },
  {
    id: 'rider-4',
    name: 'Rajitha Perera',
    phone: '+40 720 334 119',
    company: 'Ceylon Foods In-House Courier',
    vehicleType: 'Honda PCX 150',
    plateNumber: 'B-99-CEY',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 285,
    rating: 4.96,
    zone: 'All Sectors Express COD'
  }
];

export const INITIAL_ADMIN_STATS = {
  totalRevenue: 34850.00, // In lei
  totalOrders: 1420,
  activeProducts: 17,
  totalCustomers: 890,
  todayRevenue: 2840.00,
  todayOrders: 42,
  pendingDeliveries: 7,
  availableBalance: 18450.00
};

export interface PromotionCoupon {
  id: string;
  name: string;
  code: string;
  offer: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'FREE_DELIVERY';
  discountValue: number;
  dates: string;
  usage: string;
  currentUsage: number;
  maxUsage: number;
  minBasket: string;
  minBasketValue: number;
  status: 'Active' | 'Scheduled' | 'Expired' | 'Paused';
}

export const INITIAL_PROMOTIONS: PromotionCoupon[] = [
  {
    id: 'promo-1',
    name: 'Welcome to Ceylon Foods Romania',
    code: 'CEYLON10',
    offer: '10% OFF any order over 100 lei',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    dates: '01 Nov – 30 Nov 2026',
    usage: '68 / 500',
    currentUsage: 68,
    maxUsage: 500,
    minBasket: '100 lei',
    minBasketValue: 100,
    status: 'Active'
  },
  {
    id: 'promo-2',
    name: 'Free Courier Delivery Bucharest',
    code: 'LIVRAREGRATIS',
    offer: 'Free Courier Delivery over 150 lei',
    discountType: 'FREE_DELIVERY',
    discountValue: 15,
    dates: 'Always Active',
    usage: '142 / 1000',
    currentUsage: 142,
    maxUsage: 1000,
    minBasket: '150 lei',
    minBasketValue: 150,
    status: 'Active'
  }
];

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  lastOrder: string;
  status: 'Active' | 'VIP' | 'Blocked';
  joinedDate: string;
  city: string;
}

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-1',
    name: 'Mihai Enache',
    email: 'mihai.enache@gmail.com',
    phone: '+40 722 456 789',
    ordersCount: 8,
    totalSpent: '645.50 lei',
    lastOrder: 'Today, 10:15',
    status: 'VIP',
    joinedDate: '15 Sep 2026',
    city: 'București Sector 1'
  },
  {
    id: 'cust-2',
    name: 'Sandun Jayasuriya',
    email: 'sandun.j@yahoo.com',
    phone: '+40 740 112 345',
    ordersCount: 14,
    totalSpent: '1,420.00 lei',
    lastOrder: 'Yesterday',
    status: 'VIP',
    joinedDate: '02 Aug 2026',
    city: 'București Sector 2'
  },
  {
    id: 'cust-3',
    name: 'Elena Dumitrescu',
    email: 'elena.d@outlook.com',
    phone: '+40 735 998 123',
    ordersCount: 4,
    totalSpent: '310.00 lei',
    lastOrder: '28 Oct 2026',
    status: 'Active',
    joinedDate: '10 Oct 2026',
    city: 'București Sector 3'
  }
];
