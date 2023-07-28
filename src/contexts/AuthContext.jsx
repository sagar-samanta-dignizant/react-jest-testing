import { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import authService from "../services/auth.service";
import settingsService from "../services/settings.service";
import toast, { useToaster } from "react-hot-toast/headless";
import { singleHash } from "../sections/auth/register_company/Encrypt&Decrypt";

//This is a functional component called AuthToast that displays toast messages using the useToaster hook. It renders a <div> container that is absolutely positioned and centered on the screen using CSS.
const AuthToast = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
    style={{
      position: "absolute",
      left: "42%",
      bottom: "40%",
      
      transform: "translate(-50%,-50%)",
    }}
    onMouseEnter={startPause}
    onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          margin: 8,
        });
        const ref = (el) => {
          if (el && typeof toast.height !== "number") {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };

        return (
          <div
          key={toast.id}
          ref={ref}
          style={{
            position: "absolute",
            width: "200px",
            border: "1px solid #fff",
              boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              color: "#f50a0a",
              textAlign: "center",
              borderRadius: 10,
              transition: "all 0.5s ease-out",
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
              padding: 5,
            }}
            >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

//initialValues object is meant to hold initial values for a context related to user authentication.
const initialValues = {
  
  user: null,
  
  login: function ({ }) {
    throw new Error("Function not implemented.");
  },
  logout: function () {
    throw new Error("Function not implemented.");
  },
};


export const AuthContext = createContext(initialValues);
//This code exports a React component called AuthProvider which serves as a provider for an authentication context in a React application.
export function AuthProvider({ children }) {
  const [persistedLocalStorageData, setPersistedLocalStorageData] =
    useLocalStorage("user",null);

  const [user, setUser] = useState({auth_token: '',
    role: '',
    model_password: '',
  });

  const navigate = useNavigate();


  // this api checks login details and if correct navigate to otp
  const handleUserDetails = (res) => {
   debugger
    if (res.data.redirectUrl) {
      localStorage.setItem(
        "verification_details",
        JSON.stringify({
          login_company_id: res.data.companyId,
          login_user_id: res.data._id,
          ...res.data
        })
      );

      navigate("/otp", { replace: true });
    } else {
      debugger
      setUser({ ...res.data});
      setPersistedLocalStorageData(res.data);
      // getProfile(res.data);
    }
  };

  const handleUserDetail = (res) => {
    localStorage.setItem(
      "verification_details",
      JSON.stringify({
        login_company_id: res.data.companyId._id,
        login_user_id: res.data._id,
        ...res.data
      })
    );
    navigate("/formKey", { replace: true });
  };

  // when admin or user logout local storge is clear & user gets logout
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  //It uses the useState, useMemo, and useNavigate hooks to manage the user's authentication state and navigate to different pages in the application
  const login = async (ctx) => {
    debugger
    let company_name;
    const firstFiveLettersOfPassword = ctx.password.slice(0, 5);
    const hashedWithFirstFiveLetters = ctx.password + firstFiveLettersOfPassword;
    const model_password = singleHash(hashedWithFirstFiveLetters);
    const hashedPassword = singleHash(ctx.password);
    if(ctx.Companyname){
      company_name = singleHash(ctx.Companyname)
   }
    const response = await authService.login({
      email: ctx.email,
      password: hashedPassword,
      companyname: company_name,
      model_password: model_password
    });

    const res = await response.json();
    console.log(res);
    if (response.status === 200) {
      handleUserDetails(res);
      
    } else toast.error(res.message);
  };

// if user want to reset-2-factor at admin side
  const keyLogin = async (ctx) => {
    debugger
    let company_name;
    const firstFiveLettersOfPassword = ctx.password.slice(0, 5);
    const hashedWithFirstFiveLetters = ctx.password + firstFiveLettersOfPassword;
    const model_password = singleHash(hashedWithFirstFiveLetters);
    const hashedPassword = singleHash(ctx.password);
    if(ctx.companyname){
       company_name = singleHash(ctx.companyname)
    }
    const response = await authService.keyLogin({
      email: ctx.email,
      password: hashedPassword,
      companyname: company_name,
      model_password: model_password
    });
   
    const res = await response.json();
    if (response.status === 200) {
      handleUserDetail(res);
    } 
    if(response.status === 401){
      localStorage.clear();
    }
    else {
      toast.error(res.message)
    };
  };


  // otp verfication api
  const otpVerify = async (otp) => {
    debugger
    const user = JSON.parse(localStorage.getItem("verification_details"));
    console.log(user)
    const response = await authService.otpVerify({
      otp: otp,
      ...user,
    });
    const res = await response.json();
    if (response.status === 200) {
      handleUserDetails(res);
    } else toast.error(res.message);
  };



  // resend otp api
  const resendOTP = async () => {
    const user = JSON.parse(localStorage.getItem("verification_details"));
    
    const response = await authService.otpResend({
      ...user,
    });
    const res = await response.json();
    if (response.status === 200) {
      setUser(res.data);
      setPersistedLocalStorageData(res.data);
      getProfile(res.data);
    } else toast.error(res.message);
  };

  // it sets profile image of user & admin locally
  const getProfile = async (userData) => {
    const data = await settingsService.getProfile(
      userData.companyId._id,
      "company"
    );
    const userProfile = await settingsService.getProfile(userData._id, "user");
    localStorage.setItem("companyImage", data);
    localStorage.setItem("userImage", userProfile);
  };

  //useMemo is a hook in React that is used to optimize performance by memoizing the result of a function call
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      otpVerify,
      resendOTP,
      keyLogin,
    
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      <AuthToast />

      {children}
    </AuthContext.Provider>
  );
}
