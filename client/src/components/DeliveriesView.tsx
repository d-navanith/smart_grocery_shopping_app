import React, { useState } from 'react';
import {
  Truck,
  Phone,
  PhoneCall,
  CheckCircle,
  Clock,
  MapPin,
  Banknote,
  Package,
  Calendar,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Lock,
  RefreshCw,
  FileText,
  ShoppingBag,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ClientOrder, ClientOrderItem, Product } from '../types';
import { TranslationDictionary } from '../translations';

interface DeliveriesViewProps {
  orders: ClientOrder[];
  onReorder: (order: ClientOrder) => void;
  onNavigateShop: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const DeliveriesView: React.FC<DeliveriesViewProps> = ({
  orders,
  onReorder,
  onNavigateShop,
  isDarkMode,
  t
}) => {
  const [activeTab, setActiveTab] = useState<'ONGOING' | 'HISTORY'>('ONGOING');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<ClientOrder | null>(null);

  // Ongoing orders: PENDING, PROCESSING, ON_THE_WAY
  const ongoingOrders = orders.filter(
    o => o.status === 'PROCESSING' || o.status === 'PENDING' || o.status === 'ON_THE_WAY'
  );

  // Completed delivery history: DELIVERED, CANCELLED
  const historyOrders = orders.filter(
    o => o.status === 'DELIVERED' || o.status === 'CANCELLED'
  );

  return (
    <div className={`flex-1 py-8 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
      
      {/* 1. PAGE TITLE & HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1">
            <span onClick={onNavigateShop} className="cursor-pointer hover:underline">
              {t.tabHome}
            </span>
            <span>›</span>
            <span>{t.tabDeliveries}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>{t.tabDeliveries}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E5A91A] text-amber-950 uppercase tracking-wider">
              {ongoingOrders.length} {t.ongoingDeliveriesTitle}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-2xl">
            {t.adminVerificationNotice}
          </p>
        </div>

        {/* Action button to shop */}
        <button
          onClick={onNavigateShop}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs shadow-md transition active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.startShoppingBtn}</span>
        </button>
      </div>

      {/* 2. TAB SWITCHER: ONGOING DELIVERIES vs DELIVERY HISTORY */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800 pb-1">
        <button
          onClick={() => setActiveTab('ONGOING')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition relative ${
            activeTab === 'ONGOING'
              ? 'bg-[#0B3B2C] text-[#F8B838] shadow-md'
              : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{t.ongoingDeliveriesTitle}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
            activeTab === 'ONGOING' ? 'bg-[#F8B838] text-slate-950' : 'bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300'
          }`}>
            {ongoingOrders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('HISTORY')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition relative ${
            activeTab === 'HISTORY'
              ? 'bg-[#0B3B2C] text-[#F8B838] shadow-md'
              : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t.deliveryHistoryTitle}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
            activeTab === 'HISTORY' ? 'bg-[#F8B838] text-slate-950' : 'bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300'
          }`}>
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
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0A6847] dark:text-[#78F9B8] mx-auto flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                Nu aveți comenzi în curs de livrare
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                Toate pachetele Ceylon Foods au fost livrate cu succes! Puteți plasa o nouă comandă cu orez roșu, wambatu proaspăt și condimente din Sri Lanka.
              </p>
              <button
                onClick={onNavigateShop}
                className="px-6 py-3 rounded-2xl bg-[#E5A91A] text-amber-950 font-black text-xs shadow-md transition hover:bg-[#d49912]"
              >
                Cumpără Alimente Ceylon Acum →
              </button>
            </div>
          ) : (
            ongoingOrders.map((order) => {
              // RIDER CALL ELIGIBILITY CHECK:
              // Client CANNOT call rider until:
              // 1. Admin assigns rider
              // 2. Rider arrives at supermarket and shares direct mobile with admin
              // 3. Admin enters that mobile into the system
              const isRiderCallEnabled = Boolean(order.riderVerifiedByAdmin && order.riderPhone && order.riderPhone.trim().length > 5);

              return (
                <div
                  key={order.id || order.orderNumber}
                  className="rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden"
                >
                  {/* Order Top Bar */}
                  <div className="p-5 sm:p-6 bg-slate-50 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-[#0B3B2C] text-[#F8B838] font-black text-xs uppercase tracking-wider">
                        TA #{order.orderNumber.replace(/[^0-9]/g, '').slice(-2) || '21'}
                      </span>
                      <div>
                        <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Comandă #{order.orderNumber}</span>
                          <span className="text-[11px] font-bold text-slate-400">• {order.placedAt}</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                          Livrare Rapidă în <strong>{order.deliveryZone || 'București Sector 1'}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-black text-xs border border-amber-300">
                        💵 {order.paymentMethod === 'CASH_ON_DELIVERY' || order.paymentMethod.includes('Cash') ? 'Plata la Livrare (Cash on Delivery)' : 'Plătit Online'}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-black text-xs border border-emerald-300">
                        {order.status === 'ON_THE_WAY' ? '🚀 În Livrare spre Tine' : '📦 Se Împachetează'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-6">
                    
                    {/* Visual 5-Step Fulfillment Stepper */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                        Stadiu Livrare în Timp Real (Supermarket ➔ Curier ➔ Adresă):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        {/* Step 1 */}
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-300 font-bold">
                          <div className="flex items-center gap-1.5 mb-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] uppercase font-black">Pasul 1</span>
                          </div>
                          <p className="text-xs font-black">Comandă Plasată</p>
                          <span className="text-[10px] opacity-75 font-normal">Înregistrată în magazin</span>
                        </div>

                        {/* Step 2 */}
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-300 font-bold">
                          <div className="flex items-center gap-1.5 mb-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] uppercase font-black">Pasul 2</span>
                          </div>
                          <p className="text-xs font-black">Pregătire Colet</p>
                          <span className="text-[10px] opacity-75 font-normal">Produse Ceylon ambalate</span>
                        </div>

                        {/* Step 3 */}
                        <div className={`p-3 rounded-2xl border font-bold ${
                          order.status === 'ON_THE_WAY' || order.status === 'DELIVERED'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-300'
                            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
                        }`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            {order.status === 'ON_THE_WAY' || order.status === 'DELIVERED' ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                            )}
                            <span className="text-[10px] uppercase font-black">Pasul 3</span>
                          </div>
                          <p className="text-xs font-black">Apel Dispecerat</p>
                          <span className="text-[10px] opacity-75 font-normal">Admin cheamă curierul</span>
                        </div>

                        {/* Step 4: Rider Arrives & Mobile Verification */}
                        <div className={`p-3 rounded-2xl border font-bold ${
                          order.riderVerifiedByAdmin
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-zinc-800 border-slate-300 text-slate-500'
                        }`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            {order.riderVerifiedByAdmin ? (
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="text-[10px] uppercase font-black">Pasul 4</span>
                          </div>
                          <p className="text-xs font-black">Verificare Curier</p>
                          <span className="text-[10px] opacity-75 font-normal">
                            {order.riderVerifiedByAdmin ? 'Mobil confirmat la magazin' : 'Așteaptă sosirea la magazin'}
                          </span>
                        </div>

                        {/* Step 5: On The Way */}
                        <div className={`p-3 rounded-2xl border font-bold ${
                          order.status === 'ON_THE_WAY'
                            ? 'bg-[#E9F5EF] dark:bg-emerald-950 border-[#0A6847] text-[#0A6847] dark:text-[#78F9B8] ring-2 ring-[#0A6847]'
                            : 'bg-slate-100 dark:bg-zinc-800 border-slate-300 text-slate-500'
                        }`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Truck className="w-4 h-4 text-emerald-700" />
                            <span className="text-[10px] uppercase font-black">Pasul 5</span>
                          </div>
                          <p className="text-xs font-black">Pe Drum spre Tine</p>
                          <span className="text-[10px] opacity-75 font-normal">
                            ETA ~{order.deliveryMinutes || 25} min
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ============================================================== */}
                    {/* CRITICAL FEATURE: RIDER VERIFICATION & DIRECT CALL CONTROL     */}
                    {/* Clients CANNOT call rider until admin assigns rider and enters  */}
                    {/* rider's mobile number upon arrival at store.                  */}
                    {/* ============================================================== */}
                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-zinc-800/80 border-2 border-slate-200 dark:border-zinc-700/80 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-700 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-[#0B3B2C] text-[#F8B838] flex items-center justify-center font-black">
                            🛵
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Partener Curierat România • Contact Direct
                            </span>
                            <h4 className="font-black text-sm text-slate-900 dark:text-white">
                              {order.courierCompany || 'Companie de Livrare (Glovo / Bolt / Sameday)'}
                            </h4>
                          </div>
                        </div>

                        {/* Verified or Pending Pill */}
                        {isRiderCallEnabled ? (
                          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black text-xs border border-emerald-300">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>{t.verifiedRiderBadge}</span>
                          </span>
                        ) : (
                          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-300 font-black text-xs border border-amber-300">
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                            <span>În Curs de Alocare la Magazin</span>
                          </span>
                        )}
                      </div>

                      {/* Condition A: RIDER NOT VERIFIED YET (CALL BUTTON LOCKED) */}
                      {!isRiderCallEnabled ? (
                        <div className="space-y-3">
                          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="font-black text-sm text-amber-950 dark:text-amber-100">
                                🔒 Apelul direct către curier este temporar blocat
                              </p>
                              <p className="leading-relaxed">
                                Administratorul magazinului a contactat dispeceratul curierilor pentru preluarea coletului. În momentul în care curierul ajunge fizic la depozitul din <strong>Strada Academiei 14, București</strong>, acesta își va prezenta numărul direct de mobil administratorului, care îl va valida în sistem. Imediat după verificare, butonul de apel direct se va activa automat aici!
                              </p>
                            </div>
                          </div>

                          {/* Disabled Call Button */}
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <button
                              disabled
                              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-500 font-black text-xs cursor-not-allowed border border-slate-300 dark:border-zinc-600"
                              title="Curierul nu a sosit încă la magazin pentru transmiterea numărului de mobil."
                            >
                              <Lock className="w-4 h-4" />
                              <span>{t.callRiderLockedButton}</span>
                            </button>
                            <span className="text-[11px] font-bold text-slate-400 text-center">
                              ⏱ Curierul sosește la magazin în ~10 min
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Condition B: RIDER ARRIVED & ADMIN ENTERED MOBILE NUMBER (DIRECT CALL ACTIVATED) */
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-300 flex items-center justify-center text-xl shadow-xs shrink-0">
                                🛵
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-black text-base text-slate-900 dark:text-white">
                                    {order.riderName || 'Curier Glovo / Bolt Alocat'}
                                  </h5>
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 text-[10px] font-black">
                                    ✓ VERIFICAT
                                  </span>
                                </div>
                                <p className="text-xs font-mono font-bold text-[#0A6847] dark:text-[#78F9B8] mt-0.5">
                                  Număr Direct Mobil: <strong>{order.riderPhone}</strong>
                                </p>
                                <span className="text-[10px] text-slate-400">
                                  Număr furnizat administratorului la ridicarea pachetului din magazin
                                </span>
                              </div>
                            </div>

                            {/* Active Direct Call Button */}
                            <a
                              href={`tel:${order.riderPhone}`}
                              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95 text-center"
                            >
                              <PhoneCall className="w-4 h-4 animate-bounce" />
                              <span>{t.callRiderButton}: {order.riderPhone}</span>
                            </a>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
                            <span className="flex items-center gap-1.5 font-bold text-[#0A6847]">
                              <span>🛡️</span>
                              <span>Puteți suna curierul direct pentru instrucțiuni interfon / adresă.</span>
                            </span>
                            <span className="font-bold">
                              Timp estimat până la ușă: ~{order.deliveryMinutes || 25} min
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery Notice Card */}
                    <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                          <Banknote className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-sm">
                            {t.cashAmountToPrepare}: <span className="text-[#0A6847] dark:text-[#78F9B8] font-black text-base">{order.totalAmount.toFixed(2)} lei</span>
                          </p>
                          <span className="text-[11px] text-amber-800 dark:text-amber-300">
                            Vă rugăm să pregătiți suma exactă în numerar (Cash on Delivery) pentru curier.
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-[#E5A91A] text-amber-950 font-black text-xs self-start sm:self-auto">
                        Plată Ramburs
                      </span>
                    </div>

                    {/* Order Items List */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                        Articole Alimentare Comandate ({order.items.length}):
                      </span>
                      <div className="divide-y divide-slate-100 dark:divide-zinc-800 bg-slate-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 space-y-2">
                        {order.items.map((item, idx) => {
                          const title = typeof item === 'string' ? item : item.productTitle;
                          const qty = typeof item === 'string' ? 1 : item.quantity;
                          const price = typeof item === 'string' ? 0 : (item.price * item.quantity);

                          return (
                            <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#0A6847] font-black text-[10px] flex items-center justify-center">
                                  x{qty}
                                </span>
                                <span className="font-bold text-slate-800 dark:text-zinc-200">{title}</span>
                              </div>
                              {price > 0 && (
                                <span className="font-black text-slate-900 dark:text-white">
                                  {price.toFixed(2)} lei
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery Address & Note */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0A6847] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black text-slate-700 dark:text-zinc-300">Adresă de Livrare:</span>
                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">{order.address}</p>
                        {order.notes && (
                          <p className="text-[11px] text-slate-400 italic mt-0.5">Notă: {order.notes}</p>
                        )}
                      </div>
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
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-black text-slate-700 dark:text-zinc-300">
                Nu aveți comenzi anterioare finalizate
              </h3>
              <p className="text-xs text-slate-400">
                După ce curierul livrează produsele la ușa dumneavoastră, istoricul detaliat va fi salvat aici.
              </p>
            </div>
          ) : (
            historyOrders.map((order) => (
              <div
                key={order.id || order.orderNumber}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-slate-900 dark:text-white">
                        Comandă #{order.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                        ✓ LIVRAT & ÎNCASAT
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Plasată: {order.placedAt} • Adresă: {order.address}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-black uppercase text-slate-400">Total Plătit (Cash on Delivery)</span>
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      {order.totalAmount.toFixed(2)} <span className="text-xs font-bold text-slate-500">lei</span>
                    </p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="text-xs text-slate-600 dark:text-zinc-400 space-y-1">
                  <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">Articole cumpărate:</span>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, i) => {
                      const title = typeof item === 'string' ? item : item.productTitle;
                      return (
                        <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-xs">
                          {title}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Actions: View Invoice & Reorder */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs">
                  <button
                    onClick={() => setSelectedInvoiceOrder(order)}
                    className="flex items-center gap-1.5 font-bold text-[#0A6847] hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Vezi Chitanță / Factură Oficială</span>
                  </button>

                  <button
                    onClick={() => onReorder(order)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow transition active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Comandă Din Nou</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* INVOICE MODAL FOR DELIVERY HISTORY */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs font-sans text-slate-800">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div>
                <h4 className="font-black text-base text-slate-900">Ceylon Foods Supermarket</h4>
                <p className="text-[10px] text-slate-400 font-mono">Strada Academiei 14, București, România</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl space-y-1 font-mono text-[11px]">
              <p>Factură Livrare: <strong>#{selectedInvoiceOrder.orderNumber}</strong></p>
              <p>Data: <strong>{selectedInvoiceOrder.placedAt}</strong></p>
              <p>Client: <strong>{selectedInvoiceOrder.customerName}</strong></p>
              <p>Telefon: <strong>{selectedInvoiceOrder.customerPhone}</strong></p>
              <p>Plată: <strong>Cash on Delivery (Încasat la Ușă)</strong></p>
            </div>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {selectedInvoiceOrder.items.map((it, idx) => {
                const title = typeof it === 'string' ? it : it.productTitle;
                const qty = typeof it === 'string' ? 1 : it.quantity;
                const price = typeof it === 'string' ? 0 : (it.price * it.quantity);
                return (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <span>x{qty} {title}</span>
                    <span className="font-bold">{price > 0 ? `${price.toFixed(2)} lei` : ''}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-2 space-y-1 text-right">
              <div className="flex justify-between font-black text-sm text-slate-900">
                <span>Total Încasat:</span>
                <span>{selectedInvoiceOrder.totalAmount.toFixed(2)} lei</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
              >
                Printează Factura
              </button>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#0A6847] text-white font-black"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
