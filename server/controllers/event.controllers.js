import { Event } from "../models/event.model.js";

export const AddEvent = async (req, res) => {
  try {
    let newEvent = new Event(req.body);
    await newEvent.save();

    return res.status(200).json({
      success: "Post saved successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const ViewEvent = async (req, res) => {
  try {
    const events = await Event.find().exec();

    return res.status(200).json({
      success: true,
      existingEvents: events,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const UpdateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    return res.status(200).json({
      success: "Post updated successfully",
      updatedEvent,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const DeleteEvent = async (req, res) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deleteEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.json({
      message: "Delete successful",
      deleteEvent,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
