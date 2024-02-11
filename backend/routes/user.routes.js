import express from "express";
import { signup } from "../controllers/user.controller.js";





const userRoutes= express.Router();

userRoutes.post("/signup", signup);

export default userRoutes