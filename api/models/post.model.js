import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },

    comments: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
