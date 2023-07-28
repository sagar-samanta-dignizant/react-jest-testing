import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum length for the otp.
const otpSchema = yup.object({
  otp: yup.string().required(ERRORS.OTP.required),
});

export default otpSchema;
