import { verification_status } from "@prisma/client";
import { prismaDb } from "../database/db.js";

const findStudentById = async (id) => {
  const student = await prismaDb.student.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      nim: true,
    },
  });
  return student;
};

const findStudentVerificationByStudentId = async (studentId) => {
  const verificationId = await prismaDb.student_verification.findUnique({
    where: {
      student_id: studentId,
    },
  });

  return verificationId;
};

const verificationStudentByStudent = async (studentId) => {
  const now = new Date();
  const result = await prismaDb.student_verification.update({
    where: {
      student_id: studentId,
    },

    data: {
      verification_date: now,
      verification_status: "active",
    },
  });

  return result;
};

const findStudentForVerification = async (nim, email) => {
  const student = await prismaDb.student.findUnique({
    where: {
      nim,
      email,
    },
  });
  return student;
};

export {
  findStudentById,
  findStudentVerificationByStudentId,
  verificationStudentByStudent,
  findStudentForVerification,
};
