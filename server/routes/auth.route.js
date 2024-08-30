import express from "express";
import { User } from "../models/user.model.js";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).send({ message: "Invalid username or password." });

    const isPasswordValid = await user.isPasswordCorrect(req.body.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid username or password." });

    const accessToken = user.generateAuthToken();
    res.status(200).send({ accessToken, message: "Successfully signed in." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(user);
};

export default router;
