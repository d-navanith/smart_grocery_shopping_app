import React, { useState } from 'react';
import {
  Ticket,
  Plus,
  Search,
  Copy,
  Edit2,
  Trash2
} from 'lucide-react';
import { PromotionCoupon } from './part1_imports_types';

interface PromotionsViewProps {
  promotions: PromotionCoupon[];
  promotionsTab: 'ALL' | 'ACTIVE' | 'SCHEDULED' | 'EXPIRED';
  setPromotionsTab: (t: any) => void;
  preventCouponStacking: boolean;
  setPreventCouponStacking: (v: boolean | ((prev: boolean) => boolean)) => void;
  excludeDeliveryFees: boolean;
  setExcludeDeliveryFees: (v: boolean | ((prev: boolean) => boolean)) => void;
  onOpenCreateModal: () => void;
  onOpenEditModal: (promo: PromotionCoupon) => void;
  onToggleStatus: (promoId: string) => void;
  onDeletePromo: (promoId: string) => void;
  onCopyCode: (code: string) => void;
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({
  promotions,
  promotionsTab,
  setPromotionsTab,
  onOpenCreateModal,
  onOpenEditModal,
  onToggleStatus,
  onDeletePromo,
  onCopyCode
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredPromos = promotions.filter(p => {
    if (promotionsTab === 'ACTIVE' && p.status !== 'Active') return false;
    if (promotionsTab === 'SCHEDULED' && p.status !== 'Scheduled') return false;
    if (promotionsTab === 'EXPIRED' && p.status !== 'Expired') return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  const activeCount = promotions.filter(p => p.status === 'Active').length;
  const scheduledCount = promotions.filter(p => p.status === 'Scheduled').length;
  const expiredCount = promotions.filter(p => p.status === 'Expired').length;

  return (
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
            PROMOTIONS
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Create and manage coupon codes, seasonal discounts, and free delivery perks.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-6 py-2.5 rounded-xl bg-[#107B55] hover:bg-[#0c6344] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Promotion</span>
        </button>
      </div>

      {/* 2. Four Soft-Gray Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Total Coupons</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {promotions.length}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">All campaigns</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Active Promos</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {activeCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Live on storefront</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Scheduled</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {scheduledCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Upcoming</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Expired</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {expiredCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Inactive</span>
        </div>
      </div>

      {/* 3. Search & Tabs Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search promo name or coupon code..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'ALL', label: `All (${promotions.length})` },
            { id: 'ACTIVE', label: `Active (${activeCount})` },
            { id: 'SCHEDULED', label: `Scheduled (${scheduledCount})` },
            { id: 'EXPIRED', label: `Expired (${expiredCount})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setPromotionsTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                promotionsTab === t.id
                  ? 'bg-[#E4F8B0] text-black shadow-xs font-black'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Coupons & Discount Rules
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 min-w-[200px]">Campaign Name & Code</th>
                <th className="py-3 px-4 min-w-[120px]">Discount</th>
                <th className="py-3 px-4 min-w-[120px]">Min. Spend</th>
                <th className="py-3 px-4 min-w-[120px]">Redemptions</th>
                <th className="py-3 px-4 min-w-[100px] text-center">Status</th>
                <th className="py-3 px-4 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredPromos.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      <button
                        onClick={() => onCopyCode(p.code)}
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-[#E4F8B0] font-mono text-xs font-bold text-gray-800 inline-flex items-center gap-1 transition"
                        title="Copy code"
                      >
                        <span>{p.code}</span>
                        <Copy className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#6DB33F] font-mono">
                    {p.offer || (p.discountType === 'PERCENTAGE' ? `${p.discountValue}% OFF` : `${p.discountValue} lei OFF`)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-700">
                    {p.minBasketValue > 0 ? `${p.minBasketValue} lei` : (p.minBasket || 'No minimum')}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {p.currentUsage} {p.maxUsage > 0 ? `/ ${p.maxUsage}` : 'uses'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleStatus(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        p.status === 'Active'
                          ? 'bg-[#E4F8B0] text-gray-900'
                          : p.status === 'Scheduled'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenEditModal(p)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#6DB33F] transition"
                        title="Edit promo"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete coupon "${p.name}"?`)) {
                            onDeletePromo(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 transition"
                        title="Delete promo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
