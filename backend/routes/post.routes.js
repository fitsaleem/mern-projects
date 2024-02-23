import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';







const postRoutes = express.Router();

postRoutes.post('/create', verifyToken, createPost);










export default postRoutes;