import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Parse JSON body
app.use(cors());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
