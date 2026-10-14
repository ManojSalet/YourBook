# 📚 YourBook — Modern Full-Stack E-Commerce Bookstore

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg?logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**YourBook** is a production-grade, full-stack online bookstore and e-commerce web application engineered with **React 19**, **Vite**, **Bootstrap 5**, **Node.js**, **Express**, and **MongoDB**. Designed with a modern, glassmorphic UI and robust backend architecture, it delivers end-to-end e-commerce capabilities with role-based access control (RBAC), multi-tab isolated sessions, real-time inventory management, cart persistence, and order processing.

---

## 🌟 Key Features

### 👤 Customer Experience
- **Dynamic Book Catalog:** Browse books by categories (Technology, Fiction, Self-Help, Science, Finance) with real-time search and filter controls.
- **Detailed Book Showcase:** View rich details including author information, price, synopsis, and stock status.
- **Cart & Order Processing:** Persistent cart with quantity adjustment, instant total recalculation, and a streamlined multi-step checkout workflow with shipping address validation.
- **Order Tracking:** Real-time customer order history page with delivery status and itemized breakdown.
- **Modern Responsive UI:** Glassmorphism blurred navigation drawer, high-contrast typography, and adaptive layouts tailored for desktop, tablet, and mobile devices.

### 🛡️ Admin Management Suite
- **Interactive KPI Dashboard:** Real-time metrics tracking Total Revenue, Orders Processed, Active Catalog Books, and Registered Users.
- **Book Inventory Management:** Full CRUD operations (Add, Edit, Update Stock & Price, Delete) with image preview.
- **Category Manager:** Create, update, and manage book genres and descriptions with live book counts.
- **Order Lifecycle Management:** Monitor all platform orders, inspect customer shipping details, and update fulfillment statuses (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).

### ⚡ Architectural & Security Highlights
- **Role-Based Access Control (RBAC):** JWT-secured endpoints with `adminOnly` middleware protection for administrative routes.
- **Multi-Tab Session Isolation:** Custom dual-storage session architecture using `sessionStorage` and role-keyed `localStorage` (`bookstore_user_auth`, `bookstore_admin_auth`). Allows simultaneous testing of Admin and Customer workflows in separate browser tabs without session overwrite.
- **Password Encryption:** Bcrypt hashing with automated salt generation.
- **Sanitized RESTful Design:** Uniform JSON response formatting, centralized error handling, and robust CORS configuration.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` | Full access to Admin Panel, Analytics, Inventory & Orders |
| **Customer** | `manoj@test.com` | `test123` | Browsing, Cart, Checkout & Personal Order History |

> *Quick-fill buttons are integrated directly on the Login page for one-click demonstration.*

---

## 🛠️ Tech Stack

### Frontend
- **Library:** React 19.0.0
- **Build Tool:** Vite 6.2.0
- **Routing:** React Router DOM 7.x
- **Styling:** Bootstrap 5.3 + Custom CSS (Glassmorphism, backdrop filters, responsive drawer)
- **HTTP Client:** Axios with interceptor-ready auth header injection

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4.21
- **Database:** MongoDB via Mongoose ORM
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`
- **Logging & Security:** Morgan HTTP logger, CORS, Dotenv

---

## 📂 Project Structure

```text
Book Store/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── authController.js     # User registration, login & profile
│   │   ├── bookController.js     # Book catalog CRUD operations
│   │   ├── categoryController.js # Category management
│   │   ├── cartController.js     # User cart sync and calculations
│   │   └── orderController.js    # Order checkout, placement & status updates
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification & admin guard
│   ├── models/
│   │   ├── Book.js               # Book schema
│   │   ├── Category.js           # Category schema
│   │   ├── User.js               # User & Admin credentials schema
│   │   ├── Cart.js               # Cart items schema
│   │   └── Order.js              # Order & shipping details schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   ├── scripts/
│   │   └── seedData.js           # Database seeding (categories, books, admin, orders)
│   ├── .env.example              # Sample environment config
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── Frontend/
│   └── bookstore-frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx    # Responsive glassmorphic navigation
│       │   │   └── Footer.jsx
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── Books.jsx
│       │   │   ├── Cart.jsx
│       │   │   ├── Chackout.jsx  # Checkout & order placement modal
│       │   │   ├── OrderPage.jsx # Customer order tracking
│       │   │   ├── Login.jsx     # Auth with demo quick-fills
│       │   │   ├── Register.jsx
│       │   │   ├── AdminPanel.jsx
│       │   │   ├── AdminBookList.jsx
│       │   │   ├── AdminManageCategory.jsx
│       │   │   └── AdminOrderList.jsx
│       │   ├── utils/
│       │   │   └── auth.js       # Multi-session and token storage utility
│       │   ├── App.jsx           # App layout & routing
│       │   ├── index.css         # Glassmorphism & custom utility classes
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore                    # Root gitignore (ignores node_modules, env, dist)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on port 27017 or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/YourBook.git
cd YourBook
```

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `MONGO_URI` points to your active MongoDB instance, e.g. `mongodb://127.0.0.1:27017/online_bookstore`)*

4. Seed the database with default books, categories, and demo credentials:
   ```bash
   node scripts/seedData.js
   ```

5. Start the backend server:
   ```bash
   npm start
   # Or directly:
   node server.js
   ```
   *The server will start on `http://localhost:8080`.*

---

### 3. Frontend Setup
1. In a new terminal window, navigate to the frontend directory:
   ```bash
   cd "Frontend/bookstore-frontend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:5173`.*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health Check | No |
| `POST` | `/auth/register` | Register new customer account | No |
| `POST` | `/auth/login` | Authenticate user & return JWT | No |
| `GET` | `/books` | Retrieve book catalog with filters | No |
| `GET` | `/books/:id` | Retrieve single book details | No |
| `POST` | `/books` | Create new book entry | Yes (Admin) |
| `PUT` | `/books/:id` | Update book details | Yes (Admin) |
| `DELETE` | `/books/:id` | Remove book from catalog | Yes (Admin) |
| `GET` | `/categories` | Fetch all book categories | No |
| `POST` | `/categories` | Create new category | Yes (Admin) |
| `GET` | `/cart` | Retrieve user shopping cart | Yes |
| `POST` | `/cart` | Add / sync item in cart | Yes |
| `POST` | `/orders` | Place a new order with shipping details | Yes |
| `GET` | `/orders/my-orders` | Fetch logged-in user's order history | Yes |
| `GET` | `/admin/analytics` | Get platform KPIs & revenue metrics | Yes (Admin) |
| `GET` | `/admin/orders` | Fetch all orders across platform | Yes (Admin) |
| `PUT` | `/admin/orders/:id/status`| Update order fulfillment status | Yes (Admin) |

---

## 👨‍💻 Author

**Manoj**
- Email: [mr.salet13@gmail.com](mailto:mr.salet13@gmail.com)
- Project: MCA Final Year / Portfolio Web Development

