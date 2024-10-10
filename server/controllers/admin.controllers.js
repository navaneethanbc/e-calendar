import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import { EventGuest } from "../models/event_guest.model.js";

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
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in fetching users:", error.message);
    res.status(500).json({ message: "Server error, could not fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const viewUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found
    }

    res.status(200).json({ user }); // Return the single user
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

export const eventDetails = async (req, res) => {
  try {
    const eventData = await Event.aggregate([
      {
        $match: { category: { $in: ["Bank", "Branch"] } }, // Bank and Branch events
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$starts_at" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by the date in ascending order
      },
    ]);
    res.json(eventData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const eventDetailsBank = async (req, res) => {
  try {
    const eventData = await Event.aggregate([
      {
        $match: { category: "Bank" }, // Only include Bank events
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$starts_at" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(eventData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const eventDetailsBranch = async (req, res) => {
  try {
    const eventData = await Event.aggregate([
      {
        $match: { category: "Branch" }, // Only include Branch events
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$starts_at" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(eventData);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

export const branchEvent = async (req, res) => {
  const { branch } = req.params;

  try {
    // Find specified branch
    const usersInBranch = await User.find({ branch: branch });

    const userName = usersInBranch.map((user) => user.username);
    const branchEvents = await Event.find({
      category: "Branch",
      owner: { $in: userName },
    });

    return res.status(200).json(branchEvents);
  } catch (error) {
    console.error("Error fetching branch events:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const bankEvent = async (req, res) => {
  try {
    const bankEvents = await Event.find({
      category: "Bank",
    });

    return res.status(200).json(bankEvents);
  } catch (error) {
    console.error("Error fetching branch events:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
