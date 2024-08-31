import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import notifyRoutes from "./routes/notification1.route.js";

dotenv.config({ path: "./.env" });

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notifyRoutes);

const port = process.env.PORT || 8001;

// connect to MongoDB
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
