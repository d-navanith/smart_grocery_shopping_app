import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Banknote,
  Lock,
  Zap,
  MapPin
} from 'lucide-react';
import { CartItem, CustomerUser, DeliveryZone } from '../types';

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
  onOpenCheckoutModal: () => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
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
  onNavigateShop,
  onNavigateHome,
  isDarkMode
}) => {
  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    onApplyPromo(couponInput.trim());
    setCouponInput('');
  };

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* 1. BREADCRUMB BANNER (IMAGE 2) */}
      <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold border transition ${
        isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A6847] dark:text-[#78F9B8] font-black">Shopping Cart</span>
        </div>

        <div className="text-[11px] font-semibold text-slate-400">
          Secure 256-Bit SSL Checkout • LankaQR & Cards Accepted
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className={`p-16 rounded-3xl border text-center space-y-4 ${
          isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white">Your Shopping Cart is Empty</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You don't have any grocery items in your basket yet. Explore fresh produce, bakery staples, and Ceylon tea from our farm catalog.
          </p>
          <button
            onClick={onNavigateShop}
            className="px-6 py-3 rounded-full bg-[#0A6847] hover:bg-[#085237] text-white font-extrabold text-xs shadow-md transition active:scale-95"
          >
            Start Shopping Now
          </button>
        </div>
      ) : (
        /* 2. TWO-COLUMN LAYOUT: CART TABLE (LEFT) + ORDER SUMMARY (RIGHT) (IMAGE 2) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: CART TABLE & ACTIONS (MATCHING IMAGE 2)
          ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            <div className={`rounded-2xl border overflow-hidden shadow-xs ${
              isDarkMode ? 'bg-[#141816] border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              {/* GOLDEN YELLOW TABLE HEADER (IMAGE 2) */}
              <div className="bg-[#E5A91A] text-amber-950 px-6 py-3.5 grid grid-cols-12 text-xs font-black uppercase tracking-wider select-none">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* TABLE BODY ROWS */}
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="p-4 sm:p-6 grid grid-cols-12 items-center text-xs font-bold gap-3"
                  >
                    {/* Column 1: Remove + Image + Title + Weight */}
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
                      <button
                        onClick={() => onRemoveFromCart(item.product.id, item.selectedWeight)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-950/60 flex items-center justify-center transition shrink-0"
                        title="Remove item"
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
                            🌿 100% Organic Farm Harvest
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Column 2: Price */}
                    <div className="col-span-4 sm:col-span-2 text-left sm:text-center">
                      <span className="text-slate-800 dark:text-zinc-200 font-extrabold text-xs sm:text-sm">
                        Rs. {Math.round(item.effectivePrice).toLocaleString()}
                      </span>
                    </div>

                    {/* Column 3: Quantity Stepper (Image 2 style) */}
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

                    {/* Column 4: Subtotal */}
                    <div className="col-span-4 sm:col-span-2 text-right">
                      <span className="text-sm font-black text-[#0A6847] dark:text-[#78F9B8]">
                        Rs. {Math.round(item.effectivePrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM ACTIONS ROW: COUPON CODE & CLEAR CART (IMAGE 2) */}
              <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-zinc-900/40 border-t border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Coupon Code Input */}
                <form onSubmit={handleApply} className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. FRESH10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow-xs transition active:scale-95 shrink-0"
                  >
                    Apply Coupon
                  </button>
                </form>

                {/* Right Action Links */}
                <div className="flex items-center gap-4 text-xs font-bold w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-slate-400 hover:text-red-500 transition"
                  >
                    Clear Shopping Cart
                  </button>
                  <button
                    onClick={onNavigateShop}
                    className="text-[#0A6847] dark:text-[#78F9B8] hover:underline"
                  >
                    Continue Shopping →
                  </button>
                </div>
              </div>
            </div>

            {/* Promo Error or Applied Message */}
            {promoError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                {promoError}
              </div>
            )}
            {appliedPromo && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Promo {appliedPromo.code} Applied: <strong>-Rs. {appliedPromo.discount.toLocaleString()}</strong> ({appliedPromo.title})</span>
                </div>
                <button
                  onClick={onRemovePromo}
                  className="text-red-500 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Feature Highlights beneath cart */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs">
                <Truck className="w-4 h-4 text-[#0A6847] dark:text-[#78F9B8]" />
                <span className="font-bold text-slate-700 dark:text-zinc-300">Fast 45-Min Express</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#0A6847] dark:text-[#78F9B8]" />
                <span className="font-bold text-slate-700 dark:text-zinc-300">100% Quality Inspected</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs">
                <CreditCard className="w-4 h-4 text-[#0A6847] dark:text-[#78F9B8]" />
                <span className="font-bold text-slate-700 dark:text-zinc-300">LankaQR & Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ORDER SUMMARY CARD (MATCHING IMAGE 2)
          ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-2xl p-6 border shadow-xs space-y-5 ${
              isDarkMode ? 'bg-[#141816] border-zinc-800 text-zinc-200' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <h3 className="font-black text-base uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-zinc-800 text-slate-900 dark:text-white">
                Order Summary
              </h3>

              {/* Subtotal */}
              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cart Subtotal</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Rs. {Math.round(subtotal).toLocaleString()}
                  </span>
                </div>

                {/* Delivery Zone Radio Selector */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Delivery Location
                    </span>
                    <span className="text-[10px] font-bold text-[#0A6847] dark:text-[#78F9B8]">
                      {isFreeDeliveryQualified ? 'Free Shipping Active' : 'Zone Rates'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {deliveryZones.map(zone => (
                      <label
                        key={zone.name}
                        onClick={() => setSelectedZone(zone)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                          selectedZone.name === zone.name
                            ? 'border-[#0A6847] bg-emerald-50/50 dark:bg-emerald-950/20 font-bold'
                            : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/60'
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
                          {isFreeDeliveryQualified ? 'FREE' : `Rs. ${zone.fee}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Discounts & Taxes */}
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 dark:text-[#78F9B8] font-bold">
                    <span>Coupon Discount ({appliedPromo.code})</span>
                    <span>-Rs. {appliedPromo.discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Sri Lanka GST / Taxes</span>
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">18% VAT (Inclusive)</span>
                </div>

                {/* Final Total Amount */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
                  <div>
                    <span className="font-black text-sm uppercase text-slate-800 dark:text-white block">Total Amount</span>
                    <span className="text-[10px] text-slate-400">All duties & packaging included</span>
                  </div>
                  <span className="text-2xl font-black text-[#0A6847] dark:text-[#78F9B8]">
                    Rs. {Math.round(totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Full-Width Button (Image 2) */}
              <button
                onClick={onOpenCheckoutModal}
                className="w-full py-3.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </button>

              {/* Payment Trust Badges */}
              <div className="pt-2 text-center space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Guaranteed Safe & Secure Checkout
                </span>
                <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-zinc-400">
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] font-black">LankaQR</span>
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] font-black">VISA</span>
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] font-black">Mastercard</span>
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] font-black">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
