<template>
  <div class="time-period-selector">
    <button
      v-for="period in periods"
      :key="period.value"
      :class="{ active: selectedPeriod === period.value }"
      @click="selectPeriod(period.value)"
    >
      {{ period.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TimePeriodSelector",
  emits: ["period-changed"],
  setup(_, { emit }) {
    const periods = [
      { label: "24H", value: "1" },
      { label: "7D", value: "7" },
      { label: "30D", value: "30" },
      { label: "90D", value: "90" },
      { label: "1Y", value: "365" },
      { label: "All", value: "max" },
    ];

    const selectedPeriod = ref("1");

    const selectPeriod = (period: string) => {
      selectedPeriod.value = period;
      emit("period-changed", period);
    };

    return {
      periods,
      selectedPeriod,
      selectPeriod,
    };
  },
});
</script>

<style scoped>
.time-period-selector {
  display: flex;
  gap: 8px;
}

.time-period-selector button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.time-period-selector button:hover {
  background-color: #f5f5f5;
}

.time-period-selector button.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}
</style>
