/**
 * ShipFood API - Serverless Handler
 * Simple API endpoint for Vercel
 */

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 🏠 Root endpoint
  if (req.url === '/' && req.method === 'GET') {
    return res.status(200).json({
      message: '🍜 ShipFood API v1.0.0',
      status: 'running ✅',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      endpoints: {
        health: { path: '/api/health', method: 'GET', description: 'Health check' },
        auth: { path: '/api/auth', method: 'POST', description: 'Authentication (coming soon)' },
        restaurants: { path: '/api/restaurants', method: 'GET', description: 'Restaurants list (coming soon)' },
        menus: { path: '/api/menus', method: 'GET', description: 'Menus (coming soon)' },
        orders: { path: '/api/orders', method: 'GET', description: 'Orders (coming soon)' },
      },
      message_development: 'API is ready for database connection'
    });
  }

  // 💚 Health check endpoint
  if ((req.url === '/api/health' || req.url === '/health') && req.method === 'GET') {
    return res.status(200).json({
      status: 'OK',
      message: 'ShipFood API is healthy ✅',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    });
  }

  // 📝 Placeholder endpoints (coming soon)
  const routes = [
    { path: '/api/auth', methods: ['POST', 'GET'] },
    { path: '/api/restaurants', methods: ['GET', 'POST'] },
    { path: '/api/menus', methods: ['GET', 'POST'] },
    { path: '/api/orders', methods: ['GET', 'POST'] }
  ];

  const url = req.url.split('?')[0];
  const matchedRoute = routes.find(r => url.startsWith(r.path));

  if (matchedRoute && matchedRoute.methods.includes(req.method)) {
    return res.status(200).json({
      message: '🔄 Endpoint coming soon...',
      path: url,
      method: req.method,
      status: 'development'
    });
  }

  // 404 - Not Found
  return res.status(404).json({
    error: 'Route not found',
    path: req.url,
    method: req.method,
    message: 'Try GET / or GET /api/health',
    available_endpoints: [
      'GET /',
      'GET /api/health'
    ]
  });
}
