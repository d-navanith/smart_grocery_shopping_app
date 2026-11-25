import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { ClientOrder } from '../types';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  order: ClientOrder | null;
  onClose: () => void;
  onNavigateTrackOrder: (orderNumber: string) => void;
  onNavigateShop: () => void;
  isDarkMode?: boolean;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  order,
  onClose,
  onNavigateTrackOrder,
  onNavigateShop,
  isDarkMode
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const orderNum = order.orderNumber.replace(/[^0-9]/g, '') || order.orderNumber;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-[#141C18] rounded-2xl max-w-lg w-full border-2 border-[#15875D] shadow-2xl overflow-hidden animate-modal-pop my-8">
        {/* Top Header Banner */}
        <div className="bg-[#0A6847] text-white p-6 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white text-[#0A6847] flex items-center justify-center mx-auto mb-3 shadow-lg border-4 border-[#F8C519]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="px-3 py-1 rounded-full bg-[#F8C519] text-[#664E00] text-xs font-bold uppercase tracking-wider inline-block mb-1">
            Order Received
          </span>
          <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
          <p className="text-emerald-100 text-xs mt-1">
            Your grocery order has been successfully placed with Ceylon Foods.
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Unique Order Number Card */}
          <div className="p-4 rounded-xl bg-[#F0FAF3] dark:bg-[#0E2E20] border-2 border-[#15875D] text-center space-y-2">
            <span className="text-xs font-semibold text-[#003D25] dark:text-emerald-200 uppercase tracking-wider block">
              Your Unique Order Number
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-3xl font-black text-[#0A6847] dark:text-[#80F6C7] tracking-wider">
                #{orderNum}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-[#15875D] text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#E8F5EE] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Copy Order Number"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#003D25] dark:text-zinc-300">
              Please save this order number. You will need it to track your order or contact support.
            </p>
          </div>

          {/* Customer Care Will Contact You Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200">
                Ceylon Foods Customer Care Will Contact You
              </h4>
              <p className="text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
                Our support team will contact you shortly to confirm your order details and delivery schedule before dispatching your package.
              </p>
            </div>
          </div>

          {/* Ceylon Foods Direct Contact Info */}
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800 p-4 space-y-3 bg-slate-50/60 dark:bg-zinc-900/60">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>Direct Customer Care & Support</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+40722456789"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:border-[#0A6847] hover:text-[#0A6847] transition"
              >
                <Phone className="w-4 h-4 text-[#0A6847] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Hotline</span>
                  <span className="font-bold">+40 722 456 789</span>
                </div>
              </a>

              <a
                href="https://wa.me/40722456789"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:border-emerald-500 hover:text-emerald-600 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">WhatsApp</span>
                  <span className="font-bold">+40 722 456 789</span>
                </div>
              </a>

              <a
                href="mailto:support@ceylonfoods.ro"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:border-[#0A6847] hover:text-[#0A6847] transition"
              >
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Email</span>
                  <span className="font-bold">support@ceylonfoods.ro</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Hours</span>
                  <span className="font-bold">Mon - Sun: 09:00 - 21:00</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>Strada Mihai Eminescu nr. 42, Sector 2, București, Romania</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTrackOrder(orderNum);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#0A6847] hover:bg-[#075238] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <span>Track My Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateShop();
              }}
              className="py-3 px-5 rounded-xl border-2 border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
