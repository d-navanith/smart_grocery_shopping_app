import React, { useState } from 'react';
import {
  Copy,
  Check,
  Printer,
  ArrowRight,
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
  onNavigateShop,
  onOpenInvoiceModal,
  t
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* Top Celebration Banner */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#0A6847] text-white flex items-center justify-center text-4xl mx-auto shadow-lg border-4 border-[#F8C519]">
            ✓
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded bg-[#F8C519] text-[#664E00] text-xs font-bold uppercase tracking-wider">
              {t.orderCompletedThankYou}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">
              <span className="text-[#0A6847] dark:text-white">Order </span>
              <span className="text-[#F96D26]">Confirmed!</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#003D25] dark:text-zinc-300 mt-2 max-w-lg mx-auto">
              {t.orderCompletedSubtitle}
            </p>
          </div>

          {/* Order Reference Number Pill with Copy Button */}
          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-lg bg-white dark:bg-zinc-900 border border-[#15875D] shadow-xs">
            <span className="text-xs font-bold text-[#1B8057]">{t.orderCompletedRefNumber}:</span>
            <strong className="text-sm font-bold text-black dark:text-white font-mono">
              #{order.orderNumber}
            </strong>
            <button
              onClick={handleCopyOrderNumber}
              className="p-1 rounded hover:bg-[#F0FAF3] text-[#0A6847] transition"
              title={t.orderCompletedCopyOrderNumber}
            >
              {copied ? <Check className="w-4 h-4 text-[#0A6847]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* 2. CASH ON DELIVERY REMINDER CARD (FIGMA GOLD & GREEN) */}
        <div className="p-6 rounded-xl bg-[#F8C519]/20 border-2 border-[#C08512] shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img src="/figma_icon_cod.png" alt="" className="w-12 h-12 object-contain shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#003D25] dark:text-white">
                  {t.orderCompletedCodReminderTitle}
                </h4>
                <p className="text-xs text-[#664E00] dark:text-amber-200 mt-0.5">
                  {t.orderCompletedCodReminderDesc}
                </p>
              </div>
            </div>

            <div className="px-5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-[#15875D] text-center">
              <span className="text-[10px] font-bold text-[#1B8057] uppercase block">{t.totalToPayLabel}</span>
              <span className="text-xl font-bold text-[#0A6847] dark:text-[#80F6C7]">
                {order.totalAmount.toFixed(2)} lei
              </span>
            </div>
          </div>
        </div>

        {/* 3. THREE REAL-TIME NEXT STEPS (FIGMA MINT CARDS) */}
        <div className="p-6 rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] shadow-xs space-y-4">
          <h4 className="font-bold text-sm text-[#0A6847] dark:text-white pb-2 border-b border-[#15875D]/20">
            {t.orderCompletedNextStepsTitle}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-[#15875D]/30 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#0A6847] text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h5 className="font-bold text-black dark:text-white">Packing at Hub</h5>
              </div>
              <p className="text-[#003D25] dark:text-zinc-300 text-[11px] leading-relaxed">
                {t.orderCompletedStep1}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-[#15875D]/30 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#F8C519] text-[#664E00] flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h5 className="font-bold text-black dark:text-white">Courier Dispatch</h5>
              </div>
              <p className="text-[#003D25] dark:text-zinc-300 text-[11px] leading-relaxed">
                {t.orderCompletedStep2}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-[#15875D]/30 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#1B8057] text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h5 className="font-bold text-black dark:text-white">Rider Verification</h5>
              </div>
              <p className="text-[#003D25] dark:text-zinc-300 text-[11px] leading-relaxed">
                {t.orderCompletedStep3}
              </p>
            </div>
          </div>
        </div>

        {/* 4. ACTIONS CTA BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigateTrackOrder(order.orderNumber)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Truck className="w-4 h-4 text-[#F8C519]" />
            <span>{t.orderCompletedTrackOrderBtn}</span>
          </button>

          <button
            onClick={() => onOpenInvoiceModal(order)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-white dark:bg-zinc-800 border border-[#15875D] text-[#0A6847] dark:text-white font-bold text-sm hover:bg-[#F0FAF3] transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#1B8057]" />
            <span>{t.orderCompletedInvoiceBtn}</span>
          </button>

          <button
            onClick={onNavigateShop}
            className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#F2F7F4] dark:bg-zinc-800 text-[#003D25] dark:text-zinc-200 font-bold text-sm hover:bg-[#15875D]/15 transition flex items-center justify-center gap-2"
          >
            <span>{t.orderCompletedContinueShopBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5. SUMMARY DETAILS */}
        <div className="p-6 rounded-xl bg-[#F2F7F4] dark:bg-zinc-900 border border-[#15875D]/30 text-xs space-y-3">
          <div className="flex justify-between items-center text-[#1B8057]">
            <span>{t.deliveryDestinationAddress}:</span>
            <strong className="text-black dark:text-white text-right max-w-sm truncate">{order.address}</strong>
          </div>
          <div className="flex justify-between items-center text-[#1B8057]">
            <span>Courier Partner:</span>
            <strong className="text-black dark:text-white">
              {order.courierCompany || 'Glovo Express Bucharest'}
            </strong>
          </div>
          <div className="flex justify-between items-center text-[#1B8057]">
            <span>Payment:</span>
            <strong className="text-[#0A6847] dark:text-[#80F6C7]">{order.paymentMethod}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
