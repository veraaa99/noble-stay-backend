import express from "express";
import {
  createCastleListing,
  deleteCastleListing,
  getCastleListing,
  getCastleListingByUser,
  getCastleListings,
  getCastleListingsByFilter,
  updateCastleListing,
} from "../controller/listing.controller.js";
import { verifyToken } from "../middleware/verification.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createCastleListing);

router.get("/search", getCastleListingsByFilter);
router.get("/user", verifyToken, getCastleListingByUser);
router.get("/", getCastleListings);
router.get("/:id", getCastleListing);

router.put("/:id", verifyToken, updateCastleListing);
router.patch("/:id", verifyToken, updateCastleListing);

router.delete("/:id", verifyToken, deleteCastleListing);

export default router;
