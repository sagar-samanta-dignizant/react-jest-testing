import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the fields below also used regex for it. 
const UserSchema = yup.object({
  firstName: yup
    .string()
    .matches(ERRORS.FIRSTNAME.regex, ERRORS.FIRSTNAME.invalid)
    .required(ERRORS.FIRSTNAME.required),
  // lastName: yup
  //   .string()
  //   .matches(ERRORS.LASTNAME.regex, ERRORS.LASTNAME.invalid)
  //   .required(ERRORS.LASTNAME.required),
  // displayName: yup
  //   .string()
  //   .min(ERRORS.DISPLAYNAME.min_chars, ERRORS.DISPLAYNAME.min)
  //   .required(ERRORS.FIRSTNAME.required),
  phoneNo: yup
    .string()
    .required(ERRORS.PHONENUMBER.required),
  email: yup
    .string()
    .email(ERRORS.EMAIL.invalid)
    .required(ERRORS.EMAIL.required),
});

export default UserSchema;
