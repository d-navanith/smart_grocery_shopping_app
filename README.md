# 🛒 Ceylon Foods — Authentic Sri Lankan Online Supermarket & Operations Platform

An omnichannel, high-performance grocery platform built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Express**, delivering genuine Ceylon staples, fresh tropical produce, heirloom rice, and aromatic spices directly from Sri Lanka.

Featuring the **Ceylon Foods** design system, authentic Sri Lankan products, multi-currency support (Lei / LKR), real-time order tracking, and a comprehensive 12-module administrative management cockpit.

---

## 📸 Screenshots & Visual Previews (Captured from Live System)

### 🛍️ Part 1: Customer Supermarket Experience

#### ✨ 1. Interactive Welcome Splash Screen (Keells-Inspired Cultural Onboarding)
![Ceylon Foods Supermarket Splash Screen](screenshots/01_ceylonfoods_splash_screen.png)

#### 🛒 2. Customer Supermarket Storefront (Light Theme — Authentic Ceylon Foods Home Page)
![Ceylon Foods Customer Storefront Light](screenshots/02_ceylonfoods_storefront_home.png)

#### 🌾 3. Filtered Grocery Catalog with Instant Category Tabs
![Ceylon Foods Grocery Catalog](screenshots/03_ceylonfoods_shop_catalog.png)

#### 🇱🇰 4. Dedicated About Us Page (Island Heritage & Direct Sourcing Story)
![Ceylon Foods About Us Page](screenshots/04_ceylonfoods_about_us.png)

#### 📞 5. Dedicated Contact Us Page (Distribution Store & Direct Inquiries)
![Ceylon Foods Contact Us Page](screenshots/05_ceylonfoods_contact_us.png)

#### 🛍️ 6. Shopping Cart Drawer & Checkout (Delivery Logistics & Promo Engine)
![Ceylon Foods Cart & Checkout](screenshots/06_ceylonfoods_cart_checkout.png)

#### 🚚 7. Real-Time 4-Stage Visual Order Tracking
![Ceylon Foods Live Order Tracking](screenshots/07_ceylonfoods_order_tracking.png)

#### 📦 8. Customer "My Deliveries" Dashboard & Order History
![Ceylon Foods Deliveries Dashboard](screenshots/08_ceylonfoods_deliveries_view.png)

#### 🌙 9. Customer OLED Dark Mode
![Ceylon Foods Storefront Dark Mode](screenshots/09_ceylonfoods_storefront_dark.png)

---

### 🖥️ Part 2: Operations & Admin Management Cockpit

#### 🔐 10. Operations Authentication Portal
![Ceylon Foods Admin Login Portal](screenshots/10_ceylonfoods_admin_login.png)

#### 📈 11. Operations Dashboard (Sales Analytics, Donut Order Breakdown & Quick Actions)
![Ceylon Foods Operations Dashboard](screenshots/11_ceylonfoods_admin_dashboard.png)

#### 📋 12. Order Management & Fulfillment Register (Pipeline Tracking)
![Ceylon Foods Order Management](screenshots/12_ceylonfoods_admin_orders.png)

#### 🏷️ 13. Products Catalog Management Cockpit (Pricing, Stock & Availability)
![Ceylon Foods Admin Products Cockpit](screenshots/13_ceylonfoods_admin_products.png)

#### 🗂️ 14. Catalog Organisation & Visual Photographic Aisles
![Ceylon Foods Catalog Organisation](screenshots/14_ceylonfoods_admin_categories.png)

#### 📦 15. Stock Control & Warehouse Inventory Management (Low Stock & Quick Restock)
![Ceylon Foods Admin Inventory Management](screenshots/15_ceylonfoods_admin_inventory.png)

#### 🚚 16. Last-Mile Deliveries & Rider Operations (Dispatch & Rider Assignment)
![Ceylon Foods Deliveries Operations](screenshots/16_ceylonfoods_admin_deliveries.png)

#### 🎟️ 17. Promotions & Campaign Vouchers (Active Codes & Rule Toggles)
![Ceylon Foods Promotions & Vouchers](screenshots/17_ceylonfoods_admin_promotions.png)

#### 📊 18. Business Intelligence & Revenue Insights (Net Sales, AOV & Retention)
![Ceylon Foods Business Intelligence & Reports](screenshots/18_ceylonfoods_admin_reports.png)

#### 👥 19. Staff Management & Role-Based Access Control (2FA & Permission Matrix)
![Ceylon Foods Staff & Permissions](screenshots/19_ceylonfoods_admin_staff.png)

#### ⚙️ 20. Store Settings & Regional Configuration (VAT, Currencies & Zones)
![Ceylon Foods Store Configuration & Settings](screenshots/20_ceylonfoods_admin_settings.png)

#### ⭐ 21. Customer Reviews & Sentiment Cockpit (Ratings & Moderation)
![Ceylon Foods Customer Reviews Cockpit](screenshots/21_ceylonfoods_admin_reviews.png)

#### 🤝 22. Customer CRM Directory & Loyalty Tiers (Platinum, Gold, Silver, Bronze)
![Ceylon Foods Customer Loyalty Directory](screenshots/22_ceylonfoods_admin_customers.png)

---

## 🌟 Newly Added Features & Key Enhancements

### 1. 🎬 Interactive Supermarket Welcome Splash Screen
- **Keells-Inspired Design:** Smooth loading sequence featuring the Ceylon Foods emblem, multilingual greeting (`ආයුබෝවන් • வணக்கம் • Welcome`), animated progress indicator, and instant "Enter Supermarket" / "Skip" shortcuts.
- **Session Memory:** Only displays on initial session arrival, with full manual access anytime via the footer.

### 2. 🏛️ Dedicated About Us & Contact Us Pages
- **About Us ([`AboutUsView.tsx`](client/src/components/AboutUsView.tsx)):** Authentic story of direct island sourcing from Colombo, Jaffna, Kandy, and Galle; 4 pillars of consumer trust (100% Genuine, Same-Day Dispatch, 5,000+ Community Shoppers, Cash on Delivery Guarantee); and quality commitment.
- **Contact Us ([`ContactView.tsx`](client/src/components/ContactView.tsx)):** Distribution store address, direct telephone hotlines, operating hours (09:00 - 20:00, 7 days/week), interactive inquiry contact form, and delivery guarantees.
- **Clean Sourcing:** Free of third-party external references, strictly focused on the store's direct channels.

### 3. 🏷️ Modern Grocery Catalog with Instant Category Tabs
- **Horizontal Filter Tabs:** Instant 1-click filtering above the catalog:
  - `RICE & GRAINS` • `VEGGIES` • `FRUITS` • `CEYLON SPICES` • `OTHERS`
- **Sidebar Categories Checkbox List:** Synchronized categories with live item counts:
  - `All Products (17)`
  - `White Rice, Red Rice & Dhal (3)`
  - `Brinjal & Fresh Vegetables (6)`
  - `Tropical Fruits (Papaya & Mango) (2)`
  - `Ceylon Spices & Coconut (3)`
- **Dynamic Product Card Controls:**
  - One-click `[Add 🛒]` pill button for items not yet in cart.
  - Interactive `[- 1 +]` quantity stepper directly on the card for items in cart.
  - Authenticity badge: `🇱🇰 Ceylon Sourced` on every authentic island product.

### 4. 🖱️ Frictionless Outside-Click Dismissal (UX Upgrade)
- Live search dropdown automatically closes when clicking anywhere outside the search container.
- Sign In / Authentication modal closes when clicking the backdrop overlay.
- Product quick-view modal, Onboarding tour, and Order Tracking modal dismiss on backdrop click with event propagation protection.

### 5. 🚚 Live 4-Stage Fulfillment & Order Tracking
- Real-time status progression: `Order Placed` ➔ `Accepted` ➔ `On the Way` ➔ `Delivered`.
- Dedicated **"Track Your Order"** page with order search by number or phone, interactive order timeline, item breakdown, and courier dispatch notes.
- **"My Deliveries"** dashboard tracking ongoing dispatches and historical order receipts with 1-click reordering.

### 6. 🚀 MonsterASP.NET Deployment Engine
- Production packaging script (`node scripts/package-monsterasp.js`) that compiles client, admin, and server, configures `web.config` with IIS `iisnode` rewrite rules, and generates a standalone `deploy_monsterasp.zip` ready for one-click upload.

---

## 🏗️ Project Architecture

```
smart_grocery_shopping_app/
├── client/                      # Customer Web Store (React + Vite + Tailwind CSS)
│   ├── public/                  # Brand assets, favicon, SVGs, product imagery
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutUsView.tsx   # Dedicated About Us page
│   │   │   ├── ContactView.tsx   # Dedicated Contact Us page
│   │   │   ├── HeaderNav.tsx     # Primary nav, search & outside-click handling
│   │   │   ├── HomeView.tsx       # Landing page, brand marquee & categories
│   │   │   ├── ShopView.tsx       # Product catalog, tabs & sidebar filters
│   │   │   ├── SplashScreen.tsx   # Supermarket welcome splash screen
│   │   │   ├── TrackOrderView.tsx # 4-stage visual order tracker
│   │   │   ├── DeliveriesView.tsx # My Deliveries dashboard
│   │   │   └── Modals.tsx         # Auth, quick view & tracking dialogs
│   │   ├── App.tsx              # Root router, cart state & theme provider
│   │   ├── initialProducts.ts   # Authentic Sri Lankan product catalog
│   │   └── translations.ts      # Multi-language dictionary (EN, SI, RO)
│   └── package.json
├── admin/                       # Operations Management Cockpit (React + Vite)
│   ├── src/
│   │   ├── App.tsx              # 12 operations modules & dashboards
│   │   └── main.tsx
│   └── package.json
├── server/                      # Backend REST API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── index.ts             # Express routes, auth & fulfillment APIs
│   │   └── mockStore.ts         # Persistent data layer & product catalog
│   └── package.json
├── shared/                      # Shared TypeScript data models
│   └── src/index.ts
├── screenshots/                 # 22 live application preview screenshots
├── scripts/
│   ├── package-monsterasp.js    # One-click deployment packaging script
│   └── capture_readme_screenshots.ps1 # Headless screenshot automation
├── package.json                 # Root npm workspaces runner
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### 2. Installation
Clone the repository and install all workspace dependencies from the root directory:
```bash
git clone https://github.com/d-navanith/smart_grocery_shopping_app.git
cd smart_grocery_shopping_app
npm install
```

### 3. Run Development Servers
Start client, admin, and backend concurrently with a single command:
```bash
npm run dev
```

| Service | Local URL | Description | Default Credentials |
| :--- | :--- | :--- | :--- |
| **Customer Store** | `http://localhost:3000` | Customer Web App & Catalog | Register or login with `customer@ceylonfoods.ro` / `password123` |
| **Admin Cockpit** | `http://localhost:3001` | Operations & Fulfillment Portal | `admin@ceylonfoods.lk` / `admin123` |
| **REST API Server** | `http://localhost:5000` | Backend REST API & Services | N/A |

---

## 🔐 Default Credentials

| Portal | URL | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin Cockpit** | `http://localhost:3001` | `admin@ceylonfoods.lk` | `admin123` |
| **Customer Store (Demo)** | `http://localhost:3000` | `customer@ceylonfoods.ro` | `password123` |

*(Customers can also create an account via the Sign Up form at any time, which automatically unlocks the customer delivery tracking dashboard and personalized order history!)*

---

## 🎨 Cultural Design Tokens & Branding
- **Primary Brand Green:** `#064F41`
- **Secondary Sage Green:** `#15875D`
- **Ceylon Sun Gold:** `#F8C519`
- **Accent Orange:** `#FF632B` / `#F96D26`
- **Light Cream Background:** `#F6F8F7` / `#F2F7F4`
- **OLED Dark Mode:** `#0E1E17` / `#0D1210`

---

## 📦 Production Build & Deployment

To create a self-contained production bundle for MonsterASP.NET or IIS hosting:
```bash
node scripts/package-monsterasp.js
```
This generates:
- `deploy_monsterasp/` directory with compiled client, admin, server, and IIS `web.config`.
- `deploy_monsterasp.zip` ready for one-click upload.

---

## 📄 License
This project is open-source under the MIT License.
