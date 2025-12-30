<template>
  <div class="orders-list">
    <div
      v-for="(order, index) in orders"
      :key="order.id"
      class="order-item"
      :class="{ 'has-border': index < orders.length - 1 }"
    >
      <div class="order-header">
        <div class="order-info">
          <p class="order-id">{{ order.id }}</p>
          <p class="order-customer">{{ order.customer }}</p>
        </div>
        <span class="order-status" :class="`status-${getStatusClass(order.status)}`">
          {{ order.status }}
        </span>
      </div>
      <p class="order-amount">{{ order.amount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentOrders',
  data() {
    return {
      orders: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchRecentOrders();
  },
  methods: {
    async fetchRecentOrders() {
      try {
        // Fetch carts and users
        const [cartsRes, usersRes, productsRes] = await Promise.all([
          fetch('https://fakestoreapi.com/carts?limit=5'),
          fetch('https://fakestoreapi.com/users'),
          fetch('https://fakestoreapi.com/products'),
        ]);

        const carts = await cartsRes.json();
        const users = await usersRes.json();
        const products = await productsRes.json();

        // Create maps for quick lookup
        const userMap = {};
        users.forEach(user => {
          userMap[user.id] = `${user.name.firstname} ${user.name.lastname}`;
        });

        const priceMap = {};
        products.forEach(product => {
          priceMap[product.id] = product.price;
        });

        // Transform carts to orders
        this.orders = carts.map((cart, index) => {
          const cartTotal = cart.products.reduce((sum, item) => {
            const price = priceMap[item.productId] || 0;
            return sum + (price * item.quantity);
          }, 0);

          const statuses = ['Delivered', 'Processing', 'Shipped', 'Processing', 'Delivered'];
          
          return {
            id: `#${1234 + index}`,
            customer: userMap[cart.userId] || 'Unknown User',
            amount: `$${cartTotal.toFixed(2)}`,
            status: statuses[index % statuses.length],
          };
        });

        this.loading = false;
      } catch (error) {
        console.error('Error fetching recent orders:', error);
        this.loading = false;
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 'Delivered':
          return 'success';
        case 'Shipped':
          return 'info';
        case 'Processing':
          return 'warning';
        default:
          return 'default';
      }
    },
  },
};
</script>

<style scoped>
.orders-list {
  display: flex;
  flex-direction: column;
}

.order-item {
  padding: 1rem 0;
}

.order-item.has-border {
  border-bottom: 1px solid #f0f0f0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.order-info {
  flex: 1;
}

.order-id {
  font-weight: bold;
  color: #2563eb;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
}

.order-customer {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-info {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-warning {
  background-color: #fff3e0;
  color: #e65100;
}

.status-default {
  background-color: #f5f5f5;
  color: #616161;
}

.order-amount {
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  color: #333;
}
</style>
