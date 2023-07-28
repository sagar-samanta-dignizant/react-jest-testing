import { AppBarProps, TypographyProps } from "@mui/material";
import React, { CSSProperties } from "react";

//A type that defines the initial values for a form that contains user, login, and logout data.
export type TInitialValues = {
  user: string | null;
  login: ({}) => void;
  logout: () => void;
};

//An interface that defines props for a page, including title, meta, and children.
export interface IPageProps {
  title?: string;
  meta?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

// An interface that defines props for a form provider, including children, methods, and onSubmit.
export interface IFormProviderProps {
  children: JSX.Element | JSX.Element[];
  methods: any;
  onSubmit: any;
}
// An interface that defines form data for a login form, including email, password, and remember_me.
export interface ILoginFormData {
  email: string;
  password: string;
  remember_me: boolean;
}
// An interface that defines form data for a reset password form, including email.
export interface IResetPasswordData {
  email: string;
}
// An interface that defines form data for an OTP (one-time password) form, including otp.
export interface IOtpData {
  otp: any;
}
//An interface that defines form data for a company registration form, including companyname, company_address_1, company_address_2, company_state, company_city, company_country, company_postal_code, full_name, user_email, password, confirm_password, profile, avatar, display_name, and phone_no.
export interface IRegisterCompanyFormData {
  companyname: string;
  company_address_1: string;
  company_address_2?: string;
  company_state: string;
  company_city: string;
  company_country: string;
  company_postal_code: string;
  full_name: string;
  user_email: string;
  password: string;
  confirm_password: string;
  profile: any;
  avatar: any;
  display_name: string;
  phone_no: string;
}
// An interface that defines form data for a reset password form, including password, confirm_password, and primaryId.
export interface IResetPassword {
  password: string;
  confirm_password: string;
  primaryId: string;
}
//An interface that defines form data for a reset factor authentication form, including email, password, and confirm_password.
export interface IResetFactorAuthentication {
  email: string;
  password: string;
  confirm_password: string;
}

//An interface that defines form data for a user registration form, including full_name, user_email, password, confirm_password, avatar, display_name, and phone_no.
export interface IRegisterUserFormData {
  full_name: string;
  user_email: string;
  password: string;
  confirm_password: string;
  avatar: any;
  display_name: string;
  phone_no: string;
}

//A type that defines login user data, including name, email, and token.
export type TLoginUserData = {
  name: string;
  email: string;
  token: string;
};

//A type that defines the initial state of the authentication process, including isLoading, result, error, loginUser, email, role, and token.
export type TAuthInitialState = {
  isLoading: boolean;
  result: string | null;
  error: any | null;
  loginUser: TLoginUserData;
  email: string;
  role: string;
  token: string;
};

// A type that defines the sidebar list items, including name, path, icon, id, and displayDot.
export type TSidebarListItems = {
  name: string;
  path: string;
  icon: any;
  id: string;
  displayDot?: boolean;
};
// A type that defines the props for the sidebar items, including open and onStateChange.
export type TSidebarItemsProps = {
  open: boolean;
  onStateChange: () => void;
};
//A type that defines the props for the header, including drawerState, onLogout, and handleDrawerState
export type THeaderProps = {
  drawerState: boolean;
  onLogout: () => void;
  handleDrawerState: () => void;
};
// An interface that extends the AppBarProps from the Material UI library and includes an additional open prop.
export interface MuiAppBarProps extends AppBarProps {
  open: boolean;
}
// An enum that defines the sizes for a logo, including small, medium, and large.
export enum ELogoSizes {
  small = "small",
  medium = "medium",
  large = "large",
}
//A type that defines the props for a logo, including size.
export type TLogoProps = {
  [x: string]: string | ELogoSizes | undefined;
  size?: ELogoSizes;
};
//An interface that defines the props for a title, including children.
export interface ITitleProps extends TypographyProps {
  children: JSX.Element | string;
}
//A type that defines the props for a page container, including title, sx, secondary, children, and id.
export type TPageContainerProps = {
  title?: string | JSX.Element;
  sx?: CSSProperties;
  secondary?: JSX.Element;
  children: JSX.Element;
  id?: string;
};
//An interface that defines the props for a tab panel, including children, index, and value.
export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
// An interface that defines the props for a payment component, including plan and coupon.
export interface IPaymentProps {
  plan: string;
  coupon: string;
}
