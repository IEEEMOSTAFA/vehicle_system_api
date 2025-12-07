

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";

// Extend Express Request type to include user property
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

// Combined authentication and authorization middleware
export const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get token from Authorization header
            const authHeader = req.headers.authorization;

            // Check if token exists
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "No token provided. Authorization required."
                });
            }

            // Extract token (handle "Bearer <token>" format)
            let token: string;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove "Bearer " prefix
            } else {
                token = authHeader; // Use as-is if no Bearer prefix
            }

            console.log({ authToken: token });

            // Verify and decode token
            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            console.log({ decoded });

            // Attach user info to request object
            req.user = decoded;

            // Check if user has required role (if roles specified)
            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Insufficient permissions."
                });
            }

            // Authentication and authorization successful
            next();
        } catch (err: any) {
            // Handle specific JWT errors
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token"
                });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired"
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: err.message || "Authentication failed"
                });
            }
        }
    };
};


























// import { NextFunction, Request, Response } from "express"

// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from "../config";
// import { error } from "console";


// //
// export  const auth = (...roles: string[]) =>{
//     return async (req: Request,res: Response, next: NextFunction) =>{
//        try{
//            const token = req.headers.authorization;

//         if(!token){
//             return res.status(500).json({
//                 message: "You are not allowed..."
//             });
//         }
//         console.log({authToken: token});
//         const decoded = jwt.verify(token,config.jwtSecret as string) as JwtPayload
//        console.log({decoded});
//        req.user  = decoded as JwtPayload;

//     //["admin"]

//     if(roles.length && !roles.includes(decoded.role as string)){
//         return res.status(500).json({
//             error: "unautorized....!!",
//         });
//     }


//         next();
//        }
//        catch(err: any){
//           res.status(500).json({
//             success: false,
//             message: err.message
//           })
//        }
//     };
// };