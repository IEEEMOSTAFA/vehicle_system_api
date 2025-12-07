




// import express from "express";
// import { userControllers } from "./users.controller";
// import { logger } from "../../middleware/logger";
// import { auth } from "../../middleware/auth";

// const router = express.Router();


// router.get(
//     "/",
//     auth("admin"),
//     logger,
//     userControllers.getUser
// );


// router.get(
//     "/:id",
//     auth("admin"),
//     logger,
//     userControllers.getSingleUser
// );


// router.put(
//     "/:id",
//     auth("admin"),
//     logger,
//     userControllers.updateUser
// );


// router.delete(
//     "/:id",
//     auth("admin"),
//     logger,
//     userControllers.deleteUser
// );

// export const userRoutes = router;



















import express from "express";
// import { userControllers } from "./users.controller";
import { logger } from "../../middleware/logger";
import { auth } from "../../middleware/auth";
import { userControllers } from "./users.controller";

const router = express.Router();

// GET /api/v1/users - Admin only: View all users
router.get(
    "/",
    auth("admin"),
    logger,
    userControllers.getUser
);

// GET /api/v1/users/:id - Admin only or Own profile
router.get(
    "/:id",
    auth("admin", "customer"),
    logger,
    userControllers.getSingleUser
);

// PUT /api/v1/users/:id - Admin or Own: Update user
router.put(
    "/:id",
    auth("admin", "customer"),
    logger,
    userControllers.updateUser
);

// DELETE /api/v1/users/:id - Admin only: Delete user
router.delete(
    "/:id",
    auth("admin"),
    logger,
    userControllers.deleteUser
);

export const userRoutes = router;