import React, { useState } from 'react';
import {
  Archive,
  AlertTriangle,
  CheckCircle,
  Package,
  Search,
  Plus
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
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
          INVENTORY
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Real-time warehouse stock levels, threshold alerts, and instant replenishment.
        </p>
      </div>

      {/* 2. Four Soft-Gray Stat Cards matching Screenshot 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Tracked SKUs</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {products.length}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Active items</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Healthy Stock</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {inStockCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">&gt; 30 units</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Low Stock</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {lowStockCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">&lt; 30 units</span>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-sm font-bold text-gray-800 mb-2">Out of Stock</span>
          <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {outOfStockCount}
          </span>
          <span className="text-xs text-gray-500 mt-2 font-medium">Restock required</span>
        </div>
      </div>

      {/* 3. Search & Tabs Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input Pill */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search product name or SKU..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        {/* Tab Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'ALL', label: `All (${products.length})` },
            { id: 'IN_STOCK', label: `In Stock (${inStockCount})` },
            { id: 'LOW_STOCK', label: `Low Stock (${lowStockCount})` },
            { id: 'OUT_OF_STOCK', label: `Out of Stock (${outOfStockCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setInventoryTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                inventoryTab === tab.id
                  ? 'bg-[#E4F8B0] text-black shadow-xs font-black'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Inventory Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Stock Levels & Quick Replenishment
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 min-w-[200px]">Item Name & SKU</th>
                <th className="py-3 px-4 min-w-[140px]">Category</th>
                <th className="py-3 px-4 min-w-[120px]">Current Stock</th>
                <th className="py-3 px-4 min-w-[120px] text-center">Status</th>
                <th className="py-3 px-4 min-w-[160px] text-center">1-Click Fast Restock</th>
                <th className="py-3 px-4 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{p.title}</div>
                    <div className="text-xs text-gray-400 font-mono font-normal">{p.sku}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-black text-sm text-gray-900">
                      {p.stock}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">units</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                      p.stock >= 30 ? 'bg-[#E4F8B0] text-gray-900' :
                      p.stock > 0 ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {p.stock >= 30 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onQuickRestock(p.id, 25)}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#6DB33F] hover:text-white text-gray-700 text-xs font-bold transition"
                        title="Add +25 units"
                      >
                        +25
                      </button>
                      <button
                        onClick={() => onQuickRestock(p.id, 50)}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#6DB33F] hover:text-white text-gray-700 text-xs font-bold transition"
                        title="Add +50 units"
                      >
                        +50
                      </button>
                      <button
                        onClick={() => onQuickRestock(p.id, 100)}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#6DB33F] hover:text-white text-gray-700 text-xs font-bold transition"
                        title="Add +100 units"
                      >
                        +100
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onOpenAdjustModal(p)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs transition"
                    >
                      Adjust
                    </button>
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
