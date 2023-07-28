

const ROOTS_AUTH: string = "";
const ROOTS_ADMIN: string = "/admin";
const ROOTS_USER: string = "/user";

//
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

//ROOTS_AUTH, ROOTS_ADMIN, and ROOTS_USER are strings representing the root URLs for authentication, admin, and user sections of the application.
export const AUTH_ROUTES = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  otp: path(ROOTS_AUTH, "/otp"),
  forgetPassword: path(ROOTS_AUTH, "/forget_password"),
  registerCompany: path(ROOTS_AUTH, "/register"),
  registerUser: path(ROOTS_USER, "/register"),
  resetPassword: path(ROOTS_USER, "/reset"),
  payment: path(ROOTS_AUTH, "/payment"),
  resetFactorAuthentication: path(ROOTS_AUTH, "/resetFactorAuthentication"),
  NewUser: path(ROOTS_AUTH, "/register"),
  keyPage: path(ROOTS_AUTH, "/formKey"),
  VerifyEmail: path(ROOTS_AUTH, '/verifyEmail')
};

export const ADMIN_ROUTES = {
  root: ROOTS_ADMIN,
  adminProfile: path(ROOTS_ADMIN, "/profile"),
  users: path(ROOTS_ADMIN, "/users"),
  models: path(ROOTS_ADMIN, "/models"),
};

export const USER_ROUTES = {
  root: ROOTS_USER,
  userProfile: path(ROOTS_USER, "/profile"),
  models: path(ROOTS_USER, "/models"),
};

export const ERROR_PATH = {
  page404: "/404",
  page500: "/500",
};
