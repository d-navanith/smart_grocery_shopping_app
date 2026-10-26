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
  nutrition?: NutritionInfo;
  createdAt: string;
}

export interface RiderPartner {
  id: string;
  name: string;
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
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  vatAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  deliveryType: 'STANDARD' | 'EXPRESS' | 'SCHEDULED';
  scheduledTimeSlot?: string;
  deliveryAddress: {
    id: string;
    label: string;
    street: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  deliveryNote?: string;
  status: 'PLACED' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  rider?: RiderPartner;
  estimatedDeliveryMinutes?: number;
  placedAt: string;
  updatedAt: string;
}

// Full-scale realistic supermarket inventory across all 8 aisles tailored for Sri Lanka
export const INITIAL_PRODUCTS: Product[] = [
  // 1. FRESH PRODUCE (FRUITS & VEGETABLES)
  {
    id: 'prod-1',
    sku: 'VEG-PUMP-001',
    title: 'Dambulla Fresh Yellow Pumpkin (වට්ටක්කා)',
    description: 'High in vitamins A & C, fiber and potassium. Farm-sourced fresh pumpkin from Dambulla economic center.',
    category: 'Fruits & Veg',
    brand: 'Dambulla Agro Farms',
    price: 380,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800',
    stock: 75,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 310,
    createdAt: '2026-10-20'
  },
  {
    id: 'prod-2',
    sku: 'FRU-AVOC-002',
    title: 'Avocado Hass Creamy (අලිගැටපේර)',
    description: 'Creamy high-altitude avocados from Kandy hills, loaded with healthy monounsaturated fats.',
    category: 'Fruits & Veg',
    brand: 'Kandy Highlands',
    price: 420,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
    stock: 54,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 96,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.7,
    reviewsCount: 520,
    createdAt: '2026-10-21'
  },
  {
    id: 'prod-3',
    sku: 'VEG-TOMA-003',
    title: 'Vine Cherry Tomatoes (තක්කාලි)',
    description: 'Sweet, juicy vine-ripened red tomatoes from Nuwara Eliya, ideal for curries, salads and fresh lunu miris.',
    category: 'Fruits & Veg',
    brand: 'Nuwara Eliya Greens',
    price: 290,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800',
    stock: 65,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 410,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-4',
    sku: 'FRU-BANA-004',
    title: 'Sweet Embul & Cavendish Bananas (කෙසෙල්)',
    description: 'Naturally sweetened sweet bananas packed with potassium, harvested directly from Kurunegala plantations.',
    category: 'Fruits & Veg',
    brand: 'SunValley Lanka',
    price: 320,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
    stock: 90,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: false,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 680,
    createdAt: '2026-10-22'
  },

  // 2. DAIRY & EGGS
  {
    id: 'prod-5',
    sku: 'DAI-MILK-005',
    title: 'Highland Fresh Full Cream Milk (1L)',
    description: '100% pure fresh Sri Lankan cow milk, pasteurised and homogenised from the cool Ambewela pastures.',
    category: 'Dairy & Eggs',
    brand: 'Highland Pure',
    price: 480,
    unit: 'liter',
    unitWeight: '1 L',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    stock: 120,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 940,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-6',
    sku: 'DAI-EGGS-006',
    title: 'Farm Fresh Brown Eggs (Pack of 12)',
    description: 'Grade-A fresh farm eggs from free-range hens, high in clean natural protein.',
    category: 'Dairy & Eggs',
    brand: 'Bairaha Happy Hen',
    price: 650,
    unit: 'pack',
    unitWeight: '12 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800',
    stock: 80,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 610,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-7',
    sku: 'DAI-CHSE-007',
    title: 'Kotmale Natural Cheddar Cheese Block (250g)',
    description: 'Aged sharp Sri Lankan cheddar cheese made from whole cow milk. Ideal for snacks, sandwiches and melting.',
    category: 'Dairy & Eggs',
    brand: 'Kotmale Pure Dairy',
    price: 890,
    unit: 'piece',
    unitWeight: '250 g',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800',
    stock: 45,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 95,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.7,
    reviewsCount: 380,
    createdAt: '2026-10-23'
  },

  // 3. BAKERY & BREAD
  {
    id: 'prod-8',
    sku: 'BAK-BRED-008',
    title: 'Traditional Crispy Roast Paan (රෝස්ට් පාන් - 4 Slices)',
    description: 'Authentic woodfired Sri Lankan crispy roast paan with golden crunch. Best enjoyed with spicy pol sambol.',
    category: 'Bakery',
    brand: 'Ceylon Heritage Bakery',
    price: 180,
    unit: 'pack',
    unitWeight: '4 slices',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    stock: 40,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: false,
    rating: 4.9,
    reviewsCount: 290,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-9',
    sku: 'BAK-CROI-009',
    title: 'Butter French Croissants (Pack of 4)',
    description: 'Flaky, buttery Viennoiserie baked fresh every morning with pure creamy churned butter.',
    category: 'Bakery',
    brand: 'Golden Crust Bakers',
    price: 680,
    unit: 'pack',
    unitWeight: '4 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    stock: 35,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 420,
    createdAt: '2026-10-24'
  },

  // 4. MEAT & SEAFOOD
  {
    id: 'prod-10',
    sku: 'MEA-CHIK-010',
    title: 'Bairaha Skinless Chicken Breast Fillets (1kg)',
    description: 'Tender, lean boneless chicken breast fillets from farm-raised Sri Lankan poultry without hormones.',
    category: 'Meat & Seafood',
    brand: 'Bairaha Prime Cuts',
    price: 1750,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    stock: 55,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 710,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-11',
    sku: 'MEA-FISH-011',
    title: 'Fresh Kelawalla Yellowfin Tuna Steaks (කෙලවල්ලා - 500g)',
    description: 'Deep ocean catch Yellowfin Tuna steaks fresh from Mirissa and Beruwala harbours. Rich in Omega-3.',
    category: 'Meat & Seafood',
    brand: 'Mirissa Harbour Catch',
    price: 1450,
    unit: 'piece',
    unitWeight: '500 g',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
    stock: 30,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.9,
    reviewsCount: 340,
    createdAt: '2026-10-24'
  },

  // 5. STAPLES & GRAINS (FOOD CUPBOARD)
  {
    id: 'prod-12',
    sku: 'STP-RICE-012',
    title: 'Araliya Premium Keeri Samba Rice (කීරි සම්බා - 5kg)',
    description: 'Fragrant, small pearl-grain aged Keeri Samba rice, known as the king of Sri Lankan rice tables.',
    category: 'Staples & Grains',
    brand: 'Araliya Sahal',
    price: 1680,
    unit: 'pack',
    unitWeight: '5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    stock: 150,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.9,
    reviewsCount: 1200,
    createdAt: '2026-10-20'
  },
  {
    id: 'prod-13',
    sku: 'STP-COCO-013',
    title: 'Pure Virgin Coconut Oil (500ml Glass Bottle)',
    description: 'Cold-pressed virgin coconut oil made from handpicked Sri Lankan coconuts. Ideal for aromatic curries and health.',
    category: 'Staples & Grains',
    brand: 'Natureland Organics',
    price: 980,
    unit: 'piece',
    unitWeight: '500 ml',
    imageUrl: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800',
    stock: 90,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 480,
    createdAt: '2026-10-21'
  },
  {
    id: 'prod-14',
    sku: 'STP-DHAL-014',
    title: 'Mysore Red Dhal / Parippu (රතු පරිප්පු - 1kg)',
    description: 'Premium sorted Mysore red lentils. Cooks into a rich, creamy dhal curry when tempered with coconut milk.',
    category: 'Staples & Grains',
    brand: 'Ceylon Harvest',
    price: 390,
    unit: 'piece',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281059?w=800',
    stock: 110,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 650,
    createdAt: '2026-10-21'
  },

  // 6. BEVERAGES
  {
    id: 'prod-15',
    sku: 'BEV-TEA-015',
    title: 'Dilmah Premium Ceylon BOPF Black Tea (400g)',
    description: 'Finest 100% Pure Ceylon BOPF tea harvested from the mist-covered Nuwara Eliya hills. Rich, bright golden liquor.',
    category: 'Beverages',
    brand: 'Dilmah Ceylon Tea',
    price: 980,
    unit: 'pack',
    unitWeight: '400 g',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800',
    stock: 140,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 99,
    isOrganic: true,
    isFarmSourced: true,
    rating: 5.0,
    reviewsCount: 1540,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-16',
    sku: 'BEV-EGB-016',
    title: 'Elephant House Ginger Beer EGB (1L PET)',
    description: 'Sri Lanka’s iconic naturally flavored spicy ginger beer crafted with 100% local ginger extract.',
    category: 'Beverages',
    brand: 'Elephant House',
    price: 380,
    unit: 'piece',
    unitWeight: '1 L',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    stock: 110,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: false,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 1820,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-17',
    sku: 'BEV-MILO-017',
    title: 'Nestlé Milo Chocolate Malt Powder (400g)',
    description: 'The beloved family energy drink with Activ-Go malt, vitamins and minerals for active lifestyles.',
    category: 'Beverages',
    brand: 'Nestlé Lanka',
    price: 1180,
    unit: 'piece',
    unitWeight: '400 g',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800',
    stock: 180,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 95,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 2100,
    createdAt: '2026-10-22'
  },

  // 7. SNACKS & CONFECTIONERY
  {
    id: 'prod-18',
    sku: 'SNK-TREAC-018',
    title: 'Pure Kithul Treacle Glass Bottle (කිතුල් පැණි - 750ml)',
    description: '100% unadulterated pure village Kithul treacle. Perfect companion for traditional Sri Lankan buffalo curd.',
    category: 'Snacks',
    brand: 'Kithul Lanka',
    price: 1480,
    unit: 'piece',
    unitWeight: '750 ml',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800',
    stock: 95,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.9,
    reviewsCount: 880,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-19',
    sku: 'SNK-CASH-019',
    title: 'Munchee Super Cream Crackers (ක්‍රීම් ක්‍රැකර් - 500g)',
    description: 'Sri Lanka’s favorite crispy, light biscuit snack. Perfect with a warm cup of Ceylon ginger tea.',
    category: 'Snacks',
    brand: 'Munchee Biscuits',
    price: 450,
    unit: 'piece',
    unitWeight: '500 g',
    imageUrl: 'https://images.unsplash.com/photo-1509912760195-4f275e7a9b0c?w=800',
    stock: 70,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 790,
    createdAt: '2026-10-23'
  },

  // 8. HOUSEHOLD & CLEANING
  {
    id: 'prod-20',
    sku: 'HOU-DISH-020',
    title: 'Sunlight Lemon Dishwash Liquid (750ml)',
    description: 'Pure lemon extract grease-cutting dish detergent that eliminates tough curry oil and bacteria.',
    category: 'Household',
    brand: 'Sunlight Sri Lanka',
    price: 680,
    unit: 'piece',
    unitWeight: '750 ml',
    imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800',
    stock: 130,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 95,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.7,
    reviewsCount: 650,
    createdAt: '2026-10-24'
  },
  {
    id: 'prod-21',
    sku: 'HOU-SOAP-021',
    title: 'Dettol Sri Lanka Antiseptic Liquid (500ml)',
    description: 'Hospital-grade antiseptic liquid for first aid, surface disinfection, and family personal hygiene.',
    category: 'Household',
    brand: 'Dettol Care Lanka',
    price: 850,
    unit: 'piece',
    unitWeight: '500 ml',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-545a90e3dfb5?w=800',
    stock: 85,
    store: 'Ceylon Foods Supermarket',
    status: 'Active',
    aiFreshnessScore: 96,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.8,
    reviewsCount: 420,
    createdAt: '2026-10-24'
  }
];

export const INITIAL_RIDER: RiderPartner = {
  id: 'rider-1',
  name: 'Brie Larson',
  phone: '+1 (555) 234-8971',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  vehicleType: 'Electric Scooter',
  rating: 4.95,
  currentLocation: { lat: 37.7749, lng: -122.4194 }
};

export interface FleetRider {
  id: string;
  name: string;
  phone: string;
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
    name: 'Brie Larson',
    phone: '+94 77 234 8971',
    vehicleType: 'Electric Scooter (Eco)',
    plateNumber: 'WP-BIK-9021',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'DELIVERING',
    currentOrderId: 'FC-123456',
    completedDeliveries: 342,
    rating: 4.95,
    zone: 'Zone A - Colombo Central'
  },
  {
    id: 'rider-2',
    name: 'Kasun Perera',
    phone: '+94 71 892 4112',
    vehicleType: 'Honda Dio 110cc',
    plateNumber: 'WP-ABG-4412',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 512,
    rating: 4.90,
    zone: 'Zone B - Colombo South'
  },
  {
    id: 'rider-3',
    name: 'Nimal Fernando',
    phone: '+94 76 345 7789',
    vehicleType: 'Delivery Van (Chilled)',
    plateNumber: 'WP-CAS-1920',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 780,
    rating: 4.88,
    zone: 'Zone C - Bulk & Chilled'
  },
  {
    id: 'rider-4',
    name: 'Dinesh Wickramasinghe',
    phone: '+94 72 612 3901',
    vehicleType: 'Yamaha RayZR',
    plateNumber: 'WP-BCB-8172',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    status: 'OFF_DUTY',
    completedDeliveries: 215,
    rating: 4.75,
    zone: 'Zone A - Colombo Central'
  }
];

export interface PromotionCoupon {
  id: string;
  code: string;
  title: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'FREE_DELIVERY';
  discountValue: number;
  minOrderValue: number;
  validUntil: string;
  usageCount: number;
  usageLimit: number;
  status: 'ACTIVE' | 'EXPIRED' | 'PAUSED';
  badgeColor: string;
}

export const INITIAL_PROMOTIONS: PromotionCoupon[] = [
  {
    id: 'promo-1',
    code: 'CEYLON20',
    title: '20% Off Weekend Harvest',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderValue: 4500,
    validUntil: '2026-11-30',
    usageCount: 142,
    usageLimit: 500,
    status: 'ACTIVE',
    badgeColor: '#0C6237'
  },
  {
    id: 'promo-2',
    code: 'FREEDELIVERY',
    title: 'Free Express Doorstep Delivery',
    discountType: 'FREE_DELIVERY',
    discountValue: 350,
    minOrderValue: 5000,
    validUntil: '2026-12-31',
    usageCount: 389,
    usageLimit: 1000,
    status: 'ACTIVE',
    badgeColor: '#FF6515'
  },
  {
    id: 'promo-3',
    code: 'VILLAGE15',
    title: '15% Off Farm-Fresh Organic Veggies',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 3000,
    validUntil: '2026-11-15',
    usageCount: 88,
    usageLimit: 300,
    status: 'ACTIVE',
    badgeColor: '#78F9B8'
  },
  {
    id: 'promo-4',
    code: 'AYUBOWAN',
    title: 'Rs. 500 Off First Grocery Basket',
    discountType: 'FIXED',
    discountValue: 500,
    minOrderValue: 4000,
    validUntil: '2026-12-31',
    usageCount: 65,
    usageLimit: 200,
    status: 'ACTIVE',
    badgeColor: '#08542E'
  }
];

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  joinedDate: string;
  status: 'ACTIVE' | 'BLOCKED';
}

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-1',
    name: 'Brie Larson',
    email: 'brie@example.com',
    phone: '+94 77 123 4567',
    address: '33 York Street, Colombo 01',
    membershipTier: 'Platinum',
    totalOrders: 28,
    totalSpent: 142500,
    loyaltyPoints: 850,
    joinedDate: '2026-01-15',
    status: 'ACTIVE'
  },
  {
    id: 'cust-2',
    name: 'Samantha Silva',
    email: 'samantha.s@gmail.com',
    phone: '+94 71 456 7890',
    address: '14 Havelock Road, Colombo 05',
    membershipTier: 'Gold',
    totalOrders: 16,
    totalSpent: 89200,
    loyaltyPoints: 420,
    joinedDate: '2026-03-22',
    status: 'ACTIVE'
  },
  {
    id: 'cust-3',
    name: 'Rohan Jayasuriya',
    email: 'rohan.j@yahoo.com',
    phone: '+94 76 991 2234',
    address: '88 Galle Face Terrace, Colombo 03',
    membershipTier: 'Silver',
    totalOrders: 7,
    totalSpent: 34000,
    loyaltyPoints: 160,
    joinedDate: '2026-06-10',
    status: 'ACTIVE'
  },
  {
    id: 'cust-4',
    name: 'Amara De Silva',
    email: 'amara.desilva@outlook.com',
    phone: '+94 75 332 1198',
    address: '42 Flower Road, Colombo 07',
    membershipTier: 'Bronze',
    totalOrders: 3,
    totalSpent: 11500,
    loyaltyPoints: 50,
    joinedDate: '2026-09-02',
    status: 'ACTIVE'
  }
];

export const INITIAL_ADMIN_STATS = {
  availableBalance: 485200,
  totalOrders: 4592,
  activeProducts: 21,
  totalCustomers: 215,
  unassignedOrders: 2,
  todayOrders: 14,
  activeRiders: 7,
  activeVendors: 12,
  salesWeekly: [
    { day: 'Sun', sales: 12 },
    { day: 'Mon', sales: 65 },
    { day: 'Tue', sales: 22 },
    { day: 'Wed', sales: 48 },
    { day: 'Thu', sales: 15 },
    { day: 'Fri', sales: 38 },
    { day: 'Sat', sales: 18 }
  ],
  userDistribution: { customers: 70, vendors: 15, riders: 15 }
};
