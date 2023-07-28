import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the password field and a requirement for both password & new password fields. 
const ChangePasswordSchema = yup.object({
  new_password: yup
    .string()
    .min(8, ERRORS.PASSWORD.min)
    .matches(ERRORS.PASSWORD.regex, ERRORS.PASSWORD.invalid),
  confirm_password: yup
    .string()
    .min(ERRORS.PASSWORD.min_chars, ERRORS.PASSWORD.min)
    .matches(ERRORS.PASSWORD.regex, ERRORS.PASSWORD.invalid)
    .oneOf([yup.ref("new_password")], ERRORS.PASSWORD.not_matched),
});

export default ChangePasswordSchema;
