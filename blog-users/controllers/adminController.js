import asyncHandler from "express-async-handler";
import { Blog } from "../model/blog.js";
import { User } from "../model/user.js";
import { Comment } from "../model/comment.js";

export const fetchUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export const fetchComments = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.find({});
    if (!comment) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

export const fetchBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find({});
    if (!blog) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }
    res.json(blog);
  } catch (error) {
    res.json(error);
  }
});
