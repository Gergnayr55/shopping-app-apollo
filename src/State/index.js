import React from "react";
import { AccountProvider } from "./AccountContext";

const AccountWrapper = ({ children }) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AccountWrapper;
