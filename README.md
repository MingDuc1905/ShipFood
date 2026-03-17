# ShipFood - Food Delivery API

## Overview
ShipFood is a modern food delivery platform built with Node.js, Express, and PostgreSQL. Deployed on Vercel with Vercel Postgres and Vercel Blob storage.

## Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **File Storage**: Vercel Blob
- **Authentication**: JWT
- **Deployment**: Vercel

## Project Structure
```
shipfood/
├── src/
│   ├── controllers/       # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, error handling
│   ├── utils/            # Helper functions
│   └── models/           # Data models (Prisma)
├── prisma/
│   └── schema.prisma     # Database schema
├── scripts/
│   ├── migrate.js        # Database migrations
│   └── seed.js           # Seed initial data
├── server.js             # Express app
├── vercel.json           # Vercel config
└── package.json          # Dependencies
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
1. **Clone the repository**
```bash
git clone https://github.com/MingDuc1905/ShipFood.git
cd ShipFood
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `POSTGRES_PRISMA_URL`: Vercel Postgres connection string
- `JWT_SECRET`: Your secret key
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token

4. **Run database migrations**
```bash
npm run migrate
```

5. **Seed initial data**
```bash
npm run seed
```

6. **Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `PUT /api/restaurants/:id` - Update restaurant (owner only)

### Menus
- `GET /api/menus` - Search menus
- `GET /api/menus/:id` - Get menu details
- `POST /api/menus` - Create menu (restaurant only)
- `PUT /api/menus/:id` - Update menu (restaurant only)
- `DELETE /api/menus/:id` - Delete menu (restaurant only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/customer/list` - Get customer orders
- `GET /api/orders/restaurant/list` - Get restaurant orders
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

### Shippers
- `GET /api/shippers` - Get all shippers
- `GET /api/shippers/:id` - Get shipper details
- `PUT /api/shippers/profile` - Update shipper profile
- `POST /api/shippers/deliveries/accept` - Accept delivery

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `POST /api/admin/restaurants/:id/approve` - Approve restaurant
- `POST /api/admin/users/:id/lock` - Lock user

## Deployment on Vercel

### 1. Create Vercel Postgres Database
```bash
vercel env add POSTGRES_PRISMA_URL
vercel env add POSTGRES_URL_NO_SSL
```

### 2. Create Vercel Blob Storage
```bash
vercel env add BLOB_READ_WRITE_TOKEN
```

### 3. Add other environment variables
```bash
vercel env add JWT_SECRET
vercel env add PAYPAL_CLIENT_ID
vercel env add PAYPAL_CLIENT_SECRET
```

### 4. Deploy
```bash
vercel pull         # Pull latest environment variables
npm run build       # Build
vercel deploy       # Deploy to Vercel
```

Or simply push to GitHub and Vercel will auto-deploy.

## Database Schema
See [Prisma Schema](./prisma/schema.prisma) for complete schema definition.

Main entities:
- **User** - All user types (Customer, Restaurant, Shipper, Admin)
- **Restaurant** - Restaurant profiles
- **Customer** - Customer profiles
- **Shipper** - Delivery personnel
- **Menu** - Food items
- **Order** - Customer orders
- **Delivery** - Order delivery tracking

## Features
- ✅ User authentication with JWT
- ✅ Restaurant management
- ✅ Food menu management
- ✅ Order management with status tracking
- ✅ Shipper/delivery tracking
- ✅ Admin dashboard
- ✅ Image upload to Vercel Blob
- ✅ Search & filtering
- ✅ PayPal integration (ready)

## Environment Variables

```
# Database
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NO_SSL=postgresql://...

# JWT
JWT_SECRET=your_secret_key

# PayPal (Optional)
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_token

# URLs
API_URL=https://your-domain.vercel.app
FRONTEND_URL=https://your-frontend-domain.com

# Environment
NODE_ENV=production
```

## Development

### Local Database Setup
For local development, you can use PostgreSQL locally:

```bash
# Install PostgreSQL
# Create database
createdb shipfood

# Update .env.local
POSTGRES_PRISMA_URL=postgresql://localhost/shipfood
```

## Scripts
```bash
npm run dev       # Development (with nodemon)
npm start         # Production
npm run migrate   # Run Prisma migrations
npm run seed      # Seed initial data
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
ISC

## Support
For issues and questions, please open an issue on GitHub.

---

Built with ❤️ by MingDuc1905
