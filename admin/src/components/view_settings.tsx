import React, { useState } from 'react';
import {
  Settings,
  Check,
  Building,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  Bell,
  KeyRound,
  ExternalLink,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { DeliveryZone } from './part1_imports_types';

interface SettingsViewProps {
  settingsTab: 'STORE' | 'NOTIFICATIONS' | 'SECURITY' | 'INTEGRATIONS';
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
  cardPaymentsEnabled: boolean; setCardPaymentsEnabled: (v: boolean | ((prev: boolean) => boolean)) => void;
  codEnabled: boolean; setCodEnabled: (v: boolean | ((prev: boolean) => boolean)) => void;
  bankTransferEnabled: boolean; setBankTransferEnabled: (v: boolean | ((prev: boolean) => boolean)) => void;
  lankaQrEnabled: boolean; setLankaQrEnabled: (v: boolean | ((prev: boolean) => boolean)) => void;
  collectVat: boolean; setCollectVat: (v: boolean | ((prev: boolean) => boolean)) => void;
  standardTaxRate: string; setStandardTaxRate: (s: string) => void;
  vatRegNumber: string; setVatRegNumber: (s: string) => void;
  pricesIncludeTax: boolean; setPricesIncludeTax: (v: boolean | ((prev: boolean) => boolean)) => void;
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
  cardPaymentsEnabled, setCardPaymentsEnabled,
  codEnabled, setCodEnabled,
  bankTransferEnabled, setBankTransferEnabled,
  lankaQrEnabled, setLankaQrEnabled,
  collectVat, setCollectVat,
  standardTaxRate, setStandardTaxRate,
  vatRegNumber, setVatRegNumber,
  pricesIncludeTax, setPricesIncludeTax,
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
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Store Configuration</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Settings</h2>
          <p className="text-xs text-slate-500 font-medium">Manage your store identity, checkout gateways and Colombo delivery zones.</p>
        </div>

        <button
          onClick={onSaveSettings}
          className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save all changes</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
        {[
          { id: 'STORE', label: 'Store settings & Logistics' },
          { id: 'NOTIFICATIONS', label: 'Customer Notifications' },
          { id: 'SECURITY', label: 'Security & Access' },
          { id: 'INTEGRATIONS', label: 'Payment Gateways & APIs' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSettingsTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              settingsTab === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {settingsTab === 'STORE' && (
        <div className="space-y-6">
          {/* Top 2 Cards: Store Info & Regional Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Store Information */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Store information</h3>
                <p className="text-xs text-slate-400 font-medium">The details shown on receipts and customer communications.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Store name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Support email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Phone number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Store address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Storefront domain</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Regional Preferences */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Regional preferences</h3>
                <p className="text-xs text-slate-400 font-medium">Local defaults for your customers and operations.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Currency</label>
                    <input
                      type="text"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">Timezone</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Opening time</label>
                    <input
                      type="text"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Closing time</label>
                    <input
                      type="text"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Master Order Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 mt-2">
                  <div>
                    <p className="font-bold text-xs text-slate-900">Accepting online orders</p>
                    <p className="text-[11px] text-slate-500 font-medium">Turn off to temporarily pause new checkouts.</p>
                  </div>
                  <button
                    onClick={() => setIsAcceptingOrders(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isAcceptingOrders ? 'bg-[#0C6237]' : 'bg-slate-300'
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

          {/* Middle 2 Cards: Payment Settings & Tax Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 3: Payment Settings */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Payment settings</h3>
                <p className="text-xs text-slate-400 font-medium">Manage payment methods accepted at checkout.</p>
              </div>

              <div className="space-y-3 pt-1">
                {/* PayHere Cards */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center font-black text-xs">
                      💳
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">Card Payments (Visa, Mastercard, Amex)</p>
                      <p className="text-[11px] text-slate-500">Processed securely via PayHere Sri Lanka</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCardPaymentsEnabled(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      cardPaymentsEnabled ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        cardPaymentsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* LankaQR */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs">
                      📱
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">LankaQR Instant Scan & Pay</p>
                      <p className="text-[11px] text-slate-500">Central Bank of Sri Lanka national QR standard</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLankaQrEnabled(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      lankaQrEnabled ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        lankaQrEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* COD */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xs">
                      💵
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">Cash on delivery (COD)</p>
                      <p className="text-[11px] text-slate-500">Collected in LKR by courier rider at doorstep</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCodEnabled(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      codEnabled ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        codEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Bank Transfer */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-black text-xs">
                      🏦
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">Bank Transfer (Commercial / Sampath)</p>
                      <p className="text-[11px] text-slate-500">Manual receipt slip upload at checkout</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBankTransferEnabled(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      bankTransferEnabled ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        bankTransferEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Tax Settings */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Tax settings (VAT)</h3>
                <p className="text-xs text-slate-400 font-medium">Sri Lankan inland revenue tax collection rules.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <p className="font-bold text-xs text-slate-900">Collect VAT on taxable goods</p>
                    <p className="text-[11px] text-slate-500">Calculates Sri Lankan Value Added Tax at checkout.</p>
                  </div>
                  <button
                    onClick={() => setCollectVat(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      collectVat ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        collectVat ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">Standard tax rate (%)</label>
                    <input
                      type="text"
                      value={standardTaxRate}
                      onChange={(e) => setStandardTaxRate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-700 block mb-1">VAT registration number</label>
                    <input
                      type="text"
                      value={vatRegNumber}
                      onChange={(e) => setVatRegNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <p className="font-bold text-xs text-slate-900">Prices include tax</p>
                    <p className="text-[11px] text-slate-500 font-medium">Customer shelf price already includes VAT.</p>
                  </div>
                  <button
                    onClick={() => setPricesIncludeTax(prev => !prev)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      pricesIncludeTax ? 'bg-[#0C6237]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        pricesIncludeTax ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Logistics & Thresholds */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="font-black text-base text-slate-900">Delivery thresholds & logistics</h3>
              <p className="text-xs text-slate-400 font-medium">Configure minimum order requirements and automated free delivery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Min. order value (LKR)</label>
                <input
                  type="text"
                  value={minOrderLkr}
                  onChange={(e) => setMinOrderLkr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Free delivery above (LKR)</label>
                <input
                  type="text"
                  value={freeDeliveryAboveLkr}
                  onChange={(e) => setFreeDeliveryAboveLkr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Same-day cutoff time</label>
                <input
                  type="text"
                  value={sameDayCutoff}
                  onChange={(e) => setSameDayCutoff(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">Delivery window length</label>
                <input
                  type="text"
                  value={deliveryWindowLength}
                  onChange={(e) => setDeliveryWindowLength(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold focus:border-[#0C4E3B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Fully Interactive Delivery Zones Management Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Colombo Delivery Zones</h3>
                <p className="text-xs text-slate-400 font-medium">Click "Edit" on any zone to change courier fees, or "+ Add Zone" to expand coverage.</p>
              </div>

              <button
                onClick={onOpenAddZoneModal}
                className="px-3.5 py-1.5 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Delivery Zone</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Zone Name</th>
                    <th className="py-2.5 px-3">Coverage Areas</th>
                    <th className="py-2.5 px-3">Courier Fee (LKR)</th>
                    <th className="py-2.5 px-3">Fulfillment ETA</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {deliveryZones.map(z => (
                    <tr key={z.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-extrabold text-slate-900">{z.zone}</td>
                      <td className="py-3 px-3 text-slate-600">{z.coverage}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">LKR {z.fee}</td>
                      <td className="py-3 px-3 text-slate-600 font-bold">{z.eta}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => onToggleZoneStatus(z.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition active:scale-95 ${
                            z.status === 'Enabled'
                              ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {z.status === 'Enabled' ? '✓ Enabled' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenEditZoneModal(z)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                            title="Edit zone fee and coverage"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete zone "${z.zone}"?`)) {
                                onDeleteZone(z.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                            title="Delete zone"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {settingsTab === 'NOTIFICATIONS' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-black text-base text-slate-900">Customer Communications & Alerts</h3>
          <p className="text-xs text-slate-400 font-medium">Automatic SMS and email alerts on order placement and delivery dispatch.</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-xs text-slate-900">Order Confirmation SMS & WhatsApp</p>
                <p className="text-[11px] text-slate-500">Sends instant Sri Lankan SMS via Dialog / Mobitel gateway.</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-xs text-slate-900">Courier Dispatch Notification</p>
                <p className="text-[11px] text-slate-500">Alerts customer when Kasun, Dinesh, or Pradeep starts the ride.</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {settingsTab === 'SECURITY' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-black text-base text-slate-900">Administrative Security & Session Settings</h3>
          <p className="text-xs text-slate-400 font-medium">Enforce two-factor authentication and session timeouts.</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-xs text-slate-900">Enforce Two-Factor Authentication for all managers</p>
                <p className="text-[11px] text-slate-500">Requires authenticator app code on login.</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">ENFORCED</span>
            </div>
          </div>
        </div>
      )}

      {settingsTab === 'INTEGRATIONS' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-black text-base text-slate-900">Connected Gateways & Services</h3>
          <p className="text-xs text-slate-400 font-medium">Active Sri Lankan merchant credentials.</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-xs text-slate-900">PayHere Payment Gateway (Merchant #121849)</p>
                <p className="text-[11px] text-slate-500">Production environment • Visa/Mastercard/Amex/LankaQR active</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-xs text-slate-900">Google Maps Platform Fleet Engine</p>
                <p className="text-[11px] text-slate-500">Live GPS tracking for Colombo zones A, B, and C</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">CONNECTED</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Save Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm sticky bottom-4 z-20">
        <div>
          <p className="font-bold text-xs text-slate-800">Unsaved preferences in memory?</p>
          <p className="text-[11px] text-slate-400">Clicking save updates the persistent store for all operators.</p>
        </div>
        <button
          onClick={onSaveSettings}
          className="px-5 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-black flex items-center gap-2 shadow-md transition active:scale-95"
        >
          <Check className="w-4 h-4" />
          <span>Save changes</span>
        </button>
      </div>
    </div>
  );
};
