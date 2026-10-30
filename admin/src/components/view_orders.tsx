import React, { useState } from 'react';
import {
  ShoppingBag,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Printer,
  ChevronDown,
  Trash2,
  Eye,
  Check,
  UserCheck,
  Phone,
  LayoutGrid,
  List,
  ArrowRight
} from 'lucide-react';
import { Order } from './part1_imports_types';

interface OrdersViewProps {
  orders: Order[];
  ordersTab: 'ALL' | 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  setOrdersTab: (tab: any) => void;
  orderPaymentFilter: string;
  setOrderPaymentFilter: (f: string) => void;
  onOpenOrder: (order: Order) => void;
  onOpenDispatchModal?: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onUpdatePayment: (orderId: string, payment: 'PAID' | 'PENDING' | 'FAILED') => void;
  onPrintInvoice: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onExportCsv: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  ordersTab,
  setOrdersTab,
  orderPaymentFilter,
  setOrderPaymentFilter,
  onOpenOrder,
  onOpenDispatchModal,
  onUpdateStatus,
  onUpdatePayment,
  onPrintInvoice,
  onDeleteOrder,
  onExportCsv
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'CARDS' | 'TABLE'>('CARDS'); // Bitepoint Cards default!
  const [quickFilter, setQuickFilter] = useState<'ALL' | 'ON_PROCESS' | 'COMPLETED'>('ALL');

  // Filter logic
  const filteredOrders = orders.filter(o => {
    // Quick filter (Bitepoint Image 2: All / On Process / Completed)
    if (quickFilter === 'ON_PROCESS') {
      if (o.status !== 'PROCESSING' && o.status !== 'ON_THE_WAY' && o.status !== 'PENDING') return false;
    } else if (quickFilter === 'COMPLETED') {
      if (o.status !== 'DELIVERED') return false;
    }

    // Tab filter
    if (ordersTab === 'PENDING' && o.status !== 'PENDING') return false;
    if (ordersTab === 'PROCESSING' && o.status !== 'PROCESSING') return false;
    if (ordersTab === 'DISPATCHED' && o.status !== 'ON_THE_WAY') return false;
    if (ordersTab === 'DELIVERED' && o.status !== 'DELIVERED') return false;
    if (ordersTab === 'CANCELLED' && o.status !== 'CANCELLED') return false;

    // Payment filter
    if (orderPaymentFilter === 'PAID' && o.paymentStatus !== 'PAID') return false;
    if (orderPaymentFilter === 'PENDING' && o.paymentStatus !== 'PENDING') return false;

    // Search filter
    if (localSearch) {
      const q = localSearch.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchCust = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      const matchAddr = o.customerAddress.toLowerCase().includes(q);
      if (!matchNum && !matchCust && !matchPhone && !matchAddr) return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map(o => o.id));
    }
  };

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const processingCount = orders.filter(o => o.status === 'PROCESSING').length;
  const dispatchedCount = orders.filter(o => o.status === 'ON_THE_WAY').length;
  const deliveredCount = orders.filter(o => o.status === 'DELIVERED').length;
  const onProcessCount = pendingCount + processingCount + dispatchedCount;

  // Bitepoint badge generator
  const getBitepointBadge = (idx: number) => {
    const badges = [
      { code: 'A4', color: 'bg-emerald-600 text-white' },
      { code: 'B2', color: 'bg-teal-600 text-white' },
      { code: 'TA', color: 'bg-amber-500 text-white' },
      { code: 'A9', color: 'bg-emerald-700 text-white' },
      { code: 'C2', color: 'bg-cyan-700 text-white' },
      { code: 'A2', color: 'bg-teal-700 text-white' }
    ];
    return badges[idx % badges.length];
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      {/* 1. TOP HEADER & BITEPOINT SUB-FILTERS (Reference Image 2) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Orders
          </h2>

          {/* Bitepoint Filter Pills: All | On Process | Completed */}
          <div className="flex items-center p-1 rounded-2xl bg-[#ECEEF2] text-xs font-bold gap-1">
            <button
              onClick={() => { setQuickFilter('ALL'); setOrdersTab('ALL'); }}
              className={`px-4 py-1.5 rounded-xl transition ${
                quickFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => { setQuickFilter('ON_PROCESS'); setOrdersTab('ALL'); }}
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                quickFilter === 'ON_PROCESS'
                  ? 'bg-[#0B3B2C] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>On Process</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold">{onProcessCount}</span>
            </button>
            <button
              onClick={() => { setQuickFilter('COMPLETED'); setOrdersTab('ALL'); }}
              className={`px-4 py-1.5 rounded-xl transition ${
                quickFilter === 'COMPLETED'
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({deliveredCount})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar matching Image 2 */}
          <div className="relative w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search a name, order, or etc"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F8B838] shadow-xs"
            />
          </div>

          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center p-1 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode('CARDS')}
              title="Bitepoint Ticket Cards"
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'CARDS' ? 'bg-[#F8B838] text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              title="Table Register View"
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'TABLE' ? 'bg-[#F8B838] text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onExportCsv}
            className="px-3.5 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. BITEPOINT TICKET CARDS GRID (Reference Image 2) */}
      {viewMode === 'CARDS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.map((order, idx) => {
            const badge = getBitepointBadge(idx);
            return (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                {/* Card Header: Table Badge, Customer Name, Status */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${badge.color} font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                        {badge.code}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-900 leading-tight">
                          {order.customerName}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Order #{order.orderNumber} • Delivery
                        </p>
                      </div>
                    </div>

                    {/* Status badge pill */}
                    <div>
                      {order.status === 'DELIVERED' ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ready
                        </span>
                      ) : order.status === 'ON_THE_WAY' ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-sky-100 text-sky-800 flex items-center gap-1">
                          <Truck className="w-3 h-3" /> On Transit
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> In Progress
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-3 border-b border-slate-100 pb-2.5">
                    <span>Wed, 30 Oct 2026</span>
                    <span>06:12 PM</span>
                  </div>

                  {/* Itemized list matching Image 2 */}
                  <div className="pt-2 space-y-2 text-xs">
                    {order.items.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-600">
                        <span className="line-clamp-1 max-w-[180px] font-medium">{item.productTitle}</span>
                        <div className="flex items-center gap-4 text-right shrink-0">
                          <span className="text-slate-400 font-bold w-4">x{item.quantity}</span>
                          <span className="font-bold text-slate-800 w-16">
                            {(item.price * item.quantity).toFixed(2)} lei
                          </span>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <p className="text-[10px] text-slate-400 italic">+{order.items.length - 4} more items</p>
                    )}
                  </div>
                </div>

                {/* Card Footer: Total & Bitepoint Buttons */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Total</span>
                    <span className="text-base font-black text-slate-900">
                      {order.totalAmount.toFixed(2)} lei
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenOrder(order)}
                      className="w-full py-2.5 rounded-2xl bg-[#ECEEF2] hover:bg-slate-200 text-slate-700 text-xs font-black transition active:scale-95"
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => {
                        if (onOpenDispatchModal) onOpenDispatchModal(order);
                        else onOpenOrder(order);
                      }}
                      className="w-full py-2.5 rounded-2xl bg-[#F8B838] hover:bg-[#E5A91A] text-slate-900 text-xs font-black shadow-xs transition active:scale-95"
                    >
                      Pay Bills
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. TABLE REGISTER VIEW */}
      {viewMode === 'TABLE' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded text-[#0C4E3B] focus:ring-[#0C4E3B]"
                    />
                  </th>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => onOpenOrder(o)}>
                    <td className="py-3 px-3">
                      <input type="checkbox" checked={selectedIds.includes(o.id)} onChange={() => {}} />
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{o.customerName}</p>
                      <p className="text-[10px] text-slate-400">{o.customerPhone}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono">{o.placedAt}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{o.totalAmount.toFixed(2)} lei</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700">
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onOpenOrder(o)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onOpenDispatchModal && onOpenDispatchModal(o)}
                        className="px-2.5 py-1 rounded-xl bg-[#F8B838] hover:bg-[#E5A91A] text-slate-900 text-xs font-black"
                      >
                        Pay / Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
