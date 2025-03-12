import type { Request, Response } from "express";
import {
  fetchCurrentPrice,
  fetchHistoricalPrice,
} from "../services/dataServices";

import { RequestHandler } from "express";

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
    /* had a problem requesting a query parameter. added a parameter to request this query 
    as a unknown to after that transform it in a string.*/
    const period = req.query as unknown as string;
    const priceHistory = await fetchHistoricalPrice(period);
    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch historical price" });
  }
};
