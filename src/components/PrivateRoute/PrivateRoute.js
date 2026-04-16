import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authed, children }) => {
  return authed ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
