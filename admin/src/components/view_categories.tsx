import React, { useState } from 'react';
import {
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
    <div className="w-full flex flex-col space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight uppercase">
            CATEGORIES
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Manage your store aisles, product classifications, and customer visibility.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-6 py-2.5 rounded-xl bg-[#107B55] hover:bg-[#0c6344] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* 2. Top Category Photographic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.slice(0, 4).map(c => (
          <div key={c.id} className="rounded-2xl overflow-hidden border border-gray-200 bg-[#F6F7F9] shadow-xs flex flex-col justify-between group">
            <div className="h-32 overflow-hidden bg-gray-100 relative">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'; }}
              />
              <button
                onClick={() => onOpenEditModal(c)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-gray-700 hover:text-[#6DB33F] shadow-xs transition"
                title="Edit category"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4 space-y-0.5 bg-white">
              <h4 className="font-bold text-sm text-gray-900">{c.name}</h4>
              <p className="text-[11px] text-gray-500 font-medium">
                {c.count} products • {c.visibility}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Categories Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">All Aisles & Categories</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
              {categories.length}
            </span>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search category name or slug..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#EFEFEF] hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-[#6DB33F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none transition shadow-2xs"
            />
          </div>
        </div>

        {/* Table with #E2E5E9 header row and thin borders */}
        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Display Order</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {filteredCategories.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition divide-x divide-gray-300 text-gray-800">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">
                    /{c.slug}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {c.count} items
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono font-bold">
                    #{c.order}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => onToggleVisibility(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        c.visibility === 'Visible'
                          ? 'bg-[#E4F8B0] text-gray-900 hover:bg-lime-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {c.visibility === 'Visible' ? '✓ Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 text-xs">
                    {c.updated}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenEditModal(c)}
                        title="Edit category"
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#6DB33F] transition"
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
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 transition"
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
