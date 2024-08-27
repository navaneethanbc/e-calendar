import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ["Invite", "Reminder"],
  },
  event_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  description: {
    type: String,
    required: true,
  },
  designated_time: {
    type: Date,
    required: true,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
