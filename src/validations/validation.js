import { ResponseError } from "../error/responseError.js";

const statusCode = 400;

const inputLengthValidate = (input, inputName, min, max, statusCode) => {
  // Periksa apakah panjang input sesuai dengan batas minimum dan maksimum
  if (input.length < min || input.length > max) {
    throw new ResponseError(
      statusCode,
      `${inputName} tidak boleh memiliki panjang kurang dari ${min} dan lebih dari ${max}`
    );
  }
  return input;
};

const emailValidate = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) throw new ResponseError(400, "Email tidak valid");

  return email;
};

const numberOnly = (input, inputName) => {
  const regex = /^[0-9]+$/;

  if (!regex.test(input))
    throw new ResponseError(400, `${inputName} hanya boleh berisi angka`);

  return input;
};

export { numberOnly, emailValidate, inputLengthValidate };
