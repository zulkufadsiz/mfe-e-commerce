<template>
  <div class="stats-card" :style="{ '--card-color': color }">
    <div class="stats-content">
      <div class="stats-info">
        <p class="stats-label">{{ title }}</p>
        <h3 class="stats-value">{{ value }}</h3>
        <p class="stats-change" :class="{ positive: isPositive, negative: !isPositive }">
          {{ change }}
        </p>
      </div>
      <div class="stats-icon">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    title: String,
    value: String,
    change: String,
    icon: String,
    color: String,
  },
  computed: {
    isPositive() {
      return this.change.startsWith('+');
    },
  },
};
</script>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.stats-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.stats-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stats-info {
  flex: 1;
}

.stats-label {
  color: #666;
  font-weight: 500;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.stats-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--card-color) 0%, var(--card-color)99 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-change {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.stats-change.positive {
  color: #4caf50;
}

.stats-change.negative {
  color: #f44336;
}

.stats-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--card-color)20 0%, var(--card-color)40 100%);
  font-size: 2rem;
}
</style>
