import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LayoutGrid,
  Archive,
  Users,
  Tag,
  Truck,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Settings,
  Search,
  Calendar as CalendarIcon,
  Bell,
  ChevronDown,
  LogOut,
  Plus,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Upload,
  MoreHorizontal,
  X,
  Check,
  Eye,
  Edit2,
  Trash2,
  KeyRound,
  Filter,
  CheckCircle,
  Layers,
  Sparkles,
  BarChart3,
  CreditCard,
  Building,
  Navigation,
  UserPlus,
  Ticket,
  FileText,
  RefreshCw,
  UserCheck,
  Lock,
  MapPin,
  Phone,
  ShoppingBasket,
  ExternalLink,
  Star,
  FileDown,
  Sliders,
  HelpCircle,
  Send
} from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  store: string;
  status: 'Active' | 'Inactive';
  imageUrl: string;
  aiFreshnessScore: number;
  isOrganic: boolean;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  items: { productTitle: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'PLACED' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  deliveryType: string;
  placedAt: string;
  paymentMethod?: string;
  paymentStatus?: 'PAID' | 'COD' | 'PENDING';
}

interface FleetRider {
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

interface PromotionCoupon {
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

interface CustomerAccount {
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

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('auth') === 'false') return false;
    if (params?.get('auth') === 'true') return true;
    return localStorage.getItem('ceylonfoods_admin_auth') === 'true' ||
           localStorage.getItem('freshcart_admin_auth') === 'true' ||
           localStorage.getItem('metrocery_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('admin@ceylonfoods.lk');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active navigation menu tab
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'orders' | 'products' | 'categories' | 'inventory' | 'customers' | 'promotions' | 'deliveries' | 'reviews' | 'reports' | 'staff' | 'settings'
  >(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const tab = params?.get('tab');
    if (tab && ['dashboard', 'orders', 'products', 'categories', 'inventory', 'customers', 'promotions', 'deliveries', 'reviews', 'reports', 'staff', 'settings'].includes(tab)) {
      return tab as any;
    }
    return 'dashboard';
  });

  // Sub-tabs for screens
  const [ordersTab, setOrdersTab] = useState<'ALL' | 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [productsTab, setProductsTab] = useState<'ALL' | 'AVAILABLE' | 'DRAFTS' | 'OUT_OF_STOCK'>('ALL');
  const [inventoryTab, setInventoryTab] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [riders, setRiders] = useState<FleetRider[]>([]);
  const [promotions, setPromotions] = useState<PromotionCoupon[]>([]);
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddPromoModalOpen, setIsAddPromoModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAdjustStockModalOpen, setIsAdjustStockModalOpen] = useState(false);

  // ==================== NEW COMPREHENSIVE SCREEN STATES ====================
  // Deliveries states (Image 1)
  const [deliveriesTab, setDeliveriesTab] = useState<'TODAY' | 'UNASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED'>('TODAY');
  const [deliveryRiderFilter, setDeliveryRiderFilter] = useState('ALL');
  const [deliveryZoneFilter, setDeliveryZoneFilter] = useState('ALL');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('ALL');
  const [deliverySearch, setDeliverySearch] = useState('');
  const [isAssignDeliveryModalOpen, setIsAssignDeliveryModalOpen] = useState(false);
  const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState<any>(null);
  const [deliveryRiderSelect, setDeliveryRiderSelect] = useState('Kasun Madushanka');

  // Deliveries mock register
  const [deliveriesList, setDeliveriesList] = useState([
    {
      id: 'del-1',
      orderNumber: '#CF-10482',
      customerName: 'Kavindi Perera',
      customerPhone: '077 234 5678',
      address: '42/3 Park Rd, Colombo 05',
      timeWindow: '12:00–15:00',
      assignedRider: 'Unassigned',
      payment: 'Paid online',
      status: 'Unassigned' as const
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
      status: 'Unassigned' as const
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
      status: 'On the road' as const
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
      status: 'Delivered' as const
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
      status: 'On the road' as const
    }
  ]);

  // Promotions states (Image 2)
  const [promotionsTab, setPromotionsTab] = useState<'ALL' | 'ACTIVE' | 'SCHEDULED' | 'EXPIRED'>('ALL');
  const [promotionsSearch, setPromotionsSearch] = useState('');
  const [promotionsTypeFilter, setPromotionsTypeFilter] = useState('ALL');
  const [isCreatePromoModalOpen, setIsCreatePromoModalOpen] = useState(false);
  const [preventCouponStacking, setPreventCouponStacking] = useState(true);
  const [excludeDeliveryFees, setExcludeDeliveryFees] = useState(true);
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoOffer, setNewPromoOffer] = useState('');
  const [newPromoMin, setNewPromoMin] = useState('LKR 3,000');

  // Promotions mock register
  const [promotionsRegister, setPromotionsRegister] = useState([
    {
      id: 'promo-1',
      name: 'Fresh start',
      code: 'FRESH10',
      offer: '10% • max LKR 500',
      dates: '01–31 Oct 2026',
      usage: '82 / 250',
      minBasket: 'LKR 3,000',
      status: 'Active' as const
    },
    {
      id: 'promo-2',
      name: 'Ceylon tea special',
      code: 'Automatic • Beverages',
      offer: '10% off black tea',
      dates: '15–31 Oct 2026',
      usage: '64 / Unlimited',
      minBasket: 'None',
      status: 'Active' as const
    },
    {
      id: 'promo-3',
      name: 'Free delivery',
      code: 'FREESHIP',
      offer: 'Delivery fee waived',
      dates: '20–31 Oct 2026',
      usage: '40 / 100',
      minBasket: 'LKR 5,000',
      status: 'Active' as const
    },
    {
      id: 'promo-4',
      name: 'November essentials',
      code: 'NOV500',
      offer: 'LKR 500 off',
      dates: '01–07 Nov 2026',
      usage: '0 / 200',
      minBasket: 'LKR 5,000',
      status: 'Scheduled' as const
    },
    {
      id: 'promo-5',
      name: 'September welcome',
      code: 'HELLO15',
      offer: '15% • max LKR 750',
      dates: '01–30 Sep 2026',
      usage: '148 / 200',
      minBasket: 'LKR 3,500',
      status: 'Expired' as const
    }
  ]);

  // Reports states (Image 3)
  const [reportsSubTab, setReportsSubTab] = useState<'SALES' | 'PRODUCTS' | 'CUSTOMERS' | 'INVENTORY' | 'DELIVERY'>('SALES');
  const [reportsTrendRange, setReportsTrendRange] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [reportsCategorySearch, setReportsCategorySearch] = useState('');
  const [reportsCategorySort, setReportsCategorySort] = useState<'REVENUE' | 'UNITS'>('REVENUE');

  // Staff states (Image 4)
  const [staffTab, setStaffTab] = useState<'MEMBERS' | 'ROLES' | 'INVITATIONS' | 'ACTIVITY'>('MEMBERS');
  const [staffSearch, setStaffSearch] = useState('');
  const [staffRoleFilter, setStaffRoleFilter] = useState('ALL');
  const [isInviteStaffModalOpen, setIsInviteStaffModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Catalog Editor');

  // Staff directory mock
  const [staffDirectory, setStaffDirectory] = useState([
    {
      id: 'st-1',
      name: 'Nimali Perera',
      roleSubtitle: 'Store administrator',
      email: 'nimali@ceylonfoods.lk',
      role: 'Administrator',
      lastActive: 'Now',
      twoFactor: 'Enabled',
      status: 'Active' as const
    },
    {
      id: 'st-2',
      name: 'Sahan De Silva',
      roleSubtitle: 'Operations team',
      email: 'sahan@ceylonfoods.lk',
      role: 'Manager',
      lastActive: 'Today • 09:35',
      twoFactor: 'Enabled',
      status: 'Active' as const
    },
    {
      id: 'st-3',
      name: 'Hiruni Fernando',
      roleSubtitle: 'Catalog team',
      email: 'hiruni@ceylonfoods.lk',
      role: 'Catalog Editor',
      lastActive: 'Today • 09:10',
      twoFactor: 'Enabled',
      status: 'Active' as const
    },
    {
      id: 'st-4',
      name: 'Kasun Madushanka',
      roleSubtitle: 'Delivery team',
      email: 'kasun@ceylonfoods.lk',
      role: 'Delivery Agent',
      lastActive: 'Today • 08:45',
      twoFactor: 'Enabled',
      status: 'Active' as const
    },
    {
      id: 'st-5',
      name: 'Malsha Bandara',
      roleSubtitle: 'Invitation sent 25 Oct',
      email: 'malsha@ceylonfoods.lk',
      role: 'Catalog Editor',
      lastActive: 'Not yet joined',
      twoFactor: '—',
      status: 'Invited' as const
    }
  ]);

  // Settings states (Image 5)
  const [settingsTab, setSettingsTab] = useState<'STORE' | 'NOTIFICATIONS' | 'SECURITY' | 'INTEGRATIONS'>('STORE');
  const [storeName, setStoreName] = useState('Ceylon Foods');
  const [supportEmail, setSupportEmail] = useState('hello@ceylonfoods.lk');
  const [phone, setPhone] = useState('011 234 5678');
  const [address, setAddress] = useState('125 High Level Road, Colombo 06');
  const [domain, setDomain] = useState('www.ceylonfoods.lk');
  const [currency, setCurrency] = useState('LKR • Sri Lankan Rupee');
  const [country, setCountry] = useState('Sri Lanka');
  const [timezone, setTimezone] = useState('Asia/Colombo (UTC +05:30)');
  const [openingTime, setOpeningTime] = useState('08:00 AM');
  const [closingTime, setClosingTime] = useState('08:00 PM');
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const [cardPaymentsEnabled, setCardPaymentsEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(false);
  const [collectVat, setCollectVat] = useState(false);
  const [standardTaxRate, setStandardTaxRate] = useState('18');
  const [vatRegNumber, setVatRegNumber] = useState('Not configured');
  const [pricesIncludeTax, setPricesIncludeTax] = useState(true);
  const [minOrderLkr, setMinOrderLkr] = useState('1,000.00');
  const [freeDeliveryAboveLkr, setFreeDeliveryAboveLkr] = useState('5,000.00');
  const [sameDayCutoff, setSameDayCutoff] = useState('02:00 PM');
  const [deliveryWindowLength, setDeliveryWindowLength] = useState('3 hours');
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Delivery zones mock
  const [deliveryZones, setDeliveryZones] = useState([
    { zone: 'Colombo Central', coverage: 'Colombo 01–07', fee: '300.00', eta: 'Same day', status: 'Enabled' },
    { zone: 'Colombo South', coverage: 'Colombo 08–15, Dehiwala', fee: '300.00', eta: 'Same day', status: 'Enabled' },
    { zone: 'Greater Colombo', coverage: 'Nugegoda, Rajagiriya, Battaramulla', fee: '350.00', eta: 'Same day', status: 'Enabled' },
    { zone: 'Outer Suburbs', coverage: 'Maharagama, Pannipitiya, Kottawa', fee: '450.00', eta: 'Next day', status: 'Enabled' }
  ]);

  // Customer Reviews states
  const [reviewsFilter, setReviewsFilter] = useState<'ALL' | '5_STAR' | '4_STAR' | '3_STAR' | 'NEEDS_REPLY'>('ALL');
  const [reviewsSearch, setReviewsSearch] = useState('');
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [customerReviews, setCustomerReviews] = useState([
    {
      id: 'rev-1',
      customer: 'Anura Wickramasinghe',
      rating: 5,
      date: '26 Oct 2026',
      product: 'Dambulla Fresh Red Onions 1kg',
      comment: 'Super fresh red onions! Crisp and packed in clean eco-mesh bag. Delivery arrived in 35 mins in Colombo 07.',
      sentiment: 'Very Positive',
      verified: true,
      reply: 'Thank you Anura! We source our red onions fresh daily direct from Dambulla Economic Centre.'
    },
    {
      id: 'rev-2',
      customer: 'Kavindi Perera',
      rating: 5,
      date: '25 Oct 2026',
      product: 'Ambewela Fresh Full Cream Milk 1L',
      comment: 'Chilled delivery packaging was superb. The ice packs kept the milk completely fresh. Highly recommend Ceylon Foods!',
      sentiment: 'Very Positive',
      verified: true,
      reply: ''
    },
    {
      id: 'rev-3',
      customer: 'Rohan Jayatilleke',
      rating: 4,
      date: '24 Oct 2026',
      product: 'Nuwara Eliya Fresh Leeks 500g',
      comment: 'Great quality vegetables. One bunch was slightly smaller than expected, but overall very fresh and clean.',
      sentiment: 'Positive',
      verified: true,
      reply: 'Thanks Rohan, our harvest sorting team has noted your feedback for precision grading!'
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
      reply: ''
    }
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form
  const [newProduct, setNewProduct] = useState({
    title: '',
    sku: '',
    category: 'Fruits & Vegetables',
    brand: 'Ceylon Agro',
    price: 450,
    stock: 50,
    store: 'Ceylon Foods Supermarket',
    imageUrl: '/prod_orange.jpg',
    aiFreshnessScore: 98,
    isOrganic: true
  });

  // Mock initial orders matching Image 1 & 3
  const sampleOrders: Order[] = [
    {
      id: 'ord-1',
      orderNumber: '#CF-10482',
      customerName: 'Kavindi Perera',
      customerPhone: '077 234 5678',
      customerAddress: 'Colombo 05',
      items: [{ productTitle: 'Samba rice 1kg', quantity: 2, price: 640 }, { productTitle: 'Keells fresh milk 1L', quantity: 2, price: 480 }],
      totalAmount: 3260,
      status: 'PROCESSING',
      deliveryType: 'Express 45 Min',
      placedAt: '26 Oct • 09:18',
      paymentMethod: 'Card Online',
      paymentStatus: 'PAID'
    },
    {
      id: 'ord-2',
      orderNumber: '#CF-10481',
      customerName: 'Nuwan Fernando',
      customerPhone: '071 845 2361',
      customerAddress: 'Nugegoda',
      items: [{ productTitle: 'Fresh coconuts', quantity: 4, price: 180 }, { productTitle: 'Red lentils 1kg', quantity: 2, price: 420 }],
      totalAmount: 5840,
      status: 'PLACED',
      deliveryType: 'Standard Slot',
      placedAt: '26 Oct • 09:04',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'COD'
    },
    {
      id: 'ord-3',
      orderNumber: '#CF-10480',
      customerName: 'Dilini Silva',
      customerPhone: '076 782 3145',
      customerAddress: 'Rajagiriya',
      items: [{ productTitle: 'Free-range eggs - 10 pack', quantity: 2, price: 650 }],
      totalAmount: 2750,
      status: 'ON_THE_WAY',
      deliveryType: 'Express 45 Min',
      placedAt: '26 Oct • 08:52',
      paymentMethod: 'Card Online',
      paymentStatus: 'PAID'
    },
    {
      id: 'ord-4',
      orderNumber: '#CF-10479',
      customerName: 'Amal Jayasinghe',
      customerPhone: '077 521 9340',
      customerAddress: 'Dehiwala',
      items: [{ productTitle: 'Bairaha Chicken Fillets (1kg)', quantity: 2, price: 1750 }],
      totalAmount: 7120,
      status: 'DELIVERED',
      deliveryType: 'Evening Slot',
      placedAt: '26 Oct • 08:40',
      paymentMethod: 'Card Online',
      paymentStatus: 'PAID'
    },
    {
      id: 'ord-5',
      orderNumber: '#CF-10475',
      customerName: 'Chamath Rodrigo',
      customerPhone: '076 456 7812',
      customerAddress: 'Colombo 03',
      items: [{ productTitle: 'Organic kithul treacle 350ml', quantity: 3, price: 1250 }],
      totalAmount: 8920,
      status: 'DELIVERED',
      deliveryType: 'Morning Slot',
      placedAt: '25 Oct • 15:20',
      paymentMethod: 'Card Online',
      paymentStatus: 'PAID'
    }
  ];

  // Mock initial categories matching Image 5
  const sampleCategories = [
    { id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', count: 62, order: '01', visibility: 'Visible', updated: '24 Oct 2026', image: '/cat_fruits.jpg' },
    { id: 'cat-2', name: 'Rice & Grains', slug: 'rice-grains', count: 36, order: '02', visibility: 'Visible', updated: '24 Oct 2026', image: '/cat_pantry.jpg' },
    { id: 'cat-3', name: 'Dairy & Eggs', slug: 'dairy-eggs', count: 28, order: '03', visibility: 'Visible', updated: '23 Oct 2026', image: '/cat_dairy.jpg' },
    { id: 'cat-4', name: 'Meat & Seafood', slug: 'meat-seafood', count: 24, order: '04', visibility: 'Visible', updated: '23 Oct 2026', image: '/cat_meat.jpg' },
    { id: 'cat-5', name: 'Bakery', slug: 'bakery', count: 18, order: '05', visibility: 'Visible', updated: '22 Oct 2026', image: '/cat_bakery.jpg' },
    { id: 'cat-6', name: 'Pulses & Spices', slug: 'pulses-spices', count: 45, order: '06', visibility: 'Visible', updated: '22 Oct 2026', image: '/cat_pantry.jpg' },
    { id: 'cat-7', name: 'Beverages', slug: 'beverages', count: 23, order: '07', visibility: 'Visible', updated: '21 Oct 2026', image: '/cat_fruits.jpg' },
    { id: 'cat-8', name: 'Household', slug: 'household', count: 12, order: '08', visibility: 'Visible', updated: '20 Oct 2026', image: '/cat_vegetables.jpg' }
  ];

  // Mock stock adjustments matching Image 2
  const sampleAdjustments = [
    { id: 'adj-1', product: 'Samba rice 1kg', change: '+40 units', type: 'IN', reason: 'Stock received', ref: 'GRN-0264', updatedBy: 'Sahan De Silva', time: '26 Oct • 09:30' },
    { id: 'adj-2', product: 'Fresh coconuts', change: '-4 units', type: 'OUT', reason: 'Order fulfilment', ref: '#CF-10482', updatedBy: 'System', time: '26 Oct • 09:22' },
    { id: 'adj-3', product: 'Keells fresh milk 1L', change: '-2 units', type: 'OUT', reason: 'Order fulfilment', ref: '#CF-10482', updatedBy: 'System', time: '26 Oct • 09:15' }
  ];

  // Fetch live products & orders from server
  const fetchData = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setProducts(data.data);
        }
      })
      .catch(err => console.error(err));

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setOrders(data.data);
        } else {
          setOrders(sampleOrders);
        }
      })
      .catch(() => setOrders(sampleOrders));

    fetch('/api/admin/riders')
      .then(res => res.json())
      .then(data => { if (data.data) setRiders(data.data); })
      .catch(err => console.error(err));

    fetch('/api/admin/promotions')
      .then(res => res.json())
      .then(data => { if (data.data) setPromotions(data.data); })
      .catch(err => console.error(err));

    fetch('/api/admin/customers')
      .then(res => res.json())
      .then(data => { if (data.data) setCustomers(data.data); })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('ceylonfoods_admin_auth', 'true');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      // Fallback local auth
      if (loginEmail === 'admin@ceylonfoods.lk' && loginPassword === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('ceylonfoods_admin_auth', 'true');
      } else {
        setLoginError('Authentication failed.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ceylonfoods_admin_auth');
    localStorage.removeItem('freshcart_admin_auth');
    localStorage.removeItem('metrocery_admin_auth');
  };

  // Create Product Handler
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.data, ...prev]);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Restock product handler
  const handleRestockProduct = async (productId: string, quantity: number) => {
    try {
      const res = await fetch(`/api/admin/inventory/${productId}/restock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: data.data.stock } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update order status handler
  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Products
  const displayedProducts = products.length > 0 ? products : [
    { id: 'CF-RC-001', sku: 'CF-RC-001 • 1 kg', title: 'Samba rice 1kg', category: 'Rice & Grains', brand: 'Araliya', price: 640, stock: 126, store: 'Colombo', status: 'Active' as const, imageUrl: '/cat_pantry.jpg', aiFreshnessScore: 99, isOrganic: true, createdAt: '2026-10-26' },
    { id: 'CF-FR-002', sku: 'CF-FR-002 • Each', title: 'Fresh coconuts', category: 'Fruits & Vegetables', brand: 'Kurunegala Estate', price: 180, stock: 8, store: 'Colombo', status: 'Active' as const, imageUrl: '/cat_fruits.jpg', aiFreshnessScore: 98, isOrganic: true, createdAt: '2026-10-26' },
    { id: 'CF-DY-003', sku: 'CF-DY-003 • 1 L', title: 'Keells fresh milk 1L', category: 'Dairy & Eggs', brand: 'Keells Pure', price: 480, stock: 6, store: 'Colombo', status: 'Active' as const, imageUrl: '/cat_dairy.jpg', aiFreshnessScore: 97, isOrganic: false, createdAt: '2026-10-26' },
    { id: 'CF-PL-004', sku: 'CF-PL-004 • 1 kg', title: 'Red lentils 1kg', category: 'Pulses & Spices', brand: 'Ceylon Gold', price: 420, stock: 0, store: 'Colombo', status: 'Inactive' as const, imageUrl: '/cat_pantry.jpg', aiFreshnessScore: 96, isOrganic: true, createdAt: '2026-10-26' },
    { id: 'CF-PN-008', sku: 'CF-PN-008 • Bottle', title: 'Organic kithul treacle 350ml', category: 'Pantry', brand: 'Deniyaya Naturals', price: 1250, stock: 24, store: 'Colombo', status: 'Inactive' as const, imageUrl: '/cat_pantry.jpg', aiFreshnessScore: 98, isOrganic: true, createdAt: '2026-10-25' }
  ];

  // Filtered Inventory
  const displayedInventory = displayedProducts.filter(p => {
    if (inventoryTab === 'IN_STOCK') return p.stock >= 30;
    if (inventoryTab === 'LOW_STOCK') return p.stock > 0 && p.stock < 30;
    if (inventoryTab === 'OUT_OF_STOCK') return p.stock === 0;
    return true;
  });

  // =========================================================================
  // VIEW: SECURE ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#084435] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-emerald-900/30 space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/ceylon_foods_logo.png"
              alt="Ceylon Foods Logo"
              className="h-20 w-auto mx-auto object-contain filter drop-shadow-md mb-1"
            />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              ceylon foods
            </h1>
            <p className="text-[11px] font-bold tracking-widest text-[#0C6237] uppercase">
              FRESH. LOCAL. EVERYDAY.
            </p>
            <p className="text-xs text-slate-500 font-medium pt-1">
              Operations & Administration Workspace
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">Admin Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">Secure Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                {loginLoading ? <span>Authenticating...</span> : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#78F9B8]" />
                    <span>Access Operations Cockpit</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-slate-600 text-[11px] leading-relaxed">
              <span className="font-bold text-[#0C4E3B]">Default Credentials:</span><br />
              Email: <code className="font-bold text-slate-800">admin@ceylonfoods.lk</code><br />
              Password: <code className="font-bold text-slate-800">admin123</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: FULL OPERATIONS WORKSPACE (EXACT UPLOADED DESIGN)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-slate-800 antialiased">
      {/* 1. LEFT SIDEBAR (EXACT DARK FOREST GREEN SIDEBAR FROM MOCKUPS) */}
      <aside className="w-60 bg-[#084435] text-white flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Official Ceylon Foods Brand Logo (PRESERVED AS REQUESTED) */}
          <div className="px-5 py-5 flex items-center gap-3 border-b border-emerald-900/40">
            <img
              src="/ceylon_foods_logo.png"
              alt="Ceylon Foods Logo"
              className="h-10 w-auto object-contain filter drop-shadow"
            />
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight leading-none text-white">
                ceylon foods
              </span>
              <span className="text-[8px] font-bold tracking-widest text-[#78F9B8] uppercase mt-0.5">
                FRESH. LOCAL. EVERYDAY.
              </span>
            </div>
          </div>

          {/* Section: WORKSPACE */}
          <div className="p-3.5 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-300/50 px-3 py-1">
              WORKSPACE
            </p>

            {/* Menu Items matching Mockup */}
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'categories', label: 'Categories', icon: LayoutGrid },
              { id: 'inventory', label: 'Inventory', icon: Archive },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'promotions', label: 'Promotions', icon: Tag },
              { id: 'deliveries', label: 'Deliveries', icon: Truck },
              { id: 'reviews', label: 'Reviews', icon: MessageSquare },
              { id: 'reports', label: 'Reports', icon: TrendingUp },
              { id: 'staff', label: 'Staff & Permissions', icon: ShieldCheck },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#145C49] text-white shadow-sm font-extrabold'
                      : 'text-emerald-100/70 hover:text-white hover:bg-emerald-900/30'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar: Store Status Card & Logout Button */}
        <div className="p-4 space-y-3 border-t border-emerald-900/40">
          <div className="bg-[#053227] rounded-xl p-3 border border-emerald-800/40 text-xs">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Store is online</span>
            </div>
            <p className="text-[10px] text-emerald-300/70 pt-0.5 font-medium">
              Colombo fulfilment centre
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-200/80 hover:text-white hover:bg-emerald-900/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar matching Mockups */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between gap-6 shrink-0">
          {/* Page Title & Breadcrumb */}
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight capitalize">
              {activeMenu === 'dashboard' ? 'Dashboard' :
               activeMenu === 'orders' ? 'Order List' :
               activeMenu === 'products' ? 'Product List' :
               activeMenu === 'categories' ? 'Categories' :
               activeMenu === 'inventory' ? 'Inventory' :
               activeMenu === 'deliveries' ? 'Deliveries' :
               activeMenu === 'promotions' ? 'Promotions' :
               activeMenu === 'reports' ? 'Reports & insights' :
               activeMenu === 'staff' ? 'Staff & permissions' :
               activeMenu === 'settings' ? 'Settings' :
               activeMenu === 'reviews' ? 'Reviews & ratings' :
               activeMenu === 'customers' ? 'Customer Accounts' :
               activeMenu}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Ceylon Foods / Administration
            </p>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            {/* Search Input with ⌘ K shortcut */}
            <div className="relative w-64 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                ⌘ K
              </span>
            </div>

            {/* Date Range Pill */}
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>01 – 26 Oct 2026</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#E5EFE7] text-[#0C4E3B] font-black text-xs flex items-center justify-center">
                NP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-black text-slate-900 leading-tight">Nimali Perera</span>
                <span className="text-[10px] text-slate-400 font-medium">Administrator</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 p-8 overflow-y-auto space-y-6">

          {/* =========================================================================
              VIEW 1: DASHBOARD (EXACT IMAGE 1 RECREATION)
          ========================================================================= */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header with Title & Export Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
                    YOUR STORE AT A GLANCE
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Good morning, Admin!
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Here's what's happening at Ceylon Foods today, Monday, 26 October.
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2 transition active:scale-95">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export overview</span>
                </button>
              </div>

              {/* 6 Metric Cards matching Image 1 */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {/* 1. Total Sales */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total Sales</span>
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">8,462,850</h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    LKR • <span className="text-[#0C6237] font-bold">↑ 12.8%</span> vs last month
                  </p>
                </div>

                {/* 2. Total Orders */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total Orders</span>
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">1,284</h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    <span className="text-[#0C6237] font-bold">↑ 8.2%</span> vs last month
                  </p>
                </div>

                {/* 3. Pending Orders */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Pending Orders</span>
                    <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">18</h3>
                  <p className="text-[11px] text-orange-600 font-bold">
                    6 awaiting payment
                  </p>
                </div>

                {/* 4. Total Products */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total Products</span>
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <Package className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">248</h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Across 8 categories
                  </p>
                </div>

                {/* 5. Low-Stock Products */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Low-Stock Products</span>
                    <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">12</h3>
                  <p className="text-[11px] text-red-600 font-bold">
                    3 products out of stock
                  </p>
                </div>

                {/* 6. Total Customers */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total Customers</span>
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">3,862</h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    <span className="text-[#0C6237] font-bold">↑ 164 new</span> this month
                  </p>
                </div>
              </div>

              {/* Middle Grid: Sales overview (left) + Order status donut (right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Sales overview Card (7 cols) */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-base text-slate-900">Sales overview</h4>
                      <p className="text-xs text-slate-400 font-medium">Revenue in LKR • 01-26 October 2026</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                      <span>This month</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-slate-900">LKR 8,462,850</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#E6F7EF] text-[#0C6237]">
                      ↑ 12.8% growth
                    </span>
                  </div>

                  {/* SVG Spline Chart */}
                  <div className="h-44 w-full pt-4">
                    <svg viewBox="0 0 700 160" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0C6237" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0C6237" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="40" y1="20" x2="680" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="60" x2="680" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="100" x2="680" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="140" x2="680" y2="140" stroke="#F1F5F9" strokeWidth="1" />

                      {/* Area Fill */}
                      <path
                        d="M 40 145 C 90 140, 110 110, 150 110 C 190 110, 220 135, 260 120 C 300 100, 330 80, 380 60 C 430 70, 460 90, 500 70 C 540 50, 580 40, 620 45 C 650 50, 670 40, 680 35 L 680 145 L 40 145 Z"
                        fill="url(#salesGrad)"
                      />

                      {/* Spline Wave Line */}
                      <path
                        d="M 40 145 C 90 140, 110 110, 150 110 C 190 110, 220 135, 260 120 C 300 100, 330 80, 380 60 C 430 70, 460 90, 500 70 C 540 50, 580 40, 620 45 C 650 50, 670 40, 680 35"
                        fill="none"
                        stroke="#0C6237"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="flex justify-between text-[10px] font-bold text-slate-400 px-6 pt-1">
                      <span>01 Oct</span>
                      <span>05 Oct</span>
                      <span>10 Oct</span>
                      <span>15 Oct</span>
                      <span>20 Oct</span>
                      <span>26 Oct</span>
                    </div>
                  </div>
                </div>

                {/* Order status Donut Card (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-black text-base text-slate-900">Order status</h4>
                    <p className="text-xs text-slate-400 font-medium">1,284 orders this month</p>
                  </div>

                  {/* Donut and Legend */}
                  <div className="flex items-center gap-6 my-auto">
                    {/* Donut */}
                    <div className="relative w-32 h-32 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#0C6237" strokeWidth="4" strokeDasharray="85 100" strokeDashoffset="0" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="7 100" strokeDashoffset="-86" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-slate-900 leading-none">85.4%</span>
                        <span className="text-[10px] text-slate-400 font-semibold">delivered</span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-1.5 text-xs font-semibold text-slate-600 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0C6237]"></span>Delivered</span>
                        <span className="font-bold text-slate-900">1,096</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600"></span>Processing</span>
                        <span className="font-bold text-slate-900">92</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span>Dispatched</span>
                        <span className="font-bold text-slate-900">54</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Pending</span>
                        <span className="font-bold text-slate-900">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span>Cancelled</span>
                        <span className="font-bold text-slate-900">24</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] font-bold text-[#0C6237] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>96.8% delivered on time</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table Card matching Image 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">Recent orders</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">1284</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Updated today, 09:42 AM</span>
                </div>

                {/* Filter Toolbar */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search order or customer..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>All statuses</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Today</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Placed at</th>
                        <th className="py-2.5 px-3">Total (LKR)</th>
                        <th className="py-2.5 px-3">Payment</th>
                        <th className="py-2.5 px-3">Order status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {sampleOrders.slice(0, 4).map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3 font-bold text-slate-900">{o.orderNumber}</td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900">{o.customerName}</p>
                            <p className="text-[11px] text-slate-400">{o.customerAddress}</p>
                          </td>
                          <td className="py-3 px-3 text-slate-500">{o.placedAt}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{o.totalAmount.toLocaleString()}.00</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                              o.paymentStatus === 'PAID' ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {o.paymentStatus === 'PAID' ? 'Paid' : 'COD'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                              o.status === 'DELIVERED' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              o.status === 'PROCESSING' ? 'bg-[#FEF3EC] text-[#D96528]' :
                              o.status === 'ON_THE_WAY' ? 'bg-sky-50 text-sky-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {o.status === 'ON_THE_WAY' ? 'Dispatched' : o.status.charAt(0) + o.status.slice(1).toLowerCase()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-4 of 1284 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 321</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Low-stock alerts (left) + Best sellers (right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Low-stock alerts */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-base text-slate-900">Low-stock alerts</h4>
                      <p className="text-xs text-slate-400 font-medium">12 products need replenishment</p>
                    </div>
                    <button onClick={() => setActiveMenu('inventory')} className="text-xs font-bold text-[#0C6237] hover:underline flex items-center gap-1">
                      <span>View inventory</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Fresh coconuts', left: 8, target: 30, status: 'Low stock', color: 'bg-amber-50 text-amber-700' },
                      { name: 'Keells fresh milk 1L', left: 6, target: 20, status: 'Low stock', color: 'bg-amber-50 text-amber-700' },
                      { name: 'Red lentils 1kg', left: 0, target: 25, status: 'Out of stock', color: 'bg-red-50 text-red-700' }
                    ].map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                            <Package className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{p.name}</p>
                            <p className="text-[11px] text-slate-400">{p.left} left • target {p.target}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${p.color}`}>
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best sellers */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-base text-slate-900">Best sellers</h4>
                      <p className="text-xs text-slate-400 font-medium">Top products by revenue this month</p>
                    </div>
                    <button className="text-xs font-bold text-[#0C6237] hover:underline flex items-center gap-1">
                      <span>View report</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Samba rice 1kg', units: '842 units', revenue: 'LKR 538,880' },
                      { name: 'Fresh coconuts', units: '1,240 units', revenue: 'LKR 223,200' },
                      { name: 'Keells fresh milk 1L', units: '426 units', revenue: 'LKR 204,480' }
                    ].map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{p.name}</p>
                            <p className="text-[11px] text-slate-400">{p.units}</p>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-slate-900">{p.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: INVENTORY (EXACT IMAGE 2 RECREATION)
          ========================================================================= */}
          {activeMenu === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
                    STOCK CONTROL
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Inventory
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    A clear view of what's available, running low and ready to replenish.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2 transition">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export stock</span>
                  </button>
                  <button
                    onClick={() => setIsAdjustStockModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-md flex items-center gap-2 transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adjust stock</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards matching Image 2 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Tracked products</span>
                    <Archive className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">248</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Colombo fulfilment centre</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>In stock</span>
                    <Package className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">233</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Above minimum stock target</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Low stock</span>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">12</h3>
                  <p className="text-[11px] text-amber-600 font-bold">Below minimum stock target</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Out of stock</span>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">3</h3>
                  <p className="text-[11px] text-red-600 font-bold">Restocking required</p>
                </div>
              </div>

              {/* 15 Products Alert Banner */}
              <div className="p-4 rounded-2xl bg-[#FEF3EC] border border-[#FCD9C2] flex items-center gap-3 text-xs text-slate-700">
                <AlertTriangle className="w-4 h-4 text-[#D96528] shrink-0" />
                <p>
                  <strong className="text-slate-900 font-bold">15 products need your attention:</strong> 12 low-stock and 3 out-of-stock products. Review shortages and record incoming stock.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500">
                {[
                  { id: 'ALL', label: 'All stock (248)' },
                  { id: 'IN_STOCK', label: 'In Stock (233)' },
                  { id: 'LOW_STOCK', label: 'Low Stock (12)' },
                  { id: 'OUT_OF_STOCK', label: 'Out of Stock (3)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setInventoryTab(tab.id as any)}
                    className={`pb-2.5 transition relative ${
                      inventoryTab === tab.id ? 'text-[#0C4E3B] font-black border-b-2 border-[#0C4E3B]' : 'hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Stock Register Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">Stock register</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">248</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Updated today, 09:42 AM</span>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search product or SKU..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>All categories</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Stock health</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Stock Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Product / SKU</th>
                        <th className="py-2.5 px-3">Current Quantity</th>
                        <th className="py-2.5 px-3">Minimum Target</th>
                        <th className="py-2.5 px-3">Shortage</th>
                        <th className="py-2.5 px-3">Stock Health</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Last updated</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {[
                        { title: 'Samba rice 1kg', sku: 'CF-RC-001', qty: 126, min: 40, shortage: 0, health: 'Healthy', healthCol: 'bg-[#E6F7EF] text-[#0C6237]', status: 'In Stock', updated: '26 Oct • 09:30' },
                        { title: 'Fresh coconuts', sku: 'CF-FR-002', qty: 8, min: 30, shortage: 22, health: 'Low', healthCol: 'bg-[#FEF3EC] text-[#D96528]', status: 'Low Stock', updated: '26 Oct • 09:22' },
                        { title: 'Keells fresh milk 1L', sku: 'CF-DY-003', qty: 6, min: 20, shortage: 14, health: 'Low', healthCol: 'bg-[#FEF3EC] text-[#D96528]', status: 'Low Stock', updated: '26 Oct • 09:15' },
                        { title: 'Red lentils 1kg', sku: 'CF-PL-004', qty: 0, min: 25, shortage: 25, health: 'Critical', healthCol: 'bg-red-50 text-red-700', status: 'Out of Stock', updated: '26 Oct • 08:45' },
                        { title: 'Free-range eggs - 10 pack', sku: 'CF-DY-006', qty: 42, min: 15, shortage: 0, health: 'Healthy', healthCol: 'bg-[#E6F7EF] text-[#0C6237]', status: 'In Stock', updated: '25 Oct • 15:10' }
                      ].map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900">{p.title}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{p.sku}</p>
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-900">{p.qty}</td>
                          <td className="py-3 px-3 text-slate-600">{p.min}</td>
                          <td className="py-3 px-3 text-slate-600">{p.shortage}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${p.healthCol}`}>
                              {p.health}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{p.status}</td>
                          <td className="py-3 px-3 text-slate-400">{p.updated}</td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-5 of 248 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 50</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>

              {/* Adjustment History Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">Adjustment history</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">186</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Every stock movement is recorded for your team.</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search product or reference..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>All adjustments</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">Adjustment</th>
                        <th className="py-2.5 px-3">Reason</th>
                        <th className="py-2.5 px-3">Reference</th>
                        <th className="py-2.5 px-3">Updated by</th>
                        <th className="py-2.5 px-3">Date & time</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {sampleAdjustments.map((a, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3 font-bold text-slate-900">{a.product}</td>
                          <td className="py-3 px-3 font-bold">
                            <span className={a.type === 'IN' ? 'text-[#0C6237]' : 'text-slate-800'}>{a.change}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{a.reason}</td>
                          <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{a.ref}</td>
                          <td className="py-3 px-3 text-slate-600">{a.updatedBy}</td>
                          <td className="py-3 px-3 text-slate-400">{a.time}</td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-3 of 186 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 62</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: ORDERS (EXACT IMAGE 3 RECREATION)
          ========================================================================= */}
          {activeMenu === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
                    ORDER MANAGEMENT
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Orders
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    From checkout to doorstep, keep every order moving.
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2 transition active:scale-95">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export orders</span>
                </button>
              </div>

              {/* 4 Metric Cards matching Image 3 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">1,284</h3>
                  <p className="text-[11px] text-slate-400 font-medium">01-26 October 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Awaiting action</span>
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">18</h3>
                  <p className="text-[11px] text-orange-600 font-bold">6 awaiting payment</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Processing</span>
                    <Package className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">92</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Being picked and packed</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Dispatched</span>
                    <Truck className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">54</h3>
                  <p className="text-[11px] text-slate-400 font-medium">On the way to customers</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500">
                {[
                  { id: 'ALL', label: 'All orders' },
                  { id: 'PENDING', label: 'Pending (18)' },
                  { id: 'PROCESSING', label: 'Processing (92)' },
                  { id: 'DISPATCHED', label: 'Dispatched (54)' },
                  { id: 'DELIVERED', label: 'Delivered (1,096)' },
                  { id: 'CANCELLED', label: 'Cancelled (24)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setOrdersTab(tab.id as any)}
                    className={`pb-2.5 transition relative ${
                      ordersTab === tab.id ? 'text-[#0C4E3B] font-black border-b-2 border-[#0C4E3B]' : 'hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Order Register Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">Order register</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">1284</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Updated today, 09:42 AM</span>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search order ID or customer..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Payment status</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Delivery area</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>More filters</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Date & time</th>
                        <th className="py-2.5 px-3">Total (LKR)</th>
                        <th className="py-2.5 px-3">Payment</th>
                        <th className="py-2.5 px-3">Order status</th>
                        <th className="py-2.5 px-3">Delivery</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {sampleOrders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3 font-bold text-slate-900">{o.orderNumber}</td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900">{o.customerName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{o.customerPhone}</p>
                          </td>
                          <td className="py-3 px-3 text-slate-500">{o.placedAt}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{o.totalAmount.toLocaleString()}.00</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                              o.paymentStatus === 'PAID' ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {o.paymentStatus === 'PAID' ? 'Paid' : 'COD'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                              o.status === 'DELIVERED' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              o.status === 'PROCESSING' ? 'bg-[#FEF3EC] text-[#D96528]' :
                              o.status === 'ON_THE_WAY' ? 'bg-sky-50 text-sky-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {o.status === 'ON_THE_WAY' ? 'Dispatched' : o.status.charAt(0) + o.status.slice(1).toLowerCase()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{o.customerAddress}</td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-5 of 1284 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 257</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: PRODUCTS (EXACT IMAGE 4 RECREATION)
          ========================================================================= */}
          {activeMenu === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
                    CATALOG MANAGEMENT
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Products
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Keep your grocery catalog fresh, accurate and ready to shop.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import products</span>
                  </button>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-md flex items-center gap-2 transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add product</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards matching Image 4 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total products</span>
                    <Package className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">248</h3>
                  <p className="text-[11px] text-slate-400 font-medium">8 grocery categories</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Available online</span>
                    <CheckCircle className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">232</h3>
                  <p className="text-[11px] text-slate-400 font-medium">93.5% of catalog</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Draft products</span>
                    <Layers className="w-4 h-4 text-slate-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">13</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Not visible in storefront</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Out of stock</span>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">3</h3>
                  <p className="text-[11px] text-red-600 font-bold">Restock to resume sales</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500">
                {[
                  { id: 'ALL', label: 'All products (248)' },
                  { id: 'AVAILABLE', label: 'Available (232)' },
                  { id: 'DRAFTS', label: 'Drafts (13)' },
                  { id: 'OUT_OF_STOCK', label: 'Out of stock (3)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setProductsTab(tab.id as any)}
                    className={`pb-2.5 transition relative ${
                      productsTab === tab.id ? 'text-[#0C4E3B] font-black border-b-2 border-[#0C4E3B]' : 'hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Product Catalog Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">Product catalog</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">248</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Updated today, 09:42 AM</span>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, SKU or barcode..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>All categories</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Availability</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>More filters</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Price (LKR)</th>
                        <th className="py-2.5 px-3">Discount</th>
                        <th className="py-2.5 px-3">Stock</th>
                        <th className="py-2.5 px-3">Availability</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {displayedProducts.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900">{p.title}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{p.sku}</p>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{p.category}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{p.price.toFixed(2)}</td>
                          <td className="py-3 px-3 text-slate-400">—</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{p.stock} units</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                              p.stock > 0 && p.status === 'Active' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              p.stock === 0 ? 'bg-red-50 text-red-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {p.stock === 0 ? 'Out of stock' : p.status === 'Active' ? 'Available' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-5 of 248 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 50</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: CATEGORIES (EXACT IMAGE 5 RECREATION)
          ========================================================================= */}
          {activeMenu === 'categories' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
                    CATALOG ORGANISATION
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Categories
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    A well-organised store makes everyday shopping effortless.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-md flex items-center gap-2 transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add category</span>
                </button>
              </div>

              {/* 4 Photographic Category Cards matching Image 5 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sampleCategories.slice(0, 4).map(c => (
                  <div key={c.id} className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm flex flex-col justify-between">
                    <div className="h-28 overflow-hidden bg-slate-100">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-4 space-y-0.5">
                      <h4 className="font-black text-sm text-slate-900">{c.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{c.count} products • Visible in store</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Categories Table Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">All categories</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">8</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Updated today, 09:42 AM</span>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>All statuses</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <span>Sort: Display order</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3"><input type="checkbox" className="rounded" /></th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Slug</th>
                        <th className="py-2.5 px-3">Products</th>
                        <th className="py-2.5 px-3">Display order</th>
                        <th className="py-2.5 px-3">Visibility</th>
                        <th className="py-2.5 px-3">Last updated</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {sampleCategories.slice(0, 5).map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3 px-3 font-bold text-slate-900">{c.name}</td>
                          <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{c.slug}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{c.count}</td>
                          <td className="py-3 px-3 text-slate-600 font-mono">{c.order}</td>
                          <td className="py-3 px-3">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                              {c.visibility}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-400">{c.updated}</td>
                          <td className="py-3 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1-5 of 8 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Previous</button>
                    <span className="font-bold text-slate-800">Page 1 of 2</span>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: CUSTOMERS
          ========================================================================= */}
                    {/* =========================================================================
              VIEW 6: CUSTOMER ACCOUNTS (ACTIVE)
          ========================================================================= */}
          {activeMenu === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Customer Management</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Customer Directory</h2>
                  <p className="text-xs text-slate-500 font-medium">Registered Sri Lankan retail & enterprise shoppers.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-xs transition">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export list</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Total customers</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">3,862</p>
                  <p className="text-[11px] font-bold text-emerald-600">↑ 164 new this month</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Loyalty VIPs</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">1,248</p>
                  <p className="text-[11px] font-bold text-slate-500">Gold & Platinum members</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Avg. customer spend</span>
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">LKR 42,500</p>
                  <p className="text-[11px] font-bold text-emerald-600">↑ 14.8% lifetime avg</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Repeat purchase rate</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">64.2%</p>
                  <p className="text-[11px] font-bold text-purple-600">4.1 pp above benchmark</p>
                </div>
              </div>

              {/* Customers Register */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Shopper accounts</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">3,862</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search customer name, email or phone..."
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                      <option>All tiers</option>
                      <option>Platinum</option>
                      <option>Gold</option>
                      <option>Silver</option>
                      <option>Bronze</option>
                    </select>

                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">CUSTOMER</th>
                        <th className="py-3 px-3">EMAIL & PHONE</th>
                        <th className="py-3 px-3">DELIVERY AREA</th>
                        <th className="py-3 px-3">TIER</th>
                        <th className="py-3 px-3">TOTAL ORDERS</th>
                        <th className="py-3 px-3">LIFETIME SPEND</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'Kavindi Perera', email: 'kavindi@example.com', phone: '077 234 5678', area: 'Colombo 05', tier: 'Platinum', orders: 28, spent: '124,500', status: 'Active' },
                        { name: 'Nuwan Fernando', email: 'nuwan@example.com', phone: '071 845 2361', area: 'Nugegoda', tier: 'Gold', orders: 19, spent: '78,200', status: 'Active' },
                        { name: 'Dilini Silva', email: 'dilini@example.com', phone: '076 782 3145', area: 'Rajagiriya', tier: 'Platinum', orders: 34, spent: '168,900', status: 'Active' },
                        { name: 'Amal Jayasinghe', email: 'amal@example.com', phone: '077 521 9340', area: 'Dehiwala', tier: 'Silver', orders: 12, spent: '36,400', status: 'Active' },
                        { name: 'Anjali Peiris', email: 'anjali@example.com', phone: '077 382 9416', area: 'Nugegoda', tier: 'Gold', orders: 22, spent: '89,750', status: 'Active' }
                      ].map((c, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0C6237] font-black text-xs flex items-center justify-center">
                                {c.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-extrabold text-slate-900">{c.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <p className="font-medium text-slate-700">{c.email}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{c.phone}</p>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">{c.area}</td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              c.tier === 'Platinum' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                              c.tier === 'Gold' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {c.tier}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{c.orders}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">LKR {c.spent}</td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–5 of 3,862 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 773</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PROMOTIONS & VOUCHERS (EXACT ATTACHMENT 2 MATCH)
          ========================================================================= */}
          {activeMenu === 'promotions' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Offers & Campaigns</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Promotions</h2>
                  <p className="text-xs text-slate-500 font-medium">Create thoughtful offers that bring more value to every basket.</p>
                </div>
                <button
                  onClick={() => setIsCreatePromoModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create promotion</span>
                </button>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Active promotions</span>
                    <Tag className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">3</p>
                  <p className="text-[11px] font-bold text-slate-500">2 more scheduled</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Redemptions</span>
                    <Ticket className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">186</p>
                  <p className="text-[11px] font-bold text-slate-500">01–26 October 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Discounts given</span>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">74,580</p>
                  <p className="text-[11px] font-bold text-slate-500">LKR this month</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Attributed sales</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">624,500</p>
                  <p className="text-[11px] font-bold text-slate-500">LKR from promoted orders</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
                <button
                  onClick={() => setPromotionsTab('ALL')}
                  className={`pb-3 transition relative ${promotionsTab === 'ALL' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  All promotions (6)
                </button>
                <button
                  onClick={() => setPromotionsTab('ACTIVE')}
                  className={`pb-3 transition relative ${promotionsTab === 'ACTIVE' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Active (3)
                </button>
                <button
                  onClick={() => setPromotionsTab('SCHEDULED')}
                  className={`pb-3 transition relative ${promotionsTab === 'SCHEDULED' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Scheduled (2)
                </button>
                <button
                  onClick={() => setPromotionsTab('EXPIRED')}
                  className={`pb-3 transition relative ${promotionsTab === 'EXPIRED' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Expired (1)
                </button>
              </div>

              {/* Promotion Register Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Promotion register</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">6</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search campaign or code..."
                      value={promotionsSearch}
                      onChange={(e) => setPromotionsSearch(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={promotionsTypeFilter}
                      onChange={(e) => setPromotionsTypeFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="ALL">All types</option>
                      <option value="PERCENTAGE">Percentage off</option>
                      <option value="FIXED">Fixed discount</option>
                      <option value="FREE_DELIVERY">Free delivery</option>
                    </select>

                    <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                      <option>All statuses</option>
                      <option>Active</option>
                      <option>Scheduled</option>
                      <option>Expired</option>
                    </select>

                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">PROMOTION</th>
                        <th className="py-3 px-3">OFFER</th>
                        <th className="py-3 px-3">PROMOTION DATES</th>
                        <th className="py-3 px-3">USAGE</th>
                        <th className="py-3 px-3">MINIMUM BASKET</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {promotionsRegister.map((promo) => (
                        <tr key={promo.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3">
                            <p className="font-extrabold text-slate-900">{promo.name}</p>
                            <p className="text-[11px] font-mono text-slate-400">Code: {promo.code}</p>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{promo.offer}</td>
                          <td className="py-3.5 px-3 font-medium text-slate-500">{promo.dates}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{promo.usage}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{promo.minBasket}</td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              promo.status === 'Active' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              promo.status === 'Scheduled' ? 'bg-[#FEF3EC] text-[#D96528]' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {promo.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–5 of 6 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 2</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50">Next</button>
                  </div>
                </div>
              </div>

              {/* Bottom Section: 2 Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Promotion rules */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Promotion rules</h3>
                    <p className="text-xs text-slate-500 font-medium">Consistent offers, fewer surprises.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Prevent coupon stacking</p>
                        <p className="text-[11px] text-slate-400">Allow one coupon per order.</p>
                      </div>
                      <button
                        onClick={() => setPreventCouponStacking(!preventCouponStacking)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          preventCouponStacking ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            preventCouponStacking ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Exclude delivery fees from discounts</p>
                        <p className="text-[11px] text-slate-400">Product discounts apply to the basket subtotal.</p>
                      </div>
                      <button
                        onClick={() => setExcludeDeliveryFees(!excludeDeliveryFees)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          excludeDeliveryFees ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            excludeDeliveryFees ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Next scheduled campaign */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-slate-900">Next scheduled campaign</h3>
                    <button className="text-xs font-bold text-[#0C4E3B] hover:underline flex items-center gap-1">
                      <span>View campaign</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900">Weekend harvest</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FEF3EC] text-[#D96528]">Scheduled</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">15% off fresh vegetables • 31 Oct – 01 Nov 2026</p>
                    <p className="text-[11px] text-slate-400 font-medium">Starts Saturday at 12:00 AM • Sri Lanka time</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 8: DELIVERIES (EXACT ATTACHMENT 1 MATCH)
          ========================================================================= */}
          {activeMenu === 'deliveries' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Last-Mile Operations</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Deliveries</h2>
                  <p className="text-xs text-slate-500 font-medium">Plan the day's routes and get fresh groceries to every doorstep.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-xs transition">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export manifest</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDeliveryOrder(deliveriesList.find(d => d.status === 'Unassigned') || deliveriesList[0]);
                      setIsAssignDeliveryModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Assign delivery</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Today's deliveries</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">86</p>
                  <p className="text-[11px] font-bold text-slate-500">26 October 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Awaiting assignment</span>
                    <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <UserPlus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">8</p>
                  <p className="text-[11px] font-bold text-orange-600">Ready to be allocated</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">On the road</span>
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">24</p>
                  <p className="text-[11px] font-bold text-slate-500">Across 6 active riders</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Delivered today</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">54</p>
                  <p className="text-[11px] font-bold text-emerald-600">97.1% on-time delivery</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
                <button
                  onClick={() => setDeliveriesTab('TODAY')}
                  className={`pb-3 transition relative ${deliveriesTab === 'TODAY' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Today (86)
                </button>
                <button
                  onClick={() => setDeliveriesTab('UNASSIGNED')}
                  className={`pb-3 transition relative ${deliveriesTab === 'UNASSIGNED' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Unassigned (8)
                </button>
                <button
                  onClick={() => setDeliveriesTab('OUT_FOR_DELIVERY')}
                  className={`pb-3 transition relative ${deliveriesTab === 'OUT_FOR_DELIVERY' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Out for delivery (24)
                </button>
                <button
                  onClick={() => setDeliveriesTab('DELIVERED')}
                  className={`pb-3 transition relative ${deliveriesTab === 'DELIVERED' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Delivered (54)
                </button>
              </div>

              {/* Delivery Schedule Table */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Delivery schedule</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">86</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search order, customer or rider..."
                      value={deliverySearch}
                      onChange={(e) => setDeliverySearch(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={deliveryRiderFilter}
                      onChange={(e) => setDeliveryRiderFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="ALL">All riders</option>
                      <option value="Kasun Madushanka">Kasun Madushanka</option>
                      <option value="Dinesh Kumara">Dinesh Kumara</option>
                      <option value="Pradeep Silva">Pradeep Silva</option>
                    </select>

                    <select
                      value={deliveryZoneFilter}
                      onChange={(e) => setDeliveryZoneFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="ALL">Delivery zone</option>
                      <option value="Colombo 05">Colombo 05</option>
                      <option value="Nugegoda">Nugegoda</option>
                      <option value="Rajagiriya">Rajagiriya</option>
                      <option value="Dehiwala">Dehiwala</option>
                    </select>

                    <select
                      value={deliveryStatusFilter}
                      onChange={(e) => setDeliveryStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="ALL">All statuses</option>
                      <option value="Unassigned">Unassigned</option>
                      <option value="On the road">On the road</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">ORDER / CUSTOMER</th>
                        <th className="py-3 px-3">DELIVERY ADDRESS</th>
                        <th className="py-3 px-3">TIME WINDOW</th>
                        <th className="py-3 px-3">ASSIGNED RIDER</th>
                        <th className="py-3 px-3">PAYMENT</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {deliveriesList
                        .filter(d => {
                          if (deliveriesTab === 'UNASSIGNED') return d.status === 'Unassigned';
                          if (deliveriesTab === 'OUT_FOR_DELIVERY') return d.status === 'On the road';
                          if (deliveriesTab === 'DELIVERED') return d.status === 'Delivered';
                          return true;
                        })
                        .map((del) => (
                        <tr key={del.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3">
                            <p className="font-extrabold text-slate-900">{del.orderNumber} • {del.customerName}</p>
                            <p className="text-[11px] font-mono text-slate-400">{del.customerPhone}</p>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">{del.address}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{del.timeWindow}</td>
                          <td className="py-3.5 px-3">
                            {del.assignedRider === 'Unassigned' ? (
                              <button
                                onClick={() => {
                                  setSelectedDeliveryOrder(del);
                                  setIsAssignDeliveryModalOpen(true);
                                }}
                                className="text-orange-600 font-bold hover:underline"
                              >
                                Unassigned
                              </button>
                            ) : (
                              <span className="font-extrabold text-slate-900">{del.assignedRider}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{del.payment}</td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              del.status === 'Delivered' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              del.status === 'On the road' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                              'bg-[#FEF3EC] text-[#D96528]'
                            }`}>
                              {del.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–5 of 86 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 18</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50">Next</button>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Rider availability */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Rider availability</h3>
                    <p className="text-xs text-slate-400 font-medium">6 riders on duty today • 3 shown</p>
                  </div>
                  <button className="text-xs font-bold text-[#0C4E3B] hover:underline flex items-center gap-1">
                    <span>Manage delivery team</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0C4E3B] font-black text-xs flex items-center justify-center shrink-0">
                      KM
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">Kasun Madushanka</p>
                      <p className="text-[10px] text-slate-400">Colombo & Rajagiriya</p>
                      <p className="text-[11px] font-black text-emerald-700 mt-0.5">5 active deliveries</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0C4E3B] font-black text-xs flex items-center justify-center shrink-0">
                      DK
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">Dinesh Kumara</p>
                      <p className="text-[10px] text-slate-400">Dehiwala & Nugegoda</p>
                      <p className="text-[11px] font-black text-emerald-700 mt-0.5">4 active deliveries</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0C4E3B] font-black text-xs flex items-center justify-center shrink-0">
                      PS
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">Pradeep Silva</p>
                      <p className="text-[10px] text-slate-400">Colombo 03–07</p>
                      <p className="text-[11px] font-black text-emerald-700 mt-0.5">Available • 2 scheduled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 9: REPORTS & INSIGHTS (EXACT ATTACHMENT 3 MATCH)
          ========================================================================= */}
          {activeMenu === 'reports' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Business Intelligence</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reports & insights</h2>
                  <p className="text-xs text-slate-500 font-medium">Make confident decisions with a clear view of store performance.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-xs transition">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export CSV</span>
                  </button>
                  <button className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95">
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
                {['Sales overview', 'Products', 'Customers', 'Inventory', 'Delivery performance'].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReportsSubTab(tab.toUpperCase() as any)}
                    className={`pb-3 transition relative ${idx === 0 ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Net sales</span>
                    <CreditCard className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">8,462,850</p>
                  <p className="text-[11px] font-bold text-emerald-600">LKR • ↑ 12.8% vs September</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">1,284</p>
                  <p className="text-[11px] font-bold text-emerald-600">↑ 8.2% vs September</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Average order value</span>
                    <ShoppingBasket className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">6,591.00</p>
                  <p className="text-[11px] font-bold text-emerald-600">LKR • ↑ 4.3% vs September</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Returning customers</span>
                    <RefreshCw className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">64.2%</p>
                  <p className="text-[11px] font-bold text-emerald-600">↑ 4.1 percentage points</p>
                </div>
              </div>

              {/* Middle Section: Sales Trend & Category Share */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sales trend (8 cols) */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-slate-900">Sales trend</h3>
                      <p className="text-xs text-slate-400 font-medium">Daily revenue • LKR • 01–26 October 2026</p>
                    </div>
                    <select className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-[#0C6237] text-xs font-black">
                    <span className="px-1.5 py-0.5 rounded bg-white text-[10px]">October 2026</span>
                    <span>Average daily sales: LKR 325,494</span>
                  </div>

                  {/* Spline Chart */}
                  <div className="h-64 w-full pt-4">
                    <svg viewBox="0 0 700 240" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="reportsSpline" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0C6237" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0C6237" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="40" y1="40" x2="680" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="90" x2="680" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="140" x2="680" y2="140" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="40" y1="190" x2="680" y2="190" stroke="#F1F5F9" strokeWidth="1" />

                      <text x="10" y="45" fill="#94A3B8" fontSize="10" fontWeight="600">500k</text>
                      <text x="10" y="95" fill="#94A3B8" fontSize="10" fontWeight="600">375k</text>
                      <text x="10" y="145" fill="#94A3B8" fontSize="10" fontWeight="600">250k</text>
                      <text x="10" y="195" fill="#94A3B8" fontSize="10" fontWeight="600">125k</text>
                      <text x="25" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">0</text>

                      <path
                        d="M 50 200 C 100 170, 120 205, 170 170 C 220 135, 250 175, 300 145 C 350 115, 370 150, 420 120 C 470 90, 520 115, 570 80 C 620 60, 650 90, 680 75 L 680 230 L 50 230 Z"
                        fill="url(#reportsSpline)"
                      />
                      <path
                        d="M 50 200 C 100 170, 120 205, 170 170 C 220 135, 250 175, 300 145 C 350 115, 370 150, 420 120 C 470 90, 520 115, 570 80 C 620 60, 650 90, 680 75"
                        fill="none"
                        stroke="#0C6237"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <text x="50" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">01 Oct</text>
                      <text x="160" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">05 Oct</text>
                      <text x="290" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">10 Oct</text>
                      <text x="410" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">15 Oct</text>
                      <text x="540" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">20 Oct</text>
                      <text x="650" y="235" fill="#94A3B8" fontSize="10" fontWeight="600">26 Oct</text>
                    </svg>
                  </div>
                </div>

                {/* Sales by category (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Sales by category</h3>
                    <p className="text-xs text-slate-400 font-medium">Share of total revenue</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1">
                        <span className="text-slate-800">Fruits & Vegetables</span>
                        <span className="text-slate-900">26.4%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '26.4%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1">
                        <span className="text-slate-800">Rice & Grains</span>
                        <span className="text-slate-900">21.1%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '21.1%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1">
                        <span className="text-slate-800">Dairy & Eggs</span>
                        <span className="text-slate-900">15.0%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '15.0%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1">
                        <span className="text-slate-800">Meat & Seafood</span>
                        <span className="text-slate-900">12.0%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '12.0%' }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                    Other categories contribute 25.5% of sales.
                  </p>
                </div>
              </div>

              {/* Category performance table */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Category performance</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">8</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={reportsCategorySearch}
                      onChange={(e) => setReportsCategorySearch(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                      <option>All categories</option>
                      <option>Fruits & Vegetables</option>
                      <option>Rice & Grains</option>
                      <option>Dairy & Eggs</option>
                    </select>

                    <select
                      value={reportsCategorySort}
                      onChange={(e) => setReportsCategorySort(e.target.value as any)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="REVENUE">Sort: Revenue</option>
                      <option value="UNITS">Sort: Units sold</option>
                    </select>

                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">CATEGORY</th>
                        <th className="py-3 px-3">UNITS SOLD</th>
                        <th className="py-3 px-3">NET SALES (LKR)</th>
                        <th className="py-3 px-3">REVENUE SHARE</th>
                        <th className="py-3 px-3">VS LAST MONTH</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'Fruits & Vegetables', units: '6,840', sales: '2,234,200.00', share: '26.4%', trend: '↑ 16.2%', positive: true },
                        { name: 'Rice & Grains', units: '2,612', sales: '1,785,600.00', share: '21.1%', trend: '↑ 11.8%', positive: true },
                        { name: 'Dairy & Eggs', units: '2,184', sales: '1,269,450.00', share: '15.0%', trend: '↑ 9.4%', positive: true },
                        { name: 'Meat & Seafood', units: '985', sales: '1,015,200.00', share: '12.0%', trend: '↑ 14.1%', positive: true },
                        { name: 'Household', units: '486', sales: '253,800.00', share: '3.0%', trend: '↓ 2.1%', positive: false }
                      ].map((cat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{cat.name}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-700">{cat.units}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{cat.sales}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{cat.share}</td>
                          <td className={`py-3.5 px-3 font-extrabold ${cat.positive ? 'text-[#0C6237]' : 'text-red-600'}`}>
                            {cat.trend}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–5 of 8 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 2</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50">Next</button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
                  <span>Net sales exclude cancelled orders, refunds and delivery fees. Figures reflect the selected reporting period.</span>
                  <span>Last refreshed: 26 Oct 2026, 09:42 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 10: STAFF & PERMISSIONS (EXACT ATTACHMENT 4 MATCH)
          ========================================================================= */}
          {activeMenu === 'staff' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Team Management</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff & permissions</h2>
                  <p className="text-xs text-slate-500 font-medium">Give your team the right access to keep the store running smoothly.</p>
                </div>
                <button
                  onClick={() => setIsInviteStaffModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite staff</span>
                </button>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Team members</span>
                    <Users className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">12</p>
                  <p className="text-[11px] font-bold text-slate-500">Including administrators</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Active members</span>
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">10</p>
                  <p className="text-[11px] font-bold text-slate-500">2 invitations pending</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Permission roles</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">4</p>
                  <p className="text-[11px] font-bold text-slate-500">Role-based access</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Two-factor enabled</span>
                    <Lock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">8 / 10</p>
                  <p className="text-[11px] font-bold text-slate-500">Recommend for every active user</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
                <button
                  onClick={() => setStaffTab('MEMBERS')}
                  className={`pb-3 transition relative ${staffTab === 'MEMBERS' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Team members (12)
                </button>
                <button
                  onClick={() => setStaffTab('ROLES')}
                  className={`pb-3 transition relative ${staffTab === 'ROLES' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Roles & permissions
                </button>
                <button
                  onClick={() => setStaffTab('INVITATIONS')}
                  className={`pb-3 transition relative ${staffTab === 'INVITATIONS' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Pending invitations (2)
                </button>
                <button
                  onClick={() => setStaffTab('ACTIVITY')}
                  className={`pb-3 transition relative ${staffTab === 'ACTIVITY' ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                >
                  Activity log
                </button>
              </div>

              {/* Team directory table */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Team directory</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">12</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search staff name or email..."
                      value={staffSearch}
                      onChange={(e) => setStaffSearch(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">⌘ K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={staffRoleFilter}
                      onChange={(e) => setStaffRoleFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                    >
                      <option value="ALL">All roles</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="Catalog Editor">Catalog Editor</option>
                      <option value="Delivery Agent">Delivery Agent</option>
                    </select>

                    <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                      <option>All statuses</option>
                      <option>Active</option>
                      <option>Invited</option>
                    </select>

                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">TEAM MEMBER</th>
                        <th className="py-3 px-3">EMAIL</th>
                        <th className="py-3 px-3">ROLE</th>
                        <th className="py-3 px-3">LAST ACTIVE</th>
                        <th className="py-3 px-3">2FA</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffDirectory.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3">
                            <p className="font-extrabold text-slate-900">{st.name}</p>
                            <p className="text-[11px] text-slate-400">{st.roleSubtitle}</p>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">{st.email}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-800">{st.role}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-600">{st.lastActive}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{st.twoFactor}</td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              st.status === 'Active' ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-[#FEF3EC] text-[#D96528]'
                            }`}>
                              {st.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–5 of 12 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 3</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50">Next</button>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Role permissions matrix */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Role permissions</h3>
                    <p className="text-xs text-slate-400 font-medium">A concise overview of your access policy.</p>
                  </div>
                  <button className="text-xs font-bold text-[#0C4E3B] hover:underline flex items-center gap-1">
                    <span>Edit permissions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3">CAPABILITY</th>
                        <th className="py-3 px-3 text-center">ADMINISTRATOR</th>
                        <th className="py-3 px-3 text-center">MANAGER</th>
                        <th className="py-3 px-3 text-center">CATALOG EDITOR</th>
                        <th className="py-3 px-3 text-center">DELIVERY AGENT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {[
                        { cap: 'View dashboard & reports', admin: true, manager: true, editor: false, agent: false },
                        { cap: 'Manage products & inventory', admin: true, manager: true, editor: true, agent: false },
                        { cap: 'Manage orders & customers', admin: true, manager: true, editor: false, agent: false },
                        { cap: 'Update assigned deliveries', admin: true, manager: true, editor: false, agent: true },
                        { cap: 'Manage staff & store settings', admin: true, manager: false, editor: false, agent: false }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3 font-extrabold text-slate-900">{row.cap}</td>
                          <td className="py-3 px-3 text-center">
                            {row.admin ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {row.manager ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {row.editor ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {row.agent ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 11: SETTINGS (EXACT ATTACHMENT 5 MATCH)
          ========================================================================= */}
          {activeMenu === 'settings' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Store Configuration</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Settings</h2>
                  <p className="text-xs text-slate-500 font-medium">Manage your store identity, checkout and fulfillment preferences.</p>
                </div>
                <button
                  onClick={() => {
                    setSettingsSavedToast(true);
                    setTimeout(() => setSettingsSavedToast(false), 3000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save changes</span>
                </button>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
                {['Store settings', 'Notifications', 'Security', 'Integrations'].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSettingsTab(tab.toUpperCase().split(' ')[0] as any)}
                    className={`pb-3 transition relative ${idx === 0 ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid 2 Columns for Top 4 Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 1: Store Information */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Store information</h3>
                    <p className="text-xs text-slate-400 font-medium">The details shown on receipts and customer communications.</p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-[11px] font-black text-slate-700 block mb-1">Store name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Support email</label>
                        <input
                          type="email"
                          value={supportEmail}
                          onChange={(e) => setSupportEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Phone number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-slate-700 block mb-1">Store address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-slate-700 block mb-1">Storefront domain</label>
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Regional Preferences */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Regional preferences</h3>
                    <p className="text-xs text-slate-400 font-medium">Local defaults for your customers and operations.</p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Currency</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                        >
                          <option>LKR • Sri Lankan Rupee</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                        >
                          <option>Sri Lanka</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-slate-700 block mb-1">Time zone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                      >
                        <option>Asia/Colombo (UTC +05:30)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Opening time</label>
                        <select
                          value={openingTime}
                          onChange={(e) => setOpeningTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                        >
                          <option>08:00 AM</option>
                          <option>07:00 AM</option>
                          <option>09:00 AM</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Closing time</label>
                        <select
                          value={closingTime}
                          onChange={(e) => setClosingTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                        >
                          <option>08:00 PM</option>
                          <option>09:00 PM</option>
                          <option>10:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Store accepting orders</p>
                        <p className="text-[11px] text-slate-400">Turn off to temporarily pause checkout.</p>
                      </div>
                      <button
                        onClick={() => setIsAcceptingOrders(!isAcceptingOrders)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          isAcceptingOrders ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            isAcceptingOrders ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: Payment Settings */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-slate-900">Payment settings</h3>
                      <p className="text-xs text-slate-400 font-medium">Choose how customers pay at checkout.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="font-extrabold text-xs text-slate-900">PayHere payment gateway</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">Connected</span>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Credit & debit cards</p>
                        <p className="text-[11px] text-slate-400">Visa, Mastercard and local cards via PayHere.</p>
                      </div>
                      <button
                        onClick={() => setCardPaymentsEnabled(!cardPaymentsEnabled)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          cardPaymentsEnabled ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            cardPaymentsEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Cash on delivery</p>
                        <p className="text-[11px] text-slate-400">Collect payment when the order arrives.</p>
                      </div>
                      <button
                        onClick={() => setCodEnabled(!codEnabled)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          codEnabled ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            codEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Bank transfer</p>
                        <p className="text-[11px] text-slate-400">Requires manual payment verification.</p>
                      </div>
                      <button
                        onClick={() => setBankTransferEnabled(!bankTransferEnabled)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          bankTransferEnabled ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            bankTransferEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono pt-2">
                      Merchant ID: 12***754 • Live environment
                    </p>
                  </div>
                </div>

                {/* Card 4: Tax Settings */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Tax settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Configure tax collection for your store.</p>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Collect VAT</p>
                        <p className="text-[11px] text-slate-400">Currently off - Store is not VAT registered.</p>
                      </div>
                      <button
                        onClick={() => setCollectVat(!collectVat)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          collectVat ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            collectVat ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">Standard tax rate (%)</label>
                        <input
                          type="text"
                          value={standardTaxRate}
                          onChange={(e) => setStandardTaxRate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-700 block mb-1">VAT registration number</label>
                        <input
                          type="text"
                          value={vatRegNumber}
                          onChange={(e) => setVatRegNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">Prices include tax</p>
                        <p className="text-[11px] text-slate-400">Display the final price on product listings.</p>
                      </div>
                      <button
                        onClick={() => setPricesIncludeTax(!pricesIncludeTax)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          pricesIncludeTax ? 'bg-[#0C4E3B]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            pricesIncludeTax ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium pt-2">
                      No VAT is currently added to customer orders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5: Delivery Settings (Thresholds) */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h3 className="font-black text-base text-slate-900">Delivery settings</h3>
                  <p className="text-xs text-slate-400 font-medium">Set order thresholds and available delivery windows.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Minimum order (LKR)</label>
                    <input
                      type="text"
                      value={minOrderLkr}
                      onChange={(e) => setMinOrderLkr(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Free delivery above (LKR)</label>
                    <input
                      type="text"
                      value={freeDeliveryAboveLkr}
                      onChange={(e) => setFreeDeliveryAboveLkr(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Same-day order cutoff</label>
                    <select
                      value={sameDayCutoff}
                      onChange={(e) => setSameDayCutoff(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                    >
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Delivery window length</label>
                    <select
                      value={deliveryWindowLength}
                      onChange={(e) => setDeliveryWindowLength(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                    >
                      <option>3 hours</option>
                      <option>2 hours</option>
                      <option>4 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 6: Delivery Zones Table */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Delivery zones</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                    <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5 hover:bg-slate-50">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                        <th className="py-3 px-3 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-3">ZONE</th>
                        <th className="py-3 px-3">COVERAGE</th>
                        <th className="py-3 px-3">DELIVERY FEE (LKR)</th>
                        <th className="py-3 px-3">ESTIMATED DELIVERY</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {deliveryZones.map((z, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{z.zone}</td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">{z.coverage}</td>
                          <td className="py-3.5 px-3 font-extrabold text-slate-900">{z.fee}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{z.eta}</td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                              {z.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Showing 1–4 of 4 results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <span className="px-2 font-bold text-slate-700">Page 1 of 1</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold hover:bg-slate-50 disabled:opacity-50">Next</button>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Last saved 24 Oct 2026 at 04:20 PM by <strong className="text-slate-800">Nimali Perera</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  <button className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    Discard changes
                  </button>
                  <button
                    onClick={() => {
                      setSettingsSavedToast(true);
                      setTimeout(() => setSettingsSavedToast(false), 3000);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-sm transition active:scale-95"
                  >
                    Save changes
                  </button>
                </div>
              </div>

              {settingsSavedToast && (
                <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#0C4E3B] text-white shadow-xl flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-bold">Settings saved successfully!</span>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 12: CUSTOMER REVIEWS (ACTIVE)
          ========================================================================= */}
          {activeMenu === 'reviews' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Shopper Feedback</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reviews & ratings</h2>
                  <p className="text-xs text-slate-500 font-medium">Verified customer feedback and product sentiment analysis.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-xs transition">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export reviews</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Average rating</span>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">4.9 / 5.0</p>
                  <p className="text-[11px] font-bold text-emerald-600">Based on 842 ratings</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">5-Star reviews</span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">88.4%</p>
                  <p className="text-[11px] font-bold text-slate-500">744 glowing reviews</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Positive sentiment</span>
                    <Sparkles className="w-4 h-4 text-[#0C6237]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">96.8%</p>
                  <p className="text-[11px] font-bold text-emerald-600">AI sentiment score</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">Needs response</span>
                    <MessageSquare className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">2</p>
                  <p className="text-[11px] font-bold text-orange-600">Pending reply</p>
                </div>
              </div>

              {/* Reviews Register */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900">Verified shopper feedback</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black">4 shown</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Updated today, 09:42 AM</span>
                </div>

                <div className="space-y-4">
                  {customerReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900">{rev.customer}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Verified Buyer
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400">• {rev.date}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold text-[#0C6237] block mb-0.5">{rev.product}</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{rev.comment}</p>
                      </div>

                      {rev.reply && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200/60 text-xs">
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-1.5 mb-0.5">
                            <span className="w-2 h-2 rounded-full bg-[#0C6237]"></span>
                            <span>Ceylon Foods Response:</span>
                          </p>
                          <p className="text-slate-600 font-medium">{rev.reply}</p>
                        </div>
                      )}

                      {!rev.reply && (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Type official store response..."
                            value={replyInputs[rev.id] || ''}
                            onChange={(e) => setReplyInputs({ ...replyInputs, [rev.id]: e.target.value })}
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C4E3B]"
                          />
                          <button
                            onClick={() => {
                              if (replyInputs[rev.id]) {
                                setCustomerReviews(customerReviews.map(r => r.id === rev.id ? { ...r, reply: replyInputs[rev.id] } : r));
                                setReplyInputs({ ...replyInputs, [rev.id]: '' });
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#083b2d]"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
<footer className="pt-6 pb-2 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>© 2026 Ceylon Foods • Operations workspace</span>
            <span>All times in Sri Lanka Standard Time • LKR</span>
          </footer>
        </main>
      </div>

            {/* MODAL: ASSIGN DELIVERY */}
      {isAssignDeliveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="font-black text-base text-slate-900">Assign Delivery Order</h3>
                <p className="text-xs text-slate-400">Allocate order to on-duty delivery rider</p>
              </div>
              <button onClick={() => setIsAssignDeliveryModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {selectedDeliveryOrder && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex justify-between font-black text-slate-900">
                  <span>{selectedDeliveryOrder.orderNumber}</span>
                  <span className="text-[#0C6237]">{selectedDeliveryOrder.payment}</span>
                </div>
                <p className="text-slate-700 font-bold">{selectedDeliveryOrder.customerName} ({selectedDeliveryOrder.customerPhone})</p>
                <p className="text-slate-500">{selectedDeliveryOrder.address}</p>
                <p className="text-[11px] font-bold text-slate-600">Window: {selectedDeliveryOrder.timeWindow}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 block">Select Active Fleet Rider</label>
              <select
                value={deliveryRiderSelect}
                onChange={(e) => setDeliveryRiderSelect(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Kasun Madushanka">Kasun Madushanka (Colombo & Rajagiriya - 5 active)</option>
                <option value="Dinesh Kumara">Dinesh Kumara (Dehiwala & Nugegoda - 4 active)</option>
                <option value="Pradeep Silva">Pradeep Silva (Colombo 03-07 - Available)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsAssignDeliveryModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (selectedDeliveryOrder) {
                    setDeliveriesList(deliveriesList.map(d =>
                      d.id === selectedDeliveryOrder.id
                        ? { ...d, assignedRider: deliveryRiderSelect, status: 'On the road' }
                        : d
                    ));
                  }
                  setIsAssignDeliveryModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE PROMOTION */}
      {isCreatePromoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="font-black text-base text-slate-900">Create New Promotion</h3>
                <p className="text-xs text-slate-400">Launch a discount voucher or campaign</p>
              </div>
              <button onClick={() => setIsCreatePromoModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newPromoTitle && newPromoCode) {
                  setPromotionsRegister([
                    {
                      id: `promo-${Date.now()}`,
                      name: newPromoTitle,
                      code: newPromoCode.toUpperCase(),
                      offer: newPromoOffer || '10% off order',
                      dates: '26 Oct – 30 Nov 2026',
                      usage: '0 / 250',
                      minBasket: newPromoMin || 'LKR 3,000',
                      status: 'Active'
                    },
                    ...promotionsRegister
                  ]);
                  setNewPromoTitle('');
                  setNewPromoCode('');
                  setNewPromoOffer('');
                  setIsCreatePromoModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dambulla Harvest Special"
                  value={newPromoTitle}
                  onChange={(e) => setNewPromoTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Promo Code</label>
                <input
                  type="text"
                  placeholder="e.g. DAMBULLA15"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono font-bold uppercase focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Discount Offer</label>
                  <input
                    type="text"
                    placeholder="e.g. 15% • max LKR 750"
                    value={newPromoOffer}
                    onChange={(e) => setNewPromoOffer(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Minimum Basket</label>
                  <input
                    type="text"
                    placeholder="e.g. LKR 3,500"
                    value={newPromoMin}
                    onChange={(e) => setNewPromoMin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreatePromoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
                >
                  Publish Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INVITE STAFF */}
      {isInviteStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="font-black text-base text-slate-900">Invite Team Member</h3>
                <p className="text-xs text-slate-400">Grant role-based store access to staff</p>
              </div>
              <button onClick={() => setIsInviteStaffModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inviteName && inviteEmail) {
                  setStaffDirectory([
                    ...staffDirectory,
                    {
                      id: `st-${Date.now()}`,
                      name: inviteName,
                      roleSubtitle: 'Store team member',
                      email: inviteEmail,
                      role: inviteRole,
                      lastActive: 'Invitation sent',
                      twoFactor: '—',
                      status: 'Invited'
                    }
                  ]);
                  setInviteName('');
                  setInviteEmail('');
                  setIsInviteStaffModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Charith Asalanka"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. charith@ceylonfoods.lk"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                >
                  <option value="Administrator">Administrator (Full Access)</option>
                  <option value="Manager">Manager (Operations & Orders)</option>
                  <option value="Catalog Editor">Catalog Editor (Products & Pricing)</option>
                  <option value="Delivery Agent">Delivery Agent (Fleet Dispatch)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsInviteStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{/* MODAL: ADD PRODUCT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-black text-base text-slate-900">Add New Supermarket Item</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Fresh Navel Oranges (පැණි දොඩම්)"
                  className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#0C4E3B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs"
                  >
                    <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                    <option value="Rice & Grains">Rice & Grains</option>
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Meat & Seafood">Meat & Seafood</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Pantry">Pantry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="CF-OR-010"
                    className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0C4E3B] text-white font-bold text-xs shadow hover:bg-[#083b2d] transition"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADJUST STOCK */}
      {isAdjustStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-black text-base text-slate-900">Record Stock Adjustment</h3>
              <button onClick={() => setIsAdjustStockModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Select Item</label>
                <select className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs">
                  <option>Samba rice 1kg (CF-RC-001)</option>
                  <option>Fresh coconuts (CF-FR-002)</option>
                  <option>Keells fresh milk 1L (CF-DY-003)</option>
                  <option>Red lentils 1kg (CF-PL-004)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Quantity Change (+/-)</label>
                <input type="number" defaultValue={25} className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Reason</label>
                <select className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs">
                  <option>Stock received (Supplier Delivery)</option>
                  <option>Inventory Audit Correction</option>
                  <option>Damaged or Expired Goods</option>
                </select>
              </div>
              <button
                onClick={() => {
                  alert('Stock adjustment recorded successfully.');
                  setIsAdjustStockModalOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#0C4E3B] text-white font-bold text-xs shadow hover:bg-[#083b2d] transition"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
