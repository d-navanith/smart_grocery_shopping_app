import React, { useState } from 'react';
import {
  LayoutGrid,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { CategoryItem } from './part1_imports_types';

interface CategoriesViewProps {
  categories: CategoryItem[];
  onOpenAddModal: () => void;
  onOpenEditModal: (cat: CategoryItem) => void;
  onDeleteCategory: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteCategory,
  onToggleVisibility
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredCategories = categories.filter(c => {
    if (localSearch) {
      const q = localSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0C6237]">
            CATALOG ORGANISATION
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Categories & Aisles
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage your store aisles, product classifications, and customer visibility.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-bold shadow-md flex items-center gap-2 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* 4 Photographic Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.slice(0, 4).map(c => (
          <div key={c.id} className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between group">
            <div className="h-28 overflow-hidden bg-slate-100 relative">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'; }}
              />
              <button
                onClick={() => onOpenEditModal(c)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 hover:text-[#0C6237] shadow-xs transition"
                title="Edit category"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4 space-y-0.5">
              <h4 className="font-black text-sm text-slate-900">{c.name}</h4>
              <p className="text-[11px] text-slate-400 font-medium">
                {c.count} products • {c.visibility}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Table Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h4 className="font-black text-base text-slate-900">All Aisles & Categories</h4>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-bold text-slate-600">
              {categories.length}
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search category name or slug..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C4E3B]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Category Name</th>
                <th className="py-2.5 px-3">URL Slug</th>
                <th className="py-2.5 px-3">Products</th>
                <th className="py-2.5 px-3">Display Order</th>
                <th className="py-2.5 px-3">Visibility</th>
                <th className="py-2.5 px-3">Last Updated</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCategories.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-extrabold text-slate-900">
                    {c.name}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    /{c.slug}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {c.count} items
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono font-bold">
                    #{c.order}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onToggleVisibility(c.id)}
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black transition active:scale-95 ${
                        c.visibility === 'Visible'
                          ? 'bg-[#E6F7EF] text-[#0C6237] hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {c.visibility === 'Visible' ? '✓ Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {c.updated}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenEditModal(c)}
                        title="Edit category"
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0C6237] transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${c.name}"?`)) {
                            onDeleteCategory(c.id);
                          }
                        }}
                        title="Delete category"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
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
