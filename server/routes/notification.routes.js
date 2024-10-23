import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  inviteResponse,
} from "../controllers/notification.controllers.js";

const router = Router();

router.route("/:username").get(getNotifications);
router.route("/mark/:_id").patch(markAsRead);
router.route("/markall/:username").patch(markAllAsRead);
router.route("/respond/:_id").post(inviteResponse);

export default router;
