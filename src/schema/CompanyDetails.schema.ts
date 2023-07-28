import * as yup from "yup";
import ERRORS from "../config/validation.config";

//The yup library is used to define the validation rules, which include a minimum character length for the address & other fields. 
const CompanyDetailsSchema = yup.object({
  company_address_1: yup.string().required(ERRORS.ADDRESS.required),
  company_address_2: yup.string().required(ERRORS.ADDRESS.required),
  company_state: yup.string().required(ERRORS.STATE.required),
  company_city: yup.string().required(ERRORS.CITY.required),
  company_country: yup.string().required(ERRORS.COUNTRY.required),
  company_postal_code: yup.string().required(ERRORS.POSTAL_CODE.required),
});

export default CompanyDetailsSchema;
