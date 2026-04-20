import { ReactNode } from "react";
import { AccountProvider } from "./AccountContext";

type AccountWrapperProps = {
  children: ReactNode;
};

const AccountWrapper = ({ children }: AccountWrapperProps) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AccountWrapper;
