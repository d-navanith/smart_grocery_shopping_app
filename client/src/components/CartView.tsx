import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
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
  AlertCircle
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
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'CARD_ONLINE' | 'POS_AT_DELIVERY'>('CASH_ON_DELIVERY');
  const [formError, setFormError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    onApplyPromo(couponInput.trim());
    setCouponInput('');
  };

  const handleProceedCheckout = () => {
    if (onNavigateCheckout) {
      onNavigateCheckout();
      return;
    }
    if (!streetAddress.trim() || !customerPhone.trim()) {
      setFormError('Vă rugăm să introduceți adresa completă din România și numărul de telefon.');
      return;
    }
    setFormError('');
    const fullAddress = `${streetAddress}, ${buildingDetails ? buildingDetails + ', ' : ''}${selectedZone.name}`;
    onOpenCheckoutModal({
      address: fullAddress,
      phone: customerPhone,
      note: deliveryNote,
      paymentMethod
    });
  };

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* 1. BREADCRUMB BANNER */}
      <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold border transition ${
        isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
            {t.breadcrumbHome}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A6847] dark:text-[#78F9B8] font-black">{t.cartBreadcrumb}</span>
        </div>

        <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
          🇷🇴 {t.cartSubtitle}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className={`p-16 rounded-3xl border text-center space-y-4 ${
          isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white">{t.emptyCartTitle}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {t.emptyCartDesc}
          </p>
          <button
            onClick={onNavigateShop}
            className="px-6 py-3 rounded-full bg-[#0A6847] hover:bg-[#085237] text-white font-extrabold text-xs shadow-md transition active:scale-95"
          >
            {t.startShoppingBtn}
          </button>
        </div>
      ) : (
        /* TWO-COLUMN LAYOUT: CART TABLE (LEFT) + ORDER SUMMARY & COD (RIGHT) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: TABLE (IMAGE 2 THEME) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`rounded-2xl border overflow-hidden shadow-xs ${
              isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              {/* GOLDEN YELLOW TABLE HEADER */}
              <div className="bg-[#E5A91A] text-amber-950 px-6 py-3.5 grid grid-cols-12 text-xs font-black uppercase tracking-wider select-none">
                <div className="col-span-6">{t.tableProduct}</div>
                <div className="col-span-2 text-center">{t.tablePrice}</div>
                <div className="col-span-2 text-center">{t.tableQuantity}</div>
                <div className="col-span-2 text-right">{t.tableSubtotal}</div>
              </div>

              {/* TABLE BODY ROWS */}
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="p-4 sm:p-5 grid grid-cols-12 items-center text-xs font-bold gap-3"
                  >
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
                      <button
                        onClick={() => onRemoveFromCart(item.product.id, item.selectedWeight)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-950/60 flex items-center justify-center transition shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center p-1 shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col text-left">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          {item.selectedWeight || item.product.unitWeight} • {item.product.brand}
                        </span>
                        {item.product.isOrganic && (
                          <span className="text-[9px] font-black text-[#0A6847] dark:text-[#78F9B8] uppercase">
                            🌿 {t.organicBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 text-left sm:text-center">
                      <span className="text-slate-800 dark:text-zinc-200 font-extrabold text-xs sm:text-sm">
                        {item.effectivePrice.toFixed(2)} lei
                      </span>
                    </div>

                    <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                      <div className="flex items-center border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900">
                        <button
                          onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, -1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateCartQty(item.product.id, item.selectedWeight, 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 text-right">
                      <span className="text-sm font-black text-[#0A6847] dark:text-[#78F9B8]">
                        {(item.effectivePrice * item.quantity).toFixed(2)} lei
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* COUPON & ACTIONS ROW */}
              <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-zinc-900/40 border-t border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <form onSubmit={handleApply} className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="Cod Cupon (ex: CEYLON10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow-xs transition active:scale-95 shrink-0"
                  >
                    {t.applyCoupon}
                  </button>
                </form>

                <div className="flex items-center gap-4 text-xs font-bold w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-slate-400 hover:text-red-500 transition"
                  >
                    {t.clearCart}
                  </button>
                  <button
                    onClick={onNavigateShop}
                    className="text-[#0A6847] dark:text-[#78F9B8] hover:underline"
                  >
                    {t.continueShopping}
                  </button>
                </div>
              </div>
            </div>

            {promoError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                {promoError}
              </div>
            )}
            {appliedPromo && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.couponApplied}: {appliedPromo.code} (-{appliedPromo.discount.toFixed(2)} lei)</span>
                </div>
                <button
                  onClick={onRemovePromo}
                  className="text-red-500 hover:underline text-[11px]"
                >
                  {t.removeCoupon}
                </button>
              </div>
            )}

            {/* Delivery Dispatch Reassurance Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 text-xs font-black">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>{t.howDeliveryWorksTitle}</span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                {t.howDeliveryWorksStep1}<br />
                {t.howDeliveryWorksStep2}<br />
                {t.howDeliveryWorksStep3}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: ROMANIAN ADDRESS, CASH ON DELIVERY & ORDER SUMMARY */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`rounded-2xl p-6 border shadow-xs space-y-5 ${
              isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-200' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <h3 className="font-black text-base uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-zinc-800 text-slate-900 dark:text-white">
                {t.checkoutTitle}
              </h3>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Delivery Address in Romania */}
              <div className="space-y-3 text-xs font-semibold">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  {t.shippingAddressTitle}
                </span>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-bold">{t.streetLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.streetPlaceholder}
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-bold">{t.buildingDetailsLabel}</label>
                  <input
                    type="text"
                    placeholder={t.buildingPlaceholder}
                    value={buildingDetails}
                    onChange={(e) => setBuildingDetails(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-bold">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>
              </div>

              {/* Sector / Zone Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    {t.selectZoneTitle}
                  </span>
                  <span className="text-[10px] font-bold text-[#0A6847] dark:text-[#78F9B8]">
                    {isFreeDeliveryQualified ? t.freeLabel : t.courierRates}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {deliveryZones.map(zone => (
                    <label
                      key={zone.name}
                      onClick={() => setSelectedZone(zone)}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition ${
                        selectedZone.name === zone.name
                          ? 'border-[#0A6847] bg-emerald-50/50 dark:bg-emerald-950/20 font-bold'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="deliveryZone"
                          readOnly
                          checked={selectedZone.name === zone.name}
                          className="accent-[#0A6847] cursor-pointer"
                        />
                        <div>
                          <p className="font-extrabold text-slate-800 dark:text-white text-[11px]">{zone.name}</p>
                          <p className="text-[10px] text-slate-400">{zone.coverage}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">
                        {isFreeDeliveryQualified ? t.freeLabel : `${zone.fee} lei`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PAYMENT METHOD SELECTION: CASH ON DELIVERY PRIMARY */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  {t.paymentMethodTitle}
                </span>

                <div className="space-y-2">
                  {/* Option 1: Cash on Delivery (Highlight) */}
                  <label
                    onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'CASH_ON_DELIVERY'
                        ? 'border-[#0A6847] bg-emerald-50/80 dark:bg-emerald-950/30 ring-1 ring-[#0A6847]'
                        : 'border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      readOnly
                      checked={paymentMethod === 'CASH_ON_DELIVERY'}
                      className="accent-[#0A6847] mt-0.5"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-black text-xs text-[#0A6847] dark:text-[#78F9B8]">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>{t.codOptionTitle}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#E5A91A] text-amber-950 text-[9px] font-black">
                          {t.recommendedTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {t.codOptionDesc}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs font-semibold">
                <div className="flex justify-between text-slate-400">
                  <span>{t.subtotalLabel}</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {subtotal.toFixed(2)} lei
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.deliveryFeeLabel} ({selectedZone.name})</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {effectiveDeliveryFee === 0 ? <strong className="text-emerald-600">{t.freeLabel}</strong> : `${effectiveDeliveryFee.toFixed(2)} lei`}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{t.discountLabel} ({appliedPromo.code})</span>
                    <span>-{appliedPromo.discount.toFixed(2)} lei</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>TVA România (19% Inclus)</span>
                  <span className="text-slate-600 font-semibold">Inclus în preț</span>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
                  <div>
                    <span className="font-black text-sm uppercase text-slate-800 dark:text-white block">{t.totalToPayLabel}</span>
                    <span className="text-[10px] text-amber-700 font-bold">{t.codOptionTitle}</span>
                  </div>
                  <span className="text-2xl font-black text-[#0A6847] dark:text-[#78F9B8]">
                    {totalAmount.toFixed(2)} lei
                  </span>
                </div>
              </div>

              {/* Submit COD Order Button / Proceed to Dedicated Checkout */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98"
              >
                <Lock className="w-4 h-4 text-[#FFB800]" />
                <span>
                  {onNavigateCheckout
                    ? `${t.checkoutPageTitle} (${totalAmount.toFixed(2)} lei) →`
                    : `${t.placeOrderBtn} (${totalAmount.toFixed(2)} lei)`}
                </span>
              </button>

              <div className="pt-2 text-center space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Magazinul va apela imediat curierul pentru ridicarea coletului
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500">
                  <span>🛵 Glovo</span> • <span>⚡ Bolt</span> • <span>📦 Sameday</span> • <span>🚚 Fan Courier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
