import { Router } from "express";
import * as controller from "../controllers/event.controllers.js";

const router = Router();

router.route("/viewevent").get(controller.ViewEvent);
router.route("/addevent").post(controller.AddEvent);
router.route("/updateevent/:id").put(controller.UpdateEvent);
router.route("/deleteevent/:id").delete(controller.DeleteEvent);

export default router;
