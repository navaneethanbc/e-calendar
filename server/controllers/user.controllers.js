import { User } from "../models/user.model.js";
import {
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../utils/userValidator.js";
import { generateAuthToken } from "../utils/tokenUtils.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      // return res
      //   .status(400)
      //   .send({ message: "All fields should be filled correctly" });
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
        { employee_id: req.body.employee_id },
      ],
    });
    if (existingUser)
      return res.status(409).send({ message: "User already exists." });

    const user = new User(req.body);

    user.role = req.body.employee_id.includes("ADM")
      ? "admin"
      : req.body.employee_id.includes("MNG")
      ? "manager"
      : req.body.employee_id.includes("EMP")
      ? "employee"
      : "trainee";

    user.last_login = new Date();

    await user.save();

    const createdUser = await User.findOne({ username: req.body.username });
    if (!createdUser)
      return res.status(500).send({ message: "Failed to register" });

    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    // res.status(500).send({ message: "Something went wrong!" });
    res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .send({ message: "Username or Password is not valid." });
    //   return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).send({ message: "Invalid username or password." });

    const isPasswordValid = await user.isPasswordCorrect(req.body.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid username or password." });

    const accessToken = generateAuthToken(user);

    user.last_login = new Date();
    await user.save();

    res.status(200).send({
      accessToken,
      name: user.fullname,
      role: user.role,
      message: "Successfully signed in.",
    });
  } catch (error) {
    // res.status(500).send({ message: "Something went wrong!" });
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    return res.status(200).json({ user });
  } catch (error) {
    // res.status(500).send({ message: "Something went wrong!" });
    res.status(500).send({ message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { username } = req.body;
    //console.log("Received username:", username);

    const user = await User.findOne({ username });
    //console.log("Found user:", user);

    if (!user) {
      return res.status(404).send({ message: "username is invalid " });
    }

    const token = crypto.randomBytes(8).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const emailSubject = `Password Reset OTP for ${user.username}`;
    const emailBody = `Use this otp for your password reset. OTP: ${token}  it will expires in 10 minutes`;

    //console.log("Attempting to send email to:", user.email);
    res
      .status(200)
      .send({ message: "OTP generated successfully check your email" });
    await sendEmail(user.email, emailSubject, emailBody);
  } catch (error) {
    console.error("Detailed error in forgot password process:", error);
    res.status(500).send({ message: "Error in forgot password process" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "usename is invalid" });
    }
    if (!user.resetToken || user.resetTokenExpires < Date.now()) {
      return res
        .status(400)
        .send({ message: "your otp is invalid or expired" });
    }
    if (user.resetToken !== otp) {
      return res.status(400).send({ message: "otp you entered is wrong." });
    }

    user.otpVerified = true;
    await user.save();
    res.status(200).send({ message: "otp verfication success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "error in otp verification" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    //console.log(" api connected")
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "usename is invalid" });
    }
    //console.log("username accepted")
    const { error } = validateResetPassword({ username, password });
    if (error) {
      console.log("error in response generate");
      return res.status(400).send({ message: error.details[0].message });
    }
    //console.log("error accepted")

    if (!user.otpVerified) {
      return res
        .status(400)
        .send({ message: "otp verification required to change the password" });
    }
    //console.log("otpverified accepted")

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    user.otpVerified = undefined;
    await user.save();
    //console.log("undeifined accepted")
    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in password reset:", error);
    res.status(500).send({ message: "Error in password reset process" });
  }
};
