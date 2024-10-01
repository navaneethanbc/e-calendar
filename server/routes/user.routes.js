import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  sendOtp
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:username").get(getUser);
router.route("/otp").post(sendOtp)

export default router;
