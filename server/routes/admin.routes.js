import { Router } from "express";
import {
  bankEvent,
  branchEvent,
  eventDetails,
  eventDetailsBank,
  eventDetailsBranch,
  getUserCount,
  userReport,
  viewUser,
  viewUsers,
} from "../controllers/admin.controllers.js";

const router = Router();

router.route("/count/").get(getUserCount);
router.route("/view/").get(viewUser);
router.route("/views/").get(viewUsers);
router.route("/eventdetails").get(eventDetails);
router.route("/eventdetailsbank").get(eventDetailsBank);
router.route("/eventdetailsbranch").get(eventDetailsBranch);
router.route("/userreport").get(userReport);
router.route("/branchevent/:branch").get(branchEvent);
router.route("/bankevent").get(bankEvent);

export default router;
