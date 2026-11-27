import React, { useState } from 'react';
import officialLogo from './assets/ceylon_foods_official_logo.png';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAdminCockpitState } from './components/part3_state_and_handlers';
import { createMutations } from './components/part4_mutations';
import { Sidebar, Header, ToastBanner } from './components/part5_header_sidebar';
import { DashboardView } from './components/view_dashboard';
import { OrdersView } from './components/view_orders';
import { ProductsView } from './components/view_products';
import { CategoriesView } from './components/view_categories';
import { InventoryView } from './components/view_inventory';
import { DeliveriesView } from './components/view_deliveries';
import { PromotionsView } from './components/view_promotions';
import { ReportsView } from './components/view_reports';
import { StaffView } from './components/view_staff';
import { SettingsView } from './components/view_settings';
import { ReviewsView, CustomersView } from './components/view_reviews_and_customers';
import { SuperAdminView } from './components/view_super_admin';
import {
  OrderDetailDrawer,
  EditProductModal,
  AddProductModal,
  EditCategoryModal,
  AddCategoryModal,
  AdjustStockModal,
  AssignDeliveryModal,
  AddRiderModal,
  CreatePromoModal,
  InviteStaffModal,
  EditDeliveryZoneModal,
  AddDeliveryZoneModal,
  CustomerProfileDrawer,
  CourierDispatchModal
} from './components/all_modals';

export default function AdminApp() {
  const state = useAdminCockpitState();
  const mut = createMutations(state);

  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('ceylonfoods_is_superadmin') === 'true';
  });

  const isSystemAdminLocked = typeof window !== 'undefined' && localStorage.getItem('ceylonfoods_sys_admin_active') === 'false';

  // Authentication submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    state.setLoginLoading(true);
    state.setLoginError('');

    setTimeout(() => {
      if (
        (state.loginEmail === 'superadmin@developer.com' || state.loginEmail === 'superadmin') &&
        (state.loginPassword === 'developer123' || state.loginPassword === 'superadmin123' || state.loginPassword === 'developer_killswitch_2026')
      ) {
        state.setIsAuthenticated(true);
        setIsSuperAdmin(true);
        localStorage.setItem('ceylonfoods_admin_auth', 'true');
        localStorage.setItem('ceylonfoods_is_superadmin', 'true');
        state.setActiveMenu('super-admin');
        state.showToast('Signed in as Super Administrator / Developer.', 'success');
      } else if (
        (state.loginEmail === 'admin@ceylonfoods.lk' || state.loginEmail === 'admin@freshcart.lk' || state.loginEmail === 'admin@metrocery.lk' || state.loginEmail === 'admin') &&
        state.loginPassword === 'admin123'
      ) {
        if (isSystemAdminLocked) {
          state.setLoginError('Administrative access suspended. License payment pending.');
          state.setLoginLoading(false);
          return;
        }
        state.setIsAuthenticated(true);
        setIsSuperAdmin(false);
        localStorage.setItem('ceylonfoods_admin_auth', 'true');
        localStorage.removeItem('ceylonfoods_is_superadmin');
        state.showToast('Welcome back, Jecob! Signed in to Operations Portal.');
      } else {
        state.setLoginError('Invalid credentials. Use admin@ceylonfoods.lk and password admin123');
      }
      state.setLoginLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    state.setIsAuthenticated(false);
    setIsSuperAdmin(false);
    localStorage.removeItem('ceylonfoods_admin_auth');
    localStorage.removeItem('ceylonfoods_is_superadmin');
    state.showToast('You have been signed out safely.', 'info');
  };

  // If System is locked by Developer and user is not superadmin
  if (isSystemAdminLocked && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl border border-red-500/40 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Admin Operations Locked</h2>
            <p className="text-xs text-slate-300">
              Administrative access to Ceylon Foods portal has been suspended pending platform licensing fee settlement.
            </p>
            <p className="text-[11px] text-red-400 font-mono">
              Status: PLATFORM_LICENSE_PENDING
            </p>
          </div>
          <button
            onClick={() => {
              const pass = prompt('Enter Developer / Super Admin Master Passkey (developer123):');
              if (pass === 'developer123' || pass === 'superadmin123' || pass === 'developer_killswitch_2026') {
                localStorage.setItem('ceylonfoods_sys_admin_active', 'true');
                localStorage.setItem('ceylonfoods_is_superadmin', 'true');
                window.location.reload();
              } else if (pass) {
                alert('Invalid master passkey.');
              }
            }}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition"
          >
            Developer Master Unlock
          </button>
        </div>
      </div>
    );
  }

  // If unauthenticated, show official Ceylon Foods administrative sign in gate
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <img
              src={officialLogo}
              alt="Ceylon Foods"
              className="w-48 h-auto mx-auto object-contain mb-1"
            />
            <p className="text-xs text-slate-500 font-medium">
              Administrative & Fulfillment Operations Portal
            </p>
          </div>

          {state.loginError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={state.loginEmail}
                  onChange={(e) => state.setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#0C4E3B]"
                  placeholder="admin@ceylonfoods.lk"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={state.loginPassword}
                  onChange={(e) => state.setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#0C4E3B]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state.loginLoading}
              className="w-full py-3 rounded-xl bg-[#0C4E3B] hover:bg-[#083b2d] text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <span>{state.loginLoading ? 'Authenticating...' : 'Sign in to Operations'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unassignedDeliveriesCount = state.deliveriesList.filter(d => d.status === 'Unassigned').length;
  const lowStockCount = state.products.filter(p => p.stock < 30).length;

  return (
    <div className="flex min-h-screen bg-[#F8FAF9] text-slate-800 font-sans selection:bg-[#E6F7EF] selection:text-[#0C6237]">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeMenu={state.activeMenu}
        setActiveMenu={state.setActiveMenu}
        ordersCount={state.orders.length}
        unassignedDeliveriesCount={unassignedDeliveriesCount}
        lowStockCount={lowStockCount}
        onLogout={handleLogout}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeMenu={state.activeMenu}
          searchTerm={state.searchTerm}
          setSearchTerm={state.setSearchTerm}
          isBackendConnected={state.isBackendConnected}
        />

        <main className="p-8 w-full flex-1 min-w-0">
          {state.activeMenu === 'dashboard' && (
            <DashboardView
              orders={state.orders}
              products={state.products}
              categories={state.categories}
              onOpenOrder={(o) => state.setSelectedOrderForDetail(o)}
              onOpenDispatchModal={(o) => state.setDispatchingOrder(o)}
              onNavigateTab={(tab) => state.setActiveMenu(tab)}
              onExportCsv={mut.exportOrdersCsv}
              onOpenCreateOrder={() => state.setActiveMenu('orders')}
            />
          )}

          {state.activeMenu === 'orders' && (
            <OrdersView
              orders={state.orders}
              ordersTab={state.ordersTab}
              setOrdersTab={state.setOrdersTab}
              orderPaymentFilter={state.orderPaymentFilter}
              setOrderPaymentFilter={state.setOrderPaymentFilter}
              onOpenOrder={(o) => state.setSelectedOrderForDetail(o)}
              onOpenDispatchModal={(o) => state.setDispatchingOrder(o)}
              onUpdateStatus={mut.updateOrderStatus}
              onUpdatePayment={mut.updateOrderPayment}
              onPrintInvoice={mut.printOrderInvoice}
              onDeleteOrder={mut.deleteOrder}
              onExportCsv={mut.exportOrdersCsv}
            />
          )}

          {state.activeMenu === 'products' && (
            <ProductsView
              products={state.products}
              categories={state.categories}
              productsTab={state.productsTab}
              setProductsTab={state.setProductsTab}
              productCategoryFilter={state.productCategoryFilter}
              setProductCategoryFilter={state.setProductCategoryFilter}
              onOpenAddModal={() => state.setIsAddProductModalOpen(true)}
              onOpenEditModal={(p) => state.setEditingProduct(p)}
              onDeleteProduct={mut.deleteProduct}
              onToggleStatus={mut.toggleProductStatus}
              onQuickStockAdjust={(id, delta) => mut.adjustProductStock(id, delta)}
              onExportCsv={mut.exportProductsCsv}
            />
          )}

          {state.activeMenu === 'categories' && (
            <CategoriesView
              categories={state.categories}
              onOpenAddModal={() => state.setIsAddCategoryModalOpen(true)}
              onOpenEditModal={(c) => state.setEditingCategory(c)}
              onDeleteCategory={mut.deleteCategory}
              onToggleVisibility={mut.toggleCategoryVisibility}
            />
          )}

          {state.activeMenu === 'promotions' && (
            <PromotionsView
              promotions={state.promotionsRegister}
              promotionsTab={state.promotionsTab}
              setPromotionsTab={state.setPromotionsTab}
              preventCouponStacking={state.preventCouponStacking}
              setPreventCouponStacking={state.setPreventCouponStacking}
              excludeDeliveryFees={state.excludeDeliveryFees}
              setExcludeDeliveryFees={state.setExcludeDeliveryFees}
              onOpenCreateModal={() => state.setIsCreatePromoModalOpen(true)}
              onOpenEditModal={(p) => state.setEditingPromo(p)}
              onToggleStatus={mut.togglePromoStatus}
              onDeletePromo={mut.deletePromo}
              onCopyCode={mut.copyPromoCode}
            />
          )}

          {state.activeMenu === 'inventory' && (
            <InventoryView
              products={state.products}
              stockAdjustments={state.stockAdjustments}
              inventoryTab={state.inventoryTab}
              setInventoryTab={state.setInventoryTab}
              onQuickRestock={(id, amt) => mut.adjustProductStock(id, amt, '1-Click fast restock')}
              onOpenAdjustModal={(p) => state.setAdjustingStockProduct(p)}
            />
          )}

          {state.activeMenu === 'customers' && (
            <CustomersView
              customers={state.customers}
              customerTierFilter={state.customerTierFilter}
              setCustomerTierFilter={state.setCustomerTierFilter}
              onOpenCustomerDrawer={(c) => state.setSelectedCustomerForDrawer(c)}
              onUpdateTier={mut.updateCustomerTier}
              onToggleStatus={mut.toggleCustomerStatus}
              onDeleteCustomer={mut.deleteCustomer}
            />
          )}

          {state.activeMenu === 'deliveries' && (
            <DeliveriesView
              deliveriesList={state.deliveriesList}
              riders={state.riders}
              deliveriesTab={state.deliveriesTab}
              setDeliveriesTab={state.setDeliveriesTab}
              deliveryRiderFilter={state.deliveryRiderFilter}
              setDeliveryRiderFilter={state.setDeliveryRiderFilter}
              onOpenAssignModal={(del) => {
                state.setSelectedDeliveryOrder(del);
                state.setIsAssignDeliveryModalOpen(true);
              }}
              onMarkStatus={mut.markDeliveryStatus}
              onToggleRiderDuty={mut.toggleRiderDuty}
              onOpenAddRiderModal={() => state.setIsAddRiderModalOpen(true)}
              onDeleteRider={mut.deleteRider}
            />
          )}

          {state.activeMenu === 'settings' && (
            <SettingsView
              settingsTab={state.settingsTab}
              setSettingsTab={state.setSettingsTab}
              storeName={state.storeName} setStoreName={state.setStoreName}
              supportEmail={state.supportEmail} setSupportEmail={state.setSupportEmail}
              phone={state.phone} setPhone={state.setPhone}
              address={state.address} setAddress={state.setAddress}
              domain={state.domain} setDomain={state.setDomain}
              currency={state.currency} setCurrency={state.setCurrency}
              country={state.country} setCountry={state.setCountry}
              timezone={state.timezone} setTimezone={state.setTimezone}
              openingTime={state.openingTime} setOpeningTime={state.setOpeningTime}
              closingTime={state.closingTime} setClosingTime={state.setClosingTime}
              isAcceptingOrders={state.isAcceptingOrders} setIsAcceptingOrders={state.setIsAcceptingOrders}
              minOrderLkr={state.minOrderLkr} setMinOrderLkr={state.setMinOrderLkr}
              freeDeliveryAboveLkr={state.freeDeliveryAboveLkr} setFreeDeliveryAboveLkr={state.setFreeDeliveryAboveLkr}
              sameDayCutoff={state.sameDayCutoff} setSameDayCutoff={state.setSameDayCutoff}
              deliveryWindowLength={state.deliveryWindowLength} setDeliveryWindowLength={state.setDeliveryWindowLength}
              deliveryZones={state.deliveryZones}
              onOpenEditZoneModal={(z) => state.setEditingDeliveryZone(z)}
              onOpenAddZoneModal={() => state.setIsAddDeliveryZoneModalOpen(true)}
              onDeleteZone={mut.deleteDeliveryZone}
              onToggleZoneStatus={mut.toggleDeliveryZoneStatus}
              onSaveSettings={mut.saveSettings}
            />
          )}

          {state.activeMenu === 'super-admin' && (
            <SuperAdminView onShowToast={state.showToast} />
          )}
        </main>
      </div>

      {/* 3. Global Floating Modals & Drawers */}
      <OrderDetailDrawer
        order={state.selectedOrderForDetail}
        onClose={() => state.setSelectedOrderForDetail(null)}
        onUpdateStatus={mut.updateOrderStatus}
        onUpdatePayment={mut.updateOrderPayment}
        onAssignRider={mut.assignOrderRider}
        onPrintInvoice={mut.printOrderInvoice}
        onOpenDispatchModal={(o) => state.setDispatchingOrder(o)}
        riders={state.riders}
      />

      <CourierDispatchModal
        order={state.dispatchingOrder}
        onClose={() => state.setDispatchingOrder(null)}
        onConfirmDispatch={(orderId, data) => {
          mut.dispatchCourier({ orderId, ...data });
          state.setDispatchingOrder(null);
        }}
      />

      <EditProductModal
        product={state.editingProduct}
        onClose={() => state.setEditingProduct(null)}
        onSave={mut.updateProduct}
        categories={state.categories}
      />

      <AddProductModal
        isOpen={state.isAddProductModalOpen}
        onClose={() => state.setIsAddProductModalOpen(false)}
        onAdd={mut.addProduct}
        categories={state.categories}
      />

      <EditCategoryModal
        category={state.editingCategory}
        onClose={() => state.setEditingCategory(null)}
        onSave={mut.updateCategory}
      />

      <AddCategoryModal
        isOpen={state.isAddCategoryModalOpen}
        onClose={() => state.setIsAddCategoryModalOpen(false)}
        onAdd={mut.addCategory}
      />

      <AdjustStockModal
        product={state.adjustingStockProduct}
        onClose={() => state.setAdjustingStockProduct(null)}
        onSave={mut.adjustProductStock}
      />

      <AssignDeliveryModal
        delivery={state.selectedDeliveryOrder}
        riders={state.riders}
        onClose={() => {
          state.setSelectedDeliveryOrder(null);
          state.setIsAssignDeliveryModalOpen(false);
        }}
        onAssign={mut.assignDelivery}
      />

      <AddRiderModal
        isOpen={state.isAddRiderModalOpen}
        onClose={() => state.setIsAddRiderModalOpen(false)}
        onAdd={mut.addRider}
      />

      <CreatePromoModal
        isOpen={state.isCreatePromoModalOpen}
        onClose={() => state.setIsCreatePromoModalOpen(false)}
        onCreate={mut.createPromo}
      />

      <InviteStaffModal
        isOpen={state.isInviteStaffModalOpen}
        onClose={() => state.setIsInviteStaffModalOpen(false)}
        onInvite={mut.inviteStaff}
      />

      <EditDeliveryZoneModal
        zone={state.editingDeliveryZone}
        onClose={() => state.setEditingDeliveryZone(null)}
        onSave={mut.updateDeliveryZone}
      />

      <AddDeliveryZoneModal
        isOpen={state.isAddDeliveryZoneModalOpen}
        onClose={() => state.setIsAddDeliveryZoneModalOpen(false)}
        onAdd={mut.addDeliveryZone}
      />

      <CustomerProfileDrawer
        customer={state.selectedCustomerForDrawer}
        onClose={() => state.setSelectedCustomerForDrawer(null)}
        onUpdateTier={mut.updateCustomerTier}
      />

      {/* 4. Global Action Toast */}
      <ToastBanner
        toast={state.toast}
        onClose={() => state.setToast(null)}
      />
    </div>
  );
}
