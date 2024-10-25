import {
  findAdminByEmail,
  findStudentByEmail,
} from "../repositories/adminRepository.js";
import { findStudentVerificationByStudentId } from "../repositories/studentRepository.js";
import { ResponseError } from "../error/responseError.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const checkPassword = async (password, encryptedPassword) => {
  try {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
  } catch (error) {
    throw new ResponseError(400, "password tidak cocok");
  }
};

const createToken = (id, name, role) => {
  const token = jwt.sign(
    {
      id,
      name,
      role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const loginService = async (req) => {
  const { email, password } = req.body;
  const student = await findStudentByEmail(email);

  if (student) {
    const verification = await findStudentVerificationByStudentId(student.id);
    if (verification.verification_status === "inactive")
      throw new ResponseError(400, "Akun belum diverifikasi");
  }

  const admin = await findAdminByEmail(email);

  if (student && admin) {
    throw new ResponseError(400, "gagal login karna email double");
  } else if (student && (await checkPassword(password, student.password))) {
    return createToken(student.id, student.name, "student");
  } else if (admin && (await checkPassword(password, admin.password))) {
    return createToken(admin.id, admin.name, "admin");
  } else {
    throw new ResponseError(400, "gagal login password salah");
  }
};

export { loginService, checkPassword };
