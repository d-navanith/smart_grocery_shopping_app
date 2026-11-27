import React from 'react';
import { LogOut, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import officialLogo from '../assets/ceylon_foods_official_logo.png';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: any) => void;
  ordersCount: number;
  unassignedDeliveriesCount: number;
  lowStockCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  onLogout
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'customers', label: 'Customers' },
    { id: 'deliveries', label: 'Deliveries' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="w-60 bg-[#F6F7F9] border-r border-[#E5E7EB] flex flex-col justify-between shrink-0 min-h-screen sticky top-0 select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="pt-6 pb-4 px-5 flex flex-col items-center justify-center">
          <img
            src={officialLogo}
            alt="Ceylon Foods Logo"
            className="w-36 h-auto object-contain cursor-pointer"
            onClick={() => setActiveMenu('dashboard')}
          />
        </div>

        {/* ADMIN Banner */}
        <div className="py-2.5 text-center border-y border-[#E5E7EB] bg-white/50">
          <h2 className="text-xl font-black text-[#8C9BA5] tracking-widest uppercase">
            ADMIN
          </h2>
        </div>

        {/* Navigation Links matching Screenshots */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full text-left px-5 py-2.5 rounded-xl font-bold text-base transition ${
                  isActive
                    ? 'bg-[#E4F8B0] text-black shadow-xs'
                    : 'text-[#8C9BA5] hover:text-gray-900 hover:bg-gray-200/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <button
          onClick={onLogout}
          className="px-5 py-2 rounded-xl bg-[#F87171] hover:bg-[#ef4444] text-white font-bold text-sm inline-flex items-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};

interface HeaderProps {
  activeMenu: string;
  searchTerm?: string;
  setSearchTerm?: (s: string) => void;
  unreadCount?: number;
  isBackendConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="h-16 px-8 flex items-center justify-end w-full sticky top-0 z-20 bg-transparent">
      {/* Jecob Profile Pill matching Screenshots */}
      <div className="inline-flex items-center gap-3 bg-[#E2E4E8] rounded-full pl-5 pr-1.5 py-1.5 shadow-2xs">
        <span className="font-semibold text-sm text-gray-800">Jecob</span>
        <img
          src="/avatar_jecob.png"
          alt="Jecob"
          className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
        />
      </div>
    </header>
  );
};

export const ToastBanner: React.FC<{
  toast: { message: string; type: 'success' | 'warning' | 'info' } | null;
  onClose: () => void;
}> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold animate-bounce-short transition ${
        toast.type === 'success'
          ? 'bg-[#0C4E3B] text-white border-emerald-600'
          : toast.type === 'warning'
          ? 'bg-amber-600 text-white border-amber-500'
          : 'bg-slate-900 text-white border-slate-700'
      }`}
    >
      {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-300" />}
      {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-200" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-sky-300" />}
      <span>{toast.message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75 transition">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
