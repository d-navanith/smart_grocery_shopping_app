import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Power,
  Globe,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

interface SuperAdminViewProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onShowToast }) => {
  const [clientSiteActive, setClientSiteActive] = useState<boolean>(() => {
    const s = localStorage.getItem('ceylonfoods_sys_client_active');
    return s !== null ? s === 'true' : true;
  });

  const [adminPanelActive, setAdminPanelActive] = useState<boolean>(() => {
    const s = localStorage.getItem('ceylonfoods_sys_admin_active');
    return s !== null ? s === 'true' : true;
  });

  const [masterKey, setMasterKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState(
    'Ceylon Foods online supermarket is temporarily offline for scheduled administrative maintenance. Please contact customer care at +40 722 456 789.'
  );

  // Sync with backend API
  const syncWithBackend = async (clientActive: boolean, adminActive: boolean) => {
    setIsUpdating(true);
    try {
      await fetch('/api/system/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientSiteActive: clientActive,
          adminPanelActive: adminActive,
          maintenanceNotice: noticeMessage,
          masterKey: 'developer_killswitch_2026'
        })
      });
    } catch {}

    localStorage.setItem('ceylonfoods_sys_client_active', String(clientActive));
    localStorage.setItem('ceylonfoods_sys_admin_active', String(adminActive));
    setIsUpdating(false);
  };

  const handleToggleCustomerSite = async () => {
    const nextState = !clientSiteActive;
    setClientSiteActive(nextState);
    await syncWithBackend(nextState, adminPanelActive);
    onShowToast(
      nextState
        ? 'Customer Website is now LIVE and accessible to customers.'
        : 'Customer Website has been SHUT DOWN. Visitors now see Maintenance/Suspended screen.',
      nextState ? 'success' : 'warning'
    );
  };

  const handleToggleAdminPanel = async () => {
    const nextState = !adminPanelActive;
    setAdminPanelActive(nextState);
    await syncWithBackend(clientSiteActive, nextState);
    onShowToast(
      nextState
        ? 'Admin Panel is now ACTIVE for normal staff users.'
        : 'Admin Panel has been LOCKED. Non-super-admins cannot access operations.',
      nextState ? 'success' : 'warning'
    );
  };

  const handleEmergencyShutDownBoth = async () => {
    if (!window.confirm('Are you sure you want to SHUT DOWN BOTH the customer website and admin panel? Visitors will not be able to order and client will not be able to access the admin panel.')) {
      return;
    }
    setClientSiteActive(false);
    setAdminPanelActive(false);
    await syncWithBackend(false, false);
    onShowToast('🚨 EMERGENCY LOCK ACTIVATED: Both Customer Website & Admin Panel are DOWN.', 'warning');
  };

  const handleRestoreBoth = async () => {
    setClientSiteActive(true);
    setAdminPanelActive(true);
    await syncWithBackend(true, true);
    onShowToast('✅ PAYMENT VERIFIED: Both Customer Website & Admin Panel are 100% LIVE.', 'success');
  };

  // If developer PIN lock is not entered yet
  if (!isUnlocked) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Developer Super Admin</h2>
            <p className="text-xs text-gray-500 mt-1">
              Enter your developer master passkey to access system kill-switch controls.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (masterKey === 'developer123' || masterKey === 'superadmin' || masterKey === 'superadmin123' || masterKey === 'admin123') {
                setIsUnlocked(true);
              } else {
                alert('Invalid Super Admin passkey.');
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              placeholder="Enter developer passkey (developer123)"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="w-full bg-[#EFEFEF] rounded-xl px-4 py-3 text-sm text-center font-mono focus:outline-none focus:border-[#6DB33F] border border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#6DB33F] hover:bg-[#5da033] text-white font-bold text-sm shadow-md transition"
            >
              Access Master Control
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight">
          SUPER ADMIN CONTROL
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Developer License & Master Kill-Switch. Control customer website and admin availability.
        </p>
      </div>

      {/* Emergency Global Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button
          onClick={handleEmergencyShutDownBoth}
          className="p-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-start justify-between min-h-[140px] shadow-lg transition active:scale-98 cursor-pointer"
        >
          <div className="flex items-center gap-2 font-black text-lg">
            <Power className="w-6 h-6" />
            <span>SHUT DOWN BOTH SITES</span>
          </div>
          <p className="text-xs text-red-100 text-left">
            Downs Customer Website (https://ceylonfoods.runasp.net/) and Locks Admin Operations immediately (Client Non-Payment Protection).
          </p>
        </button>

        <button
          onClick={handleRestoreBoth}
          className="p-6 rounded-2xl bg-[#6DB33F] hover:bg-[#5da033] text-white flex flex-col items-start justify-between min-h-[140px] shadow-lg transition active:scale-98 cursor-pointer"
        >
          <div className="flex items-center gap-2 font-black text-lg">
            <CheckCircle2 className="w-6 h-6" />
            <span>RESTORE BOTH SITES (LIVE)</span>
          </div>
          <p className="text-xs text-emerald-100 text-left">
            Re-enables customer purchasing, cart, checkout, and lifts admin console lock.
          </p>
        </button>
      </div>

      {/* Individual Site Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Website Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Front-End Storefront
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black inline-flex items-center gap-1.5 ${
                  clientSiteActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${clientSiteActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                <span>{clientSiteActive ? 'LIVE & ACCEPTING ORDERS' : 'DOWN (SUSPENDED)'}</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Customer Store (ceylonfoods.runasp.net)
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {clientSiteActive
                ? 'Customers can browse products, sign in, add to cart, and place orders with cash on delivery.'
                : 'Customer store displays a maintenance screen. Product catalog, cart, and checkout are inaccessible.'}
            </p>
          </div>

          <button
            onClick={handleToggleCustomerSite}
            disabled={isUpdating}
            className={`w-full py-3 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer ${
              clientSiteActive
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{clientSiteActive ? 'Turn OFF Customer Website' : 'Turn ON Customer Website'}</span>
          </button>
        </div>

        {/* Admin Console Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Back-End Operations
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black inline-flex items-center gap-1.5 ${
                  adminPanelActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${adminPanelActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                <span>{adminPanelActive ? 'ACTIVE (STAFF UNLOCKED)' : 'LOCKED (PAYMENT REQUIRED)'}</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Admin Operations Dashboard
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {adminPanelActive
                ? 'Staff and administrators can manage orders, riders, products, and inventory.'
                : 'Admin portal is locked with a license fee settlement notice. Only developer can unlock.'}
            </p>
          </div>

          <button
            onClick={handleToggleAdminPanel}
            disabled={isUpdating}
            className={`w-full py-3 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer ${
              adminPanelActive
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {adminPanelActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            <span>{adminPanelActive ? 'Lock Admin Panel' : 'Unlock Admin Panel'}</span>
          </button>
        </div>
      </div>

      {/* Maintenance Notice Editor */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">
          Suspension / Maintenance Message Shown to Visitors
        </h3>
        <textarea
          rows={3}
          value={noticeMessage}
          onChange={(e) => setNoticeMessage(e.target.value)}
          className="w-full bg-[#EFEFEF] rounded-xl p-4 text-xs text-gray-800 focus:outline-none focus:border-[#6DB33F] border border-transparent font-medium"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              syncWithBackend(clientSiteActive, adminPanelActive);
              onShowToast('Suspension notice updated successfully.');
            }}
            className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition"
          >
            Update Notice
          </button>
        </div>
      </div>
    </div>
  );
};
