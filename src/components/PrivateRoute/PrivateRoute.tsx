import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  authed: boolean;
  children: ReactNode;
};

const PrivateRoute = ({ authed, children }: PrivateRouteProps) => {
  return authed ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
