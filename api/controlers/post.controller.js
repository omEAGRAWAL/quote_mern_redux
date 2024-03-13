import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  const { content } = req.body;
  const postid = req.body.userId + Math.random().toString(9);
  const newPost = new Post({
    content: req.body.content,
    userId: req.body.userId,
    postId: postid,
    profilePicture: req.body.profilePicture,
  });
  try {
    const post = await newPost.save();
    res.status(201).json(post);
    console.log(post);
  } catch (err) {
    next(err);
  }
};

export const getpost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
    if (posts.length === 0) {
      res.status(200).json({ message: "No posts found" });
      return;
    }

    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ postId });
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      next(errorHandler(400, "The post has been liked"));
      console.log("liked");
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      next(errorHandler(400, "The post has been disliked"));
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    next(err);
  }
};
