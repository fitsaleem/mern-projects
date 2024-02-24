import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getPosts } from '../controllers/post.controller.js';







const postRoutes = express.Router();

postRoutes.post('/create', verifyToken, createPost);
postRoutes.get('/get',  getPosts);









export default postRoutes;