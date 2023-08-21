import asyncHandler from "express-async-handler";
import { Comment } from "../model/comment.js";
import { Blog } from "../model/blog.js";

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
      return res.json({
        success: false,
        message: "Please provide a valid blog ID",
      });
    }
    const comment = await Comment.create({
      content,
      author: req.user,
    });
    blog.comments.push(comment);
    await blog.save();
    res.json({
      success: true,
      message: "created comment successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

export const fetchComments = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId }).populate("comments");
    if (!blog) {
      res.json({
        success: false,
        message: "Invalid Blog ID",
      });
    }
    res.json(blog);
  } catch (error) {
    res.json(error);
  }
});
