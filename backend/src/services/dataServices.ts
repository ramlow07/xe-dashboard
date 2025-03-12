import axios from "axios";

export const fetchCurrentPrice = async () => {
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
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${period}`
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};

/* WIP: THIS FUNCTION TAKES A HUGE INFORMATION FROM CRYPTO. GOING TO DECIDE WHERE IT WILL BE AT THE FRONTEND.
export const fetchStats = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
}; */

export const fetchVolumeData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
    );
    return response.data;
  } catch (error) {
    throw new Error("API request failed");
  }
};
