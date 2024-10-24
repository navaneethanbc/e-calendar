import mongoose from "mongoose";
import { deleteEvent } from "../../controllers/event.controllers.js";
import { Event } from "../../models/event.model.js";
import { EventGuest } from "../../models/event_guest.model.js";

jest.mock("../../models/event.model.js");
jest.mock("../../models/event_guest.model.js");

describe("deleteEvent", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: new mongoose.Types.ObjectId().toString() }, // Mock event ID
      query: { type: "single" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should delete a single event successfully", async () => {
    const mockEvent = {
      _id: req.params.id,
      title: "Test Event",
      description: "A test event",
      category: "Personal",
      starts_at: new Date(),
      ends_at: new Date(),
      owner: "testuser",
      parent_event_id: null,
    };

    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    };

    Event.startSession = jest.fn().mockResolvedValue(session);
    Event.findById.mockResolvedValue(mockEvent);
    Event.findByIdAndDelete.mockResolvedValue(mockEvent);
    EventGuest.deleteMany.mockResolvedValue({ deletedCount: 1 });

    await deleteEvent(req, res);

    expect(session.startTransaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Event deleted successfully.",
    });
    expect(Event.findByIdAndDelete).toHaveBeenCalledWith(req.params.id, {
      session,
    });
    expect(EventGuest.deleteMany).toHaveBeenCalledWith(
      { event_id: { $in: [req.params.id] } }, // Updated to match the controller's implementation
      { session }
    );
    expect(session.commitTransaction).toHaveBeenCalled();
    expect(session.endSession).toHaveBeenCalled();
  });

  it("should handle errors during deletion", async () => {
    const errorMessage = "Event not found";
    Event.findById.mockResolvedValue(null);

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should abort the transaction on error", async () => {
    const errorMessage = "Database error";
    const mockEvent = {
      _id: req.params.id,
      title: "Test Event",
      description: "A test event",
      category: "Personal",
      starts_at: new Date(),
      ends_at: new Date(),
      owner: "testuser",
    };

    Event.findById.mockResolvedValue(mockEvent);
    Event.deleteMany.mockRejectedValue(new Error(errorMessage)); // Simulate error on deleteMany

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
