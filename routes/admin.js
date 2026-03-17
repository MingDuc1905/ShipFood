const express = require('express');
const router = express.Router();

// Mock admin data
const categories = [
  { id: 1, name: 'Cơm', description: 'Các loại cơm' },
  { id: 2, name: 'Phở', description: 'Các loại phở' },
  { id: 3, name: 'Bánh mì', description: 'Bánh mì các loại' }
];

const orders = [
  {
    id: 1,
    customerId: 1,
    total: 100000,
    status: 'Đã giao',
    createdAt: '2024-03-16',
    items: [
      { dishName: 'Phở bò', quantity: 2, price: 35000 }
    ]
  }
];

// GET danh sách danh mục
router.get('/categories', (req, res) => {
  res.json(categories);
});

// POST tạo danh mục
router.post('/categories', (req, res) => {
  const { name, description } = req.body;
  const newCategory = {
    id: categories.length + 1,
    name,
    description
  };
  categories.push(newCategory);
  res.json(newCategory);
});

// GET danh sách đơn hàng
router.get('/orders', (req, res) => {
  res.json(orders);
});

// GET chi tiết đơn hàng
router.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
  }
  res.json(order);
});

// PUT cập nhật trạng thái đơn hàng
router.put('/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
  }
  order.status = status;
  res.json(order);
});

module.exports = router;
