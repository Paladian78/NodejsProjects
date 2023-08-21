import express from "express";
import {
  fetchBlogs,
  fetchComments,
  fetchUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", fetchUsers);
router.get("/comments", fetchComments);
router.get("/blogs", fetchBlogs);

export default router;
