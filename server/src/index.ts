import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {
  INITIAL_PRODUCTS,
  INITIAL_ADMIN_STATS,
  INITIAL_RIDER,
  INITIAL_FLEET_RIDERS,
  INITIAL_PROMOTIONS,
  INITIAL_CUSTOMERS,
  INITIAL_CATEGORIES,
  INITIAL_STAFF,
  INITIAL_ZONES,
  INITIAL_REVIEWS,
  INITIAL_ADJUSTMENTS,
  Product,
  Order,
  FleetRider,
  PromotionCoupon,
  CustomerAccount,
  CategoryItem,
  StaffMember,
  DeliveryZone,
  CustomerReview,
  StockAdjustment
} from './mockStore';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store
let products: Product[] = [...INITIAL_PRODUCTS];
let orders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'CF-8921',
    customerId: 'cust-1',
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    items: [
      {
        productId: 'prod-white-rice',
        productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)',
        productImageUrl: '/prod_white_rice.jpg',
        price: 38.50,
        unit: '5kg Bag',
        quantity: 1
      },
      {
        productId: 'prod-brinjal',
        productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)',
        productImageUrl: '/prod_brinjal.jpg',
        price: 14.50,
        unit: 'kg',
        quantity: 2
      },
      {
        productId: 'prod-dhal',
        productTitle: 'Mysore Red Split Lentils / Dhal (1kg)',
        productImageUrl: '/prod_dhal.jpg',
        price: 12.50,
        unit: 'kg',
        quantity: 1
      }
    ],
    subtotal: 80.00,
    vatAmount: 0, // Included in price
    deliveryFee: 15.00,
    discountAmount: 0,
    totalAmount: 95.00, // In Romanian Lei (lei)
    paymentMethod: 'CASH_ON_DELIVERY',
    paymentStatus: 'PENDING', // Cash to be collected by rider
    deliveryType: 'EXPRESS',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      street: 'Strada Mihai Eminescu nr. 42',
      buildingDetails: 'Bloc 12, Scara A, Ap. 14, Interfon 14',
      city: 'București Sector 1',
      coordinates: { lat: 44.4475, lng: 26.0991 }
    },
    deliveryNote: 'Sunați la interfon 14. Am pregătit 95 lei numerar (Cash on Delivery).',
    status: 'PROCESSING',
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    dispatchCallStatus: 'NOT_CALLED',
    pickupMinutes: 10,
    deliveryMinutes: 30,
    rider: undefined,
    riderPhone: '',
    riderVerifiedByAdmin: false,
    estimatedDeliveryMinutes: 25,
    placedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: 'CF-8919',
    customerId: 'cust-1',
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    items: [
      {
        productId: 'prod-tea',
        productTitle: 'Dilmah Pure Ceylon Single Origin BOPF Tea (400g)',
        productImageUrl: '/prod_tea.jpg',
        price: 22.50,
        unit: 'pack',
        quantity: 2
      },
      {
        productId: 'prod-biscuits',
        productTitle: 'Munchee Super Cream Crackers & Maliban Biscuits',
        productImageUrl: '/prod_biscuits.jpg',
        price: 12.00,
        unit: 'pack',
        quantity: 2
      }
    ],
    subtotal: 69.00,
    vatAmount: 0,
    deliveryFee: 15.00,
    discountAmount: 0,
    totalAmount: 84.00,
    paymentMethod: 'CASH_ON_DELIVERY',
    paymentStatus: 'PENDING',
    deliveryType: 'EXPRESS',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      street: 'Strada Mihai Eminescu nr. 42',
      buildingDetails: 'Bloc 12, Scara A, Ap. 14',
      city: 'București Sector 1',
      coordinates: { lat: 44.4475, lng: 26.0991 }
    },
    deliveryNote: 'Plată ramburs la ușă.',
    status: 'ON_THE_WAY',
    courierCompany: 'Bolt Delivery Riders',
    courierPhone: '+40 31 229 5555',
    dispatchCallStatus: 'CALLED_DISPATCHED',
    pickupMinutes: 5,
    deliveryMinutes: 20,
    riderPhone: '+40 731 992 481',
    riderVerifiedByAdmin: true,
    rider: {
      id: 'rider-bolt-1',
      name: 'Alexandru Radu',
      company: 'Bolt Delivery Riders',
      phone: '+40 731 992 481',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      vehicleType: 'Scooter 125cc',
      rating: 4.95,
      currentLocation: { lat: 44.4410, lng: 26.0950 }
    },
    estimatedDeliveryMinutes: 20,
    placedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ord-104',
    orderNumber: 'CF-8918',
    customerId: 'cust-1',
    customerName: 'Mihai Enache',
    customerPhone: '+40 722 456 789',
    items: [
      {
        productId: 'prod-white-rice',
        productTitle: 'Araliya Keeri Samba & White Raw Rice (5kg)',
        productImageUrl: '/prod_white_rice.jpg',
        price: 38.50,
        unit: '5kg Bag',
        quantity: 2
      },
      {
        productId: 'prod-brinjal',
        productTitle: 'Sri Lankan Purple Brinjal / Eggplant (1kg)',
        productImageUrl: '/prod_brinjal.jpg',
        price: 14.50,
        unit: 'kg',
        quantity: 2
      }
    ],
    subtotal: 106.00,
    vatAmount: 0,
    deliveryFee: 15.00,
    discountAmount: 0,
    totalAmount: 121.00,
    paymentMethod: 'CASH_ON_DELIVERY',
    paymentStatus: 'PAID',
    deliveryType: 'EXPRESS',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      street: 'Strada Mihai Eminescu nr. 42',
      buildingDetails: 'Bloc 12, Scara A, Ap. 14',
      city: 'București Sector 1',
      coordinates: { lat: 44.4475, lng: 26.0991 }
    },
    deliveryNote: 'Livrat cu succes ieri.',
    status: 'DELIVERED',
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    dispatchCallStatus: 'CALLED_DISPATCHED',
    pickupMinutes: 10,
    deliveryMinutes: 30,
    riderPhone: '+40 732 441 902',
    riderVerifiedByAdmin: true,
    estimatedDeliveryMinutes: 0,
    placedAt: '2026-10-29T16:20:00.000Z',
    updatedAt: '2026-10-29T17:05:00.000Z'
  }
];

let adminStats = { ...INITIAL_ADMIN_STATS };
let fleetRiders: FleetRider[] = [...INITIAL_FLEET_RIDERS];
let promotions: PromotionCoupon[] = [...INITIAL_PROMOTIONS];
let customerAccounts: CustomerAccount[] = [...INITIAL_CUSTOMERS];
let categories: CategoryItem[] = [...INITIAL_CATEGORIES];
let staffDirectory: StaffMember[] = [...INITIAL_STAFF];
let deliveryZones: DeliveryZone[] = [...INITIAL_ZONES];
let customerReviews: CustomerReview[] = [...INITIAL_REVIEWS];
let stockAdjustments: StockAdjustment[] = [...INITIAL_ADJUSTMENTS];

export interface CrudLogEntry {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  resource: string;
  resourceId?: string;
  summary: string;
  status: number;
}

let crudAuditLogs: CrudLogEntry[] = [
  {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    method: 'POST',
    resource: 'Orders',
    resourceId: 'CF-8921',
    summary: 'New Cash on Delivery order registered for Bucharest Sector 1',
    status: 201
  }
];

function logCrud(method: CrudLogEntry['method'], resource: string, summary: string, resourceId?: string, status = 200) {
  crudAuditLogs.unshift({
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toLocaleTimeString(),
    method,
    resource,
    resourceId,
    summary,
    status
  });
  if (crudAuditLogs.length > 100) crudAuditLogs.pop();
}

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Ceylon Foods Romania Supermarket Backend API',
    location: 'Strada Academiei 14, București, România',
    currency: 'RON (lei)',
    timestamp: new Date().toISOString()
  });
});

let customers: Array<{ id: string; name: string; email: string; phone: string; address: string; password?: string }> = [
  {
    id: 'cust-1',
    name: 'Mihai Enache',
    email: 'mihai@example.ro',
    phone: '+40 722 456 789',
    address: 'Strada Mihai Eminescu nr. 42, Bloc 12, Ap. 14, București Sector 1',
    password: 'password123'
  },
  {
    id: 'cust-2',
    name: 'Kasun Jayawardena',
    email: 'kasun.ceylon@gmail.com',
    phone: '+40 740 112 345',
    address: 'Bulevardul Unirii nr. 18, București Sector 3',
    password: 'password123'
  }
];

// 2. Authentication Gateways
app.post('/api/auth/admin-login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const validAdminEmails = ['admin@ceylonfoods.ro', 'admin@ceylonfoods.lk', 'admin@supermarket.ro'];
  if ((validAdminEmails.includes(email) || email === 'admin@ceylonfoods.lk') && password === 'admin123') {
    return res.json({
      success: true,
      token: 'jwt-admin-secure-token-984321',
      user: {
        id: 'admin-1',
        name: 'Supermarket Manager Bucharest',
        email: email || 'admin@ceylonfoods.ro',
        role: 'ADMIN',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin credentials. Use admin@ceylonfoods.ro / admin123' });
});

app.post('/api/auth/customer-login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = customers.find(c => c.email.toLowerCase() === (email || '').toLowerCase().trim());
  if (user) {
    if (user.password && password && user.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }
    return res.json({
      success: true,
      token: `jwt-token-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: 'CUSTOMER'
      }
    });
  }
  // Auto login demo user
  const demo = customers[0];
  return res.json({
    success: true,
    token: `jwt-token-${demo.id}`,
    user: {
      id: demo.id,
      name: demo.name,
      email: demo.email,
      phone: demo.phone,
      address: demo.address,
      role: 'CUSTOMER'
    }
  });
});

app.post('/api/auth/customer-register', (req: Request, res: Response) => {
  const { name, email, phone, address, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }
  const cleanEmail = email.toLowerCase().trim();
  const newCust = {
    id: `cust-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    phone: phone || '+40 721 000 000',
    address: address || 'Strada Academiei 14, București, România',
    password: password || 'pass123'
  };
  customers.push(newCust);
  adminStats.totalCustomers += 1;
  return res.status(201).json({
    success: true,
    token: `jwt-token-${newCust.id}`,
    user: {
      id: newCust.id,
      name: newCust.name,
      email: newCust.email,
      phone: newCust.phone,
      address: newCust.address,
      role: 'CUSTOMER'
    }
  });
});

// 3. Products API
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase().includes(String(category).toLowerCase()));
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    sku: req.body.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    title: req.body.title,
    description: req.body.description || '',
    category: req.body.category || 'Vegetables',
    brand: req.body.brand || 'Fresh Produce',
    price: Number(req.body.price) || 15.00,
    unit: req.body.unit || 'kg',
    unitWeight: req.body.unitWeight || '1 kg',
    imageUrl: req.body.imageUrl || '/prod_white_rice.jpg',
    stock: Number(req.body.stock) || 50,
    store: 'Ceylon Foods Supermarket Bucharest',
    status: req.body.status || 'Active',
    aiFreshnessScore: Number(req.body.aiFreshnessScore) || 98,
    isOrganic: Boolean(req.body.isOrganic ?? true),
    isFarmSourced: Boolean(req.body.isFarmSourced ?? true),
    rating: 4.9,
    reviewsCount: 12,
    createdAt: new Date().toISOString().split('T')[0]
  };

  products.unshift(newProduct);
  adminStats.activeProducts = products.length;
  logCrud('POST', 'Products', `Created product "${newProduct.title}" (LKR/RON ${newProduct.price})`, newProduct.id, 201);
  res.status(201).json({ success: true, data: newProduct });
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  logCrud('PUT', 'Products', `Updated product "${products[index].title}"`, req.params.id, 200);
  res.json({ success: true, data: products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const deleted = products.find(p => p.id === req.params.id);
  products = products.filter(p => p.id !== req.params.id);
  adminStats.activeProducts = products.length;
  logCrud('DELETE', 'Products', `Deleted product "${deleted?.title || req.params.id}"`, req.params.id, 200);
  res.json({ success: true, message: 'Product deleted' });
});

// 4. Orders API (With Cash on Delivery & Courier Dispatch)
app.get('/api/orders', (req: Request, res: Response) => {
  const { status, customerId } = req.query;
  let result = [...orders];

  if (customerId) {
    result = result.filter(o => o.customerId === customerId);
  }

  if (status && status !== 'All') {
    result = result.filter(o => o.status === status);
  }
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/orders/latest', (_req: Request, res: Response) => {
  const latest = orders[0] || null;
  res.json({ success: true, data: latest });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const orderNum = `CF-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    customerId: req.body.customerId || 'cust-1',
    customerName: req.body.customerName || 'Mihai Enache',
    customerPhone: req.body.customerPhone || '+40 722 456 789',
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    vatAmount: 0,
    deliveryFee: req.body.deliveryFee || 15.00,
    discountAmount: req.body.discountAmount || 0,
    totalAmount: req.body.totalAmount || 0,
    paymentMethod: req.body.paymentMethod || 'CASH_ON_DELIVERY',
    paymentStatus: 'PENDING', // Will be paid in cash to rider
    deliveryType: req.body.deliveryType || 'EXPRESS',
    scheduledTimeSlot: req.body.scheduledTimeSlot,
    deliveryAddress: req.body.deliveryAddress || {
      id: 'addr-default',
      label: 'Home',
      street: req.body.address || 'Strada Mihai Eminescu nr. 42',
      city: req.body.deliveryZone || 'București Sector 1',
      coordinates: { lat: 44.4361, lng: 26.1027 }
    },
    deliveryNote: req.body.deliveryNote || 'Plata la Livrare (Cash on Delivery). Sunați când ajungeți.',
    status: 'PROCESSING',
    courierCompany: 'Glovo Express Bucharest',
    courierPhone: '+40 21 9988',
    dispatchCallStatus: 'NOT_CALLED',
    pickupMinutes: 10,
    deliveryMinutes: 30,
    rider: INITIAL_RIDER,
    estimatedDeliveryMinutes: 25,
    placedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  adminStats.totalOrders += 1;
  adminStats.todayOrders += 1;
  adminStats.todayRevenue += newOrder.totalAmount;
  adminStats.availableBalance += newOrder.totalAmount;

  res.status(201).json({ success: true, data: newOrder });
});

// CRUCIAL: Admin Call / Dispatch Delivery Company endpoint
app.post('/api/orders/:id/dispatch-courier', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id || o.orderNumber === `#${req.params.id}`);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const {
    courierCompany = 'Glovo Express Bucharest',
    courierPhone = '+40 21 9988',
    riderPhone = '',
    pickupMinutes = 10,
    deliveryMinutes = 30,
    riderName = 'Alexandru Radu (Glovo Rider)',
    courierNote = ''
  } = req.body;

  order.status = 'ON_THE_WAY';
  order.courierCompany = courierCompany;
  order.courierPhone = courierPhone;
  order.dispatchCallStatus = 'CALLED_DISPATCHED';
  order.pickupMinutes = Number(pickupMinutes);
  order.deliveryMinutes = Number(deliveryMinutes);
  order.estimatedDeliveryMinutes = Number(deliveryMinutes);
  order.updatedAt = new Date().toISOString();

  const isVerified = Boolean(riderPhone && riderPhone.trim().length > 5);
  (order as any).riderPhone = riderPhone;
  (order as any).riderVerifiedByAdmin = isVerified;
  (order as any).riderName = riderName;

  if (order.rider) {
    order.rider.name = riderName;
    order.rider.phone = riderPhone;
    order.rider.company = courierCompany;
  }

  res.json({
    success: true,
    message: isVerified
      ? `Rider mobile verified! Shared with customer for direct calling. ETA ${deliveryMinutes} mins.`
      : `Courier called! Waiting for rider to arrive at store and provide direct mobile.`,
    data: order
  });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = req.body.status;
  if (req.body.status === 'DELIVERED') {
    order.paymentStatus = 'PAID'; // Cash collected by rider!
  }
  order.updatedAt = new Date().toISOString();
  logCrud('PATCH', 'Orders', `Order ${order.orderNumber} status changed to ${req.body.status}`, order.id);
  res.json({ success: true, data: order });
});

// Orders CRUD: Read Single, Update Full, Payment, Assign Rider, Delete
app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  logCrud('GET', 'Orders', `Fetched order details for ${order.orderNumber}`, order.id);
  res.json({ success: true, data: order });
});

app.put('/api/orders/:id', (req: Request, res: Response) => {
  const idx = orders.findIndex(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Order not found' });
  orders[idx] = { ...orders[idx], ...req.body, updatedAt: new Date().toISOString() };
  logCrud('PUT', 'Orders', `Updated details for order ${orders[idx].orderNumber}`, orders[idx].id);
  res.json({ success: true, data: orders[idx] });
});

app.patch('/api/orders/:id/payment', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  order.paymentStatus = req.body.paymentStatus;
  order.updatedAt = new Date().toISOString();
  logCrud('PATCH', 'Orders', `Payment status for ${order.orderNumber} marked as ${order.paymentStatus}`, order.id);
  res.json({ success: true, data: order });
});

app.patch('/api/orders/:id/assign-rider', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  const { riderName, riderPhone, courierCompany } = req.body;
  order.assignedRider = riderName;
  if (courierCompany) order.courierCompany = courierCompany;
  if (riderPhone) {
    (order as any).riderPhone = riderPhone;
    (order as any).riderVerifiedByAdmin = true;
  }
  order.status = 'ON_THE_WAY';
  order.updatedAt = new Date().toISOString();
  logCrud('PATCH', 'Orders', `Assigned rider ${riderName} to order ${order.orderNumber}`, order.id);
  res.json({ success: true, data: order });
});

app.delete('/api/orders/:id', (req: Request, res: Response) => {
  const o = orders.find(x => x.id === req.params.id || x.orderNumber === req.params.id);
  if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
  orders = orders.filter(x => x.id !== o.id);
  adminStats.totalOrders = Math.max(0, adminStats.totalOrders - 1);
  logCrud('DELETE', 'Orders', `Deleted order ${o.orderNumber}`, o.id);
  res.json({ success: true, message: `Order ${o.orderNumber} deleted successfully` });
});

// 5. CATEGORIES CRUD
app.get('/api/categories', (_req: Request, res: Response) => {
  logCrud('GET', 'Categories', `Fetched ${categories.length} product categories`);
  res.json({ success: true, count: categories.length, data: categories });
});

app.get('/api/categories/:id', (req: Request, res: Response) => {
  const cat = categories.find(c => c.id === req.params.id || c.slug === req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
  res.json({ success: true, data: cat });
});

app.post('/api/categories', (req: Request, res: Response) => {
  const { name, slug, count, order, visibility, image } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });
  const newCat: CategoryItem = {
    id: `cat-${Date.now()}`,
    name,
    slug: slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    count: Number(count) || 0,
    order: order || `0${categories.length + 1}`,
    visibility: visibility || 'Visible',
    updated: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: image || '/prod_white_rice.jpg'
  };
  categories.push(newCat);
  logCrud('POST', 'Categories', `Created new category "${newCat.name}"`, newCat.id, 201);
  res.status(201).json({ success: true, data: newCat });
});

app.put('/api/categories/:id', (req: Request, res: Response) => {
  const idx = categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  categories[idx] = {
    ...categories[idx],
    ...req.body,
    updated: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })
  };
  logCrud('PUT', 'Categories', `Updated category "${categories[idx].name}"`, categories[idx].id);
  res.json({ success: true, data: categories[idx] });
});

app.delete('/api/categories/:id', (req: Request, res: Response) => {
  const cat = categories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
  categories = categories.filter(c => c.id !== req.params.id);
  logCrud('DELETE', 'Categories', `Deleted category "${cat.name}"`, cat.id);
  res.json({ success: true, message: `Category "${cat.name}" deleted successfully` });
});

// 6. INVENTORY & STOCK ADJUSTMENTS CRUD
app.get('/api/inventory', (_req: Request, res: Response) => {
  const inventoryList = products.map(p => ({
    id: p.id,
    sku: p.sku,
    title: p.title,
    category: p.category,
    price: p.price,
    stock: p.stock,
    safetyThreshold: 20,
    isLowStock: p.stock < 20,
    store: p.store,
    status: p.status
  }));
  logCrud('GET', 'Inventory', `Fetched inventory list with ${inventoryList.length} items`);
  res.json({ success: true, count: inventoryList.length, data: inventoryList, adjustments: stockAdjustments });
});

app.post('/api/inventory/adjust', (req: Request, res: Response) => {
  const { productId, type, deltaQty, reason, updatedBy = 'Store Admin' } = req.body;
  const p = products.find(x => x.id === productId || x.sku === productId);
  if (!p) return res.status(404).json({ success: false, message: 'Product not found' });

  const qty = Number(deltaQty) || 0;
  if (type === 'IN') {
    p.stock += Math.abs(qty);
  } else if (type === 'OUT' || type === 'WASTE') {
    p.stock = Math.max(0, p.stock - Math.abs(qty));
  } else if (type === 'AUDIT') {
    p.stock = Math.abs(qty);
  }

  const newAdj: StockAdjustment = {
    id: `adj-${Date.now()}`,
    time: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    product: p.title,
    type: type || 'IN',
    change: (type === 'IN' ? '+' : type === 'AUDIT' ? '=' : '-') + Math.abs(qty),
    reason: reason || 'Inventory update',
    ref: p.sku,
    updatedBy
  };
  stockAdjustments.unshift(newAdj);
  logCrud('POST', 'Inventory', `Adjusted stock for ${p.title} (${newAdj.change} units, reason: ${reason})`, p.id, 201);
  res.json({ success: true, product: p, adjustment: newAdj });
});

app.put('/api/inventory/:id', (req: Request, res: Response) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ success: false, message: 'Product not found' });
  if (req.body.stock !== undefined) p.stock = Number(req.body.stock);
  logCrud('PUT', 'Inventory', `Updated stock level for ${p.title} to ${p.stock}`, p.id);
  res.json({ success: true, data: p });
});

// 7. CUSTOMERS CRM CRUD
app.get('/api/customers', (_req: Request, res: Response) => {
  logCrud('GET', 'Customers', `Fetched ${customerAccounts.length} customer accounts`);
  res.json({ success: true, count: customerAccounts.length, data: customerAccounts });
});

app.get('/api/customers/:id', (req: Request, res: Response) => {
  const c = customerAccounts.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Customer not found' });
  res.json({ success: true, data: c });
});

app.post('/api/customers', (req: Request, res: Response) => {
  const { name, email, phone, city, address, status = 'Active' } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  const newCust: CustomerAccount = {
    id: `cust-${Date.now()}`,
    name,
    email,
    phone: phone || '+40 700 000 000',
    city: city || 'București Sector 1',
    ordersCount: 0,
    totalSpent: '0.00 lei',
    lastOrder: 'None',
    status: status as any,
    joinedDate: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })
  };
  customerAccounts.unshift(newCust);
  adminStats.totalCustomers += 1;
  logCrud('POST', 'Customers', `Created customer profile for "${name}"`, newCust.id, 201);
  res.status(201).json({ success: true, data: newCust });
});

app.put('/api/customers/:id', (req: Request, res: Response) => {
  const idx = customerAccounts.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Customer not found' });
  customerAccounts[idx] = { ...customerAccounts[idx], ...req.body };
  logCrud('PUT', 'Customers', `Updated profile for customer "${customerAccounts[idx].name}"`, customerAccounts[idx].id);
  res.json({ success: true, data: customerAccounts[idx] });
});

app.delete('/api/customers/:id', (req: Request, res: Response) => {
  const c = customerAccounts.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Customer not found' });
  customerAccounts = customerAccounts.filter(x => x.id !== req.params.id);
  adminStats.totalCustomers = Math.max(0, adminStats.totalCustomers - 1);
  logCrud('DELETE', 'Customers', `Deleted customer "${c.name}"`, c.id);
  res.json({ success: true, message: `Customer "${c.name}" removed` });
});

// 8. PROMOTIONS / COUPONS CRUD
app.get('/api/promotions', (_req: Request, res: Response) => {
  logCrud('GET', 'Promotions', `Fetched ${promotions.length} coupon promotions`);
  res.json({ success: true, count: promotions.length, data: promotions });
});

app.post('/api/promotions', (req: Request, res: Response) => {
  const { name, code, offer, discountType, discountValue, minBasket, maxUsage } = req.body;
  if (!code || !offer) return res.status(400).json({ success: false, message: 'Code and offer description required' });
  const newPromo: PromotionCoupon = {
    id: `promo-${Date.now()}`,
    name: name || code,
    code: code.trim().toUpperCase(),
    offer,
    discountType: discountType || 'PERCENTAGE',
    discountValue: Number(discountValue) || 10,
    dates: 'Permanent Activ',
    usage: '0 / ' + (maxUsage || 500),
    currentUsage: 0,
    maxUsage: Number(maxUsage) || 500,
    minBasket: minBasket || '100 lei',
    minBasketValue: parseFloat(minBasket) || 100,
    status: 'Active'
  };
  promotions.push(newPromo);
  logCrud('POST', 'Promotions', `Created promotional coupon "${newPromo.code}" (${newPromo.offer})`, newPromo.id, 201);
  res.status(201).json({ success: true, data: newPromo });
});

app.put('/api/promotions/:id', (req: Request, res: Response) => {
  const idx = promotions.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Coupon not found' });
  promotions[idx] = { ...promotions[idx], ...req.body };
  logCrud('PUT', 'Promotions', `Updated promotion "${promotions[idx].code}"`, promotions[idx].id);
  res.json({ success: true, data: promotions[idx] });
});

app.delete('/api/promotions/:id', (req: Request, res: Response) => {
  const p = promotions.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ success: false, message: 'Coupon not found' });
  promotions = promotions.filter(x => x.id !== req.params.id);
  logCrud('DELETE', 'Promotions', `Deleted coupon code "${p.code}"`, p.id);
  res.json({ success: true, message: `Coupon "${p.code}" deleted` });
});

// 9. FLEET RIDERS CRUD
app.get('/api/riders', (_req: Request, res: Response) => {
  logCrud('GET', 'FleetRiders', `Fetched ${fleetRiders.length} courier fleet riders`);
  res.json({ success: true, count: fleetRiders.length, data: fleetRiders });
});

app.post('/api/riders', (req: Request, res: Response) => {
  const { name, phone, company, vehicleType, plateNumber, zone } = req.body;
  if (!name || !phone) return res.status(400).json({ success: false, message: 'Rider name and phone required' });
  const newRider: FleetRider = {
    id: `rider-${Date.now()}`,
    name,
    phone,
    company: company || 'Ceylon Foods In-House Courier',
    vehicleType: vehicleType || 'Scooter 125cc',
    plateNumber: plateNumber || `B-${Math.floor(10 + Math.random() * 89)}-CEY`,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    completedDeliveries: 0,
    rating: 5.0,
    zone: zone || 'Sector 1 & 2'
  };
  fleetRiders.push(newRider);
  logCrud('POST', 'FleetRiders', `Added courier fleet rider "${name}" (${phone})`, newRider.id, 201);
  res.status(201).json({ success: true, data: newRider });
});

app.put('/api/riders/:id', (req: Request, res: Response) => {
  const idx = fleetRiders.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Rider not found' });
  fleetRiders[idx] = { ...fleetRiders[idx], ...req.body };
  logCrud('PUT', 'FleetRiders', `Updated rider "${fleetRiders[idx].name}"`, fleetRiders[idx].id);
  res.json({ success: true, data: fleetRiders[idx] });
});

app.delete('/api/riders/:id', (req: Request, res: Response) => {
  const r = fleetRiders.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ success: false, message: 'Rider not found' });
  fleetRiders = fleetRiders.filter(x => x.id !== req.params.id);
  logCrud('DELETE', 'FleetRiders', `Removed rider "${r.name}" from fleet`, r.id);
  res.json({ success: true, message: `Rider "${r.name}" deleted` });
});

// 10. STAFF DIRECTORY CRUD
app.get('/api/staff', (_req: Request, res: Response) => {
  logCrud('GET', 'Staff', `Fetched ${staffDirectory.length} staff members`);
  res.json({ success: true, count: staffDirectory.length, data: staffDirectory });
});

app.post('/api/staff', (req: Request, res: Response) => {
  const { name, email, role, roleSubtitle } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });
  const newStaff: StaffMember = {
    id: `stf-${Date.now()}`,
    name,
    email,
    role: role || 'Manager',
    roleSubtitle: roleSubtitle || 'Operations Specialist',
    lastActive: 'Just invited',
    twoFactor: 'Disabled',
    status: 'Active'
  };
  staffDirectory.push(newStaff);
  logCrud('POST', 'Staff', `Invited new staff member "${name}" as ${newStaff.role}`, newStaff.id, 201);
  res.status(201).json({ success: true, data: newStaff });
});

app.put('/api/staff/:id', (req: Request, res: Response) => {
  const idx = staffDirectory.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Staff member not found' });
  staffDirectory[idx] = { ...staffDirectory[idx], ...req.body };
  logCrud('PUT', 'Staff', `Updated staff member "${staffDirectory[idx].name}"`, staffDirectory[idx].id);
  res.json({ success: true, data: staffDirectory[idx] });
});

app.delete('/api/staff/:id', (req: Request, res: Response) => {
  const s = staffDirectory.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ success: false, message: 'Staff member not found' });
  staffDirectory = staffDirectory.filter(x => x.id !== req.params.id);
  logCrud('DELETE', 'Staff', `Removed staff member "${s.name}"`, s.id);
  res.json({ success: true, message: `Staff "${s.name}" deleted` });
});

// 11. DELIVERY ZONES CRUD
app.get('/api/delivery-zones', (_req: Request, res: Response) => {
  logCrud('GET', 'DeliveryZones', `Fetched ${deliveryZones.length} delivery zones`);
  res.json({ success: true, count: deliveryZones.length, data: deliveryZones });
});

app.post('/api/delivery-zones', (req: Request, res: Response) => {
  const { zone, coverage, fee, eta } = req.body;
  if (!zone) return res.status(400).json({ success: false, message: 'Zone name required' });
  const newZone: DeliveryZone = {
    id: `zone-${Date.now()}`,
    zone,
    coverage: coverage || zone,
    fee: fee || '15.00 lei',
    eta: eta || '30-45 min',
    status: 'Enabled'
  };
  deliveryZones.push(newZone);
  logCrud('POST', 'DeliveryZones', `Created delivery zone "${zone}" with fee ${newZone.fee}`, newZone.id, 201);
  res.status(201).json({ success: true, data: newZone });
});

app.put('/api/delivery-zones/:id', (req: Request, res: Response) => {
  const idx = deliveryZones.findIndex(z => z.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Zone not found' });
  deliveryZones[idx] = { ...deliveryZones[idx], ...req.body };
  logCrud('PUT', 'DeliveryZones', `Updated delivery zone "${deliveryZones[idx].zone}"`, deliveryZones[idx].id);
  res.json({ success: true, data: deliveryZones[idx] });
});

app.delete('/api/delivery-zones/:id', (req: Request, res: Response) => {
  const z = deliveryZones.find(x => x.id === req.params.id);
  if (!z) return res.status(404).json({ success: false, message: 'Zone not found' });
  deliveryZones = deliveryZones.filter(x => x.id !== req.params.id);
  logCrud('DELETE', 'DeliveryZones', `Deleted delivery zone "${z.zone}"`, z.id);
  res.json({ success: true, message: `Zone "${z.zone}" removed` });
});

// 12. CUSTOMER REVIEWS CRUD
app.get('/api/reviews', (_req: Request, res: Response) => {
  logCrud('GET', 'Reviews', `Fetched ${customerReviews.length} customer reviews`);
  res.json({ success: true, count: customerReviews.length, data: customerReviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { customer, product, rating, comment } = req.body;
  const newRev: CustomerReview = {
    id: `rev-${Date.now()}`,
    customer: customer || 'Client Ceylon Foods',
    rating: Number(rating) || 5,
    date: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }),
    product: product || 'Produse Alimentare Sri Lanka',
    comment: comment || 'Produse excelente!',
    sentiment: 'Positive',
    verified: true,
    isPublished: true
  };
  customerReviews.unshift(newRev);
  logCrud('POST', 'Reviews', `Added review from ${customer} for ${product}`, newRev.id, 201);
  res.status(201).json({ success: true, data: newRev });
});

app.put('/api/reviews/:id', (req: Request, res: Response) => {
  const idx = customerReviews.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Review not found' });
  customerReviews[idx] = { ...customerReviews[idx], ...req.body };
  logCrud('PUT', 'Reviews', `Updated review from ${customerReviews[idx].customer}`, customerReviews[idx].id);
  res.json({ success: true, data: customerReviews[idx] });
});

app.delete('/api/reviews/:id', (req: Request, res: Response) => {
  const r = customerReviews.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ success: false, message: 'Review not found' });
  customerReviews = customerReviews.filter(x => x.id !== req.params.id);
  logCrud('DELETE', 'Reviews', `Deleted review by ${r.customer}`, r.id);
  res.json({ success: true, message: 'Review deleted' });
});

// 13. LIVE AUDIT LOG OF CRUD TRANSACTIONS
app.get('/api/admin/crud-logs', (_req: Request, res: Response) => {
  res.json({ success: true, count: crudAuditLogs.length, data: crudAuditLogs });
});

// 5. Admin Dashboard Metrics
app.get('/api/admin/metrics', (_req: Request, res: Response) => {
  const unassignedCount = orders.filter(o => o.dispatchCallStatus === 'NOT_CALLED' || o.status === 'PROCESSING').length;
  res.json({
    success: true,
    data: {
      ...adminStats,
      unassignedOrders: unassignedCount,
      activeProducts: products.length,
      totalOrders: orders.length
    }
  });
});

// 6. AI FreshBot Assistant API (Tailored for Romanian Sri Lankan Supermarket)
app.post('/api/ai/assistant', (req: Request, res: Response) => {
  const { prompt } = req.body;
  const lower = (prompt || '').toLowerCase();

  res.json({
    success: true,
    message: 'Bună ziua & ආයුබෝවන්! I selected the authentic Sri Lankan ingredients available in our Bucharest supermarket. You can order with Cash on Delivery (Plata la Livrare) across Romania!',
    recipe: {
      title: 'Authentic Sri Lankan Village Curry Combo in Romania',
      time: '30 mins',
      calories: '450 kcal',
      servings: '3-4 persons',
      items: [
        'Araliya Keeri Samba & White Raw Rice (5kg)',
        'Sri Lankan Purple Brinjal (1kg)',
        'Mysore Red Split Lentils / Dhal (1kg)',
        'Roasted Ceylon Curry Powder & Spices (250g)'
      ]
    }
  });
});

// --- PRODUCTION STATIC HOSTING FOR CLIENT & ADMIN ---
const possibleAdminPaths = [
  path.resolve(__dirname, '../public/admin'),
  path.resolve(__dirname, '../../admin/dist'),
  path.resolve(process.cwd(), 'public/admin'),
  path.resolve(process.cwd(), 'admin/dist')
];
const adminStaticPath = possibleAdminPaths.find(p => fs.existsSync(p));

if (adminStaticPath) {
  console.log(`[Production] Serving Admin Dashboard from: ${adminStaticPath}`);
  app.use('/admin', express.static(adminStaticPath));
  app.get('/admin*', (_req: Request, res: Response) => {
    res.sendFile(path.join(adminStaticPath, 'index.html'));
  });
}

const possibleClientPaths = [
  path.resolve(__dirname, '../public/client'),
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(process.cwd(), 'public/client'),
  path.resolve(process.cwd(), 'client/dist')
];
const clientStaticPath = possibleClientPaths.find(p => fs.existsSync(p));

if (clientStaticPath) {
  console.log(`[Production] Serving Client Storefront from: ${clientStaticPath}`);
  app.use(express.static(clientStaticPath));
  app.get('*', (req: Request, res: Response, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientStaticPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Ceylon Foods Romania Server running on http://localhost:${PORT}`);
});
