import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the fields below & also used regex for it. 
const userloginSchema = yup.object({
  full_name: yup.string().required(ERRORS.NAME.required),
  user_email: yup
    .string()
    .email(ERRORS.EMAIL.invalid)
    .required(ERRORS.EMAIL.required),
  display_name: yup
    .string()
    .min(ERRORS.NAME.min_chars, ERRORS.NAME.min)
    .required(ERRORS.NAME.required),
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

export default userloginSchema;
