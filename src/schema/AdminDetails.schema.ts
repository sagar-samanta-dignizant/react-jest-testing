import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the full_name field and a requirement for both full_name and email fields. 
const AdminDetailsSchema = yup.object({
  full_name: yup
    .string()
    .min(ERRORS.NAME.min_chars, ERRORS.NAME.min)
    .required(ERRORS.NAME.required),
  email: yup
    .string()
    .email(ERRORS.EMAIL.invalid)
    .required(ERRORS.EMAIL.required),
});

export default AdminDetailsSchema;
