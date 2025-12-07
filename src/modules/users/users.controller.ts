




import express, { Request, Response } from "express"

import strict from "assert/strict";
import { userServices } from "./users.service";







let getUser = async(req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    // let {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;


    try{

        let result = await userServices.getUser();

        res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: result.rows
        });
    }
    catch(err:any){{
        res.status(500).json({
            success: false,
            message: err.message,
            details:err
        });

    }}
}

let getSingleUser = async(req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    // let {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;


    try{

        let result = await userServices.getSingleUser(req.params.id as string);

        if(result.rows.length === 0){
            res.status(404).json({
                success:false,
                message: "User Not Found......!"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message:"User Fetch Successfully....",
                data: result.rows[0]
            })
        }

        res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: result.rows
        });
    }
    catch(err:any){{
        res.status(500).json({
            success: false,
            message: err.message,
            details:err
        });

    }}
}
let updateUser = async (req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    let {vehicle_name,daily_rent_price,availability_status} = req.body;


    try{

        let result = await userServices.updateUser(req.body,req.params.id!);
// vehicle_name: string,daily_rent_price:string,availability_status:Boolean
        if(result.rows.length === 0){
            res.status(404).json({
                success:false,
                message: "User Not Found......!"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message:"Vehicle updated successfully....",
                data: result.rows[0]
            })
        }

        
    }
    catch(err:any){{
        res.status(500).json({
            success: false,
            message: err.message,
            details:err
        });

    }}
}
let deleteUser = async (req: Request,res: Response) =>{


    try{

        let result = await vehicleServices.deleteVehicle(req.params.id!);

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message: "User Not Found......!"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message:"User deleted Successfully....",
                data: result.rows
            })
        }

       
    }
    catch(err:any){{
        res.status(500).json({
            success: false,
            message: err.message,
            details:err
        });

    }}
}


export const userControllers = {
    getUser,getSingleUser,updateUser,deleteUser
}