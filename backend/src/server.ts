import express from "express";
import dotenv from "dotenv";
import priceRoutes from "./routes/priceRoutes";
import statsRoutes from "./routes/statsRoutes";
import volumeRoutes from "./routes/volumeRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/price", priceRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/volume", volumeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
