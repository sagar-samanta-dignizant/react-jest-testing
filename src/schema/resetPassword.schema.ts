import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the email also used regex. 
const ResetPasswordSchema = yup.object({
  email: yup
    .string()
    .email(ERRORS.EMAIL.invalid)
    .required(ERRORS.EMAIL.required),
});

export default ResetPasswordSchema;
