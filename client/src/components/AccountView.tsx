import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  MapPin,
  CreditCard,
  Key,
  LogOut,
  Camera,
  ChevronRight,
  CheckCircle,
  Truck,
  ShieldCheck,
  Headphones,
  Save
} from 'lucide-react';
import { CustomerUser } from '../types';
import { TranslationDictionary } from '../translations';

interface AccountViewProps {
  currentUser: CustomerUser | null;
  onUpdateUser: (updated: Partial<CustomerUser>) => void;
  onNavigateDeliveries: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const AccountView: React.FC<AccountViewProps> = ({
  currentUser,
  onUpdateUser,
  onNavigateDeliveries,
  onLogout,
  onNavigateHome,
  isDarkMode,
  t
}) => {
  const [activeTab, setActiveTab] = useState<'PERSONAL' | 'ORDERS' | 'ADDRESSES' | 'PAYMENT' | 'PASSWORD'>('PERSONAL');
  
  const [firstName, setFirstName] = useState(currentUser?.name.split(' ')[0] || 'Mihai');
  const [lastName, setLastName] = useState(currentUser?.name.split(' ').slice(1).join(' ') || 'Enache');
  const [email, setEmail] = useState(currentUser?.email || 'mihai.enache@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+40 722 456 789');
  const [address, setAddress] = useState(currentUser?.address || 'Strada Mihai Eminescu nr. 42, București Sector 1');
  const [gender, setGender] = useState('Male');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      address
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      {/* 1. BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbHome}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-white font-extrabold">{t.accountTitle}</span>
      </nav>

      <div className="text-center space-y-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t.accountTitle}
        </h1>
        <p className="text-xs text-slate-400">Home / {t.accountTitle}</p>
      </div>

      {/* 2. MAIN 2-COLUMN ACCOUNT LAYOUT (EXACT FIGMA SPEC) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: TABS SIDEBAR */}
        <div className="md:col-span-4 space-y-2">
          {[
            { id: 'PERSONAL', label: t.accountTabPersonalInfo, icon: User },
            { id: 'ORDERS', label: t.accountTabMyOrders, icon: ShoppingBag, action: onNavigateDeliveries },
            { id: 'ADDRESSES', label: t.accountTabAddresses, icon: MapPin },
            { id: 'PAYMENT', label: t.accountTabPaymentMethod, icon: CreditCard },
            { id: 'PASSWORD', label: t.accountTabPassword, icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.action) {
                    tab.action();
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-black text-xs transition ${
                  isActive
                    ? 'bg-[#E5A91A] text-amber-950 shadow-md shadow-amber-900/10'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-black text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition mt-4"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>{t.accountTabLogout}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* RIGHT COLUMN: TAB CONTENT */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
          {activeTab === 'PERSONAL' && (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Profile Avatar with Edit Pencil */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0A6847] dark:text-[#78F9B8] flex items-center justify-center text-2xl font-black shadow-inner">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0A6847] text-white hover:bg-[#085237] shadow-sm transition"
                    title="Change Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-xs text-slate-400">{email}</p>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                    {t.accountFirstName} *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                    {t.accountLastName} *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                    {t.accountEmail} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                    {t.accountPhone} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  {t.accountGender}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                >
                  <option value="Male">{t.accountGenderMale}</option>
                  <option value="Female">{t.accountGenderFemale}</option>
                  <option value="Other">{t.accountGenderOther}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  {t.accountPrimaryAddress}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-[#0A6847]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-[#0A6847] hover:bg-[#085237] text-white font-black text-xs shadow-md transition active:scale-95 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.accountUpdateChangesBtn}</span>
                </button>

                {isSaved && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.accountChangesSaved}</span>
                  </span>
                )}
              </div>
            </form>
          )}

          {activeTab === 'ADDRESSES' && (
            <div className="space-y-4">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {t.accountAddressBookTitle}
              </h3>
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">Default Delivery Address</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E5A91A] text-amber-950 text-[10px] font-black">Active</span>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{address}</p>
                <p className="text-[11px] text-slate-500">Bucharest Sector 1, Romania • Interfon 14</p>
              </div>
            </div>
          )}

          {activeTab === 'PAYMENT' && (
            <div className="space-y-4">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {t.accountCodPreferenceTitle}
              </h3>
              <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💵</span>
                  <div>
                    <h4 className="font-black text-xs text-slate-900 dark:text-white">Cash on Delivery (Plata la Livrare)</h4>
                    <p className="text-[11px] text-slate-500">{t.accountCodPreferenceDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PASSWORD' && (
            <div className="space-y-4 max-w-md">
              <h3 className="font-black text-base text-slate-900 dark:text-white">Password Manager</h3>
              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 text-xs" />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 text-xs" />
              </div>
              <button type="button" onClick={() => alert('Parolă actualizată cu succes!')} className="px-6 py-2.5 rounded-xl bg-[#0A6847] text-white text-xs font-black shadow">
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. VALUE PROPOSITION STRIP (FIGMA SPEC) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0A6847] flex items-center justify-center text-xl shrink-0">
            🚚
          </div>
          <div>
            <h4 className="font-black text-xs text-slate-900 dark:text-white">Free Shipping Over 250 lei</h4>
            <p className="text-[11px] text-slate-400">Bucharest & Ilfov express delivery</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl shrink-0">
            💵
          </div>
          <div>
            <h4 className="font-black text-xs text-slate-900 dark:text-white">Flexible Cash Payment</h4>
            <p className="text-[11px] text-slate-400">Cash on delivery or mobile POS</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center text-xl shrink-0">
            🎧
          </div>
          <div>
            <h4 className="font-black text-xs text-slate-900 dark:text-white">24×7 Customer Support</h4>
            <p className="text-[11px] text-slate-400">Bucharest Hub +40 721 345 678</p>
          </div>
        </div>
      </div>
    </div>
  );
};
