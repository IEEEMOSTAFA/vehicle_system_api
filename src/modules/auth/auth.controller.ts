
import { authServices } from "./auth.service";
import { Request, Response } from "express";

const signupUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const result = await authServices.signupUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully...",
            data: result
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const signinUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authServices.loginUser(email, password);

        // Check if user not found
        if (result === null) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

       
        if (result === false) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

      
        res.status(200).json({
            success: true,
            message: "Login Successfully...",
            data: result
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const authController = {
    signupUser,
    signinUser
}