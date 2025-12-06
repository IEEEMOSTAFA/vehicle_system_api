


import express from "express"
import { vehiclesControllers } from "./vehicles.controller";
import { logger } from "../../middleware/logger";

let router = express.Router();


router.post("/",vehiclesControllers.createVehicle);

router.get("/", vehiclesControllers.getVehicle);
router.get("/:id",logger, vehiclesControllers.getSingleVehicle);
router.put("/:id",logger, vehiclesControllers.updateVehicle);
router.delete("/:id",logger, vehiclesControllers.deleteVehicle);


export const useRoutes = router;

// let router = express.Router();

// router.post("/",userControllers.createUser);
// router.get("/",logger,auth("admin"), userControllers.getUser);
// router.get("/:id",logger,auth("users","admin"),userControllers.getSingleUser);
// router.put("/:id",userControllers.updateUser);
// router.delete("/:id",userControllers.deleteUser);