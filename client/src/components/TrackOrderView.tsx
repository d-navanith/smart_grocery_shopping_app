import React, { useState } from 'react';
import {
  Search,
  Phone,
  ChevronRight,
  AlertCircle,
  Lock,
  ArrowRight,
  PackageCheck,
  CheckCircle
} from 'lucide-react';
import { ClientOrder } from '../types';
import { TranslationDictionary } from '../translations';

interface TrackOrderViewProps {
  orders: ClientOrder[];
  initialOrderNumber?: string;
  onConfirmReceived?: (orderIdOrNumber: string) => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  orders,
  initialOrderNumber = '',
  onConfirmReceived,
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
    const found = orders.find(
      o =>
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
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] mb-1.5">
              <button onClick={onNavigateHome} className="hover:underline">
                {t.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#F96D26] font-bold">{t.trackOrderTitle}</span>
            </nav>
            <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
              <span className="text-[#0A6847] dark:text-white">Track Your </span>
              <span className="text-[#F96D26]">Order</span>
            </h1>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <img src="/figma_icon_delivery.png" alt="" className="w-8 h-8 object-contain shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#1B8057] dark:text-[#80F6C7] block">Live Bucharest & RO Dispatch</span>
              <span className="text-[#003D25] dark:text-zinc-300 text-[11px]">{t.trackOrderSubtitle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* 2. SEARCH & LOOKUP CARD (FIGMA GREEN BANNER) */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#1B8057] text-white shadow-md space-y-4 border-2 border-[#15875D]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#80F6C7] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.trackOrderSearchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#39906D] border border-white/80 text-white text-xs sm:text-sm font-medium placeholder-[#80F6C7] focus:outline-none focus:ring-2 focus:ring-[#F8C519]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#F8C519] hover:bg-[#EEAB1E] text-[#664E00] border border-[#C08512] font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 shrink-0 flex items-center justify-center gap-2"
            >
              <span>{t.trackOrderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Track Chips for Customer Recent Orders */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-[#80F6C7] font-semibold text-[11px]">{t.trackOrderQuickTrack}:</span>
              {orders.slice(0, 3).map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setSearchInput(o.orderNumber);
                    setSearchedOrder(o);
                    setHasSearched(true);
                  }}
                  className="px-3 py-1 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-mono text-xs border border-white/40 transition"
                >
                  #{o.orderNumber} ({o.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. TRACKING RESULTS */}
        {hasSearched && !searchedOrder ? (
          <div className="p-12 text-center rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] space-y-3">
            <AlertCircle className="w-12 h-12 text-[#F96D26] mx-auto" />
            <h3 className="text-lg font-bold text-[#003D25] dark:text-white">
              {t.trackOrderNotFound}
            </h3>
            <p className="text-xs text-[#1B8057] dark:text-zinc-400 max-w-md mx-auto">
              {t.trackOrderNotFoundDesc}
            </p>
          </div>
        ) : searchedOrder ? (
          <div className="rounded-xl bg-white dark:bg-zinc-900 border-2 border-[#15875D] shadow-md overflow-hidden space-y-6 p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#15875D]/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#0A6847] text-white font-bold text-xs uppercase font-mono">
                    #{searchedOrder.orderNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#1B8057]">
                    • {searchedOrder.placedAt.replace(/^(Astăzi|Today|අද)/i, t.todayLabel)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mt-1">
                  {t.expressDeliveryTo} {searchedOrder.deliveryZone || 'București Sector 1'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#F8C519] text-[#664E00] font-bold text-xs border border-[#C08512]/40">
                  {searchedOrder.paymentMethod}
                </span>
                <span className="px-3 py-1 rounded-md bg-[#F0FAF3] text-[#0A6847] font-bold text-xs border border-[#15875D]">
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* 5-Step Fulfillment Stepper */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7] block">
                {t.realtimeStageTrackerTitle}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                <div className="p-3.5 rounded-lg bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] font-bold">
                  <span className="text-[10px] uppercase font-bold text-[#1B8057] dark:text-emerald-400">Step 1</span>
                  <p className="font-bold text-black dark:text-white mt-1">📋 {t.step1OrderPlaced}</p>
                  <span className="text-[10px] text-[#003D25] dark:text-zinc-300 font-medium block mt-0.5">{t.step1OrderPlacedSub}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] font-bold">
                  <span className="text-[10px] uppercase font-bold text-[#1B8057] dark:text-emerald-400">Step 2</span>
                  <p className="font-bold text-black dark:text-white mt-1">📦 {t.step2Packing}</p>
                  <span className="text-[10px] text-[#003D25] dark:text-zinc-300 font-medium block mt-0.5">{t.step2PackingSub}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F8C519]/25 dark:bg-[#3D2D00] border border-[#C08512] font-bold">
                  <span className="text-[10px] uppercase font-bold text-[#664E00] dark:text-amber-300">Step 3</span>
                  <p className="font-bold text-black dark:text-white mt-1">📞 {t.step3DispatchCall}</p>
                  <span className="text-[10px] text-[#664E00] dark:text-amber-200 font-medium block mt-0.5">{t.step3DispatchCallSub}</span>
                </div>

                <div
                  className={`p-3.5 rounded-lg border font-bold ${
                    isRiderCallEnabled
                      ? 'bg-[#F0FAF3] dark:bg-[#0E2E20] border-[#15875D] text-black dark:text-white'
                      : 'bg-[#F2F7F4] dark:bg-zinc-800/90 border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold ${isRiderCallEnabled ? 'text-[#1B8057] dark:text-emerald-400' : 'text-slate-400 dark:text-zinc-500'}`}>Step 4</span>
                  <p className={`font-bold mt-1 ${isRiderCallEnabled ? 'text-black dark:text-white' : 'text-slate-500 dark:text-zinc-400'}`}>
                    {isRiderCallEnabled ? '🛡️ Rider Verified' : '🔒 Verification'}
                  </p>
                  <span className={`text-[10px] font-medium block mt-0.5 ${isRiderCallEnabled ? 'text-[#003D25] dark:text-zinc-300' : 'text-slate-400 dark:text-zinc-500'}`}>
                    {isRiderCallEnabled ? t.step4RiderConfirmedSub : t.step4RiderWaitingSub}
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-lg border font-bold ${
                    searchedOrder.status === 'ON_THE_WAY'
                      ? 'bg-[#0A6847] text-white border-[#0A6847] shadow-sm'
                      : 'bg-[#F2F7F4] dark:bg-zinc-800/90 border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold ${searchedOrder.status === 'ON_THE_WAY' ? 'text-emerald-200' : 'text-slate-400 dark:text-zinc-500'}`}>Step 5</span>
                  <p className={`font-bold mt-1 ${searchedOrder.status === 'ON_THE_WAY' ? 'text-white' : 'text-slate-500 dark:text-zinc-400'}`}>🛵 {t.step5OnTheWay}</p>
                  <span className={`text-[10px] font-medium block mt-0.5 ${searchedOrder.status === 'ON_THE_WAY' ? 'text-emerald-100' : 'text-slate-400 dark:text-zinc-500'}`}>{t.step5EtaPrefix} ~25 min</span>
                </div>
              </div>
            </div>

            {/* Courier & Rider Direct Call Verification Card */}
            <div className="p-5 rounded-xl bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] space-y-4">
              <div className="flex items-center justify-between border-b border-[#15875D]/20 pb-3">
                <div className="flex items-center gap-3">
                  <img src="/figma_icon_delivery.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B8057] dark:text-emerald-400">
                      {t.courierPartnerDirectContact}
                    </span>
                    <h4 className="font-bold text-sm text-black dark:text-white">
                      {searchedOrder.courierCompany || 'Glovo Express Bucharest'}
                    </h4>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    isRiderCallEnabled
                      ? 'bg-[#0A6847] text-white'
                      : 'bg-[#F8C519] text-[#664E00] border border-[#C08512]/40'
                  }`}
                >
                  {isRiderCallEnabled ? '✓ Rider Verified' : t.riderAllocatingBadge}
                </span>
              </div>

              {/* Direct Call Button (Locked vs Unlocked) */}
              {!isRiderCallEnabled ? (
                <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-[#15875D]/40 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#003D25] dark:text-amber-200">
                    <Lock className="w-4 h-4 text-[#F96D26]" />
                    <span>{t.riderCallLockedWarningTitle}</span>
                  </div>
                  <p className="text-[11px] text-[#003D25] dark:text-zinc-300 leading-relaxed">
                    {t.riderCallLockedWarningDesc}
                  </p>
                  <button
                    disabled
                    className="w-full py-3 rounded-md bg-[#F2F7F4] dark:bg-zinc-800 text-slate-400 text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#F96D26]" />
                    <span>{t.riderCallLockedBtnTooltip}</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-[#15875D] space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h5 className="font-bold text-xs text-black dark:text-white">
                        {searchedOrder.riderName}
                      </h5>
                      <p className="text-xs font-mono font-bold text-[#0A6847] dark:text-[#80F6C7]">
                        {t.riderDirectMobileLabel} <strong>{searchedOrder.riderPhone}</strong>
                      </p>
                    </div>
                    <a
                      href={`tel:${searchedOrder.riderPhone}`}
                      className="px-6 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition active:scale-95"
                    >
                      <Phone className="w-4 h-4 text-[#F8C519]" />
                      <span>
                        {t.callRiderButton}: {searchedOrder.riderPhone}
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Cash on Delivery Notice */}
            <div className="p-4 rounded-xl bg-[#F8C519]/20 border border-[#C08512] text-xs flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <img src="/figma_icon_cod.png" alt="" className="w-9 h-9 object-contain shrink-0" />
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {t.cashAmountToPrepare}{' '}
                    <span className="text-[#0A6847] dark:text-[#80F6C7] text-sm font-extrabold">
                      {searchedOrder.totalAmount.toFixed(2)} lei
                    </span>
                  </p>
                  <span className="text-[10px] text-[#664E00] dark:text-amber-300">
                    {t.cashOnDeliveryExactAmountNotice}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#F8C519] text-[#664E00] font-bold text-xs border border-[#C08512]/40">
                {t.cashOnDeliveryPaymentTag}
              </span>
            </div>

            {/* Customer Confirm Received Button (When order is active or out for delivery) */}
            {searchedOrder.status !== 'DELIVERED' && searchedOrder.status !== 'CANCELLED' && onConfirmReceived && (
              <div className={`p-4 rounded-xl border-2 border-[#15875D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                isDarkMode ? 'bg-[#0E2E20]' : 'bg-gradient-to-r from-[#F0FAF3] to-[#F2F7F4]'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0A6847] text-white flex items-center justify-center shrink-0">
                    <PackageCheck className="w-5 h-5 text-[#F8C519]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-black dark:text-white">
                      Did the rider hand over your parcel?
                    </h5>
                    <p className="text-[11px] text-[#1B8057] dark:text-zinc-300">
                      Confirm below once you have inspected your grocery parcel and paid the courier.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onConfirmReceived(searchedOrder.id || searchedOrder.orderNumber)}
                  className="px-5 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition active:scale-95 shrink-0"
                >
                  <CheckCircle className="w-4 h-4 text-[#F8C519]" />
                  <span>{t.confirmParcelReceivedBtn}</span>
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
