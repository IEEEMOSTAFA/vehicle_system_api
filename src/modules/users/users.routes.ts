


import express from "express"

import { userControllers } from "./users.controller";
import { logger } from "../../middleware/logger";

let router = express.Router();




router.get("/", userControllers.getUser);
router.get("/:id",logger, userControllers.getSingleUser);
router.put("/:id",logger, userControllers.updateUser);
router.delete("/:id",logger, userControllers.deleteUser);


export const userRoutes = router;