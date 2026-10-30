import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LayoutGrid,
  Archive,
  Users,
  Tag,
  Truck,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Settings,
  Search,
  Calendar as CalendarIcon,
  Bell,
  ChevronDown,
  LogOut,
  Plus,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Upload,
  MoreHorizontal,
  X,
  Check,
  Eye,
  Edit2,
  Trash2,
  KeyRound,
  Filter,
  CheckCircle,
  Layers,
  Sparkles,
  BarChart3,
  CreditCard,
  Building,
  Navigation,
  UserPlus,
  Ticket,
  FileText,
  RefreshCw,
  UserCheck,
  Lock,
  MapPin,
  Phone,
  ShoppingBasket,
  ExternalLink,
  Star,
  FileDown,
  Sliders,
  HelpCircle,
  Send,
  Printer,
  CheckSquare,
  Square,
  Copy,
  ChevronRight,
  Percent,
  DollarSign,
  Power,
  Slash,
  CornerDownRight,
  EyeOff,
  Save
} from 'lucide-react';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  store: string;
  status: 'Active' | 'Inactive';
  imageUrl: string;
  aiFreshnessScore?: number;
  isOrganic?: boolean;
  unit?: string;
}

export interface OrderItem {
  productTitle: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  deliveryType: string;
  placedAt: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  assignedRider?: string;
  riderPhone?: string;
  riderVerifiedByAdmin?: boolean;
  notes?: string;
  courierCompany?: string;
  courierPhone?: string;
  dispatchCallStatus?: 'NOT_CALLED' | 'CALLED_DISPATCHED' | 'RIDER_ASSIGNED';
  pickupMinutes?: number;
  deliveryMinutes?: number;
}

export interface FleetRider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'Available' | 'On Delivery' | 'Offline' | 'On Break';
  activeDeliveries: number;
  completedToday: number;
  rating: number;
  zone: string;
}

export interface PromotionCoupon {
  id: string;
  name: string;
  code: string;
  offer: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'FREE_DELIVERY';
  discountValue: number;
  dates: string;
  usage: string;
  currentUsage: number;
  maxUsage: number;
  minBasket: string;
  minBasketValue: number;
  status: 'Active' | 'Scheduled' | 'Expired' | 'Paused';
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  order: string;
  visibility: 'Visible' | 'Hidden';
  updated: string;
  image: string;
}

export interface StaffMember {
  id: string;
  name: string;
  roleSubtitle: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'Catalog Editor' | 'Delivery Agent';
  lastActive: string;
  twoFactor: 'Enabled' | 'Disabled';
  status: 'Active' | 'Invited' | 'Suspended';
}

export interface DeliveryZone {
  id: string;
  zone: string;
  coverage: string;
  fee: string;
  eta: string;
  status: 'Enabled' | 'Disabled';
}

export interface CustomerReview {
  id: string;
  customer: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  sentiment: string;
  verified: boolean;
  reply: string;
  isPublished: boolean;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  totalOrders: number;
  totalSpend: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  status: 'Active' | 'Suspended';
  joinedDate: string;
  lastOrder: string;
  notes?: string;
}

export interface StockAdjustment {
  id: string;
  product: string;
  change: string;
  type: 'IN' | 'OUT';
  reason: string;
  ref: string;
  updatedBy: string;
  time: string;
}

export interface DeliveryScheduleItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  timeWindow: string;
  assignedRider: string;
  payment: string;
  status: 'Unassigned' | 'On the road' | 'Delivered' | 'Cancelled';
}
