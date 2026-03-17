// Fetch và hiển thị danh sách nhà hàng
async function loadRestaurants() {
  try {
    const response = await fetch('/api/home/restaurants');
    const restaurants = await response.json();

    const restaurantList = document.getElementById('restaurants');
    restaurantList.innerHTML = restaurants.map(restaurant => `
      <div class="restaurant-card" onclick="viewRestaurant(${restaurant.id})">
        <img src="${restaurant.image || '/images/placeholder.jpg'}" alt="${restaurant.name}">
        <div class="restaurant-card-body">
          <h3>${restaurant.name}</h3>
          <p>${restaurant.description}</p>
          <p>${restaurant.address}</p>
          <p class="rating">⭐ ${restaurant.rating}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading restaurants:', error);
  }
}

// Tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
      const query = e.target.value;
      if (!query) {
        loadRestaurants();
        return;
      }

      try {
        const response = await fetch(`/api/home/search?q=${encodeURIComponent(query)}`);
        const results = await response.json();

        const restaurantList = document.getElementById('restaurants');
        restaurantList.innerHTML = results.map(restaurant => `
          <div class="restaurant-card" onclick="viewRestaurant(${restaurant.id})">
            <img src="${restaurant.image || '/images/placeholder.jpg'}" alt="${restaurant.name}">
            <div class="restaurant-card-body">
              <h3>${restaurant.name}</h3>
              <p>${restaurant.description}</p>
              <p>${restaurant.address}</p>
              <p class="rating">⭐ ${restaurant.rating}</p>
            </div>
          </div>
        `).join('');
      } catch (error) {
        console.error('Error searching:', error);
      }
    });
  }

  loadRestaurants();
});

// Xem chi tiết nhà hàng
function viewRestaurant(id) {
  // Có thể redirect đến trang chi tiết
  alert(`Xem nhà hàng ${id} - sẽ phát triển thêm`);
}
