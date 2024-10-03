// // import notifications from "../database/notification.model.js";
// // import events from "../database/event.models.js";
// // import notificationUsers from "../database/notification_user.model.js";

// // Helper function to calculate the reminder time
// const getReminderTime = (startAt, reminder) => {
//   const startTime = new Date(startAt);
//   let reminderTime = new Date(startTime);

//   switch (reminder) {
//     case "No reminder":
//       return null;
//     case "15 minutes":
//       reminderTime.setMinutes(reminderTime.getMinutes() - 15);
//       break;
//     case "30 minutes":
//       reminderTime.setMinutes(reminderTime.getMinutes() - 30);
//       break;
//     case "1 hour":
//       reminderTime.setHours(reminderTime.getHours() - 1);
//       break;
//     case "1 day":
//       reminderTime.setDate(reminderTime.getDate() - 1);
//       break;
//     case "1 week":
//       reminderTime.setDate(reminderTime.getDate() - 7);
//       break;
//     default:
//       return null;
//   }
//   return reminderTime.toISOString();
// };

// // Fetch notifications for a specific user
// export async function getUserNotifications(req, res) {
//   try {
//     const userId = req.params.userId;

//     const userNotifications = notificationUsers.filter(
//       (nu) => nu.user_id === userId
//     );
//     const userEventIds = userNotifications.map((nu) => nu.notification_id);

//     const allEvents = events.map((event) => ({
//       ...event,
//       reminders: getReminderTime(event.starts_at, event.reminder),
//     }));

//     const allNotifications = notifications.filter((notification) =>
//       userEventIds.includes(notification._id)
//     );

//     const eventNotifications = allEvents.flatMap((event) => {
//       if (event.category === "Branch" || event.category === "Bank") {
//         const reminders = event.reminders ? [event.reminders] : [];
//         return reminders.map((reminder) => ({
//           _id: `reminder-${event._id}`,
//           category: "Reminder",
//           event_id: event._id,
//           description: `Reminder: ${event.title} ${event.description}`,
//           designated_time: reminder,
//         }));
//       } else if (event.category === "Personal") {
//         const personalNotification = allNotifications.find(
//           (n) => n.event_id === event._id
//         );
//         if (personalNotification) {
//           return [personalNotification];
//         }
//       }
//       return [];
//     });

//     const notificationsForUser = eventNotifications
//       .concat(allNotifications)
//       .filter((notification) =>
//         notificationUsers.some(
//           (nu) =>
//             nu.notification_id === notification._id && nu.user_id === userId
//         )
//       );

//     res.json(notificationsForUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Fetch all notifications
// export async function getNotifications(req, res) {
//   try {
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Mark a notification as read
// export async function markNotificationAsRead(req, res) {
//   try {
//     const { id } = req.params;
//     const notification = notifications.find((n) => n._id === id);
//     if (notification) {
//       notification.hasBeenRead = true;
//       res.status(200).json({ message: "Notification marked as read" });
//     } else {
//       res.status(404).json({ error: "Notification not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
