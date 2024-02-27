import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getposts } from '../controllers/post.controller.js';
import { deletePost } from '../controllers/post.controller.js';
import { updatePost } from '../controllers/post.controller.js';







const postRoutes = express.Router();

postRoutes.post('/create', verifyToken, createPost);
postRoutes.get('/getposts',  getposts);
postRoutes.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
postRoutes.put('/updatepost/:postId/:userId', verifyToken, updatePost);









export default postRoutes;