import React from "react";
import login from "../../../../assets/images/login.png";
import LoginTop from "../../../shared/loginTob/LoginTop";
import LoginForm from "./loginForm/LoginForm";
import LoginImage from "./loginImage/LoginImage";
import AeonixLogo from "../../../shared/aeonixLogo/AeonixLogo";

const LoginPage = () => {
  return (
    <div className="font-[sans-serif] text-[#333]">
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-20"
      >
        <div className="blur-[86px] h-12 bg-gradient-to-br from-green-300 to-green-400 "></div>
        <div className="blur-[86px] h-20 bg-gradient-to-r from-green-200 to-green-600 "></div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center md:py-6 md:px-10">
        <div className="grid md:grid-cols-2 items-center gap-4 md:max-w-6xl w-full">
          <div className="md:border bg-white md:border-gray-300 rounded-md pt-6 px-6 max-w-md md:shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <LoginForm />
            <AeonixLogo />
          </div>
          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
