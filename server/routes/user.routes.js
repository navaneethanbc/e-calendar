import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:username").get(getUser);
router.route("/otp").post(sendOtp);
router.route("/otpverify").post(verifyOtp);
router.route("/resetpassword").post(resetPassword);

export default router;
