import express from "express";
import { getPrice } from "../controllers/priceController";
import { getHistoricalPrice } from "../controllers/priceController";
// import { getStats } from "../controllers/statsController";
import { getVolumeData } from "../controllers/volumeController";

import {
  createWatchlist,
  getWatchlist,
  updateWatchlist,
  deleteWatchlist,
} from "../controllers/watchlistController";

const router = express.Router();

router.get("/current", getPrice);
router.get("/historical", getHistoricalPrice);
// router.get("/", getStats);
router.get("/", getVolumeData);

router.post("/watchlists", createWatchlist);
router.get("/watchlists", getWatchlist);
router.get("/watchlists/:id", getWatchlist);
router.put("/watchlists/:id", updateWatchlist);
router.delete("/watchlists/:id", deleteWatchlist);

export default router;
