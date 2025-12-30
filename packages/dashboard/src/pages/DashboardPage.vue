<template>
  <div class="dashboard-container">
    <div class="container">
      <h1 class="dashboard-title">Dashboard Analytics</h1>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <StatsCard
          v-for="(stat, index) in stats"
          :key="index"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :icon="stat.icon"
          :color="stat.color"
        />
      </div>

      <!-- Charts and Recent Orders -->
      <div class="content-grid">
        <div class="chart-section">
          <div class="card">
            <h2 class="section-title">Sales Overview</h2>
            <SalesChart />
          </div>
        </div>

        <div class="orders-section">
          <div class="card">
            <h2 class="section-title">Recent Orders</h2>
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from '../components/StatsCard.vue';
import SalesChart from '../components/SalesChart.vue';
import RecentOrders from '../components/RecentOrders.vue';

export default {
  name: 'DashboardPage',
  components: {
    StatsCard,
    SalesChart,
    RecentOrders,
  },
  data() {
    return {
      stats: [
        {
          title: 'Total Revenue',
          value: 'Loading...',
          change: '+0%',
          icon: '💰',
          color: '#2563eb',
        },
        {
          title: 'Total Orders',
          value: 'Loading...',
          change: '+0%',
          icon: '🛒',
          color: '#0891b2',
        },
        {
          title: 'Active Users',
          value: 'Loading...',
          change: '+0%',
          icon: '👥',
          color: '#10b981',
        },
        {
          title: 'Growth Rate',
          value: 'Loading...',
          change: '+0%',
          icon: '📈',
          color: '#8b5cf6',
        },
      ],
    };
  },
  async mounted() {
    await this.fetchDashboardStats();
  },
  methods: {
    async fetchDashboardStats() {
      try {
        // Fetch products, carts, and users in parallel
        const [productsRes, cartsRes, usersRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/carts'),
          fetch('https://fakestoreapi.com/users'),
        ]);

        const products = await productsRes.json();
        const carts = await cartsRes.json();
        const users = await usersRes.json();

        // Calculate total revenue from products
        const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
        
        // Total orders is the number of carts
        const totalOrders = carts.length;
        
        // Active users
        const activeUsers = users.length;
        
        // Calculate growth rate based on cart data
        const recentCarts = carts.filter(cart => new Date(cart.date) > new Date('2020-01-01')).length;
        const growthRate = ((recentCarts / totalOrders) * 100).toFixed(1);

        // Update stats
        this.stats[0].value = `$${totalRevenue.toFixed(2).toLocaleString()}`;
        this.stats[0].change = '+12.5%';
        
        this.stats[1].value = totalOrders.toString();
        this.stats[1].change = '+8.2%';
        
        this.stats[2].value = activeUsers.toString();
        this.stats[2].change = '+15.3%';
        
        this.stats[3].value = `${growthRate}%`;
        this.stats[3].change = '+3.1%';
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dashboard-title {
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>
