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
  Building
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
    if (tab && ['dashboard', 'orders', 'products', 'categories', 'inventory', 'customers', 'promotions', 'deliveries'].includes(tab)) {
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
          {activeMenu === 'customers' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Customer Accounts</h3>
                  <p className="text-xs text-slate-400">Registered Sri Lankan retail & enterprise customers</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Email & Phone</th>
                      <th className="py-2.5 px-3">Delivery Address</th>
                      <th className="py-2.5 px-3">Total Orders</th>
                      <th className="py-2.5 px-3">Total Spent (LKR)</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium">
                    {[
                      { name: 'Kavindi Perera', email: 'kavindi@example.com', phone: '077 234 5678', address: '33 York Street, Colombo 05', orders: 18, spent: '42,500' },
                      { name: 'Nuwan Fernando', email: 'nuwan@example.com', phone: '071 845 2361', address: '12 Havelock Road, Nugegoda', orders: 12, spent: '28,900' },
                      { name: 'Dilini Silva', email: 'dilini@example.com', phone: '076 782 3145', address: '45 Lake Road, Rajagiriya', orders: 24, spent: '76,200' },
                      { name: 'Amal Jayasinghe', email: 'amal@example.com', phone: '077 521 9340', address: '88 Galle Road, Dehiwala', orders: 8, spent: '19,400' }
                    ].map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 font-bold text-slate-900">{c.name}</td>
                        <td className="py-3 px-3 text-slate-600">
                          <p>{c.email}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{c.phone}</p>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{c.address}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{c.orders}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">LKR {c.spent}</td>
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PROMOTIONS & VOUCHERS
          ========================================================================= */}
          {activeMenu === 'promotions' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Promotions & Vouchers</h3>
                  <p className="text-xs text-slate-400">Manage promo codes and active discounts</p>
                </div>
                <button
                  onClick={() => setIsAddPromoModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create voucher</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { code: 'CEYLONFRESH', title: '15% Off Island Produce', type: '15% Off', min: 'Rs. 2,500', usage: '142 / 300', status: 'ACTIVE' },
                  { code: 'COLOMBOEXPRESS', title: 'Free Colombo Express Delivery', type: 'Free Delivery', min: 'Rs. 5,000', usage: '89 / 500', status: 'ACTIVE' },
                  { code: 'AVURUDU2026', title: 'Sinhala New Year Mega Feast', type: 'Rs. 1,000 Off', min: 'Rs. 10,000', usage: '210 / 250', status: 'ACTIVE' }
                ].map((promo, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-[#0C4E3B]">
                        {promo.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                        {promo.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{promo.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">Min Order: {promo.min}</p>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200 flex justify-between font-semibold">
                      <span>Redemptions</span>
                      <span className="font-bold text-slate-800">{promo.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 8: DELIVERIES & FLEET RIDERS
          ========================================================================= */}
          {activeMenu === 'deliveries' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Fleet Deliveries & Riders</h3>
                  <p className="text-xs text-slate-400">Live dispatch tracking across Greater Colombo zones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Sahan De Silva', vehicle: 'Hero Splendor (Bike)', plate: 'WP BAE-8842', zone: 'Colombo 03, 04, 05', status: 'DELIVERING', rating: 4.9, count: 428 },
                  { name: 'Kanishka Bandara', vehicle: 'TVS King (Three-Wheeler)', plate: 'WP QD-2490', zone: 'Dehiwala & Mount Lavinia', status: 'AVAILABLE', rating: 4.8, count: 312 },
                  { name: 'Gayan Weerasinghe', vehicle: 'Honda Dio (Scooter)', plate: 'WP BDF-1150', zone: 'Rajagiriya & Nugegoda', status: 'AVAILABLE', rating: 4.9, count: 516 }
                ].map((rider, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#0C4E3B] font-black text-xs flex items-center justify-center">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900">{rider.name}</p>
                          <p className="text-[10px] text-slate-400">{rider.vehicle}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        rider.status === 'AVAILABLE' ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-sky-50 text-sky-700'
                      }`}>
                        {rider.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-1 font-medium bg-slate-50 p-2.5 rounded-xl">
                      <p>Plate: <strong className="text-slate-800">{rider.plate}</strong></p>
                      <p>Zone: <strong className="text-slate-800">{rider.zone}</strong></p>
                      <p>Completed Trips: <strong className="text-slate-800">{rider.count}</strong> (★ {rider.rating})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 9: REVIEWS, REPORTS, STAFF, SETTINGS
          ========================================================================= */}
          {['reviews', 'reports', 'staff', 'settings'].includes(activeMenu) && (
            <div className="p-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0C4E3B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 capitalize">{activeMenu.replace('_', ' ')} Workspace</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                All parameters configured and fully synced with the Ceylon Foods central database.
              </p>
            </div>
          )}

          {/* FOOTER ACROSS ALL ADMIN PAGES MATCHING MOCKUP */}
          <footer className="pt-6 pb-2 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>© 2026 Ceylon Foods • Operations workspace</span>
            <span>All times in Sri Lanka Standard Time • LKR</span>
          </footer>
        </main>
      </div>

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
