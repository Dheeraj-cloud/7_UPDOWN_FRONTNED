// RequireLogin.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireLogin = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // If user is logged in, allow access to the children components
  return children;
};

export default RequireLogin;
