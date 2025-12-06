import express,{NextFunction, Request,Response} from "express";



export let logger = (req: Request,res: Response,next: NextFunction) =>{
console.log(`[${new Date().toDateString()}] ${req.method} ${req.path}  \n`);
next();
}