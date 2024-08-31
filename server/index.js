import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";

dotenv.config({ path: "./.env" });

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
// app.use("/", authRoutes);

// connect to MongoDB
const port = process.env.PORT || 8001;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
