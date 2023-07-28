import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the address & other fields. 
const loginSchema = yup.object({
  companyname: yup.string().required(ERRORS.COMPANY_NAME.required),
  company_address_1: yup.string().required(ERRORS.ADDRESS.required),
  company_state: yup.string().required(ERRORS.STATE.required),
  company_city: yup.string().required(ERRORS.CITY.required),
  company_country: yup.string().required(ERRORS.COUNTRY.required),
  company_postal_code: yup.string().required(ERRORS.POSTAL_CODE.required),
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
  avatar: yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      if (!!file)
        return true;
      else
        return false;
    }).required("Please upload picture")
  ,
  profile: yup.mixed()
      .test("required", "You need to provide a file", (file) => {
        if (!!file) return true;
        else return false;
      })

}).required("Please upload picture")




export default loginSchema;
