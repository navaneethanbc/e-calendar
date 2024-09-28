import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  username: {
    type: String,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  designated_time: {
    type: Date,
    required: true,
  },
  is_read: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
