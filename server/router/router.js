import { Router } from "express";

const router = Router();

import * as controller from "../controllers/controllers.js";

router
  .route("/notification")
  .get(controller.getNotification)
  .post(controller.displayNotification);

export default router;
