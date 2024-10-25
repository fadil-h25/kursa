import { setVerificationStudentByStudent } from "../services/studentService.js";
import express from "express";

const studentRouter = express.Router();

studentRouter.get("/api/stu/test1", (req, res) => {
  res.status(200).send("ini students");
});

studentRouter.post("/api/stu/verification", async (req, res) => {
  try {
    const data = await setVerificationStudentByStudent(req);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(error.status).json({
      msg: error.message,
    });
  }
});

export default studentRouter;
