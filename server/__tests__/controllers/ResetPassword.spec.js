import { resetPassword } from "../../controllers/user.controllers.js";
import { User } from "../../models/user.model.js";
import { validateResetPassword } from "../../utils/userValidator.js";

jest.mock("../../models/user.model.js");
jest.mock("../../utils/userValidator.js");

describe("resetPassword", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "NewPassword@123",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return 404 if user is not found", async () => {
    User.findOne.mockResolvedValueOnce(null);

    await resetPassword(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: req.body.username });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Username is invalid" });
  });

  it("should return 400 if validation fails", async () => {
    // Mock the validation failure
    const errorMessage = "Password is too weak.";
    validateResetPassword.mockReturnValue({
      error: { details: [{ message: errorMessage }] },
    });

    // Mock the user found in the database
    const user = { username: req.body.username };
    User.findOne.mockResolvedValueOnce(user);

    await resetPassword(req, res);

    expect(validateResetPassword).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return 400 if OTP is not verified", async () => {
    validateResetPassword.mockReturnValue({ error: null });

    // Mock the user found in the database with OTP not verified
    const user = {
      username: req.body.username,
      otpVerified: false,
    };
    User.findOne.mockResolvedValueOnce(user);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "OTP verification required to change the password",
    });
  });

  it("should return 200 if password reset is successful", async () => {
    validateResetPassword.mockReturnValue({ error: null });

    // Mock the user found in the database with OTP verified
    const user = {
      username: req.body.username,
      password: "OldPassword@123",
      otpVerified: true,
      save: jest.fn().mockResolvedValue(),
    };
    User.findOne.mockResolvedValueOnce(user);

    await resetPassword(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: req.body.username });
    expect(user.password).toBe(req.body.password);
    expect(user.otpVerified).toBe(undefined);
    expect(user.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 if there is a server error", async () => {
    validateResetPassword.mockReturnValue({ error: null });

    // Mock an error during the password reset process
    const errorMessage = "Server error occurred";
    User.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Error in password reset process",
    });
  });
});
