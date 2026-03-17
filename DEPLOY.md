# Vercel Deployment Guide

## Cách 1: Tự động deploy từ GitHub (Recommended) ⭐

### Bước 1: Tạo Vercel Account
- Vào https://vercel.com/signup
- Đăng nhập với GitHub account

### Bước 2: Tạo Project
1. Vào https://vercel.com/new
2. Chọn "Other" → "Git Repository"
3. Chọn repo `ShipFood`
4. Click "Import"

### Bước 3: Configure
- **Framework**: Node.js
- **Root Directory**: `.`
- **Build Command**: Không cần (mặc định)
- **Start Command**: `npm start`

### Bước 4: Deploy
Click "Deploy" → Xong! ✓

**Sau đó, mỗi khi push lên GitHub, Vercel tự động deploy!**

---

## Cách 2: Tự động deploy với GitHub Actions (Advanced)

### Bước 1: Tạo Vercel Token
1. Vào https://vercel.com/account/tokens
2. Click "Create Token"
3. Copy token

### Bước 2: Add GitHub Secret
1. Vào GitHub repo → Settings → Secrets
2. Click "New repository secret"
3. Name: `VERCEL_TOKEN`
4. Value: Dán token từ bước 1
5. Click "Add secret"

### Bước 3: GitHub Actions tự động deploy
- File `.github/workflows/deploy.yml` đã được tạo
- Mỗi lần push `main`, GitHub Actions sẽ tự động deploy lên Vercel

---

## Kiểm tra Deploy Status
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Actions: Vào repo → Actions tab

---

## Troubleshooting

### Build Failed?
- Check logs on Vercel Dashboard
- Vercel tự động chạy `npm install`

### Port Issue?
- Vercel tự động map PORT environment
- Không cần thay đổi code

### Database?
- Set environment variables trên Vercel Dashboard
- Vercel → Project → Settings → Environment Variables

