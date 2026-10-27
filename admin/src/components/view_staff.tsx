import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Lock,
  Plus,
  Search,
  Check,
  X,
  Trash2,
  KeyRound,
  CheckSquare,
  Square
} from 'lucide-react';
import { StaffMember } from './part1_imports_types';

interface StaffViewProps {
  staffDirectory: StaffMember[];
  permissionsMatrix: { [role: string]: { [module: string]: boolean } };
  staffRoleFilter: string;
  setStaffRoleFilter: (r: string) => void;
  onOpenInviteModal: () => void;
  onUpdateRole: (staffId: string, role: StaffMember['role']) => void;
  onToggle2FA: (staffId: string) => void;
  onToggleStatus: (staffId: string) => void;
  onDeleteStaff: (staffId: string) => void;
  onTogglePermission: (role: string, moduleName: string) => void;
}

export const StaffView: React.FC<StaffViewProps> = ({
  staffDirectory,
  permissionsMatrix,
  staffRoleFilter,
  setStaffRoleFilter,
  onOpenInviteModal,
  onUpdateRole,
  onToggle2FA,
  onToggleStatus,
  onDeleteStaff,
  onTogglePermission
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [staffTab, setStaffTab] = useState<'MEMBERS' | 'ROLES' | 'INVITATIONS'>('MEMBERS');

  const filteredStaff = staffDirectory.filter(s => {
    if (staffRoleFilter !== 'ALL' && s.role !== staffRoleFilter) return false;
    if (staffTab === 'INVITATIONS' && s.status !== 'Invited') return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.role.toLowerCase().includes(q);
    }
    return true;
  });

  const activeCount = staffDirectory.filter(s => s.status === 'Active').length;
  const twoFactorCount = staffDirectory.filter(s => s.twoFactor === 'Enabled').length;

  const rolesList: StaffMember['role'][] = ['Administrator', 'Manager', 'Catalog Editor', 'Delivery Agent'];
  const modulesList = [
    { id: 'products', label: 'Products & Catalog' },
    { id: 'orders', label: 'Order Fulfillment' },
    { id: 'vouchers', label: 'Promotions & Vouchers' },
    { id: 'deliveries', label: 'Delivery Dispatch' },
    { id: 'settings', label: 'Store Configuration' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Team Management</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff & Permissions</h2>
          <p className="text-xs text-slate-500 font-medium">Control administrative roles, enforce two-factor security and grant module capabilities.</p>
        </div>

        <button
          onClick={onOpenInviteModal}
          className="px-4 py-2.5 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Invite staff</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Team members</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{staffDirectory.length}</p>
          <p className="text-[11px] font-bold text-slate-500">Across 4 departments</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Active members</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{activeCount}</p>
          <p className="text-[11px] font-bold text-emerald-600">Active today</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Permission roles</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">4</p>
          <p className="text-[11px] font-bold text-slate-500">Granular access tiers</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Two-factor enabled</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{twoFactorCount}/{staffDirectory.length}</p>
          <p className="text-[11px] font-bold text-emerald-600">Security enforced</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500">
        {[
          { id: 'MEMBERS', label: `Staff Directory (${staffDirectory.length})` },
          { id: 'ROLES', label: 'Role Permissions Matrix' },
          { id: 'INVITATIONS', label: 'Pending Invitations' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setStaffTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              staffTab === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table: Directory */}
      {staffTab !== 'ROLES' ? (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-slate-900">Administrative Members</h3>
              <span className="text-xs text-slate-400 font-medium">• Edit roles and security in real time</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search staff name or email..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4E3B]"
                />
              </div>
              <select
                value={staffRoleFilter}
                onChange={(e) => setStaffRoleFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
              >
                <option value="ALL">All Roles</option>
                {rolesList.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Staff Member</th>
                  <th className="py-2.5 px-3">Assigned Role (Editable)</th>
                  <th className="py-2.5 px-3">Last Active</th>
                  <th className="py-2.5 px-3">2FA Security</th>
                  <th className="py-2.5 px-3">Account Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#E6F7EF] text-[#0C6237] font-black text-xs flex items-center justify-center shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{s.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable Role Dropdown */}
                      <select
                        value={s.role}
                        onChange={(e) => onUpdateRole(s.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-[#0C6237]"
                      >
                        {rolesList.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {s.lastActive}
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable 2FA Toggle */}
                      <button
                        onClick={() => onToggle2FA(s.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition active:scale-95 ${
                          s.twoFactor === 'Enabled'
                            ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Click to toggle 2FA"
                      >
                        {s.twoFactor === 'Enabled' ? '🔒 Enabled' : '🔓 Disabled'}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable Status toggle */}
                      <button
                        onClick={() => onToggleStatus(s.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition active:scale-95 ${
                          s.status === 'Active'
                            ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                            : s.status === 'Invited'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {s.status === 'Active' ? '✓ Active' : s.status}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove staff member "${s.name}"?`)) {
                            onDeleteStaff(s.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Role Permissions Capability Matrix */
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-black text-base text-slate-900">Role Permissions Capability Matrix</h3>
            <p className="text-xs text-slate-400 font-medium">Click any checkbox to grant or revoke module capabilities in real time.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Module Capability</th>
                  {rolesList.map(r => (
                    <th key={r} className="py-2.5 px-3 text-center">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {modulesList.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-extrabold text-slate-900">
                      {m.label}
                    </td>
                    {rolesList.map(r => {
                      const isGranted = !!(permissionsMatrix[r] && permissionsMatrix[r][m.id]);
                      return (
                        <td key={r} className="py-3 px-3 text-center">
                          <button
                            onClick={() => onTogglePermission(r, m.id)}
                            className={`p-1 rounded-lg transition active:scale-90 ${
                              isGranted ? 'text-[#0C6237] hover:bg-emerald-50' : 'text-slate-300 hover:bg-slate-100'
                            }`}
                            title={`Click to ${isGranted ? 'revoke' : 'grant'} ${m.label} for ${r}`}
                          >
                            {isGranted ? (
                              <CheckSquare className="w-5 h-5 inline" />
                            ) : (
                              <Square className="w-5 h-5 inline text-slate-300" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
