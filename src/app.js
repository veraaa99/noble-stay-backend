import express from "express";
import listingRoutes from "./routes/listing.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import bodyParser from "body-parser";

const app = express();
import cors from "cors";

// Source - https://stackoverflow.com/a
// Posted by saeta, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-20, License - CC BY-SA 4.0
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());

app.use(cors());

app.use("/api/listings", listingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
