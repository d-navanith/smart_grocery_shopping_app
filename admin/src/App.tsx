import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Receipt,
  FileBarChart2,
  Store,
  Tag,
  Bike,
  FileText,
  Mail,
  Info,
  Settings,
  ShieldCheck,
  LogOut,
  Search,
  Calendar as CalendarIcon,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Lock,
  KeyRound,
  AlertCircle,
  Eye,
  Edit2,
  X,
  Check,
  Filter,
  BarChart3,
  Layers,
  Sparkles,
  PackageCheck,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Percent,
  Truck,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Star,
  UserCheck
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
  items: { productTitle: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'PLACED' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  deliveryType: string;
  placedAt: string;
  rider?: { name: string; phone: string; vehicleType?: string };
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
  // Authentication state for strict security separation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ceylonfoods_admin_auth') === 'true' || localStorage.getItem('freshcart_admin_auth') === 'true' || localStorage.getItem('metrocery_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('admin@ceylonfoods.lk');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Navigation menu state
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'products' | 'categories' | 'inventory' | 'orders' | 'customers' | 'promotions' | 'riders'
  >('products');
  const [isOrdersExpanded, setIsOrdersExpanded] = useState(false);
  const [isEcommerceExpanded, setIsEcommerceExpanded] = useState(true);
  const [orderSubFilter, setOrderSubFilter] = useState<'ALL' | 'PLACED' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED'>('ALL');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [riders, setRiders] = useState<FleetRider[]>([]);
  const [promotions, setPromotions] = useState<PromotionCoupon[]>([]);
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [adminMetrics, setAdminMetrics] = useState<any>(null);

  // Filters & selection
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedRowId, setSelectedRowId] = useState<string | null>('prod-2'); // Default highlight like Dribbble ref
  const [inventoryStockFilter, setInventoryStockFilter] = useState<'ALL' | 'LOW' | 'OUT'>('ALL');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');

  // Pagination & Dropdown states
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [isShowDropdownOpen, setIsShowDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calendar Popup state (matching Dribbble screenshot)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateDay, setSelectedDateDay] = useState(20);
  const [calendarMonth, setCalendarMonth] = useState('July 2026');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddPromoModalOpen, setIsAddPromoModalOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedRiderForDispatch, setSelectedRiderForDispatch] = useState<{ [orderId: string]: string }>({});

  // New product form
  const [newProduct, setNewProduct] = useState({
    title: '',
    sku: '',
    category: 'Fruits & Veg',
    brand: 'Natureland Organics',
    price: 3.50,
    stock: 50,
    store: 'Ceylon Foods Supermarket',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    aiFreshnessScore: 98,
    isOrganic: true
  });

  // New promo form
  const [newPromo, setNewPromo] = useState({
    code: '',
    title: '',
    discountType: 'PERCENTAGE' as const,
    discountValue: 15,
    minOrderValue: 25,
    validUntil: '2026-12-31',
    usageLimit: 300,
    badgeColor: '#044F41'
  });

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
        localStorage.setItem('ceylonfoods_admin_auth', 'true');
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server authentication error');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ceylonfoods_admin_auth'); localStorage.removeItem('ceylonfoods_admin_auth'); localStorage.removeItem('freshcart_admin_auth');
    localStorage.removeItem('metrocery_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    try {
      const [prodRes, ordRes, riderRes, promoRes, custRes, metricRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()).catch(() => null),
        fetch('/api/orders').then(r => r.json()).catch(() => null),
        fetch('/api/admin/riders').then(r => r.json()).catch(() => null),
        fetch('/api/admin/promotions').then(r => r.json()).catch(() => null),
        fetch('/api/admin/customers').then(r => r.json()).catch(() => null),
        fetch('/api/admin/metrics').then(r => r.json()).catch(() => null)
      ]);

      if (prodRes && prodRes.data) setProducts(prodRes.data);
      if (ordRes && ordRes.data) setOrders(ordRes.data);
      if (riderRes && riderRes.data) setRiders(riderRes.data);
      if (promoRes && promoRes.data) setPromotions(promoRes.data);
      if (custRes && custRes.data) setCustomers(custRes.data);
      if (metricRes && metricRes.data) setAdminMetrics(metricRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Product Actions
  const handleToggleProductStatus = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, status: nextStatus } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
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
        setNewProduct({
          title: '',
          sku: '',
          category: 'Fruits & Veg',
          brand: 'Natureland Organics',
          price: 3.50,
          stock: 50,
          store: 'Ceylon Foods Supermarket',
          imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
          aiFreshnessScore: 98,
          isOrganic: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
        setEditingProduct(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inventory Quick Restock Action
  const handleRestockProduct = async (productId: string, quantity: number) => {
    try {
      const res = await fetch(`/api/admin/inventory/${productId}/restock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: data.data.stock, status: data.data.status } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Order Actions
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

  // Rider Dispatch
  const handleAssignRider = async (orderId: string) => {
    const riderId = selectedRiderForDispatch[orderId];
    if (!riderId) return;
    try {
      const res = await fetch('/api/admin/riders/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, riderId })
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Promotion Actions
  const handleTogglePromoStatus = async (promoId: string) => {
    try {
      const res = await fetch(`/api/admin/promotions/${promoId}/status`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setPromotions(prev => prev.map(p => p.id === promoId ? data.data : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePromo = async (promoId: string) => {
    if (!confirm('Are you sure you want to remove this promo voucher?')) return;
    try {
      await fetch(`/api/admin/promotions/${promoId}`, { method: 'DELETE' });
      setPromotions(prev => prev.filter(p => p.id !== promoId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPromo)
      });
      const data = await res.json();
      if (data.success) {
        setPromotions(prev => [data.data, ...prev]);
        setIsAddPromoModalOpen(false);
        setNewPromo({
          code: '',
          title: '',
          discountType: 'PERCENTAGE',
          discountValue: 15,
          minOrderValue: 25,
          validUntil: '2026-12-31',
          usageLimit: 300,
          badgeColor: '#044F41'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Customer Actions
  const handleToggleCustomerStatus = async (custId: string) => {
    try {
      const res = await fetch(`/api/admin/customers/${custId}/status`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setCustomers(prev => prev.map(c => c.id === custId ? data.data : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchSearch && matchCat;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage) || 1;

  // Calendar days setup matching Dribbble reference
  const calendarDays = [
    { num: '', empty: true }, { num: '', empty: true }, { num: '', empty: true }, { num: '', empty: true }, { num: '', empty: true }, { num: '', empty: true }, { num: 1 },
    { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 7 }, { num: 8 },
    { num: 9 }, { num: 10 }, { num: 11 }, { num: 12 }, { num: 13 }, { num: 14 }, { num: 15 },
    { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 }, { num: 20 }, { num: 21 }, { num: 22 },
    { num: 23 }, { num: 24 }, { num: 25 }, { num: 26 }, { num: 27 }, { num: 28 }, { num: 29 },
    { num: 30 }, { num: 31 }
  ];

  // Calculated inventory metrics
  const totalStockUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 30).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const totalRetailValuation = products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0);

  // Filtered inventory list
  const filteredInventory = products.filter(p => {
    if (inventoryStockFilter === 'LOW') return p.stock > 0 && p.stock < 30;
    if (inventoryStockFilter === 'OUT') return p.stock === 0;
    return true;
  });

  // Filtered customers
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    c.phone.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  // =========================================================================
  // VIEW: SECURE ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#032B24] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-emerald-900/30 space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/ceylon_foods_logo.png"
              alt="Ceylon Foods Logo"
              className="h-20 w-auto mx-auto object-contain filter drop-shadow-md mb-1"
            />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Ceylon <span className="text-[#FF6515]">Foods</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Sri Lanka Online Supermarket • Operations & Dispatch Portal
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#044F41]"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">Secure Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#044F41]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-xl bg-[#044F41] hover:bg-emerald-950 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
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
              <span className="font-bold text-[#044F41]">Default Credentials:</span><br />
              Email: <code className="font-bold text-slate-800">admin@ceylonfoods.lk</code><br />
              Password: <code className="font-bold text-slate-800">admin123</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: FULL OPERATIONS COCKPIT
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-slate-800">
      {/* Top Banner with Dark Forest Green accent matching Dribbble reference */}
      <header className="bg-[#044F41] text-white px-6 py-2.5 flex items-center justify-between border-b border-emerald-900 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/ceylon_foods_logo.png"
            alt="Ceylon Foods"
            className="h-9 w-auto object-contain filter drop-shadow"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none text-white">
              Ceylon <span className="text-[#FF6515]">Foods</span>
            </span>
            <span className="text-[9px] font-bold tracking-wider text-emerald-200 uppercase">
              Operations & Dispatch
            </span>
          </div>
        </div>

        {/* Search, Date, Notifications & Logout */}
        <div className="flex items-center gap-5">
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
            <input
              type="text"
              placeholder="Search anything in system..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#033B31] border border-emerald-700/60 rounded-full pl-10 pr-4 py-1.5 text-sm text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-[#78F9B8]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-200 bg-[#033B31] px-3.5 py-1.5 rounded-full border border-emerald-700/50">
            <span>Sunday, 25 October 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition">
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF632B] rounded-full"></span>
            </button>
            <button className="relative p-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF632B] rounded-full"></span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Navigation Sidebar matching Dribbble reference */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shadow-sm shrink-0">
          <div className="space-y-6">
            <div className="space-y-1 text-sm font-semibold">
              {/* Dashboard */}
              <button
                onClick={() => setActiveMenu('dashboard')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                  activeMenu === 'dashboard'
                    ? 'bg-[#FF632B] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              {/* Orders Dropdown */}
              <div>
                <button
                  onClick={() => setIsOrdersExpanded(!isOrdersExpanded)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                    activeMenu === 'orders'
                      ? 'bg-[#FF632B] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Orders</span>
                  </div>
                  {isOrdersExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {isOrdersExpanded && (
                  <div className="mt-1 ml-6 space-y-1 text-xs">
                    {(['ALL', 'PLACED', 'PROCESSING', 'ON_THE_WAY', 'DELIVERED'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => {
                          setActiveMenu('orders');
                          setOrderSubFilter(f);
                        }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition ${
                          orderSubFilter === f && activeMenu === 'orders'
                            ? 'text-[#FF632B] font-bold bg-orange-50'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        • {f === 'ALL' ? 'All Orders' : f.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* E-Commerce Dropdown (Active in Dribbble reference) */}
              <div>
                <button
                  onClick={() => setIsEcommerceExpanded(!isEcommerceExpanded)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                    activeMenu === 'products' || activeMenu === 'categories'
                      ? 'bg-[#FF632B] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4" />
                    <span>E-commerce</span>
                  </div>
                  {isEcommerceExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {isEcommerceExpanded && (
                  <div className="mt-1 ml-6 space-y-1 text-xs text-slate-500 font-medium">
                    <button
                      onClick={() => setActiveMenu('products')}
                      className={`w-full text-left py-1 px-2 rounded-lg transition ${
                        activeMenu === 'products' ? 'text-[#FF632B] font-bold bg-orange-50' : 'hover:text-slate-800'
                      }`}
                    >
                      • Products Catalog
                    </button>
                    <button
                      onClick={() => setActiveMenu('categories')}
                      className={`w-full text-left py-1 px-2 rounded-lg transition ${
                        activeMenu === 'categories' ? 'text-[#FF632B] font-bold bg-orange-50' : 'hover:text-slate-800'
                      }`}
                    >
                      • Categories & Aisles
                    </button>
                  </div>
                )}
              </div>

              {/* Inventory Management */}
              <button
                onClick={() => setActiveMenu('inventory')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                  activeMenu === 'inventory' ? 'bg-[#FF632B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PackageCheck className="w-4 h-4" />
                  <span>Inventory & Stock</span>
                </div>
                {lowStockCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeMenu === 'inventory' ? 'bg-white text-[#FF632B]' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {lowStockCount} alert
                  </span>
                )}
              </button>

              {/* Customers Directory */}
              <button
                onClick={() => setActiveMenu('customers')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  activeMenu === 'customers' ? 'bg-[#FF632B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </button>

              {/* Promotions & Discounts */}
              <button
                onClick={() => setActiveMenu('promotions')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  activeMenu === 'promotions' ? 'bg-[#FF632B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Promotions & Vouchers</span>
              </button>

              {/* Riders & Delivery Fleet */}
              <button
                onClick={() => setActiveMenu('riders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  activeMenu === 'riders' ? 'bg-[#FF632B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Riders & Dispatch</span>
              </button>
            </div>
          </div>

          {/* User Profile Footer matching Dribbble reference */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin Avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div className="text-xs">
                <p className="font-extrabold text-slate-800 leading-tight">Natashia Khaleira</p>
                <p className="text-[11px] text-slate-400">Store Director</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* =========================================================================
              VIEW 1: PRODUCTS TABLE (Exact Dribbble Metrocery UI recreation)
          ========================================================================= */}
          {activeMenu === 'products' && (
            <div className="space-y-4">
              {/* Table Controls Topbar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-extrabold text-slate-800">Products</h1>

                  {/* Show 50 Dropdown matching Dribbble screenshot */}
                  <div className="relative">
                    <button
                      onClick={() => setIsShowDropdownOpen(!isShowDropdownOpen)}
                      className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-300"
                    >
                      <span className="text-slate-400">Show</span>
                      <span className="font-bold text-slate-900">{entriesPerPage}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isShowDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                        {[10, 25, 50, 100].map(val => (
                          <button
                            key={val}
                            onClick={() => {
                              setEntriesPerPage(val);
                              setIsShowDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition ${
                              entriesPerPage === val ? 'font-bold text-[#FF632B]' : 'text-slate-700'
                            }`}
                          >
                            {val} per page
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Calendar Date Picker matching Dribbble reference */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-300"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{calendarMonth.split(' ')[0]} {selectedDateDay}, {calendarMonth.split(' ')[1]}</span>
                    </button>

                    {/* Interactive Calendar Dropdown */}
                    {isCalendarOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-40 animate-fadeIn">
                        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
                          <button className="p-1 hover:bg-slate-100 rounded-lg">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span>{calendarMonth}</span>
                          <button className="p-1 hover:bg-slate-100 rounded-lg">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d}>{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {calendarDays.map((d, i) => (
                            <button
                              key={i}
                              disabled={d.empty}
                              onClick={() => {
                                if (d.num) {
                                  setSelectedDateDay(Number(d.num));
                                  setIsCalendarOpen(false);
                                }
                              }}
                              className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center text-xs transition ${
                                d.empty ? 'invisible' :
                                d.num === selectedDateDay
                                  ? 'bg-[#FF632B] text-white font-bold shadow-md'
                                  : 'text-slate-700 hover:bg-slate-100 font-medium'
                              }`}
                            >
                              {d.num}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add New Product Button */}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-[#044F41]/30 text-[#044F41] font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    <span>Add New</span>
                    <Plus className="w-3.5 h-3.5 text-[#FF632B]" />
                  </button>
                </div>
              </div>

              {/* Products Table matching Dribbble reference */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#044F41] text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">SL</th>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Brand</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Store</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4">Creates At</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedProducts.map((p, idx) => {
                      const isHighlighted = selectedRowId === p.id;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedRowId(p.id)}
                          className={`cursor-pointer transition ${
                            isHighlighted
                              ? 'bg-amber-50/40 border-l-4 border-[#FF632B] shadow-inner'
                              : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <td className="py-3.5 px-4 font-semibold text-slate-400">
                            {(currentPage - 1) * entriesPerPage + idx + 1}
                          </td>
                          <td className="py-3.5 px-4">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
                              }}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-sm"
                            />
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-800">{p.title}</p>
                            <span className="text-[10px] text-slate-400">{p.sku}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">{p.category}</td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">{p.brand}</td>
                          <td className="py-3.5 px-4 font-black text-slate-900">Rs. {Math.round(p.price).toLocaleString()}</td>
                          <td className="py-3.5 px-4">
                            <span className={`font-bold ${p.stock < 30 ? 'text-amber-600' : 'text-slate-700'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">{p.store}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleProductStatus(p.id, p.status);
                              }}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold border transition ${
                                p.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                              }`}
                            >
                              {p.status}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">{p.createdAt || '2026-10-25'}</td>
                          
                          {/* 3 Actions column matching Dribbble reference (View, Edit, Delete) */}
                          <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              {/* 1. View button (Blue) */}
                              <button
                                onClick={() => setViewingProduct(p)}
                                title="View Details"
                                className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* 2. Edit button (Orange) */}
                              <button
                                onClick={() => setEditingProduct({ ...p })}
                                title="Edit Product"
                                className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF632B] flex items-center justify-center transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* 3. Delete button (Red) */}
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                title="Delete Product"
                                className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No products found matching your search.
                  </div>
                )}

                {/* Pagination matching Dribbble reference */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Showing 1 to {Math.min(paginatedProducts.length, entriesPerPage)} of {filteredProducts.length} entries
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-medium disabled:opacity-40"
                    >
                      ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded-full text-xs font-bold transition ${
                          currentPage === page
                            ? 'bg-[#FF632B] text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-medium disabled:opacity-40"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: CATEGORIES & AISLES
          ========================================================================= */}
          {activeMenu === 'categories' && (
            <div className="space-y-4">
              <h1 className="text-xl font-extrabold text-slate-800">Supermarket Categories & Aisles</h1>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Fruits & Veg', count: products.filter(p => p.category === 'Fruits & Veg').length, icon: '🍎' },
                  { name: 'Dairy & Eggs', count: products.filter(p => p.category === 'Dairy & Eggs').length, icon: '🥛' },
                  { name: 'Bakery', count: products.filter(p => p.category === 'Bakery').length, icon: '🍞' },
                  { name: 'Meat & Seafood', count: products.filter(p => p.category === 'Meat & Seafood').length, icon: '🥩' },
                  { name: 'Staples & Grains', count: products.filter(p => p.category === 'Staples & Grains').length, icon: '🍚' },
                  { name: 'Beverages', count: products.filter(p => p.category === 'Beverages').length, icon: '☕' },
                  { name: 'Snacks', count: products.filter(p => p.category === 'Snacks').length, icon: '🍫' },
                  { name: 'Household', count: products.filter(p => p.category === 'Household').length, icon: '🧼' }
                ].map(cat => (
                  <div key={cat.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-sm">{cat.name}</h3>
                        <p className="text-xs text-slate-400">{cat.count} products active</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(cat.name);
                        setActiveMenu('products');
                      }}
                      className="text-xs font-bold text-[#FF632B] hover:underline"
                    >
                      Filter Table →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: INVENTORY & STOCK MANAGEMENT
          ========================================================================= */}
          {activeMenu === 'inventory' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800">Warehouse Inventory & Stock Alerts</h1>
                  <p className="text-xs text-slate-400">Real-time stock monitors with 1-click restock actions</p>
                </div>
                <div className="flex items-center gap-2">
                  {(['ALL', 'LOW', 'OUT'] as const).map(flt => (
                    <button
                      key={flt}
                      onClick={() => setInventoryStockFilter(flt)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        inventoryStockFilter === flt
                          ? 'bg-[#044F41] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {flt === 'ALL' && 'All Products'}
                      {flt === 'LOW' && `Low Stock (<30) [${lowStockCount}]`}
                      {flt === 'OUT' && `Out of Stock [${outOfStockCount}]`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Inventory KPI Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <PackageCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Total Stock Units</p>
                    <p className="text-xl font-black text-slate-800">{totalStockUnits} units</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Low Stock Warnings</p>
                    <p className="text-xl font-black text-amber-600">{lowStockCount} items</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Out of Stock</p>
                    <p className="text-xl font-black text-red-600">{outOfStockCount} items</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#044F41] flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Inventory Valuation</p>
                    <p className="text-xl font-black text-slate-800">Rs. {Math.round(totalRetailValuation).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#044F41] text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Item & SKU</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Level</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Quick Restock Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInventory.map(item => {
                      const isLow = item.stock > 0 && item.stock < 30;
                      const isOut = item.stock === 0;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                              />
                              <div>
                                <p className="font-bold text-slate-800">{item.title}</p>
                                <span className="text-[10px] text-slate-400">{item.sku} • {item.brand}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">{item.category}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">Rs. {Math.round(item.price).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="w-36 space-y-1">
                              <div className="flex justify-between text-[11px] font-bold">
                                <span>{item.stock} left</span>
                                <span className="text-slate-400">/ 150</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    isOut ? 'bg-red-500 w-0' :
                                    isLow ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${Math.min(100, (item.stock / 150) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isOut ? 'bg-red-100 text-red-700' :
                              isLow ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Healthy Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleRestockProduct(item.id, 25)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-[#FF632B] hover:text-white text-slate-700 font-bold text-[11px] transition"
                              >
                                +25
                              </button>
                              <button
                                onClick={() => handleRestockProduct(item.id, 50)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-[#FF632B] hover:text-white text-slate-700 font-bold text-[11px] transition"
                              >
                                +50
                              </button>
                              <button
                                onClick={() => handleRestockProduct(item.id, 100)}
                                className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-[#044F41] hover:text-white text-[#044F41] font-bold text-[11px] transition"
                              >
                                +100
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: CUSTOMERS DIRECTORY
          ========================================================================= */}
          {activeMenu === 'customers' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800">Customer Accounts & Loyalty</h1>
                  <p className="text-xs text-slate-400">Registered supermarket shoppers, order records, and tiers</p>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search customer by name or email..."
                    value={customerSearchTerm}
                    onChange={(e) => setCustomerSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF632B]"
                  />
                </div>
              </div>

              {/* Customer summary cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF632B] flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Registered Shoppers</p>
                    <p className="text-xl font-black text-slate-800">{customers.length || 215}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Platinum / VIP Members</p>
                    <p className="text-xl font-black text-slate-800">
                      {customers.filter(c => c.membershipTier === 'Platinum').length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#044F41] flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Total Customer Spend</p>
                    <p className="text-xl font-black text-slate-800">
                      Rs. {Math.round(customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0)).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Active Accounts</p>
                    <p className="text-xl font-black text-slate-800">
                      {customers.filter(c => c.status === 'ACTIVE').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#044F41] text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Contact & Address</th>
                      <th className="py-3 px-4">Membership Tier</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4">Loyalty Points</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map(cust => (
                      <tr key={cust.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#044F41] font-bold flex items-center justify-center text-xs">
                              {cust.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{cust.name}</p>
                              <span className="text-[10px] text-slate-400">Joined {cust.joinedDate}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-700">{cust.email}</p>
                          <span className="text-[10px] text-slate-400">{cust.phone} • {cust.address}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            cust.membershipTier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                            cust.membershipTier === 'Gold' ? 'bg-amber-100 text-amber-700' :
                            cust.membershipTier === 'Silver' ? 'bg-slate-100 text-slate-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            ★ {cust.membershipTier}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{cust.totalOrders}</td>
                        <td className="py-3 px-4 font-black text-slate-900">Rs. {Math.round(cust.totalSpent).toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-emerald-600">🏆 {cust.loyaltyPoints} pts</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cust.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {cust.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleCustomerStatus(cust.id)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-[11px]"
                          >
                            {cust.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: PROMOTIONS & VOUCHERS MANAGEMENT
          ========================================================================= */}
          {activeMenu === 'promotions' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800">Promotions, Coupons & Discounts</h1>
                  <p className="text-xs text-slate-400">Manage campaign vouchers, promo discount rules, and redemption limits</p>
                </div>
                <button
                  onClick={() => setIsAddPromoModalOpen(true)}
                  className="flex items-center gap-2 bg-[#FF632B] hover:bg-[#e0521d] text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Promotion</span>
                </button>
              </div>

              {/* Promo Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {promotions.map(promo => {
                  const usagePct = Math.round((promo.usageCount / promo.usageLimit) * 100);
                  return (
                    <div
                      key={promo.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-[#044F41] text-[#78F9B8] font-black tracking-widest text-xs">
                              {promo.code}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              promo.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {promo.status}
                            </span>
                          </div>
                          <h3 className="font-extrabold text-sm text-slate-800">{promo.title}</h3>
                          <p className="text-xs text-slate-500">
                            Min. order ${promo.minOrderValue.toFixed(2)} • Expires {promo.validUntil}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-2xl font-black text-[#FF632B]">
                            {promo.discountType === 'PERCENTAGE' && `${promo.discountValue}% OFF`}
                            {promo.discountType === 'FIXED' && `$${promo.discountValue} OFF`}
                            {promo.discountType === 'FREE_DELIVERY' && `FREE DELIVERY`}
                          </span>
                        </div>
                      </div>

                      {/* Usage bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Redemptions: <strong className="text-slate-800">{promo.usageCount}</strong> / {promo.usageLimit}</span>
                          <span className="font-bold text-slate-700">{usagePct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#044F41] rounded-full" style={{ width: `${usagePct}%` }} />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => handleTogglePromoStatus(promo.id)}
                          className={`font-bold transition ${
                            promo.status === 'ACTIVE' ? 'text-amber-600 hover:text-amber-800' : 'text-emerald-600 hover:text-emerald-800'
                          }`}
                        >
                          {promo.status === 'ACTIVE' ? 'Pause Campaign' : 'Resume Campaign'}
                        </button>
                        <button
                          onClick={() => handleDeletePromo(promo.id)}
                          className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: RIDERS & FLEET DISPATCH
          ========================================================================= */}
          {activeMenu === 'riders' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800">Delivery Fleet & Live Courier Dispatch</h1>
                  <p className="text-xs text-slate-400">Track delivery riders, assign pending supermarket orders, and inspect fleet performance</p>
                </div>
              </div>

              {/* Fleet status cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Total Courier Fleet</p>
                    <p className="text-xl font-black text-slate-800">{riders.length} riders</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Available For Dispatch</p>
                    <p className="text-xl font-black text-emerald-600">
                      {riders.filter(r => r.status === 'AVAILABLE').length} ready
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF632B] flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">En Route on Delivery</p>
                    <p className="text-xl font-black text-[#FF632B]">
                      {riders.filter(r => r.status === 'DELIVERING').length} active
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Off Duty</p>
                    <p className="text-xl font-black text-slate-700">
                      {riders.filter(r => r.status === 'OFF_DUTY').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Dispatch Action Panel for Pending Orders */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF632B]" />
                  <span>Pending Orders Awaiting Courier Assignment</span>
                </h3>

                {orders.filter(o => o.status === 'PLACED' || o.status === 'PROCESSING').length === 0 ? (
                  <p className="text-xs text-slate-400">No unassigned orders at the moment. All orders are dispatched!</p>
                ) : (
                  <div className="space-y-2">
                    {orders.filter(o => o.status === 'PLACED' || o.status === 'PROCESSING').map(order => (
                      <div key={order.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#044F41]">{order.orderNumber}</span>
                          <span className="text-slate-500 ml-2">Customer: <strong>{order.customerName}</strong> (Rs. {Math.round(order.totalAmount).toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={selectedRiderForDispatch[order.id] || ''}
                            onChange={(e) => setSelectedRiderForDispatch({ ...selectedRiderForDispatch, [order.id]: e.target.value })}
                            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700"
                          >
                            <option value="">Select Available Rider...</option>
                            {riders.filter(r => r.status === 'AVAILABLE').map(r => (
                              <option key={r.id} value={r.id}>{r.name} ({r.vehicleType})</option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssignRider(order.id)}
                            disabled={!selectedRiderForDispatch[order.id]}
                            className="bg-[#044F41] disabled:opacity-40 hover:bg-emerald-950 text-[#78F9B8] font-bold px-3 py-1 rounded-lg transition"
                          >
                            Assign & Dispatch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Courier Fleet Roster Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#044F41] text-white font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Courier Partner</th>
                      <th className="py-3 px-4">Vehicle & Plate</th>
                      <th className="py-3 px-4">Zone Coverage</th>
                      <th className="py-3 px-4">Deliveries</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {riders.map(rider => (
                      <tr key={rider.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={rider.avatarUrl}
                              alt={rider.name}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                            />
                            <div>
                              <p className="font-bold text-slate-800">{rider.name}</p>
                              <span className="text-[10px] text-slate-400">{rider.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-700">{rider.vehicleType}</p>
                          <span className="text-[10px] text-slate-400">{rider.plateNumber}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">{rider.zone}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{rider.completedDeliveries} delivered</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-amber-500">★ {rider.rating.toFixed(2)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rider.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' :
                            rider.status === 'DELIVERING' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {rider.status.replace('_', ' ')}
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
              VIEW 7: DASHBOARD METRICS & RECENT ORDERS
          ========================================================================= */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              {/* 4 Top KPI Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Available Balance</p>
                    <p className="text-xl font-black text-slate-800">Rs. {Math.round(adminMetrics?.availableBalance || 485200).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#044F41] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Total Orders</p>
                    <p className="text-xl font-black text-slate-800">{orders.length || 4592}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Active Products</p>
                    <p className="text-xl font-black text-slate-800">{products.length}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF632B] flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Registered Customers</p>
                    <p className="text-xl font-black text-slate-800">{customers.length || 215}</p>
                  </div>
                </div>
              </div>

              {/* Weekly Performance Graph & Shortcuts */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800">Weekly Supermarket Order Volume</h3>
                      <p className="text-xs text-slate-400">Live order deliveries breakdown by day</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +18.4% this week
                    </span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-slate-100">
                    {[
                      { day: 'Sun', height: '35%', count: 18 },
                      { day: 'Mon', height: '85%', count: 65 },
                      { day: 'Tue', height: '40%', count: 24 },
                      { day: 'Wed', height: '70%', count: 48 },
                      { day: 'Thu', height: '30%', count: 16 },
                      { day: 'Fri', height: '60%', count: 39 },
                      { day: 'Sat', height: '45%', count: 28 }
                    ].map(col => (
                      <div key={col.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div
                          className="w-full bg-[#044F41] hover:bg-[#FF632B] rounded-t-lg transition-all cursor-pointer relative group"
                          style={{ height: col.height }}
                        >
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            {col.count} orders
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">{col.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operations Quick Actions */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-extrabold text-sm text-slate-800">Operational Shortcuts</h3>
                  <div className="space-y-2 text-xs font-bold">
                    <button
                      onClick={() => setActiveMenu('inventory')}
                      className="w-full text-left p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Restock Low Inventory</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                    </button>

                    <button
                      onClick={() => setActiveMenu('riders')}
                      className="w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <Bike className="w-4 h-4 text-blue-600" />
                        <span>Dispatch Courier Fleet</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </button>

                    <button
                      onClick={() => setActiveMenu('promotions')}
                      className="w-full text-left p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Launch Weekend Promo</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-800">Recent Customer Orders</h3>
                  <button onClick={() => setActiveMenu('orders')} className="text-xs font-bold text-[#FF632B] hover:underline">
                    View All Orders →
                  </button>
                </div>
                <div className="space-y-2">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-[#044F41]">{o.orderNumber}</span>
                        <span className="text-slate-600 ml-2">Customer: <strong>{o.customerName}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-900">Rs. {Math.round(o.totalAmount).toLocaleString()}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 8: ORDERS MANAGEMENT & DISPATCH
          ========================================================================= */}
          {activeMenu === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Order Management & Dispatch</h2>
                  <p className="text-xs text-slate-400">Track delivery lifecycle from placed to doorstep</p>
                </div>
              </div>

              <div className="space-y-3">
                {orders
                  .filter(o => orderSubFilter === 'ALL' || o.status === orderSubFilter)
                  .map(order => (
                    <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#044F41]">{order.orderNumber}</span>
                          <span className="text-[10px] text-slate-400">Placed: {new Date(order.placedAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800">
                          {order.customerName} • {order.items.length} items
                        </p>
                        <p className="text-xs text-slate-400">{order.items.map(i => `${i.quantity}x ${i.productTitle}`).join(', ')}</p>
                        {order.rider && (
                          <p className="text-[11px] font-bold text-blue-600 flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5" /> Assigned Rider: {order.rider.name} ({order.rider.phone})
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-black text-slate-900">Rs. {Math.round(order.totalAmount).toLocaleString()}</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="ON_THE_WAY">ON THE WAY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL 1: ADD NEW PRODUCT MODAL
      ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-800">Add New Supermarket Item</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Bell Pepper"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF632B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  >
                    <option value="Fruits & Veg">Fruits & Veg</option>
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Meat & Seafood">Meat & Seafood</option>
                    <option value="Staples & Grains">Staples & Grains</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Household">Household</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Freshness (%)</label>
                  <input
                    type="number"
                    min="80"
                    max="100"
                    value={newProduct.aiFreshnessScore}
                    onChange={(e) => setNewProduct({ ...newProduct, aiFreshnessScore: parseInt(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF632B] hover:bg-[#e0521d] text-white font-bold shadow-md"
                >
                  Save & Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: ADD NEW PROMOTION MODAL
      ========================================================================= */}
      {isAddPromoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-800">Create New Promo Voucher</h3>
              <button onClick={() => setIsAddPromoModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPromo} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Promo Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER25"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-mono uppercase font-bold focus:ring-2 focus:ring-[#FF632B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 25% Off Weekend Harvest"
                  value={newPromo.title}
                  onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={newPromo.discountType}
                    onChange={(e) => setNewPromo({ ...newPromo, discountType: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount ($)</option>
                    <option value="FREE_DELIVERY">Free Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPromo.discountValue}
                    onChange={(e) => setNewPromo({ ...newPromo, discountValue: parseFloat(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min. Order ($)</label>
                  <input
                    type="number"
                    required
                    value={newPromo.minOrderValue}
                    onChange={(e) => setNewPromo({ ...newPromo, minOrderValue: parseFloat(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Usage Limit</label>
                  <input
                    type="number"
                    required
                    value={newPromo.usageLimit}
                    onChange={(e) => setNewPromo({ ...newPromo, usageLimit: parseInt(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Valid Until</label>
                <input
                  type="date"
                  required
                  value={newPromo.validUntil}
                  onChange={(e) => setNewPromo({ ...newPromo, validUntil: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPromoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#044F41] text-[#78F9B8] font-bold shadow-md hover:bg-emerald-950"
                >
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: VIEW PRODUCT DETAILS (Blue eye button action)
      ========================================================================= */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-extrabold text-slate-800 text-sm">Product Specifications</span>
              <button onClick={() => setViewingProduct(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={viewingProduct.imageUrl}
                alt=""
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow"
              />
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-800">{viewingProduct.title}</h3>
                <p className="text-xs text-slate-400">{viewingProduct.sku} • {viewingProduct.brand}</p>
                <p className="text-base font-black text-[#FF632B]">Rs. {Math.round(viewingProduct.price).toLocaleString()}</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  viewingProduct.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {viewingProduct.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl">
              <div>
                <span className="text-slate-400 font-bold block">Department:</span>
                <span className="font-bold text-slate-800">{viewingProduct.category}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Current Stock:</span>
                <span className="font-bold text-slate-800">{viewingProduct.stock} units</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">AI Freshness:</span>
                <span className="font-bold text-emerald-600">✨ {viewingProduct.aiFreshnessScore}%</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Store Hub:</span>
                <span className="font-bold text-slate-800">{viewingProduct.store}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingProduct(null)}
                className="px-5 py-2 bg-[#044F41] text-[#78F9B8] font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: EDIT PRODUCT (Orange pen button action)
      ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-800">Edit Product: {editingProduct.title}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#044F41] hover:bg-emerald-950 text-[#78F9B8] font-bold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}