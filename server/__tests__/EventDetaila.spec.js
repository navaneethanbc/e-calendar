// import { eventDetails } from "../controllers/admin.event.controllers";
// import { Event } from "../models/event.model";

// jest.mock("../../../models/event.model");

// describe("eventDetails", () => {
//   let req, res;

//   beforeEach(() => {
//     // Set up mock request and response objects
//     req = {};
//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis(), // Allow chaining
//     };
//   });

//   it("should return event data when aggregation is successful", async () => {
//     // Mock the data returned from the Event.aggregate function
//     const mockEventData = [
//       { _id: "2024-01-01", count: 5 },
//       { _id: "2024-01-02", count: 3 },
//     ];

//     Event.aggregate.mockResolvedValue(mockEventData);

//     await eventDetails(req, res);

//     expect(Event.aggregate).toHaveBeenCalledWith([
//       {
//         $match: { category: { $in: ["Bank", "Branch"] } },
//       },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$starts_at" } },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);
//     expect(res.json).toHaveBeenCalledWith(mockEventData);
//     expect(res.status).not.toHaveBeenCalled();
//   });

//   it("should handle errors correctly", async () => {
//     // Mock the error scenario
//     const errorMessage = "Database error";
//     Event.aggregate.mockRejectedValue(new Error(errorMessage));

//     await eventDetails(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
//   });
// });
