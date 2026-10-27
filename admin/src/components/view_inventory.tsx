import React, { useState } from 'react';
import {
  Archive,
  AlertTriangle,
  CheckCircle,
  Package,
  Search,
  Plus,
  ArrowUpRight,
  Clock,
  Sliders,
  RefreshCw
} from 'lucide-react';
import { Product, StockAdjustment } from './part1_imports_types';

interface InventoryViewProps {
  products: Product[];
  stockAdjustments: StockAdjustment[];
  inventoryTab: 'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  setInventoryTab: (t: any) => void;
  onQuickRestock: (productId: string, amount: number) => void;
  onOpenAdjustModal: (product: Product) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  stockAdjustments,
  inventoryTab,
  setInventoryTab,
  onQuickRestock,
  onOpenAdjustModal
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredProducts = products.filter(p => {
    if (inventoryTab === 'IN_STOCK' && p.stock < 30) return false;
    if (inventoryTab === 'LOW_STOCK' && (p.stock >= 30 || p.stock === 0)) return false;
    if (inventoryTab === 'OUT_OF_STOCK' && p.stock > 0) return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  const inStockCount = products.filter(p => p.stock >= 30).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 30).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
            WAREHOUSE OPERATIONS
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Control & Inventory
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Live warehouse levels across Colombo hubs. Instant 1-click restock actions.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Tracked SKUs</span>
            <Archive className="w-4 h-4 text-[#0C6237]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{products.length}</h3>
          <p className="text-[11px] text-slate-400 font-medium">Active catalog items</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Healthy Stock (&gt;30)</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{inStockCount}</h3>
          <p className="text-[11px] text-emerald-600 font-bold">Sufficient warehouse buffer</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Low Stock (&lt;30)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{lowStockCount}</h3>
          <p className="text-[11px] text-amber-600 font-bold">Needs replenishment</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Out of Stock</span>
            <Package className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{outOfStockCount}</h3>
          <p className="text-[11px] text-red-600 font-bold">Immediate action required</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'ALL', label: `All Items (${products.length})` },
          { id: 'IN_STOCK', label: `In Stock (${inStockCount})` },
          { id: 'LOW_STOCK', label: `Low Stock (${lowStockCount})` },
          { id: 'OUT_OF_STOCK', label: `Out of Stock (${outOfStockCount})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setInventoryTab(tab.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              inventoryTab === tab.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inventory Table Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h4 className="font-black text-base text-slate-900">Stock Levels & Fast Restock</h4>
            <span className="text-xs text-slate-400 font-medium">• 1-click +25, +50, +100 units</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product name or SKU..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Item Name & SKU</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Stock Health</th>
                <th className="py-2.5 px-3">1-Click Fast Restock</th>
                <th className="py-2.5 px-3 text-right">Custom Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3">
                    <p className="font-extrabold text-slate-900">{p.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{p.sku}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-bold">
                    {p.category}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-black text-sm text-slate-900">
                      {p.stock}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1">units</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      p.stock >= 30 ? 'bg-[#E6F7EF] text-[#0C6237]' :
                      p.stock > 0 ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {p.stock >= 30 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {/* Instant Restock Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickRestock(p.id, 25)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-[#0C4E3B] hover:text-white text-[#0C6237] text-xs font-black transition active:scale-95"
                        title="Add +25 units"
                      >
                        +25
                      </button>
                      <button
                        onClick={() => onQuickRestock(p.id, 50)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-[#0C4E3B] hover:text-white text-[#0C6237] text-xs font-black transition active:scale-95"
                        title="Add +50 units"
                      >
                        +50
                      </button>
                      <button
                        onClick={() => onQuickRestock(p.id, 100)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-[#0C4E3B] hover:text-white text-[#0C6237] text-xs font-black transition active:scale-95"
                        title="Add +100 units"
                      >
                        +100
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onOpenAdjustModal(p)}
                      className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Stock Receipts Audit Log */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-black text-base text-slate-900">Recent Warehouse Receipts & Audit Log</h4>
          <span className="text-xs text-slate-400 font-medium">Automatic traceability</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2 px-3">Product</th>
                <th className="py-2 px-3">Quantity Change</th>
                <th className="py-2 px-3">Reason / Description</th>
                <th className="py-2 px-3">Reference PO</th>
                <th className="py-2 px-3">Updated By</th>
                <th className="py-2 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {stockAdjustments.slice(0, 5).map(adj => (
                <tr key={adj.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{adj.product}</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono font-black ${adj.type === 'IN' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {adj.change}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{adj.reason}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{adj.ref}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">{adj.updatedBy}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{adj.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
