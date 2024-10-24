const { bankEvent } = require("../../controllers/admin.event.controllers.js");
const { Event } = require("../../models/event.model.js");

jest.mock("../../models/event.model.js");

describe("bankEvent", () => {
  let req, res;

  const mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  beforeEach(() => {
    // Set up mock request and response objects
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  it("should return bank events when the query is successful", async () => {
    const mockBankEvents = [
      { _id: "1", title: "Bank Meeting", category: "Bank" },
      { _id: "2", title: "Financial Review", category: "Bank" },
      { _id: "2", title: "Fannual meating", category: "Branch" },
    ];

    // Mock the Event.find function to return the mockBankEvents
    Event.find.mockResolvedValue(mockBankEvents);

    // Call the bankEvent function
    await bankEvent(req, res);

    expect(Event.find).toHaveBeenCalledWith({ category: "Bank" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBankEvents);
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Database error";
    Event.find.mockRejectedValue(new Error(errorMessage));

    await bankEvent(req, res);
    expect(Event.find).toHaveBeenCalledWith({ category: "Bank" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
      error: expect.any(Error),
    });
  });
});
