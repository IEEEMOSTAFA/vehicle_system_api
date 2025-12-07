import express, { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        let result = await bookingService.createBooking(req.body);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });
    } catch (err: any) {
        res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
}

const getBooking = async (req: Request, res: Response) => {
    try {
        let role = (req as any).user.role as string;
        let userId = (req as any).user.userId as number;

        let result = await bookingService.getBooking(role, userId);

        res.status(200).json({
            success: true,
            message: role === "admin" 
                ? "Bookings retrieved successfully" 
                : "Your bookings retrieved successfully",
            data: result
        });
    } catch (err: any) {
        res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
}

const getSingleBooking = async(req: Request, res: Response) => {
    try {
        let result = await bookingService.getSingleBooking(req.params.id as string);

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "Booking Not Found......!"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Booking Fetched Successfully....",
                data: result.rows[0]
            });
        }
    } catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        });
    }
}

const updateBooking = async (req: Request, res: Response) => {
    try {
        let role = (req as any).user.role as string;
        let userId = (req as any).user.userId as number;

        let updated = await bookingService.updateBooking(
            req.body,
            req.params.id!,
            role,
            userId 
        );

        res.status(200).json({
            success: true,
            message: req.body.status === "cancelled"
                ? "Booking cancelled successfully"
                : "Booking marked as returned. Vehicle is now available",
            data: updated
        });
    } catch (err: any) {
        res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
}

export const bookingControllers = {
    createBooking,
    getBooking,
    getSingleBooking,
    updateBooking
}













// import express, { Request, Response } from "express";
// import { bookingService } from "./bookings.service";

// const createBooking = async (req: Request, res: Response) => {
//     try {
//         // Get customer_id from logged-in user
//         let customer_id = (req as any).user.userId;
        
//         console.log("Logged in user:", (req as any).user);
//         console.log("Customer ID:", customer_id);
        
//         // Override customer_id in body with logged-in user's ID (for security)
//         let payload = {
//             ...req.body,
//             customer_id: customer_id
//         };

//         let result = await bookingService.createBooking(payload);

//         res.status(201).json({
//             success: true,
//             message: "Booking created successfully",
//             data: result
//         });
//     } catch (err: any) {
//         res.status(400).json({ 
//             success: false, 
//             message: err.message 
//         });
//     }
// }

// const getBooking = async (req: Request, res: Response) => {
//     try {
//         let role = (req as any).user.role as string;
//         let userId = (req as any).user.userId as number;

//         let result = await bookingService.getBooking(role, userId);

//         res.status(200).json({
//             success: true,
//             message: role === "admin" 
//                 ? "Bookings retrieved successfully" 
//                 : "Your bookings retrieved successfully",
//             data: result
//         });
//     } catch (err: any) {
//         res.status(400).json({ 
//             success: false, 
//             message: err.message 
//         });
//     }
// }

// const getSingleBooking = async(req: Request, res: Response) => {
//     try {
//         let result = await bookingService.getSingleBooking(req.params.id as string);

//         if(result.rows.length === 0){
//             res.status(404).json({
//                 success: false,
//                 message: "Booking Not Found......!"
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "Booking Fetched Successfully....",
//                 data: result.rows[0]
//             });
//         }
//     } catch(err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//             details: err
//         });
//     }
// }

// const updateBooking = async (req: Request, res: Response) => {
//     try {
//         let role = (req as any).user.role as string;
//         let userId = (req as any).user.userId as number;

//         let updated = await bookingService.updateBooking(
//             req.body,
//             req.params.id!,
//             role,
//             userId 
//         );

//         res.status(200).json({
//             success: true,
//             message: req.body.status === "cancelled"
//                 ? "Booking cancelled successfully"
//                 : "Booking marked as returned. Vehicle is now available",
//             data: updated
//         });
//     } catch (err: any) {
//         res.status(400).json({ 
//             success: false, 
//             message: err.message 
//         });
//     }
// }

// export const bookingControllers = {
//     createBooking,
//     getBooking,
//     getSingleBooking,
//     updateBooking
// }