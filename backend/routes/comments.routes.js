import  express from 'express';
import { createComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';




const commentRoutes = express.Router();




commentRoutes.post('/create', verifyToken , createComment);

export default commentRoutes; 