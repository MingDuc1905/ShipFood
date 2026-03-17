const express = require('express');
const router = express.Router();

// Mock shipper data
const shippers = [
  {
    id: 1,
    name: 'Trần Văn B',
    phone: '0912345678',
    status: 'Sẵn sàng',
    rating: 4.8,
    completedOrders: 250
  }
];

const deliveries = [
  {
    id: 1,
    shipperId: 1,
    orderId: 1,
    status: 'Đang giao',
    pickupTime: '14:30',
    estimatedDeliveryTime: '15:00'
  }
];

// GET danh sách shipper
router.get('/', (req, res) => {
  res.json(shippers);
});

// GET danh sách giao hàng
router.get('/:id/deliveries', (req, res) => {
  const shipperId = parseInt(req.params.id);
  const shipperDeliveries = deliveries.filter(d => d.shipperId === shipperId);
  res.json(shipperDeliveries);
});

// POST cập nhật vị trí
router.post('/:id/location', (req, res) => {
  const { latitude, longitude } = req.body;
  res.json({ success: true, latitude, longitude });
});

module.exports = router;
