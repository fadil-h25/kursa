import { ResponseError } from "../error/responseError.js";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new ResponseError(400, "gagal hasing password");
  }
};

export { hashPassword };
