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
import { useAdminCockpitState } from './part3_state_and_handlers';
import { adminApi } from '../api/adminApi';

export function createMutations(state: ReturnType<typeof import('./part3_state_and_handlers').useAdminCockpitState>) {
  const {
    showToast,
    orders, setOrders,
    products, setProducts,
    categories, setCategories,
    deliveriesList, setDeliveriesList,
    riders, setRiders,
    promotionsRegister, setPromotionsRegister,
    staffDirectory, setStaffDirectory,
    deliveryZones, setDeliveryZones,
    customerReviews, setCustomerReviews,
    customers, setCustomers,
    stockAdjustments, setStockAdjustments,
    permissionsMatrix, setPermissionsMatrix,
    storeName, supportEmail, phone, address, domain, openingTime, closingTime, isAcceptingOrders,
    minOrderLkr, freeDeliveryAboveLkr
  } = state;

  // --- ORDER MUTATIONS ---
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    // If dispatched or delivered, update corresponding delivery schedule if present
    setDeliveriesList(prev => prev.map(d => {
      const match = orders.find(o => o.id === orderId);
      if (match && d.orderNumber === match.orderNumber) {
        return {
          ...d,
          status: newStatus === 'DELIVERED' ? 'Delivered' : newStatus === 'ON_THE_WAY' ? 'On the road' : d.status
        };
      }
      return d;
    }));
    adminApi.orders.updateStatus(orderId, newStatus).catch(err => console.warn('Sync orders.updateStatus error:', err));
    showToast(`Order status updated to ${newStatus.replace('_', ' ')}`);
  };

  const updateOrderPayment = (orderId: string, newPaymentStatus: 'PAID' | 'PENDING' | 'FAILED') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o));
    adminApi.orders.updatePayment(orderId, newPaymentStatus).catch(err => console.warn('Sync orders.updatePayment error:', err));
    showToast(`Payment marked as ${newPaymentStatus}`);
  };

  const assignOrderRider = (orderId: string, riderName: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, assignedRider: riderName, status: 'ON_THE_WAY' } : o));
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      setDeliveriesList(prev => prev.map(d => d.orderNumber === targetOrder.orderNumber ? { ...d, assignedRider: riderName, status: 'On the road' } : d));
    }
    adminApi.orders.assignRider(orderId, { riderName }).catch(err => console.warn('Sync orders.assignRider error:', err));
    showToast(`Assigned courier ${riderName} to order`);
  };

  const dispatchCourier = (dispatchData: {
    orderId: string;
    courierCompany: string;
    courierPhone: string;
    riderName: string;
    riderPhone?: string;
    pickupMinutes: number;
    deliveryMinutes: number;
  }) => {
    const { orderId, courierCompany, courierPhone, riderName, riderPhone, pickupMinutes, deliveryMinutes } = dispatchData;
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'ON_THE_WAY',
          assignedRider: riderName || `${courierCompany} Courier`,
          riderPhone: riderPhone || o.riderPhone,
          riderVerifiedByAdmin: Boolean(riderPhone),
          courierCompany,
          courierPhone,
          pickupMinutes,
          deliveryMinutes,
          dispatchCallStatus: 'CALLED_DISPATCHED'
        };
      }
      return o;
    }));

    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      setDeliveriesList(prev => {
        const exists = prev.some(d => d.orderNumber === targetOrder.orderNumber);
        if (exists) {
          return prev.map(d => d.orderNumber === targetOrder.orderNumber ? {
            ...d,
            assignedRider: riderName || `${courierCompany} Express`,
            status: 'On the road'
          } : d);
        } else {
          return [
            ...prev,
            {
              id: `del-${Date.now()}`,
              orderNumber: targetOrder.orderNumber,
              customerName: targetOrder.customerName,
              customerPhone: targetOrder.customerPhone,
              address: targetOrder.customerAddress,
              timeWindow: `Within ${pickupMinutes + deliveryMinutes} mins`,
              assignedRider: riderName || `${courierCompany} Express`,
              payment: targetOrder.paymentMethod === 'COD' ? 'Cash on Delivery (Ramburs)' : 'Online Card',
              status: 'On the road'
            }
          ];
        }
      });
    }

    // Call server REST API
    adminApi.orders.dispatchCourier(orderId, dispatchData).catch(err => console.warn('Sync orders.dispatchCourier error:', err));

    showToast(`🚀 Dispatched to ${courierCompany}! Ridicare în ${pickupMinutes}m, Livrare în ${deliveryMinutes}m.`);
  };

  const deleteOrder = (orderId: string) => {
    const o = orders.find(x => x.id === orderId);
    setOrders(prev => prev.filter(x => x.id !== orderId));
    if (o) {
      setDeliveriesList(prev => prev.filter(d => d.orderNumber !== o.orderNumber));
    }
    adminApi.orders.delete(orderId).catch(err => console.warn('Sync orders.delete error:', err));
    showToast(`Order ${o?.orderNumber || ''} removed from register`, 'warning');
  };

  const printOrderInvoice = (order: Order) => {
    const printWindow = window.open('', '_blank', 'width=800,height=700');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Ceylon Foods Receipt - ${order.orderNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #1e293b; }
            .header { text-align: center; border-bottom: 2px dashed #0C6237; padding-bottom: 20px; margin-bottom: 24px; }
            .title { font-size: 24px; font-weight: 900; color: #0C6237; margin: 0; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
            .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
            th { text-align: left; padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-size: 11px; text-transform: uppercase; }
            td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
            .total-row { font-weight: bold; font-size: 15px; }
            .footer { margin-top: 36px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">🛒 CEYLON FOODS</h1>
            <p class="subtitle">Sri Lanka Online Supermarket • Fresh from Island Harvesters</p>
            <p class="subtitle">Hotline: 011 234 5678 • VAT: VAT-409182301-7000</p>
          </div>
          <div class="meta">
            <div>
              <strong>Order:</strong> ${order.orderNumber}<br/>
              <strong>Date:</strong> ${order.placedAt}<br/>
              <strong>Status:</strong> ${order.status} (${order.paymentStatus})
            </div>
            <div style="text-align: right;">
              <strong>Customer:</strong> ${order.customerName}<br/>
              <strong>Phone:</strong> ${order.customerPhone}<br/>
              <strong>Delivery:</strong> ${order.customerAddress}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit (LKR)</th>
                <th style="text-align: right;">Line Total (LKR)</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(it => `
                <tr>
                  <td><strong>${it.productTitle}</strong></td>
                  <td style="text-align: center;">${it.quantity}</td>
                  <td style="text-align: right;">${it.price.toFixed(2)}</td>
                  <td style="text-align: right;">${(it.price * it.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3" style="text-align: right; padding-top: 16px;">Grand Total (LKR):</td>
                <td style="text-align: right; padding-top: 16px; color: #0C6237;">${order.totalAmount.toLocaleString()}.00</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <p>Thank you for shopping with Ceylon Foods! ආයුබෝවන්.!</p>
            <p>This is a computer-generated tax invoice verified by Ceylon Foods Operations Portal.</p>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    showToast(`Invoice generated for ${order.orderNumber}`);
  };

  // --- PRODUCT MUTATIONS ---
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
    // update category count
    setCategories(prev => prev.map(c => c.name === prodData.category ? { ...c, count: c.count + 1 } : c));
    adminApi.products.create(newProd).catch(err => console.warn('Sync products.create error:', err));
    showToast(`Added product "${newProd.title}"`);
  };

  const updateProduct = (prod: Product) => {
    setProducts(prev => prev.map(p => p.id === prod.id ? prod : p));
    adminApi.products.update(prod.id, prod).catch(err => console.warn('Sync products.update error:', err));
    showToast(`Updated "${prod.title}" details`);
  };

  const deleteProduct = (productId: string) => {
    const p = products.find(x => x.id === productId);
    setProducts(prev => prev.filter(x => x.id !== productId));
    if (p) {
      setCategories(prev => prev.map(c => c.name === p.category ? { ...c, count: Math.max(0, c.count - 1) } : c));
    }
    adminApi.products.delete(productId).catch(err => console.warn('Sync products.delete error:', err));
    showToast(`Deleted product "${p?.title || ''}"`, 'warning');
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const nextStatus = p.status === 'Active' ? 'Inactive' : 'Active';
        adminApi.products.update(productId, { status: nextStatus }).catch(err => console.warn('Sync toggleProductStatus error:', err));
        showToast(`Product set to ${nextStatus === 'Active' ? 'Available' : 'Draft'}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const adjustProductStock = (productId: string, delta: number, reason: string = 'Stock manual adjustment') => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + delta);
        // append to audit log
        setStockAdjustments(adj => [
          {
            id: `adj-${Date.now()}`,
            product: p.title,
            change: `${delta > 0 ? '+' : ''}${delta} units`,
            type: delta >= 0 ? 'IN' : 'OUT',
            reason,
            ref: `STK-${Math.floor(1000 + Math.random() * 9000)}`,
            updatedBy: 'Operations Lead',
            time: 'Just now'
          },
          ...adj
        ]);
        adminApi.inventory.adjust({
          productId,
          type: delta >= 0 ? 'IN' : 'OUT',
          deltaQty: Math.abs(delta),
          reason,
          updatedBy: 'Operations Lead'
        }).catch(err => console.warn('Sync inventory.adjust error:', err));
        showToast(`Stock for ${p.title} adjusted to ${newStock} units`);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  // --- CATEGORY MUTATIONS ---
  const addCategory = (catData: Omit<CategoryItem, 'id' | 'updated'>) => {
    const newCat: CategoryItem = {
      ...catData,
      id: `cat-${Date.now()}`,
      updated: 'Just now'
    };
    setCategories(prev => [...prev, newCat]);
    adminApi.categories.create(newCat).catch(err => console.warn('Sync categories.create error:', err));
    showToast(`Category "${newCat.name}" created`);
  };

  const updateCategory = (cat: CategoryItem) => {
    setCategories(prev => prev.map(c => c.id === cat.id ? { ...cat, updated: 'Just now' } : c));
    adminApi.categories.update(cat.id, cat).catch(err => console.warn('Sync categories.update error:', err));
    showToast(`Category "${cat.name}" updated`);
  };

  const deleteCategory = (catId: string) => {
    const c = categories.find(x => x.id === catId);
    setCategories(prev => prev.filter(x => x.id !== catId));
    adminApi.categories.delete(catId).catch(err => console.warn('Sync categories.delete error:', err));
    showToast(`Category "${c?.name || ''}" removed`, 'warning');
  };

  const toggleCategoryVisibility = (catId: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === catId) {
        const nextVis = c.visibility === 'Visible' ? 'Hidden' : 'Visible';
        adminApi.categories.update(catId, { visibility: nextVis }).catch(err => console.warn('Sync category visibility error:', err));
        showToast(`Category visibility set to ${nextVis}`);
        return { ...c, visibility: nextVis, updated: 'Just now' };
      }
      return c;
    }));
  };

  // --- DELIVERY MUTATIONS ---
  const assignDelivery = (orderId: string, riderName: string, timeWindow: string) => {
    setDeliveriesList(prev => prev.map(d => d.id === orderId ? { ...d, assignedRider: riderName, timeWindow, status: 'On the road' } : d));
    // sync with orders
    const targetDel = deliveriesList.find(d => d.id === orderId);
    if (targetDel) {
      setOrders(prev => prev.map(o => o.orderNumber === targetDel.orderNumber ? { ...o, assignedRider: riderName, status: 'ON_THE_WAY' } : o));
      const targetOrder = orders.find(o => o.orderNumber === targetDel.orderNumber);
      if (targetOrder) {
        adminApi.orders.assignRider(targetOrder.id, { riderName }).catch(err => console.warn('Sync assign rider error:', err));
      }
    }
    // update rider active count
    setRiders(prev => prev.map(r => r.name === riderName ? { ...r, activeDeliveries: r.activeDeliveries + 1 } : r));
    showToast(`Assigned ${riderName} to delivery ${targetDel?.orderNumber || ''}`);
  };

  const markDeliveryStatus = (delId: string, newStatus: DeliveryScheduleItem['status']) => {
    setDeliveriesList(prev => prev.map(d => {
      if (d.id === delId) {
        // sync with orders
        setOrders(ord => ord.map(o => {
          if (o.orderNumber === d.orderNumber) {
            const ordStatus: Order['status'] = newStatus === 'Delivered' ? 'DELIVERED' : newStatus === 'On the road' ? 'ON_THE_WAY' : o.status;
            adminApi.orders.updateStatus(o.id, ordStatus).catch(err => console.warn('Sync order status error:', err));
            return { ...o, status: ordStatus };
          }
          return o;
        }));
        if (newStatus === 'Delivered' && d.assignedRider) {
          setRiders(r => r.map(x => x.name === d.assignedRider ? {
            ...x,
            activeDeliveries: Math.max(0, x.activeDeliveries - 1),
            completedToday: x.completedToday + 1
          } : x));
        }
        showToast(`Delivery ${d.orderNumber} marked as ${newStatus}`);
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const toggleRiderDuty = (riderId: string) => {
    setRiders(prev => prev.map(r => {
      if (r.id === riderId) {
        const nextStatus = r.status === 'Available' ? 'On Break' : 'Available';
        adminApi.riders.update(riderId, { status: nextStatus }).catch(err => console.warn('Sync rider status error:', err));
        showToast(`Rider ${r.name} is now ${nextStatus}`);
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const addRider = (riderData: Omit<FleetRider, 'id' | 'completedToday' | 'rating' | 'activeDeliveries'>) => {
    const newRider: FleetRider = {
      ...riderData,
      id: `rider-${Date.now()}`,
      activeDeliveries: 0,
      completedToday: 0,
      rating: 5.0
    };
    setRiders(prev => [...prev, newRider]);
    adminApi.riders.create(newRider).catch(err => console.warn('Sync riders.create error:', err));
    showToast(`Rider ${newRider.name} added to fleet`);
  };

  const deleteRider = (riderId: string) => {
    const r = riders.find(x => x.id === riderId);
    setRiders(prev => prev.filter(x => x.id !== riderId));
    adminApi.riders.delete(riderId).catch(err => console.warn('Sync riders.delete error:', err));
    showToast(`Rider "${r?.name || ''}" removed from fleet`, 'warning');
  };

  // --- PROMOTION MUTATIONS ---
  const togglePromoStatus = (promoId: string) => {
    setPromotionsRegister(prev => prev.map(p => {
      if (p.id === promoId) {
        const nextStatus = p.status === 'Active' ? 'Paused' : 'Active';
        adminApi.promotions.update(promoId, { status: nextStatus }).catch(err => console.warn('Sync promo status error:', err));
        showToast(`Promotion "${p.code}" ${nextStatus === 'Active' ? 'resumed' : 'paused'}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const createPromo = (promoData: Omit<PromotionCoupon, 'id' | 'usage' | 'currentUsage'>) => {
    const newPromo: PromotionCoupon = {
      ...promoData,
      id: `promo-${Date.now()}`,
      usage: `0 / ${promoData.maxUsage}`,
      currentUsage: 0
    };
    setPromotionsRegister(prev => [newPromo, ...prev]);
    adminApi.promotions.create(newPromo).catch(err => console.warn('Sync promotions.create error:', err));
    showToast(`Promotion "${newPromo.code}" created successfully`);
  };

  const updatePromo = (promo: PromotionCoupon) => {
    setPromotionsRegister(prev => prev.map(p => p.id === promo.id ? promo : p));
    adminApi.promotions.update(promo.id, promo).catch(err => console.warn('Sync promotions.update error:', err));
    showToast(`Promotion "${promo.code}" updated`);
  };

  const deletePromo = (promoId: string) => {
    const p = promotionsRegister.find(x => x.id === promoId);
    setPromotionsRegister(prev => prev.filter(x => x.id !== promoId));
    adminApi.promotions.delete(promoId).catch(err => console.warn('Sync promotions.delete error:', err));
    showToast(`Promotion "${p?.code || ''}" deleted`, 'warning');
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon code "${code}" copied to clipboard!`);
  };

  // --- STAFF MUTATIONS ---
  const updateStaffRole = (staffId: string, newRole: StaffMember['role']) => {
    setStaffDirectory(prev => prev.map(s => s.id === staffId ? { ...s, role: newRole } : s));
    adminApi.staff.update(staffId, { role: newRole }).catch(err => console.warn('Sync staff.update error:', err));
    showToast(`Staff role updated to ${newRole}`);
  };

  const toggleStaff2FA = (staffId: string) => {
    setStaffDirectory(prev => prev.map(s => {
      if (s.id === staffId) {
        const next = s.twoFactor === 'Enabled' ? 'Disabled' : 'Enabled';
        adminApi.staff.update(staffId, { twoFactor: next }).catch(err => console.warn('Sync staff 2fa error:', err));
        showToast(`2FA for ${s.name} set to ${next}`);
        return { ...s, twoFactor: next };
      }
      return s;
    }));
  };

  const toggleStaffStatus = (staffId: string) => {
    setStaffDirectory(prev => prev.map(s => {
      if (s.id === staffId) {
        const next = s.status === 'Active' ? 'Suspended' : 'Active';
        adminApi.staff.update(staffId, { status: next }).catch(err => console.warn('Sync staff status error:', err));
        showToast(`Staff member ${s.name} is now ${next}`);
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const deleteStaff = (staffId: string) => {
    const s = staffDirectory.find(x => x.id === staffId);
    setStaffDirectory(prev => prev.filter(x => x.id !== staffId));
    adminApi.staff.delete(staffId).catch(err => console.warn('Sync staff.delete error:', err));
    showToast(`Staff member "${s?.name || ''}" removed`, 'warning');
  };

  const inviteStaff = (staffData: { name: string; email: string; role: StaffMember['role']; roleSubtitle: string }) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `st-${Date.now()}`,
      lastActive: 'Invitation sent today',
      twoFactor: 'Disabled',
      status: 'Invited'
    };
    setStaffDirectory(prev => [...prev, newStaff]);
    adminApi.staff.create(newStaff).catch(err => console.warn('Sync staff.create error:', err));
    showToast(`Invitation sent to ${newStaff.email}`);
  };

  const togglePermission = (role: string, moduleName: string) => {
    setPermissionsMatrix(prev => {
      const currentRolePerms = prev[role] || {};
      const updated = {
        ...prev,
        [role]: {
          ...currentRolePerms,
          [moduleName]: !currentRolePerms[moduleName]
        }
      };
      showToast(`Permission [${moduleName}] for ${role} toggled`);
      return updated;
    });
  };

  // --- SETTINGS MUTATIONS ---
  const saveSettings = () => {
    localStorage.setItem('cf_storeName', storeName);
    localStorage.setItem('cf_supportEmail', supportEmail);
    localStorage.setItem('cf_phone', phone);
    localStorage.setItem('cf_address', address);
    localStorage.setItem('cf_domain', domain);
    localStorage.setItem('cf_openingTime', openingTime);
    localStorage.setItem('cf_closingTime', closingTime);
    localStorage.setItem('cf_isAcceptingOrders', String(isAcceptingOrders));
    localStorage.setItem('cf_minOrderLkr', minOrderLkr);
    localStorage.setItem('cf_freeDeliveryAboveLkr', freeDeliveryAboveLkr);
    showToast('Store settings saved successfully to persistent storage!');
  };

  const updateDeliveryZone = (zone: DeliveryZone) => {
    setDeliveryZones(prev => prev.map(z => z.id === zone.id ? zone : z));
    adminApi.deliveryZones.update(zone.id, zone).catch(err => console.warn('Sync deliveryZones.update error:', err));
    showToast(`Zone "${zone.zone}" fee updated to LKR ${zone.fee}`);
  };

  const addDeliveryZone = (zoneData: Omit<DeliveryZone, 'id'>) => {
    const newZone: DeliveryZone = {
      ...zoneData,
      id: `z-${Date.now()}`
    };
    setDeliveryZones(prev => [...prev, newZone]);
    adminApi.deliveryZones.create(newZone).catch(err => console.warn('Sync deliveryZones.create error:', err));
    showToast(`Delivery zone "${newZone.zone}" added`);
  };

  const deleteDeliveryZone = (zoneId: string) => {
    const z = deliveryZones.find(x => x.id === zoneId);
    setDeliveryZones(prev => prev.filter(x => x.id !== zoneId));
    adminApi.deliveryZones.delete(zoneId).catch(err => console.warn('Sync deliveryZones.delete error:', err));
    showToast(`Delivery zone "${z?.zone || ''}" removed`, 'warning');
  };

  const toggleDeliveryZoneStatus = (zoneId: string) => {
    setDeliveryZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const next = z.status === 'Enabled' ? 'Disabled' : 'Enabled';
        adminApi.deliveryZones.update(zoneId, { status: next }).catch(err => console.warn('Sync zone status error:', err));
        showToast(`Zone "${z.zone}" set to ${next}`);
        return { ...z, status: next };
      }
      return z;
    }));
  };

  // --- REVIEWS MUTATIONS ---
  const replyReview = (reviewId: string, replyText: string) => {
    setCustomerReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: replyText } : r));
    adminApi.reviews.update(reviewId, { reply: replyText }).catch(err => console.warn('Sync review reply error:', err));
    showToast('Official store reply published!');
  };

  const toggleReviewPublish = (reviewId: string) => {
    setCustomerReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        const next = !r.isPublished;
        adminApi.reviews.update(reviewId, { isPublished: next }).catch(err => console.warn('Sync review publish error:', err));
        showToast(`Review ${next ? 'published' : 'hidden'}`);
        return { ...r, isPublished: next };
      }
      return r;
    }));
  };

  const deleteReview = (reviewId: string) => {
    setCustomerReviews(prev => prev.filter(r => r.id !== reviewId));
    adminApi.reviews.delete(reviewId).catch(err => console.warn('Sync reviews.delete error:', err));
    showToast('Customer review removed', 'warning');
  };

  // --- CUSTOMER MUTATIONS ---
  const addCustomer = (customerData: Omit<CustomerAccount, 'id' | 'totalSpend' | 'totalOrders' | 'joinedDate'>) => {
    const newCustomer: CustomerAccount = {
      ...customerData,
      id: `cust-${Date.now()}`,
      totalSpend: 0,
      totalOrders: 0,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setCustomers(prev => [newCustomer, ...prev]);
    adminApi.customers.create(newCustomer).catch(err => console.warn('Sync customers.create error:', err));
    showToast(`Customer "${newCustomer.name}" added successfully`);
  };

  const updateCustomerTier = (customerId: string, newTier: CustomerAccount['loyaltyTier']) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, loyaltyTier: newTier } : c));
    adminApi.customers.update(customerId, { loyaltyTier: newTier }).catch(err => console.warn('Sync customers.update error:', err));
    showToast(`Customer loyalty tier upgraded to ${newTier}`);
  };

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const next = c.status === 'Active' ? 'Suspended' : 'Active';
        adminApi.customers.update(customerId, { status: next }).catch(err => console.warn('Sync customers.update error:', err));
        showToast(`Customer account is now ${next}`);
        return { ...c, status: next };
      }
      return c;
    }));
  };

  const deleteCustomer = (customerId: string) => {
    const c = customers.find(x => x.id === customerId);
    setCustomers(prev => prev.filter(x => x.id !== customerId));
    adminApi.customers.delete(customerId).catch(err => console.warn('Sync customers.delete error:', err));
    showToast(`Customer "${c?.name || ''}" removed`, 'warning');
  };

  // --- CSV EXPORTERS ---
  const exportOrdersCsv = () => {
    const headers = ['Order Number', 'Customer Name', 'Phone', 'Address', 'Status', 'Payment', 'Total LKR', 'Date'];
    const rows = orders.map(o => [
      `"${o.orderNumber}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerAddress}"`,
      `"${o.status}"`,
      `"${o.paymentStatus}"`,
      `"${o.totalAmount}"`,
      `"${o.placedAt}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(csvContent, 'ceylonfoods_orders_register.csv', 'text/csv');
    showToast('Orders export downloaded (CSV)');
  };

  const exportProductsCsv = () => {
    const headers = ['SKU', 'Title', 'Category', 'Brand', 'Price LKR', 'Stock Units', 'Status'];
    const rows = products.map(p => [
      `"${p.sku}"`,
      `"${p.title}"`,
      `"${p.category}"`,
      `"${p.brand}"`,
      `"${p.price}"`,
      `"${p.stock}"`,
      `"${p.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(csvContent, 'ceylonfoods_products_catalog.csv', 'text/csv');
    showToast('Products catalog downloaded (CSV)');
  };

  const exportReportsCsv = () => {
    const headers = ['Category', 'Products Count', 'Stock Units', 'Total Retail Value (LKR)'];
    const rows = categories.map(c => {
      const prodsInCat = products.filter(p => p.category === c.name);
      const stock = prodsInCat.reduce((sum, p) => sum + p.stock, 0);
      const val = prodsInCat.reduce((sum, p) => sum + (p.price * p.stock), 0);
      return [`"${c.name}"`, `"${prodsInCat.length}"`, `"${stock}"`, `"${val}"`];
    });
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(csvContent, 'ceylonfoods_business_report.csv', 'text/csv');
    showToast('Business report downloaded (CSV)');
  };

  return {
    updateOrderStatus,
    updateOrderPayment,
    assignOrderRider,
    dispatchCourier,
    deleteOrder,
    printOrderInvoice,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    adjustProductStock,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryVisibility,
    assignDelivery,
    markDeliveryStatus,
    toggleRiderDuty,
    addRider,
    deleteRider,
    togglePromoStatus,
    createPromo,
    updatePromo,
    deletePromo,
    copyPromoCode,
    updateStaffRole,
    toggleStaff2FA,
    toggleStaffStatus,
    deleteStaff,
    inviteStaff,
    togglePermission,
    saveSettings,
    updateDeliveryZone,
    addDeliveryZone,
    deleteDeliveryZone,
    toggleDeliveryZoneStatus,
    replyReview,
    toggleReviewPublish,
    deleteReview,
    addCustomer,
    updateCustomerTier,
    toggleCustomerStatus,
    deleteCustomer,
    exportOrdersCsv,
    exportProductsCsv,
    exportReportsCsv
  };
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
