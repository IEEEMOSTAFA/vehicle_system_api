import express,{NextFunction, Request,Response} from "express";

import config from "./config";
import initDB from "./config/db";
import { logger } from "./middleware/logger";
import {  vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { userRoutes } from "./modules/users/users.routes";
// import initDB, { pool } from "./config/db";


const app = express();



app.use(express.json());

//Database function:



initDB()
// "/" -> localhost:5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});
// users operation:
app.use("/api/v1/vehicles",vehicleRoutes);
// /api/v1/vehicles
// // todo CRUD OPERATION::
// app.use("/todos",todoRoutes);
app.use("/api/v1/users",userRoutes);
// //   AUTH ROUTES:

// app.use("/auth", authRoutes);




// Not Found Route Operation:

app.use((req,res) =>{
  res.status(404).json({
    success: false,
    message: "Not Found....Wrong Attack",
    path: req.path
  })
})


export default app;