import {
  BASE_URL,
  InternalAPIEndpoints,
  SubAPIEndpoints,
} from "../config/api.config";
import { getAuthToken } from "../hooks/commonFunction";

// this page conatins API which is used in all payment services
class PaymentService {
  contentTypeJSON: string;
  token: string;

  constructor() {
    this.contentTypeJSON = "application/json";
  }

  //when at the begins user initiate the payment this API is used
  async initiatePayment(token, data) {
    debugger
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: token,
      },
      body: JSON.stringify(data)
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

  //if someone buyies the subscription from inside it navigates user to payment gateway.
  async freeUserPayment(token, data) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.SUBSCRIPTION}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: token,
      },
      body: JSON.stringify(data)
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

  //if someone tries to upgrad the subscription this API is called.
  async upgradeSubscription(data) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}${SubAPIEndpoints.UPGRADE_DOWNGRADE_SUBSCRIPTIONS}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();
   
    if (response.status === 200) {
      let userData: any = res.data;
      return { isError: false, userData, message: res.message };
    }
    if(response.status === 401){
      localStorage.clear()
    }
    else {
      return { isError: true, message: "Error" };
    }
  }

  //if someone tries to cancel the subscription this API is called.
  async cancelSubscription() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}${SubAPIEndpoints.CANCEL_SUBCRIPTION}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify([])
    });
    if (response.status === 200) {
      const res = await response.json();
      let userData: any = res.data;
      return { isError: false, userData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
    }
    else {
      return { isError: true, message: "Error" };
    }
  }

//After cancellation of subscription if user tries reactivate the subscription this API is called
  async cancelReactive() {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}${SubAPIEndpoints.REACTIVATING_CANCELED_SUBSCRIPTIONS}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: getAuthToken(),
      },
      body: JSON.stringify([])
    });
    const res = await response.json();
    if (response.status === 200) {
      let userData: any = res.data;
      return { isError: false, userData, message: res.message };
    } 
    if(response.status === 401){
      localStorage.clear()
    }
    else {
      return { isError: true, message: res.message };
    }
  }

  //if someone tries to verify the coupon for payment whether it is valid or not this API verifies it
  async verifyCoupon(token, data) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}${SubAPIEndpoints.COUPON}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: token,
      },
      body: JSON.stringify(data)
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

  // when the payment is successfull this API gets called if paid user upgrade the plan
  async successPayment({ token, sessionID ,type}) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.PAYMENT}${SubAPIEndpoints.SUCCESS_PAYMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: token,
      },
      body: JSON.stringify({
        sessionID,
        type
      })
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

// when the payment is successfull this API gets called if free user upgrade the plan
  async successPaymentFree({ token, sessionID ,type}) {
    const response = await fetch(`${BASE_URL}${InternalAPIEndpoints.SUBSCRIPTION}${SubAPIEndpoints.SUCCESS_PAYMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": this.contentTypeJSON,
        Authorization: token,
      },
      body: JSON.stringify({
        sessionID,
        type
      })
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
}



export default new PaymentService();
