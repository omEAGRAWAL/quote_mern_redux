import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import {clearCookie} from "../models/cookie.model.js";
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
