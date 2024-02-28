import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

// create a post api endpoint

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    if (!req.body.content) {
      return next(errorHandler(400, "Content is required"));
    }

    const newComment = new Comment({
      content,
      userId,
      postId,
    });

    const saveComment = await newComment.save();

    res.status(201).json(saveComment);
  } catch (error) {
    next(error);
  }
};


