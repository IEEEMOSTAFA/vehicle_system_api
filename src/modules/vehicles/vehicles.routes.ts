


import express from "express"
import { vehiclesControllers } from "./vehicles.controller";
import { logger } from "../../middleware/logger";

let router = express.Router();


router.post("/",vehiclesControllers.createVehicle);

router.get("/", vehiclesControllers.getVehicle);
router.get("/:id",logger, vehiclesControllers.getSingleVehicle);
router.put("/:id",logger, vehiclesControllers.updateVehicle);
router.delete("/:id",logger, vehiclesControllers.deleteVehicle);


export const vehicleRoutes = router;

