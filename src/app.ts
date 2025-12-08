import express,{NextFunction, Request,Response} from "express";

import config from "./config";
import initDB from "./config/db";
import { logger } from "./middleware/logger";
import {  vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { userRoutes } from "./modules/users/users.routes";
import { bookingRoutes } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

//Database function:
initDB()

// "/" -> localhost:5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Welcome to Vehicle System API.....!");
});

app.use("/api/v1/vehicles",vehicleRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.use("/api/v1/users",userRoutes);

app.use("/api/v1/auth",authRoutes)

// Not Found Route Operation:
app.use((req,res) =>{
  res.status(404).json({
    success: false,
    message: "Not Found....Wrong Attack",
    path: req.path
  })
})


export default app;