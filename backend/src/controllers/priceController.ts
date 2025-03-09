import type { Request, Response } from "express";
import {
  fetchCurrentPrice,
  fetchHistoricalPrice,
} from "../services/dataServices";

export const getPrice = async (req: Request, res: Response) => {
  try {
    const price = await fetchCurrentPrice();
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch current price" });
  }
};

export const getHistoricalPrice = async (req: Request, res: Response) => {
  try {
    const { period } = req.query; // Example: "1d", "1w", etc.
    const priceHistory = await fetchHistoricalPrice(period);
    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch historical price" });
  }
};
