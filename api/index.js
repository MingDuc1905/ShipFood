import express from 'express';
import cors from 'cors';

// Routes
import authRoutes from '../src/routes/auth.js';
import restaurantRoutes from '../src/routes/restaurant.js';
import menuRoutes from '../src/routes/menu.js';
import orderRoutes from '../src/routes/order.js';
import shipperRoutes from '../src/routes/shipper.js';
import adminRoutes from '../src/routes/admin.js';

// Middleware
import { errorHandler } from '../src/middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ShipFood API is running ✅', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shippers', shipperRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🍜 ShipFood API',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      '/api/health',
      '/api/auth',
      '/api/restaurants',
      '/api/menus',
      '/api/orders',
      '/api/shippers',
      '/api/admin'
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error Handler
app.use(errorHandler);

export default app;
