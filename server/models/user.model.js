import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { generateAuthToken } from "../utils/tokenUtils.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    employee_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    branch: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
    timezone: {
      type: String,
      default: "+5:30",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    otpVerified: {
      type: Boolean,
      default: false,
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

// userSchema.methods.generateRefreshToken = function () {
//   return generateRefreshToken(this);
// };

userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
