import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../utils";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authed = getUser() !== null;
  return authed ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
