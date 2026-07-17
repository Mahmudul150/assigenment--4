# 🏋️ GearUp

**Rent Sports & Outdoor Gear Instantly**

GearUp is a backend REST API for a sports and outdoor equipment rental platform. Customers can browse available gear, rent equipment, make secure payments, and leave reviews. Providers manage their inventory and rental orders, while admins oversee the entire platform.

---

# 🚀 Live Links

- **Live Server:** `https://your-live-link.com`
- **API Documentation:** `https://your-api-docs-link.com`

---

# 📂 GitHub Repository

```
https://github.com/your-username/gearup-backend
```

---

# 📖 Project Overview

GearUp is designed to simplify the process of renting sports and outdoor equipment.

The system supports three different user roles:

- Customer
- Provider
- Admin

Customers can browse available gear, place rental orders, complete payments, and review equipment after returning it.

Providers manage their own gear inventory, update stock availability, and process rental orders.

Admins manage users, categories, gear listings, and rental activities across the platform.

---

# ✨ Features

## Public Features

- Browse available gear
- Search by keyword
- Filter by category
- Filter by brand
- Filter by availability
- View gear details
- Pagination & Sorting

---

## Customer Features

- Register/Login
- JWT Authentication
- Rent sports gear
- Calculate rental cost
- Payment using Stripe
- View rental history
- View payment history
- Leave reviews
- Manage profile

---

## Provider Features

- Add Gear
- Update Gear
- Delete Gear
- Manage Stock
- View Rental Orders
- Update Rental Status

---

## Admin Features

- View all users
- Suspend / Activate users
- Manage categories
- View all gears
- View all rentals

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcryptjs

## Payment

- Stripe

## Validation

- Zod

## Others

- Cookie Parser
- CORS
- dotenv
- HTTP Status
- Express Async Handler

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/gearup-backend.git
```

Go to project

```bash
cd gearup-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Development Server

```bash
npm run dev
```

---

# 📁 Project Structure

```
src
│
├── app
│   ├── modules
│   │      ├── auth
│   │      ├── user
│   │      ├── category
│   │      ├── gear
│   │      ├── rental
│   │      ├── payment
│   │      ├── review
│   │      └── admin
│   │
│   ├── middleware
│   ├── utils
│   ├── config
│   └── routes
│
├── prisma
│
└── server.ts
```

---

# 🔐 Authentication

JWT Authentication is used.

Protected routes require

```
Authorization: Bearer <token>
```

Supported Roles

- CUSTOMER
- PROVIDER
- ADMIN

---

# 💳 Payment

Stripe payment gateway is integrated.

Workflow

```
Create Rental
        │
        ▼
Create Stripe Session
        │
        ▼
Complete Payment
        │
        ▼
Webhook Verification
        │
        ▼
Update Payment Status
        │
        ▼
Update Rental Status
```

---

# 📊 Database Models

- User
- Category
- GearItem
- RentalOrder
- Payment
- Review

---

# 📌 Main API Endpoints

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/me
```

---

## Categories

```
POST   /api/categories

GET    /api/categories

PATCH  /api/categories/:id

DELETE /api/categories/:id
```

---

## Gear

```
POST   /api/gear

GET    /api/gear

GET    /api/gear/:id

PATCH  /api/gear/:id

DELETE /api/gear/:id
```

---

## Rentals

```
POST   /api/rentals

GET    /api/rentals

GET    /api/rentals/:id

PATCH  /api/rentals/:id
```

---

## Payments

```
POST   /api/payments/create

POST   /api/payments/confirm

GET    /api/payments

GET    /api/payments/:id
```

---

## Reviews

```
POST   /api/reviews

GET    /api/reviews
```

---

## Provider

```
GET    /api/provider/orders

PATCH  /api/provider/orders/:id
```

---

## Admin

```
GET    /api/admin/users

PATCH  /api/admin/users/:id

GET    /api/admin/gear

GET    /api/admin/rentals
```

---

# ⚙️ Environment Variables

```env
PORT

DATABASE_URL

JWT_ACCESS_SECRET

JWT_ACCESS_EXPIRES_IN

BCRYPT_SALT_ROUNDS

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

ADMIN_EMAIL

ADMIN_PASSWORD
```

---

# 👨‍💻 Author

**Mahmudul Hasan**

Backend Developer

---

# 📜 License

This project is created for educational purposes.