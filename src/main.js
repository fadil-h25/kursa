import "dotenv/config";
import cors from "cors";
import express from "express";
import adminRouter from "./routers/adminRouter.js";
import studentRouter from "./routers/studentRouter.js";
import authRouter from "./routers/authRouter.js";
import { adminOnly, me } from "./middlewares/auth.js";

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(authRouter);
app.use(studentRouter);
app.use(adminOnly, adminRouter);

app.listen(port, () => {
  console.log("running on port ", port);
});
