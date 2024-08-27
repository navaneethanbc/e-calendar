import mongoose, { Schema } from "mongoose";

const notificationUserSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  notification_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Notification",
  },
});
