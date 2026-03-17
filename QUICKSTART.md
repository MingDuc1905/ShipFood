# 📋 Quick Start - Deployment Checklist

## ✅ Hoàn thành (Done)
- [x] Tạo Node.js + Express API
- [x] Tạo Prisma schema cho PostgreSQL
- [x] Tạo Auth, Restaurant, Menu, Order APIs
- [x] Tạo Shipper & Admin APIs
- [x] Setup Vercel Blob integration
- [x] Tạo environment config

## ⏭️ Bước tiếp theo (Next Steps)

### 1️⃣ Clone dự án về (nếu chưa)
```bash
git clone https://github.com/MingDuc1905/ShipFood.git
cd ShipFood
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup Vercel Account & Services
Xem chi tiết tại [DEPLOYMENT.md](./DEPLOYMENT.md)

**Nhanh gọn:**
- [ ] Tạo Vercel Postgres database
- [ ] Copy connection string vào `.env.local`
- [ ] Tạo Vercel Blob storage
- [ ] Copy token vào `.env.local`
- [ ] Thêm các env variables khác (JWT_SECRET, PayPal, etc.)

### 4️⃣ Push code lên GitHub
```bash
git add .
git commit -m "feat: Convert ASP.NET to Node.js Express for Vercel"
git push origin main
```

### 5️⃣ Deploy trên Vercel Dashboard
1. Vào https://vercel.com/new
2. Import GitHub repo
3. Connect Vercel Postgres & Blob
4. Click Deploy

### 6️⃣ Test API (sau khi deploy)
```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Register
POST /api/auth/register
{
  "username": "testuser",
  "password": "123456",
  "userType": "Khách hàng",
  "phone": "0123456789",
  "email": "test@example.com"
}

# Login
POST /api/auth/login
{
  "username": "testuser",
  "password": "123456"
}
```

## 📁 Project Structure
```
ShipFood/
├── src/
│   ├── controllers/     # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth, error handling
│   └── utils/          # Helpers
├── prisma/
│   └── schema.prisma   # Database schema
├── scripts/
│   ├── migrate.js      # Run migrations
│   └── seed.js         # Seed data
├── server.js           # Express app
├── package.json        # Dependencies
├── .env.example        # Env template
├── vercel.json         # Vercel config
├── README.md           # API docs
└── DEPLOYMENT.md       # Deployment guide
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Main Express app |
| `src/routes/` | API endpoints |
| `src/controllers/` | Business logic |
| `prisma/schema.prisma` | Database schema |
| `.env.example` | Environment template |
| `vercel.json` | Vercel deployment config |

## 🚀 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Restaurants
- `GET /api/restaurants` - List all
- `GET /api/restaurants/:id` - Get details
- `PUT /api/restaurants/:id` - Update (owner)

### Menus
- `GET /api/menus?search=...` - Search
- `GET /api/menus/:id` - Get details
- `POST /api/menus` - Create (restaurant)
- `PUT /api/menus/:id` - Update (restaurant)
- `DELETE /api/menus/:id` - Delete (restaurant)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get details
- `GET /api/orders/customer/list` - My orders
- `PUT /api/orders/:id/status` - Update status
- `PUT /api/orders/:id/cancel` - Cancel

### Shippers
- `GET /api/shippers` - List all
- `GET /api/shippers/:id` - Get details
- `PUT /api/shippers/profile` - Update profile
- `POST /api/shippers/deliveries/accept` - Accept delivery

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `POST /api/admin/restaurants/:id/approve` - Approve restaurant

## 📝 Environment Variables

Copy `.env.example` → `.env.local`:

```bash
# Database (from Vercel)
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NO_SSL=postgresql://...

# Auth Secret
JWT_SECRET=your_random_secret_here

# File Storage (from Vercel)
BLOB_READ_WRITE_TOKEN=...

# PayPal (optional)
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# URLs
API_URL=https://your-domain.vercel.app
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=production
```

## 🧪 Local Testing

```bash
# Install dependencies
npm install

# Add .env.local with test database
# Development
npm run dev

# Test register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "password":"123456",
    "userType":"Khách hàng",
    "phone":"0123456789",
    "email":"test@example.com"
  }'
```

## ❓ FAQ

**Q: Làm sao để test trên local trước khi deploy?**
A: Tạo `.env.local` với local PostgreSQL atau Vercel Postgres connection string, rồi chạy `npm run dev`

**Q: PayPal integration có hoạt động không?**
A: Credentials đã được thêm sẵn trong `.env.example`. Bạn có thể update sau.

**Q: Làm sao để upload ảnh?**
A: Sử dụng Vercel Blob. Hãy thêm `BLOB_READ_WRITE_TOKEN` và upload sẽ tự động hoạt động.

**Q: Database ở đâu?**
A: Vercel Postgres. Setup tại https://vercel.com → Settings → Storage

## 📚 Additional Resources

- [README.md](./README.md) - Full API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## 🎯 What's Next?

1. **Setup Vercel** (DEPLOYMENT.md)
2. **Deploy API** to Vercel
3. **Build Frontend** (React, Vue, etc.)
4. **Connect Frontend** to API
5. **Go Live!** 🚀

---

**Need help?** Check DEPLOYMENT.md or test locally first!
