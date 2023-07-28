import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the password & confirm password also used regex. 
const resetPass = yup.object({
  password: yup
    .string()
    .min(ERRORS.PASSWORD.min_chars, ERRORS.PASSWORD.min)
    .matches(ERRORS.PASSWORD.regex, ERRORS.PASSWORD.invalid)
    .required(ERRORS.PASSWORD.required),
  confirm_password: yup
    .string()
    .min(ERRORS.PASSWORD.min_chars, ERRORS.PASSWORD.min)
    .matches(ERRORS.PASSWORD.regex, ERRORS.PASSWORD.invalid)
    .oneOf([yup.ref("password")], ERRORS.PASSWORD.not_matched)
    .required(ERRORS.PASSWORD.required),
});

export default resetPass;
