import express from "express";
import { getPrice, getHistoricalPrice } from "../controllers/priceController";

const router = express.Router();

router.get("/current", getPrice);
router.get("/historical", getHistoricalPrice);

export default router;
