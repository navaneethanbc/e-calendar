import eventGuests from "../database/event_guest.model.js";
import events from "../database/event.models.js";
import notifications from "../database/notification.model.js";
import notificationUsers from "../database/notification_user.model.js";
import users from "../database/user.model.js";

export async function displayNotification(req, res) {
  try {
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getNotification(req, res) {
  try {
    res.json(notificationUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
