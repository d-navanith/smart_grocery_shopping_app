import React from 'react';
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
  Plus
} from 'lucide-react';
import { Order, Product } from './part1_imports_types';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  onOpenOrder: (order: Order) => void;
  onNavigateTab: (tab: any) => void;
  onExportCsv: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  onOpenOrder,
  onNavigateTab,
  onExportCsv
}) => {
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const processingOrders = orders.filter(o => o.status === 'PROCESSING').length;
  const dispatchedOrders = orders.filter(o => o.status === 'ON_THE_WAY').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const lowStockCount = products.filter(p => p.stock < 30).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
            LIVE SUPERMARKET TELEMETRY
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time performance across Sri Lankan island stores and delivery fleet.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onNavigateTab('deliveries')}
            className="px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-2 transition"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Fleet Dispatch</span>
          </button>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-2 transition"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Restock Inventory ({lowStockCount})</span>
          </button>
          <button
            onClick={onExportCsv}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Sales</span>
            <div className="w-8 h-8 rounded-xl bg-[#E6F7EF] text-[#0C6237] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              LKR {(totalSales || 8462850).toLocaleString()}.00
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+14.2% vs last week</span>
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {orders.length || 1284}
            </h3>
            <p className="text-[11px] text-orange-600 font-bold flex items-center gap-1 mt-1">
              <span>{pendingOrders} awaiting payment/action</span>
            </p>
          </div>
        </div>

        {/* Deliveries on Road */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">On the Road</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {dispatchedOrders || 24} couriers
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              97.1% on-time delivery rate
            </p>
          </div>
        </div>

        {/* Inventory Tracked */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Catalog & Stock</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {products.length} Products
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              {lowStockCount > 0 ? `${lowStockCount} items need restock` : 'All inventory healthy'}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Chart & Order Status Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Spline Trend */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900">Revenue Performance</h3>
              <p className="text-xs text-slate-400 font-medium">Daily online supermarket turnover (LKR)</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#E6F7EF] text-[#0C6237] text-xs font-extrabold">
              Oct 2026
            </span>
          </div>

          {/* Styled Area Spline Chart SVG */}
          <div className="h-56 w-full pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0C6237" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0C6237" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="#e2e8f0" strokeWidth="1" />

              {/* Area */}
              <path
                d="M 0,160 L 0,110 C 60,105 90,135 150,90 C 210,45 260,110 320,60 C 380,20 420,50 500,25 L 500,160 Z"
                fill="url(#dashGrad)"
              />
              {/* Curve Stroke */}
              <path
                d="M 0,110 C 60,105 90,135 150,90 C 210,45 260,110 320,60 C 380,20 420,50 500,25"
                fill="none"
                stroke="#0C6237"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Key Data Markers */}
              <circle cx="150" cy="90" r="4" fill="#0C6237" stroke="#ffffff" strokeWidth="2" />
              <circle cx="320" cy="60" r="4" fill="#0C6237" stroke="#ffffff" strokeWidth="2" />
              <circle cx="500" cy="25" r="5" fill="#FF6515" stroke="#ffffff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span className="text-[#0C6237] font-black">Sun (Peak)</span>
            </div>
          </div>
        </div>

        {/* Order Fulfillment Health */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-base text-slate-900">Order Health</h3>
            <p className="text-xs text-slate-400 font-medium">Real-time breakdown of current orders</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Delivered Successfully</span>
                <span className="text-[#0C6237]">{deliveredOrders}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Dispatched & On the Road</span>
                <span className="text-sky-600">{dispatchedOrders}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Processing & Packing</span>
                <span className="text-orange-600">{processingOrders}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Pending Confirmation</span>
                <span className="text-amber-600">{pendingOrders}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-black text-slate-700 border border-slate-200 transition"
          >
            View Full Order Pipeline →
          </button>
        </div>
      </div>

      {/* Interactive Recent Orders Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base text-slate-900">Recent Customer Orders</h3>
            <p className="text-xs text-slate-400 font-medium">Click any order to view details, update status, or print invoice.</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-black text-[#0C6237] hover:underline"
          >
            See all orders ({orders.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Delivery Area</th>
                <th className="py-2.5 px-3">Total (LKR)</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {orders.slice(0, 5).map(o => (
                <tr
                  key={o.id}
                  onClick={() => onOpenOrder(o)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 group-hover:text-[#0C6237]">
                    {o.orderNumber}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{o.customerName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{o.customerPhone}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {o.customerAddress}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {o.totalAmount.toLocaleString()}.00
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      o.paymentStatus === 'PAID' ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      o.status === 'DELIVERED' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                      o.status === 'ON_THE_WAY' ? 'bg-sky-50 text-sky-700' :
                      o.status === 'PROCESSING' ? 'bg-orange-50 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {o.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOrder(o);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0C4E3B] hover:text-white text-slate-600 text-xs font-bold transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
