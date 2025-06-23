// ❶ ─ Load environment variables immediately
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

// ❷ ─ Initialise the shared Mongo connection
import "./services/db";

// ❸ ─ Import the router (which itself imports the Chat model)
import { aiRouter } from "./routes/ai";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", aiRouter);

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
