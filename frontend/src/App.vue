<template>
  <AppDashboard />
  <MetricsCard />
  <PriceChart />
  <VolumeChart />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MetricsCard from "./components/MetricsCard.vue";
import PriceChart from "./components/PriceChart.vue";
import VolumeChart from "./components/VolumeChart.vue";
import AppDashboard from "./components/AppDashboard.vue";

@Options({
  components: {
    MetricsCard,
    PriceChart,
    VolumeChart,
    AppDashboard,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
