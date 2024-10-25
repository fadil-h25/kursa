import { ResponseError } from "../error/responseError.js";
import {
  createNewAdmin,
  createNewStudent,
  findManyStudents,
  findStudentByNim,
  findStudentByEmail,
} from "../repositories/adminRepository.js";
import { hashPassword } from "../utils/passwordUtils.js";

import {
  emailValidate,
  inputLengthValidate,
  numberOnly,
} from "../validations/validation.js";

const addNewAdmin = async (req) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const newAdmin = await createNewAdmin(name, email, hashedPassword);

  if (!newAdmin) throw ResponseError(400, "Gagal menambahkan admin");
  return newAdmin;
};

const addNewStudent = async (req) => {
  const { name, nim, email, password, programId, classId } = req.body;
  inputLengthValidate(name, "name", 1, 50);
  inputLengthValidate(email, "email", 5, 50);
  emailValidate(email);
  inputLengthValidate(nim, "nim", 15, 20);
  numberOnly(nim, "nim");

  const hashedPassword = await hashPassword(password);
  const newStudent = await createNewStudent(
    name,
    nim,
    email,
    hashedPassword,
    programId,
    classId
  );

  if (!newStudent) throw new ResponseError(400, "Gagal menambahkan student");
  return newStudent;
};

const getAllStudents = async () => {
  const students = await findManyStudents();
  if (!students) throw new ResponseError(400, "Data Kosong");
  return students;
};

const getStudentByEmail = async (emailY) => {
  const student = await findStudentByEmail(emailY);

  if (!student)
    throw new ResponseError(
      400,
      `Siswa dengan email ${emailY} tidak ditemukan `
    );

  const {
    id,
    name,
    nim,
    email,
    student_program: { program_name },
    student_class: { class_name },
  } = student;

  return {
    id,
    name,
    nim,
    email,
    program_name,
    class_name,
  };

  return student;
};

const getStudentByNim = async (nim) => {
  const student = await findStudentByNim(nim);

  if (!student)
    throw new ResponseError(400, `Siswa dengan nim ${nim} tidak ditemukan`);
};

export {
  addNewAdmin,
  addNewStudent,
  getAllStudents,
  getStudentByEmail,
  getStudentByNim,
};
