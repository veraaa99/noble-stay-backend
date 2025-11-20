import express from "express";
import {
  checkToken,
  getUserByID,
  getUserByToken,
  getUsers,
  loginUser,
  registerUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verification.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", verifyToken, getUsers);
router.get("/profile", verifyToken, getUserByToken);
router.get("/check", verifyToken, checkToken);
router.get("/:id", verifyToken, getUserByID);

export default router;
