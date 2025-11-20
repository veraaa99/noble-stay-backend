import express from "express";
import {
  createBooking,
  getBooking,
  getBookings,
} from "../controller/booking.controller.js";
import { verifyToken } from "../middleware/verification.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);

router.get("/", verifyToken, getBookings);
router.get("/:id", verifyToken, getBooking);

export default router;
