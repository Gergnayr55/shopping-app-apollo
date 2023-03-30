import React from "react";
import { AccountProvider } from "./AccountContext";
import Login from "../containers/Login";
import Register from "../containers/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const AccountWrapper = (props) => {
  return (
    <AccountProvider {...props}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    </AccountProvider>
  );
};

export default AccountWrapper;
