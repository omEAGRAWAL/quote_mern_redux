import express from "express";
import { signout, updateUser, getUser } from "../controlers/user.controlers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/signout", signout);
router.put("/update/:userId", verifyToken, updateUser);
router.get("/getuser/:userId", getUser);

export default router;
