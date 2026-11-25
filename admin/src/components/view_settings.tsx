import React from 'react';
import {
  Check,
  Building,
  Truck,
  MapPin,
  Bell,
  KeyRound,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { DeliveryZone } from './part1_imports_types';

interface SettingsViewProps {
  settingsTab: 'STORE' | 'LOGISTICS' | 'NOTIFICATIONS' | 'SECURITY';
  setSettingsTab: (t: any) => void;
  storeName: string; setStoreName: (s: string) => void;
  supportEmail: string; setSupportEmail: (s: string) => void;
  phone: string; setPhone: (s: string) => void;
  address: string; setAddress: (s: string) => void;
  domain: string; setDomain: (s: string) => void;
  currency: string; setCurrency: (s: string) => void;
  country: string; setCountry: (s: string) => void;
  timezone: string; setTimezone: (s: string) => void;
  openingTime: string; setOpeningTime: (s: string) => void;
  closingTime: string; setClosingTime: (s: string) => void;
  isAcceptingOrders: boolean; setIsAcceptingOrders: (v: boolean | ((prev: boolean) => boolean)) => void;
  minOrderLkr: string; setMinOrderLkr: (s: string) => void;
  freeDeliveryAboveLkr: string; setFreeDeliveryAboveLkr: (s: string) => void;
  sameDayCutoff: string; setSameDayCutoff: (s: string) => void;
  deliveryWindowLength: string; setDeliveryWindowLength: (s: string) => void;
  deliveryZones: DeliveryZone[];
  onOpenEditZoneModal: (zone: DeliveryZone) => void;
  onOpenAddZoneModal: () => void;
  onDeleteZone: (id: string) => void;
  onToggleZoneStatus: (id: string) => void;
  onSaveSettings: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settingsTab,
  setSettingsTab,
  storeName, setStoreName,
  supportEmail, setSupportEmail,
  phone, setPhone,
  address, setAddress,
  domain, setDomain,
  currency, setCurrency,
  country, setCountry,
  timezone, setTimezone,
  openingTime, setOpeningTime,
  closingTime, setClosingTime,
  isAcceptingOrders, setIsAcceptingOrders,
  minOrderLkr, setMinOrderLkr,
  freeDeliveryAboveLkr, setFreeDeliveryAboveLkr,
  sameDayCutoff, setSameDayCutoff,
  deliveryWindowLength, setDeliveryWindowLength,
  deliveryZones,
  onOpenEditZoneModal,
  onOpenAddZoneModal,
  onDeleteZone,
  onToggleZoneStatus,
  onSaveSettings
}) => {
  return (
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Lime-Green Header matching Screenshot Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
            SETTINGS
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Manage your store profile, operating hours, and Bucharest delivery logistics.
          </p>
        </div>

        <button
          onClick={onSaveSettings}
          className="px-6 py-2.5 rounded-xl bg-[#6DB33F] hover:bg-[#5da034] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* 2. Sub-Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 text-sm font-bold text-gray-500 overflow-x-auto">
        {[
          { id: 'STORE', label: 'Store Profile & Operating Hours' },
          { id: 'LOGISTICS', label: 'Delivery Zones & Thresholds' },
          { id: 'NOTIFICATIONS', label: 'Order Alerts' },
          { id: 'SECURITY', label: 'Security & Access' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSettingsTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap cursor-pointer ${
              settingsTab === t.id
                ? 'text-[#6DB33F] border-b-2 border-[#6DB33F] font-black'
                : 'hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 3. STORE TAB */}
      {(settingsTab === 'STORE' || !settingsTab) && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Store Information */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
              <div>
                <h3 className="font-bold text-base text-gray-900">Store Profile</h3>
                <p className="text-xs text-gray-500">Contact information visible to customers and on order slips.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Customer Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Support Hotline / WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Store / Warehouse Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Storefront URL</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Operating Hours & Master Order Acceptance */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
              <div>
                <h3 className="font-bold text-base text-gray-900">Regional & Operating Hours</h3>
                <p className="text-xs text-gray-500">Store opening schedule and operational availability.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Currency</label>
                    <input
                      type="text"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Timezone</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Store Opening Time</label>
                    <input
                      type="text"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Store Closing Time</label>
                    <input
                      type="text"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Master Order Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 mt-2">
                  <div>
                    <p className="font-bold text-xs text-gray-900">Accepting Online Orders</p>
                    <p className="text-[11px] text-gray-500">Pause checkout orders when kitchen/warehouse is full.</p>
                  </div>
                  <button
                    onClick={() => setIsAcceptingOrders(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isAcceptingOrders ? 'bg-[#6DB33F]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        isAcceptingOrders ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LOGISTICS TAB */}
      {settingsTab === 'LOGISTICS' && (
        <div className="space-y-6">
          {/* Thresholds */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-base text-gray-900">Delivery Rules & Thresholds</h3>
              <p className="text-xs text-gray-500">Configure minimum order requirements and automatic free delivery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Min. Order Value (lei)</label>
                <input
                  type="text"
                  value={minOrderLkr}
                  onChange={(e) => setMinOrderLkr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Free Delivery Above (lei)</label>
                <input
                  type="text"
                  value={freeDeliveryAboveLkr}
                  onChange={(e) => setFreeDeliveryAboveLkr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Same-Day Order Cutoff</label>
                <input
                  type="text"
                  value={sameDayCutoff}
                  onChange={(e) => setSameDayCutoff(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Standard Delivery Window</label>
                <input
                  type="text"
                  value={deliveryWindowLength}
                  onChange={(e) => setDeliveryWindowLength(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-semibold focus:border-[#6DB33F] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery Zones Table */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900">Configured Delivery Zones</h3>
                <p className="text-xs text-gray-500">Delivery fees and estimated transit times per sector/county.</p>
              </div>

              <button
                onClick={onOpenAddZoneModal}
                className="px-4 py-2 rounded-xl bg-[#6DB33F] hover:bg-[#5da034] text-white text-xs font-bold flex items-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Zone</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-300">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                    <th className="py-3 px-4">Zone Name</th>
                    <th className="py-3 px-4">Coverage</th>
                    <th className="py-3 px-4">Delivery Fee</th>
                    <th className="py-3 px-4">Estimated Transit</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 bg-white">
                  {deliveryZones.map(z => (
                    <tr key={z.id} className="hover:bg-gray-50 divide-x divide-gray-300">
                      <td className="py-3.5 px-4 font-bold text-gray-900">{z.zone}</td>
                      <td className="py-3.5 px-4 text-gray-600">{z.coverage}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 font-mono">{typeof z.fee === 'number' ? `${(z.fee as number).toFixed(2)} lei` : (String(z.fee).includes('lei') ? z.fee : `${z.fee} lei`)}</td>
                      <td className="py-3.5 px-4 text-gray-600">{z.eta}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onToggleZoneStatus(z.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            z.status === 'Enabled' ? 'bg-[#E4F8B0] text-gray-900' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {z.status === 'Enabled' ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenEditZoneModal(z)}
                            className="p-1 rounded text-gray-600 hover:text-[#6DB33F]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteZone(z.id)}
                            className="p-1 rounded text-gray-600 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. NOTIFICATIONS TAB */}
      {settingsTab === 'NOTIFICATIONS' && (
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-gray-900">Order Alerts & Notifications</h3>
          <p className="text-xs text-gray-500">Automatic notifications sent to customers upon order placement and courier dispatch.</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
              <div>
                <p className="font-bold text-xs text-gray-900">Order Confirmation Notification</p>
                <p className="text-[11px] text-gray-500">Alerts customer that order has been received and customer care is calling.</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#E4F8B0] text-gray-900">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
              <div>
                <p className="font-bold text-xs text-gray-900">Courier Dispatch Notification</p>
                <p className="text-[11px] text-gray-500">Alerts customer when order changes to On the Way.</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#E4F8B0] text-gray-900">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECURITY TAB */}
      {settingsTab === 'SECURITY' && (
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-gray-900">Security & Access Control</h3>
          <p className="text-xs text-gray-500">Admin session security and operations protections.</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
              <div>
                <p className="font-bold text-xs text-gray-900">Administrative Two-Factor Protection</p>
                <p className="text-[11px] text-gray-500">Strict login verification for authorized personnel.</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#E4F8B0] text-gray-900">ENFORCED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
