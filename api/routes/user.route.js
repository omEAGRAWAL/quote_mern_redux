import express from "express";
import { signout } from "../controlers/user.controlers.js";

const router = express.Router();

router.post("/signout",signout)

export default router;
