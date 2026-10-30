import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Banknote,
  Lock,
  MapPin,
  Phone,
  User,
  Clock,
  Sparkles,
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { CartItem, CustomerUser, DeliveryZone } from '../types';
import { TranslationDictionary } from '../translations';

interface CheckoutViewProps {
  cart: CartItem[];
  subtotal: number;
  totalAmount: number;
  selectedZone: DeliveryZone;
  setSelectedZone: (zone: DeliveryZone) => void;
  deliveryZones: DeliveryZone[];
  effectiveDeliveryFee: number;
  appliedPromo: { code: string; title: string; discount: number; freeDelivery?: boolean } | null;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  promoError: string;
  currentUser: CustomerUser | null;
  onSubmitOrder: (orderPayload: {
    address: string;
    phone: string;
    note: string;
    paymentMethod: string;
    cashGiven?: number;
    preferredTime?: string;
  }) => void;
  onNavigateCart: () => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  subtotal,
  totalAmount,
  selectedZone,
  setSelectedZone,
  deliveryZones,
  effectiveDeliveryFee,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  promoError,
  currentUser,
  onSubmitOrder,
  onNavigateCart,
  onNavigateShop,
  onNavigateHome,
  isDarkMode,
  t
}) => {
  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || 'Mihai Enache');
  const [phone, setPhone] = useState(currentUser?.phone || '+40 722 456 789');
  const [streetAddress, setStreetAddress] = useState(currentUser?.address || 'Strada Mihai Eminescu nr. 42');
  const [buildingDetails, setBuildingDetails] = useState(currentUser?.buildingDetails || 'Bl. 12, Sc. A, Et. 3, Ap. 14, Interfon 14');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY'>('CASH_ON_DELIVERY');
  const [preferredSlot, setPreferredSlot] = useState('EXPRESS');
  
  // Cash Change Calculator State
  const [cashAmountGiven, setCashAmountGiven] = useState<number>(Math.ceil(totalAmount / 10) * 10);
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatedChange = Math.max(0, cashAmountGiven - totalAmount);

  const handlePlaceOrder = () => {
    if (!streetAddress.trim() || !phone.trim()) {
      alert('Vă rugăm să introduceți adresa completă și numărul de telefon pentru curier.');
      return;
    }

    setIsSubmitting(true);
    const combinedAddress = `${streetAddress}, ${buildingDetails}, ${selectedZone.coverage}`;

    setTimeout(() => {
      onSubmitOrder({
        address: combinedAddress,
        phone,
        note: deliveryNote,
        paymentMethod,
        cashGiven: paymentMethod === 'CASH_ON_DELIVERY' ? cashAmountGiven : undefined,
        preferredTime: preferredSlot
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* 1. BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbHome}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={onNavigateShop} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbShop}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={onNavigateCart} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.cartBreadcrumb}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-white font-extrabold">{t.checkoutBreadcrumb}</span>
      </nav>

      {/* 2. PROGRESS STEPPER (FIGMA SPEC) */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-black">
              ✓
            </div>
            <span>1. {t.checkoutStepCart}</span>
          </div>

          <div className="flex items-center gap-2 text-[#0A6847] dark:text-[#78F9B8]">
            <div className="w-7 h-7 rounded-full bg-[#0A6847] text-white flex items-center justify-center font-black shadow-xs">
              2
            </div>
            <span className="font-black">2. {t.checkoutStepDetails}</span>
          </div>

          <div className="flex items-center gap-2 text-[#0A6847] dark:text-[#78F9B8]">
            <div className="w-7 h-7 rounded-full bg-[#E5A91A] text-amber-950 flex items-center justify-center font-black shadow-xs">
              3
            </div>
            <span className="font-black">3. {t.checkoutStepPayment} (COD)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold">
              4
            </div>
            <span>4. {t.checkoutStepCompleted}</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN CHECKOUT 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DELIVERY, TIME & PAYMENT */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card A: Customer & Delivery Address */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center font-black">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  {t.checkoutBillingTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.checkoutPageSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  {t.checkoutFullName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  {t.checkoutPhone} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+40 722 000 000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {t.checkoutPhoneHint}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                {t.checkoutDeliveryZone} *
              </label>
              <select
                value={selectedZone.name}
                onChange={(e) => {
                  const z = deliveryZones.find(dz => dz.name === e.target.value);
                  if (z) setSelectedZone(z);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
              >
                {deliveryZones.map(z => (
                  <option key={z.name} value={z.name}>
                    {z.name} ({z.fee} lei • {z.eta})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                {t.checkoutAddress} *
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder={t.checkoutAddressPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
              />
            </div>

            <div>
              <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                {t.checkoutBuildingDetails}
              </label>
              <input
                type="text"
                value={buildingDetails}
                onChange={(e) => setBuildingDetails(e.target.value)}
                placeholder={t.checkoutBuildingDetailsPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
              />
            </div>

            <div>
              <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                {t.checkoutNotesTitle}
              </label>
              <textarea
                rows={2}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder={t.checkoutNotesPlaceholder}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A6847]"
              />
            </div>
          </div>

          {/* Card B: Delivery Slot Selection */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E5A91A]" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                {t.checkoutDeliveryTimeTitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'EXPRESS', label: t.checkoutSlotExpress, time: '25-35 min', badge: 'Fastest' },
                { id: 'EVENING', label: t.checkoutSlotEvening, time: '18:00 - 20:00', badge: 'Preferred' },
                { id: 'TOMORROW', label: t.checkoutSlotTomorrow, time: '09:00 - 12:00', badge: 'Standard' }
              ].map(slot => (
                <div
                  key={slot.id}
                  onClick={() => setPreferredSlot(slot.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-2 ${
                    preferredSlot === slot.id
                      ? 'border-[#0A6847] bg-emerald-50/50 dark:bg-emerald-950/40 text-[#0A6847] dark:text-[#78F9B8]'
                      : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#E5A91A] text-amber-950">
                      {slot.badge}
                    </span>
                    <input
                      type="radio"
                      checked={preferredSlot === slot.id}
                      onChange={() => setPreferredSlot(slot.id)}
                      className="accent-[#0A6847]"
                    />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-slate-900 dark:text-white">{slot.label}</h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{slot.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card C: Payment Method & Cash Change Calculator (Romania COD Standard) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-600" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                {t.checkoutPaymentTitle}
              </h4>
            </div>

            {/* Option 1: Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-3 ${
                paymentMethod === 'CASH_ON_DELIVERY'
                  ? 'border-[#0A6847] bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-[#0A6847]'
                  : 'border-slate-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black">
                    💵
                  </div>
                  <div>
                    <span className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{t.checkoutCodTitle}</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#E5A91A] text-amber-950 text-[9px] font-black">
                        {t.recommendedTag}
                      </span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t.checkoutCodDesc}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'CASH_ON_DELIVERY'}
                  onChange={() => setPaymentMethod('CASH_ON_DELIVERY')}
                  className="accent-[#0A6847]"
                />
              </div>

              {/* Exact Change Calculator Feature */}
              {paymentMethod === 'CASH_ON_DELIVERY' && (
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-zinc-200 flex items-center gap-1.5">
                      <span>🪙</span>
                      <span>{t.checkoutCodCashChangeTitle}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Total: <strong>{totalAmount.toFixed(2)} lei</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min={totalAmount}
                        step={5}
                        value={cashAmountGiven}
                        onChange={(e) => setCashAmountGiven(Number(e.target.value) || totalAmount)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-black font-mono focus:ring-1 focus:ring-[#0A6847]"
                      />
                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">lei</span>
                    </div>

                    <div className="px-3 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-300 text-xs font-bold shrink-0">
                      <span>{t.checkoutCodChangeLabel}: </span>
                      <strong className="font-black text-sm">{calculatedChange.toFixed(2)} lei</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400">
                    {t.checkoutCodCashChangeHint}
                  </p>
                </div>
              )}
            </div>

            {/* Option 2: Card on Delivery */}
            <div
              onClick={() => setPaymentMethod('CARD_ON_DELIVERY')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                paymentMethod === 'CARD_ON_DELIVERY'
                  ? 'border-[#0A6847] bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-[#0A6847]'
                  : 'border-slate-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-slate-900 dark:text-white">
                      {t.checkoutCardOnDeliveryTitle}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t.checkoutCardOnDeliveryDesc}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'CARD_ON_DELIVERY'}
                  onChange={() => setPaymentMethod('CARD_ON_DELIVERY')}
                  className="accent-[#0A6847]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY & PLACE ORDER BUTTON */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl space-y-5 sticky top-24">
            <h3 className="font-black text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <span>{t.checkoutOrderSummaryTitle}</span>
              <span className="text-xs font-bold text-slate-400">{cart.length} items</span>
            </h3>

            {/* Item Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-xl object-contain bg-slate-50 dark:bg-zinc-800 p-1"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white line-clamp-1 max-w-[170px]">
                        {item.product.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {item.quantity} × {item.effectivePrice.toFixed(2)} lei
                        {item.selectedWeight ? ` (${item.selectedWeight})` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 dark:text-white font-mono">
                    {(item.effectivePrice * item.quantity).toFixed(2)} lei
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CEYLON10 or LIVRAREGRATIS"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono uppercase font-bold focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (promoInput.trim()) onApplyPromo(promoInput.trim());
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black transition"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center justify-between">
                  <span>✓ {appliedPromo.title}</span>
                  <button onClick={onRemovePromo} className="text-red-500 hover:underline">Remove</button>
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 font-bold mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Calculation Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t.subtotalLabel}</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">{subtotal.toFixed(2)} lei</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>{t.deliveryFeeLabel}</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">
                  {effectiveDeliveryFee === 0 ? <strong className="text-emerald-600">{t.freeLabel}</strong> : `${effectiveDeliveryFee.toFixed(2)} lei`}
                </span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-{appliedPromo.discount.toFixed(2)} lei</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>TVA România (19% Inclus)</span>
                <span>Inclus în total</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-baseline">
                <div>
                  <span className="font-black text-sm uppercase text-slate-900 dark:text-white block">
                    {t.totalToPayLabel}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                    {paymentMethod === 'CASH_ON_DELIVERY' ? t.checkoutCodTitle : 'Card POS Mobil'}
                  </span>
                </div>
                <span className="text-3xl font-black text-[#0A6847] dark:text-[#78F9B8] font-mono">
                  {totalAmount.toFixed(2)} <span className="text-sm font-bold">lei</span>
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0A6847] via-[#0C7A53] to-[#0A6847] hover:from-[#085237] hover:to-[#085237] text-white font-black text-sm shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-[#FFB800]" />
              <span>
                {isSubmitting
                  ? t.checkoutPlacingOrderBtn
                  : `${t.checkoutPlaceOrderBtn} (${totalAmount.toFixed(2)} lei)`}
              </span>
            </button>

            {/* Guarantees Strip */}
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.checkoutGuaranteeTitle}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                {t.checkoutGuaranteeDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
