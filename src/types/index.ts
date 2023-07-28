import { AppBarProps, TypographyProps } from "@mui/material";
import React, { CSSProperties } from "react";

//A type defining the initial values of an authentication context.
export type TInitialValues = {
  user: string | null;
  login: ({ }) => void;
  logout: () => void;
};

// An interface defining the props of a page component, including optional title and meta JSX elements and children.
export interface IPageProps {
  title?: string;
  meta?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

// An interface defining the props of a form provider component, including children, form methods, and an onSubmit function.
export interface IFormProviderProps {
  children: JSX.Element | JSX.Element[];
  methods: any;
  onSubmit: any;
}

//An interface defining the shape of login form data, including email, password, and a remember_me boolean flag.
export interface ILoginFormData {
  email: string;
  password: string;
  remember_me: boolean;
  Companyname: string;
}

//An interface defining the shape of reset password form data, including an email.
export interface IResetPasswordData {
  email: string;
  companyname: string;
}

//An interface defining the shape of one-time password form data, including an OTP code.
export interface IOtpData {
  otp: any;
  companyname: string;
}

//An interface defining the shape of role data.
export interface RoleData {
  Role: any;
}

//An interface defining the shape of company registration form data, including company name, address, city, state, country, postal code, full name, email, password, confirm password, profile picture, display name, and phone number.
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

// An interface defining the shape of reset password form data, including a new password, confirm password, and primary ID.
export interface IResetPassword {
  password: string;
  confirm_password: string;
  primaryId: string;
}
// An interface defining the shape of reset two-factor authentication form data, including an email and password.
export interface IResetFactorAuthentication {
  email: string;
  password: string;
  companyname: string;
}
// An interface defining the shape of two-factor authentication data, including a key.
export interface IKeyFactorAuthentication {
  key: string;
}

// An interface defining the shape of active plan data, including plan and quantity information.
export interface ActivePlan {
  active_plan: string;
  active_quantity: string;
  update_plan: string;
  update_quantity: string;
}

// An interface defining the shape of user registration form data, including full name, email, password, confirm password, profile picture, display name, and phone number.
export interface IRegisterUserFormData {
  full_name: string;
  user_email: string;
  password: string;
  confirm_password: string;
  avatar: any;
  display_name: string;
  phone_no: string;
}

// A type defining the shape of login user data, including name, email, and token.
export type TLoginUserData = {
  name: string;
  email: string;
  token: string;
};
// A type defining the initial state of an authentication context, including isLoading, result, error, loginUser, email, role, and token
export type TAuthInitialState = {
  isLoading: boolean;
  result: string | null;
  error: any | null;
  loginUser: TLoginUserData;
  email: string;
  role: string;
  token: string;
};
//A type defining the shape of sidebar list items, including name, path, icon, id, and optional displayDot flag.
export type TSidebarListItems = {
  name: string;
  path: string;
  icon: any;
  id: string;
  displayDot?: boolean;
};
//A type defining the props of a sidebar items component, including open state and onStateChange callback.
export type TSidebarItemsProps = {
  open: boolean;
  onStateChange: () => void;
};
// A type defining the props of a header component, including drawerState, onLogout callback, and handleDrawerState callback.
export type THeaderProps = {
  drawerState: boolean;
  onLogout: () => void;
  handleDrawerState: () => void;
};
//An interface extending the Material-UI AppBarProps interface to include an open state.
export interface MuiAppBarProps extends AppBarProps {
  open: boolean;
}
//An enum defining the size options for a logo component.
export enum ELogoSizes {
  small = "small",
  medium = "medium",
  large = "large",
}
// A type defining the props of a logo component, including size options.
export type TLogoProps = {
  [x: string]: string;
  size?: ELogoSizes;
};
//An interface defining the props of a title component, including children and TypographyProps.
export interface ITitleProps extends TypographyProps {
  children: JSX.Element | string;
}
//A type defining the props of a page container component, including optional title and subtitle JSX elements, children, and optional ID and styling.
export type TPageContainerProps = {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  sx?: CSSProperties;
  secondary?: JSX.Element;
  children: JSX.Element;
  id?: string;
};
// An interface defining the props of a tab panel component, including children, index, and value.
export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
//An interface defining the props of a payment component, including plan, coupon, and userCount
export interface IPaymentProps {
  plan: string;
  coupon: string;
  userCount: string;
}
