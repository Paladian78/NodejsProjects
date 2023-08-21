import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { errorHandler, notFound } from "./middlewares/error.js";

export const app = express();

config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

// Admin purpose
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("The Backend server for blog-users is working");
});

// To handle errors
app.use(notFound);
app.use(errorHandler);
