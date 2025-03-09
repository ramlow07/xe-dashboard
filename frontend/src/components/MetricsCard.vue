// src/components/MetricsCard.vue
<template>
  <div class="metrics-card">
    <div class="card-grid">
      <div class="card" v-for="(metric, index) in metrics" :key="index">
        <div class="card-title">{{ metric.label }}</div>
        <div class="card-value">{{ metric.value }}</div>
        <div class="card-change" :class="getChangeClass(metric.change)">
          {{ metric.change > 0 ? "+" : "" }}{{ metric.change }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { defineComponent, PropType } from "vue";

interface Metric {
  label: string;
  value: string;
  change: number;
}

export default defineComponent({
  name: "MetricsCard",
  props: {
    metrics: {
      type: Array as PropType<Metric[]>,
      required: true,
    },
  },
  setup() {
    const getChangeClass = (change: number) => {
      return {
        positive: change > 0,
        negative: change < 0,
        neutral: change === 0,
      };
    };

    return {
      getChangeClass,
    };
  },
});
</script>

<style scoped>
.metrics-card {
  margin-bottom: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.card-value {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-change {
  font-size: 14px;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

.neutral {
  color: #9e9e9e;
}
</style>
