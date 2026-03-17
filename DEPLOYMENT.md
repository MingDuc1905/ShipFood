# 🚀 ShipFood Vercel Deployment Guide

## Step 1: Prepare Your Repository

### 1.1 Copy Node.js project to repo root
Make sure your GitHub repo has this structure (keep the old Website folder if needed):
```
ShipFood/
├── src/                 ← New Node.js code
├── prisma/
├── scripts/
├── package.json         ← New Node.js files
├── server.js
├── vercel.json
├── .env.example
├── README.md            ← Updated
└── Website/             ← Old ASP.NET code
```

### 1.2 Push to GitHub
```bash
git add .
git commit -m "Add Node.js Express API for Vercel deployment"
git push origin main
```

## Step 2: Setup Vercel Postgres

### Using Vercel Dashboard

1. **Go to Vercel Dashboard** → Settings → Storage
2. Click **Create Database** → **PostgreSQL**
3. Choose region close to you
4. Copy connection strings:
   - `POSTGRES_PRISMA_URL` (with pooling)
   - `POSTGRES_URL_NO_SSL` (direct connection)

### Or using Vercel CLI
```bash
npm install -g vercel@latest
vercel login
vercel env add POSTGRES_PRISMA_URL   # Paste from Vercel
vercel env add POSTGRES_URL_NO_SSL   # Paste from Vercel
```

## Step 3: Setup Vercel Blob Storage

1. **Go to Vercel Dashboard** → Settings → Storage
2. Click **Create Blob Storage**
3. Copy the token into `.env`

```bash
vercel env add BLOB_READ_WRITE_TOKEN
# Paste the token when prompted
```

## Step 4: Setup Environment Variables

Add all required environment variables:

```bash
vercel env add JWT_SECRET              # Use strong secret: `openssl rand -hex 32`
vercel env add PAYPAL_CLIENT_ID        # Your PayPal ID
vercel env add PAYPAL_CLIENT_SECRET    # Your PayPal Secret
vercel env add API_URL                 # https://your-project.vercel.app
vercel env add FRONTEND_URL            # Your frontend URL (if separate)
vercel env add NODE_ENV                # production
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to https://vercel.com/new**
2. Import your GitHub repo
3. Select project root (ShipFood folder)
4. Vercel will auto-detect Next.js/Node.js
5. Click **Deploy**

### Option B: Using Vercel CLI

```bash
vercel pull                # Pull env variables
npm run build              # Build
vercel deploy --prod       # Deploy to production
```

## Step 6: Run Database Migrations

After deployment, run migrations:

```bash
# Option 1: Via Vercel CLI
vercel env pull
npm run migrate

# Option 2: Via Vercel Dashboard
# Go to Deployment → Logs → Check for any errors
```

Or create a migration script in `api/` folder:

```javascript
// api/migrate.js
import { PrismaClient } from '@prisma/client';

export default async (req, res) => {
  const prisma = new PrismaClient();
  try {
    // Prisma will auto-create tables from schema
    res.status(200).json({ message: 'Database ready' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## Step 7: Seed Database (Optional)

```bash
# Locally
npm run seed

# Or push code to run on Vercel
```

## Step 8: Test Your API

```bash
# Get API URL from Vercel Dashboard

# Test health check
curl https://your-project.vercel.app/api/health

# Register user
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "userType": "Khách hàng",
    "phone": "0123456789",
    "email": "test@example.com"
  }'
```

## Step 9: Setup Auto-Deployment

### GitHub Integration (Auto)
Vercel automatically watches your repo:
- Any push to `main` → Auto-deploy
- Any pull request → Preview deployment

### Manual Deploy
```bash
git push origin main  # Vercel auto-deploys
```

## Troubleshooting

### 1. Database Connection Error
```
Error: POSTGRES_PRISMA_URL not set
```

**Solution:**
```bash
vercel env pull           # Pull env variables
echo $POSTGRES_PRISMA_URL # Check if set
```

### 2. Module Not Found
```
Error: Cannot find module '@prisma/client'
```

**Solution:**
```bash
npm install
npm run build
git push origin main
```

### 3. Login Issues (Unauthorized)
- Clear `.env.local` and use fresh JWT from login
- Check `JWT_SECRET` is consistent

### 4. Blob Upload Fails
- Verify `BLOB_READ_WRITE_TOKEN` is set correctly
- Check token permissions in Vercel Dashboard

### 5. Port Already in Use
Vercel handles ports automatically. If running locally:
```bash
PORT=3000 npm run dev
```

## Environment Variables Checklist

- [ ] `POSTGRES_PRISMA_URL` - Database connection
- [ ] `POSTGRES_URL_NO_SSL` - Direct database connection
- [ ] `JWT_SECRET` - Auth secret key
- [ ] `BLOB_READ_WRITE_TOKEN` - File upload token
- [ ] `PAYPAL_CLIENT_ID` - PayPal integration
- [ ] `PAYPAL_CLIENT_SECRET` - PayPal integration
- [ ] `NODE_ENV` - Set to `production`
- [ ] `API_URL` - Your Vercel domain

## Performance Tips

1. **Enable Caching**
   - Add `Cache-Control` headers
   - Use Redis (optional)

2. **Database Optimization**
   - Add indexes (done in schema)
   - Use Prisma's connection pooling

3. **Image Optimization**
   - Compress before uploading
   - Use Vercel Blob's built-in optimization

## Next Steps

1. ✅ Setup Vercel Postgres & Blob
2. ✅ Configure environment variables
3. ✅ Deploy to Vercel
4. ✅ Run migrations
5. 📱 Build frontend (React/Vue/etc.)
6. 🔗 Connect frontend to API
7. 🎉 Launch!

## API Documentation

Full API docs available in [README.md](./README.md)

## Support

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- PostgreSQL Docs: https://www.postgresql.org/docs

---

Happy deploying! 🚀
