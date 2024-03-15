import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("user deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    console.log(req.user.userId);
    return next(errorHandler(403, "you are not allowed to update this user"));
  }
  // if (req.body.password) {
  //   if (req.body.password.length < 6) {
  //     return next(
  //       errorHandler(400, "password should be at least 6 characters")
  //     );
  //   }
  //   req.body.password = bcryptjs.hashSync(req.body.password, 10);
  // }
  // if (req.body.username) {
  //   if (req.body.username.length >7 || req.body.username.length < 20) {
  //     return next(
  //       errorHandler(400, "username should be between 7 and 15 characters")
  //     );
  //   }
  // }
  // if (req.body.username.includes(" ")) {
  //   return next(errorHandler(400, "username should not contain spaces"));
  // }
  // if (req.body.username != req.body.User.toLowerCase) {
  //   return next(errorHandler(400, "username should be in lowercase"));
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getUser = async(req, res,next) =>{
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
