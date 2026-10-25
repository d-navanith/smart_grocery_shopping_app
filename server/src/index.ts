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
    orderNumber: 'FC-123456',
    customerId: 'cust-1',
    customerName: 'Brie Larson',
    customerPhone: '+1 (555) 019-2831',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Pumpkin',
        productImageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800&auto=format&fit=crop&q=80',
        price: 25.99,
        unit: 'kg',
        quantity: 2
      },
      {
        productId: 'prod-8',
        productTitle: 'Green Cabbage',
        productImageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80',
        price: 24.99,
        unit: 'kg',
        quantity: 1
      }
    ],
    subtotal: 76.97,
    vatAmount: 3.85,
    deliveryFee: 2.99,
    discountAmount: 6.20,
    totalAmount: 77.61,
    deliveryType: 'STANDARD',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      street: '33 York Road',
      city: 'Dhaka',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    deliveryNote: 'Leave at front porch next to doorbell',
    status: 'ON_THE_WAY',
    rider: INITIAL_RIDER,
    estimatedDeliveryMinutes: 18,
    placedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let adminStats = { ...INITIAL_ADMIN_STATS };
let fleetRiders: FleetRider[] = [...INITIAL_FLEET_RIDERS];
let promotions: PromotionCoupon[] = [...INITIAL_PROMOTIONS];
let customerAccounts: CustomerAccount[] = [...INITIAL_CUSTOMERS];

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'FreshCart / MetroCery Backend API', timestamp: new Date().toISOString() });
});

let customers: Array<{ id: string; name: string; email: string; phone: string; address: string; password?: string }> = [
  {
    id: 'cust-1',
    name: 'Brie Larson',
    email: 'brie@example.com',
    phone: '+94 77 123 4567',
    address: '33 York Road, Colombo 03',
    password: 'password123'
  }
];

// 2. Authentication Gateways (Strict Separation)
app.post('/api/auth/admin-login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Default credentials: admin@metrocery.com / admin123
  if (email === 'admin@metrocery.com' && password === 'admin123') {
    return res.json({
      success: true,
      token: 'jwt-admin-secure-token-984321',
      user: {
        id: 'admin-1',
        name: 'Natashia Khaleira',
        email: 'admin@metrocery.com',
        role: 'ADMIN',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin credentials. Use admin@metrocery.com / admin123' });
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
  return res.status(401).json({ success: false, message: 'No account found with this email. Please Sign Up.' });
});

app.post('/api/auth/customer-register', (req: Request, res: Response) => {
  const { name, email, phone, address, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }
  const cleanEmail = email.toLowerCase().trim();
  const existing = customers.find(c => c.email.toLowerCase() === cleanEmail);
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
  }
  const newCust = {
    id: `cust-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    phone: phone || '+94 77 123 4567',
    address: address || 'Colombo, Sri Lanka',
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
  const { category, search, organicOnly, minFreshness } = req.query;
  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (organicOnly === 'true') {
    filtered = filtered.filter(p => p.isOrganic);
  }

  if (minFreshness) {
    const min = Number(minFreshness);
    filtered = filtered.filter(p => p.aiFreshnessScore >= min);
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
    price: Number(req.body.price) || 0,
    unit: req.body.unit || 'kg',
    unitWeight: req.body.unitWeight || '1 kg',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    stock: Number(req.body.stock) || 0,
    store: req.body.store || 'Super Market',
    status: req.body.status || 'Active',
    aiFreshnessScore: Number(req.body.aiFreshnessScore) || 95,
    isOrganic: Boolean(req.body.isOrganic),
    isFarmSourced: Boolean(req.body.isFarmSourced ?? true),
    rating: 4.8,
    reviewsCount: 1,
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

// 4. Orders API
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
  const orderNum = `FC-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    customerId: req.body.customerId || 'cust-1',
    customerName: req.body.customerName || 'Brie Larson',
    customerPhone: req.body.customerPhone || '+1 (555) 019-2831',
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    vatAmount: req.body.vatAmount || 0,
    deliveryFee: req.body.deliveryFee || 0,
    discountAmount: req.body.discountAmount || 0,
    totalAmount: req.body.totalAmount || 0,
    deliveryType: req.body.deliveryType || 'STANDARD',
    scheduledTimeSlot: req.body.scheduledTimeSlot,
    deliveryAddress: req.body.deliveryAddress || {
      id: 'addr-default',
      label: 'Home',
      street: '33 York Road, City Center',
      city: 'Dhaka',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    deliveryNote: req.body.deliveryNote || '',
    status: 'PLACED',
    rider: INITIAL_RIDER,
    estimatedDeliveryMinutes: 20,
    placedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  adminStats.totalOrders += 1;
  adminStats.todayOrders += 1;
  adminStats.availableBalance += newOrder.totalAmount;

  res.status(201).json({ success: true, data: newOrder });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = req.body.status;
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, data: order });
});

// 5. Admin Dashboard Metrics (Protected)
app.get('/api/admin/metrics', (_req: Request, res: Response) => {
  const unassignedCount = orders.filter(o => !o.rider || o.status === 'PLACED').length;
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

// 6. AI FreshBot Assistant API
app.post('/api/ai/assistant', (req: Request, res: Response) => {
  const { prompt } = req.body;
  const lower = (prompt || '').toLowerCase();

  if (lower.includes('salad') || lower.includes('greens') || lower.includes('diet')) {
    return res.json({
      success: true,
      message: 'Great choice! Here is a fresh Mediterranean Garden Salad recipe with ingredients sourced today:',
      recipe: {
        title: 'Fresh Garden Salad for 2',
        prepTime: '15 mins',
        difficulty: 'Easy',
        servings: 2,
        calories: 220,
        ingredients: [
          { title: 'Broccoli', quantity: '1 kg', price: 12.99, productId: 'prod-4' },
          { title: 'Tomato', quantity: '1 kg', price: 9.99, productId: 'prod-5' },
          { title: 'Avocado Hass', quantity: '1 kg', price: 17.99, productId: 'prod-2' }
        ],
        totalPrice: 40.97
      }
    });
  }

  if (lower.includes('soup') || lower.includes('pumpkin') || lower.includes('autumn')) {
    return res.json({
      success: true,
      message: 'Warm and comforting! Here is our Chef Recommended Autumn Pumpkin & Herb Soup:',
      recipe: {
        title: 'Velvety Roasted Pumpkin Soup',
        prepTime: '20 mins',
        difficulty: 'Easy',
        servings: 4,
        calories: 180,
        ingredients: [
          { title: 'Pumpkin', quantity: '1 kg', price: 25.99, productId: 'prod-1' },
          { title: 'Tomato', quantity: '1 kg', price: 9.99, productId: 'prod-5' }
        ],
        totalPrice: 35.98
      }
    });
  }

  // Default recommendation
  res.json({
    success: true,
    message: `Here are healthy, top-rated products matching "${prompt}". All items picked with an average 97% AI Freshness Score:`,
    suggestedProducts: products.slice(0, 3)
  });
});

// 7. Admin Promotions Management API
app.get('/api/admin/promotions', (_req: Request, res: Response) => {
  res.json({ success: true, count: promotions.length, data: promotions });
});

app.post('/api/admin/promotions', (req: Request, res: Response) => {
  const newPromo: PromotionCoupon = {
    id: `promo-${Date.now()}`,
    code: (req.body.code || 'SALE10').toUpperCase().trim(),
    title: req.body.title || 'Special Promotion',
    discountType: req.body.discountType || 'PERCENTAGE',
    discountValue: Number(req.body.discountValue) || 10,
    minOrderValue: Number(req.body.minOrderValue) || 20,
    validUntil: req.body.validUntil || '2026-12-31',
    usageCount: 0,
    usageLimit: Number(req.body.usageLimit) || 500,
    status: 'ACTIVE',
    badgeColor: req.body.badgeColor || '#044F41'
  };
  promotions.unshift(newPromo);
  res.status(201).json({ success: true, data: newPromo });
});

app.patch('/api/admin/promotions/:id/status', (req: Request, res: Response) => {
  const promo = promotions.find(p => p.id === req.params.id);
  if (!promo) return res.status(404).json({ success: false, message: 'Promotion not found' });
  promo.status = req.body.status || (promo.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE');
  res.json({ success: true, data: promo });
});

app.delete('/api/admin/promotions/:id', (req: Request, res: Response) => {
  promotions = promotions.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Promotion deleted' });
});

// 8. Admin Fleet & Riders Dispatch API
app.get('/api/admin/riders', (_req: Request, res: Response) => {
  res.json({ success: true, count: fleetRiders.length, data: fleetRiders });
});

app.patch('/api/admin/riders/:id/status', (req: Request, res: Response) => {
  const rider = fleetRiders.find(r => r.id === req.params.id);
  if (!rider) return res.status(404).json({ success: false, message: 'Rider not found' });
  rider.status = req.body.status;
  res.json({ success: true, data: rider });
});

app.post('/api/admin/riders/assign', (req: Request, res: Response) => {
  const { riderId, orderId } = req.body;
  const rider = fleetRiders.find(r => r.id === riderId);
  const order = orders.find(o => o.id === orderId);

  if (!rider || !order) {
    return res.status(400).json({ success: false, message: 'Invalid rider or order ID' });
  }

  rider.status = 'DELIVERING';
  rider.currentOrderId = order.orderNumber;
  order.status = 'ON_THE_WAY';
  order.rider = {
    id: rider.id,
    name: rider.name,
    phone: rider.phone,
    avatarUrl: rider.avatarUrl,
    vehicleType: rider.vehicleType,
    rating: rider.rating,
    currentLocation: { lat: 37.7749, lng: -122.4194 }
  };

  res.json({ success: true, data: { rider, order } });
});

// 9. Admin Customers Directory API
app.get('/api/admin/customers', (_req: Request, res: Response) => {
  res.json({ success: true, count: customerAccounts.length, data: customerAccounts });
});

app.patch('/api/admin/customers/:id/status', (req: Request, res: Response) => {
  const cust = customerAccounts.find(c => c.id === req.params.id);
  if (!cust) return res.status(404).json({ success: false, message: 'Customer not found' });
  cust.status = req.body.status || (cust.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE');
  res.json({ success: true, data: cust });
});

// 10. Admin Inventory Quick Restock API
app.patch('/api/admin/inventory/:id/restock', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  const increment = Number(req.body.quantity) || 50;
  product.stock += increment;
  if (product.stock > 0 && product.status === 'Inactive') {
    product.status = 'Active';
  }
  res.json({ success: true, data: product });
});

app.listen(PORT, () => {
  console.log(`🚀 Supermarket Backend API running at http://localhost:${PORT}`);
});
