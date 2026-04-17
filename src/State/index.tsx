import React from "react";
import { AccountProvider } from "./AccountContext";

type AccountWrapperProps = {
  children: React.ReactNode;
};

const AccountWrapper = ({ children }: AccountWrapperProps) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AccountWrapper;
