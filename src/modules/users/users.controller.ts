import { Request, Response, NextFunction } from "express";
import { userServices } from "./users.service";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.getUser();
        
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    } catch (error) {
        next(error);
    }
}

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await userServices.getSingleUser(id!);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const userRole = (req as any).user.role;
        const userId = (req as any).user.userId;

        const result = await userServices.updateUser(payload, id!, userRole, userId);
        
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        if (error.message === "You can only update your own profile" || 
            error.message === "Customers cannot change their role") {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }
        
        if (error.message === "User not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        
        next(error);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await userServices.deleteUser(id!);
        
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error: any) {
        if (error.message === "Cannot delete user with active bookings") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        
        if (error.message === "User not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        
        next(error);
    }
}

export const userControllers = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}