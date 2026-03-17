const express = require('express');
const router = express.Router();

// Mock restaurant data
const restaurants = [
  {
    id: 1,
    name: 'Phở Hòa',
    owner: 'Nguyễn Văn A',
    status: 'Hoạt động',
    revenue: 5000000,
    orders: 150
  }
];

// GET danh sách nhà hàng
router.get('/', (req, res) => {
  res.json(restaurants);
});

// GET chi tiết nhà hàng
router.get('/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ message: 'Nhà hàng không tìm thấy' });
  }
  res.json(restaurant);
});

// POST tạo nhà hàng
router.post('/', (req, res) => {
  const { name, owner } = req.body;
  const newRestaurant = {
    id: restaurants.length + 1,
    name,
    owner,
    status: 'Chờ duyệt',
    revenue: 0,
    orders: 0
  };
  restaurants.push(newRestaurant);
  res.json(newRestaurant);
});

module.exports = router;
