import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  UserPlus,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  Phone,
  Plus
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
  onPrintInvoice?: (order: Order) => void;
  onDeleteOrder?: (orderId: string) => void;
  onExportCsv?: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onOpenOrder,
  onUpdateStatus,
  onOpenDispatchModal
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ON_PROCESS' | 'COMPLETED' | 'PENDING'>('ALL');
  const [availableRiders, setAvailableRiders] = useState<string[]>(['Siva', 'Ion Popescu', 'Andrei Vasile', 'Glovo Express']);
  const [newRiderName, setNewRiderName] = useState('');
  const [isAddRiderModalOpen, setIsAddRiderModalOpen] = useState(false);
  const [selectedOrderForRider, setSelectedOrderForRider] = useState<Order | null>(null);

  // Filter logic matching Screenshot 1
  const filteredOrders = orders.filter((o) => {
    // Status filter
    if (statusFilter === 'ON_PROCESS') {
      if (o.status !== 'PROCESSING' && o.status !== 'ON_THE_WAY' && o.status !== 'PENDING') return false;
    } else if (statusFilter === 'COMPLETED') {
      if (o.status !== 'DELIVERED') return false;
    } else if (statusFilter === 'PENDING') {
      if (o.status !== 'PENDING') return false;
    }

    // Search query matching Order Number (e.g. 10567), Name, Phone, or Address
    if (localSearch.trim()) {
      const q = localSearch.trim().toLowerCase();
      const num = (o.orderNumber || '').toLowerCase();
      const name = (o.customerName || '').toLowerCase();
      const phone = (o.customerPhone || '').toLowerCase();
      const addr = (o.customerAddress || '').toLowerCase();
      if (!num.includes(q) && !name.includes(q) && !phone.includes(q) && !addr.includes(q)) {
        return false;
      }
    }

    return true;
  });

  const handleRiderChange = (order: Order, riderName: string) => {
    if (riderName === '__ADD_NEW__') {
      setSelectedOrderForRider(order);
      setIsAddRiderModalOpen(true);
      return;
    }

    order.assignedRider = riderName;
    if (riderName !== 'Not Yet' && order.status === 'PENDING') {
      onUpdateStatus(order.id, 'PROCESSING');
    }
  };

  const handleAddNewRiderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRiderName.trim()) return;
    const name = newRiderName.trim();
    if (!availableRiders.includes(name)) {
      setAvailableRiders((prev) => [...prev, name]);
    }
    if (selectedOrderForRider) {
      selectedOrderForRider.assignedRider = name;
      if (selectedOrderForRider.status === 'PENDING') {
        onUpdateStatus(selectedOrderForRider.id, 'PROCESSING');
      }
    }
    setNewRiderName('');
    setIsAddRiderModalOpen(false);
    setSelectedOrderForRider(null);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* 1. Green Heading matching Screenshot 1 */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight">
          ORDERS
        </h1>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input Pill */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search a name, order, or etc"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        {/* Filter Dropdown Pill */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="appearance-none bg-[#EFEFEF] hover:bg-gray-200/70 border border-transparent rounded-xl px-6 py-3 pr-10 text-sm font-semibold text-gray-700 cursor-pointer focus:outline-none focus:border-[#6DB33F] transition shadow-2xs"
            >
              <option value="ALL">All</option>
              <option value="ON_PROCESS">On Process</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending Confirmation</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              setSelectedOrderForRider(null);
              setIsAddRiderModalOpen(true);
            }}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 inline-flex items-center gap-2 shadow-2xs transition"
          >
            <UserPlus className="w-4 h-4 text-[#6DB33F]" />
            <span>+ Add Delivery Guy</span>
          </button>
        </div>
      </div>

      {/* 3. Order List Card & Table matching Screenshot 1 */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Order List
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            {/* Header row with light gray background and thin borders */}
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 w-12 text-center">No.</th>
                <th className="py-3 px-4 min-w-[160px]">Customer Name</th>
                <th className="py-3 px-4 min-w-[240px]">Address</th>
                <th className="py-3 px-4 min-w-[140px]">Contact Number</th>
                <th className="py-3 px-4 min-w-[160px]">Assigned Rider</th>
                <th className="py-3 px-4 min-w-[120px] text-center">Action</th>
                <th className="py-3 px-4 w-20 text-center">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    No matching orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => {
                  const assigned = order.assignedRider || 'Not Yet';
                  const isCompleted = order.status === 'DELIVERED';
                  const actionLabel = isCompleted
                    ? 'Completed'
                    : order.status === 'ON_THE_WAY'
                    ? 'On the way'
                    : order.status === 'PROCESSING'
                    ? 'On Process'
                    : 'Pending';

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800"
                    >
                      {/* No. */}
                      <td className="py-3.5 px-4 text-center font-semibold text-gray-600">
                        {idx + 1}.
                      </td>

                      {/* Customer Name + Order Number badge */}
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        <div className="flex flex-col">
                          <span>{order.customerName}</span>
                          <span className="text-[11px] font-mono text-gray-400 font-normal">
                            #{order.orderNumber}
                          </span>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 text-gray-700">
                        {order.customerAddress}
                      </td>

                      {/* Contact Number */}
                      <td className="py-3.5 px-4 font-mono font-medium text-gray-700">
                        {order.customerPhone}
                      </td>

                      {/* Assigned Rider Dropdown */}
                      <td className="py-3 px-3">
                        <div className="relative">
                          <select
                            value={assigned}
                            onChange={(e) => handleRiderChange(order, e.target.value)}
                            className="w-full bg-[#EFEFEF] hover:bg-gray-200/80 border border-transparent rounded-lg py-1.5 pl-3 pr-7 text-xs font-semibold text-gray-800 cursor-pointer focus:outline-none focus:border-[#6DB33F] transition"
                          >
                            <option value="Not Yet">Not Yet</option>
                            {availableRiders.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                            <option value="__ADD_NEW__">+ New Rider...</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                        </div>
                      </td>

                      {/* Action status pill */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'ON_THE_WAY'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'PROCESSING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {actionLabel}
                        </span>
                      </td>

                      {/* View button */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onOpenOrder(order)}
                          className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition active:scale-95 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Delivery Guy Modal */}
      {isAddRiderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-modal-pop">
            <h3 className="text-lg font-bold text-gray-900">
              Enter Delivery Guy Details
            </h3>
            <p className="text-xs text-gray-500">
              When calling the courier center (Glovo, Bolt, Fan Courier, etc.), enter the assigned rider name to assign to the order.
            </p>

            <form onSubmit={handleAddNewRiderSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Delivery Guy Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Siva, Ion Popescu, Alex Dumitru"
                  value={newRiderName}
                  onChange={(e) => setNewRiderName(e.target.value)}
                  className="w-full bg-[#EFEFEF] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#6DB33F] border border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddRiderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6DB33F] hover:bg-[#5da033] text-xs font-bold text-white shadow-xs transition"
                >
                  Save & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
