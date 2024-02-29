import  express from 'express';
import { createComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getPostComments, likeComment, editComment, deleteComment, getcomments } from '../controllers/comment.controller.js';




const commentRoutes = express.Router();




commentRoutes.post('/create', verifyToken , createComment);
commentRoutes.get('/getPostComments/:postId', getPostComments);
commentRoutes.put('/likeComment/:commentId', verifyToken, likeComment);
commentRoutes.put('/editComment/:commentId', verifyToken, editComment);
commentRoutes.delete('/deleteComment/:commentId', verifyToken, deleteComment);
commentRoutes.get('/getcomments', verifyToken, getcomments);

export default commentRoutes; 