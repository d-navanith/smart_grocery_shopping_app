import React, { useState } from 'react';
import {
  Ticket,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Copy,
  Edit2,
  Trash2,
  Sliders,
  Sparkles,
  DollarSign
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
  preventCouponStacking,
  setPreventCouponStacking,
  excludeDeliveryFees,
  setExcludeDeliveryFees,
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
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Offers & Campaigns</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Promotions & Vouchers</h2>
          <p className="text-xs text-slate-500 font-medium">Create and manage coupon codes, seasonal discounts and delivery fee waivers.</p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create promotion</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Active promotions</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Ticket className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{activeCount}</p>
          <p className="text-[11px] font-bold text-slate-500">Live on checkout drawer</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Redemptions</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">186</p>
          <p className="text-[11px] font-bold text-emerald-600">+28% vs last week</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Discounts given</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">74,580 LKR</p>
          <p className="text-[11px] font-bold text-slate-500">Avg LKR 401 per order</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Attributed sales</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Ticket className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">624,500 LKR</p>
          <p className="text-[11px] font-bold text-emerald-600">8.37x ROI on discounts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'ALL', label: `All promotions (${promotions.length})` },
          { id: 'ACTIVE', label: `Active (${activeCount})` },
          { id: 'SCHEDULED', label: `Scheduled (${scheduledCount})` },
          { id: 'EXPIRED', label: `Expired (${expiredCount})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setPromotionsTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              promotionsTab === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Promotions Table Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base text-slate-900">Campaign Register</h3>
            <span className="text-xs text-slate-400 font-medium">• Click coupon code to copy</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search promotion name or code..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0C4E3B]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Promotion Name & Code</th>
                <th className="py-2.5 px-3">Customer Offer</th>
                <th className="py-2.5 px-3">Validity Window</th>
                <th className="py-2.5 px-3">Redemption Usage</th>
                <th className="py-2.5 px-3">Min Basket</th>
                <th className="py-2.5 px-3">Status Action</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPromos.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3">
                    <p className="font-extrabold text-slate-900">{p.name}</p>
                    <button
                      onClick={() => onCopyCode(p.code)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded bg-slate-100 hover:bg-[#E6F7EF] hover:text-[#0C6237] text-slate-700 font-mono text-[11px] font-bold transition"
                      title="Click to copy code"
                    >
                      <span>{p.code}</span>
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800">
                    {p.offer}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-medium">
                    {p.dates}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-700">{p.usage}</span>
                    <div className="w-20 h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                      <div
                        className="h-full bg-[#0C6237] rounded-full"
                        style={{ width: `${Math.min(100, (p.currentUsage / (p.maxUsage || 100)) * 100)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-700">
                    {p.minBasket}
                  </td>
                  <td className="py-3 px-3">
                    {/* Clickable Pause/Activate toggle */}
                    <button
                      onClick={() => onToggleStatus(p.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition active:scale-95 ${
                        p.status === 'Active'
                          ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                          : p.status === 'Paused'
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      title="Click to toggle active/pause"
                    >
                      {p.status === 'Active' ? '✓ Active (Pause)' : p.status === 'Paused' ? '⏸ Paused (Resume)' : p.status}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenEditModal(p)}
                        title="Edit promotion"
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete coupon "${p.code}"?`)) {
                            onDeletePromo(p.id);
                          }
                        }}
                        title="Delete promotion"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
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

      {/* Rules Configuration Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="font-black text-base text-slate-900">Promotion Rules & Guardrails</h3>
          <p className="text-xs text-slate-400 font-medium">Prevent margin erosion across Sri Lankan orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Rule 1: Prevent Stacking */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div>
              <p className="font-bold text-xs text-slate-900">Prevent coupon stacking</p>
              <p className="text-[11px] text-slate-500 font-medium">Customers can only apply one promotional code per basket.</p>
            </div>
            <button
              onClick={() => setPreventCouponStacking(prev => !prev)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                preventCouponStacking ? 'bg-[#0C6237]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  preventCouponStacking ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Rule 2: Exclude Delivery Fees */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div>
              <p className="font-bold text-xs text-slate-900">Exclude delivery fees</p>
              <p className="text-[11px] text-slate-500 font-medium">Percentage discounts apply to grocery items only, not courier fee.</p>
            </div>
            <button
              onClick={() => setExcludeDeliveryFees(prev => !prev)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                excludeDeliveryFees ? 'bg-[#0C6237]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  excludeDeliveryFees ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
