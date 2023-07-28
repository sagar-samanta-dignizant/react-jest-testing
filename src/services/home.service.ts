import {
  BASE_URL,
  InternalAPIEndpoints,
  MODEL_BASE_URL,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";


class HomeService {
  contentTypeJSON: string; 
  token: string;
  user: any;
  constructor() {
    this.contentTypeJSON = "application/json";
    
  }
//get dashboard data of users
  async getDashboardInitialData() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.HOME}`, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });   
    if (response.status === 200) {
      const res = await response.json();
      localStorage.setItem("adminTask", res.data.listAdminTask?.length);
      window.dispatchEvent(
        new CustomEvent("notification", {
          detail: !!res.data.listAdminTask?.length,
        })
      );
      return res.data;
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
  }

  //get data of model 
  async getModelCountData()  {
    const response = await fetch(`${MODEL_BASE_URL}${InternalAPIEndpoints.COUNT_MODEL}`, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    if (response.status === 200) { 
      const res = await response.json();
      return res?.data ?? 0;
    } 
    if(response.status === 401){
      localStorage.clear()
    }
      return 0;
  }

  //gets the task of users on dashboard page
  async getUsersTaskList(page?: number, limit?: number) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.HOME}${SubAPIEndpoints.ADMIN_USER_TASK}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      return res.data;
    } 
    if(response.status === 401){
      localStorage.clear()
    }
      return [];
  }
  //it gets admin task lists for dashboard
  async getAdminTaskList(page?: number, limit?: number) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.HOME}${SubAPIEndpoints.ADMIN_TASK}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      return res.data;
    }
    if(response.status === 401){
      localStorage.clear()
    }
      return [];
  }

  //it gives tasklist for dashboard page
  async getLogTaskList(page?: number, limit?: number) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.HOME}${SubAPIEndpoints.ADMIN_LOG}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      return res.data;
    }
    if(response.status === 401){
      localStorage.clear()
    }
      return [];
  }

  // on approve only user will be added on panel
  async approveEmail(requestBody) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.HOME}${SubAPIEndpoints.ADMINS_APPROVAL}`, {
      method: "PUT",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    } 
    if(response.status === 401){
      localStorage.clear()
    }
      return [];
  }
}
export default new HomeService();