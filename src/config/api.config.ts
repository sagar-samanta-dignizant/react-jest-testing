
const BASE_URL =
  // "http://47c9-2405-201-200d-214e-dcc2-1d0b-7734-8ae5.ngrok.io/test";
  // "http://192.168.1.118:3004";
  "https://test-config.cadcogsecure.com"
// "http://localhost:/3004/test";
  const MODEL_BASE_URL= 
  "https://test-model.cadcogsecure.com"
  // "http://192.168.1.118:3006";


class InternalAPIEndpoints {
  static LOGIN = "/auth";
  static HOME = "/home";
  static ADMIN_USER = "/admin-user";
  static ADMIN = "/admin";

  static FIRM = "/firm";

  static MODAL = "/model";
  static PAYMENT = "/payment";
  static SUBSCRIPTION = "/subscription"
  static COUNT_MODEL = "/config";
   
}

class SubAPIEndpoints {
  static ADMIN_REGISTER = "/register-admin";
  static ADMIN_USER_REGISTER = "/register-admin-user";
  static LOGIN = "/login-send-otp";
  static OTP_VERIFY = "/login-verify-otp";
  static OTP_RESEND = "/login-resend-otp";
  static KEY = '/login-verify-key-via-email';
  static FORGOT_PASSWORD = "/forget-password";
  static RESET_PASSWORD = "/reset-password";

  static ADMIN_LOG = "/admin-log";
  static ADMIN_USER_TASK = "/admin-user-task";
  static ADMIN_TASK = "/admin-task";
  static ADMINS_APPROVAL = "/admin-approve-disapprove";

  static ADD_ADMIN_USER = "/send-invitation";
  static SEND_LINK_RESET_PASSWORD = "/send-link-reset-password";
  static LIST = "/list";
  static CREATE_HEADSETKEY = "/create-headset";
  static SEND_MAIL_VERIFICATION_EMAIL = "send-mail-verification-email"
  static VERIFICATION_EMAIL="verification-email"

  static TWO_FACTOR_ADMIN = "/admin-otp";
  static TWO_FACTOR_USER = "/admin-user-otp";


  static SUCCESS_PAYMENT = "/checkout";
 
 
  static UPGRADE_DOWNGRADE_SUBSCRIPTIONS = "/upgrade-downgrade-subscriptions";
  static CANCEL_SUBCRIPTION = "/cancel-subscription";
  static REACTIVATING_CANCELED_SUBSCRIPTIONS = "/reactivating-canceled-subscriptions"


  static MODEL_LIST = '/list';



  static COUPON = "/verify-coupon";
}

export { BASE_URL, InternalAPIEndpoints, SubAPIEndpoints, MODEL_BASE_URL };
