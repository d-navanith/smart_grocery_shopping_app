import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LayoutGrid,
  Archive,
  Truck,
  Ticket,
  TrendingUp,
  ShieldCheck,
  Settings,
  Star,
  Users,
  Search,
  Calendar as CalendarIcon,
  Bell,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Globe
} from 'lucide-react';

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
  ordersCount,
  unassignedDeliveriesCount,
  lowStockCount,
  onLogout
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: ordersCount > 0 ? String(ordersCount) : undefined },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'inventory', label: 'Inventory', icon: Archive, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'deliveries', label: 'Deliveries', icon: Truck, badge: unassignedDeliveriesCount > 0 ? `${unassignedDeliveriesCount} unassigned` : undefined, badgeColor: 'bg-orange-100 text-orange-800' },
    { id: 'promotions', label: 'Promotions', icon: Ticket },
    { id: 'reports', label: 'Reports & insights', icon: TrendingUp },
    { id: 'staff', label: 'Staff & permissions', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'customers', label: 'Customer CRM', icon: Users }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-100">
          <img
            src="/ceylon_foods_logo.png"
            alt="Ceylon Foods Logo"
            className="w-10 h-10 object-contain rounded-xl shadow-xs"
          />
          <div>
            <h1 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Ceylon Foods</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#E6F7EF] text-[#0C6237]">PRO</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Operations Cockpit</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition duration-150 ${
                  isActive
                    ? 'bg-[#0C4E3B] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-100 text-slate-700')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v2.4.0</span>
        </button>
      </div>
    </aside>
  );
};

interface HeaderProps {
  activeMenu: string;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeMenu,
  searchTerm,
  setSearchTerm,
  unreadCount = 3
}) => {
  const getHeaderTitle = () => {
    switch (activeMenu) {
      case 'dashboard': return 'Operations Dashboard';
      case 'orders': return 'Order Management';
      case 'products': return 'Products Catalog';
      case 'categories': return 'Catalog Organisation';
      case 'inventory': return 'Stock Control & Warehouse';
      case 'deliveries': return 'Deliveries & Logistics';
      case 'promotions': return 'Promotions & Vouchers';
      case 'reports': return 'Business Intelligence & Reports';
      case 'staff': return 'Staff & Access Control';
      case 'settings': return 'Store Configuration';
      case 'reviews': return 'Customer Reviews & Ratings';
      case 'customers': return 'Customer CRM & Accounts';
      default: return 'Administration';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div>
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          {getHeaderTitle()}
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">
          Ceylon Foods / Operations Portal • Live System
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Universal Search Input */}
        <div className="relative w-64 lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items, orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
            ⌘ K
          </span>
        </div>

        {/* Language Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-700 shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#0C6237]" />
          <span>🇬🇧 EN • 🇱🇰 SI • 🇷🇴 RO</span>
        </div>

        {/* Date Filter Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-2xs">
          <CalendarIcon className="w-3.5 h-3.5 text-[#0C6237]" />
          <span>October 2026</span>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#E5EFE7] text-[#0C4E3B] font-black text-xs flex items-center justify-center">
            NP
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-extrabold text-slate-900 leading-none">Nimali Perera</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Super Administrator</p>
          </div>
        </div>
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
