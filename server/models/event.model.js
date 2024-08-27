import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema = new Schema({
  title: {
    type: String,
    required: false,
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
  reccurence: {
    type: String,
    required: true,
    enum: ["Non-recurring", "Daily", "Weekly", "Monthly", "Yearly"],
  },
  reminder: {
    type: String,
    required: true,
    enum: [
      "No reminder",
      "15 minutes",
      "30 minutes",
      "1 hour",
      "1 day",
      "1 week",
    ],
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
});

eventSchema.plugin(mongooseAggregatePaginate);

export const Event = mongoose.model("Event", eventSchema);
