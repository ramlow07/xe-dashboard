import axios from "axios";

export const fetchCurrentPrice = async () => {
  // Replace with actual API call
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};

export const fetchHistoricalPrice = async (period: string) => {
  // Replace with actual historical price fetching logic
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${period}`
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};

export const fetchStats = async () => {
  // Replace with actual data fetching logic
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};

export const fetchVolumeData = async () => {
  // Replace with actual volume data fetching logic
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};
