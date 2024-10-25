import express from "express";

import {
  addNewAdmin,
  addNewStudent,
  getAllStudents,
  getStudentByEmail,
  getStudentByNim,
} from "../services/adminService.js";

const adminRouter = express.Router();

adminRouter.get("/api/halo", (req, res, next) => {
  res.status(404).send();
});

adminRouter.post(`/api/students`, async (req, res, next) => {
  try {
    const data = await addNewStudent(req);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

adminRouter.post("/api/admins", async (req, res, next) => {
  try {
    const data = await addNewAdmin(req);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

adminRouter.get(`/api/students`, async (req, res, next) => {
  try {
    const data = await getAllStudents();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

adminRouter.get("/api/students/:email", async (req, res, next) => {
  try {
    const data = await getStudentByEmail(req.params.email);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});
adminRouter.get("/api/studens?nim", async (req, res, next) => {
  try {
    const data = await getStudentByNim(req.nim);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

export default adminRouter;
