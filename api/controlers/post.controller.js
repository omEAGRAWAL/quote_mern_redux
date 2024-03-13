import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  const { content } = req.body;
  const newPost = new Post({
    content: req.body.content,
    userId: req.body.userId,
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

    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    next(err);
  }
};
