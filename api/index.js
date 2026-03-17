export default function handler(req, res) {
  // Simple health check first
  if (req.url === '/' || req.url === '/api/health') {
    return res.status(200).json({ 
      status: 'OK',
      message: 'ShipFood API running on Vercel ✅',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  }

  // Root endpoint
  if (req.url === '/' && req.method === 'GET') {
    return res.status(200).json({
      message: '🍜 ShipFood API',
      version: '1.0.0',
      status: 'running',
      endpoints: [
        { path: '/', method: 'GET', description: 'Root endpoint' },
        { path: '/api/health', method: 'GET', description: 'Health check' },
        { path: '/api/auth/register', method: 'POST', description: 'Register user' },
        { path: '/api/auth/login', method: 'POST', description: 'Login user' },
      ]
    });
  }

  // TODO routes would go here
  res.status(404).json({
    error: 'Route not found',
    path: req.url,
    method: req.method,
    message: 'Use GET / or GET /api/health for testing'
  });
}
