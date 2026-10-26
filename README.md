# 🛒 Ceylon Foods — Sri Lanka Online Supermarket & Operations Platform

An AI-powered, omnichannel supermarket platform tailored for Sri Lankan customers, built with React, Vite, TypeScript, Tailwind CSS, Express, and modern monorepo workspaces.

Featuring the **Ceylon Foods** cultural design system, authentic Sri Lankan rupee (`Rs.` / `LKR`) grocery pricing, iconic local FMCG brands (Dilmah, Highland, Munchee, Maliban, MD, Bairaha, Araliya), and full Colombo & Greater Suburbs delivery logistics alongside a secure operations management portal.

---

## 📸 Screenshots & Visual Previews (Captured from Live System)

### 🛒 1. Customer Supermarket Storefront (Light Theme — Authentic Ceylon Foods Home Page)
![Ceylon Foods Customer Storefront Light](screenshots/01_ceylonfoods_customer_store_light.png)

### ✨ 2. Cultural Splash Screen (˗ˏˋ ආයුබෝවන්.! ˎˊ˗ — Sigiriya & Island Harvest Vista)
![Ceylon Foods Splash Screen](screenshots/02_ceylonfoods_splash_onboarding.png)

### 🌙 3. Customer OLED Dark Mode
![Ceylon Foods Storefront Dark](screenshots/03_ceylonfoods_customer_dark_mode.png)

### 🔐 4. Ceylon Foods Operations Authentication Portal
![Ceylon Foods Admin Login Portal](screenshots/04_ceylonfoods_admin_login.png)

### 📈 5. Ceylon Foods Operations Dashboard (Sales LKR 8.46M, Donut Order Health & Trends)
![Ceylon Foods Operations Dashboard](screenshots/05_ceylonfoods_admin_dashboard.png)

### 📦 6. Stock Control & Inventory Management (Tracked, In Stock, Low Stock, Shortage Alerts)
![Ceylon Foods Admin Inventory Management](screenshots/06_ceylonfoods_admin_inventory_stock.png)

### 📋 7. Order Management & Fulfillment Register (All Orders, Processing, Dispatched)
![Ceylon Foods Order Management](screenshots/07_ceylonfoods_admin_orders.png)

### 🏷️ 8. Products Catalog Management (Availability Statuses, Pricing, Categories)
![Ceylon Foods Admin Products Cockpit](screenshots/05_ceylonfoods_admin_products_cockpit.png)

### 🗂️ 9. Catalog Organisation & Visual Categories (Photographic Aisles & Display Orders)
![Ceylon Foods Catalog Organisation](screenshots/08_ceylonfoods_admin_categories.png)

---

## 🌟 Key Features

### 📱 1. Customer Shopping Web App (`@supermarket/client` — Port `3000`)
- **Cultural Branding & Logo:** Authentic Ceylon Foods island emblem with tea plantations, coconut palms, dagoba silhouette, ocean waves, and harvest basket.
- **Sri Lankan Rupee (`Rs.` / `LKR`) Pricing:** Real-world supermarket pricing across all aisles matching leading Sri Lankan supermarket chains (Cargills, Keells, SPAR Sri Lanka, Arpico).
- **Splash Screen & 4-Step Onboarding Walkthrough:**
  - *"Ayubowan! සාදරයෙන් පිළිගනිමු — Sri Lanka Online Supermarket"*
  - Farm-fresh guarantee from Dambulla, Nuwara Eliya & Ambewela
  - Smart AI recipes with 1-tap cart bundling
  - Real-time live GPS courier tracking across Colombo zones
  - Dietary preferences & **Rs. 500 OFF** welcome coupon (`AYUBOWAN`)
- **Full Supermarket Catalog Across 8 Aisles:**
  - Fruits & Vegetables (Dambulla red onions, Nuwara Eliya leeks & carrots, Thambili king coconut, Gotukola)
  - Dairy & Eggs (Highland fresh milk, Ambewela curd, Kotmale cheddar, Bairaha farm eggs)
  - Bakery (Woodfired crispy roast paan, fresh pol roti, fish patties, croissants)
  - Meat & Fresh Seafood (Mirissa Yellowfin Tuna Kelawalla, Negombo lagoon prawns, Bairaha chicken breast)
  - Staples & Grains (Araliya Keeri Samba 5kg, Rathu Kakulu red raw rice, Mysore red dhal, virgin coconut oil, pure Ceylon cinnamon)
  - Beverages (Dilmah Ceylon BOPF tea, Elephant House Ginger Beer EGB, Nestlé Milo)
  - Snacks & Delicacies (Pure Kithul treacle, Munchee Super Cream Crackers, Maliban Lemon Puffs, jumbo cashews)
  - Household & Cleaning (Sunlight lemon dishwash, Dettol antiseptic)
- **AI Culinary Concierge ("CeylonBot"):** Curates authentic Sri Lankan recipes (Ceylon Black Pepper Chicken Curry & Keeri Samba, Traditional Parippu & Pol Sambol with Roast Paan) with 1-click cart bundling.
- **Portion Weight Selector:** Custom weights for fresh produce (`250g`, `500g`, `1kg`, `2kg`).
- **Colombo Delivery Slots & Payment Methods:**
  - 45-Min Colombo Express, Today Afternoon, Evening, Night, Tomorrow Free Delivery
  - LankaQR / Online Cards (Visa/Mastercard/Amex), Card on Delivery (mPOS), Cash on Delivery (LKR)
- **Dual-Theme Support:** Clean Coconut-White Light Mode and OLED Dark Mode (`#0D0D0D`).

---

### 🖥️ 2. Admin & Operations Cockpit (`@supermarket/admin` — Port `3001`)
- **Strict Security Gate:** Complete isolation from customer web views. Protected by an administrative authentication barrier (`admin@ceylonfoods.lk` / `admin123`).
- **Products Catalog Table:** Real-time search, "Show 50" dropdown selector, interactive Calendar popup, Add Product modal, View Details drawer, Edit Product form, and Delete actions.
- **Warehouse Inventory & Stock Alerts:** Real-time low-stock (<30 units) and out-of-stock monitor with instant **+25**, **+50**, and **+100** 1-click restock actions.
- **Customer Directory & Loyalty:** Shopper accounts, lifetime spend in Rs., order history, tier badges (Platinum, Gold, Silver, Bronze), and account suspend/activate toggles.
- **Promotions & Campaign Vouchers:** Manage discount vouchers (`CEYLON20`, `FREEDELIVERY`, `VILLAGE15`, `AYUBOWAN`), redemption limit meters, and campaign creation.
- **Courier Fleet & Live Dispatch:** Delivery rider roster with vehicle types, Colombo zone coverage (Zone A - Colombo Central, Zone B - Colombo South, Zone C - Bulk & Chilled), live ratings, and 1-click pending order assignment.
- **Operational Dashboard:** Weekly supermarket volume bar chart, KPI metric tiles, and recent orders stream.

---

### ⚙️ 3. Backend REST API (`@supermarket/server` — Port `5000`)
- Express + TypeScript REST API.
- Customer authentication & registration endpoints.
- Admin authentication gateway (`admin@ceylonfoods.lk`).
- Product CRUD & warehouse inventory restock endpoints.
- Order placement, delivery status stepper, and rider assignment.
- Promotions management and CeylonBot AI culinary assistant service.

---

## 🏗️ Project Architecture

```
smart_grocery_shopping_app/
├── client/              # Customer Web Store (React + Vite + Tailwind)
│   ├── public/
│   │   └── ceylon_foods_logo.png
│   ├── src/
│   │   ├── App.tsx      # Full e-commerce customer experience & splash
│   │   └── main.tsx
│   └── package.json
├── admin/               # Operations Cockpit (React + Vite + Tailwind)
│   ├── public/
│   │   └── ceylon_foods_logo.png
│   ├── src/
│   │   ├── App.tsx      # Admin dashboard, products, inventory, riders, vouchers
│   │   └── main.tsx
│   └── package.json
├── server/              # Backend REST API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── index.ts     # Express routes and controllers
│   │   └── mockStore.ts # Comprehensive Sri Lankan supermarket catalog & mock dataset
│   └── package.json
├── shared/              # Shared TypeScript definitions & models
│   └── src/index.ts
├── package.json         # Root npm workspaces runner
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

| Service | Local URL | Default Credentials (if applicable) |
| :--- | :--- | :--- |
| **Customer Store** | `http://localhost:3000` | Register or login with `brie@example.com` / `password123` |
| **Admin Cockpit** | `http://localhost:3001` | `admin@ceylonfoods.lk` / `admin123` |
| **REST API Server** | `http://localhost:5000` | N/A |

---

## 🔐 Default Credentials

| Portal | URL | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin Cockpit** | `http://localhost:3001` | `admin@ceylonfoods.lk` | `admin123` |
| **Customer Store (Demo)** | `http://localhost:3000` | `brie@example.com` | `password123` |

*(Customers can also create a new account via the Sign Up form at any time, which automatically launches the Sri Lankan cultural splash screen and onboarding walkthrough!)*

---

## 🎨 Cultural Design Tokens & Branding
- **Ceylon Tea Green:** `#0C6237` / `#08542E`
- **Tropical Saffron Orange:** `#FF6515` / `#F05A22`
- **Indian Ocean Azure:** `#0284C7`
- **Electric Mint Accent:** `#78F9B8`
- **Golden Sun:** `#F59E0B`
- **OLED Night:** `#0D0D0D`
- **Coconut Cream White:** `#F8FAF9`

---

## 📄 License
This project is open-source under the MIT License.
