import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import asyncHandler from "express-async-handler";
import { sendCookie } from "../utils/features.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.send({
      success: false,
      message: "Please register first",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "Invalid Password",
    });
  }

  sendCookie(user, res, `Welcome, ${user.name}`, 200);
});

export const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    res.json({
      success: true,
      message: "User registered, Now you can login with the credentials",
    });
  } catch (error) {
    res.send(error).status(500);
  }
});

export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      message: "User logged out",
    });
});
