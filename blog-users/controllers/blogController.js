import asyncHandler from "express-async-handler";
import { Blog } from "../model/blog.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    await Blog.create({
      title,
      content,
      author: req.user,
    });
    res.json({
      success: true,
      message: "Blog created",
    });
  } catch (error) {
    res.send(error);
  }
});

export const fetchBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.json(blog);
  } catch (error) {
    res.send(error);
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId, title, content } = req.body;
    const blog = await Blog.findOne({ _id: blogId });

    if (!blog || !blogId) {
      return res.json({
        success: false,
        message: "Couldn't find blog",
      });
    }

    blog.title = title;
    blog.content = content;
    blog.updatedAt = Date.now();

    await blog.save();
    res.send({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.send(error);
  }
});
