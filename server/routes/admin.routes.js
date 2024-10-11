import { Router } from "express";
import {
  bankEvent,
  branchEvent,
  eventCountWithUsers,
  eventDetails,
  eventDetailsBank,
  eventDetailsBranch,
} from "../controllers/adminEventHandler.controllers.js";

import {
  getUserCount,
  updateUsername,
  userReport,
  viewUsers,
  deleteUser,
  addUser,
  viewUsersByBranch,
} from "../controllers/adminUsersHandle.controllers.js";

const router = Router();

//user

router.route("/count/").get(getUserCount);
router.route("/views/").get(viewUsers);
router.route("/branchusers/:branch").get(viewUsersByBranch);
router.route("/deleteuser/:username").delete(deleteUser);
router.route("/updateuser/:username").put(updateUsername);
router.route("/userreport").get(userReport);
router.route("/adduser").post(addUser);

// event

router.route("/eventdetails").get(eventDetails);
router.route("/eventdetailsbank").get(eventDetailsBank);
router.route("/eventdetailsbranch").get(eventDetailsBranch);
router.route("/branchevent/:branch").get(branchEvent);
router.route("/bankevent").get(bankEvent);
router.route("/eventcountwithusers").get(eventCountWithUsers);

export default router;
