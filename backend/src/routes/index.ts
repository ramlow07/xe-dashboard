import express from "express";
import { getPrice } from "../controllers/priceController";
import { getHistoricalPrice } from "../controllers/priceController";
import { getStats } from "../controllers/statsController";
import { getVolumeData } from "../controllers/volumeController";

router.get("/current", getPrice);
router.get("/historical", getHistoricalPrice);
router.get("/", getStats);
router.get("/", getVolumeData);
