# 🛒 ExpiryIQ

### Real-World Supermarket & Retail Operations Management Platform

**ExpiryIQ** is an enterprise-grade supermarket and grocery retail management platform designed to **prevent food waste, maximize gross margin, automate inventory rotation (FEFO), and streamline multi-store supermarket operations.**

---

## 🚀 Quick Start

### 1. Run the Application

Open:

* `index.html` — Landing page
* `dashboard.html` — Main dashboard

Or serve the project using Vite:

```bash
npm run dev
```

### 2. No Backend Required

ExpiryIQ currently runs completely on the client side.

* Browser `localStorage` is used for data and state management.
* Role-Based Access Control (RBAC) is implemented client-side.
* Transaction and activity logs are maintained locally.
* Modular API adapters provide a path toward future backend integrations.

---

## 🔑 Demo Accounts

Use the following pre-seeded accounts to test different RBAC roles:

| Role                 | Email                    | Password      | Access Level                                             |
| -------------------- | ------------------------ | ------------- | -------------------------------------------------------- |
| **Store Admin**      | `admin@ecoshelf.app`     | `admin123`    | Full access across all modules, settings & audit logs    |
| **Store Manager**    | `manager@ecoshelf.app`   | `manager123`  | Management BI, Action Center, Pricing & Reports          |
| **Inventory Staff**  | `inventory@ecoshelf.app` | `staff123`    | Inventory, Receiving, Stock Reconciliation & Mobile Mode |
| **Cashier**          | `cashier@ecoshelf.app`   | `cashier123`  | POS Terminal & Sales Transactions                        |
| **Donation Manager** | `donations@ecoshelf.app` | `donation123` | Donation Pipeline & NGO Pickup Dispatch                  |

> **Note:** Active roles and stores can also be switched instantly using the **Role Switcher** and **Store Switcher** controls in the navigation bar.

---

# 📁 System Architecture

```text
public/ecoshelf/
│
├── index.html
│   └── Public marketing landing page & overview
│
├── login.html
│   └── User login page with pre-seeded demo role quick-select
│
├── signup.html
│   └── Staff registration page
│
├── dashboard.html
│   └── Main Operational Dashboard & Real-Time Risk Monitor
│
├── inventory.html
│   └── Multi-Batch SKU Inventory Engine (FEFO, Batch tracking)
│
├── add-product.html
│   └── Product/Batch intake form with live AI risk & profit preview
│
├── pos.html
│   └── Point-of-Sale Terminal & Barcode Checkout
│
├── action-center.html
│   └── Smart Action Center
│
├── stock-count.html
│   └── Physical Stock Count & Variance Reconciliation Engine
│
├── sales-history.html
│   └── POS Transaction Log, Audit Receipts & Refund Inspector
│
├── bi-dashboard.html
│   └── Multi-Store Executive BI Dashboard & Financial Metrics
│
├── suppliers.html
│   └── Supplier Directory & Quality / Waste Analytics
│
├── forecasting.html
│   └── AI Demand Forecasting & Automatic Reorder Calculator
│
├── donation.html
│   └── Operational Food Donation Pipeline & NGO Pickup Dispatch
│
├── reports.html
│   └── Comprehensive Inventory & Waste Reports with CSV Export
│
├── audit-log.html
│   └── System Security & Activity Audit Log
│
├── settings.html
│   └── Business Rules Configuration
│
├── staff-mobile.html
│   └── Handheld Floor Mode for Inventory Staff
│
├── css/
│   ├── style.css
│   │   └── Core Design System
│   │
│   └── dashboard.css
│       └── Operational app shell, dark mode & layout styling
│
└── js/
    ├── app.js
    │   └── Core Data Engine, Storage, Multi-batch CRUD, RBAC, Seeding
    │
    ├── ai.js
    │   └── Transparent AI Decision Engine
    │
    ├── navbar.js
    │   └── Navigation Bar, Role Selector & Notifications
    │
    ├── api-adapters.js
    │   └── Integration Abstraction Layer
    │
    ├── dashboard.js
    │   └── Dashboard state handlers & chart renders
    │
    ├── inventory.js
    │   └── Filterable multi-batch product list & FEFO modal
    │
    ├── add-product.js
    │   └── Batch intake & live AI profit preview
    │
    ├── pos.js
    │   └── Barcode scanner simulator, cart & checkout handler
    │
    ├── action-center.js
    │   └── Smart Action Center 1-click batch execution
    │
    ├── stock-count.js
    │   └── Stock reconciliation & history recorder
    │
    ├── sales-history.js
    │   └── POS transaction renderer & receipt modal
    │
    ├── bi-dashboard.js
    │   └── Executive financial metrics & SVG charts
    │
    ├── suppliers.js
    │   └── Supplier scorecards & defect tracking
    │
    ├── forecasting.js
    │   └── Statistical demand forecasting & reorder points
    │
    ├── reports.js
    │   └── CSV exporter & tabular report renderer
    │
    ├── audit-log.js
    │   └── Audit log renderer & event filter
    │
    ├── settings.js
    │   └── Business parameters store & persistence
    │
    └── staff-mobile.js
        └── Touch-optimized handheld inventory UI
```

---

# ⭐ Core Features

## 1. 👥 Role-Based Access Control & Multi-Store Management

* Supports 5 supermarket roles:

  * Store Admin
  * Store Manager
  * Inventory Staff
  * Cashier
  * Donation Manager
* Instant role switching through the navigation bar.
* Multi-location support for supermarket chains.
* Example stores include:

  * Main Street Supermarket
  * Westside Branch
  * Downtown Express

---

## 2. 🏷️ Multi-Batch SKU & FEFO Inventory Engine

ExpiryIQ tracks inventory down to:

* Batch Number
* Expiry Date
* Supplier ID

### FEFO — First-Expired, First-Out

The system automatically prioritizes inventory based on expiry date.

When a POS transaction occurs, inventory is deducted from the appropriate non-expired batch using FEFO logic.

### Batch Status

Each batch can have statuses such as:

* `Active`
* `Near Expiry`
* `Expired`
* `Donated`
* `Discounted`

---

## 3. 🤖 AI Decision Engine & Profit-Aware Pricing

ExpiryIQ includes a transparent AI decision engine for inventory risk and pricing recommendations.

### Multi-Factor Risk Score

A risk score from **0–100** is calculated using factors such as:

* Remaining shelf life
* Historical sales velocity
* Product category perishability
* Ambient storage conditions

### Dynamic Markdown Engine

The system recommends markdown percentages such as:

* 20%
* 30%
* 50%

The objective is to balance:

**Margin Recovery ↔ Waste Prevention**

Each recommendation provides a transparent breakdown of the factors used.

---

## 4. 🛒 Simulated POS Checkout

**File:** `pos.html`

Features include:

* Barcode scanning simulator
* EAN-13 / UPC / SKU lookup
* Instant price calculation
* Automatic batch discount application
* Real-time stock verification
* Automatic FEFO inventory deduction
* Receipt generation

---

## 5. ⚡ Smart Action Center

**File:** `action-center.html`

The Action Center provides a centralized operational task inbox containing prioritized recommendations.

### 1-Click Actions

Store staff can:

* Apply markdowns
* Trigger automatic reorders
* Transfer aging inventory to donation candidates

This reduces the number of manual steps required for routine inventory decisions.

---

## 6. 📋 Physical Stock Count & Variance Reconciliation

**File:** `stock-count.html`

The system allows store staff to perform physical inventory counts.

It compares:

```text
Expected Quantity
        ↓
Physical Count
        ↓
Variance
```

Possible variance reasons include:

* Damaged
* Theft
* Expired
* Miscount

Inventory adjustments are recorded and corresponding events are added to the audit trail.

---

## 7. 📊 Multi-Store Executive BI Dashboard

**File:** `bi-dashboard.html`

Provides high-level business intelligence metrics including:

* Total Revenue
* Gross Margin %
* Shrinkage Rate
* Waste Avoidance Savings
* FEFO Efficiency Score

The dashboard also provides visual breakdowns for:

* Sales Velocity by Department
* Shrinkage Breakdown by Category

---

## 8. 🚚 Supplier Management & Quality Analytics

**File:** `suppliers.html`

The supplier management module provides:

* Supplier directory
* Fresh food supplier information
* Supplier performance scorecards
* Quality analytics
* Waste analytics

Key supplier metrics include:

* On-Time Delivery %
* Quality Defect Rate
* Expired Stock Contribution

---

## 9. 📈 Demand Forecasting & Automatic Reordering

**File:** `forecasting.html`

ExpiryIQ provides statistical demand forecasting using:

* Historical sales velocity
* Seasonal trends

The system predicts:

* 7-day demand
* 30-day demand

### Reorder Point

The system uses:

```text
ROP = (Daily Demand × Lead Time) + Safety Stock
```

When stock falls below defined thresholds, the system can automatically generate Purchase Orders (POs).

---

## 10. 🤝 Operational Donation Pipeline

**File:** `donation.html`

The donation module identifies inventory suitable for donation before expiration.

It supports coordination with:

* NGOs
* Food banks
* Shelters

The system also supports:

* Pickup logistics
* Pickup verification
* Donation receipts
* Tax deduction documentation
* Sustainability compliance

---

## 11. 📄 Reports & CSV Export

**File:** `reports.html`

Available reports include:

* Daily Sales Summary
* Expiring Inventory Audit
* Monthly Waste Breakdown
* Supplier Performance

Reports can be exported as **CSV files** for offline analysis using spreadsheet software.

---

## 12. 🔒 System Audit Log

**File:** `audit-log.html`

The audit system records important system activities, including:

* User Logins
* POS Sales
* Inventory Manual Adjustments
* Price Changes
* Role Switch Events

This provides visibility into operational activities and system changes.

---

# 🔌 Integration Architecture

**File:** `js/api-adapters.js`

ExpiryIQ uses a **plug-and-play Integration Abstraction Layer** designed to allow the platform to evolve from a browser-based prototype toward enterprise infrastructure.

### ☁️ Cloud Database Adapter

Designed to support integration with:

* PostgreSQL
* Supabase
* MongoDB

### 🖨️ POS Hardware Adapter

Designed for integration with:

* Receipt printers
* Cash drawers
* Physical POS hardware

### 📷 Barcode Scanner Adapter

Supports planned integration with:

* WebUSB barcode readers
* Bluetooth barcode readers

### 🏷️ Electronic Shelf Label Adapter

Designed to synchronize markdown prices with digital shelf labels through e-Paper RF gateways.

### 📦 Supplier EDI Adapter

Designed to support automated **ANSI X12 EDI 850 Purchase Orders** with supplier ERP systems.

---

# 🎨 Design System & Theme

ExpiryIQ follows a premium **supermarket and fresh-produce aesthetic**.

### Typography

* **Fraunces** — Serif accent headers
* **Inter** — UI body typography

### Color Palette

| Purpose          | Color     |
| ---------------- | --------- |
| Parchment        | `#FAF7F2` |
| Fresh Leaf Green | `#2D5A27` |
| Golden Amber     | `#D97706` |
| Crimson Warning  | `#DC2626` |

### UI Design

The interface includes:

* Responsive layouts
* Micro-animations
* Sticky navigation
* Dark mode
* Glassmorphic notification drawers
* Operational dashboards
* Mobile-friendly inventory interfaces

---

# 🎯 Project Objective

ExpiryIQ focuses on solving a real-world retail problem:

> **How can supermarkets reduce food waste while protecting profit and improving inventory operations?**

The platform combines:

```text
Inventory Management
        +
FEFO
        +
AI Risk Scoring
        +
Dynamic Pricing
        +
Demand Forecasting
        +
POS
        +
Donation Management
        +
Business Intelligence
        =
Smart Retail Operations
```

---

# 🚧 Current Architecture

The current implementation is designed as a **client-side prototype** using browser storage and modular JavaScript components.

The architecture provides a foundation for future integration with:

* Cloud databases
* Physical POS systems
* Barcode scanners
* Electronic shelf labels
* Supplier ERP systems
* EDI systems
* Enterprise retail infrastructure

---

# 💡 Key Value Proposition

ExpiryIQ helps supermarkets:

| Challenge              | Solution                       |
| ---------------------- | ------------------------------ |
| Food Expiry            | FEFO inventory rotation        |
| Food Waste             | Markdown & donation workflows  |
| Overstocking           | Demand forecasting             |
| Stockouts              | Automatic reorder calculations |
| Shrinkage              | Stock reconciliation           |
| Manual Decisions       | AI recommendations             |
| Multi-Store Complexity | Centralized BI                 |
| Supplier Issues        | Supplier quality analytics     |
| Operational Tracking   | Audit logs                     |

---

# 📌 Project Status

**ExpiryIQ is currently a functional browser-based supermarket operations platform and prototype architecture for future enterprise integrations.**

---

## 🌱 Vision

**Prevent waste. Protect margins. Improve operations.**

ExpiryIQ aims to transform supermarket inventory management from a reactive process into a **data-driven, AI-assisted, and sustainability-focused operation**.
