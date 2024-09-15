import { Event } from "../models/event.model.js";
import mongoose from "mongoose";
import moment from "moment";

// Function to generate recurring events
const generateRecurringEvents = (
  event,
  recurrenceType,
  recurrenceEnd,
  recurrenceGroupId
) => {
  const events = [];
  let currentStart = moment(event.starts_at);
  let currentEnd = moment(event.ends_at);

  while (currentStart.isBefore(recurrenceEnd)) {
    const newEvent = {
      ...event._doc,
      _id: new mongoose.Types.ObjectId(), // Ensure unique _id for each recurring event
      starts_at: currentStart.toDate(),
      ends_at: currentEnd.toDate(),
      recurrence_group_id: recurrenceGroupId, // Common ID for all related recurrences
    };

    events.push(newEvent);

    // Adjust date based on recurrence type
    switch (recurrenceType) {
      case "Daily":
        currentStart.add(1, "day");
        currentEnd.add(1, "day");
        break;
      case "Weekly":
        currentStart.add(1, "week");
        currentEnd.add(1, "week");
        break;
      case "Monthly":
        currentStart.add(1, "month");
        currentEnd.add(1, "month");
        break;
      case "Yearly":
        currentStart.add(1, "year");
        currentEnd.add(1, "year");
        break;
      default:
        throw new Error("Invalid recurrence type");
    }
  }

  return events;
};

// Function to add event
export const AddEvent = async (req, res) => {
  try {
    const { reccurence, recurrence_end } = req.body;
    let newEvent = new Event(req.body);

    if (reccurence && reccurence !== "Non-recurring") {
      // Generate a unique recurrence group ID
      const recurrenceGroupId = new mongoose.Types.ObjectId();

      // Validate and parse recurrence end date
      const recurrenceEnd = recurrence_end
        ? moment(recurrence_end)
        : moment().add(1, "year"); // Default to 1 year if no end date

      if (!recurrenceEnd.isValid()) {
        throw new Error("Invalid recurrence end date");
      }

      // Generate all recurring events
      const recurringEvents = generateRecurringEvents(
        newEvent,
        reccurence,
        recurrenceEnd,
        recurrenceGroupId
      );

      await Event.insertMany(recurringEvents);
    } else {
      await newEvent.save();
    }

    return res.status(200).json({
      success: "Event saved successfully",
    });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).send({ message: error.message });
  }
};

// Function to view all events
export const ViewEvent = async (req, res) => {
  try {
    const events = await Event.find().exec();

    return res.status(200).json({
      success: true,
      existingEvents: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: error.message });
  }
};

// Function to update an event
export const UpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateAll = req.query.updateAll === "true"; // Optional flag to update all recurrences
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (updateAll && event.recurrence_group_id) {
      // Update all events with the same recurrence_group_id
      await Event.updateMany(
        { recurrence_group_id: event.recurrence_group_id },
        { $set: req.body }
      );
    } else {
      // Update only the specific instance
      await Event.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }

    return res.status(200).json({
      success: "Event updated successfully",
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send({ message: error.message });
  }
};

// Function to delete an event
export const DeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAll = req.query.deleteAll === "true"; // Optional flag to delete all recurrences
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (deleteAll && event.recurrence_group_id) {
      // Delete all events with the same recurrence_group_id
      await Event.deleteMany({
        recurrence_group_id: event.recurrence_group_id,
      });
    } else {
      // Delete only the specific instance
      await Event.findByIdAndDelete(id);
    }

    return res.json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({ message: error.message });
  }
};
