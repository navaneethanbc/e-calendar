import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Personal", "Branch", "Bank"],
  },
  recurrence: {
    type: String,
    required: false,
  },
  reminder: {
    type: String,
    required: false,
  },
  guests: {
    type: [String],
    required: false,
    ref: "User",
  },
  meeting_link: {
    type: String,
    required: false,
    trim: true,
  },
  starts_at: {
    type: Date,
    required: true,
    index: true,
  },
  ends_at: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    ref: "User",
  },
  parent_event_id: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Event",
  },
});

eventSchema.plugin(mongooseAggregatePaginate);

export const Event = mongoose.model("Event", eventSchema);
