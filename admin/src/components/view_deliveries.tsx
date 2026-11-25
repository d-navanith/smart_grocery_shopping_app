import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Search,
  Check,
  MapPin,
  Trash2
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
  onDeleteRider?: (riderId: string) => void;
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
  onOpenAddRiderModal,
  onDeleteRider
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
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
            DELIVERIES
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Dispatch fleet riders, track delivery progress, and coordinate doorstep handovers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddRiderModal}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-2xs flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4 text-[#6DB33F]" />
            <span>+ Add Fleet Rider</span>
          </button>
          <button
            onClick={() => {
              const unassigned = deliveriesList.find(d => d.status === 'Unassigned');
              if (unassigned) onOpenAssignModal(unassigned);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#107B55] hover:bg-[#0c6344] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>+ Assign Delivery</span>
          </button>
        </div>
      </div>

      {/* 2. Four Soft-Gray Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Today's Parcels</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {deliveriesList.length}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Scheduled</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Unassigned</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {unassignedCount}
          </span>
          <span className="text-xs text-amber-600 mt-2 font-bold">Needs allocation</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">On the Road</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {onRoadCount}
          </span>
          <span className="text-xs text-blue-600 mt-2 font-bold">In transit</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Delivered</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {deliveredCount}
          </span>
          <span className="text-xs text-emerald-600 mt-2 font-bold">Completed</span>
        </div>
      </div>

      {/* 3. Search & Tabs Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search address, order, or customer..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'TODAY', label: `All (${deliveriesList.length})` },
            { id: 'UNASSIGNED', label: `Unassigned (${unassignedCount})` },
            { id: 'OUT_FOR_DELIVERY', label: `On the Road (${onRoadCount})` },
            { id: 'DELIVERED', label: `Delivered (${deliveredCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setDeliveriesTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                deliveriesTab === tab.id
                  ? 'bg-[#E4F8B0] text-black shadow-xs font-black'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Delivery Dispatch Board
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 min-w-[180px]">Order & Customer</th>
                <th className="py-3 px-4 min-w-[220px]">Delivery Address</th>
                <th className="py-3 px-4 min-w-[120px]">Time Window</th>
                <th className="py-3 px-4 min-w-[160px]">Assigned Courier</th>
                <th className="py-3 px-4 min-w-[120px]">Payment</th>
                <th className="py-3 px-4 min-w-[140px] text-center">Status Action</th>
                <th className="py-3 px-4 w-28 text-center">Quick Assign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredDeliveries.map(del => (
                <tr key={del.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{del.orderNumber} • {del.customerName}</div>
                    <div className="text-xs text-gray-400 font-mono font-normal">{del.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {del.address}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-semibold">
                    {del.timeWindow}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {del.assignedRider === 'Unassigned' ? (
                      <span className="text-amber-600 font-medium">Not Yet</span>
                    ) : (
                      <span className="text-gray-900">{del.assignedRider}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-700">
                    {del.payment}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {del.status === 'Unassigned' ? (
                      <button
                        onClick={() => onOpenAssignModal(del)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                      >
                        + Assign Rider
                      </button>
                    ) : del.status === 'On the road' ? (
                      <button
                        onClick={() => onMarkStatus(del.id, 'Delivered')}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                      >
                        Mark Delivered
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E4F8B0] text-gray-900">
                        ✓ Delivered
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onOpenAssignModal(del)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs transition"
                    >
                      Assign
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
