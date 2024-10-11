import { Router } from "express";
import { getNotifications } from "../controllers/notification.controllers.js";

const router = Router();

router.route("/:username").get(getNotifications);

export default router;
