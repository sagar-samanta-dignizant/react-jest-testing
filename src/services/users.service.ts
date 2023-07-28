import {
  BASE_URL,
  InternalAPIEndpoints,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";

//TypeScript code for a UserService class that handles API calls for user-related functionality
class UserService {
  contentTypeJSON: string;
  token: string;
  user: any;

  constructor() {
    this.contentTypeJSON = "application/json";
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  //getUsersList that returns a Promise with the result of fetching a list of users from an API. The function takes in several optional parameters, including search, page, limit, order, and sort.
  async getUsersList(
    search?: string,
    page?: number,
    limit?: number,
    order?: number,
    sort?: string
  ) {
    let url = `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}${SubAPIEndpoints.LIST}?page=${page}&limit=${limit}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    if (sort !== "") {
      url = `${url}&sort=${sort}&order=${order}`;
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
    if (response.status === 401) {
      localStorage.clear()
      window.location.reload();
    }
    else {
      return [];
    }
  }

  //The function sends a GET request to a URL constructed using the BASE_URL and InternalAPIEndpoints.CUSTOMERUSER constants and the id parameter, if provided.
  async resetPassword(id?: string) {
    let url = `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}${SubAPIEndpoints.SEND_LINK_RESET_PASSWORD}/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      // const res = await response.json();
      return res;
    }
    if (response.status === 401) {
      localStorage.clear()
    }
    else {
      return { isError: false, message: res.message };;
    }
  }

  //The function sends an HTTP POST request to a specific endpoint (SubAPIEndpoints.ADDUSER) with the JSON stringified requestBody object in the body of the request. It also includes an authorization header with a token obtained from the getAuthToken() function.
  async addUsers(requestBody) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}${SubAPIEndpoints.ADD_ADMIN_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify(requestBody),
    });
    const res = await response.json();
    if (response.status === 200) {
      return { isError: false, message: res.message };
    }
    if (response.status === 401) {
      localStorage.clear()
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  // this function is used to create a password for a user's . 
  async addPassword(customer_id, password, approveEmail) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}${SubAPIEndpoints.CREATE_HEADSETKEY}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify({ customer_id, password, approveEmail }),
    });
    const res = await response.json();
    if (response.status === 200) {
      return { isError: false, message: res.message };
    }
    if (response.status === 401) {
      localStorage.clear()
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //editUsers() seems to be used for editing a user's information based on the provided requestBody and userId. It makes a PUT request to the API endpoint for editing a user's information, and passes.
  async editUsers(requestBody, userId?: any) {
    debugger
    console.log(requestBody)
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
      return { isError: false, message: res.message };
    }
    if (response.status === 401) {
      localStorage.clear()
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //The application is interacting with user data in some way, and provides methods for retrieving, adding, editing, and deleting users.
  async deleteUsers(userId: any) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": this.contentTypeJSON,
          Authorization: getAuthToken(),
        },
        body: JSON.stringify({ is_delete: true }),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      return { isError: false, message: res.message };
    }
    if (response.status === 401) {
      localStorage.clear()
    }
    else {
      return { isError: true, message: res.message };
    }
  }

 async sendMailVerificationEmail() {
  const response = await fetch(
    `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${SubAPIEndpoints.SEND_MAIL_VERIFICATION_EMAIL}`,
    {
      method: "GET",
      headers: {
        Authorization: getAuthToken(),
      },
    }
  );
  const res = await response.json();
  if (response.status === 200) {
    // const res = await response.json();
    return res;
  }
  if (response.status === 401) {
    localStorage.clear()
  }
  else {
    return { isError: false, message: res.message };;
  }
 }
  //The application is interacting with user data and provides profile Image users.
  async getUserProfileImage(userId: any) {
    const response = await fetch(
      `${BASE_URL}${InternalAPIEndpoints.ADMIN_USER}/${userId}?type=user`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    const res = await response.body.getReader();
    if (response.status === 200) {
      const reader = res
      const stream = new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              return pump();
            });
          }
        }
      })
      const responseStream = new Response(stream)
      const responseBlob = await responseStream.blob();
      const imageUrl = URL.createObjectURL(responseBlob);
      return { isError: false, message: imageUrl };
    } else {
      return { isError: true, message: "Image not found" };
    }
  }
}

export default new UserService();
