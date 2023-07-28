import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum plan & coupon length for the payment page.
const paymentSchema = yup.object().shape({
  plan: yup.string().required(ERRORS.PLAN.required),
  coupon: yup.string().optional(),
});

export default paymentSchema;
