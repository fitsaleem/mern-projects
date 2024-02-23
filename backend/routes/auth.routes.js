import express from "express";
import { signin, signup , google} from "../controllers/auth.controller.js";






const authRoutes= express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/google", google);




export default authRoutes