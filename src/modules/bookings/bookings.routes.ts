import express from "express";
import { bookingControllers } from "./bookings.controller";
import { logger } from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const router = express.Router();
// /api/v1/bookings 
// POST 
router.post("/",auth("customer", "admin"),bookingControllers.createBooking);
     
router.get( "/",  auth("customer", "admin"),bookingControllers.getBooking );
    
router.get("/:id",auth("customer", "admin"),logger,bookingControllers.getSingleBooking);
     
router.put("/:id",auth("customer", "admin"), logger,bookingControllers.updateBooking ); 
     
export const bookingRoutes = router;