import mongoose from "mongoose";
const userschema = new mongoose.Schema(
  {
    flatno: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phno: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Try a strong password"],
    },
    role: {
      type: String,
      default: "user",
    },
    activeComplain: {
      type: Number,
      default: 0,
    },
    totalComplain: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const User = mongoose.models.users || mongoose.model("users", userschema);
export default User;
