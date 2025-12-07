import { Router } from "express";
import { authController } from "./auth.controller";
// import { authController } from "./auth.controller";


const router = Router();


// http:/ localhost : 5000/auth
router.post("/signup", authController.signupUser)
router.post("/signin",authController.signinUser)

export const authRoutes = router;