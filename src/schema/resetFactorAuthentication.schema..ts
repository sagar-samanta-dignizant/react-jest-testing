import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the email & password also used regex. 
const resetFactorAuthentication = yup.object({
  email: yup
    .string()
    .email(ERRORS.EMAIL.invalid)
    .required(ERRORS.EMAIL.required),
  password: yup
    .string()
    .min(ERRORS.PASSWORD.min_chars, ERRORS.PASSWORD.min)
    .matches(ERRORS.PASSWORD.regex, ERRORS.PASSWORD.invalid)
    .required(ERRORS.PASSWORD.required),
});

export default resetFactorAuthentication;
