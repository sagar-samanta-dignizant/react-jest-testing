
import {
  BASE_URL,
  InternalAPIEndpoints,
  MODEL_BASE_URL,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";

class ModalService {
  contentTypeJSON: string;
  token: string;
  user: any;
  contentTypeFormData: string;

  constructor() {
    this.contentTypeJSON = "application/json";
    this.contentTypeFormData = "multipart/form-data;boundary=fjdslkfjlsj";
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  // gets model list overall details
  async getModalList(search?: string) {
    let url = `${BASE_URL}${InternalAPIEndpoints.MODAL}${SubAPIEndpoints.LIST}`;
    if (search) {
      url = `${BASE_URL}${InternalAPIEndpoints.MODAL}${SubAPIEndpoints.LIST}?search=${search}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res.data;
    } 
    if(response.status === 401){
      localStorage.clear()
    }
    else {
      return [];
    }
  }

  //The code is defining an asynchronous function called getModalDetails that takes in four optional parameters: page, limit, order, and sort
  async getModalDetails(
    page?: number,
    limit?: number,
    order?: number,
    sort?: string
  ) {
 
    let url = `${MODEL_BASE_URL}${InternalAPIEndpoints.COUNT_MODEL}${SubAPIEndpoints.MODEL_LIST}?page=${page}&limit=${limit} `;
    if (sort !== "") {
      url = `${url}&sort=${sort}&order=${order}`;
    }
    
    const response = await fetch(url , {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res.data;
    } 
    if(response.status === 401){
      localStorage.clear()
      window.location.reload();
      return null;
    }
  }
}


export default new ModalService();
