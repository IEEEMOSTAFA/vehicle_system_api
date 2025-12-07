




import express, { Request, Response } from "express"
import { vehicleServices } from "./vehicles.service";
import strict from "assert/strict";




let createVehicle = async(req: Request,res: Response) =>{


    console.log("Request Body is: ",req.body);

    let {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;


    try{

        let result = await vehicleServices.createVehicle(req.body);

        res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: result.rows[0]
        });
    }
    catch(err:any){{
        res.status(500).json({
            success: false,
            message: err.message
        });

    }}
}



let getVehicle = async(req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    // let {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;


    try{

        let result = await vehicleServices.getVehicle();

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
let getSingleVehicle = async(req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    // let {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;


    try{

        let result = await vehicleServices.getSingleVehicle(req.params.id as string);

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
let updateVehicle = async (req: Request,res: Response) =>{


    // console.log("Request Body is: ",req.body);

    let {vehicle_name,daily_rent_price,availability_status} = req.body;


    try{

        let result = await vehicleServices.updateVehicle(req.body,req.params.id!);
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
let deleteVehicle = async (req: Request,res: Response) =>{


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


export const vehiclesControllers = {
    createVehicle,getVehicle,getSingleVehicle,updateVehicle,deleteVehicle
}