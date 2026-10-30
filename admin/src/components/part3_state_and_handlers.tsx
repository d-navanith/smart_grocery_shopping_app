import { useState, useEffect } from 'react';
import {
  Product,
  CategoryItem,
  Order,
  DeliveryScheduleItem,
  FleetRider,
  PromotionCoupon,
  StaffMember,
  DeliveryZone,
  CustomerReview,
  CustomerAccount,
  StockAdjustment
} from './part1_imports_types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_DELIVERIES,
  INITIAL_RIDERS,
  INITIAL_PROMOTIONS,
  INITIAL_STAFF,
  INITIAL_ZONES,
  INITIAL_REVIEWS,
  INITIAL_CUSTOMERS,
  INITIAL_ADJUSTMENTS,
  INITIAL_PERMISSIONS
} from './part2_initial_data';

export function useAdminCockpitState() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('auth') === 'false') return false;
    if (params?.get('auth') === 'true') return true;
    return localStorage.getItem('ceylonfoods_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('admin@ceylonfoods.lk');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active navigation menu tab
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'orders' | 'products' | 'categories' | 'inventory' | 'customers' | 'promotions' | 'deliveries' | 'reviews' | 'reports' | 'staff' | 'settings'
  >(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const tab = params?.get('tab');
    if (tab && ['dashboard', 'orders', 'products', 'categories', 'inventory', 'customers', 'promotions', 'deliveries', 'reviews', 'reports', 'staff', 'settings'].includes(tab)) {
      return tab as any;
    }
    return 'dashboard';
  });

  // Global Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>(null);
  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(curr => (curr?.message === message ? null : curr));
    }, 3500);
  };

  // Persistent data states
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_products', JSON.stringify(products));
  }, [products]);

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_categories', JSON.stringify(categories));
  }, [categories]);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_orders', JSON.stringify(orders));
  }, [orders]);

  const [deliveriesList, setDeliveriesList] = useState<DeliveryScheduleItem[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_deliveries');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_deliveries', JSON.stringify(deliveriesList));
  }, [deliveriesList]);

  const [riders, setRiders] = useState<FleetRider[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_riders');
    return saved ? JSON.parse(saved) : INITIAL_RIDERS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_riders', JSON.stringify(riders));
  }, [riders]);

  const [promotionsRegister, setPromotionsRegister] = useState<PromotionCoupon[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_promotions');
    return saved ? JSON.parse(saved) : INITIAL_PROMOTIONS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_promotions', JSON.stringify(promotionsRegister));
  }, [promotionsRegister]);

  const [staffDirectory, setStaffDirectory] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_staff', JSON.stringify(staffDirectory));
  }, [staffDirectory]);

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_zones');
    return saved ? JSON.parse(saved) : INITIAL_ZONES;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_zones', JSON.stringify(deliveryZones));
  }, [deliveryZones]);

  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_reviews', JSON.stringify(customerReviews));
  }, [customerReviews]);

  const [customers, setCustomers] = useState<CustomerAccount[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_customers', JSON.stringify(customers));
  }, [customers]);

  const [stockAdjustments, setStockAdjustments] = useState<StockAdjustment[]>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_adjustments');
    return saved ? JSON.parse(saved) : INITIAL_ADJUSTMENTS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_adjustments', JSON.stringify(stockAdjustments));
  }, [stockAdjustments]);

  const [permissionsMatrix, setPermissionsMatrix] = useState<{ [role: string]: { [module: string]: boolean } }>(() => {
    const saved = localStorage.getItem('ceylonfoods_admin_permissions');
    return saved ? JSON.parse(saved) : INITIAL_PERMISSIONS;
  });
  useEffect(() => {
    localStorage.setItem('ceylonfoods_admin_permissions', JSON.stringify(permissionsMatrix));
  }, [permissionsMatrix]);

  // Settings states
  const [storeName, setStoreName] = useState(() => localStorage.getItem('cf_storeName') || 'Ceylon Foods Supermarket');
  const [supportEmail, setSupportEmail] = useState(() => localStorage.getItem('cf_supportEmail') || 'hello@ceylonfoods.lk');
  const [phone, setPhone] = useState(() => localStorage.getItem('cf_phone') || '011 234 5678');
  const [address, setAddress] = useState(() => localStorage.getItem('cf_address') || '125 High Level Road, Colombo 06');
  const [domain, setDomain] = useState(() => localStorage.getItem('cf_domain') || 'www.ceylonfoods.lk');
  const [currency, setCurrency] = useState('LKR • Sri Lankan Rupee');
  const [country, setCountry] = useState('Sri Lanka');
  const [timezone, setTimezone] = useState('Asia/Colombo (UTC +05:30)');
  const [openingTime, setOpeningTime] = useState(() => localStorage.getItem('cf_openingTime') || '08:00 AM');
  const [closingTime, setClosingTime] = useState(() => localStorage.getItem('cf_closingTime') || '08:00 PM');
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(() => localStorage.getItem('cf_isAcceptingOrders') !== 'false');
  const [cardPaymentsEnabled, setCardPaymentsEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true);
  const [lankaQrEnabled, setLankaQrEnabled] = useState(true);
  const [collectVat, setCollectVat] = useState(true);
  const [standardTaxRate, setStandardTaxRate] = useState('18');
  const [vatRegNumber, setVatRegNumber] = useState('VAT-409182301-7000');
  const [pricesIncludeTax, setPricesIncludeTax] = useState(true);
  const [minOrderLkr, setMinOrderLkr] = useState(() => localStorage.getItem('cf_minOrderLkr') || '1,000.00');
  const [freeDeliveryAboveLkr, setFreeDeliveryAboveLkr] = useState(() => localStorage.getItem('cf_freeDeliveryAboveLkr') || '5,000.00');
  const [sameDayCutoff, setSameDayCutoff] = useState('02:00 PM');
  const [deliveryWindowLength, setDeliveryWindowLength] = useState('3 hours');
  const [preventCouponStacking, setPreventCouponStacking] = useState(true);
  const [excludeDeliveryFees, setExcludeDeliveryFees] = useState(true);

  // Settings subtab
  const [settingsTab, setSettingsTab] = useState<'STORE' | 'NOTIFICATIONS' | 'SECURITY' | 'INTEGRATIONS'>('STORE');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersTab, setOrdersTab] = useState<'ALL' | 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState('ALL');
  const [orderAreaFilter, setOrderAreaFilter] = useState('ALL');
  
  const [productsTab, setProductsTab] = useState<'ALL' | 'AVAILABLE' | 'DRAFTS' | 'OUT_OF_STOCK'>('ALL');
  const [productCategoryFilter, setProductCategoryFilter] = useState('ALL');
  
  const [inventoryTab, setInventoryTab] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');
  const [deliveriesTab, setDeliveriesTab] = useState<'TODAY' | 'UNASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED'>('TODAY');
  const [deliveryRiderFilter, setDeliveryRiderFilter] = useState('ALL');
  
  const [promotionsTab, setPromotionsTab] = useState<'ALL' | 'ACTIVE' | 'SCHEDULED' | 'EXPIRED'>('ALL');
  const [staffRoleFilter, setStaffRoleFilter] = useState('ALL');
  const [reviewsFilter, setReviewsFilter] = useState<'ALL' | '5_STAR' | '4_STAR' | 'NEEDS_REPLY'>('ALL');
  const [customerTierFilter, setCustomerTierFilter] = useState('ALL');
  
  const [reportsDateFilter, setReportsDateFilter] = useState<'TODAY' | '7_DAYS' | '30_DAYS' | 'THIS_MONTH' | 'YEAR_TO_DATE'>('THIS_MONTH');
  const [reportsSubTab, setReportsSubTab] = useState<'SALES' | 'PRODUCTS' | 'CUSTOMERS' | 'INVENTORY' | 'DELIVERY'>('SALES');

  // Selection & Modal States
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [dispatchingOrder, setDispatchingOrder] = useState<Order | null>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const disp = params?.get('dispatch');
    if (disp) {
      const match = INITIAL_ORDERS.find(o => o.orderNumber.includes(disp) || o.id === disp) || INITIAL_ORDERS[0];
      if (match) return match;
    }
    return null;
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [adjustingStockProduct, setAdjustingStockProduct] = useState<Product | null>(null);
  const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState<DeliveryScheduleItem | null>(null);
  const [isAssignDeliveryModalOpen, setIsAssignDeliveryModalOpen] = useState(false);
  const [deliveryRiderSelect, setDeliveryRiderSelect] = useState('Kasun Madushanka');
  const [isAddRiderModalOpen, setIsAddRiderModalOpen] = useState(false);
  const [isCreatePromoModalOpen, setIsCreatePromoModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromotionCoupon | null>(null);
  const [isInviteStaffModalOpen, setIsInviteStaffModalOpen] = useState(false);
  const [editingDeliveryZone, setEditingDeliveryZone] = useState<DeliveryZone | null>(null);
  const [isAddDeliveryZoneModalOpen, setIsAddDeliveryZoneModalOpen] = useState(false);
  const [selectedCustomerForDrawer, setSelectedCustomerForDrawer] = useState<CustomerAccount | null>(null);
  const [reviewReplyInputs, setReviewReplyInputs] = useState<{ [id: string]: string }>({});

  return {
    isAuthenticated, setIsAuthenticated,
    loginEmail, setLoginEmail, loginPassword, setLoginPassword, loginError, setLoginError, loginLoading, setLoginLoading,
    activeMenu, setActiveMenu,
    toast, setToast, showToast,
    products, setProducts,
    categories, setCategories,
    orders, setOrders,
    deliveriesList, setDeliveriesList,
    riders, setRiders,
    promotionsRegister, setPromotionsRegister,
    staffDirectory, setStaffDirectory,
    deliveryZones, setDeliveryZones,
    customerReviews, setCustomerReviews,
    customers, setCustomers,
    stockAdjustments, setStockAdjustments,
    permissionsMatrix, setPermissionsMatrix,
    storeName, setStoreName, supportEmail, setSupportEmail, phone, setPhone, address, setAddress, domain, setDomain,
    currency, setCurrency, country, setCountry, timezone, setTimezone, openingTime, setOpeningTime, closingTime, setClosingTime,
    isAcceptingOrders, setIsAcceptingOrders, cardPaymentsEnabled, setCardPaymentsEnabled, codEnabled, setCodEnabled,
    bankTransferEnabled, setBankTransferEnabled, lankaQrEnabled, setLankaQrEnabled, collectVat, setCollectVat,
    standardTaxRate, setStandardTaxRate, vatRegNumber, setVatRegNumber, pricesIncludeTax, setPricesIncludeTax,
    minOrderLkr, setMinOrderLkr, freeDeliveryAboveLkr, setFreeDeliveryAboveLkr, sameDayCutoff, setSameDayCutoff,
    deliveryWindowLength, setDeliveryWindowLength, preventCouponStacking, setPreventCouponStacking, excludeDeliveryFees, setExcludeDeliveryFees,
    settingsTab, setSettingsTab,
    searchTerm, setSearchTerm,
    ordersTab, setOrdersTab, orderPaymentFilter, setOrderPaymentFilter, orderAreaFilter, setOrderAreaFilter,
    productsTab, setProductsTab, productCategoryFilter, setProductCategoryFilter,
    inventoryTab, setInventoryTab,
    deliveriesTab, setDeliveriesTab, deliveryRiderFilter, setDeliveryRiderFilter,
    promotionsTab, setPromotionsTab,
    staffRoleFilter, setStaffRoleFilter,
    reviewsFilter, setReviewsFilter,
    customerTierFilter, setCustomerTierFilter,
    reportsDateFilter, setReportsDateFilter, reportsSubTab, setReportsSubTab,
    selectedOrderForDetail, setSelectedOrderForDetail,
    dispatchingOrder, setDispatchingOrder,
    editingProduct, setEditingProduct, isAddProductModalOpen, setIsAddProductModalOpen,
    editingCategory, setEditingCategory, isAddCategoryModalOpen, setIsAddCategoryModalOpen,
    adjustingStockProduct, setAdjustingStockProduct,
    selectedDeliveryOrder, setSelectedDeliveryOrder, isAssignDeliveryModalOpen, setIsAssignDeliveryModalOpen, deliveryRiderSelect, setDeliveryRiderSelect,
    isAddRiderModalOpen, setIsAddRiderModalOpen,
    isCreatePromoModalOpen, setIsCreatePromoModalOpen, editingPromo, setEditingPromo,
    isInviteStaffModalOpen, setIsInviteStaffModalOpen,
    editingDeliveryZone, setEditingDeliveryZone, isAddDeliveryZoneModalOpen, setIsAddDeliveryZoneModalOpen,
    selectedCustomerForDrawer, setSelectedCustomerForDrawer,
    reviewReplyInputs, setReviewReplyInputs
  };
}
