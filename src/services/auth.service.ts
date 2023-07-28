import {
  BASE_URL,
  InternalAPIEndpoints,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";
class AuthService {
  contentTypeJSON: string;
  contentTypeFormData: string;
  constructor() {
    this.contentTypeJSON = "application/json";
    this.contentTypeFormData = "multipart/form-data;boundary=fjdslkfjlsj";
  }

  // passing data at backend side to validate details
  async login(requestBody) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
  }

  // passing key for reset 2 factor to validate at backend
  async keyLogin(requestBody) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
  }

  // passing OTP for validation
  async otpVerify(requestBody) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.OTP_VERIFY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
  }

  async otpEmailVerify(requestBody) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.OTP_VERIFY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
  }

  //passing ResendOTP for validation 
  async otpResend(requestBody) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.OTP_RESEND}`,
      {
        method: "POST",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
  }

// Register of new Admin
  async register(requestBody) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.ADMIN_REGISTER}`,
      {
        method: "POST",
        body: requestBody,
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return {
        isError: false,
        message: res.message,
        token: res.data,
      };
    } else {


      return { isError: true, message: res.message };
    }
  }

  // when some data is changed at user side that can be name or phone number
  async user(requestBody) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.ADMIN_USER_REGISTER}`,
      {
        method: "POST",
        body: requestBody,
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return {
        isError: false,
        message: res.message,
        token: res.data.auth_token,
      };
    } else {
      return { isError: true, message: res.message };
    }
  }

  async verificationEmail(requestBody){
    debugger
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${SubAPIEndpoints.VERIFICATION_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body:  JSON.stringify(requestBody),
    });
    
    const res = await response.json();
    
    if (response.status === 200) {
      
      return {
        isError: false,
        message: res.message,
        res
      };
    } else {
      return { isError: true, message: res.message };
    }
  }
  // Registeration of new user
  async registerUSER(requestBody) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.ADMIN_USER_REGISTER}`, {
      method: "POST",
      body: requestBody,
    });
    
    const res = await response.json();

    if (response.status === 200) {
      return {
        isError: false,
        message: res.message,
      };
    } else {
      return { isError: true, message: res.message };
    }
  }

  //when user reset its password this get resolved through this API
  async resetPassword(requestBody) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.RESET_PASSWORD}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return {
        isError: false,
        message: res.message,
      };
    } else {
      return { isError: true, message: res.message };
    }
  }

  // if user forget his password then he recieves the link on his mail to reset it
  async forgotPassword(email, companyname) {
    debugger
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.LOGIN}${SubAPIEndpoints.FORGOT_PASSWORD}?email=${email}&companyname=${companyname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": this.contentTypeJSON,
        },
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return {
        isError: false,
        message: res.message,
      };
    } else {
      return { isError: true, message: res.message };
    }
  }
}

export default new AuthService();
