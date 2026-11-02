import React, { useState } from 'react';
import {
  Search,
  Phone,
  ClipboardList,
  CheckCircle2,
  Package,
  Truck,
  Home,
  CheckCircle,
  PackageCheck,
  ShieldCheck,
  Clock,
  CreditCard,
  MapPin,
  ArrowRight,
  Headphones
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

const getProductThumbnail = (title: string, customImage?: string): string => {
  if (customImage) return customImage;
  const clean = title.toLowerCase();
  if (clean.includes('white') || clean.includes('samba') || clean.includes('kekulu')) return '/prod_white_rice.jpg';
  if (clean.includes('red rice') || clean.includes('rathu')) return '/prod_red_rice.jpg';
  if (clean.includes('brinjal') || clean.includes('eggplant') || clean.includes('wambatu')) return '/prod_brinjal.jpg';
  if (clean.includes('dhal') || clean.includes('lentil') || clean.includes('parippu')) return '/prod_dhal.jpg';
  if (clean.includes('okra') || clean.includes('ladies') || clean.includes('finger') || clean.includes('bandakka')) return '/prod_okra.jpg';
  if (clean.includes('pumpkin') || clean.includes('wattakka')) return '/prod_pumpkin.jpg';
  if (clean.includes('tea') || clean.includes('dilmah')) return '/prod_tea.jpg';
  if (clean.includes('roast') || clean.includes('paan') || clean.includes('bread')) return '/prod_roast_paan_1793528122873.jpg';
  if (clean.includes('cream cracker') || clean.includes('biscuit') || clean.includes('munchee')) return '/prod_biscuits_1793528101280.jpg';
  if (clean.includes('coconut') || clean.includes('pol')) return '/prod_coconut_1793528053012.jpg';
  if (clean.includes('mango') || clean.includes('amba')) return '/prod_mango_1793528023394.jpg';
  if (clean.includes('chilli') || clean.includes('miris')) return '/prod_chillies_1793528006246.jpg';
  if (clean.includes('cinnamon') || clean.includes('kurundu')) return '/prod_cinnamon_1793528038262.jpg';
  if (clean.includes('tomato')) return '/figma_prod_tomatoes.png';
  if (clean.includes('onion') || clean.includes('shallot')) return '/figma_prod_shallots.png';
  return '/figma_prod_rice_sack.png';
};

const extractWeightLabel = (title: string, defaultUnit?: string): string => {
  const match = title.match(/\(([^)]*(?:kg|g|loaf|pack|pcs|bunch|tin)[^)]*)\)/i);
  if (match) {
    const cleaned = match[1].replace(/[\u0D80-\u0DFF]/g, '').replace(/[-/]/g, '').trim();
    if (cleaned) return cleaned;
  }
  if (defaultUnit) return defaultUnit;
  return '500 g';
};

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  orders,
  initialOrderNumber = '',
  onConfirmReceived,
  onNavigateHome,
  onNavigateShop,
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

  // Stepper milestone status calculation
  const getStepProgress = (order: ClientOrder) => {
    switch (order.status) {
      case 'PENDING':
        return 0; // Step 1: Order Placed
      case 'PROCESSING':
        return 2; // Step 3: In Progress (Placed, Accepted, In Progress)
      case 'ON_THE_WAY':
        return 3; // Step 4: On the Way
      case 'DELIVERED':
        return 4; // Step 5: Delivered
      case 'CANCELLED':
      default:
        return 0;
    }
  };

  const currentStepIndex = searchedOrder ? getStepProgress(searchedOrder) : 0;
  const progressPercent = (currentStepIndex / 4) * 100;

  const milestones = [
    {
      id: 'placed',
      title: 'Order Placed',
      Icon: ClipboardList,
      time: searchedOrder?.placedAt || 'Today 10:15 AM'
    },
    {
      id: 'accepted',
      title: 'Accepted',
      Icon: CheckCircle2,
      time: 'Order Confirmed'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      Icon: Package,
      time: searchedOrder?.status === 'PENDING' ? 'Expected today' : 'Packing in Store'
    },
    {
      id: 'on_the_way',
      title: 'On the Way',
      Icon: Truck,
      time: searchedOrder?.status === 'ON_THE_WAY' ? 'ETA ~25 min' : 'Expected today'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      Icon: Home,
      time: searchedOrder?.status === 'DELIVERED' ? 'Delivered' : 'Expected today'
    }
  ];

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0B0F0D] pb-16">
      {/* 1. HEADER BANNER (COLORS MATCHING ATTACHMENT 1) */}
      <div className="w-full bg-[#F4F9F6] dark:bg-[#121A16] border-b border-[#15875D]/15 py-10 sm:py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-[#0A6847] dark:text-white">Track Your </span>
            <span className="text-[#F96D26]">Order</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold mt-2.5">
            <button
              onClick={onNavigateHome}
              className="text-[#1B8057] dark:text-[#80F6C7] hover:underline"
            >
              {t.breadcrumbHome}
            </button>
            <span className="text-[#1B8057] dark:text-[#80F6C7]">/</span>
            <span className="text-[#F96D26] font-bold">
              {t.trackOrderBreadcrumb}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* 2. SEARCH BAR & QUICK TRACK CHIPS */}
        <div className="bg-white dark:bg-[#141C18] rounded-xl border border-slate-200 dark:border-zinc-800 p-4 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.trackOrderSearchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#0A6847]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-bold text-xs sm:text-sm transition active:scale-95 shrink-0 flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{t.trackOrderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Track Chips for customer's available orders */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-3 text-xs border-t border-slate-100 dark:border-zinc-800/80 mt-3">
              <span className="text-slate-500 dark:text-zinc-400 font-semibold text-[11px]">
                {t.trackOrderQuickTrack}:
              </span>
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setSearchInput(o.orderNumber);
                    setSearchedOrder(o);
                    setHasSearched(true);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition border ${
                    searchedOrder?.orderNumber === o.orderNumber
                      ? 'bg-[#0A6847] text-white border-[#0A6847]'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200'
                  }`}
                >
                  #{o.orderNumber} ({o.status.replace('_', ' ')})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. ORDER STATUS CARD (FAITHFUL TO ATTACHMENT 2) */}
        {!searchedOrder ? (
          <div className="p-12 text-center rounded-2xl bg-[#F8FAF9] dark:bg-[#121A16] border border-slate-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {t.trackOrderNotFound}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
              {t.trackOrderNotFoundDesc}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#121A16] rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-8">
            {/* Header: "Order Status" & "Order ID : #SBX..." */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Order Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
                  Order ID :{' '}
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    #{searchedOrder.orderNumber}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] dark:bg-[#0E2E20] text-[#0A6847] dark:text-[#80F6C7] border border-[#15875D]/30">
                  {searchedOrder.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">
                  • {searchedOrder.placedAt}
                </span>
              </div>
            </div>

            {/* Progress Stepper (Timeline with Icons, Progress Line & Checkmarks) */}
            <div className="py-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 text-center">
                {milestones.map((m, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={m.id}
                      className="flex flex-col items-center"
                    >
                      {/* Top Icon Box */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition mb-2 shadow-xs ${
                          isDone
                            ? 'text-[#0A6847] dark:text-[#80F6C7] bg-[#E8F5EE] dark:bg-[#0E2E20]'
                            : 'text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800'
                        }`}
                      >
                        <m.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Milestone Title */}
                      <span
                        className={`text-xs font-bold leading-tight h-7 flex items-center justify-center ${
                          isDone
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400 dark:text-zinc-500'
                        }`}
                      >
                        {m.title}
                      </span>

                      {/* Checkmark Node with segment-based connecting lines */}
                      <div className="w-full flex items-center justify-center relative my-2">
                        {/* Left half connector line */}
                        <div
                          className={`hidden sm:block absolute left-0 right-1/2 h-0.5 ${
                            idx === 0
                              ? 'invisible'
                              : isDone
                              ? 'bg-[#0A6847]'
                              : 'bg-slate-200 dark:bg-zinc-700'
                          }`}
                        />
                        {/* Right half connector line */}
                        <div
                          className={`hidden sm:block absolute left-1/2 right-0 h-0.5 ${
                            idx === milestones.length - 1
                              ? 'invisible'
                              : idx < currentStepIndex
                              ? 'bg-[#0A6847]'
                              : 'bg-slate-200 dark:bg-zinc-700'
                          }`}
                        />

                        {/* Node Circle */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold relative z-10 transition ${
                            isDone
                              ? 'bg-[#0A6847] text-white shadow-xs'
                              : 'bg-white dark:bg-zinc-900 border-2 border-slate-300 dark:border-zinc-700 text-transparent'
                          } ${isCurrent ? 'ring-4 ring-[#0A6847]/20 animate-pulse' : ''}`}
                        >
                          ✓
                        </div>
                      </div>

                      {/* Timestamp / Status below */}
                      <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-tight max-w-[120px]">
                        {m.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Products Section (Clean List Matching Attachment 2) */}
            <div className="border-t border-slate-100 dark:border-zinc-800 pt-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                Products
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                {searchedOrder.items.map((item, idx) => {
                  const title = typeof item === 'string' ? item : item.productTitle;
                  const qty = typeof item === 'string' ? 1 : item.quantity;
                  const price = typeof item === 'string' ? 0 : item.price;
                  const img = getProductThumbnail(
                    title,
                    typeof item === 'object' ? item.imageUrl : undefined
                  );
                  const weight = extractWeightLabel(
                    title,
                    typeof item === 'object' ? item.unit : undefined
                  );

                  return (
                    <div
                      key={idx}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#F8FAF9] dark:bg-zinc-800/80 border border-slate-100 dark:border-zinc-700/60 p-1.5 flex items-center justify-center shrink-0">
                          <img
                            src={img}
                            alt={title}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/figma_prod_rice_sack.png';
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                            {title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                            {weight} | {qty} Qty
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {(price * qty).toFixed(2)} lei
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clean Contact Details & Order Summary (No Locked Warning!) */}
            <div className="border-t border-slate-100 dark:border-zinc-800 pt-6 space-y-4">
              {/* Only show direct contact if available/needed */}
              {searchedOrder.riderPhone ? (
                <div className="rounded-xl p-4 bg-[#F0FAF3] dark:bg-[#0E2E20] border border-[#15875D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A6847] text-white flex items-center justify-center text-xl shrink-0">
                      🛵
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {searchedOrder.riderName || 'Courier Rider'} ({searchedOrder.courierCompany || 'Glovo Express'})
                      </h5>
                      <p className="text-xs font-mono font-bold text-[#0A6847] dark:text-[#80F6C7] mt-0.5">
                        Direct Mobile: {searchedOrder.riderPhone}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${searchedOrder.riderPhone}`}
                    className="px-5 py-2.5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-[#F8C519]" />
                    <span>Call Rider</span>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-zinc-400 py-1">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0A6847] dark:text-[#80F6C7]" />
                    <span>
                      Courier: <strong>{searchedOrder.courierCompany || 'Glovo Express Bucharest'}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#0A6847] dark:text-[#80F6C7]" />
                    <span>
                      Support Hotline:{' '}
                      <a
                        href="tel:+40721345678"
                        className="font-bold text-[#0A6847] dark:text-[#80F6C7] hover:underline"
                      >
                        +40 721 345 678
                      </a>
                    </span>
                  </div>
                </div>
              )}

              {/* Order Delivery & Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0A6847] dark:text-[#80F6C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 dark:text-zinc-300">Delivery Address:</span>
                    <p className="text-slate-900 dark:text-white font-semibold mt-0.5">
                      {searchedOrder.address}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0A6847] dark:text-[#80F6C7] shrink-0" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-zinc-300">Payment:</span>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        Cash on Delivery
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 block font-bold uppercase">Total Due:</span>
                    <span className="font-mono font-bold text-base text-[#0A6847] dark:text-[#80F6C7]">
                      {searchedOrder.totalAmount.toFixed(2)} lei
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer "Confirm Parcel Received" Button */}
              {searchedOrder.status !== 'DELIVERED' && searchedOrder.status !== 'CANCELLED' && onConfirmReceived && (
                <div className="p-4 rounded-xl border border-[#15875D] bg-[#F0FAF3] dark:bg-[#0E2E20] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs mt-3">
                  <div className="flex items-center gap-3">
                    <PackageCheck className="w-5 h-5 text-[#0A6847] dark:text-[#80F6C7] shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Received your grocery delivery?
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-zinc-300">
                        Confirm once you have checked your parcel and handed payment to the rider.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onConfirmReceived(searchedOrder.id || searchedOrder.orderNumber)}
                    className="px-5 py-2.5 rounded-lg bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-sm shrink-0 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F8C519]" />
                    <span>Confirm Parcel Received</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. THREE VALUE CARDS (EXACTLY MATCHING ATTACHMENT 2 BOTTOM BAR) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-[#121A16] border border-slate-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-[#E8F5EE] dark:bg-[#0E2E20] flex items-center justify-center text-[#0A6847] dark:text-[#80F6C7] shrink-0 text-xl">
              📦
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Free Shipping
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Free shipping for order above 250 lei
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-[#121A16] border border-slate-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-[#E8F5EE] dark:bg-[#0E2E20] flex items-center justify-center text-[#0A6847] dark:text-[#80F6C7] shrink-0 text-xl">
              💳
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Flexible Payment
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Cash on delivery & secure options
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-[#121A16] border border-slate-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-[#E8F5EE] dark:bg-[#0E2E20] flex items-center justify-center text-[#0A6847] dark:text-[#80F6C7] shrink-0 text-xl">
              🎧
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                24×7 Support
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                We support online all days in Bucharest
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
