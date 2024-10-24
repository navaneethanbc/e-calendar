import { addUser } from "../../controllers/admin.user.controllers.js"; // Assuming your controller is named `userController.js`
import { User } from "../../models/user.model.js"; // Your User model

jest.mock("../../models/user.model.js"); // Mocking the User model

describe("addUser controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        fullname: "Test User",
        employee_id: "ADM1234",
        branch: "Head Office",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    User.findOne.mockResolvedValue(null); // No existing user
    User.prototype.save.mockResolvedValueOnce({}); // Mock the save function

    await addUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    expect(User.prototype.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
      user: expect.any(Object),
    });
  });

  it("should return 400 if username or email already exists", async () => {
    User.findOne.mockResolvedValue({ username: "testuser" }); // Mock existing user

    await addUser(req, res);

    expect(User.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username or Email already exists",
    });
  });

  it("should handle server errors", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    await addUser(req, res);

    expect(User.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error, unable to create user",
    });
  });
});
