import React, { useState } from 'react';
import {
  Phone,
  Lock,
  RefreshCw,
  ShoppingCart,
  ChevronRight,
  CheckCircle,
  PackageCheck,
  X
} from 'lucide-react';
import { ClientOrder } from '../types';
import { TranslationDictionary } from '../translations';

interface DeliveriesViewProps {
  orders: ClientOrder[];
  onReorder: (order: ClientOrder) => void;
  onConfirmReceived?: (orderIdOrNumber: string) => void;
  onNavigateShop: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const DeliveriesView: React.FC<DeliveriesViewProps> = ({
  orders,
  onReorder,
  onConfirmReceived,
  onNavigateShop,
  isDarkMode,
  t
}) => {
  const [activeTab, setActiveTab] = useState<'ONGOING' | 'HISTORY'>('ONGOING');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<ClientOrder | null>(null);

  const formatPlacedAt = (placedAtStr: string) => {
    if (!placedAtStr) return '';
    return placedAtStr.replace(/^(Astăzi|Today|අද)/i, t.todayLabel);
  };

  // Ongoing orders: PENDING, PROCESSING, ON_THE_WAY
  const ongoingOrders = orders.filter(
    o => o.status === 'PROCESSING' || o.status === 'PENDING' || o.status === 'ON_THE_WAY'
  );

  // Completed delivery history: DELIVERED, CANCELLED
  const historyOrders = orders.filter(
    o => o.status === 'DELIVERED' || o.status === 'CANCELLED'
  );

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] dark:text-[#80F6C7] mb-1.5">
              <span onClick={onNavigateShop} className="cursor-pointer hover:underline">
                {t.tabHome}
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#F96D26] font-bold">{t.tabDeliveries}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
                <span className="text-[#0A6847] dark:text-white">
                  {t.tabDeliveries.split(' ')[0]}{' '}
                </span>
                <span className="text-[#F96D26]">
                  {t.tabDeliveries.split(' ').slice(1).join(' ') || 'Deliveries'}
                </span>
              </h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8C519] text-[#664E00] border border-[#C08512]/40">
                {ongoingOrders.length} {t.ongoingDeliveriesTitle}
              </span>
            </div>
            <p className="text-xs text-[#003D25] dark:text-zinc-400 mt-1 max-w-2xl">
              {t.adminVerificationNotice}
            </p>
          </div>

          <button
            onClick={onNavigateShop}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-xs shadow-sm transition active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 text-[#F8C519]" />
            <span>{t.startShoppingBtn}</span>
          </button>
        </div>
      </div>

      <div className={`max-w-[1290px] mx-auto px-4 sm:px-6 pt-8 space-y-8 ${isDarkMode ? 'text-white' : 'text-[#003D25]'}`}>
        {/* 2. TAB SWITCHER: ONGOING DELIVERIES vs DELIVERY HISTORY */}
        <div className="flex items-center gap-3 border-b border-[#15875D]/20 pb-3">
          <button
            onClick={() => setActiveTab('ONGOING')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition ${
              activeTab === 'ONGOING'
                ? 'bg-[#0A6847] text-white shadow-sm'
                : 'bg-[#F2F7F4] dark:bg-zinc-900 text-[#003D25] dark:text-zinc-300 hover:bg-[#F0FAF3]'
            }`}
          >
            <span>🛵 {t.ongoingDeliveriesTitle}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'ONGOING'
                  ? 'bg-[#F8C519] text-[#664E00]'
                  : 'bg-white dark:bg-zinc-800 text-[#1B8057] dark:text-[#80F6C7]'
              }`}
            >
              {ongoingOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition ${
              activeTab === 'HISTORY'
                ? 'bg-[#0A6847] text-white shadow-sm'
                : 'bg-[#F2F7F4] dark:bg-zinc-900 text-[#003D25] dark:text-zinc-300 hover:bg-[#F0FAF3]'
            }`}
          >
            <span>📜 {t.deliveryHistoryTitle}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'HISTORY'
                  ? 'bg-[#F8C519] text-[#664E00]'
                  : 'bg-white dark:bg-zinc-800 text-[#1B8057] dark:text-[#80F6C7]'
              }`}
            >
              {historyOrders.length}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* 3. TAB CONTENT: ONGOING DELIVERIES WITH VERIFIED RIDER CALL */}
        {/* ============================================================== */}
        {activeTab === 'ONGOING' && (
          <div className="space-y-6">
            {ongoingOrders.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] space-y-4">
                <img src="/figma_icon_delivery.png" alt="" className="w-16 h-16 mx-auto object-contain" />
                <h3 className="text-lg font-bold text-[#003D25] dark:text-white">
                  {t.noOngoingDeliveriesTitle}
                </h3>
                <p className="text-xs text-[#1B8057] dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {t.noOngoingDeliveriesDesc}
                </p>
                <button
                  onClick={onNavigateShop}
                  className="px-6 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-xs shadow-sm transition active:scale-95"
                >
                  {t.shopCeylonGroceriesBtn}
                </button>
              </div>
            ) : (
              ongoingOrders.map((order) => {
                // RIDER CALL ELIGIBILITY CHECK:
                // Client CANNOT call rider until admin assigns rider & enters rider mobile on arrival
                const isRiderCallEnabled = Boolean(
                  order.riderVerifiedByAdmin && order.riderPhone && order.riderPhone.trim().length > 5
                );

                return (
                  <div
                    key={order.id || order.orderNumber}
                    className="rounded-xl bg-white dark:bg-zinc-900 border-2 border-[#15875D] shadow-md overflow-hidden"
                  >
                    {/* Order Top Bar */}
                    <div className="p-5 sm:p-6 bg-[#1B8057] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 rounded-md bg-[#F8C519] text-[#664E00] font-bold text-xs uppercase tracking-wider">
                          TA #{order.orderNumber.replace(/[^0-9]/g, '').slice(-2) || '21'}
                        </span>
                        <div>
                          <h3 className="font-bold text-base text-white flex items-center gap-2">
                            <span>
                              {t.orderNumberPrefix} #{order.orderNumber}
                            </span>
                            <span className="text-[11px] font-medium text-[#80F6C7]">
                              • {formatPlacedAt(order.placedAt)}
                            </span>
                          </h3>
                          <p className="text-xs text-[#80F6C7]">
                            {t.expressDeliveryTo} <strong>{order.deliveryZone || 'Bucharest Sector 1'}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-md bg-[#F8C519] text-[#664E00] font-bold text-xs border border-[#C08512]/40">
                          {order.paymentMethod === 'CASH_ON_DELIVERY' || order.paymentMethod.includes('Cash')
                            ? t.paymentCodBadge
                            : t.paymentOnlineBadge}
                        </span>
                        <span className="px-3 py-1 rounded-md bg-[#0A6847] text-white font-bold text-xs border border-white/30">
                          {order.status === 'ON_THE_WAY' ? t.statusOutForDeliveryBadge : t.statusPackingBadge}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6 space-y-6">
                      {/* Visual 5-Step Fulfillment Stepper */}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7] block mb-3">
                          {t.realtimeStageTrackerTitle}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                          {/* Step 1 */}
                          <div className="p-3.5 rounded-lg bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] font-bold">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded bg-[#0A6847] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#1B8057] dark:text-emerald-400">
                                {t.stepNumberPrefix} 1
                              </span>
                            </div>
                            <p className="text-xs font-bold text-black dark:text-white">📋 {t.step1OrderPlaced}</p>
                            <span className="text-[10px] text-[#003D25] dark:text-zinc-300 font-normal block mt-0.5">
                              {t.step1OrderPlacedSub}
                            </span>
                          </div>

                          {/* Step 2 */}
                          <div className="p-3.5 rounded-lg bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] font-bold">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded bg-[#0A6847] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#1B8057] dark:text-emerald-400">
                                {t.stepNumberPrefix} 2
                              </span>
                            </div>
                            <p className="text-xs font-bold text-black dark:text-white">📦 {t.step2Packing}</p>
                            <span className="text-[10px] text-[#003D25] dark:text-zinc-300 font-normal block mt-0.5">
                              {t.step2PackingSub}
                            </span>
                          </div>

                          {/* Step 3 */}
                          <div
                            className={`p-3.5 rounded-lg border font-bold ${
                              order.status === 'ON_THE_WAY' || order.status === 'DELIVERED'
                                ? 'bg-[#F0FAF3] dark:bg-[#0E2E20] border-[#15875D]'
                                : 'bg-[#F8C519]/20 dark:bg-[#3D2D00] border-[#C08512]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                                  order.status === 'ON_THE_WAY' || order.status === 'DELIVERED'
                                    ? 'bg-[#0A6847] text-white'
                                    : 'bg-[#F8C519] text-[#664E00] font-bold'
                                }`}
                              >
                                {order.status === 'ON_THE_WAY' || order.status === 'DELIVERED' ? '✓' : '📞'}
                              </div>
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                order.status === 'ON_THE_WAY' || order.status === 'DELIVERED'
                                  ? 'text-[#1B8057] dark:text-emerald-400'
                                  : 'text-[#664E00] dark:text-amber-300'
                              }`}>
                                {t.stepNumberPrefix} 3
                              </span>
                            </div>
                            <p className="text-xs font-bold text-black dark:text-white">{t.step3DispatchCall}</p>
                            <span className={`text-[10px] font-normal block mt-0.5 ${
                              order.status === 'ON_THE_WAY' || order.status === 'DELIVERED'
                                ? 'text-[#003D25] dark:text-zinc-300'
                                : 'text-[#664E00] dark:text-amber-200'
                            }`}>
                              {t.step3DispatchCallSub}
                            </span>
                          </div>

                          {/* Step 4 */}
                          <div
                            className={`p-3.5 rounded-lg border font-bold ${
                              order.riderVerifiedByAdmin
                                ? 'bg-[#F0FAF3] dark:bg-[#0E2E20] border-[#15875D]'
                                : 'bg-[#F2F7F4] dark:bg-zinc-800/90 border-slate-300 dark:border-zinc-700 text-slate-500 dark:text-zinc-400'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                                  order.riderVerifiedByAdmin
                                    ? 'bg-[#0A6847] text-white'
                                    : 'bg-slate-300 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300'
                                }`}
                              >
                                {order.riderVerifiedByAdmin ? '🛡️' : '🔒'}
                              </div>
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                order.riderVerifiedByAdmin
                                  ? 'text-[#1B8057] dark:text-emerald-400'
                                  : 'text-slate-500 dark:text-zinc-500'
                              }`}>
                                {t.stepNumberPrefix} 4
                              </span>
                            </div>
                            <p className={`text-xs font-bold ${order.riderVerifiedByAdmin ? 'text-black dark:text-white' : 'text-slate-500 dark:text-zinc-400'}`}>{t.step4RiderVerification}</p>
                            <span className={`text-[10px] font-normal block mt-0.5 ${
                              order.riderVerifiedByAdmin ? 'text-[#003D25] dark:text-zinc-300' : 'text-slate-400 dark:text-zinc-500'
                            }`}>
                              {order.riderVerifiedByAdmin ? t.step4RiderConfirmedSub : t.step4RiderWaitingSub}
                            </span>
                          </div>

                          {/* Step 5 */}
                          <div
                            className={`p-3.5 rounded-lg border font-bold ${
                              order.status === 'ON_THE_WAY'
                                ? 'bg-[#0A6847] text-white border-[#0A6847] shadow-sm'
                                : 'bg-[#F2F7F4] dark:bg-zinc-800/90 border-slate-300 dark:border-zinc-700 text-slate-500 dark:text-zinc-400'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded bg-[#F8C519] text-[#664E00] flex items-center justify-center text-[10px]">
                                🛵
                              </div>
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                order.status === 'ON_THE_WAY' ? 'text-emerald-200' : 'text-slate-500 dark:text-zinc-500'
                              }`}>
                                {t.stepNumberPrefix} 5
                              </span>
                            </div>
                            <p className={`text-xs font-bold ${order.status === 'ON_THE_WAY' ? 'text-white' : 'text-slate-500 dark:text-zinc-400'}`}>🛵 {t.step5OnTheWay}</p>
                            <span className={`text-[10px] font-normal block mt-0.5 ${
                              order.status === 'ON_THE_WAY' ? 'text-emerald-100' : 'text-slate-400 dark:text-zinc-500'
                            }`}>
                              {t.step5EtaPrefix} ~25 min
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ============================================================== */}
                      {/* CRITICAL FEATURE: RIDER VERIFICATION & DIRECT CALL CONTROL     */}
                      {/* ============================================================== */}
                      <div className="p-5 rounded-xl bg-[#F0FAF3] dark:bg-zinc-800/80 border border-[#15875D] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#15875D]/20 pb-3">
                          <div className="flex items-center gap-3">
                            <img src="/figma_icon_delivery.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7]">
                                {t.courierPartnerDirectContact}
                              </span>
                              <h4 className="font-bold text-sm text-black dark:text-white">
                                {order.courierCompany || t.courierDefaultCompany}
                              </h4>
                            </div>
                          </div>

                          {isRiderCallEnabled ? (
                            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0A6847] text-white font-bold text-xs">
                              <span>🛡️</span>
                              <span>{t.verifiedRiderBadge}</span>
                            </span>
                          ) : (
                            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F8C519] text-[#664E00] font-bold text-xs border border-[#C08512]/40">
                              <span className="w-2 h-2 rounded-full bg-[#F96D26] animate-ping" />
                              <span>{t.riderAllocatingBadge}</span>
                            </span>
                          )}
                        </div>

                        {/* If rider phone is not assigned yet: show clean courier & support hotline without locked warnings */}
                        {!isRiderCallEnabled ? (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-zinc-400 py-1">
                            <span className="font-medium">
                              Courier Partner: <strong className="text-black dark:text-white">{order.courierCompany || t.courierDefaultCompany}</strong>
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                              Support Hotline: <a href="tel:+40721345678" className="text-[#0A6847] dark:text-[#80F6C7] font-bold hover:underline">+40 721 345 678</a>
                            </span>
                          </div>
                        ) : (
                          /* Condition B: RIDER ARRIVED & ADMIN ENTERED MOBILE NUMBER */
                          <div className="space-y-3">
                            <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-[#15875D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-lg bg-[#F0FAF3] dark:bg-zinc-800 border border-[#15875D] flex items-center justify-center text-xl shrink-0">
                                  🛵
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-base text-black dark:text-white">
                                      {order.riderName || 'Courier Rider'}
                                    </h5>
                                    <span className="px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-[10px] font-bold">
                                      {t.riderVerifiedBadge}
                                    </span>
                                  </div>
                                  <p className="text-xs font-mono font-bold text-[#0A6847] dark:text-[#80F6C7] mt-0.5">
                                    {t.riderDirectMobileLabel} <strong>{order.riderPhone}</strong>
                                  </p>
                                  <span className="text-[10px] text-[#1B8057] dark:text-zinc-400">
                                    {t.riderDirectMobileVerifiedHint}
                                  </span>
                                </div>
                              </div>

                              <a
                                href={`tel:${order.riderPhone}`}
                                className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95"
                              >
                                <Phone className="w-4 h-4 text-[#F8C519] animate-bounce" />
                                <span>
                                  {t.callRiderButton}: {order.riderPhone}
                                </span>
                              </a>
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#1B8057] dark:text-zinc-300 pt-1 px-1 flex-wrap gap-2">
                              <span className="font-bold text-[#0A6847] dark:text-[#80F6C7]">
                                🛡️ {t.riderCallDirectInstructions}
                              </span>
                              <span className="font-bold">
                                {t.riderEstimatedDoorEta} ~{order.deliveryMinutes || 25} min
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cash on Delivery Notice Card */}
                      <div className="p-4 rounded-xl bg-[#F8C519]/20 border border-[#C08512] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src="/figma_icon_cod.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                          <div>
                            <p className="font-bold text-black dark:text-white text-sm">
                              {t.cashAmountToPrepare}{' '}
                              <span className="text-[#0A6847] dark:text-[#80F6C7] font-extrabold text-base">
                                {order.totalAmount.toFixed(2)} lei
                              </span>
                            </p>
                            <span className="text-[11px] text-[#664E00] dark:text-amber-300">
                              {t.cashOnDeliveryExactAmountNotice}
                            </span>
                          </div>
                        </div>
                        <span className="px-3.5 py-1.5 rounded-md bg-[#F8C519] text-[#664E00] border border-[#C08512]/40 font-bold text-xs self-start sm:self-auto">
                          {t.cashOnDeliveryPaymentTag}
                        </span>
                      </div>

                      {/* Order Items List */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B8057] dark:text-[#80F6C7] block mb-2">
                          {t.orderedFoodItemsHeader} ({order.items.length}):
                        </span>
                        <div className="divide-y divide-[#15875D]/15 bg-[#F2F7F4] dark:bg-zinc-800/40 rounded-lg p-4 border border-[#15875D]/25 space-y-2">
                          {order.items.map((item, idx) => {
                            const title = typeof item === 'string' ? item : item.productTitle;
                            const qty = typeof item === 'string' ? 1 : item.quantity;
                            const price = typeof item === 'string' ? 0 : item.price * item.quantity;

                            return (
                              <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded bg-[#0A6847] text-white font-bold text-[10px] flex items-center justify-center">
                                    x{qty}
                                  </span>
                                  <span className="font-bold text-black dark:text-zinc-200">{title}</span>
                                </div>
                                {price > 0 && (
                                  <span className="font-bold text-[#0A6847] dark:text-white font-mono">
                                    {price.toFixed(2)} lei
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Delivery Address & Note */}
                      <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-800 border border-[#15875D]/30 text-xs flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded bg-[#F0FAF3] text-[#0A6847] flex items-center justify-center shrink-0 text-xs">
                          📍
                        </div>
                        <div>
                          <span className="font-bold text-[#1B8057] dark:text-[#80F6C7]">{t.deliveryDestinationAddress}</span>
                          <p className="font-bold text-black dark:text-white mt-0.5">{order.address}</p>
                          {order.notes && (
                            <p className="text-[11px] text-slate-500 italic mt-0.5">
                              {t.deliveryNoteLabel} {order.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Customer Received Parcel Confirmation Banner & Button */}
                      <div className={`p-4 rounded-xl border-2 border-[#15875D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                        isDarkMode ? 'bg-[#0E2E20]' : 'bg-gradient-to-r from-[#F0FAF3] to-[#F2F7F4]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#0A6847] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <PackageCheck className="w-5 h-5 text-[#F8C519]" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-black dark:text-white">
                              Received your grocery delivery?
                            </h5>
                            <p className="text-[11px] text-[#1B8057] dark:text-zinc-300">
                              Click below to mark your parcel as received and move this order to your delivery history.
                            </p>
                          </div>
                        </div>

                        {onConfirmReceived && (
                          <button
                            onClick={() => onConfirmReceived(order.id || order.orderNumber)}
                            className="px-5 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition active:scale-95 shrink-0"
                          >
                            <CheckCircle className="w-4 h-4 text-[#F8C519]" />
                            <span>{t.confirmParcelReceivedBtn}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. TAB CONTENT: DELIVERY HISTORY (COMPLETED DELIVERIES)         */}
        {/* ============================================================== */}
        {activeTab === 'HISTORY' && (
          <div className="space-y-4">
            {historyOrders.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] space-y-3">
                <div className="w-14 h-14 rounded-xl bg-white border border-[#15875D]/30 flex items-center justify-center text-2xl mx-auto">
                  📦
                </div>
                <h3 className="text-base font-bold text-[#003D25] dark:text-zinc-300">
                  {t.noHistoryDeliveriesTitle}
                </h3>
                <p className="text-xs text-[#1B8057] dark:text-zinc-400 max-w-md mx-auto">
                  {t.noHistoryDeliveriesDesc}
                </p>
              </div>
            ) : (
              historyOrders.map((order) => (
                <div
                  key={order.id || order.orderNumber}
                  className="p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-[#15875D] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#15875D]/20 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-black dark:text-white">
                          {t.orderNumberPrefix} #{order.orderNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F0FAF3] dark:bg-zinc-800 text-[#0A6847] dark:text-[#80F6C7] border border-[#15875D]">
                          {t.deliveredAndCollectedBadge}
                        </span>
                      </div>
                      <p className="text-xs text-[#1B8057] dark:text-zinc-400 mt-0.5">
                        {t.orderPlacedAtPrefix}: {formatPlacedAt(order.placedAt)} • {t.deliveryDestinationAddress}{' '}
                        {order.address}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold uppercase text-[#1B8057] dark:text-[#80F6C7]">{t.totalPaidCodLabel}</span>
                      <p className="text-xl font-bold text-[#0A6847] dark:text-white font-mono">
                        {order.totalAmount.toFixed(2)} <span className="text-xs font-bold">lei</span>
                      </p>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-[#1B8057] dark:text-[#80F6C7] text-[10px] uppercase tracking-wider block">
                      {t.purchasedItemsSummary}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => {
                        const title = typeof item === 'string' ? item : item.productTitle;
                        return (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded bg-[#F2F7F4] dark:bg-zinc-800 text-[#003D25] dark:text-zinc-200 font-semibold text-xs border border-[#15875D]/20"
                          >
                            {title}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions: View Invoice & Reorder */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#15875D]/20 text-xs">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="flex items-center gap-1.5 font-bold text-[#0A6847] hover:underline"
                    >
                      <span>🧾</span>
                      <span>{t.viewOfficialInvoiceBtn}</span>
                    </button>

                    <button
                      onClick={() => onReorder(order)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs shadow-sm transition active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.reorderAgainBtn}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* INVOICE POP-UP MODAL FOR DELIVERY HISTORY (FIGMA THEME) */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#15875D] text-xs font-sans text-[#003D25]">
            <div className="bg-[#1B8057] px-5 py-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="bg-white rounded px-2 py-1">
                  <img src="/figma_logo_tight.png" alt="Ceylon Foods" className="h-5 w-auto object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.invoiceModalStoreName}</h4>
                  <p className="text-[10px] text-[#80F6C7]">{t.invoiceModalStoreAddress}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="w-7 h-7 rounded-full bg-[#39906D] border border-white/60 flex items-center justify-center text-white hover:bg-[#0A6847]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-3.5 bg-[#F0FAF3] border border-[#15875D]/40 rounded-xl space-y-1 font-mono text-[11px]">
                <p>
                  {t.invoiceModalDeliveryInvoice}: <strong>#{selectedInvoiceOrder.orderNumber}</strong>
                </p>
                <p>
                  {t.invoiceModalDate} <strong>{formatPlacedAt(selectedInvoiceOrder.placedAt)}</strong>
                </p>
                <p>
                  {t.invoiceModalCustomer} <strong>{selectedInvoiceOrder.customerName}</strong>
                </p>
                <p>
                  {t.invoiceModalPhone} <strong>{selectedInvoiceOrder.customerPhone}</strong>
                </p>
                <p>{t.invoiceModalPayment}</p>
              </div>

              <div className="divide-y divide-[#15875D]/15 max-h-48 overflow-y-auto">
                {selectedInvoiceOrder.items.map((it, idx) => {
                  const title = typeof it === 'string' ? it : it.productTitle;
                  const qty = typeof it === 'string' ? 1 : it.quantity;
                  const price = typeof it === 'string' ? 0 : it.price * it.quantity;
                  return (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <span className="font-medium">
                        x{qty} {title}
                      </span>
                      <span className="font-bold text-black">{price > 0 ? `${price.toFixed(2)} lei` : ''}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#15875D]/25 pt-3 flex justify-between font-bold text-sm text-black">
                <span>{t.invoiceModalTotalPaid}</span>
                <span className="font-mono text-[#0A6847]">{selectedInvoiceOrder.totalAmount.toFixed(2)} lei</span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-md bg-[#F2F7F4] border border-[#15875D]/40 hover:bg-[#F0FAF3] font-bold text-[#003D25] flex items-center justify-center gap-1.5"
                >
                  <span>🖨️</span>
                  <span>{t.invoiceModalPrintBtn}</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="flex-1 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold"
                >
                  {t.invoiceModalCloseBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
