import { ResponseError } from "../error/responseError.js";
import jwt from "jsonwebtoken";

ResponseError;

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ResponseError(400, "Token tidak ada");
  }

  try {
    let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodeToken.role);

    return decodeToken;
  } catch (error) {
    throw new ResponseError(400, "Token tidak valid");
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const decodeToken = await verifyToken(req, res);
    console.log(decodeToken.role);
    if (decodeToken.role !== "admin") {
      return res.status(403).json({
        msg: "Akses ditolak",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }

  next();
};

const me = async (req, res, next) => {
  const decodeToken = await verifyToken(req, res);
  req.studentId = decodeToken.id;
  next();
};

export { adminOnly, me };
