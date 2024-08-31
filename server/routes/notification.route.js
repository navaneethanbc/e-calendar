import { Router } from "express";
import {
  getNotifications,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", getNotifications);

router.get("/notifications/:userId", getUserNotifications);

router.post("/read/:id", markNotificationAsRead);

export default router;
