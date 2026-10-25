export type UserRole = 'ADMIN' | 'CUSTOMER' | 'RIDER' | 'VENDOR';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export type ProductCategory =
  | 'All'
  | 'Fruit'
  | 'Vegetables'
  | 'Dairy'
  | 'Meat'
  | 'Pantry'
  | 'Bakery'
  | 'Beverages';

export type ProductUnit = 'kg' | 'g' | 'piece' | 'bunch' | 'pack' | 'liter';

export interface NutritionInfo {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
  fiber?: number;   // grams
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description?: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice?: number;
  unit: ProductUnit;
  unitWeight?: string; // e.g. "1kg", "500g", "1 bunch"
  imageUrl: string;
  stock: number;
  store: string;
  status: 'Active' | 'Inactive';
  aiFreshnessScore: number; // e.g. 98 -> "98%"
  isOrganic: boolean;
  isFarmSourced: boolean;
  rating: number; // e.g. 4.5
  reviewsCount: number; // e.g. 10420
  nutrition?: NutritionInfo;
  recipeSuggestions?: RecipeSuggestion[];
  createdAt: string;
}

export interface RecipeSuggestion {
  id: string;
  title: string;
  prepTimeMinutes: number;
  imageUrl: string;
  description: string;
  ingredients: {
    productTitle: string;
    quantity: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'PLACED'
  | 'PROCESSING'
  | 'ON_THE_WAY'
  | 'DELIVERED'
  | 'CANCELLED';

export type DeliveryType = 'STANDARD' | 'EXPRESS' | 'SCHEDULED';

export interface DeliveryAddress {
  id: string;
  label: string; // e.g. "Home", "Work"
  street: string;
  city: string;
  zipCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RiderPartner {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  vehicleType: string;
  rating: number;
  currentLocation: {
    lat: number;
    lng: number;
  };
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImageUrl: string;
  price: number;
  unit: ProductUnit;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "FC-123456"
  customerId: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  vatAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  scheduledTimeSlot?: string;
  deliveryAddress: DeliveryAddress;
  deliveryNote?: string;
  status: OrderStatus;
  rider?: RiderPartner;
  estimatedDeliveryMinutes?: number;
  placedAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrderValue?: number;
  validUntil: string;
  isAiBundle?: boolean;
}

export interface AdminStats {
  availableBalance: number;
  totalOrders: number;
  activeProducts: number;
  totalCustomers: number;
  unassignedOrders: number;
  todayOrders: number;
  activeRiders: number;
  activeVendors: number;
  salesWeekly: { day: string; sales: number }[];
  userDistribution: { customers: number; vendors: number; riders: number };
}
