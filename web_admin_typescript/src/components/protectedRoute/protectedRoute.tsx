import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext/authContext";
import LoginPage from "../pages/auth/loginPage/LoginPage";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user?.user_name ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;
