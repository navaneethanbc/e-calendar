import mongoose, { Schema } from "mongoose";

const eventGuestSchema = new Schema({
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
  status: {
    type: String,
    required: false,
    enum: ["Accepted", "Declined", "Pending"],
    default: "Pending",
  },
});

export const EventGuest = mongoose.model("EventGuest", eventGuestSchema);
