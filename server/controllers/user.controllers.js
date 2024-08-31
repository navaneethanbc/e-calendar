import { User } from "../models/user.model.js";
import { validateUser } from "../utils/userValidator.js";
import { adminID } from "../constants.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ message: "All fields should be filled correctly" });
    //   return res.status(400).send({ message: error.details[0].message });

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

    user.role = adminID.includes(req.body.employee_id) ? "admin" : "user";
    user.last_login = new Date();

    await user.save();

    const createdUser = await User.findOne({ username: req.body.username });
    if (!createdUser)
      return res.status(500).send({ message: "Failed to register" });

    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
