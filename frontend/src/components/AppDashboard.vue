<template>
  <div class="dashboard">
    <h1>Crypto Dashboard</h1>

    <div class="period-selector">
      <button
        v-for="period in periods"
        :key="period.value"
        :class="{ active: currentPeriod === period.value }"
        @click="changePeriod(period.value)"
      >
        {{ period.label }}
      </button>
    </div>

    <div v-if="loading" class="loading">Loading data...</div>

    <div v-else class="dashboard-grid">
      <div class="card">
        <h3>Price: ${{ formatPrice(coinData.price) }}</h3>
        <p :class="coinData.priceChange >= 0 ? 'positive' : 'negative'">
          24h Change: {{ coinData.priceChange >= 0 ? "+" : ""
          }}{{ coinData.priceChange.toFixed(2) }}%
        </p>
        <PriceChart :priceData="marketData.prices" />
      </div>

      <div class="card">
        <h3>Volume: ${{ formatLargeNumber(coinData.volume) }}</h3>
        <p>Market Cap: ${{ formatLargeNumber(coinData.marketCap) }}</p>
        <VolumeChart :volumeData="marketData.volumes" />
        <MetricsCard />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import PriceChart from "./PriceChart.vue";
import VolumeChart from "./VolumeChart.vue";
import MetricsCard from "./MetricsCard.vue";

export default defineComponent({
  name: "AppDashboard",
  components: {
    PriceChart,
    VolumeChart,
    MetricsCard,
  },
  setup() {
    const loading = ref(true);
    const currentPeriod = ref("1");
    const coinId = ref("bitcoin");

    const periods = [
      { label: "24H", value: "1" },
      { label: "7D", value: "7" },
      { label: "30D", value: "30" },
      { label: "MAX", value: "max" },
    ];

    const coinData = ref({
      price: 0,
      priceChange: 0,
      volume: 0,
      marketCap: 0,
    });

    const marketData = ref({
      prices: [],
      volumes: [],
    });

    const formatPrice = (price) => {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const formatLargeNumber = (num) => {
      if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
      if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
      return num.toFixed(2);
    };

    const fetchData = async () => {
      loading.value = true;

      try {
        // Fetch market chart data
        const marketResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId.value}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: currentPeriod.value,
            },
          }
        );

        // Fetch coin data
        const coinResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId.value}`
        );

        // Update data
        marketData.value = {
          prices: marketResponse.data.prices,
          volumes: marketResponse.data.total_volumes,
        };

        coinData.value = {
          price: coinResponse.data.market_data.current_price.usd,
          priceChange:
            coinResponse.data.market_data.price_change_percentage_24h,
          volume: coinResponse.data.market_data.total_volume.usd,
          marketCap: coinResponse.data.market_data.market_cap.usd,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    const changePeriod = (period) => {
      currentPeriod.value = period;
      fetchData();
    };

    onMounted(fetchData);

    return {
      loading,
      periods,
      currentPeriod,
      coinData,
      marketData,
      formatPrice,
      formatLargeNumber,
      changePeriod,
    };
  },
});
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.period-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.period-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.period-selector button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.positive {
  color: #2ecc71;
}
.negative {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
