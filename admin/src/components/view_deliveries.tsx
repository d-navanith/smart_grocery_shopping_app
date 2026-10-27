import React, { useState } from 'react';
import {
  Truck,
  Clock,
  CheckCircle,
  Navigation,
  Plus,
  Search,
  Filter,
  Phone,
  Check,
  UserCheck,
  MapPin
} from 'lucide-react';
import { DeliveryScheduleItem, FleetRider } from './part1_imports_types';

interface DeliveriesViewProps {
  deliveriesList: DeliveryScheduleItem[];
  riders: FleetRider[];
  deliveriesTab: 'TODAY' | 'UNASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  setDeliveriesTab: (t: any) => void;
  deliveryRiderFilter: string;
  setDeliveryRiderFilter: (r: string) => void;
  onOpenAssignModal: (del: DeliveryScheduleItem) => void;
  onMarkStatus: (delId: string, status: DeliveryScheduleItem['status']) => void;
  onToggleRiderDuty: (riderId: string) => void;
  onOpenAddRiderModal: () => void;
}

export const DeliveriesView: React.FC<DeliveriesViewProps> = ({
  deliveriesList,
  riders,
  deliveriesTab,
  setDeliveriesTab,
  deliveryRiderFilter,
  setDeliveryRiderFilter,
  onOpenAssignModal,
  onMarkStatus,
  onToggleRiderDuty,
  onOpenAddRiderModal
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredDeliveries = deliveriesList.filter(d => {
    if (deliveriesTab === 'UNASSIGNED' && d.status !== 'Unassigned') return false;
    if (deliveriesTab === 'OUT_FOR_DELIVERY' && d.status !== 'On the road') return false;
    if (deliveriesTab === 'DELIVERED' && d.status !== 'Delivered') return false;

    if (deliveryRiderFilter !== 'ALL' && d.assignedRider !== deliveryRiderFilter) return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      const matchOrder = d.orderNumber.toLowerCase().includes(q);
      const matchCust = d.customerName.toLowerCase().includes(q);
      const matchPhone = d.customerPhone.toLowerCase().includes(q);
      const matchAddr = d.address.toLowerCase().includes(q);
      if (!matchOrder && !matchCust && !matchPhone && !matchAddr) return false;
    }
    return true;
  });

  const unassignedCount = deliveriesList.filter(d => d.status === 'Unassigned').length;
  const onRoadCount = deliveriesList.filter(d => d.status === 'On the road').length;
  const deliveredCount = deliveriesList.filter(d => d.status === 'Delivered').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Last-Mile Operations</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Deliveries</h2>
          <p className="text-xs text-slate-500 font-medium">Keep Colombo orders moving. Assign riders, track routes and confirm delivery.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddRiderModal}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Fleet Rider</span>
          </button>
          <button
            onClick={() => {
              const unassigned = deliveriesList.find(d => d.status === 'Unassigned');
              if (unassigned) onOpenAssignModal(unassigned);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>+ Assign delivery</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Today's deliveries</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{deliveriesList.length || 86}</p>
          <p className="text-[11px] font-bold text-emerald-600">+12% vs yesterday</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Awaiting assignment</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{unassignedCount}</p>
          <p className="text-[11px] font-bold text-orange-600">Ready to be allocated</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">On the road</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{onRoadCount}</p>
          <p className="text-[11px] font-bold text-slate-500">Across active couriers</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Delivered today</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{deliveredCount}</p>
          <p className="text-[11px] font-bold text-emerald-600">97.1% on-time delivery</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'TODAY', label: `Today (${deliveriesList.length})` },
          { id: 'UNASSIGNED', label: `Unassigned (${unassignedCount})` },
          { id: 'OUT_FOR_DELIVERY', label: `Out for delivery (${onRoadCount})` },
          { id: 'DELIVERED', label: `Delivered (${deliveredCount})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setDeliveriesTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              deliveriesTab === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Delivery Schedule Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base text-slate-900">Delivery Schedule</h3>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">
              {filteredDeliveries.length} orders
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search address or order..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4E3B]"
              />
            </div>
            <select
              value={deliveryRiderFilter}
              onChange={(e) => setDeliveryRiderFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
            >
              <option value="ALL">Rider: All active</option>
              {riders.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Order & Customer</th>
                <th className="py-2.5 px-3">Delivery Address</th>
                <th className="py-2.5 px-3">Time Window</th>
                <th className="py-2.5 px-3">Assigned Courier</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status Action</th>
                <th className="py-2.5 px-3 text-right">Quick Assign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDeliveries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    No deliveries match this view.
                  </td>
                </tr>
              ) : (
                filteredDeliveries.map((del) => (
                  <tr key={del.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3">
                      <p className="font-extrabold text-slate-900">{del.orderNumber} • {del.customerName}</p>
                      <p className="text-[11px] font-mono text-slate-400">{del.customerPhone}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {del.address}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-700">
                      {del.timeWindow}
                    </td>
                    <td className="py-3 px-3">
                      {del.assignedRider === 'Unassigned' ? (
                        <button
                          onClick={() => onOpenAssignModal(del)}
                          className="text-orange-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>⚠️ Unassigned</span>
                        </button>
                      ) : (
                        <span className="font-extrabold text-slate-900 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#0C6237]" />
                          <span>{del.assignedRider}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-700">
                      {del.payment}
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable Quick Status toggle */}
                      {del.status === 'Unassigned' ? (
                        <button
                          onClick={() => onOpenAssignModal(del)}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FEF3EC] text-[#D96528] hover:bg-orange-100 transition active:scale-95"
                        >
                          + Assign Now
                        </button>
                      ) : del.status === 'On the road' ? (
                        <button
                          onClick={() => onMarkStatus(del.id, 'Delivered')}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-50 text-sky-700 hover:bg-sky-100 transition active:scale-95 flex items-center gap-1"
                          title="Click to complete delivery"
                        >
                          <span>On Road → Mark Delivered</span>
                        </button>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#E6F7EF] text-[#0C6237]">
                          ✓ Delivered
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onOpenAssignModal(del)}
                        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
                      >
                        {del.status === 'Unassigned' ? 'Assign Rider' : 'Reassign'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rider Availability Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900">Active Fleet Riders</h3>
          <span className="text-xs text-slate-400 font-medium">Click "Toggle Shift" to update duty status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riders.map((rider) => (
            <div
              key={rider.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-sm text-slate-900">{rider.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{rider.vehicle}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{rider.phone} • {rider.zone}</p>
                </div>
                <button
                  onClick={() => onToggleRiderDuty(rider.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-black transition active:scale-95 ${
                    rider.status === 'Available' || rider.status === 'On Delivery'
                      ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                  title="Click to toggle shift status"
                >
                  {rider.status === 'Available' || rider.status === 'On Delivery' ? '● On duty' : '○ On break'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-medium">{rider.completedToday} done today ({rider.activeDeliveries} active)</span>
                <span className="font-black text-amber-500">★ {rider.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
