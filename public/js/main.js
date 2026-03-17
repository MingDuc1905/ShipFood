// Load restaurants and display
async function loadRestaurants() {
  try {
    const response = await fetch('/api/home/restaurants');
    const restaurants = await response.json();

    const restaurantList = document.getElementById('restaurantList');

    if (restaurants.length === 0) {
      restaurantList.innerHTML = '<div class="col-12 text-center"><p>Chưa có nhà hàng nào</p></div>';
      return;
    }

    restaurantList.innerHTML = restaurants.map((restaurant, index) => `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${(index * 0.1).toFixed(1)}s">
        <div class="restaurant-card">
          <img src="${restaurant.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(restaurant.name)}" alt="${restaurant.name}" />
          <div class="restaurant-card-body">
            <h5>${restaurant.name}</h5>
            <p>${restaurant.description || 'Nhà hàng chất lượng'}</p>
            <p class="address"><i class="fas fa-map-marker-alt"></i> ${restaurant.address || 'Hà Nội'}</p>
            <p class="rating">
              <i class="fas fa-star"></i> ${restaurant.rating || 4.5}
            </p>
            <button class="btn btn-primary btn-sm w-100 mt-2" onclick="addToCart(${restaurant.id})">
              <i class="fas fa-shopping-cart me-2"></i>Đặt hàng
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Reinitialize WOW animations
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  } catch (error) {
    console.error('Error loading restaurants:', error);
    document.getElementById('restaurantList').innerHTML =
      '<div class="col-12 text-center text-danger"><p>Lỗi tải dữ liệu</p></div>';
  }
}

// Search restaurants
function searchRestaurant(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value;

  if (!query.trim()) {
    loadRestaurants();
    return;
  }

  fetch(`/api/home/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(results => {
      const restaurantList = document.getElementById('restaurantList');

      if (results.length === 0) {
        restaurantList.innerHTML = '<div class="col-12 text-center"><p>Không tìm thấy nhà hàng</p></div>';
        return;
      }

      restaurantList.innerHTML = results.map((restaurant, index) => `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${(index * 0.1).toFixed(1)}s">
          <div class="restaurant-card">
            <img src="${restaurant.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(restaurant.name)}" alt="${restaurant.name}" />
            <div class="restaurant-card-body">
              <h5>${restaurant.name}</h5>
              <p>${restaurant.description || 'Nhà hàng chất lượng'}</p>
              <p class="address"><i class="fas fa-map-marker-alt"></i> ${restaurant.address || 'Hà Nội'}</p>
              <p class="rating">
                <i class="fas fa-star"></i> ${restaurant.rating || 4.5}
              </p>
              <button class="btn btn-primary btn-sm w-100 mt-2" onclick="addToCart(${restaurant.id})">
                <i class="fas fa-shopping-cart me-2"></i>Đặt hàng
              </button>
            </div>
          </div>
        </div>
      `).join('');

      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    })
    .catch(error => console.error('Error searching:', error));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadRestaurants();

  // Check user login status
  const user = localStorage.getItem('user');
  if (user) {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('username').textContent = JSON.parse(user).username;
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
  }

  // Update cart count
  updateCartCount();
});

// Logout
function logout() {
  localStorage.removeItem('user');
  location.reload();
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const totalItems = Object.keys(cart).length;
  document.getElementById('cartCount').textContent = totalItems;
}

// Add to cart
function addToCart(restaurantId) {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  cart[restaurantId] = (cart[restaurantId] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Đã thêm vào giỏ hàng!');
}
