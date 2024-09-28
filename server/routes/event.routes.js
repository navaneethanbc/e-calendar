import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  editEvent,
  deleteEvent,
  getAvailablity,
} from "../controllers/event.controllers.js";

const router = Router();

router.route("/").post(createEvent);
router.route("/").get(getEvents);
router.route("/availability/").get(getAvailablity);

router.route("/:id").get(getEvent);
router.route("/:id").put(editEvent);
router.route("/:id").delete(deleteEvent);

export default router;
