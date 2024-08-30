import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import Joi from "joi";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      match: [/^a-zA-Z0-9$/, "Username is invalid"],
      trim: true,
    },
    password_hash: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already registered"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    employee_id: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: [true, "Employee ID is already registered"],
      trim: true,
    },
    last_login: {
      type: Date,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
