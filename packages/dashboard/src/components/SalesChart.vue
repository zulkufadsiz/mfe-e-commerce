<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'SalesChart',
  components: {
    Line,
  },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Revenue',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'Orders',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#0891b2',
            backgroundColor: 'rgba(8, 145, 178, 0.1)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxPadding: 6,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f0f0',
            },
            ticks: {
              color: '#666',
            },
          },
          x: {
            grid: {
              color: '#f0f0f0',
            },
            ticks: {
              color: '#666',
            },
          },
        },
      },
    };
  },
  async mounted() {
    await this.fetchSalesData();
  },
  methods: {
    async fetchSalesData() {
      try {
        // Fetch carts data
        const response = await fetch('https://fakestoreapi.com/carts');
        const carts = await response.json();

        // Fetch products for pricing
        const productsRes = await fetch('https://fakestoreapi.com/products');
        const products = await productsRes.json();

        // Create a map of product prices
        const priceMap = {};
        products.forEach(product => {
          priceMap[product.id] = product.price;
        });

        // Group carts by month
        const monthlyData = {
          1: { revenue: 0, orders: 0 },
          2: { revenue: 0, orders: 0 },
          3: { revenue: 0, orders: 0 },
          4: { revenue: 0, orders: 0 },
          5: { revenue: 0, orders: 0 },
          6: { revenue: 0, orders: 0 },
          7: { revenue: 0, orders: 0 },
        };

        carts.forEach(cart => {
          const date = new Date(cart.date);
          const month = date.getMonth() + 1;
          
          if (month >= 1 && month <= 7) {
            monthlyData[month].orders += 1;
            
            // Calculate cart total
            const cartTotal = cart.products.reduce((sum, item) => {
              const price = priceMap[item.productId] || 0;
              return sum + (price * item.quantity);
            }, 0);
            
            monthlyData[month].revenue += cartTotal;
          }
        });

        // Update chart data
        this.chartData.datasets[0].data = [
          monthlyData[1].revenue,
          monthlyData[2].revenue,
          monthlyData[3].revenue,
          monthlyData[4].revenue,
          monthlyData[5].revenue,
          monthlyData[6].revenue,
          monthlyData[7].revenue,
        ].map(val => Math.round(val));

        this.chartData.datasets[1].data = [
          monthlyData[1].orders,
          monthlyData[2].orders,
          monthlyData[3].orders,
          monthlyData[4].orders,
          monthlyData[5].orders,
          monthlyData[6].orders,
          monthlyData[7].orders,
        ];
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
}
</style>
