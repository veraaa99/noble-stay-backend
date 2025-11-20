import express from "express";
import listingRoutes from "./routes/listing.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();
import cors from "cors";

app.use(express.json());

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/listings", listingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
