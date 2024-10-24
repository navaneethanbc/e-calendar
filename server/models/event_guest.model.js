import mongoose, { Schema } from "mongoose";

const eventGuestSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  guest: {
    type: String,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: false,
    enum: ["accepted", "declined", "pending"],
    default: "pending",
  },
});

export const EventGuest = mongoose.model("EventGuest", eventGuestSchema);
