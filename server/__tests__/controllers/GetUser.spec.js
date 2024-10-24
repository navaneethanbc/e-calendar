import { getUser } from "../../controllers/user.controllers.js";
import { User } from "../../models/user.model.js";

jest.mock("../../models/user.model.js");

describe("getUser", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { username: "testuser" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it("should return user data successfully", async () => {
    const mockUser = { username: "testuser", fullname: "Test User" };
    User.findOne.mockResolvedValue(mockUser);

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: mockUser });
  });

  it("should return 500 if an error occurs", async () => {
    const errorMessage = "Database error";
    User.findOne.mockRejectedValue(new Error(errorMessage)); // Mocking an error

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });
});
