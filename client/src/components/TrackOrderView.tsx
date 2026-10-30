import React, { useState } from 'react';
import {
  Search,
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ClientOrder } from '../types';
import { TranslationDictionary } from '../translations';

interface TrackOrderViewProps {
  orders: ClientOrder[];
  initialOrderNumber?: string;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  orders,
  initialOrderNumber = '',
  onNavigateShop,
  onNavigateHome,
  isDarkMode,
  t
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<ClientOrder | null>(() => {
    if (initialOrderNumber) {
      const clean = initialOrderNumber.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
      return orders.find(o => o.orderNumber.replace(/[^0-9a-zA-Z]/g, '').toUpperCase().includes(clean)) || null;
    }
    return orders[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialOrderNumber));

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim()) return;

    setHasSearched(true);
    const query = searchInput.trim().toUpperCase().replace(/#/g, '');
    const found = orders.find(o =>
      o.orderNumber.toUpperCase().includes(query) ||
      o.customerPhone.includes(query) ||
      o.customerName.toUpperCase().includes(query)
    );
    setSearchedOrder(found || null);
  };

  const isRiderCallEnabled = Boolean(
    searchedOrder &&
    searchedOrder.riderVerifiedByAdmin &&
    searchedOrder.riderPhone &&
    searchedOrder.riderPhone.trim().length > 5
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* 1. BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbHome}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-white font-extrabold">{t.trackOrderTitle}</span>
      </nav>

      {/* 2. SEARCH & LOOKUP HERO */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B3B2C] to-[#0A6847] text-white shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E5A91A] text-amber-950 flex items-center justify-center text-2xl font-black shadow-md">
            🚚
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.trackOrderTitle}
            </h1>
            <p className="text-xs text-emerald-200 mt-1">
              {t.trackOrderSubtitle}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.trackOrderSearchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-inner placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E5A91A]"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-[#E5A91A] hover:bg-[#d49912] text-amber-950 font-black text-xs sm:text-sm shadow-md transition active:scale-95 shrink-0 flex items-center justify-center gap-2"
          >
            <span>{t.trackOrderBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Track Chips for Customer Recent Orders */}
        {orders.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2 text-xs">
            <span className="text-emerald-200 font-bold text-[11px]">{t.trackOrderQuickTrack}:</span>
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchInput(o.orderNumber);
                  setSearchedOrder(o);
                  setHasSearched(true);
                }}
                className="px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-900 text-white font-mono text-xs border border-emerald-600 transition"
              >
                #{o.orderNumber} ({o.status})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. TRACKING RESULTS */}
      {hasSearched && !searchedOrder ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-black text-slate-800 dark:text-white">
            {t.trackOrderNotFound}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
            {t.trackOrderNotFoundDesc}
          </p>
        </div>
      ) : searchedOrder ? (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden space-y-6 p-6">
          
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#0B3B2C] text-[#F8B838] font-black text-xs uppercase font-mono">
                  #{searchedOrder.orderNumber}
                </span>
                <span className="text-xs font-bold text-slate-400">• {searchedOrder.placedAt.replace(/^(Astăzi|Today|අද)/i, t.todayLabel)}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {t.expressDeliveryTo} {searchedOrder.deliveryZone || 'București Sector 1'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-black text-xs border border-amber-300">
                {searchedOrder.paymentMethod}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* 5-Step Fulfillment Stepper */}
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {t.realtimeStageTrackerTitle}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 font-bold">
                <span className="text-[10px] uppercase font-black text-emerald-800 dark:text-emerald-300">Step 1</span>
                <p className="font-black text-slate-900 dark:text-white mt-1">📋 {t.step1OrderPlaced}</p>
                <span className="text-[10px] opacity-75">{t.step1OrderPlacedSub}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 font-bold">
                <span className="text-[10px] uppercase font-black text-emerald-800 dark:text-emerald-300">Step 2</span>
                <p className="font-black text-slate-900 dark:text-white mt-1">📦 {t.step2Packing}</p>
                <span className="text-[10px] opacity-75">{t.step2PackingSub}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 font-bold">
                <span className="text-[10px] uppercase font-black text-amber-800 dark:text-amber-300">Step 3</span>
                <p className="font-black text-slate-900 dark:text-white mt-1">📞 {t.step3DispatchCall}</p>
                <span className="text-[10px] opacity-75">{t.step3DispatchCallSub}</span>
              </div>

              <div className={`p-3.5 rounded-2xl border font-bold ${
                isRiderCallEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400'
                  : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400'
              }`}>
                <span className="text-[10px] uppercase font-black">Step 4</span>
                <p className="font-black text-slate-900 dark:text-white mt-1">
                  {isRiderCallEnabled ? '🛡️ Rider Verified' : '🔒 Verification'}
                </p>
                <span className="text-[10px] opacity-75">
                  {isRiderCallEnabled ? t.step4RiderConfirmedSub : t.step4RiderWaitingSub}
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl border font-bold ${
                searchedOrder.status === 'ON_THE_WAY'
                  ? 'bg-[#0A6847] text-white shadow-md'
                  : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400'
              }`}>
                <span className="text-[10px] uppercase font-black">Step 5</span>
                <p className="font-black mt-1">🛵 {t.step5OnTheWay}</p>
                <span className="text-[10px] opacity-75">{t.step5EtaPrefix} ~25 min</span>
              </div>
            </div>
          </div>

          {/* Courier & Rider Direct Call Verification Card */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-zinc-800/80 border-2 border-slate-200 dark:border-zinc-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-[#F8B838] flex items-center justify-center text-xl">
                  🛵
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {t.courierPartnerDirectContact}
                  </span>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">
                    {searchedOrder.courierCompany || 'Glovo Express Bucharest'}
                  </h4>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                isRiderCallEnabled
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'bg-amber-100 text-amber-950 border border-amber-300'
              }`}>
                {isRiderCallEnabled ? '✓ Rider Verified' : t.riderAllocatingBadge}
              </span>
            </div>

            {/* Direct Call Button (Locked vs Unlocked) */}
            {!isRiderCallEnabled ? (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-950 dark:text-amber-200">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>{t.riderCallLockedWarningTitle}</span>
                </div>
                <p className="text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed">
                  {t.riderCallLockedWarningDesc}
                </p>
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-400 text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.riderCallLockedBtnTooltip}</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h5 className="font-black text-xs text-slate-900 dark:text-white">
                      {searchedOrder.riderName}
                    </h5>
                    <p className="text-xs font-mono font-bold text-[#0A6847] dark:text-[#78F9B8]">
                      {t.riderDirectMobileLabel} <strong>{searchedOrder.riderPhone}</strong>
                    </p>
                  </div>
                  <a
                    href={`tel:${searchedOrder.riderPhone}`}
                    className="px-6 py-3 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs shadow-md flex items-center gap-2 transition active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-[#FFB800]" />
                    <span>{t.callRiderButton}: {searchedOrder.riderPhone}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Cash on Delivery Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">💵</span>
              <div>
                <p className="font-black text-slate-900 dark:text-white">
                  {t.cashAmountToPrepare} <span className="text-[#0A6847] dark:text-[#78F9B8] text-sm">{searchedOrder.totalAmount.toFixed(2)} lei</span>
                </p>
                <span className="text-[10px] text-amber-900 dark:text-amber-300">{t.cashOnDeliveryExactAmountNotice}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#E5A91A] text-amber-950 font-black text-xs">
              {t.cashOnDeliveryPaymentTag}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
