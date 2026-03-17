# ShipFood

Ứng dụng giao đồ ăn nhanh - Food Delivery Application

## Yêu cầu hệ thống

- Node.js 14+
- npm hoặc yarn

## Cài đặt

1. Clone repository
```bash
git clone <repository-url>
cd ShipFood
```

2. Cài đặt dependencies
```bash
npm install
```

3. Thiết lập biến môi trường
```bash
cp .env.example .env
```

4. Chạy server
```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## Cấu trúc dự án

```
ShipFood/
├── public/          # Frontend files (HTML, CSS, JS)
├── routes/          # API routes
│   ├── home.js     # Trang chủ & danh sách nhà hàng
│   ├── cart.js     # Giỏ hàng & thanh toán
│   ├── admin.js    # Quản lý admin
│   ├── restaurant.js # Quản lý nhà hàng
│   └── shipper.js  # Quản lý shipper
├── server.js       # Entry point
├── package.json
└── vercel.json    # Cấu hình Vercel
```

## API Endpoints

### Home
- `GET /api/home/restaurants` - Danh sách nhà hàng
- `GET /api/home/search?q=<query>` - Tìm kiếm

### Cart
- `GET /api/cart/:customerId` - Lấy giỏ hàng
- `POST /api/cart/:customerId/add` - Thêm vào giỏ
- `POST /api/cart/:customerId/checkout` - Thanh toán

### Admin
- `GET /api/admin/categories` - Danh mục
- `GET /api/admin/orders` - Đơn hàng

### Restaurant
- `GET /api/restaurant` - Danh sách nhà hàng
- `POST /api/restaurant` - Tạo nhà hàng

### Shipper
- `GET /api/shipper` - Danh sách shipper
- `POST /api/shipper/:id/location` - Cập nhật vị trí

## Deploy lên Vercel

1. Push lên GitHub
2. Đăng nhập Vercel
3. Import repository từ GitHub
4. Vercel sẽ tự động detect `vercel.json` và deploy
5. Thiết lập environment variables trong Vercel dashboard

## Phát triển tiếp theo

- [ ] Kết nối MySQL database
- [ ] Authentication & Authorization
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Mobile app (React Native)

## License

ISC
