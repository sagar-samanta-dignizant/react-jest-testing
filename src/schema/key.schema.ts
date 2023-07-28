import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the key field.
const keySchema = yup.object({
    key: yup
        .string()
        .required(ERRORS.KEY.required),
});

export default keySchema;
