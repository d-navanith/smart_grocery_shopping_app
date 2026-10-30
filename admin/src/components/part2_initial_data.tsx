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
    id: 'prod-white-rice',
    sku: 'RIC-WHITE-001',
    title: 'Araliya Keeri Samba & White Raw Rice (5kg)',
    category: 'Staples & Grains',
    brand: 'Araliya Lanka',
    price: 38.50,
    stock: 95,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_white_rice.jpg', // User uploaded burlap sack of rice!
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '5kg Bag'
  },
  {
    id: 'prod-red-rice',
    sku: 'RIC-RED-002',
    title: 'Araliya Traditional Red Raw Rice (5kg)',
    category: 'Staples & Grains',
    brand: 'Araliya Lanka',
    price: 39.00,
    stock: 80,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_red_rice.jpg',
    aiFreshnessScore: 98,
    isOrganic: true,
    unit: '5kg Bag'
  },
  {
    id: 'prod-brinjal',
    sku: 'VEG-BRIN-004',
    title: 'Sri Lankan Purple Brinjal / Eggplant (1kg)',
    category: 'Fruits & Vegetables',
    brand: 'Ceylon Fresh Greens',
    price: 14.50,
    stock: 75,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_brinjal.jpg',
    aiFreshnessScore: 97,
    isOrganic: true,
    unit: '1kg Pack'
  },
  {
    id: 'prod-dhal',
    sku: 'GRN-DHAL-003',
    title: 'Mysore Red Split Lentils / Dhal (1kg)',
    category: 'Staples & Grains',
    brand: 'Ceylon Harvest',
    price: 12.50,
    stock: 150,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_dhal.jpg',
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '1kg Pack'
  },
  {
    id: 'prod-spices',
    sku: 'SPI-ROAST-010',
    title: 'Roasted Ceylon Curry Powder & Spices (250g)',
    category: 'Pantry & Spices',
    brand: 'Araliya Spices',
    price: 16.00,
    stock: 110,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_spices.jpg',
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '250g Pack'
  },
  {
    id: 'prod-coconut',
    sku: 'PAN-COCO-012',
    title: 'Pure Ceylon Coconut Milk & Grated Pol (400ml)',
    category: 'Pantry & Spices',
    brand: 'Maggi Lanka',
    price: 8.50,
    stock: 180,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_coconut.jpg',
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '400ml Can'
  },
  {
    id: 'prod-okra',
    sku: 'VEG-OKRA-005',
    title: 'Fresh Lady’s Finger / Okra (500g)',
    category: 'Fruits & Vegetables',
    brand: 'Ceylon Fresh Greens',
    price: 11.00,
    stock: 60,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_okra.jpg',
    aiFreshnessScore: 98,
    isOrganic: true,
    unit: '500g Pack'
  },
  {
    id: 'prod-chillies',
    sku: 'VEG-CHIL-009',
    title: 'Fresh Green Chillies, Curry Leaves & Pandan (250g)',
    category: 'Fruits & Vegetables',
    brand: 'Ceylon Fresh Greens',
    price: 9.50,
    stock: 120,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_chillies.jpg',
    aiFreshnessScore: 99,
    isOrganic: true,
    unit: '250g Pack'
  },
  {
    id: 'prod-tea',
    sku: 'BEV-TEA-015',
    title: 'Dilmah Pure Ceylon Single Origin BOPF Tea (400g)',
    category: 'Beverages',
    brand: 'Dilmah',
    price: 22.50,
    stock: 140,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_tea.jpg',
    aiFreshnessScore: 100,
    isOrganic: true,
    unit: '400g Pack'
  },
  {
    id: 'prod-roast-paan',
    sku: 'BAK-ROAS-017',
    title: 'Woodfired Traditional Roast Paan (1 Loaf)',
    category: 'Bakery',
    brand: 'Ceylon Bakery Bucharest',
    price: 7.50,
    stock: 65,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_roast_paan.jpg',
    aiFreshnessScore: 100,
    isOrganic: true,
    unit: '1 Loaf'
  },
  {
    id: 'prod-biscuits',
    sku: 'SNK-BISC-016',
    title: 'Munchee Super Cream Crackers & Maliban Biscuits',
    category: 'Snacks & Delicacies',
    brand: 'Munchee',
    price: 12.00,
    stock: 110,
    store: 'Depozit Central București',
    status: 'Active',
    imageUrl: '/prod_biscuits.jpg',
    aiFreshnessScore: 97,
    isOrganic: false,
    unit: '500g Pack'
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Staples & Grains (Orez & Dhal)', slug: 'staples-grains', count: 45, order: '01', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_white_rice.jpg' },
  { id: 'cat-2', name: 'Fruits & Vegetables (Wambatu & Okra)', slug: 'fruits-vegetables', count: 52, order: '02', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_brinjal.jpg' },
  { id: 'cat-3', name: 'Pantry & Spices (Condimente Ceylon)', slug: 'pantry-spices', count: 38, order: '03', visibility: 'Visible', updated: '27 Oct 2026', image: '/prod_spices.jpg' },
  { id: 'cat-4', name: 'Beverages (Ceai Dilmah & EGB)', slug: 'beverages', count: 32, order: '04', visibility: 'Visible', updated: '27 Oct 2026', image: '/prod_tea.jpg' },
  { id: 'cat-5', name: 'Bakery (Roast Paan)', slug: 'bakery', count: 24, order: '05', visibility: 'Visible', updated: '26 Oct 2026', image: '/prod_roast_paan.jpg' },
  { id: 'cat-6', name: 'Snacks (Biscuiți Munchee)', slug: 'snacks-delicacies', count: 48, order: '06', visibility: 'Visible', updated: '26 Oct 2026', image: '/prod_biscuits.jpg' }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#CF-8921',
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    customerAddress: 'Strada Mihai Eminescu nr. 42, Bl. 12, Sc. A, Ap. 14, București Sector 1',
    items: [
      { productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)', quantity: 1, price: 38.50 },
      { productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)', quantity: 2, price: 14.50 },
      { productTitle: 'Mysore Red Split Lentils / Dhal (1kg)', quantity: 1, price: 12.50 }
    ],
    totalAmount: 95.00, // 80.00 + 15.00 livrare
    status: 'PROCESSING',
    deliveryType: 'Glovo Express 30-Min (Sector 1)',
    placedAt: 'Astăzi • 10:15',
    paymentMethod: 'Cash on Delivery (Plata la Livrare)',
    paymentStatus: 'PENDING',
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    dispatchCallStatus: 'NOT_CALLED',
    pickupMinutes: 10,
    deliveryMinutes: 30,
    assignedRider: undefined,
    riderPhone: '',
    riderVerifiedByAdmin: false,
    notes: 'Sunați la interfon 14. Am pregătit suma exactă în numerar (95 lei).'
  },
  {
    id: 'ord-2',
    orderNumber: '#CF-8920',
    customerName: 'Kasun Jayawardena',
    customerPhone: '+40 740 112 345',
    customerAddress: 'Bulevardul Unirii nr. 18, Bl. 5, Ap. 22, București Sector 3',
    items: [
      { productTitle: 'Araliya Traditional Red Raw Rice (5kg)', quantity: 1, price: 39.00 },
      { productTitle: 'Roasted Ceylon Curry Powder & Spices (250g)', quantity: 2, price: 16.00 },
      { productTitle: 'Pure Ceylon Coconut Milk (400ml)', quantity: 3, price: 8.50 }
    ],
    totalAmount: 111.50,
    status: 'PENDING',
    deliveryType: 'Bolt Delivery 25-Min (Sector 3)',
    placedAt: 'Astăzi • 09:42',
    paymentMethod: 'Cash on Delivery (Plata la Livrare)',
    paymentStatus: 'PENDING',
    courierCompany: 'Bolt Delivery Riders',
    courierPhone: '+40 31 229 5555',
    dispatchCallStatus: 'NOT_CALLED',
    pickupMinutes: 12,
    deliveryMinutes: 25,
    assignedRider: undefined,
    notes: 'Vă rog sunați cu 5 minute înainte de sosire.'
  },
  {
    id: 'ord-3',
    orderNumber: '#CF-8919',
    customerName: 'Elena Dumitrescu',
    customerPhone: '+40 735 998 123',
    customerAddress: 'Calea Victoriei nr. 104, Etaj 3, Ap. 8, București Sector 1',
    items: [
      { productTitle: 'Dilmah Pure Ceylon Single Origin BOPF Tea (400g)', quantity: 2, price: 22.50 },
      { productTitle: 'Woodfired Traditional Roast Paan (1 Loaf)', quantity: 2, price: 7.50 },
      { productTitle: 'Munchee Super Cream Crackers', quantity: 2, price: 12.00 }
    ],
    totalAmount: 99.00,
    status: 'ON_THE_WAY',
    deliveryType: 'Sameday 2H Bucharest',
    placedAt: 'Astăzi • 08:30',
    paymentMethod: 'Cash on Delivery (Plata la Livrare)',
    paymentStatus: 'PENDING',
    courierCompany: 'Sameday 2H Bucharest Express',
    courierPhone: '+40 21 637 0660',
    dispatchCallStatus: 'CALLED_DISPATCHED',
    pickupMinutes: 5,
    deliveryMinutes: 20,
    assignedRider: 'Mihai Radu (Sameday #81)',
    riderPhone: '+40 745 612 883',
    riderVerifiedByAdmin: true,
    notes: 'Plată cash pregătită.'
  },
  {
    id: 'ord-4',
    orderNumber: '#CF-8918',
    customerName: 'Sandun Gunawardana',
    customerPhone: '+40 721 889 001',
    customerAddress: 'Strada Liviu Rebreanu nr. 15, București Sector 3',
    items: [
      { productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)', quantity: 2, price: 38.50 },
      { productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)', quantity: 2, price: 14.50 }
    ],
    totalAmount: 121.00,
    status: 'DELIVERED',
    deliveryType: 'Glovo Express',
    placedAt: 'Ieri • 16:20',
    paymentMethod: 'Cash on Delivery (Plata la Livrare)',
    paymentStatus: 'PAID', // Numerar încasat cu succes
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    dispatchCallStatus: 'CALLED_DISPATCHED',
    assignedRider: 'Andrei Popescu (Glovo)',
    notes: 'Livrat cu succes. Cash predat la depozit.'
  }
];

export const INITIAL_DELIVERIES: DeliveryScheduleItem[] = [
  {
    id: 'del-1',
    orderNumber: '#CF-8921',
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    address: 'Strada Mihai Eminescu nr. 42, București Sector 1',
    timeWindow: 'În 30 minute (Glovo)',
    assignedRider: 'Companie de apelat: Glovo Express',
    payment: 'Cash on Delivery • 95.00 lei',
    status: 'Unassigned'
  },
  {
    id: 'del-2',
    orderNumber: '#CF-8920',
    customerName: 'Kasun Jayawardena',
    customerPhone: '+40 740 112 345',
    address: 'Bulevardul Unirii nr. 18, București Sector 3',
    timeWindow: 'În 25 minute (Bolt)',
    assignedRider: 'Companie de apelat: Bolt Food',
    payment: 'Cash on Delivery • 111.50 lei',
    status: 'Unassigned'
  },
  {
    id: 'del-3',
    orderNumber: '#CF-8919',
    customerName: 'Elena Dumitrescu',
    customerPhone: '+40 735 998 123',
    address: 'Calea Victoriei nr. 104, București Sector 1',
    timeWindow: 'Curier pe drum (Sameday)',
    assignedRider: 'Mihai Radu (Sameday)',
    payment: 'Cash on Delivery • 99.00 lei',
    status: 'On the road'
  },
  {
    id: 'del-4',
    orderNumber: '#CF-8918',
    customerName: 'Sandun Gunawardana',
    customerPhone: '+40 721 889 001',
    address: 'Strada Liviu Rebreanu nr. 15, Sector 3',
    timeWindow: 'Livrat ieri',
    assignedRider: 'Andrei Popescu (Glovo)',
    payment: 'Cash Încasat • 121.00 lei',
    status: 'Delivered'
  }
];

export const INITIAL_RIDERS: FleetRider[] = [
  {
    id: 'rider-glovo',
    name: 'Dispecerat Glovo Riders',
    phone: '+40 21 9988',
    vehicle: 'Rețea Curieri Glovo (Scutere & Mașini)',
    status: 'Available',
    activeDeliveries: 4,
    completedToday: 28,
    rating: 4.9,
    zone: 'București Sectoarele 1-6'
  },
  {
    id: 'rider-bolt',
    name: 'Dispecerat Bolt Delivery',
    phone: '+40 31 229 5555',
    vehicle: 'Rețea Curieri Bolt Food',
    status: 'Available',
    activeDeliveries: 3,
    completedToday: 19,
    rating: 4.8,
    zone: 'București & Ilfov'
  },
  {
    id: 'rider-sameday',
    name: 'Sameday 2H Bucharest Express',
    phone: '+40 21 637 0660',
    vehicle: 'Flotă Autoutilitare Frigorifice',
    status: 'Available',
    activeDeliveries: 2,
    completedToday: 15,
    rating: 4.9,
    zone: 'București & Toată România'
  },
  {
    id: 'rider-inhouse',
    name: 'Rajitha Perera (Curier Intern)',
    phone: '+40 720 334 119',
    vehicle: 'Honda PCX 150 (B-99-CEY)',
    status: 'Available',
    activeDeliveries: 1,
    completedToday: 12,
    rating: 4.96,
    zone: 'Comenzi Rapide Sector 1 & 2'
  }
];

export const INITIAL_PROMOTIONS: PromotionCoupon[] = [
  {
    id: 'promo-1',
    name: 'Bun Venit la Ceylon Foods',
    code: 'CEYLON10',
    offer: '10% Reducere la prima comandă',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    dates: '01–30 Nov 2026',
    usage: '82 / 500',
    currentUsage: 82,
    maxUsage: 500,
    minBasket: '100 lei',
    minBasketValue: 100,
    status: 'Active'
  },
  {
    id: 'promo-2',
    name: 'Livrare Gratuită București',
    code: 'LIVRAREGRATIS',
    offer: 'Livrare gratuită peste 150 lei',
    discountType: 'FREE_DELIVERY',
    discountValue: 15,
    dates: 'Permanent Activ',
    usage: '142 / 1000',
    currentUsage: 142,
    maxUsage: 1000,
    minBasket: '150 lei',
    minBasketValue: 150,
    status: 'Active'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'stf-1', name: 'Alina Ionescu', roleSubtitle: 'Director Magazin București', email: 'alina.ionescu@ceylonfoods.ro', role: 'Administrator', lastActive: 'Activ acum', twoFactor: 'Enabled', status: 'Active' },
  { id: 'stf-2', name: 'Chaminda Silva', roleSubtitle: 'Responsabil Import Sri Lanka', email: 'chaminda@ceylonfoods.ro', role: 'Manager', lastActive: 'Acum 15 min', twoFactor: 'Enabled', status: 'Active' },
  { id: 'stf-3', name: 'Cristian Popa', roleSubtitle: 'Dispecer Curieri & Livrări', email: 'cristian.dispatch@ceylonfoods.ro', role: 'Delivery Agent', lastActive: 'Acum 2 min', twoFactor: 'Disabled', status: 'Active' }
];

export const INITIAL_ZONES: DeliveryZone[] = [
  { id: 'zone-1', zone: 'Sector 1 (Nord, Băneasa, Pipera)', coverage: 'Sector 1 București', fee: '15.00 lei', eta: '25-35 min', status: 'Enabled' },
  { id: 'zone-2', zone: 'Sector 2 (Colentina, Tei)', coverage: 'Sector 2 București', fee: '15.00 lei', eta: '25-35 min', status: 'Enabled' },
  { id: 'zone-3', zone: 'Sector 3 (Centru Vechi, Titan)', coverage: 'Sector 3 București', fee: '15.00 lei', eta: '20-30 min', status: 'Enabled' },
  { id: 'zone-4', zone: 'Sector 4, 5, 6 (Berceni, Militari)', coverage: 'Sectoarele 4-6 București', fee: '15.00 lei', eta: '30-40 min', status: 'Enabled' },
  { id: 'zone-5', zone: 'Județul Ilfov (Otopeni, Voluntari)', coverage: 'Comune Limitrofe', fee: '25.00 lei', eta: '45-60 min', status: 'Enabled' },
  { id: 'zone-6', zone: 'Livrare Națională Sameday/Fan Courier', coverage: 'Toată România (Cluj, Timișoara, etc.)', fee: '30.00 lei', eta: '24-48 ore', status: 'Enabled' }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  { id: 'rev-1', customer: 'Mihai Enache', rating: 5, date: '28 Oct 2026', product: 'Araliya Keeri Samba Rice (5kg)', comment: 'Cel mai bun orez pentru curry în România! Livrarea prin Glovo a sosit în 30 de minute și am plătit cash curierului.', sentiment: 'Positive', verified: true, reply: 'Mulțumim frumos, poftă bună!', isPublished: true },
  { id: 'rev-2', customer: 'Sandun Jayasuriya', rating: 5, date: '27 Oct 2026', product: 'Sri Lankan Purple Brinjal (1kg)', comment: 'Vinetele sunt proaspete ca în Sri Lanka, perfecte pentru wambatu moju. Recomand cu încredere!', sentiment: 'Positive', verified: true, reply: 'Vă mulțumim pentru loialitate!', isPublished: true }
];

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  { id: 'cust-1', name: 'Mihai Enache', email: 'mihai@example.ro', phone: '+40 722 456 789', city: 'București Sector 1', address: 'Strada Mihai Eminescu nr. 42, Bl. 10, Sc. A, Ap. 12', totalOrders: 8, totalSpend: 760, loyaltyTier: 'Gold', status: 'Active', joinedDate: '15 Sep 2026', lastOrder: 'Astăzi • 10:15' },
  { id: 'cust-2', name: 'Kasun Jayawardena', email: 'kasun.ceylon@gmail.com', phone: '+40 740 112 345', city: 'București Sector 3', address: 'Bulevardul Unirii 65, Bloc K1', totalOrders: 14, totalSpend: 1420, loyaltyTier: 'Platinum', status: 'Active', joinedDate: '02 Aug 2026', lastOrder: 'Astăzi • 09:42' }
];

export const INITIAL_ADJUSTMENTS: StockAdjustment[] = [
  { id: 'adj-1', time: '28 Oct 2026, 09:30', product: 'Araliya Keeri Samba Rice (5kg)', type: 'IN', change: '+50', reason: 'Import Direct Sri Lanka (Burlap Sacks)', ref: 'RIC-WHITE-001', updatedBy: 'Alina Ionescu' },
  { id: 'adj-2', time: '28 Oct 2026, 09:30', product: 'Sri Lankan Purple Brinjal / Eggplant', type: 'IN', change: '+40', reason: 'Transport Aerian Proaspăt', ref: 'VEG-BRIN-004', updatedBy: 'Alina Ionescu' }
];

export const INITIAL_PERMISSIONS: { [role: string]: { [module: string]: boolean } } = {
  'Administrator': { products: true, orders: true, vouchers: true, deliveries: true, settings: true },
  'Manager': { products: true, orders: true, vouchers: true, deliveries: true, settings: false },
  'Catalog Editor': { products: true, orders: false, vouchers: false, deliveries: false, settings: false },
  'Delivery Agent': { products: false, orders: false, vouchers: false, deliveries: true, settings: false }
};
