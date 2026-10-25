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

// Full-scale realistic supermarket inventory across all 8 aisles
export const INITIAL_PRODUCTS: Product[] = [
  // 1. FRESH PRODUCE (FRUITS & VEGETABLES)
  {
    id: 'prod-1',
    sku: 'VEG-PUMP-001',
    title: 'Bertolli Fresh Pumpkin',
    description: 'High in vitamins A & C, fiber and potassium. Perfect for wholesome soups and roasted dishes.',
    category: 'Fruits & Veg',
    brand: 'Bertolli Organic Farms',
    price: 3.49,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800',
    stock: 75,
    store: 'FreshCart Supermarket',
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
    title: 'Avocado Hass (Creamy)',
    description: 'Nutrient-rich Hass avocados with silky green texture, loaded with healthy monounsaturated fats.',
    category: 'Fruits & Veg',
    brand: 'Natureland Organics',
    price: 4.29,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
    stock: 54,
    store: 'FreshCart Supermarket',
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
    title: 'Vine Cherry Tomatoes',
    description: 'Sweet, juicy vine-ripened red tomatoes ideal for salads, pasta sauces, and fresh cooking.',
    category: 'Fruits & Veg',
    brand: 'Highland Greens',
    price: 2.99,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800',
    stock: 65,
    store: 'FreshCart Supermarket',
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
    title: 'Cavendish Sweet Bananas',
    description: 'Naturally sweetened Cavendish bananas packed with dietary potassium and energy.',
    category: 'Fruits & Veg',
    brand: 'SunValley Farms',
    price: 1.89,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
    stock: 90,
    store: 'FreshCart Supermarket',
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
    title: 'Fresh Full Cream Milk (1L)',
    description: '100% pure fresh cow milk, pasteurised and homogenised for rich creaminess and calcium.',
    category: 'Dairy & Eggs',
    brand: 'Highland Pure',
    price: 2.10,
    unit: 'liter',
    unitWeight: '1 L',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    stock: 120,
    store: 'FreshCart Supermarket',
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
    description: 'Grade-A farm fresh brown eggs from free-range pasture hens, high in clean protein.',
    category: 'Dairy & Eggs',
    brand: 'Happy Hen Pastures',
    price: 3.75,
    unit: 'pack',
    unitWeight: '12 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800',
    stock: 80,
    store: 'FreshCart Supermarket',
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
    title: 'Natural Cheddar Cheese Block (250g)',
    description: 'Aged sharp cheddar cheese made from whole cow milk. Perfect for burgers, sandwiches and melting.',
    category: 'Dairy & Eggs',
    brand: 'Anchor Pure Dairy',
    price: 4.80,
    unit: 'piece',
    unitWeight: '250 g',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800',
    stock: 45,
    store: 'FreshCart Supermarket',
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
    title: 'Artisan Sourdough Loaf (400g)',
    description: 'Naturally fermented rustic sourdough with crisp golden crust and soft airy crumb.',
    category: 'Bakery',
    brand: 'Golden Crust Bakers',
    price: 3.20,
    unit: 'piece',
    unitWeight: '400 g',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    stock: 40,
    store: 'FreshCart Supermarket',
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
    description: 'Flaky, buttery Viennoiserie baked fresh this morning with 100% churned French butter.',
    category: 'Bakery',
    brand: 'Golden Crust Bakers',
    price: 4.50,
    unit: 'pack',
    unitWeight: '4 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    stock: 35,
    store: 'FreshCart Supermarket',
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
    title: 'Skinless Chicken Breast Fillets (1kg)',
    description: 'Tender, lean boneless chicken breast fillets from farm-raised poultry without hormones.',
    category: 'Meat & Seafood',
    brand: 'Bairaha Prime Cuts',
    price: 7.99,
    unit: 'kg',
    unitWeight: '1 kg',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    stock: 55,
    store: 'FreshCart Supermarket',
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
    sku: 'MEA-SALM-011',
    title: 'Fresh Atlantic Salmon Fillet (500g)',
    description: 'Sustainably farmed salmon fillets rich in Omega-3 fatty acids with delicate pink marbling.',
    category: 'Meat & Seafood',
    brand: 'Ocean Fresh Seafood',
    price: 12.50,
    unit: 'piece',
    unitWeight: '500 g',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
    stock: 30,
    store: 'FreshCart Supermarket',
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
    title: 'Royal Basmati Rice (5kg Bag)',
    description: 'Extra long grain aged basmati rice with distinctive aromatic fragrance and fluffy texture.',
    category: 'Staples & Grains',
    brand: 'Fortune Royal',
    price: 11.90,
    unit: 'pack',
    unitWeight: '5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    stock: 150,
    store: 'FreshCart Supermarket',
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
    title: 'Pure Virgin Coconut Oil (500ml)',
    description: 'Cold-pressed virgin coconut oil, ideal for high-heat cooking, baking, and healthy diet dressing.',
    category: 'Staples & Grains',
    brand: 'Natureland Organics',
    price: 4.80,
    unit: 'piece',
    unitWeight: '500 ml',
    imageUrl: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800',
    stock: 90,
    store: 'FreshCart Supermarket',
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
    sku: 'STP-PAST-014',
    title: 'Italian Penne Rigate Pasta (500g)',
    description: 'Traditional bronze-cut durum wheat semolina pasta that holds sauces perfectly.',
    category: 'Staples & Grains',
    brand: 'Barilla Italy',
    price: 2.25,
    unit: 'piece',
    unitWeight: '500 g',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281059?w=800',
    stock: 110,
    store: 'FreshCart Supermarket',
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
    title: 'Single Origin Ceylon Black Tea (100 Bags)',
    description: 'Pure Ceylon BOPF tea harvested from the mist-covered Nuwara Eliya hills. Rich golden liquor.',
    category: 'Beverages',
    brand: 'Dilmah Pure Ceylon',
    price: 5.40,
    unit: 'pack',
    unitWeight: '100 bags',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800',
    stock: 140,
    store: 'FreshCart Supermarket',
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
    sku: 'BEV-COFF-016',
    title: 'Dark Roasted Arabica Coffee Beans (250g)',
    description: 'Whole roast Arabica coffee beans with deep chocolate notes and velvety crema.',
    category: 'Beverages',
    brand: 'Soul Coffee Roasters',
    price: 6.90,
    unit: 'piece',
    unitWeight: '250 g',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    stock: 65,
    store: 'FreshCart Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 420,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-17',
    sku: 'BEV-COLA-017',
    title: 'Coca-Cola Original Taste (1.5L Bottle)',
    description: 'The world classic crisp, refreshing cola beverage served ice cold.',
    category: 'Beverages',
    brand: 'Coca-Cola Co.',
    price: 1.60,
    unit: 'piece',
    unitWeight: '1.5 L',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800',
    stock: 180,
    store: 'FreshCart Supermarket',
    status: 'Active',
    aiFreshnessScore: 95,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.7,
    reviewsCount: 2100,
    createdAt: '2026-10-22'
  },

  // 7. SNACKS & CONFECTIONERY
  {
    id: 'prod-18',
    sku: 'SNK-CHOC-018',
    title: 'Premium 70% Dark Chocolate Bar (100g)',
    description: 'Single-estate bittersweet dark chocolate crafted from roasted cocoa beans.',
    category: 'Snacks',
    brand: 'Lindt Master Chocolatier',
    price: 3.80,
    unit: 'piece',
    unitWeight: '100 g',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800',
    stock: 95,
    store: 'FreshCart Supermarket',
    status: 'Active',
    aiFreshnessScore: 98,
    isOrganic: false,
    isFarmSourced: false,
    rating: 4.9,
    reviewsCount: 880,
    createdAt: '2026-10-23'
  },
  {
    id: 'prod-19',
    sku: 'SNK-CASH-019',
    title: 'Roasted & Salted Jumbo Cashews (200g)',
    description: 'Golden oven-roasted Sri Lankan jumbo cashews seasoned with light sea salt.',
    category: 'Snacks',
    brand: 'Royal Harvest Nuts',
    price: 5.95,
    unit: 'piece',
    unitWeight: '200 g',
    imageUrl: 'https://images.unsplash.com/photo-1509912760195-4f275e7a9b0c?w=800',
    stock: 70,
    store: 'FreshCart Supermarket',
    status: 'Active',
    aiFreshnessScore: 97,
    isOrganic: true,
    isFarmSourced: true,
    rating: 4.8,
    reviewsCount: 390,
    createdAt: '2026-10-23'
  },

  // 8. HOUSEHOLD & CLEANING
  {
    id: 'prod-20',
    sku: 'HOU-DISH-020',
    title: 'Anti-Bacterial Dishwashing Liquid (750ml)',
    description: 'Lemon extract grease-cutting dish detergent that eliminates tough stains and 99.9% bacteria.',
    category: 'Household',
    brand: 'Sunlight Pro',
    price: 2.80,
    unit: 'piece',
    unitWeight: '750 ml',
    imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800',
    stock: 130,
    store: 'FreshCart Supermarket',
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
    title: 'Natural Aloe Vera Hand Wash (500ml Refill)',
    description: 'Moisturizing liquid hand wash enriched with pure aloe vera extract and Vitamin E.',
    category: 'Household',
    brand: 'Dettol Care',
    price: 3.40,
    unit: 'piece',
    unitWeight: '500 ml',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-545a90e3dfb5?w=800',
    stock: 85,
    store: 'FreshCart Supermarket',
    status: 'Active',
    aiFreshnessScore: 96,
    isOrganic: true,
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
    code: 'FRESH20',
    title: '20% Off Weekend Harvest',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderValue: 25.00,
    validUntil: '2026-11-30',
    usageCount: 142,
    usageLimit: 500,
    status: 'ACTIVE',
    badgeColor: '#044F41'
  },
  {
    id: 'promo-2',
    code: 'FREEDELIVERY',
    title: 'Free Express Doorstep Delivery',
    discountType: 'FREE_DELIVERY',
    discountValue: 2.99,
    minOrderValue: 35.00,
    validUntil: '2026-12-31',
    usageCount: 389,
    usageLimit: 1000,
    status: 'ACTIVE',
    badgeColor: '#FF632B'
  },
  {
    id: 'promo-3',
    code: 'ORGANIC15',
    title: '15% Off Farm-Fresh Organic Veggies',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 20.00,
    validUntil: '2026-11-15',
    usageCount: 88,
    usageLimit: 300,
    status: 'ACTIVE',
    badgeColor: '#78F9B8'
  },
  {
    id: 'promo-4',
    code: 'WELCOME10',
    title: '$10 Off First Grocery Basket',
    discountType: 'FIXED',
    discountValue: 10.00,
    minOrderValue: 50.00,
    validUntil: '2026-12-31',
    usageCount: 65,
    usageLimit: 200,
    status: 'ACTIVE',
    badgeColor: '#2F2F2F'
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
    address: '33 York Road, Colombo 03',
    membershipTier: 'Platinum',
    totalOrders: 28,
    totalSpent: 1420.50,
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
    totalSpent: 890.20,
    loyaltyPoints: 420,
    joinedDate: '2026-03-22',
    status: 'ACTIVE'
  },
  {
    id: 'cust-3',
    name: 'Rohan Jayasuriya',
    email: 'rohan.j@yahoo.com',
    phone: '+94 76 991 2234',
    address: '88 Galle Face Terrace, Colombo 01',
    membershipTier: 'Silver',
    totalOrders: 7,
    totalSpent: 340.00,
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
    totalSpent: 115.80,
    loyaltyPoints: 50,
    joinedDate: '2026-09-02',
    status: 'ACTIVE'
  }
];

export const INITIAL_ADMIN_STATS = {
  availableBalance: 1240.35,
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
