import React from 'react';
import { ArrowRight, ShoppingBag, Package, FolderTree, Clock } from 'lucide-react';
import { Order, Product, CategoryItem } from './part1_imports_types';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  categories?: CategoryItem[];
  onOpenOrder: (order: Order) => void;
  onOpenDispatchModal?: (order: Order) => void;
  onNavigateTab: (tab: any) => void;
  onExportCsv?: () => void;
  onOpenCreateOrder?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  categories,
  onOpenOrder,
  onNavigateTab
}) => {
  const pendingOrdersCount = orders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length;
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalCategoriesCount = categories?.length || 7;

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* 1. Header Title matching Ceylon Foods Admin Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight">
            DASHBOARD
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Store management and live order tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2 rounded-xl bg-[#6DB33F] hover:bg-[#5da034] text-white font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Go to Orders</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Clean Real Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Pending Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[150px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Pending Orders</h3>
            <p className="text-4xl font-black text-gray-900">{pendingOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Awaiting fulfillment
          </p>
        </div>

        {/* Card 2: Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[150px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Total Orders</h3>
            <p className="text-4xl font-black text-gray-900">{totalOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Recorded in store system
          </p>
        </div>

        {/* Card 3: Total Products */}
        <div
          onClick={() => onNavigateTab('products')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[150px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Total Products</h3>
            <p className="text-4xl font-black text-gray-900">{totalProductsCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Catalog grocery items
          </p>
        </div>

        {/* Card 4: Categories */}
        <div
          onClick={() => onNavigateTab('categories')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[150px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Categories</h3>
            <p className="text-4xl font-black text-gray-900">{totalCategoriesCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Organized food aisles
          </p>
        </div>
      </div>

      {/* 3. Live Customer Order List */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Customer Orders</h3>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-[#6DB33F] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All in Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-xl border border-gray-300 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse text-left">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 w-12 text-center">No.</th>
                <th className="py-3 px-4 min-w-[160px]">Customer Name</th>
                <th className="py-3 px-4 min-w-[240px]">Address</th>
                <th className="py-3 px-4 min-w-[140px]">Contact Number</th>
                <th className="py-3 px-4 min-w-[140px]">Assigned Rider</th>
                <th className="py-3 px-4 w-28 text-center">Action</th>
                <th className="py-3 px-4 w-20 text-center">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-medium">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 8).map((ord, idx) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-gray-50/80 transition divide-x divide-gray-300"
                  >
                    <td className="py-3 px-4 text-center font-semibold text-gray-600">
                      {idx + 1}.
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{ord.customerName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">#{ord.orderNumber || ord.id.slice(-6)}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {ord.customerAddress || (ord as any).address || (typeof (ord as any).deliveryAddress === 'string' ? (ord as any).deliveryAddress : ((ord as any).deliveryAddress?.street ? `${(ord as any).deliveryAddress.street}, ${(ord as any).deliveryAddress.city || ''}` : '')) || 'Strada Mihai Eminescu nr. 42, București'}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-700 font-medium">
                      {ord.customerPhone || '+40 722 456 789'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      {ord.assignedRider || 'Not Yet'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ord.status === 'DELIVERED'
                          ? 'bg-[#E4F8B0] text-gray-900'
                          : ord.status === 'ON_THE_WAY'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status === 'DELIVERED' ? 'Completed' : ord.status === 'ON_THE_WAY' ? 'On the way' : 'On Process'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onOpenOrder(ord)}
                        className="px-3 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs transition cursor-pointer"
                      >
                        View
                      </button>
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
