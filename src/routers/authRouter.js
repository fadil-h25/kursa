import express from "express";
import { loginService } from "../services/authService.js";

const authRouter = express.Router();

authRouter.get("/api/test", async (req, res, next) => {
  res.status(200).json({
    msg: "berhasil",
  });
});

authRouter.post("/api/login", async (req, res, next) => {
  try {
    const token = await loginService(req);
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

export default authRouter;
