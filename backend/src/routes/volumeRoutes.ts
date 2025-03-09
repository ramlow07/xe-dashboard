import express from "express";
import { getVolumeData } from "../controllers/volumeController";

const router = express.Router();

router.get("/", getVolumeData);

export default router;
