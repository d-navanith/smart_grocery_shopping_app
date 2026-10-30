import express, { Request, Response } from 'express';
import cors from 'cors';
import {
  INITIAL_PRODUCTS,
  INITIAL_ADMIN_STATS,
  INITIAL_RIDER,
  INITIAL_FLEET_RIDERS,
  INITIAL_PROMOTIONS,
  INITIAL_CUSTOMERS,
  Product,
  Order,
  FleetRider,
  PromotionCoupon,
  CustomerAccount
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
    rider: INITIAL_RIDER,
    estimatedDeliveryMinutes: 25,
    placedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let adminStats = { ...INITIAL_ADMIN_STATS };
let fleetRiders: FleetRider[] = [...INITIAL_FLEET_RIDERS];
let promotions: PromotionCoupon[] = [...INITIAL_PROMOTIONS];
let customerAccounts: CustomerAccount[] = [...INITIAL_CUSTOMERS];

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
  res.status(201).json({ success: true, data: newProduct });
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, data: products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  products = products.filter(p => p.id !== req.params.id);
  adminStats.activeProducts = products.length;
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
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const {
    courierCompany = 'Glovo Express Bucharest',
    riderPhone = '+40 21 9988',
    pickupMinutes = 10,
    deliveryMinutes = 30,
    riderName = 'Andrei Popescu (Glovo Rider)',
    courierNote = ''
  } = req.body;

  order.status = 'ON_THE_WAY';
  order.courierCompany = courierCompany;
  order.courierPhone = riderPhone;
  order.dispatchCallStatus = 'CALLED_DISPATCHED';
  order.pickupMinutes = Number(pickupMinutes);
  order.deliveryMinutes = Number(deliveryMinutes);
  order.estimatedDeliveryMinutes = Number(deliveryMinutes);
  order.updatedAt = new Date().toISOString();

  if (order.rider) {
    order.rider.name = riderName;
    order.rider.phone = riderPhone;
    order.rider.company = courierCompany;
  }

  res.json({
    success: true,
    message: `Courier dispatched! Call registered to ${courierCompany}. Rider arriving in ${pickupMinutes} mins. Delivery ETA ${deliveryMinutes} mins.`,
    data: order
  });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = req.body.status;
  if (req.body.status === 'DELIVERED') {
    order.paymentStatus = 'PAID'; // Cash collected by rider!
  }
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, data: order });
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

app.listen(PORT, () => {
  console.log(`Ceylon Foods Romania Server running on http://localhost:${PORT}`);
});
