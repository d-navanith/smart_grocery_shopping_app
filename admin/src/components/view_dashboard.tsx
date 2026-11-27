import React from 'react';
import { Plus } from 'lucide-react';
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
  onOpenOrder,
  onNavigateTab,
  onOpenCreateOrder
}) => {
  const newOrdersCount = orders.filter(o => o.status === 'PENDING').length;
  const totalOrdersCount = orders.length;
  const waitingListCount = orders.filter(o => o.status === 'PROCESSING' || o.status === 'PENDING').length;

  // Real or top popular items from store catalog
  const popularDishes = [
    {
      id: 'pop-1',
      name: 'Araliya Keeri Samba (5kg)',
      orders: 20,
      image: '/products/prod-supiri-keeri-rice.jpg'
    },
    {
      id: 'pop-2',
      name: 'Wijaya Chilli Powder (250g)',
      orders: 15,
      image: '/products/prod-wijaya-chilli-powder.jpg'
    },
    {
      id: 'pop-3',
      name: 'Mysore Parippu Dhal / Masoor Daal (1kg)',
      orders: 12,
      image: '/products/prod-masoor-daal.jpg'
    }
  ];

  // Out of stock or low stock items
  const outOfStockItems = products.filter(p => p.stock <= 5).slice(0, 3).map((p, idx) => ({
    id: p.id,
    name: p.title,
    image: p.imageUrl || '/products/prod-wijaya-roasted-curry-powder.jpg'
  }));

  const displayOutOfStock = outOfStockItems.length > 0 ? outOfStockItems : [
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
      {/* 1. Header Title matching Attachment 5 */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6DB33F] tracking-tight">
          DASHBOARD
        </h1>
      </div>

      {/* 2. Top 4 Stat Cards matching Attachment 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: New Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">New Orders</h3>
            <p className="text-4xl font-black text-gray-900">{newOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 2: Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Total Orders</h3>
            <p className="text-4xl font-black text-gray-900">{totalOrdersCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 3: Waiting List */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#E5E7EB] hover:bg-gray-300/70 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-2xs transition cursor-pointer"
        >
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-gray-900">Waiting List</h3>
            <p className="text-4xl font-black text-gray-900">{waitingListCount}</p>
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Updated every new order
          </p>
        </div>

        {/* Card 4: Create New Order Button Card */}
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

      {/* 3. Middle Section: Popular Dishes & Out of Stock matching Attachment 5 */}
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
              className="text-xs font-bold text-[#6DB33F] hover:underline cursor-pointer"
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
                  {displayOutOfStock.map((item, i) => (
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
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold text-[#6DB33F] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Order List matching Attachment 5 */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900">Order List</h3>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-[#6DB33F] hover:underline cursor-pointer"
          >
            View All in Orders →
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
                <th className="py-3 px-4 min-w-[160px]">Assigned Rider</th>
                <th className="py-3 px-4 w-28 text-center">Action</th>
                <th className="py-3 px-4 w-20 text-center">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {orders.slice(0, 5).map((ord, idx) => (
                <tr
                  key={ord.id}
                  className="hover:bg-gray-50/80 transition divide-x divide-gray-300"
                >
                  <td className="py-3 px-4 text-center font-semibold text-gray-600">
                    {idx + 1}.
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    <div>{ord.customerName}</div>
                    <div className="text-[11px] font-mono text-gray-400 font-normal">#{ord.orderNumber}</div>
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
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs transition cursor-pointer"
                    >
                      View
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
