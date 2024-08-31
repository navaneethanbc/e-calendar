import { User } from "../models/user.model.js";
import { validateLogin, validateRegister } from "../utils/userValidator.js";
import { admin_id } from "../constants.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
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

    user.role = admin_id.includes(req.body.employee_id) ? "admin" : "user";
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

    res.status(200).send({ accessToken, message: "Successfully signed in." });
  } catch (error) {
    // res.status(500).send({ message: "Something went wrong!" });
    res.status(500).send({ message: error.message });
  }
};
