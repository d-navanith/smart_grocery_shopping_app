import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  Truck,
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
  Banknote,
  Lock,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { CartItem, CustomerUser, DeliveryZone } from '../types';
import { TranslationDictionary } from '../translations';

interface CartViewProps {
  cart: CartItem[];
  onUpdateCartQty: (productId: string, weight: string | undefined, delta: number) => void;
  onRemoveFromCart: (productId: string, weight?: string) => void;
  onClearCart: () => void;
  subtotal: number;
  selectedZone: DeliveryZone;
  setSelectedZone: (zone: DeliveryZone) => void;
  deliveryZones: DeliveryZone[];
  appliedPromo: { code: string; title: string; discount: number; freeDelivery?: boolean } | null;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  promoError: string;
  totalAmount: number;
  effectiveDeliveryFee: number;
  isFreeDeliveryQualified: boolean;
  currentUser: CustomerUser | null;
  onOpenAuth?: () => void;
  onOpenCheckoutModal: (orderPayload: { address: string; phone: string; note: string; paymentMethod: string }) => void;
  onNavigateCheckout?: () => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  subtotal,
  selectedZone,
  setSelectedZone,
  deliveryZones,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  promoError,
  totalAmount,
  effectiveDeliveryFee,
  isFreeDeliveryQualified,
  currentUser,
  onOpenAuth,
  onOpenCheckoutModal,
  onNavigateCheckout,
  onNavigateShop,
  onNavigateHome,
  isDarkMode,
  t
}) => {
  const [couponInput, setCouponInput] = useState('');

  // Romanian Delivery Address Form State
  const [streetAddress, setStreetAddress] = useState(currentUser?.address || 'Strada Mihai Eminescu nr. 42');
  const [buildingDetails, setBuildingDetails] = useState(currentUser?.buildingDetails || 'Bloc 12, Scara A, Ap. 14, Interfon 14');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+40 722 456 789');
  const [deliveryNote, setDeliveryNote] = useState('Am pregătit suma exactă în numerar. Vă rog sunați la interfon când ajungeți.');
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY'>('CASH_ON_DELIVERY');
  const [formError, setFormError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    onApplyPromo(couponInput.trim());
    setCouponInput('');
  };

  const handleProceedCheckout = () => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
    if (onNavigateCheckout) {
      onNavigateCheckout();
      return;
    }
    if (!streetAddress.trim() || !customerPhone.trim()) {
      setFormError('Please enter your complete delivery address and mobile phone number.');
      return;
    }
    setFormError('');
    const fullAddress = `${streetAddress}${buildingDetails ? ', ' + buildingDetails : ''}`;
    onOpenCheckoutModal({
      address: fullAddress,
      phone: customerPhone,
      note: deliveryNote,
      paymentMethod
    });
  };

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] mb-1.5">
              <button onClick={onNavigateHome} className="hover:underline">
                {t.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
              <button onClick={onNavigateShop} className="hover:underline">
                {t.breadcrumbShop}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#1B8057]" />
              <span className="text-[#F96D26] font-bold">{t.cartBreadcrumb}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateShop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#E8F5EE] transition cursor-pointer"
              >
                ← Back to Shopping
              </button>
              <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
                <span className="text-[#0A6847] dark:text-white">Shopping </span>
                <span className="text-[#F96D26]">Cart</span>
              </h1>
            </div>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <img src="/figma_icon_cod.png" alt="" className="w-8 h-8 object-contain shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#1B8057] block">Cash & Card on Delivery</span>
              <span className="text-[#003D25] dark:text-zinc-300 text-[11px]">{t.cartSubtitle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 pt-8">
        {cart.length === 0 ? (
          <div
            className={`p-14 rounded-xl border text-center space-y-4 max-w-xl mx-auto ${
              isDarkMode ? 'bg-[#141816] border-[#15875D]/40' : 'bg-[#F0FAF3] border-[#15875D] shadow-sm'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white border border-[#15875D]/30 text-[#0A6847] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#003D25] dark:text-white">{t.emptyCartTitle}</h3>
            <p className="text-xs text-[#1B8057] max-w-md mx-auto">{t.emptyCartDesc}</p>
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm shadow-md transition active:scale-95"
            >
              {t.startShoppingBtn}
            </button>
          </div>
        ) : (
          /* TWO-COLUMN LAYOUT: CART TABLE (LEFT) + ORDER SUMMARY & COD (RIGHT) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: TABLE (FIGMA GOLD & GREEN THEME) */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className={`rounded-xl border border-[#15875D] overflow-hidden shadow-sm ${
                  isDarkMode ? 'bg-[#141816]' : 'bg-white'
                }`}
              >
                {/* FIGMA GOLD TABLE HEADER (#F8C519) */}
                <div className="bg-[#F8C519] text-[#664E00] px-6 py-3.5 grid grid-cols-12 text-xs font-bold uppercase tracking-wider select-none border-b border-[#C08512]/30">
                  <div className="col-span-6">{t.tableProduct}</div>
                  <div className="col-span-2 text-center">{t.tablePrice}</div>
                  <div className="col-span-2 text-center">{t.tableQuantity}</div>
                  <div className="col-span-2 text-right">{t.tableSubtotal}</div>
                </div>

                {/* TABLE BODY ROWS */}
                <div className="divide-y divide-[#15875D]/15">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}`}
                      className="p-4 sm:p-5 grid grid-cols-12 items-center text-xs font-semibold gap-3 hover:bg-[#F2F7F4]/50 transition"
                    >
                      <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
                        <button
                          onClick={() => onRemoveFromCart(item.product.id, item.selectedWeight)}
                          className="w-7 h-7 rounded-full bg-[#F2F7F4] hover:bg-[#FFF4EE] text-slate-400 hover:text-[#F96D26] flex items-center justify-center transition shrink-0"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-[#15875D]/25 flex items-center justify-center p-1 shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex flex-col text-left">
                          <h4 className="font-bold text-sm text-black dark:text-white line-clamp-1">
                            {item.product.title}
                          </h4>
                          <span className="inline-block w-fit px-2 py-0.5 rounded bg-[#F2F7F4] text-[#9E9E9E] text-[11px] font-medium mt-0.5">
                            {item.selectedWeight || item.product.unitWeight} • {item.product.brand}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-4 sm:col-span-2 text-left sm:text-center">
                        <span className="text-black dark:text-zinc-200 font-bold text-xs sm:text-sm">
                          {item.effectivePrice.toFixed(2)} lei
                        </span>
                      </div>

                      <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                        <div className="flex items-center border border-[#15875D]/40 rounded-md overflow-hidden bg-[#F2F7F4] dark:bg-zinc-900">
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, -1)}
                            className="w-7 h-7 flex items-center justify-center text-[#0A6847] hover:bg-[#0A6847] hover:text-white transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-black dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#0A6847] hover:bg-[#0A6847] hover:text-white transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-4 sm:col-span-2 text-right">
                        <span className="text-sm font-bold text-[#0A6847] dark:text-[#80F6C7]">
                          {(item.effectivePrice * item.quantity).toFixed(2)} lei
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* COUPON & ACTIONS ROW */}
                <div className="p-4 sm:p-5 bg-[#F2F7F4] dark:bg-zinc-900/60 border-t border-[#15875D]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <form onSubmit={handleApply} className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <input
                        type="text"
                        placeholder="Coupon Code (e.g. CEYLON10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-[#15875D]/40 rounded-md px-3.5 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#0A6847]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-medium shadow-xs transition active:scale-95 shrink-0"
                    >
                      {t.applyCoupon}
                    </button>
                  </form>

                  <div className="flex items-center gap-4 text-xs font-bold w-full md:w-auto justify-between md:justify-end">
                    <button
                      onClick={onClearCart}
                      className="text-slate-500 hover:text-[#F96D26] transition"
                    >
                      {t.clearCart}
                    </button>
                    <button
                      onClick={onNavigateShop}
                      className="text-[#0A6847] dark:text-[#80F6C7] hover:underline"
                    >
                      {t.continueShopping}
                    </button>
                  </div>
                </div>
              </div>

              {promoError && (
                <div className="p-3 rounded-lg bg-[#FFF4EE] text-[#F96D26] text-xs font-bold border border-[#F96D26]">
                  {promoError}
                </div>
              )}
              {appliedPromo && (
                <div className="p-3.5 rounded-lg bg-[#F0FAF3] dark:bg-emerald-950/40 border border-[#15875D] text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0A6847]" />
                    <span>
                      {t.couponApplied}: {appliedPromo.code} (-{appliedPromo.discount.toFixed(2)} lei)
                    </span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="text-[#F96D26] hover:underline text-[11px]"
                  >
                    {t.removeCoupon}
                  </button>
                </div>
              )}

              {/* Delivery Dispatch Reassurance Banner (Figma Mint Card) */}
              <div className="p-5 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] space-y-2">
                <div className="flex items-center gap-2 text-[#1B8057] text-xs font-bold">
                  <Truck className="w-4 h-4 text-[#0A6847]" />
                  <span>{t.howDeliveryWorksTitle}</span>
                </div>
                <p className="text-[11px] text-[#003D25] dark:text-zinc-300 leading-relaxed font-medium">
                  {t.howDeliveryWorksStep1}
                  <br />
                  {t.howDeliveryWorksStep2}
                  <br />
                  {t.howDeliveryWorksStep3}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: ROMANIAN ADDRESS, CASH ON DELIVERY & ORDER SUMMARY */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`rounded-xl p-6 border border-[#15875D] shadow-sm space-y-5 ${
                  isDarkMode ? 'bg-[#141816] text-zinc-200' : 'bg-[#F0FAF3] text-[#003D25]'
                }`}
              >
                <h3 className="font-bold text-base uppercase tracking-wider pb-3 border-b border-[#15875D]/25 text-[#0A6847] dark:text-white">
                  {t.checkoutTitle}
                </h3>

                {formError && (
                  <div className="p-3 rounded-lg bg-[#FFF4EE] text-[#F96D26] text-xs font-bold border border-[#F96D26] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Delivery Address in Romania */}
                <div className="space-y-3 text-xs font-semibold">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B8057] block">
                    {t.shippingAddressTitle}
                  </span>

                  <div>
                    <label className="block text-[11px] text-[#003D25] dark:text-zinc-300 mb-1 font-bold">
                      {t.streetLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.streetPlaceholder}
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#003D25] dark:text-zinc-300 mb-1 font-bold">
                      {t.buildingDetailsLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={t.buildingPlaceholder}
                      value={buildingDetails}
                      onChange={(e) => setBuildingDetails(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#003D25] dark:text-zinc-300 mb-1 font-bold">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t.phonePlaceholder}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-[#15875D]/40 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTION: ONLY 2 OPTIONS (CASH ON DELIVERY & CARD ON DELIVERY) */}
                <div className="space-y-2.5 pt-2 border-t border-[#15875D]/20">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B8057] block">
                    {t.paymentMethodTitle}
                  </span>

                  {/* Option 1: Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                      paymentMethod === 'CASH_ON_DELIVERY'
                        ? 'border-[#0A6847] bg-white dark:bg-zinc-900 shadow-2xs ring-1 ring-[#0A6847]'
                        : 'border-[#15875D]/30 bg-white/70 dark:bg-zinc-900/50 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      readOnly
                      checked={paymentMethod === 'CASH_ON_DELIVERY'}
                      className="accent-[#0A6847] mt-0.5 cursor-pointer"
                    />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#0A6847] dark:text-[#80F6C7]">
                        <Banknote className="w-4 h-4 text-[#0A6847]" />
                        <span>{t.codOptionTitle}</span>
                        <span className="px-2 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-[9px] font-bold">
                          {t.recommendedTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#003D25] dark:text-zinc-300 font-medium">
                        {t.codOptionDesc}
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Card on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('CARD_ON_DELIVERY')}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                      paymentMethod === 'CARD_ON_DELIVERY'
                        ? 'border-[#0A6847] bg-white dark:bg-zinc-900 shadow-2xs ring-1 ring-[#0A6847]'
                        : 'border-[#15875D]/30 bg-white/70 dark:bg-zinc-900/50 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      readOnly
                      checked={paymentMethod === 'CARD_ON_DELIVERY'}
                      className="accent-[#0A6847] mt-0.5 cursor-pointer"
                    />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#0A6847] dark:text-[#80F6C7]">
                        <CreditCard className="w-4 h-4 text-[#0A6847]" />
                        <span>Card on Delivery (POS Mobil Curier)</span>
                      </div>
                      <p className="text-[11px] text-[#003D25] dark:text-zinc-300 font-medium">
                        Pay with contactless card or phone on courier's mobile POS terminal at your door.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Order Cost Breakdown */}
                <div className="space-y-2 pt-2 border-t border-[#15875D]/20 text-xs font-semibold">
                  <div className="flex justify-between text-[#003D25] dark:text-zinc-300">
                    <span>{t.subtotalLabel}</span>
                    <span className="font-bold text-black dark:text-white text-sm">
                      {subtotal.toFixed(2)} lei
                    </span>
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
                      <span>
                        {t.discountLabel} ({appliedPromo.code})
                      </span>
                      <span>-{appliedPromo.discount.toFixed(2)} lei</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#15875D]/25 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-sm uppercase text-black dark:text-white block">
                        {t.totalToPayLabel}
                      </span>
                      <span className="text-[10px] text-[#F96D26] font-bold">{t.codOptionTitle}</span>
                    </div>
                    <span className="text-2xl font-bold text-[#0A6847] dark:text-[#80F6C7]">
                      {totalAmount.toFixed(2)} lei
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4 text-[#F8C519]" />
                  <span>
                    {onNavigateCheckout
                      ? `${t.checkoutPageTitle} (${totalAmount.toFixed(2)} lei) →`
                      : `${t.placeOrderBtn} (${totalAmount.toFixed(2)} lei)`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
