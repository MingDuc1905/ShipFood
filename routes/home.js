const express = require('express');
const router = express.Router();

// Mock data - nhân từ database sau
const restaurants = [
  {
    id: 1,
    name: 'Phở Hòa',
    description: 'Phở ngon nhất Sài Gòn',
    address: 'Hà Nội',
    rating: 4.5,
    image: '/images/pho-hoa.jpg'
  },
  {
    id: 2,
    name: 'Cơm Tấm Sài Gòn',
    description: 'Cơm tấm đặc sản miền Nam',
    address: 'Sài Gòn',
    rating: 4.3,
    image: '/images/com-tam.jpg'
  }
];

const dishes = [
  {
    id: 1,
    restaurantId: 1,
    name: 'Phở Bò',
    price: 35000,
    description: 'Phở bò tươi ngon',
    image: '/images/pho-bo.jpg'
  },
  {
    id: 2,
    restaurantId: 1,
    name: 'Phở Gà',
    price: 30000,
    description: 'Phở gà đặc biệt',
    image: '/images/pho-ga.jpg'
  }
];

// GET danh sách nhà hàng
router.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

// GET chi tiết nhà hàng
router.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ message: 'Nhà hàng không tìm thấy' });
  }
  res.json(restaurant);
});

// GET danh sách món ăn theo nhà hàng
router.get('/restaurants/:id/dishes', (req, res) => {
  const restaurantDishes = dishes.filter(d => d.restaurantId === parseInt(req.params.id));
  res.json(restaurantDishes);
});

// GET tìm kiếm
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json([]);
  }

  const results = restaurants.filter(r =>
    r.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json(results);
});

module.exports = router;
