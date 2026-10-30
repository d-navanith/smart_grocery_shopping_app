import React, { useState } from 'react';
import {
  X,
  Check,
  Package,
  Truck,
  Printer,
  Trash2,
  Edit2,
  DollarSign,
  Calendar as CalendarIcon,
  Ticket,
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import {
  Order,
  Product,
  CategoryItem,
  DeliveryScheduleItem,
  FleetRider,
  PromotionCoupon,
  StaffMember,
  DeliveryZone,
  CustomerAccount
} from './part1_imports_types';

export const OrderDetailDrawer: React.FC<{
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (id: string, s: Order['status']) => void;
  onUpdatePayment: (id: string, p: 'PAID' | 'PENDING' | 'FAILED') => void;
  onAssignRider: (id: string, rider: string) => void;
  onPrintInvoice: (order: Order) => void;
  onOpenDispatchModal?: (order: Order) => void;
  riders: FleetRider[];
}> = ({
  order,
  onClose,
  onUpdateStatus,
  onUpdatePayment,
  onAssignRider,
  onPrintInvoice,
  onOpenDispatchModal,
  riders
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-slate-900">{order.orderNumber}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                order.status === 'DELIVERED' ? 'bg-[#E6F7EF] text-[#0C6237]' :
                order.status === 'ON_THE_WAY' ? 'bg-sky-50 text-sky-700' :
                order.status === 'PROCESSING' ? 'bg-orange-50 text-orange-700' :
                'bg-amber-50 text-amber-700'
              }`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Placed on {order.placedAt} • {order.deliveryType}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Customer Contact</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{order.customerName}</p>
            <p className="font-mono text-slate-600">{order.customerPhone}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Delivery Destination</p>
            <p className="font-bold text-slate-900 mt-0.5">{order.customerAddress}</p>
            {order.notes && <p className="text-slate-500 italic mt-1">Note: "{order.notes}"</p>}
          </div>
        </div>

        {/* Order Items Table */}
        <div className="space-y-2">
          <h4 className="font-black text-xs text-slate-700 uppercase tracking-wider">Purchased Items ({order.items.length})</h4>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total (LKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {order.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{it.productTitle}</td>
                    <td className="py-2.5 px-3 text-center">{it.quantity}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">Rs. {it.price.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      Rs. {(it.price * it.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold text-xs">
                  <td colSpan={3} className="py-3 px-3 text-right">Grand Total:</td>
                  <td className="py-3 px-3 text-right text-[#0C6237] text-sm font-black font-mono">
                    {order.totalAmount.toFixed(2)} lei
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dispatch to Delivery Company Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-black text-amber-950 flex items-center gap-1.5">
              <span>📞 Dispecerat Curier Rapid (Glovo / Bolt / Sameday / Fan Courier)</span>
            </span>
            <p className="text-[11px] text-amber-800 mt-0.5">
              {order.courierCompany ? `Curier alocat: ${order.courierCompany} (${order.courierPhone || 'În curs de preluare'})` : 'Comandă pregătită pentru livrare. Apelează firma de curierat pentru ridicare.'}
            </p>
          </div>
          {onOpenDispatchModal && (
            <button
              type="button"
              onClick={() => onOpenDispatchModal(order)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs transition active:scale-95 shrink-0"
            >
              📞 Deschide Dispecerat Curier
            </button>
          )}
        </div>

        {/* Courier Rider Assignment & Payment Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-200 text-xs">
          <div>
            <label className="font-black text-slate-700 block mb-1">Assign Fleet Courier</label>
            <select
              value={order.assignedRider || ''}
              onChange={(e) => onAssignRider(order.id, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-[#0C6237]"
            >
              <option value="">Unassigned</option>
              {riders.map(r => (
                <option key={r.id} value={r.name}>{r.name} ({r.vehicle})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-black text-slate-700 block mb-1">Payment Status</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdatePayment(order.id, 'PAID')}
                className={`flex-1 py-2 rounded-xl font-black text-xs transition ${
                  order.paymentStatus === 'PAID'
                    ? 'bg-[#E6F7EF] text-[#0C6237] border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ✓ Paid Online
              </button>
              <button
                onClick={() => onUpdatePayment(order.id, 'PENDING')}
                className={`flex-1 py-2 rounded-xl font-black text-xs transition ${
                  order.paymentStatus === 'PENDING'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ⏳ COD / Pending
              </button>
            </div>
          </div>
        </div>

        {/* Quick Status Stepper */}
        <div>
          <label className="font-black text-xs text-slate-700 block mb-2">Advance Fulfillment Pipeline</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onUpdateStatus(order.id, 'PENDING')}
              className={`py-2 rounded-xl font-bold text-xs border transition ${
                order.status === 'PENDING' ? 'bg-amber-500 text-white border-amber-600 shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              1. Pending
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'PROCESSING')}
              className={`py-2 rounded-xl font-bold text-xs border transition ${
                order.status === 'PROCESSING' ? 'bg-orange-500 text-white border-orange-600 shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              2. Processing
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'ON_THE_WAY')}
              className={`py-2 rounded-xl font-bold text-xs border transition ${
                order.status === 'ON_THE_WAY' ? 'bg-sky-600 text-white border-sky-700 shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              3. Dispatched
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'DELIVERED')}
              className={`py-2 rounded-xl font-bold text-xs border transition ${
                order.status === 'DELIVERED' ? 'bg-[#0C6237] text-white border-emerald-700 shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              4. Delivered
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={() => onPrintInvoice(order)}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Invoice</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-black shadow-sm transition active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditProductModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
  categories: CategoryItem[];
}> = ({ product, onClose, onSave, categories }) => {
  if (!product) return null;

  const [form, setForm] = useState<Product>({ ...product });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">Edit Product: {product.title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Product Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Price (LKR)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Stock (Units)</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
              >
                <option value="Active">Active (Available)</option>
                <option value="Inactive">Inactive (Draft)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (p: Omit<Product, 'id'>) => void;
  categories: CategoryItem[];
}> = ({ isOpen, onClose, onAdd, categories }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [sku, setSku] = useState(`CF-PROD-${Math.floor(100 + Math.random() * 900)}`);
  const [price, setPrice] = useState('450.00');
  const [stock, setStock] = useState('50');
  const [category, setCategory] = useState(categories[0]?.name || 'Fruits & Vegetables');
  const [brand, setBrand] = useState('Ceylon Agro');
  const [unit, setUnit] = useState('1kg Pack');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <div>
            <h3 className="font-black text-base text-slate-900">+ Add Grocery Product</h3>
            <p className="text-xs text-slate-400">Expand the Ceylon Foods supermarket catalog</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Product Title</label>
            <input
              type="text"
              placeholder="e.g. Ambewela Fresh Pasteurized Curd (500ml)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Price (LKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Stock Units</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Unit Weight</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
            >
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!title) return alert('Please enter product title');
              onAdd({
                title,
                sku,
                category,
                brand,
                price: parseFloat(price) || 0,
                stock: parseInt(stock) || 0,
                unit,
                store: 'Colombo Central Hub',
                status: 'Active',
                imageUrl
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditCategoryModal: React.FC<{
  category: CategoryItem | null;
  onClose: () => void;
  onSave: (c: CategoryItem) => void;
}> = ({ category, onClose, onSave }) => {
  if (!category) return null;

  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [order, setOrder] = useState(category.order);
  const [visibility, setVisibility] = useState(category.visibility);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">Edit Category: {category.name}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Display Order</label>
              <input
                type="text"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Visibility Status</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
            >
              <option value="Visible">Visible in Storefront</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...category, name, slug, order, visibility });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddCategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (c: Omit<CategoryItem, 'id' | 'updated'>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [order, setOrder] = useState('09');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">+ Add Supermarket Aisle / Category</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Aisle Name</label>
            <input
              type="text"
              placeholder="e.g. Frozen Foods & Desserts"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Display Order</label>
              <input
                type="text"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!name) return alert('Please enter aisle name');
              onAdd({
                name,
                slug,
                count: 0,
                order,
                visibility: 'Visible',
                image
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdjustStockModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (id: string, delta: number, reason: string) => void;
}> = ({ product, onClose, onSave }) => {
  if (!product) return null;

  const [delta, setDelta] = useState('50');
  const [reason, setReason] = useState('Supplier shipment received');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <div>
            <h3 className="font-black text-base text-slate-900">Adjust Warehouse Stock</h3>
            <p className="text-xs text-slate-400">{product.title} (Current: {product.stock} units)</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Adjustment Quantity (+ or -)</label>
            <input
              type="number"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Reason for Audit Log</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-[#0C6237]"
            >
              <option value="Supplier shipment received">Supplier shipment received</option>
              <option value="Direct farm intake (Ambewela / Dambulla)">Direct farm intake (Ambewela / Dambulla)</option>
              <option value="Inventory count correction">Inventory count correction</option>
              <option value="Damaged / grade sorting cull">Damaged / grade sorting cull</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(product.id, parseInt(delta) || 0, reason);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Confirm Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};

export const AssignDeliveryModal: React.FC<{
  delivery: DeliveryScheduleItem | null;
  riders: FleetRider[];
  onClose: () => void;
  onAssign: (orderId: string, rider: string, window: string) => void;
}> = ({ delivery, riders, onClose, onAssign }) => {
  if (!delivery) return null;

  const [selectedRider, setSelectedRider] = useState(riders[0]?.name || 'Kasun Madushanka');
  const [timeWindow, setTimeWindow] = useState(delivery.timeWindow || '12:00–15:00');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <div>
            <h3 className="font-black text-base text-slate-900">Assign Delivery Order</h3>
            <p className="text-xs text-slate-400">Allocate order to active fleet courier</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
          <div className="flex justify-between font-black text-slate-900">
            <span>{delivery.orderNumber}</span>
            <span className="text-[#0C6237]">{delivery.payment}</span>
          </div>
          <p className="text-slate-700 font-bold">{delivery.customerName} ({delivery.customerPhone})</p>
          <p className="text-slate-500">{delivery.address}</p>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-black text-slate-700 block mb-1">Select Active Fleet Rider</label>
            <select
              value={selectedRider}
              onChange={(e) => setSelectedRider(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
            >
              {riders.map(r => (
                <option key={r.id} value={r.name}>{r.name} • {r.vehicle} ({r.zone})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-black text-slate-700 block mb-1">Fulfillment Time Window</label>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
            >
              <option value="09:00–12:00">Morning Slot (09:00–12:00)</option>
              <option value="12:00–15:00">Afternoon Slot (12:00–15:00)</option>
              <option value="15:00–18:00">Evening Slot (15:00–18:00)</option>
              <option value="Express 45-Min">Express 45-Min Priority</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onAssign(delivery.id, selectedRider, timeWindow);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Confirm Allocation
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddRiderModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (r: Omit<FleetRider, 'id' | 'completedToday' | 'rating' | 'activeDeliveries'>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('077 ');
  const [vehicle, setVehicle] = useState('Honda Dio (WP BDF-9912)');
  const [zone, setZone] = useState('Colombo Central & South');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">+ Add Courier Rider to Fleet</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Rider Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ruwan Wickramasinghe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Contact Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Vehicle Make & Plate</label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Delivery Zone Coverage</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
            >
              <option value="Colombo Central & South">Colombo Central & South</option>
              <option value="Greater Colombo">Greater Colombo</option>
              <option value="Outer Suburbs">Outer Suburbs</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!name) return alert('Please enter rider name');
              onAdd({
                name,
                phone,
                vehicle,
                zone,
                status: 'Available'
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Add to Fleet
          </button>
        </div>
      </div>
    </div>
  );
};

export const CreatePromoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (p: Omit<PromotionCoupon, 'id' | 'usage' | 'currentUsage'>) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [offer, setOffer] = useState('15% off basket');
  const [discountType, setDiscountType] = useState<PromotionCoupon['discountType']>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('15');
  const [minBasket, setMinBasket] = useState('LKR 3,000');
  const [minBasketValue, setMinBasketValue] = useState(3000);
  const [maxUsage, setMaxUsage] = useState(250);
  const [dates, setDates] = useState('01–30 Nov 2026');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">+ Create Promotional Coupon</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Campaign Title</label>
            <input
              type="text"
              placeholder="e.g. Avurudu Grocery Special"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Coupon Code (UPPERCASE)</label>
              <input
                type="text"
                placeholder="e.g. AVURUDU25"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0C6237]"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Flat LKR Off</option>
                <option value="FREE_DELIVERY">Free Delivery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Discount Value</label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Redemptions</label>
              <input
                type="number"
                value={maxUsage}
                onChange={(e) => setMaxUsage(parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Min. Basket Requirement</label>
            <input
              type="text"
              value={minBasket}
              onChange={(e) => setMinBasket(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!code) return alert('Please enter coupon code');
              onCreate({
                name: name || code,
                code,
                offer: `${discountValue}${discountType === 'PERCENTAGE' ? '%' : ' LKR'} off`,
                discountType,
                discountValue: parseFloat(discountValue) || 0,
                dates,
                maxUsage,
                minBasket,
                minBasketValue,
                status: 'Active'
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Create Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export const InviteStaffModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInvite: (s: { name: string; email: string; role: StaffMember['role']; roleSubtitle: string }) => void;
}> = ({ isOpen, onClose, onInvite }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Catalog Editor');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">+ Invite Staff Member</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Kasun Rathnayake"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
            <input
              type="email"
              placeholder="kasun@ceylonfoods.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Permission Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-[#0C6237]"
            >
              <option value="Administrator">Administrator (Full Access)</option>
              <option value="Manager">Manager (Operations & Fulfillment)</option>
              <option value="Catalog Editor">Catalog Editor (Products & Aisles)</option>
              <option value="Delivery Agent">Delivery Agent (Fleet Dispatch)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!email) return alert('Please enter email address');
              onInvite({
                name: name || email.split('@')[0],
                email,
                role,
                roleSubtitle: `${role} Department`
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditDeliveryZoneModal: React.FC<{
  zone: DeliveryZone | null;
  onClose: () => void;
  onSave: (z: DeliveryZone) => void;
}> = ({ zone, onClose, onSave }) => {
  if (!zone) return null;

  const [fee, setFee] = useState(zone.fee);
  const [coverage, setCoverage] = useState(zone.coverage);
  const [eta, setEta] = useState(zone.eta);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">Edit Delivery Zone: {zone.zone}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Coverage Areas</label>
            <input
              type="text"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Delivery Fee (LKR)</label>
              <input
                type="text"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">ETA Speed</label>
              <input
                type="text"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...zone, fee, coverage, eta });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Save Zone
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddDeliveryZoneModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (z: Omit<DeliveryZone, 'id'>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [zone, setZone] = useState('');
  const [coverage, setCoverage] = useState('');
  const [fee, setFee] = useState('400.00');
  const [eta, setEta] = useState('Same day (3–4 Hrs)');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-black text-base text-slate-900">+ Add New Delivery Zone</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Zone Name</label>
            <input
              type="text"
              placeholder="e.g. Negombo & Ja-Ela Coast"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Coverage Areas</label>
            <input
              type="text"
              placeholder="e.g. Wattala, Kandana, Ja-Ela, Negombo Town"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Fee (LKR)</label>
              <input
                type="text"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:border-[#0C6237]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Fulfillment ETA</label>
              <input
                type="text"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0C6237]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!zone) return alert('Please enter zone name');
              onAdd({
                zone,
                coverage,
                fee,
                eta,
                status: 'Enabled'
              });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-bold hover:bg-[#083b2d]"
          >
            Create Zone
          </button>
        </div>
      </div>
    </div>
  );
};

export const CustomerProfileDrawer: React.FC<{
  customer: CustomerAccount | null;
  onClose: () => void;
  onUpdateTier: (id: string, tier: CustomerAccount['loyaltyTier']) => void;
}> = ({ customer, onClose, onUpdateTier }) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#E6F7EF] text-[#0C6237] font-black text-sm flex items-center justify-center">
              {customer.name[0]}
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900">{customer.name}</h3>
              <p className="text-xs text-slate-400">{customer.email} • {customer.phone}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Total Orders</p>
            <p className="font-extrabold text-slate-900 text-lg mt-0.5">{customer.totalOrders}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Lifetime Spend</p>
            <p className="font-mono font-extrabold text-[#0C6237] text-lg mt-0.5">LKR {customer.totalSpend.toLocaleString()}.00</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Delivery City</p>
            <p className="font-bold text-slate-800 mt-0.5">{customer.city}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Loyalty Tier</p>
            <select
              value={customer.loyaltyTier}
              onChange={(e) => onUpdateTier(customer.id, e.target.value as any)}
              className="mt-0.5 px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800"
            >
              <option value="Platinum">★ Platinum VIP</option>
              <option value="Gold">● Gold Tier</option>
              <option value="Silver">○ Silver Tier</option>
              <option value="Bronze">Bronze Tier</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700 mb-1">Registered Address</p>
          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{customer.address}</p>
        </div>

        <div className="flex items-center justify-end pt-3 border-t">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#0C4E3B] text-white text-xs font-black hover:bg-[#083b2d]">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   COURIER DISPATCH & PAYMENT MODAL: BITEPOINT 2-COLUMN TICKET & KEYPAD
========================================================================= */
export const CourierDispatchModal: React.FC<{
  order: Order | null;
  onClose: () => void;
  onConfirmDispatch: (orderId: string, dispatchData: {
    courierCompany: string;
    courierPhone: string;
    riderName: string;
    pickupMinutes: number;
    deliveryMinutes: number;
  }) => void;
}> = ({ order, onClose, onConfirmDispatch }) => {
  if (!order) return null;

  const [selectedCompany, setSelectedCompany] = useState<{ name: string; phone: string; eta: string; logo: string }>({
    name: 'Glovo Express Bucharest',
    phone: '+40 21 9988',
    eta: '10 min',
    logo: '🛵'
  });
  const [pickupMinutes, setPickupMinutes] = useState(10);
  const [deliveryMinutes, setDeliveryMinutes] = useState(30);
  const [riderName, setRiderName] = useState('Glovo Rider Bucharest');
  const [copied, setCopied] = useState(false);
  const [showScript, setShowScript] = useState(false);

  // Keypad & Cash Tendered calculation (Bitepoint POS style)
  const [tenderedInput, setTenderedInput] = useState<string>(order.totalAmount.toFixed(2));
  const tenderedAmount = parseFloat(tenderedInput) || 0;
  const changeDue = Math.max(0, tenderedAmount - order.totalAmount);

  const DELIVERY_COMPANIES = [
    { name: 'Glovo Express Bucharest', phone: '+40 21 9988', eta: '10 min', logo: '🛵' },
    { name: 'Bolt Delivery Riders', phone: '+40 31 229 5555', eta: '12 min', logo: '⚡' },
    { name: 'Tazz by eMAG Courier', phone: '+40 372 829 929', eta: '15 min', logo: '🔴' },
    { name: 'Sameday 2H Bucharest', phone: '+40 21 637 0660', eta: '15 min', logo: '📦' },
    { name: 'Fan Courier Express', phone: '+40 21 9336', eta: '20 min', logo: '🚚' },
    { name: 'Ceylon Foods Fleet', phone: '+40 720 334 119', eta: '8 min', logo: '🇱🇰' }
  ];

  // Keypad handlers
  const handleKeypadPress = (val: string) => {
    if (val === 'CLEAR') {
      setTenderedInput('0');
    } else if (val === 'BACKSPACE') {
      if (tenderedInput.length <= 1) {
        setTenderedInput('0');
      } else {
        setTenderedInput(tenderedInput.slice(0, -1));
      }
    } else if (val === '.') {
      if (!tenderedInput.includes('.')) {
        setTenderedInput(tenderedInput + '.');
      }
    } else {
      if (tenderedInput === '0' || tenderedInput === '') {
        setTenderedInput(val);
      } else {
        // limit 2 decimal places
        const parts = tenderedInput.split('.');
        if (parts.length > 1 && parts[1].length >= 2) return;
        setTenderedInput(tenderedInput + val);
      }
    }
  };

  const handleAddPreset = (addon: number) => {
    const current = parseFloat(tenderedInput) || 0;
    setTenderedInput((current + addon).toFixed(2));
  };

  const handleExact = () => {
    setTenderedInput(order.totalAmount.toFixed(2));
  };

  // Exact Call / Message Script required by User
  const dispatchScriptRo = `Bună ziua! Avem un colet de la Ceylon Foods Supermarket (Strada Academiei 14, București).
Număr Comandă: ${order.orderNumber} (${order.items.length} articole alimentare din Sri Lanka).
Vă rugăm să trimiteți un curier să ridice coletul în ${pickupMinutes} minute și să-l livreze la adresa:
📍 Destinație: ${order.customerAddress}
👤 Client: ${order.customerName}
📞 Telefon Client: ${order.customerPhone}
💵 Sumă de încasat Plata la Livrare (Cash on Delivery): ${order.totalAmount.toFixed(2)} lei.
⏱ Timp maxim de livrare la client: ${deliveryMinutes} minute.
Vă mulțumim!`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(dispatchScriptRo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirm = () => {
    onConfirmDispatch(order.id, {
      courierCompany: selectedCompany.name,
      courierPhone: selectedCompany.phone,
      riderName: riderName || `${selectedCompany.name} Rider`,
      pickupMinutes,
      deliveryMinutes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* ================= LEFT COLUMN: BITEPOINT RECEIPT TICKET ================= */}
        <div className="w-full md:w-5/12 bg-[#F8F9FA] p-5 sm:p-6 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top Receipt Header */}
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#0B3B2C] text-[#F8B838] font-black text-xs tracking-wider uppercase">
                  TA #{order.orderNumber.replace(/[^0-9]/g, '').slice(-2) || 'A4'}
                </span>
                <span className="text-xs font-black text-slate-800 tracking-tight">
                  {order.orderNumber}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {order.placedAt || '12:30 PM'}
              </span>
            </div>

            {/* Customer Details Pill */}
            <div className="mt-4 p-3 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">{order.customerName}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Card'}
                </span>
              </div>
              <p className="font-mono text-[11px] font-bold text-slate-500">📞 {order.customerPhone}</p>
              <p className="text-[11px] font-medium text-slate-600 line-clamp-2">📍 {order.customerAddress}</p>
            </div>

            {/* Itemized Receipt Table */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-200">
                <span>Items ({order.items.length})</span>
                <span>Qty • Subtotal</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto py-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="pr-2">
                      <p className="font-bold text-slate-800 leading-tight">{it.productTitle}</p>
                      <span className="text-[10px] font-semibold text-slate-400">{it.price.toFixed(2)} lei each</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] mr-2">
                        x{it.quantity}
                      </span>
                      <span className="font-black text-slate-900">{(it.price * it.quantity).toFixed(2)} lei</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Receipt Totals & Jagged Tear Edge */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-300">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span>{(order.totalAmount > 15 ? order.totalAmount - 15 : order.totalAmount).toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Delivery Express Fee</span>
                <span className="font-bold text-emerald-700">{order.totalAmount > 15 ? '15.00 lei' : '0.00 lei'}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <span className="font-black text-slate-900 text-sm">Total Amount</span>
                <span className="font-black text-2xl text-slate-900 tracking-tight">
                  {order.totalAmount.toFixed(2)} <span className="text-sm font-bold text-slate-500">lei</span>
                </span>
              </div>
            </div>

            {/* Jagged / Sawtooth Receipt Tear Effect */}
            <div className="mt-5 relative">
              <div className="h-2 w-full bg-[radial-gradient(circle,_transparent_3px,_#F8F9FA_3px)] bg-[length:12px_12px] -mb-1 opacity-80" />
              <div className="py-2 text-center text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                * * * CEYLON FOODS BUCHAREST * * *
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PAYMENT KEYPAD & DISPATCH ================= */}
        <div className="w-full md:w-7/12 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          
          {/* Header & Close */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">
                Bitepoint POS • Romanian Delivery Network
              </span>
              <h3 className="font-black text-lg text-slate-900 leading-tight">
                Payment & Courier Dispatch
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Courier Network Selection Chips */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1.5">
              Select Courier Partner (Bucharest Fleet):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DELIVERY_COMPANIES.map(comp => (
                <button
                  key={comp.name}
                  type="button"
                  onClick={() => {
                    setSelectedCompany(comp);
                    setRiderName(`${comp.name} Rider`);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    selectedCompany.name === comp.name
                      ? 'border-[#0B3B2C] bg-[#E9F3EE] ring-2 ring-[#0B3B2C] font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{comp.logo}</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {comp.eta}
                    </span>
                  </div>
                  <p className="font-black text-slate-900 text-xs mt-1.5 leading-snug truncate">{comp.name.split(' ')[0]}</p>
                  <span className="text-[10px] text-slate-500 font-mono">{comp.phone}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cash Tendered & Keypad Section */}
          <div className="bg-[#F5F6F8] p-4 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Cash Received / Sumă Încasată
                </span>
                <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  {tenderedInput || '0'} <span className="text-sm font-bold text-slate-500">lei</span>
                </div>
              </div>

              {changeDue > 0 && (
                <div className="text-right bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800">
                    Rest de Dat (Change)
                  </span>
                  <p className="text-sm font-black text-emerald-900">
                    {changeDue.toFixed(2)} lei
                  </p>
                </div>
              )}
            </div>

            {/* Quick Increment Preset Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={handleExact}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 font-black text-xs text-slate-800 transition shrink-0"
              >
                Exact ({order.totalAmount.toFixed(0)} lei)
              </button>
              {[10, 20, 50, 100].map(add => (
                <button
                  key={add}
                  type="button"
                  onClick={() => handleAddPreset(add)}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 font-bold text-xs text-slate-700 transition shrink-0"
                >
                  +{add} lei
                </button>
              ))}
            </div>

            {/* Numeric Keypad Grid (Bitepoint POS style) */}
            <div className="grid grid-cols-3 gap-1.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    if (k === '⌫') handleKeypadPress('BACKSPACE');
                    else handleKeypadPress(k);
                  }}
                  className="py-2.5 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 font-black text-base text-slate-900 shadow-2xs transition active:scale-95"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Timing & Dispatch Script Options */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-600 text-[11px]">⏱ Ridicare:</span>
              {[8, 10, 15].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPickupMinutes(m)}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] border transition ${
                    pickupMinutes === m
                      ? 'bg-[#0B3B2C] text-white border-[#0B3B2C]'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowScript(!showScript)}
              className="font-bold text-[#0B3B2C] hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>{showScript ? 'Ascunde Text Dispecerat' : 'Vezi Script Apel Curier ▾'}</span>
            </button>
          </div>

          {/* Expandable Script Box */}
          {showScript && (
            <div className="p-3 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-[10px] leading-relaxed border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-400">Script Apel / SMS Curier:</span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="text-amber-400 hover:underline font-bold"
                >
                  {copied ? '✓ Copiat!' : '📋 Copiază'}
                </button>
              </div>
              <p className="whitespace-pre-line">{dispatchScriptRo}</p>
            </div>
          )}

          {/* Bottom Actions: Call Button & Solid Warm Yellow Bitepoint Action Button */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <a
              href={`tel:${selectedCompany.phone}`}
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition"
              title={`Apelează ${selectedCompany.name}`}
            >
              <PhoneCall className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#F8B838] hover:bg-[#eab02e] text-slate-950 font-black text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98"
            >
              <span>Pay Now & Dispatch Courier ({order.totalAmount.toFixed(2)} lei)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
