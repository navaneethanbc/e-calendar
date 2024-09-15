import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";

import notifyRoutes from "./routes/notification.route.js";
import eventRoutes from "./routes/event.route.js";

dotenv.config({ path: "./.env" });

const app = express();

// middlewares
app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

app.use("/api/notifications", notifyRoutes);
app.use("/api/events", eventRoutes);

// connect to MongoDB
const port = process.env.PORT || 8001;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
