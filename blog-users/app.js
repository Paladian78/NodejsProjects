import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";

export const app = express();

config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

app.get("/", (req, res) => {
  res.send("Nice working");
});
