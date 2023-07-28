import { ILoginFormData } from '../../types'
import { IResetPasswordData } from '../../types'
import { IKeyFactorAuthentication } from "../../types";
import { IOtpData } from '../../types'
import { IResetFactorAuthentication } from "../../types";

export const defaultValuesLogin: ILoginFormData = {
    email: '',
    password: '',
    remember_me: false,
    Companyname: '',
  }

export const defaultValuesPassword: IResetPasswordData = {
    email: '',
    companyname: '',
  }

export const defaultValuesKey: IKeyFactorAuthentication = {
    key: "",
};

export   const defaultValuesOtp: IOtpData = {
    otp: '',
    companyname: '',
  }

export   const defaultValuesReset: IResetFactorAuthentication = {
    email: "",
    password: "",
    companyname: "",
  };