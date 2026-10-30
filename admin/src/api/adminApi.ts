import {
  Product,
  CategoryItem,
  Order,
  FleetRider,
  PromotionCoupon,
  StaffMember,
  DeliveryZone,
  CustomerReview,
  CustomerAccount,
  StockAdjustment
} from '../components/part1_imports_types';

const API_BASE = ''; // Same origin or proxied by Vite

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
  }
  return res.json();
}

export const adminApi = {
  // 1. PRODUCTS CRUD
  products: {
    list: (params?: { category?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set('category', params.category);
      if (params?.search) q.set('search', params.search);
      return request<{ success: boolean; count: number; data: Product[] }>(`/api/products?${q.toString()}`);
    },
    get: (id: string) => request<{ success: boolean; data: Product }>(`/api/products/${id}`),
    create: (data: Partial<Product>) =>
      request<{ success: boolean; data: Product }>('/api/products', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<Product>) =>
      request<{ success: boolean; data: Product }>(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/products/${id}`, {
        method: 'DELETE'
      })
  },

  // 2. ORDERS CRUD
  orders: {
    list: (params?: { status?: string; customerId?: string }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set('status', params.status);
      if (params?.customerId) q.set('customerId', params.customerId);
      return request<{ success: boolean; count: number; data: Order[] }>(`/api/orders?${q.toString()}`);
    },
    get: (id: string) => request<{ success: boolean; data: Order }>(`/api/orders/${id}`),
    create: (data: Partial<Order>) =>
      request<{ success: boolean; data: Order }>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<Order>) =>
      request<{ success: boolean; data: Order }>(`/api/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    updateStatus: (id: string, status: Order['status']) =>
      request<{ success: boolean; data: Order }>(`/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),
    updatePayment: (id: string, paymentStatus: 'PAID' | 'PENDING' | 'FAILED') =>
      request<{ success: boolean; data: Order }>(`/api/orders/${id}/payment`, {
        method: 'PATCH',
        body: JSON.stringify({ paymentStatus })
      }),
    assignRider: (id: string, riderData: { riderName: string; riderPhone?: string; courierCompany?: string }) =>
      request<{ success: boolean; data: Order }>(`/api/orders/${id}/assign-rider`, {
        method: 'PATCH',
        body: JSON.stringify(riderData)
      }),
    dispatchCourier: (id: string, dispatchData: {
      courierCompany: string;
      courierPhone?: string;
      riderName: string;
      riderPhone?: string;
      pickupMinutes: number;
      deliveryMinutes: number;
    }) =>
      request<{ success: boolean; message: string; data: Order }>(`/api/orders/${id}/dispatch-courier`, {
        method: 'POST',
        body: JSON.stringify(dispatchData)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/orders/${id}`, {
        method: 'DELETE'
      })
  },

  // 3. CATEGORIES CRUD
  categories: {
    list: () => request<{ success: boolean; count: number; data: CategoryItem[] }>('/api/categories'),
    get: (id: string) => request<{ success: boolean; data: CategoryItem }>(`/api/categories/${id}`),
    create: (data: Partial<CategoryItem>) =>
      request<{ success: boolean; data: CategoryItem }>('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<CategoryItem>) =>
      request<{ success: boolean; data: CategoryItem }>(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/categories/${id}`, {
        method: 'DELETE'
      })
  },

  // 4. INVENTORY CRUD
  inventory: {
    list: () => request<{ success: boolean; count: number; data: any[]; adjustments: StockAdjustment[] }>('/api/inventory'),
    adjust: (data: { productId: string; type: 'IN' | 'OUT' | 'WASTE' | 'AUDIT'; deltaQty: number; reason: string; updatedBy?: string }) =>
      request<{ success: boolean; product: Product; adjustment: StockAdjustment }>('/api/inventory/adjust', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: { stock: number }) =>
      request<{ success: boolean; data: Product }>(`/api/inventory/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
  },

  // 5. CUSTOMERS CRM CRUD
  customers: {
    list: () => request<{ success: boolean; count: number; data: CustomerAccount[] }>('/api/customers'),
    get: (id: string) => request<{ success: boolean; data: CustomerAccount }>(`/api/customers/${id}`),
    create: (data: Partial<CustomerAccount>) =>
      request<{ success: boolean; data: CustomerAccount }>('/api/customers', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<CustomerAccount>) =>
      request<{ success: boolean; data: CustomerAccount }>(`/api/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/customers/${id}`, {
        method: 'DELETE'
      })
  },

  // 6. PROMOTIONS / COUPONS CRUD
  promotions: {
    list: () => request<{ success: boolean; count: number; data: PromotionCoupon[] }>('/api/promotions'),
    create: (data: Partial<PromotionCoupon>) =>
      request<{ success: boolean; data: PromotionCoupon }>('/api/promotions', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<PromotionCoupon>) =>
      request<{ success: boolean; data: PromotionCoupon }>(`/api/promotions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/promotions/${id}`, {
        method: 'DELETE'
      })
  },

  // 7. FLEET RIDERS CRUD
  riders: {
    list: () => request<{ success: boolean; count: number; data: FleetRider[] }>('/api/riders'),
    create: (data: Partial<FleetRider>) =>
      request<{ success: boolean; data: FleetRider }>('/api/riders', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<FleetRider>) =>
      request<{ success: boolean; data: FleetRider }>(`/api/riders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/riders/${id}`, {
        method: 'DELETE'
      })
  },

  // 8. STAFF DIRECTORY CRUD
  staff: {
    list: () => request<{ success: boolean; count: number; data: StaffMember[] }>('/api/staff'),
    create: (data: Partial<StaffMember>) =>
      request<{ success: boolean; data: StaffMember }>('/api/staff', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<StaffMember>) =>
      request<{ success: boolean; data: StaffMember }>(`/api/staff/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/staff/${id}`, {
        method: 'DELETE'
      })
  },

  // 9. DELIVERY ZONES CRUD
  deliveryZones: {
    list: () => request<{ success: boolean; count: number; data: DeliveryZone[] }>('/api/delivery-zones'),
    create: (data: Partial<DeliveryZone>) =>
      request<{ success: boolean; data: DeliveryZone }>('/api/delivery-zones', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<DeliveryZone>) =>
      request<{ success: boolean; data: DeliveryZone }>(`/api/delivery-zones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/delivery-zones/${id}`, {
        method: 'DELETE'
      })
  },

  // 10. REVIEWS CRUD
  reviews: {
    list: () => request<{ success: boolean; count: number; data: CustomerReview[] }>('/api/reviews'),
    create: (data: Partial<CustomerReview>) =>
      request<{ success: boolean; data: CustomerReview }>('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id: string, data: Partial<CustomerReview>) =>
      request<{ success: boolean; data: CustomerReview }>(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/api/reviews/${id}`, {
        method: 'DELETE'
      })
  },

  // 11. AUDIT LOGS
  auditLogs: {
    list: () => request<{ success: boolean; count: number; data: any[] }>('/api/admin/crud-logs')
  }
};
