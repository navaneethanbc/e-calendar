import { getAvailablity } from "../../controllers/event.controllers.js";
import { Event } from "../../models/event.model.js";
import { EventGuest } from "../../models/event_guest.model.js";

jest.mock("../../models/event.model.js");
jest.mock("../../models/event_guest.model.js");

describe("getAvailablity", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        from: new Date("2024-01-01"),
        to: new Date("2024-01-02"),
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it("should return available events successfully", async () => {
    const mockUserEvents = [
      { category: "Personal", starts_at: req.body.from, ends_at: req.body.to },
    ];

    const mockInvitedEvents = [
      { event_id: "607f1f77bcf86cd799439011" }, // Mock event ID
    ];

    const mockInvitedEventDetails = {
      category: "Branch",
      starts_at: req.body.from,
      ends_at: req.body.to,
    };

    Event.find.mockResolvedValue(mockUserEvents);
    EventGuest.find.mockResolvedValue(mockInvitedEvents);
    Event.findById.mockResolvedValue(mockInvitedEventDetails);

    await getAvailablity(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: [
        {
          category: "Personal",
          starts_at: req.body.from,
          ends_at: req.body.to,
        },
        { category: "Branch", starts_at: req.body.from, ends_at: req.body.to },
      ],
    });
  });
  it("should handle errors and return 500", async () => {
    const errorMessage = "Database error";
    Event.find.mockRejectedValue(new Error(errorMessage));

    await getAvailablity(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
