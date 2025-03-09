// src/components/VolumeChart.vue
<template>
  <div class="volume-chart">
    <h3>Volume Chart</h3>
    <canvas ref="volumeChartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { PropType } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "VolumeChart",
  props: {
    volumeData: {
      type: Array as PropType<[number, number][]>,
      required: true,
    },
  },
  setup(props) {
    const volumeChartCanvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chart | null = null;

    onMounted(() => {
      if (volumeChartCanvas.value) {
        const ctx = volumeChartCanvas.value.getContext("2d");
        if (ctx) {
          // Process data
          const labels = props.volumeData.map((item) =>
            new Date(item[0]).toLocaleDateString()
          );
          const volumes = props.volumeData.map((item) => item[1]);

          chart = new Chart(ctx, {
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
      volumeChartCanvas,
    };
  },
});
</script>

<style scoped>
.volume-chart {
  width: 100%;
  height: 250px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
