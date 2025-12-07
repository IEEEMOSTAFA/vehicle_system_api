

import { pool } from "../../config/db";

const createVehicle = async(payload: Record<string, unknown>) => {
    let {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;
    
    let result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *
    `, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
}

const getVehicle = async() => {
    let result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

const getSingleVehicle = async(id: string) => {
    let result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
}

const updateVehicle = async(payload: Record<string, unknown>, id: string) => {
    let {vehicle_name, daily_rent_price, availability_status} = payload;
    
    let result = await pool.query(`
        UPDATE vehicles 
        SET vehicle_name = $1, daily_rent_price = $2, availability_status = $3 
        WHERE id = $4 
        RETURNING *
    `, [vehicle_name, daily_rent_price, availability_status, id]);

    return result;
}

const deleteVehicle = async(id: string) => {
    let result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
    return result;
}

export const vehicleServices = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}