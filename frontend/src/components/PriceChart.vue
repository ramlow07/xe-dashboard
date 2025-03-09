// src/components/PriceChart.vue
<template>
  <div class="price-chart">
    <h3>Price Chart</h3>
    <canvas ref="priceChartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import type { defineComponent, onMounted, ref, PropType } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "PriceChart",
  props: {
    priceData: {
      type: Array as PropType<[number, number][]>,
      required: true,
    },
  },
  setup(props) {
    const priceChartCanvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chart | null = null;

    onMounted(() => {
      if (priceChartCanvas.value) {
        const ctx = priceChartCanvas.value.getContext("2d");
        if (ctx) {
          // Process data
          const labels = props.priceData.map((item) =>
            new Date(item[0]).toLocaleDateString()
          );
          const prices = props.priceData.map((item) => item[1]);

          chart = new Chart(ctx, {
            type: "line",
            data: {
              labels,
              datasets: [
                {
                  label: "Price (USD)",
                  data: prices,
                  borderColor: "#4CAF50",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  tension: 0.1,
                  fill: true,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          });
        }
      }
    });

    return {
      priceChartCanvas,
    };
  },
});
</script>

<style scoped>
.price-chart {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
