

import { pool } from "../../config/db";

const getUser = async () => {
    const result = await pool.query(`
        SELECT * 
        FROM users 
        
    `);
    return result;
}

const getSingleUser = async (id: string) => {
    // Fixed: Changed from 'vehicles' to 'users' table
    const result = await pool.query(`
        SELECT id, name, email, phone, role 
        FROM users 
        WHERE id = $1
    `, [id]);
    return result;
}

const updateUser = async (payload: Record<string, unknown>, id: string, role: string, userId: number) => {
    const { name, email, phone, role: newRole } = payload;

    // Check if user exists
    const userCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    
    if (userCheck.rows.length === 0) {
        throw new Error("User not found");
    }

    // Customer can only update their own profile (not role)
    if (role === "customer") {
        if (Number(id) !== userId) {
            throw new Error("You can only update your own profile");
        }
        
        if (newRole) {
            throw new Error("Customers cannot change their role");
        }

        // Update only name, email, phone for customers
        const result = await pool.query(`
            UPDATE users 
            SET name = $1,email = $2, phone = $3 
            WHERE id = $4 
            RETURNING id, name, email, phone, role
        `, [name, email, phone, id]);

        return result;
    }

    // Admin can update any user including role
    if (role === "admin") {
        const result = await pool.query(`
            UPDATE users 
            SET name = $1,email = $2, phone = $3 ,role = $4
            WHERE id = $5 
            RETURNING *
        `, [name, email, phone, role, id]);

        return result;
    }

    throw new Error("Unauthorized action");
}

const deleteUser = async (id: string) => {
    // Check if user has any active bookings
    // const activeBookings = await pool.query(`
    //     SELECT * FROM bookings 
    //     WHERE customer_id = $1 AND status = 'active'
    // `, [id]);

    // if (activeBookings.rows.length > 0) {
    //     throw new Error("Cannot delete user with active bookings");
    // }

    // Check if user exists before deleting
    const userCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    
    if (userCheck.rows.length === 0) {
        throw new Error("User not found");
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
    return result;
}

export const userServices = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}