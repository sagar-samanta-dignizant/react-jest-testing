import {
  BASE_URL,
  InternalAPIEndpoints,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";
class SettingsService {
  contentTypeJSON: string;
  token: string;
  user: any;
  contentTypeFormData: string;

  constructor() {
    this.contentTypeJSON = "application/json";
    this.contentTypeFormData = "multipart/form-data;boundary=fjdslkfjlsj";
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  //collects user data & sends to database
  async editUser(requestBody, userId?: any) {
    debugger
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/update-info`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      let userData: any = JSON.parse(localStorage.getItem("user"));
      userData.full_name = res.data.full_name;
      userData.email = res.data.email;
      userData.email = res.data.mobile_no;

      localStorage.setItem("user", JSON.stringify(userData));
      return { isError: false, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //when user updates password it is updated in database too.
  async changePassword(requestBody, id) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return { isError: false, message: res.message };
    } 
    if(response.status === 401)
    {
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //user has edited company details it gets update in database through this API
  async editCompanyDetails(requestBody) {
    debugger
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.FIRM}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      let companyData: any = res.data;
      return { isError: false, companyData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  // These functions are responsible for making API calls to toggle the two-factor authentication settings for admin and user respectively
  async editTwoFactorAdmin(requestBody) {
    debugger
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.FIRM}${SubAPIEndpoints.TWO_FACTOR_ADMIN}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      let companyData: any = res.data;
      return { isError: false, companyData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }
  
  //These functions are responsible for making API calls to Approve Subscription.
  async approveSubcription(requestBody) {
    const response = await fetch(
    `${BASE_URL}${SubAPIEndpoints.UPGRADE_DOWNGRADE_SUBSCRIPTIONS}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      let companyData: any = res.data;
      return { isError: false, companyData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }

    else {
      return { isError: true, message: res.message };
    }
  }

  //Inside Admin  panel if admin dont want 2 factor authentication he can change with this API
  async editTwoFactorUser(requestBody) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.FIRM}${SubAPIEndpoints.TWO_FACTOR_USER}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(requestBody),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      let companyData: any = res.data;
      return { isError: false, companyData, message: res.message };
    }
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  // This Api is called to retrieve company details
  async getCompany() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.FIRM}`, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      let companyData: any = res.data;
      return { isError: false, companyData, message: res.message };
    } 
    if(response.status === 401)
    {
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {  
      return { isError: true, message: res.message };
    }
  }

  // This API is used to retrieve Admin Profile picture

  // This API is called to get user details
  async getOwnDetails() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.ADMIN}`, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      let userData: any = res.data;
      return { isError: false, userData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  // This API is used to get Payment of Admin details like date plan users.
  async paymentDetailAdmin() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}`, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      let userData: any = res.data;
      return { isError: false, userData, message: res.message };
    }
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  // If admin wants to change company or want to change some other fields like address or phone number
  async editCompanyProfile(requestBody) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.FIRM}`, {
      method: "PUT",
      headers: {
        "Content-Type": this.contentTypeFormData,
        Authorization: getAuthToken(),
      },
      body: requestBody,
    });
    const res = await response.json();
    if (response.status === 200) {
      let userData: any = JSON.parse(localStorage.getItem("file"));
      userData.file = res.data.file;

      localStorage.setItem("user", JSON.stringify(userData));
      return { isError: false, message: res.message };
    }
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //If admin wants to change profile Picture for that 
  async editAdminProfile(requestBody, userId?: any) {
    debugger
    console.log(requestBody);
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/customer-profile/update`,
      {
        method: "PUT",
        headers: {
          Authorization: getAuthToken(),
        },
        body: requestBody,
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      debugger
      return { isError: false,dataI:res, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  async updateAdminProfile(requestBody) {
    debugger
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.FIRM}/firm-profile-update`,
      {
        method: "PUT",
        headers: {
          Authorization: getAuthToken(),
        },
        body: requestBody,
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return { isError: false, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //get profile picture converts into right format using blob and then showing on screen
  async getProfile(companyId, type) {
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${companyId}?type=${type}`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  } 

  //get profile picture converts into right format using blob and then showing on screen
  async getAdminPicture(companyId, type) {
    debugger
    return fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${companyId}?type=${type}`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  } 
}

export default new SettingsService();
