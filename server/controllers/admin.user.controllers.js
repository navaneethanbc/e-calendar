import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import bcrypt from "bcryptjs";

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    res.status(200).json({ userCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all users in the database with selected fields
export const viewUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "username fullname employee_id branch role email last_login"
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in fetching users:", error.message);
    res.status(500).json({ message: "Server error, could not fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Find and delete the user by username
    const user = await User.findOneAndDelete({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all events
    await Event.deleteMany({ owner: user.username });

    res
      .status(200)
      .json({ message: "User and associated events deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUsername = async (req, res) => {
  try {
    // Find the user by the current username
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the username
    const newUsername = req.body.newUsername;
    if (!newUsername) {
      return res.status(400).json({ message: "New username is required" });
    }

    // Check  new username is already in use
    const usernameExists = await User.findOne({ username: newUsername });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }
    user.username = newUsername;
    await user.save();

    // Update the username in all related events
    await Event.updateMany(
      { owner: req.params.username },
      { owner: newUsername }
    );

    res
      .status(200)
      .json({ message: "Username and associated events updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userReport = async (req, res) => {
  try {
    const userData = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$last_login" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const viewUsersByBranch = async (req, res) => {
  const { branch } = req.params;

  try {
    // Find users in the specific branch
    const users = await User.find({ branch }).select(
      "username fullname employee_id branch role email last_login"
    );

    if (users.length === 0) {
      return res.status(404).json({ message: `No users found in ${branch}` });
    }

    // Send user count
    res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    console.error("Error in fetching users by branch:", error.message);
    res.status(500).json({ message: "Server error, could not fetch users" });
  }
};

// add a new user
export const addUser = async (req, res) => {
  try {
    const { username, password, email, fullname, employee_id, branch } =
      req.body;

    // Check if already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    let role = "";
    const employeeIdPrefix = employee_id.slice(0, 3).toUpperCase();

    switch (employeeIdPrefix) {
      case "ADM":
        role = "admin";
        break;
      case "MNG":
        role = "manager";
        break;
      case "EMP":
        role = "employee";
        break;
      case "TRN":
        role = "trainee";
        break;
      default:
        return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
      email,
      fullname,
      employee_id,
      branch,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error, unable to create user" });
  }
};

// admin
export const userAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    let role = user.employee_id.slice(0, 3).toUpperCase();

    if (role === "ADM") return res.json(role);
    else {
      return res.json({ messege: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid user" });
  }
};
