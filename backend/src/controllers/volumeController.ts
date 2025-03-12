import type { Request, Response } from "express";
import { fetchVolumeData } from "../services/dataServices";

export const getVolumeData = async (req: Request, res: Response) => {
  try {
    const volume = await fetchVolumeData();
    res.json(volume);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trading volume data" });
  }
};
