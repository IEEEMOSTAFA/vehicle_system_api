import { pool } from "../../config/db";

const createBooking = async(payload: Record<string, unknown>) => {
    let {customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    
    let vehicle = await pool.query(
        `SELECT * FROM vehicles WHERE id = $1`, [vehicle_id]
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

    // Fixed: Calculate days correctly
    let days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if(days < 1) {
        throw new Error("End date must be greater than start date...");
    }

    let total_price = daily_rent_price * days;

    let result = await pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES($1, $2, $3, $4, $5, 'active') 
        RETURNING *
    `, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);

    await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);

    return { 
        ...result.rows[0],
        vehicle: {
            vehicle_name: vehicle.rows[0].vehicle_name,
            daily_rent_price: vehicle.rows[0].daily_rent_price
        }
    }; 
}

const getBooking = async(role: string, userId: number) => {
    if(role === "admin"){
        let result = await pool.query(`
            SELECT
                b.*,
                u.name AS customer_name,
                u.email AS customer_email,
                v.vehicle_name,
                v.registration_number
            FROM bookings b 
            JOIN users u ON b.customer_id = u.id
            JOIN vehicles v ON b.vehicle_id = v.id
            
        `); 
        return result.rows;
    }
    else{
        
        let result = await pool.query(`
            SELECT
                b.*,
                v.vehicle_name,
                v.registration_number,
                v.type
            FROM bookings b
            JOIN vehicles v ON b.vehicle_id = v.id
            WHERE b.customer_id = $1
               
        `, [userId]);
        return result.rows;
    }
}

const getSingleBooking = async(id: string) => {
    let result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    return result;
}

const updateBooking = async(payload: Record<string, unknown>, id: string, role: string, userId: number) => {
    let {status} = payload;

    let bookingResult = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);

    if(bookingResult.rows.length === 0){
        throw new Error("Booking not Found");
    }

    let booking = bookingResult.rows[0];

    if(role === "customer"){
        
        if(booking.customer_id !== userId){
            throw new Error("You can't update customer booking")
        }
        if(status !== "cancelled"){
            throw new Error("Customer can only cancel booking");
        }

        let now = new Date();
        let startDate = new Date(booking.rent_start_date);
        if(now >= startDate){
            throw new Error("you can't cancelled after booking start date")
        }
        
        let result = await pool.query(`
            UPDATE bookings
            SET status = 'cancelled'
            WHERE id = $1
            RETURNING *
        `, [id]);

        return result.rows[0];
    }

    if(role === "admin"){
        if(status !== "returned"){
            throw new Error("Admin can only mark booking: returned")
        }

        let updated = await pool.query(`
            UPDATE bookings 
            SET status = 'returned'
            WHERE id = $1
            RETURNING *
        `, [id]);

        await pool.query(`
            UPDATE vehicles
            SET availability_status = 'available'
            WHERE id = $1
        `, [booking.vehicle_id]);

        return updated.rows[0];
    }
}

export const bookingService = {
    createBooking,
    getBooking,
    getSingleBooking,
    updateBooking
}