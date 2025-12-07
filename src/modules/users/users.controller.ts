


// import express, { Request, Response } from "express";
// import { userServices } from "./users.service";

// const getUser = async (req: Request, res: Response) => {
//     try {
//         const result = await userServices.getUser();

//         res.status(200).json({
//             success: true,
//             message: 'Users retrieved successfully',
//             data: result.rows
//         });
//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//             details: err
//         });
//     }
// }

// const getSingleUser = async (req: Request, res: Response) => {
//     try {
//         const result = await userServices.getSingleUser(req.params.id as string);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User Not Found......!"
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User Fetched Successfully....",
//                 data: result.rows[0]
//             });
//         }
//         // Fixed: Removed duplicate res.status(200).json() that was unreachable
//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//             details: err
//         });
//     }
// }

// const updateUser = async (req: Request, res: Response) => {
//     try {
//         // Get role and userId from authenticated user (set by auth middleware)
//         const role = (req as any).user.role;
//         const authenticatedUserId = (req as any).user.userId;

//         const result = await userServices.updateUser(
//             req.body, 
//             req.params.id!, 
//             role, 
//             authenticatedUserId
//         );

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User Not Found......!"
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User updated successfully....",
//                 data: result.rows[0]
//             });
//         }
//     } catch (err: any) {
//         // Handle specific error types
//         if (err.message === "User not found") {
//             res.status(404).json({
//                 success: false,
//                 message: err.message
//             });
//         } else if (err.message.includes("only update your own") || err.message.includes("cannot change their role")) {
//             res.status(403).json({
//                 success: false,
//                 message: err.message
//             });
//         } else {
//             res.status(500).json({
//                 success: false,
//                 message: err.message,
//                 details: err
//             });
//         }
//     }
// }

// const deleteUser = async (req: Request, res: Response) => {
//     try {
//         // Fixed: Changed from vehicleServices to userServices
//         const result = await userServices.deleteUser(req.params.id!);

//         if (result.rowCount === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User Not Found......!"
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User deleted Successfully....",
//                 data: result.rows
//             });
//         }
//     } catch (err: any) {
//         // Handle specific errors
//         if (err.message === "User not found") {
//             res.status(404).json({
//                 success: false,
//                 message: err.message
//             });
//         } else if (err.message.includes("active bookings")) {
//             res.status(400).json({
//                 success: false,
//                 message: err.message
//             });
//         } else {
//             res.status(500).json({
//                 success: false,
//                 message: err.message,
//                 details: err
//             });
//         }
//     }
// }

// export const userControllers = {
//     getUser,
//     getSingleUser,
//     updateUser,
//     deleteUser
// }














import { pool } from "../../config/db";

const getUser = async () => {
    // Don't return passwords for security
    const result = await pool.query(`
        SELECT id, name, email, phone, role 
        FROM users 
        ORDER BY id DESC
    `);
    return result;
}

const getSingleUser = async (id: string) => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role 
        FROM users 
        WHERE id = $1
    `, [id]);
    return result;
}

const updateUser = async (payload: Record<string, unknown>, id: string, role: string, userId: number) => {
    const { name, email, phone, role: newRole } = payload;

    // Check if user exists
    const userCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    
    if (userCheck.rows.length === 0) {
        throw new Error("User not found");
    }

    // Customer can only update their own profile (not role)
    if (role === "customer") {
        if (Number(id) !== userId) {
            throw new Error("You can only update your own profile");
        }
        
        if (newRole) {
            throw new Error("Customers cannot change their role");
        }

        // Update only name, email, phone for customers
        const result = await pool.query(`
            UPDATE users 
            SET name = COALESCE($1, name), 
                email = COALESCE($2, email), 
                phone = COALESCE($3, phone)
            WHERE id = $4 
            RETURNING id, name, email, phone, role
        `, [name, email, phone, id]);

        return result;
    }

    // Admin can update any user including role
    if (role === "admin") {
        const result = await pool.query(`
            UPDATE users 
            SET name = COALESCE($1, name), 
                email = COALESCE($2, email), 
                phone = COALESCE($3, phone),
                role = COALESCE($4, role)
            WHERE id = $5 
            RETURNING id, name, email, phone, role
        `, [name, email, phone, newRole, id]);

        return result;
    }

    throw new Error("Unauthorized action");
}

const deleteUser = async (id: string) => {
    // Check if user has any active bookings
    const activeBookings = await pool.query(`
        SELECT * FROM bookings 
        WHERE customer_id = $1 AND status = 'active'
    `, [id]);

    if (activeBookings.rows.length > 0) {
        throw new Error("Cannot delete user with active bookings");
    }

    // Check if user exists before deleting
    const userCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    
    if (userCheck.rows.length === 0) {
        throw new Error("User not found");
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
    return result;
}

export const userControllers = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}