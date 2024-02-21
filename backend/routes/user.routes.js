import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser  } from "../controllers/user.controller.js";




const userRoutes = express.Router();
userRoutes.use(verifyToken);


userRoutes.put("/update/:userId", verifyToken, updateUser );


export default userRoutes;
