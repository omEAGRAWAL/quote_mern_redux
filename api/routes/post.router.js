import express from "express";
import {create,getpost} from "../controlers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getpost",  getpost);
export default router;