import React, { useState } from 'react';
import {
  Star,
  Users,
  Search,
  CheckCircle,
  MessageSquare,
  Send,
  Eye,
  Trash2,
  Edit2,
  DollarSign,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { CustomerReview, CustomerAccount } from './part1_imports_types';

interface ReviewsViewProps {
  reviews: CustomerReview[];
  reviewsFilter: 'ALL' | '5_STAR' | '4_STAR' | 'NEEDS_REPLY';
  setReviewsFilter: (f: any) => void;
  onReplyReview: (id: string, text: string) => void;
  onTogglePublish: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  reviews,
  reviewsFilter,
  setReviewsFilter,
  onReplyReview,
  onTogglePublish,
  onDeleteReview
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [replyInputs, setReplyInputs] = useState<{ [id: string]: string }>({});

  const filteredReviews = reviews.filter(r => {
    if (reviewsFilter === '5_STAR' && r.rating !== 5) return false;
    if (reviewsFilter === '4_STAR' && r.rating !== 4) return false;
    if (reviewsFilter === 'NEEDS_REPLY' && r.reply !== '') return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      return r.customer.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q);
    }
    return true;
  });

  const needsReplyCount = reviews.filter(r => !r.reply).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Sentiment & Quality</span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Customer Reviews</h2>
        <p className="text-xs text-slate-500 font-medium">Verified customer feedback. Reply publicly, moderate and monitor product quality.</p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Average rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">4.92 ★</p>
          <p className="text-[11px] font-bold text-emerald-600">Top rated supermarket in Colombo</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total reviews</span>
            <MessageSquare className="w-4 h-4 text-[#0C6237]" />
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{reviews.length}</p>
          <p className="text-[11px] font-bold text-slate-500">100% verified orders</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Awaiting Reply</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{needsReplyCount}</p>
          <p className="text-[11px] font-bold text-orange-600">Pending customer response</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Positive Sentiment</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">98.4%</p>
          <p className="text-[11px] font-bold text-emerald-600">High satisfaction</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'ALL', label: `All Reviews (${reviews.length})` },
          { id: '5_STAR', label: '5-Star Reviews' },
          { id: '4_STAR', label: '4-Star Reviews' },
          { id: 'NEEDS_REPLY', label: `Needs Official Reply (${needsReplyCount})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setReviewsFilter(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              reviewsFilter === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search review by customer or product..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
        />
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.map(r => (
          <div key={r.id} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E6F7EF] text-[#0C6237] font-black text-xs flex items-center justify-center">
                  {r.customer[0]}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span>{r.customer}</span>
                    {r.verified && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-[#0C6237]">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">Purchased: {r.product} • {r.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 text-xs">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
                <button
                  onClick={() => onTogglePublish(r.id)}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-black transition active:scale-95 ${
                    r.isPublished ? 'bg-[#E6F7EF] text-[#0C6237]' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {r.isPublished ? 'Published' : 'Hidden'}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this customer review?')) {
                      onDeleteReview(r.id);
                    }
                  }}
                  className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Delete review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              "{r.comment}"
            </p>

            {/* Official Store Reply Section */}
            {r.reply ? (
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs space-y-1">
                <p className="font-extrabold text-[#0C6237] flex items-center gap-1.5">
                  <span>🏪 Ceylon Foods Official Reply</span>
                </p>
                <p className="text-slate-700 font-medium">{r.reply}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write official store reply to customer..."
                  value={replyInputs[r.id] || ''}
                  onChange={(e) => setReplyInputs({ ...replyInputs, [r.id]: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0C6237]"
                />
                <button
                  onClick={() => {
                    if (replyInputs[r.id]) {
                      onReplyReview(r.id, replyInputs[r.id]);
                      setReplyInputs({ ...replyInputs, [r.id]: '' });
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Reply</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CustomersViewProps {
  customers: CustomerAccount[];
  customerTierFilter: string;
  setCustomerTierFilter: (t: string) => void;
  onOpenCustomerDrawer: (c: CustomerAccount) => void;
  onUpdateTier: (id: string, tier: CustomerAccount['loyaltyTier']) => void;
  onToggleStatus: (id: string) => void;
  onDeleteCustomer?: (id: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  customerTierFilter,
  setCustomerTierFilter,
  onOpenCustomerDrawer,
  onUpdateTier,
  onToggleStatus,
  onDeleteCustomer
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredCustomers = customers.filter(c => {
    if (customerTierFilter !== 'ALL' && c.loyaltyTier !== customerTierFilter) return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
    }
    return true;
  });

  const platinumCount = customers.filter(c => c.loyaltyTier === 'Platinum').length;
  const goldCount = customers.filter(c => c.loyaltyTier === 'Gold').length;
  const totalLkrSpend = customers.reduce((sum, c) => sum + c.totalSpend, 0);

  return (
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
          CUSTOMERS
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Shopper accounts, order history, and customer profile management.
        </p>
      </div>

      {/* 2. Four Soft-Gray Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Total Shoppers</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {customers.length}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Registered accounts</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Platinum VIPs</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {platinumCount}
          </span>
          <span className="text-xs text-emerald-600 mt-2 font-bold">&gt; 500 lei spend</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Gold Tier</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {goldCount}
          </span>
          <span className="text-xs text-amber-600 mt-2 font-bold">Repeat buyers</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Lifetime Orders</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Fulfilled</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search customer name, email, phone, city..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={customerTierFilter}
            onChange={(e) => setCustomerTierFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Loyalty Tiers</option>
            <option value="Platinum">Platinum VIP</option>
            <option value="Gold">Gold Tier</option>
            <option value="Silver">Silver Tier</option>
            <option value="Bronze">Bronze Tier</option>
          </select>
        </div>
      </div>

      {/* 4. Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Customer Directory
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 min-w-[200px]">Customer</th>
                <th className="py-3 px-4 min-w-[140px]">Location</th>
                <th className="py-3 px-4 min-w-[120px]">Total Orders</th>
                <th className="py-3 px-4 min-w-[140px]">Lifetime Spend</th>
                <th className="py-3 px-4 min-w-[140px]">Loyalty Tier</th>
                <th className="py-3 px-4 min-w-[100px] text-center">Status</th>
                <th className="py-3 px-4 w-24 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredCustomers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{c.name}</div>
                    <div className="text-xs text-gray-400 font-mono font-normal">{c.email} • {c.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {c.city}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {c.totalOrders} orders
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    {c.totalSpend.toFixed(2)} lei
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={c.loyaltyTier}
                      onChange={(e) => onUpdateTier(c.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-xl border border-gray-300 text-xs font-bold text-gray-800 bg-white focus:outline-none focus:border-[#6DB33F]"
                    >
                      <option value="Platinum">★ Platinum VIP</option>
                      <option value="Gold">● Gold Tier</option>
                      <option value="Silver">○ Silver Tier</option>
                      <option value="Bronze">Bronze Tier</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleStatus(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        c.status === 'Active'
                          ? 'bg-[#E4F8B0] text-gray-900'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {c.status === 'Active' ? '✓ Active' : 'Suspended'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenCustomerDrawer(c)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs transition"
                    >
                      View
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
