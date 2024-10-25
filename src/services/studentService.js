import {
  findStudentById,
  findStudentVerificationByStudentId,
  verificationStudentByStudent,
  findStudentForVerification,
} from "../repositories/studentRepository.js";
import { ResponseError } from "../error/responseError.js";
import { checkPassword } from "./authService.js";

const getProfile = async (id) => {
  const student = await findStudentById(id);

  if (!student) throw new ResponseError(400, "Gagal menemukam data diri");

  return student;
};

const setVerificationStudentByStudent = async (req) => {
  const { nim, email, password } = req.body;
  const student = await findStudentForVerification(nim, email);
  if (!student) throw new ResponseError(400, "Student tidak ditemukan");

  if (!(await checkPassword(password, student.password)))
    throw new ResponseError("Student tidak ditemukan");

  const verificationId = await findStudentVerificationByStudentId(student.id);

  if (!verificationId)
    throw new ResponseError(400, "id verifikasi tidak ditemukan");

  const updatedData = await verificationStudentByStudent(student.id);

  if (!updatedData)
    throw new ResponseError(400, "Gagal mengupdate data verifikasi");

  return updatedData;
};

export { setVerificationStudentByStudent };
