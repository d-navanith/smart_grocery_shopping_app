export type Language = 'en' | 'si' | 'ro';

export interface Product {
  id: string;
  sku: string;
  title: string;
  description?: string;
  category: string;
  brand: string;
  price: number; // In Romanian Lei (lei / RON)
  originalPrice?: number;
  unit: string;
  unitWeight?: string;
  imageUrl: string;
  stock: number;
  store: string;
  status: 'Active' | 'Inactive';
  aiFreshnessScore: number;
  isOrganic: boolean;
  isFarmSourced: boolean;
  rating: number;
  reviewsCount: number;
  availableWeights?: string[];
  productType?: 'Fresh Produce' | 'Packaged Goods' | 'Chilled & Frozen';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
  effectivePrice: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  buildingDetails?: string;
  sectorCity?: string;
  role: string;
}

export interface DeliverySlot {
  id: string;
  label: string;
  time: string;
  fee: number;
  quota: string;
}

export interface DeliveryZone {
  name: string;
  coverage: string;
  fee: number; // in lei
  eta: string;
}

export interface PromoCode {
  code: string;
  title: string;
  discount: number; // in lei
  freeDelivery?: boolean;
}

export interface ClientOrderItem {
  productId?: string;
  productTitle: string;
  quantity: number;
  price: number;
  unit?: string;
  imageUrl?: string;
}

export interface ClientOrder {
  id: string;
  orderNumber: string;
  placedAt: string;
  status: 'PENDING' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  items: (ClientOrderItem | string)[];
  subtotal: number;
  deliveryFee: number;
  discountAmount?: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  customerName: string;
  customerPhone: string;
  address: string;
  deliveryZone?: string;
  courierCompany?: string;
  courierPhone?: string;
  riderName?: string;
  riderPhone?: string; // DIRECT MOBILE NUMBER GIVEN BY RIDER TO ADMIN UPON ARRIVAL
  riderVerifiedByAdmin?: boolean; // True ONLY when store admin enters and verifies rider mobile!
  pickupMinutes?: number;
  deliveryMinutes?: number;
  estimatedDeliveryMinutes?: number;
  notes?: string;
}

export interface OrderTrackingInfo {
  orderNumber: string;
  status: 'PLACED' | 'PROCESSING' | 'DISPATCHED_TO_COURIER' | 'ON_THE_WAY' | 'DELIVERED';
  totalAmount: number;
  paymentMethod: string;
  items: string[];
  customerName: string;
  customerPhone: string;
  address: string;
  courierCompany?: string;
  courierPhone?: string;
  riderName?: string;
  riderPhone?: string;
  riderVerifiedByAdmin?: boolean;
  pickupMinutes?: number;
  deliveryMinutes?: number;
}
