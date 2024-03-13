import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/3d-rendering-people-avatar-icon-isolated-transparent-background_640106-1078.jpg?w=740",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
