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
  UserCheck
} from 'lucide-react';
import { Order } from './part1_imports_types';

interface OrdersViewProps {
  orders: Order[];
  ordersTab: 'ALL' | 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  setOrdersTab: (tab: any) => void;
  orderPaymentFilter: string;
  setOrderPaymentFilter: (f: string) => void;
  onOpenOrder: (order: Order) => void;
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
  onUpdateStatus,
  onUpdatePayment,
  onPrintInvoice,
  onDeleteOrder,
  onExportCsv
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter logic
  const filteredOrders = orders.filter(o => {
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

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const processingCount = orders.filter(o => o.status === 'PROCESSING').length;
  const dispatchedCount = orders.filter(o => o.status === 'ON_THE_WAY').length;
  const deliveredCount = orders.filter(o => o.status === 'DELIVERED').length;
  const cancelledCount = orders.filter(o => o.status === 'CANCELLED').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
            ORDER FULFILLMENT REGISTER
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Orders
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Full editable control: change statuses, assign couriers, toggle payments, and print invoices.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-emerald-50 text-[#0C6237] px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-200 animate-fadeIn">
              <span>{selectedIds.length} selected</span>
              <button
                onClick={() => {
                  selectedIds.forEach(id => onUpdateStatus(id, 'PROCESSING'));
                  setSelectedIds([]);
                }}
                className="underline hover:opacity-80"
              >
                Mark Processing
              </button>
            </div>
          )}
          <button
            onClick={onExportCsv}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Orders CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Total orders</span>
            <ShoppingBag className="w-4 h-4 text-[#0C6237]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
          <p className="text-[11px] text-slate-400 font-medium">Active in register</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Awaiting Action</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{pendingCount}</h3>
          <p className="text-[11px] text-orange-600 font-bold">Needs confirmation</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>In Packing</span>
            <Package className="w-4 h-4 text-[#0C6237]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{processingCount}</h3>
          <p className="text-[11px] text-slate-400 font-medium">Being prepared</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Out for Delivery</span>
            <Truck className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dispatchedCount}</h3>
          <p className="text-[11px] text-sky-600 font-bold">Active couriers on road</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'ALL', label: `All orders (${orders.length})` },
          { id: 'PENDING', label: `Pending (${pendingCount})` },
          { id: 'PROCESSING', label: `Processing (${processingCount})` },
          { id: 'DISPATCHED', label: `Dispatched (${dispatchedCount})` },
          { id: 'DELIVERED', label: `Delivered (${deliveredCount})` },
          { id: 'CANCELLED', label: `Cancelled (${cancelledCount})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setOrdersTab(tab.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              ordersTab === tab.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by Order ID, Customer, Phone..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={orderPaymentFilter}
              onChange={(e) => setOrderPaymentFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="PAID">Paid Online / Verified</option>
              <option value="PENDING">Pending Payment (COD)</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
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
                <th className="py-2.5 px-3">Customer & Contact</th>
                <th className="py-2.5 px-3">Date Placed</th>
                <th className="py-2.5 px-3">Total (LKR)</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Order Status (Quick Change)</th>
                <th className="py-2.5 px-3">Assigned Courier</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-bold">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(o.id)}
                        onChange={() => toggleSelectRow(o.id)}
                        className="rounded text-[#0C4E3B] focus:ring-[#0C4E3B]"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => onOpenOrder(o)}
                        className="font-mono font-black text-slate-900 hover:text-[#0C6237] hover:underline"
                      >
                        {o.orderNumber}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{o.customerName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{o.customerPhone}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-xs">{o.customerAddress}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {o.placedAt}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {o.totalAmount.toLocaleString()}.00
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable Payment Status */}
                      <button
                        onClick={() => onUpdatePayment(o.id, o.paymentStatus === 'PAID' ? 'PENDING' : 'PAID')}
                        title="Click to toggle payment status"
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition active:scale-95 ${
                          o.paymentStatus === 'PAID'
                            ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        {o.paymentStatus === 'PAID' ? '✓ Paid' : '⏳ COD / Unpaid'}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      {/* Quick Status Dropdown Selector */}
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateStatus(o.id, e.target.value as any)}
                        className={`text-[11px] font-black px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          o.status === 'DELIVERED' ? 'bg-[#E6F7EF] text-[#0C6237] border-emerald-200' :
                          o.status === 'ON_THE_WAY' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                          o.status === 'PROCESSING' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          o.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="PENDING">Pending Confirmation</option>
                        <option value="PROCESSING">Processing / Packing</option>
                        <option value="ON_THE_WAY">Dispatched / On the road</option>
                        <option value="DELIVERED">Delivered to Doorstep</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      {o.assignedRider ? (
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-[#0C6237]" />
                          <span>{o.assignedRider}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onOpenOrder(o)}
                          className="text-[11px] font-bold text-orange-600 hover:underline"
                        >
                          + Assign Courier
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenOrder(o)}
                          title="View order details drawer"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onPrintInvoice(o)}
                          title="Print official tax receipt"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete order ${o.orderNumber}?`)) {
                              onDeleteOrder(o.id);
                            }
                          }}
                          title="Delete order"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
