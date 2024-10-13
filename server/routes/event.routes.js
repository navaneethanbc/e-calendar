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

router.route("/create/").post(createEvent);
router.route("/find/").post(getEvents);
router.route("/availability/").post(getAvailablity);

router.route("/:id").get(getEvent);
router.route("/:id").put(editEvent);
router.route("/:id").delete(deleteEvent);

export default router;
