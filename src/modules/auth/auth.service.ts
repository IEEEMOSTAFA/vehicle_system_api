


import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";


const signupUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    // Hash_Password
    const hashedPassword = await bcrypt.hash(password as string, 10);

  
    const result = await pool.query(
        `INSERT INTO users(name, email, password, phone, role) 
         VALUES($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, email, hashedPassword, phone, role || 'customer']
    );

    const user = result.rows[0];

    
    const token = jwt.sign(
        { userId: user.id, name: user.name, email: user.email, role: user.role },
        config.jwtSecret as string,
        { expiresIn: "5d" }
    );

    return { token, user };
};


const loginUser = async (email: string, password: string) => {
    console.log({ email });
    
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (result.rows.length === 0) {
        return null;
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    console.log({ match, user });

    if (!match) {
        return false;
    }

    const token = jwt.sign(
        { userId: user.id, name: user.name, email: user.email, role: user.role },
        config.jwtSecret as string,
        { expiresIn: "5d" }
    );
    console.log({ token });

    return { token, user };
};

export const authServices = {
    signupUser,
    loginUser
};