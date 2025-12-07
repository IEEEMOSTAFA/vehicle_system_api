import express from "express";
import { bookingControllers } from "./bookings.controller";
import { logger } from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const router = express.Router();

// POST /api/v1/bookings - Create booking (Customer or Admin)
router.post(
    "/", 
    auth("customer", "admin"), 
    bookingControllers.createBooking
);

// GET /api/v1/bookings - Get all bookings (Role-based)
router.get(
    "/", 
    auth("customer", "admin"), 
    bookingControllers.getBooking
);

// GET /api/v1/bookings/:id - Get single booking
router.get(
    "/:id", 
    auth("customer", "admin"), 
    logger, 
    bookingControllers.getSingleBooking
);

// PUT /api/v1/bookings/:id - Update booking (Role-based)
router.put(
    "/:id", 
    auth("customer", "admin"), 
    logger, 
    bookingControllers.updateBooking
);

export const bookingRoutes = router;