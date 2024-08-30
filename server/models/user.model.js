import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import Joi from "joi";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
import {
  generateAuthToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      match: [/^[a-zA-Z0-9]+$/, "Username is invalid"],
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    employee_id: {
      type: String,
      required: [true, "Employee ID is required"],
      // unique: true,
      trim: true,
    },
    last_login: {
      type: Date,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return generateAuthToken(this);
};

userSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken(this);
};

userSchema.plugin(mongooseAggregatePaginate);

const User = mongoose.model("User", userSchema);

// validate user
const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
    fullname: Joi.string()
      .required()
      .label("Fullname")
      .pattern(new RegExp("^[A-Za-z]+( [A-Za-z]+)+$")),
    employee_id: Joi.string().alphanum().required(),
    branch: Joi.string().required(),
    role: Joi.string().valid("admin", "user").required(),
  });

  return schema.validate(user);
};

export { User, validateUser };
