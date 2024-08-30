import express from "express";
import { User, validateUser } from "../models/user.model.js";

const router = express.Router();

router.post("/form", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
        { employeeId: req.body.employeeId },
      ],
    });
    if (user) {
      if (user.username === req.body.username) {
        return res.status(409).send({ message: "Username is already taken." });
      }
      if (user.email === req.body.email) {
        return res
          .status(409)
          .send({ message: "Email is already registered." });
      }
      if (user.employeeId === req.body.employeeId) {
        return res
          .status(409)
          .send({ message: "Employee ID is already registered." });
      }
    }

    await new User(req.body).save();
    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
