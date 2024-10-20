import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";

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
        $sort: { _id: 1 }, 
      },
    ]);
    res.json(eventData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Count events per user
export const eventCountWithUsers = async (req, res) => {
  try {
    const eventData = await Event.aggregate([
      {
        $match: { category: { $in: ["Bank", "Branch"] } }, // Bank and Branch events
      },
      {
        $group: {
          _id: "$owner", // Group by user ID or username
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Sort by count in descending order
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
