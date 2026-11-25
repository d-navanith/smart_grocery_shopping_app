import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2
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
  onQuickStockAdjust
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
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header matching Screenshot 2 */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
          PRODUCTS
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Catalog items, Sri Lankan imports, pricing, and shelf inventory.
        </p>
      </div>

      {/* 2. Four Soft-Gray Stat Cards matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Total Products</h3>
            <p className="text-4xl font-black text-gray-900">{products.length}</p>
          </div>
          <p className="text-xs text-gray-600 text-center font-medium">
            {categories.length} grocery categories
          </p>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Available</h3>
            <p className="text-4xl font-black text-gray-900">{availableCount}</p>
          </div>
          <p className="text-xs text-gray-600 text-center font-medium">
            Visible on storefront
          </p>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Drafts & Inactive</h3>
            <p className="text-4xl font-black text-gray-900">{draftCount}</p>
          </div>
          <p className="text-xs text-gray-600 text-center font-medium">
            Hidden from customers
          </p>
        </div>

        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Out of Stock</h3>
            <p className="text-4xl font-black text-gray-900">{outOfStockCount}</p>
          </div>
          <p className="text-xs text-gray-600 text-center font-medium">
            Requires urgent restock
          </p>
        </div>
      </div>

      {/* 3. Action Row with Add Product Button matching Screenshot 2 */}
      <div className="flex items-center justify-end">
        <button
          onClick={onOpenAddModal}
          className="px-6 py-2.5 rounded-xl bg-[#15875D] hover:bg-[#0e6343] text-white text-sm font-bold shadow-xs inline-flex items-center gap-2 transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Add Product</span>
        </button>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search product name, SKU, brand..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'ALL', label: `All (${products.length})` },
            { id: 'AVAILABLE', label: `Available (${availableCount})` },
            { id: 'DRAFTS', label: `Drafts (${draftCount})` },
            { id: 'OUT_OF_STOCK', label: `Out of Stock (${outOfStockCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setProductsTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                productsTab === tab.id
                  ? 'bg-[#E4F8B0] text-black shadow-xs font-black'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Product Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Catalog Item Inventory
          </h2>

          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 min-w-[220px]">Product</th>
                <th className="py-3 px-4 min-w-[140px]">Category</th>
                <th className="py-3 px-4 min-w-[120px]">Price (lei)</th>
                <th className="py-3 px-4 min-w-[120px]">Stock</th>
                <th className="py-3 px-4 min-w-[140px] text-center">Quick Adjust</th>
                <th className="py-3 px-4 min-w-[100px] text-center">Status</th>
                <th className="py-3 px-4 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xl bg-gray-100 border border-gray-200 shrink-0"
                        onError={(e: any) => { e.target.src = '/figma_prod_rice_sack.png'; }}
                      />
                      <div>
                        <div>{p.title}</div>
                        <div className="text-xs text-gray-400 font-mono font-normal">
                          {p.sku} • {p.brand} {p.unit ? `(${p.unit})` : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    {p.price.toFixed(2)} lei
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono font-bold ${p.stock < 25 ? 'text-red-600' : 'text-gray-900'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onQuickStockAdjust(p.id, 10)}
                        title="Add +10"
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-[#6DB33F] hover:text-white text-gray-700 font-bold text-xs transition"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => onQuickStockAdjust(p.id, -10)}
                        title="Subtract -10"
                        className="px-2 py-0.5 rounded bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 font-bold text-xs transition"
                      >
                        -10
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleStatus(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        p.status === 'Active' && p.stock > 0
                          ? 'bg-[#E4F8B0] text-gray-900'
                          : p.stock === 0
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {p.stock === 0 ? 'Out of stock' : p.status === 'Active' ? '✓ Available' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenEditModal(p)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#6DB33F] transition"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete product "${p.title}"?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
