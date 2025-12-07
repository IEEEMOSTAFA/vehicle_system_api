



import { pool } from "../../config/db";

const createBooking = async(payload: Record<string, unknown>) => {
    let {customer_id, vehicle_id,rent_start_date, rent_end_date } = payload;
    let vehicle = await pool.query(
     `SELECT * FROM vehicles WHERE id = $1`,[vehicle_id]

    );
    if(vehicle.rows.length === 0){
        throw new Error("vehicle not found...!");
    }
    if(vehicle.rows[0].availability_status !== "available"){
        throw new Error("vehicle is not available right now....!!");
    }

    let daily_rent_price = Number(vehicle.rows[0].daily_rent_price);

    let start = new Date(rent_start_date as string);
    let end = new Date(rent_end_date as string);

    let days = (end.getDate() - start.getDate()) / (1000 *60 *60 * 24);

    if(days < 1) {
        throw new Error("End date must be greater than start date...");
    }

    let total_price = daily_rent_price * days;


    let result = await pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date,rent_end_date,total_price,status ) 
        VALUES($1, $2, $3, $4,$5,'active') 
        RETURNING *
    `, [customer_id, vehicle_id,rent_start_date, rent_end_date,total_price]);



    await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,[vehicle_id]);


    return{ 
        ...result.rows[0],
        vehicle:{
            vehicle_name: vehicle.rows[0].vehicle_name,
            daily_rent_price:vehicle.rows[0].daily_rent_price
        },

    }; 
},
// {
//   "customer_id": 1,
//   "vehicle_id": 2,
//   "rent_start_date": "2024-01-15",
//   "rent_end_date": "2024-01-20"
// }

const getBooking = async() => {
    let result = await pool.query(`SELECT * FROM bookings`);
    return result;
}

const getSingleBooking = async(id: string) => {
    let result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    return result;
}
// {
//   "status": "cancelled"
// }
const updateBooking = async(payload: Record<string, unknown>, id: string) => {
    let {status} = payload;
    
    let result = await pool.query(`
        UPDATE bookings 
        SET status = $1 
        WHERE id = $2 
        RETURNING *
    `, [status,id]);

    return result;
}



export const vehicleServices = {
   createBooking,
   getBooking,
   getSingleBooking,
   updateBooking
}