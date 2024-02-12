import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";





const authRoutes= express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);


export default authRoutes