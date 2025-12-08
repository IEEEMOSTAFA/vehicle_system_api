

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}


export const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const authHeader = req.headers.authorization;

           
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "No token provided. Authorization required."
                });
            }

            //   "Bearer <token>"
            let token: string;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); 
            } else {
                token = authHeader; 
            }

            console.log({ authToken: token });

            // Verify 
            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            console.log({ decoded });

            // Attach user info to request object
            req.user = decoded;

            
            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Insufficient permissions."
                });
            }

           
            next();
        } catch (err: any) {
            
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token"
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