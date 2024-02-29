import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email == "" ||
    password == ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    res.json("signup sucessfullll");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
