import { loginUser } from "../../controllers/user.controllers.js";
import { User } from "../../models/user.model.js";
import { validateLogin } from "../../utils/userValidator.js";
import { generateAuthToken } from "../../utils/tokenUtils.js";

jest.mock("../../models/user.model.js");
jest.mock("../../utils/userValidator.js");
jest.mock("../../utils/tokenUtils.js");

describe("loginUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "Password@123",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return 400 if validation fails", async () => {
    const errorMessage = "Username or Password is not valid.";
    validateLogin.mockReturnValue({
      error: { details: [{ message: errorMessage }] },
    });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return 401 if user does not exist", async () => {
    validateLogin.mockReturnValue({ error: null });

    User.findOne.mockResolvedValueOnce(null);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: req.body.username });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message: "Invalid username or password.",
    });
  });
  it("should return 200 and send accessToken if login is successful", async () => {
    validateLogin.mockReturnValue({ error: null });

    // Mock the user found in database
    const user = {
      username: "testuser",
      password: "hashedPassword",
      isPasswordCorrect: jest.fn().mockResolvedValue(true),
      last_login: null,
      save: jest.fn().mockResolvedValue(),
    };
    User.findOne.mockResolvedValueOnce(user);

    // Mock token generation
    generateAuthToken.mockReturnValue("fakeToken");

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: req.body.username });
    expect(user.isPasswordCorrect).toHaveBeenCalledWith(req.body.password);
    expect(generateAuthToken).toHaveBeenCalledWith(user);
    expect(user.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      accessToken: "fakeToken",
      name: user.fullname,
      role: user.role,
      message: "Successfully signed in.",
    });
  });
});
