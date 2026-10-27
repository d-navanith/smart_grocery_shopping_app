import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Download,
  Calendar as CalendarIcon,
  ArrowUpRight,
  BarChart3,
  Package,
  Truck
} from 'lucide-react';
import { Order, Product, CategoryItem } from './part1_imports_types';

interface ReportsViewProps {
  orders: Order[];
  products: Product[];
  categories: CategoryItem[];
  reportsDateFilter: 'TODAY' | '7_DAYS' | '30_DAYS' | 'THIS_MONTH' | 'YEAR_TO_DATE';
  setReportsDateFilter: (f: any) => void;
  reportsSubTab: 'SALES' | 'PRODUCTS' | 'CUSTOMERS' | 'INVENTORY' | 'DELIVERY';
  setReportsSubTab: (t: any) => void;
  onExportCsv: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  orders,
  products,
  categories,
  reportsDateFilter,
  setReportsDateFilter,
  reportsSubTab,
  setReportsSubTab,
  onExportCsv
}) => {
  // Multipliers based on date filter
  const filterMultiplier =
    reportsDateFilter === 'TODAY' ? 0.08 :
    reportsDateFilter === '7_DAYS' ? 0.35 :
    reportsDateFilter === '30_DAYS' ? 1.0 :
    reportsDateFilter === 'THIS_MONTH' ? 1.0 : 4.5;

  const baseSales = 8462850;
  const netSales = Math.round(baseSales * filterMultiplier);
  const totalOrders = Math.round(1284 * filterMultiplier);
  const aov = 6591.00;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black tracking-widest text-[#0C6237] uppercase">Business Intelligence</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reports & Insights</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time revenue attribution, customer retention and basket economics.</p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Interactive Date Range Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            {[
              { id: 'TODAY', label: 'Today' },
              { id: '7_DAYS', label: 'Last 7 Days' },
              { id: '30_DAYS', label: 'Last 30 Days' },
              { id: 'THIS_MONTH', label: 'This Month' },
              { id: 'YEAR_TO_DATE', label: 'Year to Date' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setReportsDateFilter(p.id as any)}
                className={`px-3 py-1 rounded-lg transition ${
                  reportsDateFilter === p.id ? 'bg-white text-[#0C6237] font-black shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={onExportCsv}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Net Sales</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">LKR {netSales.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-emerald-600">+18.4% vs prev period</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Orders Placed</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{totalOrders.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-slate-500">Avg 48.2 orders / day</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Average Order Value</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">LKR {aov.toFixed(2)}</p>
          <p className="text-[11px] font-bold text-emerald-600">+4.1% basket size</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Returning Customers</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0C6237] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">64.2%</p>
          <p className="text-[11px] font-bold text-emerald-600">High island brand loyalty</p>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'SALES', label: 'Sales & Revenue Trend' },
          { id: 'PRODUCTS', label: 'Category Performance' },
          { id: 'CUSTOMERS', label: 'Customer Retention & Cohorts' },
          { id: 'INVENTORY', label: 'Stock Velocity' },
          { id: 'DELIVERY', label: 'Courier Efficiency' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setReportsSubTab(t.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              reportsSubTab === t.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Spline & Category Share Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Revenue Spline */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900">Daily Revenue Spline</h3>
              <p className="text-xs text-slate-400 font-medium">Turnover across all Colombo zones</p>
            </div>
            <span className="text-xs font-black text-[#0C6237] bg-[#E6F7EF] px-2.5 py-1 rounded-lg">
              Dynamic Filter Applied
            </span>
          </div>

          <div className="h-60 w-full pt-4">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0C6237" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0C6237" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#e2e8f0" strokeWidth="1" />

              <path
                d="M 0,180 L 0,130 C 80,120 120,160 200,90 C 280,30 340,120 420,70 C 500,20 540,60 600,30 L 600,180 Z"
                fill="url(#repGrad)"
              />
              <path
                d="M 0,130 C 80,120 120,160 200,90 C 280,30 340,120 420,70 C 500,20 540,60 600,30"
                fill="none"
                stroke="#0C6237"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="200" cy="90" r="5" fill="#0C6237" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="420" cy="70" r="5" fill="#0C6237" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="600" cy="30" r="6" fill="#FF6515" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
              <span>01 Oct</span>
              <span>06 Oct</span>
              <span>11 Oct</span>
              <span>16 Oct</span>
              <span>21 Oct</span>
              <span className="text-[#0C6237] font-black">27 Oct (Today)</span>
            </div>
          </div>
        </div>

        {/* Category Share Progress */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-black text-base text-slate-900">Sales by Category</h3>
            <p className="text-xs text-slate-400 font-medium">Top revenue-generating supermarket aisles</p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Dairy, Milk & Eggs</span>
                <span className="font-black text-slate-900">28.4% • LKR 2.40M</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#0C6237] rounded-full" style={{ width: '28.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Meat & Mirissa Seafood</span>
                <span className="font-black text-slate-900">22.1% • LKR 1.87M</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '22.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Rice, Grains & Staples</span>
                <span className="font-black text-slate-900">19.5% • LKR 1.65M</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '19.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Fresh Fruits & Dambulla Veg</span>
                <span className="font-black text-slate-900">15.8% • LKR 1.34M</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '15.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Dilmah Tea & Beverages</span>
                <span className="font-black text-slate-900">14.2% • LKR 1.20M</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '14.2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900">Aisle Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Category Name</th>
                <th className="py-2.5 px-3">Products Listed</th>
                <th className="py-2.5 px-3">Units Sold</th>
                <th className="py-2.5 px-3">Gross Revenue (LKR)</th>
                <th className="py-2.5 px-3">Avg Basket Contribution</th>
                <th className="py-2.5 px-3 text-right">MoM Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {categories.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-extrabold text-slate-900">{c.name}</td>
                  <td className="py-3 px-3 text-slate-600">{c.count} items</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{(140 - idx * 12) * 5} units</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">LKR {(1200000 - idx * 110000).toLocaleString()}.00</td>
                  <td className="py-3 px-3 text-slate-600">LKR {(1450 - idx * 80).toFixed(2)}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-emerald-600 font-bold">+{18.4 - idx * 1.5}% ↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
