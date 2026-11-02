import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Banknote,
  Lock,
  MapPin,
  Phone,
  User,
  Clock,
  AlertCircle
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
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [streetAddress, setStreetAddress] = useState(currentUser?.address || '');
  const [buildingDetails, setBuildingDetails] = useState(currentUser?.buildingDetails || '');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY'>('CASH_ON_DELIVERY');
  const [preferredSlot, setPreferredSlot] = useState('EXPRESS');

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setFullName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.address) setStreetAddress(currentUser.address);
      if (currentUser.buildingDetails) setBuildingDetails(currentUser.buildingDetails);
    }
  }, [currentUser]);

  // Cash Change Calculator State
  const [cashAmountGiven, setCashAmountGiven] = useState<number>(Math.ceil(totalAmount / 10) * 10);
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handlePlaceOrder = () => {
    if (!streetAddress.trim() || !phone.trim()) {
      setValidationError('Please enter your complete delivery address and mobile phone number for the rider.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    const combinedAddress = `${streetAddress}${buildingDetails ? ', ' + buildingDetails : ''}`;

    setTimeout(() => {
      onSubmitOrder({
        address: combinedAddress,
        phone,
        note: deliveryNote,
        paymentMethod,
        preferredTime: preferredSlot
      });
      setIsSubmitting(false);
    }, 500);
  };

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
              <button onClick={onNavigateShop} className="hover:underline">
                {t.breadcrumbShop}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button onClick={onNavigateCart} className="hover:underline">
                {t.cartBreadcrumb}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#F96D26] font-bold">{t.checkoutBreadcrumb}</span>
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateCart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#E8F5EE] transition cursor-pointer"
              >
                ← Back to Cart
              </button>
              <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
                <span className="text-[#0A6847] dark:text-white">Secure </span>
                <span className="text-[#F96D26]">Checkout</span>
              </h1>
            </div>
          </div>

          {/* 4-Step Progress Stepper in Figma Palette */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-4 py-2.5">
            <div className="flex items-center gap-1.5 text-[#0A6847]">
              <span className="w-5 h-5 rounded-full bg-[#0A6847] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <span>1. {t.checkoutStepCart}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
            <div className="flex items-center gap-1.5 text-[#0A6847]">
              <span className="w-5 h-5 rounded-full bg-[#0A6847] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>2. {t.checkoutStepDetails}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
            <div className="flex items-center gap-1.5 text-[#664E00]">
              <span className="w-5 h-5 rounded-full bg-[#F8C519] text-[#664E00] flex items-center justify-center text-[10px]">
                3
              </span>
              <span className="text-[#003D25] dark:text-white">3. {t.checkoutStepPayment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CHECKOUT 2-COLUMN GRID */}
      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: DELIVERY, TIME & PAYMENT */}
        <div className="lg:col-span-7 space-y-6">
          {validationError && (
            <div className="p-4 rounded-xl bg-[#FFF4EE] border border-[#F96D26] text-[#F96D26] text-xs font-bold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Card A: Customer & Delivery Address */}
          <div className="p-6 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#15875D]/20">
              <div className="w-9 h-9 rounded-lg bg-[#0A6847] text-white flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#003D25] dark:text-white">
                  {t.checkoutBillingTitle}
                </h3>
                <p className="text-xs text-[#1B8057]">{t.checkoutPageSubtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                  {t.checkoutFullName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1B8057] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                  {t.checkoutPhone} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#1B8057] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+40 722 000 000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
                <span className="text-[10px] text-[#1B8057] mt-1 block">{t.checkoutPhoneHint}</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                {t.checkoutAddress} *
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder={t.checkoutAddressPlaceholder}
                className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                {t.checkoutBuildingDetails}
              </label>
              <input
                type="text"
                value={buildingDetails}
                onChange={(e) => setBuildingDetails(e.target.value)}
                placeholder={t.checkoutBuildingDetailsPlaceholder}
                className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                {t.checkoutNotesTitle}
              </label>
              <textarea
                rows={2}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder={t.checkoutNotesPlaceholder}
                className="w-full px-4 py-2 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-medium focus:outline-none focus:border-[#0A6847]"
              />
            </div>
          </div>

          {/* Card B: Delivery Slot Selection */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-[#15875D] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F96D26]" />
              <h4 className="font-bold text-sm text-[#003D25] dark:text-white">
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
                  className={`p-3.5 rounded-lg border cursor-pointer transition flex flex-col justify-between space-y-2 ${
                    preferredSlot === slot.id
                      ? 'border-[#0A6847] bg-[#F0FAF3] dark:bg-emerald-950/40 text-[#0A6847]'
                      : 'border-[#15875D]/30 hover:border-[#15875D]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00]">
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
                    <h5 className="font-bold text-xs text-black dark:text-white">{slot.label}</h5>
                    <p className="text-[11px] text-[#1B8057] font-mono mt-0.5">{slot.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card C: Payment Method & Cash Change Calculator */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-[#15875D] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-[#0A6847]" />
              <h4 className="font-bold text-sm text-[#003D25] dark:text-white">
                {t.checkoutPaymentTitle}
              </h4>
            </div>

            {/* Option 1: Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'CASH_ON_DELIVERY'
                  ? 'border-[#0A6847] bg-[#F0FAF3] dark:bg-emerald-950/40 ring-1 ring-[#0A6847]'
                  : 'border-[#15875D]/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/figma_icon_cod.png" alt="" className="w-9 h-9 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-black dark:text-white flex items-center gap-2">
                      <span>{t.checkoutCodTitle}</span>
                      <span className="px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-[9px] font-bold">
                        {t.recommendedTag}
                      </span>
                    </span>
                    <p className="text-[11px] text-[#003D25] dark:text-zinc-300 mt-0.5">
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
            </div>

            {/* Option 2: Card on Delivery */}
            <div
              onClick={() => setPaymentMethod('CARD_ON_DELIVERY')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'CARD_ON_DELIVERY'
                  ? 'border-[#0A6847] bg-[#F0FAF3] dark:bg-emerald-950/40 ring-1 ring-[#0A6847]'
                  : 'border-[#15875D]/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F2F7F4] dark:bg-zinc-800 text-[#0A6847] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-black dark:text-white">
                      {t.checkoutCardOnDeliveryTitle}
                    </h5>
                    <p className="text-[11px] text-[#003D25] dark:text-zinc-300 mt-0.5">
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
          <div className="p-6 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border-2 border-[#15875D] shadow-md space-y-5 sticky top-24">
            <h3 className="font-bold text-base text-[#0A6847] dark:text-white pb-3 border-b border-[#15875D]/25 flex items-center justify-between">
              <span>{t.checkoutOrderSummaryTitle}</span>
              <span className="px-2.5 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-xs font-bold">
                {cart.length} items
              </span>
            </h3>

            {/* Item Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="flex items-center justify-between gap-3 text-xs bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-[#15875D]/20"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-md object-contain bg-[#F2F7F4] p-1"
                    />
                    <div>
                      <h4 className="font-bold text-black dark:text-white line-clamp-1 max-w-[170px]">
                        {item.product.title}
                      </h4>
                      <p className="text-[10px] text-[#1B8057]">
                        {item.quantity} × {item.effectivePrice.toFixed(2)} lei
                        {item.selectedWeight ? ` (${item.selectedWeight})` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0A6847] dark:text-[#80F6C7]">
                    {(item.effectivePrice * item.quantity).toFixed(2)} lei
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CEYLON10 or LIVRAREGRATIS"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-mono uppercase font-bold focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (promoInput.trim()) onApplyPromo(promoInput.trim());
                  }}
                  className="px-4 py-2 rounded-md bg-[#1B8057] hover:bg-[#0A6847] text-white text-xs font-bold transition"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[11px] text-[#0A6847] font-bold mt-1.5 flex items-center justify-between">
                  <span>✓ {appliedPromo.title}</span>
                  <button onClick={onRemovePromo} className="text-[#F96D26] hover:underline">
                    Remove
                  </button>
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#F96D26] font-bold mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Calculation Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#15875D]/25 text-xs">
              <div className="flex justify-between text-[#003D25] dark:text-zinc-300">
                <span>{t.subtotalLabel}</span>
                <span className="font-bold text-black dark:text-white">{subtotal.toFixed(2)} lei</span>
              </div>

              <div className="flex justify-between text-[#003D25] dark:text-zinc-300">
                <span>{t.deliveryFeeLabel}</span>
                <span className="font-bold text-black dark:text-white">
                  {effectiveDeliveryFee === 0 ? (
                    <strong className="text-[#0A6847]">{t.freeLabel}</strong>
                  ) : (
                    `${effectiveDeliveryFee.toFixed(2)} lei`
                  )}
                </span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-[#0A6847] font-bold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-{appliedPromo.discount.toFixed(2)} lei</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#15875D]/25 flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-sm uppercase text-black dark:text-white block">
                    {t.totalToPayLabel}
                  </span>
                  <span className="text-[10px] text-[#F96D26] font-bold">
                    {paymentMethod === 'CASH_ON_DELIVERY' ? t.checkoutCodTitle : 'Card POS Mobil'}
                  </span>
                </div>
                <span className="text-3xl font-bold text-[#0A6847] dark:text-[#80F6C7]">
                  {totalAmount.toFixed(2)} <span className="text-sm font-bold">lei</span>
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full py-4 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#F8C519]" />
              <span>
                {isSubmitting
                  ? t.checkoutPlacingOrderBtn
                  : `${t.checkoutPlaceOrderBtn} (${totalAmount.toFixed(2)} lei)`}
              </span>
            </button>

            <button
              type="button"
              onClick={onNavigateCart}
              className="w-full py-2.5 rounded-md border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#E8F5EE] transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              ← Back to Shopping Cart
            </button>

            {/* Guarantees Strip */}
            <div className="pt-2 border-t border-[#15875D]/20 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0A6847]">
                <ShieldCheck className="w-4 h-4 text-[#0A6847] shrink-0" />
                <span>{t.checkoutGuaranteeTitle}</span>
              </div>
              <p className="text-[10px] text-[#003D25] dark:text-zinc-400 leading-tight">
                {t.checkoutGuaranteeDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
