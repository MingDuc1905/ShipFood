const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files - serve CSS, JS, images directly
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - must come BEFORE the catch-all route
app.use('/api/home', require('./routes/home'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/shipper', require('./routes/shipper'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ShipFood API is running' });
});

// Serve index.html for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route - serve index.html for all other non-API routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
