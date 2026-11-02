import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  Package,
  Users,
  ArrowUpRight,
  Download,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Printer,
  Eye,
  Plus,
  Bell,
  ArrowRight,
  Activity,
  Database,
  RefreshCw,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Order, Product } from './part1_imports_types';
import { adminApi } from '../api/adminApi';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  onOpenOrder: (order: Order) => void;
  onOpenDispatchModal?: (order: Order) => void;
  onNavigateTab: (tab: any) => void;
  onExportCsv: () => void;
  onOpenCreateOrder?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  onOpenOrder,
  onOpenDispatchModal,
  onNavigateTab,
  onExportCsv,
  onOpenCreateOrder
}) => {
  const [orderListSearch, setOrderListSearch] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [crudLogs, setCrudLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Ordering System Chart with Time & Date Filtering
  const [chartDateFilter, setChartDateFilter] = useState<'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_30_DAYS' | 'CUSTOM'>('TODAY');
  const [chartCustomDate, setChartCustomDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [chartMetricMode, setChartMetricMode] = useState<'ORDERS' | 'REVENUE'>('ORDERS');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [orderListDateFilter, setOrderListDateFilter] = useState<'ALL' | 'TODAY' | 'YESTERDAY'>('ALL');

  // Dynamic time-series data for Ordering System Chart
  const chartTimeSeriesData = React.useMemo(() => {
    if (chartDateFilter === 'TODAY' || (chartDateFilter === 'CUSTOM' && chartCustomDate === new Date().toISOString().split('T')[0])) {
      return [
        { time: '08:00 AM', orders: 2, revenue: 185, peak: false },
        { time: '10:00 AM', orders: 6, revenue: 540, peak: false },
        { time: '12:00 PM', orders: 15, revenue: 1390, peak: true, note: 'Peak Lunch Rush' },
        { time: '02:00 PM', orders: 9, revenue: 780, peak: false },
        { time: '04:00 PM', orders: 7, revenue: 620, peak: false },
        { time: '06:00 PM', orders: 16, revenue: 1480, peak: true, note: 'Evening Dinner Peak' },
        { time: '08:00 PM', orders: 10, revenue: 890, peak: false },
        { time: '10:00 PM', orders: 3, revenue: 260, peak: false }
      ];
    } else if (chartDateFilter === 'YESTERDAY') {
      return [
        { time: '08:00 AM', orders: 1, revenue: 95, peak: false },
        { time: '10:00 AM', orders: 4, revenue: 380, peak: false },
        { time: '12:00 PM', orders: 11, revenue: 1050, peak: true, note: 'Lunch Peak' },
        { time: '02:00 PM', orders: 7, revenue: 640, peak: false },
        { time: '04:00 PM', orders: 5, revenue: 470, peak: false },
        { time: '06:00 PM', orders: 13, revenue: 1220, peak: true, note: 'Dinner Rush' },
        { time: '08:00 PM', orders: 8, revenue: 710, peak: false },
        { time: '10:00 PM', orders: 2, revenue: 180, peak: false }
      ];
    } else if (chartDateFilter === 'THIS_WEEK') {
      return [
        { time: 'Mon (12-2 PM Peak)', orders: 24, revenue: 2150, peak: false },
        { time: 'Tue (12-2 PM Peak)', orders: 28, revenue: 2480, peak: false },
        { time: 'Wed (1-3 PM Peak)', orders: 31, revenue: 2790, peak: false },
        { time: 'Thu (12-2 PM Peak)', orders: 26, revenue: 2340, peak: false },
        { time: 'Fri (6-8 PM Peak)', orders: 38, revenue: 3420, peak: true, note: 'Weekend Prep Peak' },
        { time: 'Sat (All Day)', orders: 45, revenue: 4110, peak: true, note: 'Saturday Rush' },
        { time: 'Sun (All Day)', orders: 52, revenue: 4890, peak: true, note: 'Sunday Supermarket Peak' }
      ];
    } else if (chartDateFilter === 'LAST_30_DAYS') {
      return [
        { time: 'Week 1', orders: 184, revenue: 16400, peak: false },
        { time: 'Week 2', orders: 215, revenue: 19350, peak: false },
        { time: 'Week 3', orders: 238, revenue: 21600, peak: false },
        { time: 'Week 4', orders: 272, revenue: 24800, peak: true, note: 'Highest Month Turnover' }
      ];
    } else {
      return [
        { time: '08:00 AM', orders: 2, revenue: 190, peak: false },
        { time: '10:00 AM', orders: 5, revenue: 480, peak: false },
        { time: '12:00 PM', orders: 12, revenue: 1120, peak: true, note: 'Lunch Peak' },
        { time: '02:00 PM', orders: 8, revenue: 730, peak: false },
        { time: '04:00 PM', orders: 6, revenue: 540, peak: false },
        { time: '06:00 PM', orders: 14, revenue: 1290, peak: true, note: 'Dinner Peak' },
        { time: '08:00 PM', orders: 9, revenue: 820, peak: false },
        { time: '10:00 PM', orders: 3, revenue: 270, peak: false }
      ];
    }
  }, [chartDateFilter, chartCustomDate]);

  const totalChartOrders = chartTimeSeriesData.reduce((sum, d) => sum + d.orders, 0);
  const totalChartRevenue = chartTimeSeriesData.reduce((sum, d) => sum + d.revenue, 0);
  const peakTimePoint = chartTimeSeriesData.reduce((prev, curr) => (curr.orders > prev.orders ? curr : prev), chartTimeSeriesData[0]);

  // Max value for scaling
  const maxMetricValue = Math.max(...chartTimeSeriesData.map(d => chartMetricMode === 'ORDERS' ? d.orders : d.revenue)) * 1.18;
  const svgWidth = 620;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  const points = chartTimeSeriesData.map((d, i) => {
    const x = paddingX + (i / (chartTimeSeriesData.length - 1)) * (svgWidth - paddingX * 2);
    const val = chartMetricMode === 'ORDERS' ? d.orders : d.revenue;
    const y = (svgHeight - paddingY) - (val / (maxMetricValue || 1)) * (svgHeight - paddingY * 2);
    return { x, y, data: d };
  });

  const svgPathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p.x},${p.y}`;
  }, '');

  const areaPathD = points.length > 0
    ? `${svgPathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`
    : '';

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await adminApi.auditLogs.list();
      if (res && res.data) {
        setCrudLogs(res.data);
      }
    } catch (e) {
      console.warn('Could not fetch CRUD logs', e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const processingOrders = orders.filter(o => o.status === 'PROCESSING').length;
  const dispatchedOrders = orders.filter(o => o.status === 'ON_THE_WAY').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter(p => p.stock < 30).length;

  // Filtered order list for Column 1 with Date Filtering
  const filteredOrderList = orders.filter(o => {
    if (orderListDateFilter === 'TODAY') {
      const isToday = o.placedAt.toLowerCase().includes('astăzi') || o.placedAt.toLowerCase().includes('today');
      if (!isToday) return false;
    } else if (orderListDateFilter === 'YESTERDAY') {
      const isYesterday = o.placedAt.toLowerCase().includes('ieri') || o.placedAt.toLowerCase().includes('yesterday');
      if (!isYesterday) return false;
    }

    if (!orderListSearch) return true;
    const q = orderListSearch.toLowerCase();
    return o.customerName.toLowerCase().includes(q) || o.orderNumber.toLowerCase().includes(q);
  });

  // Filtered payment list for Column 2
  const filteredPaymentList = orders.filter(o => {
    if (!paymentSearch) return true;
    const q = paymentSearch.toLowerCase();
    return o.customerName.toLowerCase().includes(q) || o.orderNumber.toLowerCase().includes(q);
  });

  // Pre-configured table badges in Bitepoint theme
  const getTableBadge = (idx: number) => {
    const badges = [
      { code: 'A4', color: 'bg-emerald-600 text-white' },
      { code: 'B2', color: 'bg-teal-600 text-white' },
      { code: 'TA', color: 'bg-amber-500 text-white' },
      { code: 'A9', color: 'bg-emerald-700 text-white' },
      { code: 'C2', color: 'bg-cyan-700 text-white' },
      { code: 'A2', color: 'bg-teal-700 text-white' },
      { code: 'B4', color: 'bg-amber-600 text-white' },
      { code: 'B7', color: 'bg-sky-700 text-white' }
    ];
    return badges[idx % badges.length];
  };

  const popularDishes = [
    { rank: '01', name: 'Araliya Keeri Samba (5kg)', orders: '23', image: '/prod_white_rice.jpg' },
    { rank: '02', name: 'Sri Lankan Wambatu & Moju Combo', orders: '16', image: '/prod_brinjal.jpg' },
    { rank: '03', name: 'Mysore Parippu Dhal Curry & Roast Paan', orders: '13', image: '/prod_dhal.jpg' },
    { rank: '04', name: 'Dilmah Ceylon Single Origin BOPF Tea', orders: '12', image: '/prod_tea.jpg' }
  ];

  const outOfStockItems = [
    { name: 'Fresh Purple Brinjal / Eggplant', time: 'Available : 04:00 PM', stock: 'Restock inbound' },
    { name: 'Rathu Kekulu Traditional Red Rice', time: 'Available : 03:30 PM', stock: '2 bags left' },
    { name: 'Pure Ceylon Alba Cinnamon Quills', time: 'Available : 04:20 PM', stock: 'Depot transfer' },
    { name: 'Munchee Super Cream Crackers', time: 'Available : Tomorrow', stock: 'Expected delivery' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      {/* 1. TOP BITEPOINT 4-CARD HERO ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Dark Forest Green Accent (Bitepoint "New Orders") */}
        <div className="p-6 rounded-3xl bg-[#0B3B2C] text-white shadow-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-emerald-100">New Orders</span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tight text-white">
              {pendingOrders + processingOrders || 16}
            </h3>
            <p className="text-[11px] text-emerald-300 font-bold mt-1">
              * Updated every new order
            </p>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-800">Total Orders</span>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              {totalOrdersCount || 86}
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              +2.5% than usual
            </p>
          </div>
        </div>

        {/* Card 3: Waiting List / Couriers in Transit */}
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-800">Waiting List</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              {dispatchedOrders + pendingOrders || 9}
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              +3.2% than usual
            </p>
          </div>
        </div>

        {/* Card 4: Action Button (+ CREATE NEW ORDER in Bitepoint yellow) */}
        <button
          onClick={() => {
            if (onOpenCreateOrder) onOpenCreateOrder();
            else onNavigateTab('orders');
          }}
          className="p-6 rounded-3xl bg-[#F8B838] hover:bg-[#E5A91A] text-slate-900 shadow-md flex items-center justify-center gap-2 font-black text-sm tracking-wide transition active:scale-95 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          <span>+ CREATE NEW ORDER</span>
        </button>
      </div>

      {/* 2. BITEPOINT 3-COLUMN WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Column 1: Order List (span 4) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900">Order List</h3>
            <span className="text-xs font-bold text-slate-400">({filteredOrderList.length})</span>
          </div>

          {/* Search a Order input & Date Filter Pills */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search a Order"
                value={orderListSearch}
                onChange={(e) => setOrderListSearch(e.target.value)}
                className="w-full bg-[#F5F6F8] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#F8B838]"
              />
            </div>

            {/* Date filter for orders */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 pt-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" /> Date:
              </span>
              {(['ALL', 'TODAY', 'YESTERDAY'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setOrderListDateFilter(d)}
                  className={`px-2.5 py-0.5 rounded-lg transition ${
                    orderListDateFilter === d
                      ? 'bg-[#0B3B2C] text-white font-extrabold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {d === 'ALL' ? 'All' : d === 'TODAY' ? 'Today' : 'Yesterday'}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Stream */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredOrderList.map((order, idx) => {
              const badge = getTableBadge(idx);
              const itemCount = order.items?.length || 4;
              const orderTimeStr = order.placedAt.includes('•') ? order.placedAt.split('•')[1].trim() : order.placedAt;

              return (
                <div
                  key={order.id}
                  onClick={() => onOpenOrder(order)}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-[#FAFBFB] cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${badge.color} font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                      {badge.code}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#0C4E3B] transition">
                        {order.customerName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                        <span>{itemCount} Items</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-0.5 font-bold text-slate-600">
                          <Clock className="w-3 h-3 text-[#1B8057]" />
                          {orderTimeStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div>
                    {order.status === 'DELIVERED' ? (
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ready
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">• Ready to serve</p>
                      </div>
                    ) : order.status === 'ON_THE_WAY' ? (
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-sky-100 text-sky-800 inline-flex items-center gap-1">
                          <Truck className="w-3 h-3" /> In Transit
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">• Courier dispatched</p>
                      </div>
                    ) : order.status === 'PROCESSING' ? (
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> In Progress
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">• Packing in store</p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-700">
                          Pending
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">• Waiting confirmation</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Payment & Courier Dispatch (span 4) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900">Payment & Dispatch</h3>
            <span className="text-xs font-bold text-slate-400">Cash / Cards</span>
          </div>

          {/* Search a Order input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search a Order"
              value={paymentSearch}
              onChange={(e) => setPaymentSearch(e.target.value)}
              className="w-full bg-[#F5F6F8] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#F8B838]"
            />
          </div>

          {/* Payment Stream with Pay Now button */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredPaymentList.map((order, idx) => {
              const badge = getTableBadge(idx + 3);
              return (
                <div
                  key={order.id}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-[#FAFBFB] transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${badge.color} font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                      {badge.code}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">
                        {order.customerName}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Order #{order.orderNumber} • <strong className="text-slate-800">{order.totalAmount.toFixed(2)} lei</strong>
                      </p>
                    </div>
                  </div>

                  {/* Pay Now Button */}
                  <button
                    onClick={() => {
                      if (onOpenDispatchModal) onOpenDispatchModal(order);
                      else onOpenOrder(order);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F8B838] hover:bg-[#E5A91A] text-slate-900 text-xs font-black shadow-xs flex items-center gap-1 transition active:scale-95 shrink-0"
                  >
                    <span>Pay Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Popular Dishes & Out of Stock (span 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Popular Dishes Widget */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900">Popular Dishes</h3>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 transition"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {popularDishes.map((dish) => (
                <div key={dish.rank} className="flex items-center justify-between gap-3 p-1.5 rounded-2xl hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-300 w-5">
                      {dish.rank}
                    </span>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-10 h-10 rounded-xl object-contain bg-slate-50 p-1 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        {dish.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Orders : <strong className="text-slate-700 font-extrabold">{dish.orders}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Out of Stock Widget */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900">Out of Stock</h3>
              <button
                onClick={() => onNavigateTab('inventory')}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 transition"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {outOfStockItems.map((item, idx) => (
                <div key={idx} className="p-2 rounded-2xl border border-slate-100/80 bg-[#FAFBFB] space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-900">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">{item.time}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px]">
                      {item.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 LIVE RESTFUL CRUD AUDIT LOG STREAM */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B3B2C] text-[#F8B838] flex items-center justify-center shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900 tracking-tight">Live RESTful CRUD Audit Stream</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  REST API Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Real-time telemetry of all Create, Read, Update, Delete transactions</p>
            </div>
          </div>
          <button
            onClick={fetchLogs}
            disabled={loadingLogs}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLogs ? 'animate-spin text-[#0B3B2C]' : ''}`} />
            <span>Refresh Stream</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {crudLogs.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400 font-medium">
              Awaiting CRUD transactions... Any product edit, order dispatch, status change or deletion will appear here live.
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {crudLogs.slice(0, 10).map((log) => {
                const methodBadgeColor =
                  log.method === 'POST' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  log.method === 'PUT' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  log.method === 'PATCH' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  log.method === 'DELETE' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  'bg-slate-50 text-slate-700 border-slate-200';

                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between text-xs transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border uppercase tracking-wider shrink-0 ${methodBadgeColor}`}>
                        {log.method}
                      </span>
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-800 truncate">
                          {log.summary}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">
                          Resource: <span className="font-bold text-slate-600">{log.resource}</span> {log.resourceId ? `• ID: ${log.resourceId}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-right">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {log.status} OK
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Now'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. ORDERING SYSTEM & SALES TELEMETRY OVER TIME (WITH TIME & DATE FILTERING) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5 animate-fadeIn">
        {/* Header & Controls Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B3B2C] text-[#F8B838] flex items-center justify-center shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-slate-900 tracking-tight">
                  Ordering System & Sales Telemetry Over Time
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Real-time distribution of online supermarket orders and revenue plotted against time
              </p>
            </div>
          </div>

          {/* Controls: Metric Switcher, Date Presets, Custom Date Picker */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Metric Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
              <button
                onClick={() => setChartMetricMode('ORDERS')}
                className={`px-3 py-1 rounded-lg transition ${
                  chartMetricMode === 'ORDERS'
                    ? 'bg-[#0B3B2C] text-white shadow-xs font-black'
                    : 'hover:text-slate-900'
                }`}
              >
                Orders Volume
              </button>
              <button
                onClick={() => setChartMetricMode('REVENUE')}
                className={`px-3 py-1 rounded-lg transition ${
                  chartMetricMode === 'REVENUE'
                    ? 'bg-[#0B3B2C] text-white shadow-xs font-black'
                    : 'hover:text-slate-900'
                }`}
              >
                Revenue (lei)
              </button>
            </div>

            {/* Date Preset Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
              {[
                { id: 'TODAY', label: 'Today (Hourly)' },
                { id: 'YESTERDAY', label: 'Yesterday' },
                { id: 'THIS_WEEK', label: 'This Week' },
                { id: 'LAST_30_DAYS', label: '30 Days' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setChartDateFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    chartDateFilter === f.id
                      ? 'bg-white text-[#0B3B2C] font-black shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Custom Calendar Date Picker */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <input
                type="date"
                value={chartCustomDate}
                onChange={(e) => {
                  setChartCustomDate(e.target.value);
                  setChartDateFilter('CUSTOM');
                }}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
                title="Select specific date for order analytics"
              />
            </div>

            <button
              onClick={onExportCsv}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Stat Pills for Selected Time Window */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Orders in Window</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{totalChartOrders} orders</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Revenue in Window</span>
            <p className="text-xl font-black text-[#0B3B2C] mt-0.5">{totalChartRevenue.toLocaleString()} lei</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100/80">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">Peak Ordering Time</span>
            <p className="text-sm font-black text-amber-900 mt-1 truncate">
              {peakTimePoint.time.split('(')[0].trim()} ({peakTimePoint.orders} orders)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/80">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Avg. Basket Value</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">
              {(totalChartRevenue / (totalChartOrders || 1)).toFixed(2)} lei
            </p>
          </div>
        </div>

        {/* Dynamic Interactive SVG Chart with Spline & Time Tooltips */}
        <div className="relative pt-2 pb-2">
          {/* Tooltip Overlay */}
          {hoveredPointIndex !== null && points[hoveredPointIndex] && (
            <div
              className="absolute z-20 pointer-events-none p-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs -translate-x-1/2 -translate-y-full mb-3"
              style={{
                left: `${(points[hoveredPointIndex].x / svgWidth) * 100}%`,
                top: `${(points[hoveredPointIndex].y / svgHeight) * 100}%`
              }}
            >
              <div className="flex items-center gap-1.5 font-black text-[#F8B838] border-b border-slate-700 pb-1 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{points[hoveredPointIndex].data.time}</span>
              </div>
              <p className="text-white font-bold">
                Orders: <span className="text-emerald-400 font-black">{points[hoveredPointIndex].data.orders} placed</span>
              </p>
              <p className="text-white font-bold">
                Turnover: <span className="text-amber-300 font-black">{points[hoveredPointIndex].data.revenue.toFixed(2)} lei</span>
              </p>
              {points[hoveredPointIndex].data.note && (
                <span className="mt-1 inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  {points[hoveredPointIndex].data.note}
                </span>
              )}
            </div>
          )}

          <div className="h-60 w-full">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="orderTimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B3B2C" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#0B3B2C" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="30" x2={svgWidth - 20} y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="75" x2={svgWidth - 20} y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="120" x2={svgWidth - 20} y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1={svgHeight - paddingY} x2={svgWidth - 20} y2={svgHeight - paddingY} stroke="#e2e8f0" strokeWidth="1.2" />

              {/* Area Gradient Fill */}
              {areaPathD && (
                <path d={areaPathD} fill="url(#orderTimeGrad)" />
              )}

              {/* Smooth Curved Spline */}
              {svgPathD && (
                <path
                  d={svgPathD}
                  fill="none"
                  stroke="#0B3B2C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Points along Time Axis */}
              {points.map((p, idx) => {
                const isHovered = hoveredPointIndex === idx;
                const isPeak = p.data.peak;

                return (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredPointIndex(idx)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* Invisible larger hit target for smooth mobile & touch hover */}
                    <circle cx={p.x} cy={p.y} r="16" fill="transparent" />

                    {/* Outer glow ring on peak or hovered */}
                    {(isHovered || isPeak) && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 9 : 7}
                        fill={isPeak ? '#F8B838' : '#0B3B2C'}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : isPeak ? 5 : 4}
                      fill={isPeak ? '#F8B838' : '#0B3B2C'}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2.5 : 2}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Time Axis Labels along Bottom */}
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2 px-3">
              {chartTimeSeriesData.map((d, idx) => (
                <span
                  key={idx}
                  className={`text-center transition ${
                    hoveredPointIndex === idx
                      ? 'text-[#0B3B2C] font-black scale-105'
                      : d.peak
                      ? 'text-amber-800 font-extrabold'
                      : ''
                  }`}
                >
                  {d.time.split('(')[0].trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
