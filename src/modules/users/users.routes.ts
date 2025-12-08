import express from "express";
import { userControllers } from "./users.controller";
import { logger } from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const router = express.Router();


router.get( "/",auth("admin"),logger,userControllers.getUser);


router.get("/:id",auth("admin", "customer"),logger, userControllers.getSingleUser);


router.put("/:id",auth("admin", "customer"),logger,userControllers.updateUser);

router.delete( "/:id", auth("admin"),logger,userControllers.deleteUser);

export const userRoutes = router;


