import express from "express";
import { signin, signup , google , forgotPassword , resetPassword , verifyEmail} from "../controllers/auth.controller.js";






const authRoutes= express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/google", google);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset/:token", resetPassword);
authRoutes.get("/verify-email/:token", verifyEmail);







export default authRoutes