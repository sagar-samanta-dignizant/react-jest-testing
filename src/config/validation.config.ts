
//This code defines an object ERRORS that contains different error messages for various form input fields. 
const ERRORS = {
  EMAIL: {
    required: "Email is required",
    invalid: "Email is invalid",
  },
  PASSWORD: {
    required: "Password is required",
    invalid:
      "Password must include uppercase, lowercase, number and special symbol",
    min: "Min 8 characters required",
    min_chars: 8,
    regex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
    not_matched: "Passwords does not match",
  },
  CONFIRMPASSWORD: {
    required: "Confirm Password is required",
  },
  OTP: {
    required: "OTP is required",
  },
  COMPANY_NAME: {
    required: "Company Name is required",
  },
  ADDRESS: {
    required: "Address is required",
  },
  STATE: {
    required: "State is required",
  },
  CITY: {
    required: "City is required",
  },
  COUNTRY: {
    required: "Country is required",
  },
  POSTAL_CODE: {
    required: "Postal code is required",
  },
  NAME: {
    required: "Name is required",
    min: "Min 3 characters is required",
    min_chars: 3,
  },
  DISPLAYNAME: {
    required: "Display name is required",
    min_chars: 5,
    min: "Min 5 characters is required",
  },
  FIRSTNAME: {
    required: "First name is required",
    min: "Min 3 characters is required",
    min_chars: 3,
    regex: /^[a-zA-Z ]+$/,
    invalid: "Allowed only alphabetics",
  },
  LASTNAME: {
    required: "Last name is required",
    min: "Min 3 characters is required",
    min_chars: 3,
    regex: /^[a-zA-Z ]+$/,
    invalid: "Allowed only alphabetics",
  },
  PHONENUMBER: {
    required: "Phone number is required",
    regex: /^[+]?[0-9 ]{10,12}$/,
    invalid: "Allowed only numbers",
  },
  COUPON_CODE: {
    min: "Coupon code must be at least 2 characters long",
    min_chars: 2,
    max: "Coupon code can have maximum 6 characters only",
    max_chars: 6,
  },
  PLAN: {
    required: "Please select the payment plan",
  },
  KEY: {
    required: "key is required",
    invalid: "key is invalid",
  },
  
};

export default ERRORS;
