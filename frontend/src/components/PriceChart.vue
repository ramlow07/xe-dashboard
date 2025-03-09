<template>
  <div class="price-chart">
    <h3>Price Chart</h3>
    <canvas ref="priceChartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watch, ref } from "vue";
import type { PropType } from "vue";
import Chart from "chart.js/auto";
import type ChartItem from "chart.js";

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

    const createChart = (): void => {
      if (!priceChartCanvas.value || props.priceData.length === 0) return;

      const ctx = priceChartCanvas.value.getContext("2d");
      if (!ctx) return;

      // Process data
      const labels = props.priceData.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const prices = props.priceData.map((item) => item[1]);

      // Destroy previous chart if it exists
      if (chart) {
        chart.destroy();
      }

      // Chart configuration
      chart = new Chart(ctx as ChartItem, {
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
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipItem<"line">) => {
                  // Type guard to ensure context.raw is a number
                  const rawValue =
                    typeof context.raw === "number" ? context.raw : 0;
                  return formatCurrency(rawValue);
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 8,
              },
            },
            y: {
              grid: {
                color: "rgba(200, 200, 200, 0.2)",
              },
              ticks: {
                callback: (value) => {
                  return formatCurrency(value as number);
                },
              },
            },
          },
        },
      });
    };

    onMounted(() => {
      createChart();
    });

    // Recreate chart when data changes
    watch(
      () => props.priceData,
      () => {
        createChart();
      },
      { deep: true }
    );

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
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
  border-radius: 4px;
}
</style>
