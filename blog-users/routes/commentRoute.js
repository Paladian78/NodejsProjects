import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createComment,
  fetchComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", isAuthenticated, createComment);
router.get("/fetch/:blogId", fetchComments);

export default router;
