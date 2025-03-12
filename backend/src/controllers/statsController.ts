/* import type { Request, Response } from "express";
import { fetchStats } from "../services/dataServices";

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await fetchStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
*/
