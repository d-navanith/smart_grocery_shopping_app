import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  ArrowUpDown,
  Upload
} from 'lucide-react';
import { Product, CategoryItem } from './part1_imports_types';

interface ProductsViewProps {
  products: Product[];
  categories: CategoryItem[];
  productsTab: 'ALL' | 'AVAILABLE' | 'DRAFTS' | 'OUT_OF_STOCK';
  setProductsTab: (t: any) => void;
  productCategoryFilter: string;
  setProductCategoryFilter: (c: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onQuickStockAdjust: (id: string, delta: number) => void;
  onExportCsv: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  categories,
  productsTab,
  setProductsTab,
  productCategoryFilter,
  setProductCategoryFilter,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProduct,
  onToggleStatus,
  onQuickStockAdjust,
  onExportCsv
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredProducts = products.filter(p => {
    if (productsTab === 'AVAILABLE' && (p.status !== 'Active' || p.stock === 0)) return false;
    if (productsTab === 'DRAFTS' && p.status !== 'Inactive') return false;
    if (productsTab === 'OUT_OF_STOCK' && p.stock > 0) return false;

    if (productCategoryFilter !== 'ALL' && p.category !== productCategoryFilter) return false;

    if (localSearch) {
      const q = localSearch.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchSku && !matchBrand) return false;
    }
    return true;
  });

  const availableCount = products.filter(p => p.status === 'Active' && p.stock > 0).length;
  const draftCount = products.filter(p => p.status === 'Inactive').length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
            CATALOG COCKPIT
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Products
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Full editable catalog: add, edit prices, quick stock adjustments, and status toggles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Total products</span>
            <Package className="w-4 h-4 text-[#0C6237]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{products.length}</h3>
          <p className="text-[11px] text-slate-400 font-medium">{categories.length} grocery categories</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Available Online</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{availableCount}</h3>
          <p className="text-[11px] text-emerald-600 font-bold">Visible on storefront</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Drafts & Inactive</span>
            <Edit2 className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{draftCount}</h3>
          <p className="text-[11px] text-slate-400 font-medium">Hidden from customers</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Out of Stock</span>
            <ArrowUpDown className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{outOfStockCount}</h3>
          <p className="text-[11px] text-red-600 font-bold">Requires urgent restock</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-extrabold text-slate-500 overflow-x-auto">
        {[
          { id: 'ALL', label: `All Products (${products.length})` },
          { id: 'AVAILABLE', label: `Available (${availableCount})` },
          { id: 'DRAFTS', label: `Drafts (${draftCount})` },
          { id: 'OUT_OF_STOCK', label: `Out of Stock (${outOfStockCount})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setProductsTab(tab.id as any)}
            className={`pb-3 transition relative whitespace-nowrap ${
              productsTab === tab.id ? 'text-[#0C6237] border-b-2 border-[#0C6237]' : 'hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product name, SKU, brand..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={productCategoryFilter}
              onChange={(e) => setProductCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Price (LKR)</th>
                <th className="py-2.5 px-3">Stock Units</th>
                <th className="py-2.5 px-3">Quick Adjust</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    No products match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-10 h-10 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                          onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80'; }}
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 group-hover:text-[#0C6237] transition">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {p.sku} • {p.brand} {p.unit ? `(${p.unit})` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-bold">
                      {p.category}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Rs. {p.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-mono font-bold ${p.stock < 25 ? 'text-red-600' : 'text-slate-800'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {/* 1-Click quick stock adjust buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onQuickStockAdjust(p.id, 10)}
                          title="Increase stock by +10"
                          className="px-2 py-0.5 rounded bg-emerald-50 text-[#0C6237] hover:bg-emerald-100 font-bold text-[10px] transition"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => onQuickStockAdjust(p.id, -10)}
                          title="Decrease stock by -10"
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-[10px] transition"
                        >
                          -10
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {/* Clickable Status toggle */}
                      <button
                        onClick={() => onToggleStatus(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black transition active:scale-95 ${
                          p.status === 'Active' && p.stock > 0
                            ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                            : p.stock === 0
                            ? 'bg-red-50 text-red-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p.stock === 0 ? 'Out of stock' : p.status === 'Active' ? '✓ Available' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenEditModal(p)}
                          title="Edit product details & price"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product "${p.title}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          title="Delete product"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
