<template>
  <div class="volume-chart">
    <h3>Trading Volume</h3>
    <canvas ref="volumeChartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  PropType,
} from "vue";
import { Chart, ChartItem, TooltipItem } from "chart.js";

type VolumeDataPoint = [number, number]; // [timestamp, volume]

export default defineComponent({
  name: "VolumeChartView",
  props: {
    volumeData: {
      type: Array as PropType<VolumeDataPoint[]>,
      required: true,
    },
  },
  setup(props) {
    const volumeChartCanvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chart | null = null;

    // Format currency consistently
    const formatCurrency = (value: number): string => {
      return `$${value.toLocaleString("en-US")}`;
    };

    const createChart = (): void => {
      if (!volumeChartCanvas.value || props.volumeData.length === 0) return;

      const ctx = volumeChartCanvas.value.getContext("2d");
      if (!ctx) return;

      // Process data
      const labels = props.volumeData.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const volumes = props.volumeData.map((item) => item[1]);

      // Destroy previous chart if it exists
      if (chart) {
        chart.destroy();
      }

      // Chart configuration
      chart = new Chart(ctx as ChartItem, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Volume (USD)",
              data: volumes,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
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
                label: (context: TooltipItem<"bar">) => {
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

    // Lifecycle hooks
    onMounted(createChart);

    watch(() => props.volumeData, createChart, { deep: true });

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    });

    return {
      volumeChartCanvas,
    };
  },
});
</script>

<style scoped>
.volume-chart {
  width: 100%;
  height: 300px;
  padding: 10px;
  border-radius: 4px;
}
</style>
