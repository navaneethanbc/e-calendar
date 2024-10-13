import { Notification } from "../models/notification.model.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { EventGuest } from "../models/event_guest.model.js";

// get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    // const { username } = req.body;

    const notifications = await Notification.find(
      {
        assigned_to: req.params.username,
        designated_time: { $lte: new Date() },
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
    const { notification_id } = req.body;

    const notification = await Notification.findById(notification_id);

    notification.is_read = true;

    await notification.save();

    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// guest responds to an invitation
export const inviteResponse = async (req, res) => {
  try {
    const { invite_id, response } = req.body;

    const invite = await Notification.findById(invite_id);

    const event = await Event.findById(invite.event_id);
    const guestEvent = await EventGuest.findOne({
      event_id: invite.event_id,
      username: invite.username,
    });
    const user = await User.findOne({ username: invite.username });

    if (response === "Accepted") {
      guestEvent.status = "Accepted";
      event.guests.push(invite.username); // add the guest to the event

      // create a reminder notification for the guest
      if (event.reminder !== "No Reminder") {
        const reminder = new Notification({
          category: "Reminder",
          event_id: event._id,
          username: invite.username,
        });

        switch (event.reminder) {
          case "15 minutes before":
            reminder.description = `Reminder: ${event.title} starts in 15 minutes.`;
            reminder.designated_time = new Date(
              event.starts_at - 15 * 60 * 1000
            );
            break;
          case "30 minutes before":
            reminder.description = `Reminder: ${event.title} starts in 30 minutes.`;
            reminder.designated_time = new Date(
              event.starts_at - 30 * 60 * 1000
            );
            break;
          case "1 hour before":
            reminder.description = `Reminder: ${event.title} starts in 1 hour.`;
            reminder.designated_time = new Date(
              event.starts_at - 60 * 60 * 1000
            );
            break;
          case "1 day before":
            reminder.description = `Reminder: ${event.title} starts in 1 day.`;
            reminder.designated_time = new Date(
              event.starts_at - 24 * 60 * 60 * 1000
            );
            break;
          case "1 week before":
            reminder.description = `Reminder: ${event.title} starts in 1 week.`;
            reminder.designated_time = new Date(
              event.starts_at - 7 * 24 * 60 * 60 * 1000
            );
            break;
          default:
            break;
        }
        await reminder.save();
      }

      // create an invite response notification for the event creator
      await Notification.create({
        category: "Invite Response",
        event_id: event._id,
        username: event.username,
        description: `${user.fullname} (${invite.username}) accepted your invitation to ${event.title}.`,
        designated_time: new Date(),
        is_read: false,
      });

      await event.save();
    } else if (response === "Declined") {
      guestEvent.status = "Declined";

      // create an invite response notification for the event creator
      await Notification.create({
        category: "Invite Response",
        event_id: event_id,
        username: event.username,
        description: `${user.fullname} (${invite.username}) declined your invitation to ${event.title}.`,
        designated_time: new Date(),
        is_read: false,
      });
    }

    await guestEvent.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
