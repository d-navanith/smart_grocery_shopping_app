import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { Order, Product } from './part1_imports_types';

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
  const [showChart, setShowChart] = useState(false);

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const processingOrders = orders.filter(o => o.status === 'PROCESSING').length;
  const dispatchedOrders = orders.filter(o => o.status === 'ON_THE_WAY').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter(p => p.stock < 30).length;

  // Filtered order list for Column 1
  const filteredOrderList = orders.filter(o => {
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

          {/* Search a Order input */}
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

          {/* Orders Stream */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredOrderList.map((order, idx) => {
              const badge = getTableBadge(idx);
              const itemCount = order.items?.length || 4;
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
                      <p className="text-[11px] text-slate-400 font-medium">
                        {itemCount} Items
                      </p>
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

      {/* 3. OPTIONAL EXPANDABLE REVENUE TELEMETRY SECTION */}
      <div className="pt-2">
        <button
          onClick={() => setShowChart(!showChart)}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition"
        >
          <span>{showChart ? '▲ Hide Financial Telemetry & Chart' : '▼ View Financial Telemetry & Chart'}</span>
        </button>

        {showChart && (
          <div className="mt-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900">Revenue Performance</h3>
                <p className="text-xs text-slate-400 font-medium">Daily online supermarket turnover (LKR)</p>
              </div>
              <button
                onClick={onExportCsv}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>

            {/* Styled Area Spline Chart SVG */}
            <div className="h-56 w-full pt-4">
              <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B3B2C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0B3B2C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="#e2e8f0" strokeWidth="1" />
                <path
                  d="M 0,160 L 0,110 C 60,105 90,135 150,90 C 210,45 260,110 320,60 C 380,20 420,50 500,25 L 500,160 Z"
                  fill="url(#dashGrad)"
                />
                <path
                  d="M 0,110 C 60,105 90,135 150,90 C 210,45 260,110 320,60 C 380,20 420,50 500,25"
                  fill="none"
                  stroke="#0B3B2C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="90" r="4" fill="#0B3B2C" stroke="#ffffff" strokeWidth="2" />
                <circle cx="320" cy="60" r="4" fill="#0B3B2C" stroke="#ffffff" strokeWidth="2" />
                <circle cx="500" cy="25" r="5" fill="#F8B838" stroke="#ffffff" strokeWidth="2" />
              </svg>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span className="text-[#0B3B2C] font-black">Sun (Peak)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
