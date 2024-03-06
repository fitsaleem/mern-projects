import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser  } from "../controllers/user.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import { signout } from "../controllers/user.controller.js";
import { getUsers } from "../controllers/user.controller.js";
import { getUser } from "../controllers/user.controller.js";




const userRoutes = express.Router();
userRoutes.use(verifyToken);


userRoutes.put("/update/:userId", verifyToken, updateUser );
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.post("/signout", signout);
userRoutes.get('/getusers', verifyToken, getUsers);
userRoutes.get('/:userId', getUser);

export default userRoutes;
