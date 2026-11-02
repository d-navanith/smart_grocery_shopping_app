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
  Save
} from 'lucide-react';
import { CustomerUser } from '../types';
import { TranslationDictionary } from '../translations';

interface AccountViewProps {
  currentUser: CustomerUser | null;
  onUpdateUser: (updated: Partial<CustomerUser>) => void;
  onNavigateDeliveries: () => void;
  onNavigateShop?: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const AccountView: React.FC<AccountViewProps> = ({
  currentUser,
  onUpdateUser,
  onNavigateDeliveries,
  onNavigateShop,
  onLogout,
  onNavigateHome,
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
  const [passwordSaved, setPasswordSaved] = useState(false);

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
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] mb-1.5">
              <button onClick={onNavigateHome} className="hover:underline">
                {t.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#F96D26] font-bold">{t.accountTitle}</span>
            </nav>
            <div className="flex items-center gap-3">
              {onNavigateShop && (
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#15875D]/40 bg-white dark:bg-zinc-800 text-xs font-bold text-[#0A6847] dark:text-[#80F6C7] hover:bg-[#E8F5EE] transition cursor-pointer"
                >
                  ← Back to Shopping
                </button>
              )}
              <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
                <span className="text-[#0A6847] dark:text-white">
                  {t.accountTitle.split(' ')[0]}{' '}
                </span>
                <span className="text-[#F96D26]">
                  {t.accountTitle.split(' ').slice(1).join(' ') || 'Account'}
                </span>
              </h1>
            </div>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <img src="/figma_icon_freshness.png" alt="" className="w-8 h-8 object-contain shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#1B8057] block">Verified Ceylon Foods Member</span>
              <span className="text-[#003D25] dark:text-zinc-300 text-[11px]">{email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN ACCOUNT LAYOUT */}
      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 pt-8 space-y-12">
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
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg font-bold text-xs transition border ${
                    isActive
                      ? 'bg-[#0A6847] text-white border-[#0A6847] shadow-sm'
                      : 'bg-[#F0FAF3] dark:bg-zinc-900 border-[#15875D]/40 text-[#003D25] dark:text-zinc-300 hover:border-[#15875D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8C519]' : 'text-[#1B8057]'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-lg font-bold text-xs bg-white dark:bg-zinc-900 border border-[#F96D26] text-[#F96D26] hover:bg-[#FFF4EE] transition mt-4"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span>{t.accountTabLogout}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* RIGHT COLUMN: TAB CONTENT */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-xl bg-white dark:bg-zinc-900 border border-[#15875D] shadow-sm">
            {activeTab === 'PERSONAL' && (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Avatar with Edit Pencil */}
                <div className="flex items-center gap-4 pb-4 border-b border-[#15875D]/20">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#F0FAF3] border-2 border-[#15875D] text-[#0A6847] flex items-center justify-center text-2xl font-bold">
                      {firstName.charAt(0)}
                      {lastName.charAt(0)}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0A6847] text-white hover:bg-[#075238] shadow-sm transition"
                      title="Change Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      {firstName} {lastName}
                    </h3>
                    <p className="text-xs text-[#1B8057]">{email}</p>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                      {t.accountFirstName} *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                      {t.accountLastName} *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                      {t.accountEmail} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                      {t.accountPhone} *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                    {t.accountGender}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  >
                    <option value="Male">{t.accountGenderMale}</option>
                    <option value="Female">{t.accountGenderFemale}</option>
                    <option value="Other">{t.accountGenderOther}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                    {t.accountPrimaryAddress}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 text-xs font-semibold focus:outline-none focus:border-[#0A6847]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-xs shadow-sm transition active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#F8C519]" />
                    <span>{t.accountUpdateChangesBtn}</span>
                  </button>

                  {isSaved && (
                    <span className="text-xs font-bold text-[#0A6847] flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.accountChangesSaved}</span>
                    </span>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'ADDRESSES' && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-black dark:text-white">
                  {t.accountAddressBookTitle}
                </h3>
                <div className="p-4 rounded-xl border border-[#15875D] bg-[#F0FAF3] dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A6847] dark:text-[#80F6C7]">
                      Default Delivery Address
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#F8C519] text-[#664E00] text-[10px] font-bold">
                      Active
                    </span>
                  </div>
                  <p className="text-xs font-bold text-black dark:text-white">{address}</p>
                  <p className="text-[11px] text-[#1B8057]">Bucharest Sector 1, Romania • Interfon 14</p>
                </div>
              </div>
            )}

            {activeTab === 'PAYMENT' && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-black dark:text-white">
                  {t.accountCodPreferenceTitle}
                </h3>
                <div className="p-4 rounded-xl border border-[#15875D] bg-[#F0FAF3] dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src="/figma_icon_cod.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-black dark:text-white">
                        Cash on Delivery (Plata la Livrare)
                      </h4>
                      <p className="text-[11px] text-[#003D25] dark:text-zinc-300">{t.accountCodPreferenceDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'PASSWORD' && (
              <div className="space-y-4 max-w-md">
                <h3 className="font-bold text-base text-black dark:text-white">Password Manager</h3>
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#003D25] dark:text-zinc-300 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#15875D]/40 bg-[#F2F7F4] dark:bg-zinc-800 dark:text-white text-xs"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordSaved(true);
                      setTimeout(() => setPasswordSaved(false), 2500);
                    }}
                    className="px-6 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-medium shadow-sm"
                  >
                    Save Password
                  </button>
                  {passwordSaved && (
                    <span className="text-xs font-bold text-[#0A6847] flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Password Updated!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. VALUE PROPOSITION STRIP (EXACT FIGMA 3 FEATURE CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#15875D]/20">
          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-6 py-5 flex items-center gap-4">
            <img src="/figma_icon_delivery.png" alt="" className="w-12 h-12 object-contain shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-[#1B8057]">Island-to-Door Delivery</h4>
              <p className="text-xs text-[#1B8057]/90">Free shipping over 250 lei in Bucharest</p>
            </div>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-6 py-5 flex items-center gap-4">
            <img src="/figma_icon_freshness.png" alt="" className="w-12 h-12 object-contain shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-[#1B8057]">100% Freshness</h4>
              <p className="text-xs text-[#1B8057]/90">Handpicked Sri Lankan quality</p>
            </div>
          </div>

          <div className="bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] rounded-lg px-6 py-5 flex items-center gap-4">
            <img src="/figma_icon_cod.png" alt="" className="w-12 h-12 object-contain shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-[#1B8057]">Cash on Delivery</h4>
              <p className="text-xs text-[#1B8057]/90">Pay only when you receive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
