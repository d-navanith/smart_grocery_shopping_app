import {
  Product,
  CategoryItem,
  Order,
  DeliveryScheduleItem,
  FleetRider,
  PromotionCoupon,
  StaffMember,
  DeliveryZone,
  CustomerReview,
  CustomerAccount,
  StockAdjustment
} from './part1_imports_types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'STA-KEERI-01',
    title: 'Araliya Keeri Samba Rice (5kg)',
    category: 'Staples & Grains',
    brand: 'Araliya',
    price: 1450.00,
    stock: 45,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 98,
    isOrganic: true,
    unit: '5kg Bag'
  },
  {
    id: 'prod-2',
    sku: 'DAI-HIGH-01',
    title: 'Highland Pasteurized Fresh Milk (1L)',
    category: 'Dairy & Eggs',
    brand: 'Highland',
    price: 520.00,
    stock: 64,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 99,
    isOrganic: false,
    unit: '1L Bottle'
  },
  {
    id: 'prod-3',
    sku: 'VEG-DAMB-01',
    title: 'Dambulla Fresh Red Onions (1kg)',
    category: 'Fruits & Vegetables',
    brand: 'Dambulla Harvest',
    price: 480.00,
    stock: 85,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 97,
    isOrganic: true,
    unit: '1kg Mesh'
  },
  {
    id: 'prod-4',
    sku: 'BEV-DILM-01',
    title: 'Dilmah Ceylon Supreme BOPF Tea (400g)',
    category: 'Beverages',
    brand: 'Dilmah',
    price: 850.00,
    stock: 120,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '400g Box'
  },
  {
    id: 'prod-5',
    sku: 'SEA-TUNA-01',
    title: 'Mirissa Fresh Yellowfin Tuna (500g)',
    category: 'Meat & Seafood',
    brand: 'Mirissa Catch',
    price: 1350.00,
    stock: 18,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 98,
    isOrganic: false,
    unit: '500g Pack'
  },
  {
    id: 'prod-6',
    sku: 'BAK-ROAST-01',
    title: 'Woodfired Traditional Roast Paan (1 Loaf)',
    category: 'Bakery',
    brand: 'Ceylon Bakers',
    price: 180.00,
    stock: 40,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 100,
    isOrganic: true,
    unit: '1 Loaf'
  },
  {
    id: 'prod-7',
    sku: 'SNA-MUNC-01',
    title: 'Munchee Super Cream Crackers (500g)',
    category: 'Snacks & Delicacies',
    brand: 'Munchee',
    price: 380.00,
    stock: 150,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 95,
    isOrganic: false,
    unit: '500g Pack'
  },
  {
    id: 'prod-8',
    sku: 'DAI-KOTM-01',
    title: 'Kotmale Processed Cheddar Cheese (200g)',
    category: 'Dairy & Eggs',
    brand: 'Kotmale',
    price: 720.00,
    stock: 22,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 96,
    isOrganic: false,
    unit: '200g Block'
  },
  {
    id: 'prod-9',
    sku: 'BEV-EGB-01',
    title: 'Elephant House Ginger Beer EGB (1.5L)',
    category: 'Beverages',
    brand: 'Elephant House',
    price: 420.00,
    stock: 90,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 94,
    isOrganic: false,
    unit: '1.5L PET'
  },
  {
    id: 'prod-10',
    sku: 'HOU-SUNL-01',
    title: 'Sunlight Lemon Dishwash Liquid (500ml)',
    category: 'Household & Cleaning',
    brand: 'Sunlight',
    price: 360.00,
    stock: 75,
    store: 'Colombo Central Hub',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    aiFreshnessScore: 92,
    isOrganic: false,
    unit: '500ml Bottle'
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', count: 62, order: '01', visibility: 'Visible', updated: '26 Oct 2026', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-2', name: 'Dairy & Eggs', slug: 'dairy-eggs', count: 38, order: '02', visibility: 'Visible', updated: '26 Oct 2026', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-3', name: 'Staples & Grains', slug: 'staples-grains', count: 45, order: '03', visibility: 'Visible', updated: '25 Oct 2026', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-4', name: 'Meat & Seafood', slug: 'meat-seafood', count: 29, order: '04', visibility: 'Visible', updated: '25 Oct 2026', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-5', name: 'Bakery', slug: 'bakery', count: 24, order: '05', visibility: 'Visible', updated: '24 Oct 2026', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-6', name: 'Beverages', slug: 'beverages', count: 32, order: '06', visibility: 'Visible', updated: '24 Oct 2026', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-7', name: 'Snacks & Delicacies', slug: 'snacks-delicacies', count: 48, order: '07', visibility: 'Visible', updated: '23 Oct 2026', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-8', name: 'Household & Cleaning', slug: 'household-cleaning', count: 30, order: '08', visibility: 'Visible', updated: '22 Oct 2026', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#CF-10482',
    customerName: 'Kavindi Perera',
    customerPhone: '077 234 5678',
    customerAddress: '42/3 Park Rd, Colombo 05',
    items: [
      { productTitle: 'Araliya Keeri Samba Rice (5kg)', quantity: 1, price: 1450.00 },
      { productTitle: 'Highland Pasteurized Fresh Milk (1L)', quantity: 2, price: 520.00 },
      { productTitle: 'Dambulla Fresh Red Onions (1kg)', quantity: 1, price: 480.00 }
    ],
    totalAmount: 2970.00,
    status: 'PROCESSING',
    deliveryType: 'Express 45-Min (Zone Central)',
    placedAt: '27 Oct • 10:15 AM',
    paymentMethod: 'Card Online (PayHere)',
    paymentStatus: 'PAID',
    assignedRider: 'Kasun Madushanka',
    notes: 'Please leave package with building security.'
  },
  {
    id: 'ord-2',
    orderNumber: '#CF-10481',
    customerName: 'Nuwan Fernando',
    customerPhone: '071 845 2361',
    customerAddress: '18 Chapel Rd, Nugegoda',
    items: [
      { productTitle: 'Mirissa Fresh Yellowfin Tuna (500g)', quantity: 2, price: 1350.00 },
      { productTitle: 'Woodfired Traditional Roast Paan (1 Loaf)', quantity: 2, price: 180.00 },
      { productTitle: 'Dilmah Ceylon Supreme BOPF Tea (400g)', quantity: 1, price: 850.00 }
    ],
    totalAmount: 3910.00,
    status: 'PENDING',
    deliveryType: 'Afternoon Delivery Slot',
    placedAt: '27 Oct • 09:42 AM',
    paymentMethod: 'Cash on Delivery (LKR)',
    paymentStatus: 'PENDING',
    assignedRider: undefined,
    notes: 'Please call before arriving.'
  },
  {
    id: 'ord-3',
    orderNumber: '#CF-10480',
    customerName: 'Dilini Silva',
    customerPhone: '076 782 3145',
    customerAddress: '67 Buthgamuwa Rd, Rajagiriya',
    items: [
      { productTitle: 'Kotmale Processed Cheddar Cheese (200g)', quantity: 2, price: 720.00 },
      { productTitle: 'Elephant House Ginger Beer EGB (1.5L)', quantity: 3, price: 420.00 },
      { productTitle: 'Munchee Super Cream Crackers (500g)', quantity: 2, price: 380.00 }
    ],
    totalAmount: 3460.00,
    status: 'ON_THE_WAY',
    deliveryType: 'Morning Slot 09:00–12:00',
    placedAt: '27 Oct • 08:30 AM',
    paymentMethod: 'Card Online (LankaQR)',
    paymentStatus: 'PAID',
    assignedRider: 'Kasun Madushanka',
    notes: 'Ring the front brass bell.'
  },
  {
    id: 'ord-4',
    orderNumber: '#CF-10479',
    customerName: 'Amal Jayasinghe',
    customerPhone: '077 521 9340',
    customerAddress: '12 Hill St, Dehiwala',
    items: [
      { productTitle: 'Araliya Keeri Samba Rice (5kg)', quantity: 2, price: 1450.00 },
      { productTitle: 'Sunlight Lemon Dishwash Liquid (500ml)', quantity: 2, price: 360.00 }
    ],
    totalAmount: 3620.00,
    status: 'DELIVERED',
    deliveryType: 'Morning Slot 09:00–12:00',
    placedAt: '27 Oct • 07:45 AM',
    paymentMethod: 'Card Online (Visa)',
    paymentStatus: 'PAID',
    assignedRider: 'Dinesh Kumara',
    notes: 'Delivered to gate counter.'
  },
  {
    id: 'ord-5',
    orderNumber: '#CF-10474',
    customerName: 'Anjali Peiris',
    customerPhone: '077 382 9416',
    customerAddress: '8 Pagoda Rd, Nugegoda',
    items: [
      { productTitle: 'Highland Pasteurized Fresh Milk (1L)', quantity: 4, price: 520.00 },
      { productTitle: 'Dambulla Fresh Red Onions (1kg)', quantity: 2, price: 480.00 }
    ],
    totalAmount: 3040.00,
    status: 'ON_THE_WAY',
    deliveryType: 'Morning Slot 09:00–12:00',
    placedAt: '27 Oct • 07:15 AM',
    paymentMethod: 'Card on Delivery (mPOS)',
    paymentStatus: 'PENDING',
    assignedRider: 'Dinesh Kumara',
    notes: 'Customer requested card terminal.'
  }
];

export const INITIAL_DELIVERIES: DeliveryScheduleItem[] = [
  {
    id: 'del-1',
    orderNumber: '#CF-10482',
    customerName: 'Kavindi Perera',
    customerPhone: '077 234 5678',
    address: '42/3 Park Rd, Colombo 05',
    timeWindow: '12:00–15:00',
    assignedRider: 'Unassigned',
    payment: 'Paid online',
    status: 'Unassigned'
  },
  {
    id: 'del-2',
    orderNumber: '#CF-10481',
    customerName: 'Nuwan Fernando',
    customerPhone: '071 845 2361',
    address: '18 Chapel Rd, Nugegoda',
    timeWindow: '12:00–15:00',
    assignedRider: 'Unassigned',
    payment: 'COD • LKR 5,840',
    status: 'Unassigned'
  },
  {
    id: 'del-3',
    orderNumber: '#CF-10480',
    customerName: 'Dilini Silva',
    customerPhone: '076 782 3145',
    address: '67 Buthgamuwa Rd, Rajagiriya',
    timeWindow: '09:00–12:00',
    assignedRider: 'Kasun Madushanka',
    payment: 'Paid online',
    status: 'On the road'
  },
  {
    id: 'del-4',
    orderNumber: '#CF-10479',
    customerName: 'Amal Jayasinghe',
    customerPhone: '077 521 9340',
    address: '12 Hill St, Dehiwala',
    timeWindow: '09:00–12:00',
    assignedRider: 'Dinesh Kumara',
    payment: 'Paid online',
    status: 'Delivered'
  },
  {
    id: 'del-5',
    orderNumber: '#CF-10474',
    customerName: 'Anjali Peiris',
    customerPhone: '077 382 9416',
    address: '8 Pagoda Rd, Nugegoda',
    timeWindow: '09:00–12:00',
    assignedRider: 'Dinesh Kumara',
    payment: 'Paid online',
    status: 'On the road'
  }
];

export const INITIAL_RIDERS: FleetRider[] = [
  {
    id: 'rider-1',
    name: 'Kasun Madushanka',
    phone: '077 458 9123',
    vehicle: 'Honda Dio (WP BDF-4821)',
    status: 'Available',
    activeDeliveries: 4,
    completedToday: 18,
    rating: 4.9,
    zone: 'Colombo Central & South'
  },
  {
    id: 'rider-2',
    name: 'Dinesh Kumara',
    phone: '071 984 3215',
    vehicle: 'Bajaj Pulsar 150 (WP BCH-8910)',
    status: 'On Delivery',
    activeDeliveries: 5,
    completedToday: 22,
    rating: 4.8,
    zone: 'Greater Colombo'
  },
  {
    id: 'rider-3',
    name: 'Pradeep Silva',
    phone: '076 341 8762',
    vehicle: 'TVS King Three-Wheeler (Chilled Bin)',
    status: 'Available',
    activeDeliveries: 2,
    completedToday: 14,
    rating: 4.7,
    zone: 'Bulk & Outer Suburbs'
  }
];

export const INITIAL_PROMOTIONS: PromotionCoupon[] = [
  {
    id: 'promo-1',
    name: 'Fresh start',
    code: 'FRESH10',
    offer: '10% • max LKR 500',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    dates: '01–31 Oct 2026',
    usage: '82 / 250',
    currentUsage: 82,
    maxUsage: 250,
    minBasket: 'LKR 3,000',
    minBasketValue: 3000,
    status: 'Active'
  },
  {
    id: 'promo-2',
    name: 'Ceylon tea special',
    code: 'CEYLON20',
    offer: '20% off pure Ceylon teas',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    dates: '15–31 Oct 2026',
    usage: '64 / 200',
    currentUsage: 64,
    maxUsage: 200,
    minBasket: 'LKR 2,000',
    minBasketValue: 2000,
    status: 'Active'
  },
  {
    id: 'promo-3',
    name: 'Free delivery',
    code: 'FREESHIP',
    offer: 'Free delivery on all orders',
    discountType: 'FREE_DELIVERY',
    discountValue: 350,
    dates: '20–31 Oct 2026',
    usage: '40 / 100',
    currentUsage: 40,
    maxUsage: 100,
    minBasket: 'LKR 5,000',
    minBasketValue: 5000,
    status: 'Active'
  },
  {
    id: 'promo-4',
    name: 'November essentials',
    code: 'NOV500',
    offer: 'LKR 500 flat off',
    discountType: 'FIXED',
    discountValue: 500,
    dates: '01–07 Nov 2026',
    usage: '0 / 200',
    currentUsage: 0,
    maxUsage: 200,
    minBasket: 'LKR 5,000',
    minBasketValue: 5000,
    status: 'Scheduled'
  },
  {
    id: 'promo-5',
    name: 'Welcome coupon',
    code: 'AYUBOWAN',
    offer: 'LKR 500 off first order',
    discountType: 'FIXED',
    discountValue: 500,
    dates: 'Permanent',
    usage: '312 / 1000',
    currentUsage: 312,
    maxUsage: 1000,
    minBasket: 'LKR 3,500',
    minBasketValue: 3500,
    status: 'Active'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Nimali Perera',
    roleSubtitle: 'Store administrator',
    email: 'nimali@ceylonfoods.lk',
    role: 'Administrator',
    lastActive: 'Now',
    twoFactor: 'Enabled',
    status: 'Active'
  },
  {
    id: 'st-2',
    name: 'Sahan De Silva',
    roleSubtitle: 'Operations team',
    email: 'sahan@ceylonfoods.lk',
    role: 'Manager',
    lastActive: 'Today • 09:35',
    twoFactor: 'Enabled',
    status: 'Active'
  },
  {
    id: 'st-3',
    name: 'Hiruni Fernando',
    roleSubtitle: 'Catalog team',
    email: 'hiruni@ceylonfoods.lk',
    role: 'Catalog Editor',
    lastActive: 'Today • 09:10',
    twoFactor: 'Enabled',
    status: 'Active'
  },
  {
    id: 'st-4',
    name: 'Kasun Madushanka',
    roleSubtitle: 'Delivery team',
    email: 'kasun@ceylonfoods.lk',
    role: 'Delivery Agent',
    lastActive: 'Today • 08:45',
    twoFactor: 'Enabled',
    status: 'Active'
  },
  {
    id: 'st-5',
    name: 'Malsha Bandara',
    roleSubtitle: 'Invitation sent 25 Oct',
    email: 'malsha@ceylonfoods.lk',
    role: 'Catalog Editor',
    lastActive: 'Not yet joined',
    twoFactor: 'Disabled',
    status: 'Invited'
  }
];

export const INITIAL_ZONES: DeliveryZone[] = [
  { id: 'z-1', zone: 'Colombo Central', coverage: 'Colombo 01–07', fee: '300.00', eta: 'Same day (45 Min)', status: 'Enabled' },
  { id: 'z-2', zone: 'Colombo South', coverage: 'Colombo 08–15, Dehiwala', fee: '300.00', eta: 'Same day (1–2 Hrs)', status: 'Enabled' },
  { id: 'z-3', zone: 'Greater Colombo', coverage: 'Nugegoda, Rajagiriya, Battaramulla', fee: '350.00', eta: 'Same day (2–3 Hrs)', status: 'Enabled' },
  { id: 'z-4', zone: 'Outer Suburbs', coverage: 'Maharagama, Pannipitiya, Kottawa', fee: '450.00', eta: 'Next day schedule', status: 'Enabled' }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customer: 'Anura Wickramasinghe',
    rating: 5,
    date: '26 Oct 2026',
    product: 'Dambulla Fresh Red Onions 1kg',
    comment: 'Super fresh red onions! Crisp and packed in clean eco-mesh bag. Delivery arrived in 35 mins in Colombo 07.',
    sentiment: 'Very Positive',
    verified: true,
    reply: 'Thank you Anura! We source our red onions fresh daily direct from Dambulla Economic Centre.',
    isPublished: true
  },
  {
    id: 'rev-2',
    customer: 'Kavindi Perera',
    rating: 5,
    date: '25 Oct 2026',
    product: 'Highland Pasteurized Fresh Milk 1L',
    comment: 'Chilled delivery packaging was superb. The ice packs kept the milk completely fresh. Highly recommend Ceylon Foods!',
    sentiment: 'Very Positive',
    verified: true,
    reply: '',
    isPublished: true
  },
  {
    id: 'rev-3',
    customer: 'Rohan Jayatilleke',
    rating: 4,
    date: '24 Oct 2026',
    product: 'Araliya Keeri Samba Rice (5kg)',
    comment: 'Great quality rice. Grain is long and fragrant. Packing was securely sealed.',
    sentiment: 'Positive',
    verified: true,
    reply: 'Thanks Rohan, glad you enjoyed the aromatic Keeri Samba harvest!',
    isPublished: true
  },
  {
    id: 'rev-4',
    customer: 'Sanduni De Silva',
    rating: 5,
    date: '23 Oct 2026',
    product: 'Dilmah Ceylon Supreme BOPF 400g',
    comment: 'Pure authentic Ceylon tea. Excellent taste and fresh aroma. Best supermarket prices in Colombo.',
    sentiment: 'Very Positive',
    verified: true,
    reply: '',
    isPublished: true
  }
];

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'c-1',
    name: 'Kavindi Perera',
    email: 'kavindi@example.com',
    phone: '077 234 5678',
    city: 'Colombo 05',
    address: '42/3 Park Rd, Colombo 05',
    totalOrders: 28,
    totalSpend: 142500,
    loyaltyTier: 'Platinum',
    status: 'Active',
    joinedDate: '12 Jan 2026',
    lastOrder: '27 Oct 2026',
    notes: 'Prefers morning delivery. VIP customer.'
  },
  {
    id: 'c-2',
    name: 'Nuwan Fernando',
    email: 'nuwan@example.com',
    phone: '071 845 2361',
    city: 'Nugegoda',
    address: '18 Chapel Rd, Nugegoda',
    totalOrders: 14,
    totalSpend: 68400,
    loyaltyTier: 'Gold',
    status: 'Active',
    joinedDate: '04 Mar 2026',
    lastOrder: '27 Oct 2026'
  },
  {
    id: 'c-3',
    name: 'Dilini Silva',
    email: 'dilini@example.com',
    phone: '076 782 3145',
    city: 'Rajagiriya',
    address: '67 Buthgamuwa Rd, Rajagiriya',
    totalOrders: 9,
    totalSpend: 38900,
    loyaltyTier: 'Silver',
    status: 'Active',
    joinedDate: '18 May 2026',
    lastOrder: '27 Oct 2026'
  },
  {
    id: 'c-4',
    name: 'Amal Jayasinghe',
    email: 'amal@example.com',
    phone: '077 521 9340',
    city: 'Dehiwala',
    address: '12 Hill St, Dehiwala',
    totalOrders: 5,
    totalSpend: 19200,
    loyaltyTier: 'Bronze',
    status: 'Active',
    joinedDate: '22 Aug 2026',
    lastOrder: '27 Oct 2026'
  }
];

export const INITIAL_ADJUSTMENTS: StockAdjustment[] = [
  { id: 'adj-1', product: 'Araliya Keeri Samba Rice (5kg)', change: '+50 units', type: 'IN', reason: 'Supplier shipment received', ref: 'PO-8842', updatedBy: 'Sahan De Silva', time: '27 Oct • 09:15 AM' },
  { id: 'adj-2', product: 'Highland Fresh Milk (1L)', change: '+40 units', type: 'IN', reason: 'Direct farm intake Ambewela', ref: 'PO-8841', updatedBy: 'Hiruni Fernando', time: '27 Oct • 08:30 AM' },
  { id: 'adj-3', product: 'Dambulla Red Onions (1kg)', change: '-5 units', type: 'OUT', reason: 'Grade sorting cull', ref: 'DM-102', updatedBy: 'Sahan De Silva', time: '26 Oct • 04:45 PM' }
];

export const INITIAL_PERMISSIONS: { [role: string]: { [module: string]: boolean } } = {
  Administrator: { products: true, orders: true, vouchers: true, deliveries: true, settings: true },
  Manager: { products: true, orders: true, vouchers: true, deliveries: true, settings: false },
  'Catalog Editor': { products: true, orders: false, vouchers: true, deliveries: false, settings: false },
  'Delivery Agent': { products: false, orders: true, vouchers: false, deliveries: true, settings: false }
};
