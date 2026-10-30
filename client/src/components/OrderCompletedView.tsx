import React, { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  Printer,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { ClientOrder } from '../types';
import { TranslationDictionary } from '../translations';

interface OrderCompletedViewProps {
  order: ClientOrder;
  onNavigateTrackOrder: (orderNumber: string) => void;
  onNavigateDeliveries: () => void;
  onNavigateShop: () => void;
  onOpenInvoiceModal: (order: ClientOrder) => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const OrderCompletedView: React.FC<OrderCompletedViewProps> = ({
  order,
  onNavigateTrackOrder,
  onNavigateDeliveries,
  onNavigateShop,
  onOpenInvoiceModal,
  isDarkMode,
  t
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      
      {/* 1. CELEBRATION HEADER */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0A6847] to-emerald-400 text-white flex items-center justify-center text-4xl mx-auto shadow-xl shadow-emerald-900/20 animate-bounce">
          ✓
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#0A6847] dark:text-[#78F9B8]">
            {t.orderCompletedThankYou}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            {t.orderCompletedTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-lg mx-auto">
            {t.orderCompletedSubtitle}
          </p>
        </div>

        {/* Order Reference Number Pill with Copy Button */}
        <div className="inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">{t.orderCompletedRefNumber}:</span>
          <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">
            #{order.orderNumber}
          </strong>
          <button
            onClick={handleCopyOrderNumber}
            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 transition"
            title={t.orderCompletedCopyOrderNumber}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. CASH ON DELIVERY REMINDER CARD (ROMANIA STANDARD) */}
      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center text-2xl font-black shadow-xs">
              💵
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                {t.orderCompletedCodReminderTitle}
              </h4>
              <p className="text-xs text-amber-900 dark:text-amber-200">
                {t.orderCompletedCodReminderDesc}
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-300 font-mono text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.totalToPayLabel}</span>
            <span className="text-xl font-black text-[#0A6847] dark:text-[#78F9B8]">
              {order.totalAmount.toFixed(2)} lei
            </span>
          </div>
        </div>
      </div>

      {/* 3. THREE REAL-TIME NEXT STEPS (BUCHAREST DISPATCH WORKFLOW) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h4 className="font-black text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
          {t.orderCompletedNextStepsTitle}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0A6847] text-white flex items-center justify-center font-black text-xs">
                1
              </span>
              <h5 className="font-black text-slate-900 dark:text-white">Packing at Hub</h5>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              {t.orderCompletedStep1}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#E5A91A] text-amber-950 flex items-center justify-center font-black text-xs">
                2
              </span>
              <h5 className="font-black text-slate-900 dark:text-white">Courier Dispatch</h5>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              {t.orderCompletedStep2}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                3
              </span>
              <h5 className="font-black text-slate-900 dark:text-white">Rider Verification</h5>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              {t.orderCompletedStep3}
            </p>
          </div>
        </div>
      </div>

      {/* 4. ACTIONS CTA BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigateTrackOrder(order.orderNumber)}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 transition active:scale-95"
        >
          <Truck className="w-4 h-4 text-[#FFB800]" />
          <span>{t.orderCompletedTrackOrderBtn}</span>
        </button>

        <button
          onClick={() => onOpenInvoiceModal(order)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white font-black text-xs sm:text-sm hover:bg-slate-50 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>{t.orderCompletedInvoiceBtn}</span>
        </button>

        <button
          onClick={onNavigateShop}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-black text-xs sm:text-sm hover:bg-slate-200 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>{t.orderCompletedContinueShopBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. SUMMARY DETAILS */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 text-xs space-y-3">
        <div className="flex justify-between items-center text-slate-500">
          <span>{t.deliveryDestinationAddress}:</span>
          <strong className="text-slate-800 dark:text-white text-right max-w-sm truncate">{order.address}</strong>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span>Courier Partner:</span>
          <strong className="text-slate-800 dark:text-white">{order.courierCompany || 'Glovo Express Bucharest'}</strong>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span>Payment:</span>
          <strong className="text-[#0A6847] dark:text-[#78F9B8]">{order.paymentMethod}</strong>
        </div>
      </div>
    </div>
  );
};
