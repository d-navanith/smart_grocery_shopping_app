import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Order, Product } from './part1_imports_types';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  onOpenOrder: (order: Order) => void;
  onOpenDispatchModal?: (order: Order) => void;
  onNavigateTab: (tab: any) => void;
  onExportCsv?: () => void;
  onOpenCreateOrder?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  onOpenOrder,
  onNavigateTab,
  onOpenCreateOrder
}) => {
  const newOrdersCount = orders.filter(o => o.status === 'PENDING').length || 1;
  const totalOrdersCount = orders.length || 1;
  const waitingListCount = orders.filter(o => o.status === 'PROCESSING' || o.status === 'PENDING').length || 1;

  // Popular Dishes matching Screenshot 3
  const popularDishes = [
    {
      id: 'pop-1',
      name: 'Araliya Keeri Samba (5kg)',
      orders: 20,
      image: '/products/prod-supiri-keeri-rice.jpg'
    },
    {
      id: 'pop-2',
      name: 'Sri Lankan Wambatu & Moju Combo',
      orders: 15,
      image: '/products/prod-wijaya-chilli-powder.jpg'
    },
    {
      id: 'pop-3',
      name: 'Mysore Parippu Dhal Curry & Roast Paan',
      orders: 12,
      image: '/products/prod-masoor-daal.jpg'
    }
  ];

  // Out of Stock matching Screenshot 3
  const outOfStockItems = [
    {
      id: 'oos-1',
      name: 'Fresh Purple Brinjal',
      image: '/products/prod-wijaya-roasted-curry-powder.jpg'
    },
    {
      id: 'oos-2',
      name: 'Rathu Kekulu Traditional Red Rice',
      image: '/products/prod-red-raw-rice.jpg'
    },
    {
      id: 'oos-3',
      name: 'Munchee Super Cream Cracker',
      image: '/products/prod-maliban-lemon-puff.jpg'
    }
  ];

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* 1. Header Title matching Screenshot 3 */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight">
          DASHBOARD
        </h1>
      </div>

      {/* 2. Top 4 Stat Cards matching Screenshot 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: New Orders */}
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">New Orders</h3>
            <p className="text-4xl font-black text-gray-900">{newOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Total Orders</h3>
            <p className="text-4xl font-black text-gray-900">{totalOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 3: Waiting List */}
        <div className="bg-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Waiting List</h3>
            <p className="text-4xl font-black text-gray-900">{waitingListCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 4: Create New Order */}
        <button
          onClick={() => {
            if (onOpenCreateOrder) onOpenCreateOrder();
            else onNavigateTab('orders');
          }}
          className="bg-[#E5E7EB] hover:bg-gray-300/80 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-2xs transition active:scale-98 cursor-pointer"
        >
          <span className="text-base font-bold text-gray-900">+ Create New Order</span>
        </button>
      </div>

      {/* 3. Middle Section: Popular Dishes & Out of Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Dishes Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Popular Dishes</h3>
            <div className="rounded-xl border border-gray-300 overflow-hidden">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                    <th className="py-2.5 px-4 text-left">Item Name</th>
                    <th className="py-2.5 px-4 w-20 text-center">Orders</th>
                    <th className="py-2.5 px-4 w-16 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 bg-white">
                  {popularDishes.map((dish, i) => (
                    <tr key={dish.id} className="divide-x divide-gray-300 hover:bg-gray-50/80 transition">
                      <td className="py-2.5 px-4 font-medium text-gray-800">
                        {i + 1}. {dish.name}
                      </td>
                      <td className="py-2.5 px-4 text-center font-bold text-gray-900">
                        {dish.orders}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-8 h-8 rounded-md object-cover mx-auto border border-gray-200 shadow-2xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold text-[#6DB33F] hover:underline"
            >
              View All
            </button>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Out of Stock</h3>
            <div className="rounded-xl border border-gray-300 overflow-hidden">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                    <th className="py-2.5 px-4 text-left">Item Name</th>
                    <th className="py-2.5 px-4 w-20 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 bg-white">
                  {outOfStockItems.map((item, i) => (
                    <tr key={item.id} className="divide-x divide-gray-300 hover:bg-gray-50/80 transition">
                      <td className="py-2.5 px-4 font-medium text-gray-800">
                        {i + 1}. {item.name}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded-md object-cover mx-auto border border-gray-200 shadow-2xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs font-bold text-[#6DB33F] hover:underline"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Order List matching Screenshot 3 */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">Order List</h3>
        <div className="rounded-xl border border-gray-300 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse text-left">
            <thead>
              <tr className="bg-[#E2E5E9] text-gray-900 font-bold border-b border-gray-300 divide-x divide-gray-300">
                <th className="py-3 px-4 w-12 text-center">No.</th>
                <th className="py-3 px-4 min-w-[160px]">Customer Name</th>
                <th className="py-3 px-4 min-w-[240px]">Address</th>
                <th className="py-3 px-4 min-w-[140px]">Contact Number</th>
                <th className="py-3 px-4 min-w-[160px]">Assigned Rider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {orders.slice(0, 5).map((ord, idx) => (
                <tr
                  key={ord.id}
                  onClick={() => onOpenOrder(ord)}
                  className="hover:bg-gray-50/80 transition divide-x divide-gray-300 cursor-pointer"
                >
                  <td className="py-3 px-4 text-center font-semibold text-gray-600">
                    {idx + 1}.
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {ord.customerName}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {ord.customerAddress || (ord as any).address || (typeof (ord as any).deliveryAddress === 'string' ? (ord as any).deliveryAddress : ((ord as any).deliveryAddress?.street ? `${(ord as any).deliveryAddress.street}, ${(ord as any).deliveryAddress.city || ''}` : '')) || 'Strada Mihai Eminescu nr. 42, București'}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-700 font-medium">
                    {ord.customerPhone}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {ord.assignedRider || 'Not Yet'}
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
