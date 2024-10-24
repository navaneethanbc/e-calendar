import { Notification } from "../models/notification.model.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { EventGuest } from "../models/event_guest.model.js";

// get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find(
      {
        assigned_to: req.params.username,
        designated_time: { $lte: new Date() },
        is_read: false,
      },
      { category: 1, description: 1, designated_time: 1, is_read: 1 }
    );

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params._id, { is_read: true });

    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { assigned_to: req.params.username, is_read: false },
      { is_read: true }
    );

    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// guest responds to an invitation
export const inviteResponse = async (req, res) => {
  try {
    const invite = await Notification.findById(req.params._id);
    const response = req.query.response;

    const event = await Event.findById(invite.event_id);
    const eventGuest = await EventGuest.findOne({
      event_id: invite.event_id,
      guest: invite.assigned_to,
    });
    const user = await User.findOne({ username: invite.assigned_to });

    if (response === "accepted") {
      eventGuest.status = "accepted";
      event.guests.push(invite.assigned_to); // add the guest to the event

      // create an invite response notification for the event creator
      await Notification.create({
        category: "Invite Response",
        event_id: event._id,
        assigned_to: event.owner,
        description: `${user.fullname} (${invite.assigned_to}) accepted your invitation to ${event.title}.`,
        designated_time: new Date(),
      });

      await event.save();
    } else if (response === "declined") {
      eventGuest.status = "declined";

      // create an invite response notification for the event creator
      await Notification.create({
        category: "Invite Response",
        event_id: event._id,
        assigned_to: event.owner,
        description: `${user.fullname} (${invite.assigned_to}) declined your invitation to ${event.title}.`,
        designated_time: new Date(),
      });
    }

    await eventGuest.save();
    res.status(200).json({ message: "Response recorded successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
