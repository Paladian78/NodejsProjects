import express from "express";
import {
  createBlog,
  fetchBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import commentRoute from "./commentRoute.js";

const router = express.Router();

router.use("/comment", commentRoute);

router.post("/create", isAuthenticated, createBlog);
router.get("/fetch", fetchBlog);
router.put("/update", isAuthenticated, updateBlog);

export default router;
