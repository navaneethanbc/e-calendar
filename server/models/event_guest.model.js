import mongoose, { Schema } from "mongoose";

const eventGuestSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: false,
    enum: ["Accepted", "Declined", "Not Responded"],
  },
});

export const EventGuest = mongoose.model("EventGuest", eventGuestSchema);
