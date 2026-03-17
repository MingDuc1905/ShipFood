const express = require('express');
const router = express.Router();

// Mock cart data
let carts = {};

// GET giỏ hàng
router.get('/:customerId', (req, res) => {
  const { customerId } = req.params;
  const cart = carts[customerId] || { items: [], total: 0 };
  res.json(cart);
});

// POST thêm vào giỏ hàng
router.post('/:customerId/add', (req, res) => {
  const { customerId } = req.params;
  const { dishId, quantity, price } = req.body;

  if (!carts[customerId]) {
    carts[customerId] = { items: [], total: 0 };
  }

  const existingItem = carts[customerId].items.find(item => item.dishId === dishId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[customerId].items.push({ dishId, quantity, price });
  }

  carts[customerId].total = carts[customerId].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.json(carts[customerId]);
});

// POST xóa khỏi giỏ hàng
router.post('/:customerId/remove', (req, res) => {
  const { customerId } = req.params;
  const { dishId } = req.body;

  if (carts[customerId]) {
    carts[customerId].items = carts[customerId].items.filter(item => item.dishId !== dishId);
    carts[customerId].total = carts[customerId].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  res.json(carts[customerId] || { items: [], total: 0 });
});

// POST checkout
router.post('/:customerId/checkout', (req, res) => {
  const { customerId } = req.params;
  const { address, paymentMethod } = req.body;

  const order = {
    orderId: Date.now(),
    customerId,
    items: carts[customerId]?.items || [],
    total: carts[customerId]?.total || 0,
    address,
    paymentMethod,
    status: 'Chờ xác nhận',
    createdAt: new Date()
  };

  // Clear cart
  delete carts[customerId];

  res.json({ success: true, order });
});

module.exports = router;
