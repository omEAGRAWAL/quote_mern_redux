import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/3d-rendering-people-avatar-icon-isolated-transparent-background_640106-1078.jpg?w=740",
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
