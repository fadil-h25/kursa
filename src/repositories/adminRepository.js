import { prismaDb } from "../database/db.js";

const createNewAdmin = async (name, email, hashedPassword) => {
  const admin = await prismaDb.admin.create({
    select: {
      name: true,
      email: true,
      level: true,
    },
    data: {
      name,
      email,
      level: 1,
      password: hashedPassword,
    },
  });
  return admin;
};

const findAdminByEmail = async (email) => {
  const admin = await prismaDb.admin.findUnique({
    select: {
      name: true,
      email: true,
      level: true,
      password: true,
    },
    where: {
      email,
    },
  });
  return admin;
};

const createNewStudent = async (
  name,
  nim,
  email,
  hashedPassword,
  programId,
  classId
) => {
  let newStudent = null;

  await prismaDb.$transaction(async (prismaDb) => {
    newStudent = await prismaDb.student.create({
      select: {
        id: true,
        name: true,
        email: true,
        nim: true,
      },
      data: {
        name,
        nim,
        email,
        password: hashedPassword,
        program_id: programId,
        class_id: classId,
      },
    });

    await prismaDb.student_verification.create({
      data: {
        student_id: newStudent.id,
      },
    });
  });

  return newStudent;
};

const findStudentByEmail = async (email) => {
  const student = await prismaDb.student.findUnique({
    where: {
      email,
    },

    include: {
      student_program: {
        select: {
          program_name: true,
        },
      },
      student_class: {
        select: {
          class_name: true,
        },
      },
    },
  });

  return student;
};
const findStudentByNim = async (nim) => {
  const student = await prismaDb.student.findUnique({
    select: {
      name: true,
      email: true,
      nim: true,
      password: true,
    },
    where: {
      nim,
    },
  });

  return student;
};

const findManyStudents = async () => {
  const students = await prismaDb.student.findMany({
    select: {
      name: true,
      email: true,
      nim: true,
    },
  });
  return students;
};

export {
  findAdminByEmail,
  createNewAdmin,
  createNewStudent,
  findStudentByEmail,
  findStudentByNim,
  findManyStudents,
};
