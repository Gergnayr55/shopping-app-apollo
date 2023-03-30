import React, { useEffect } from "react";
import Dashboard from "./containers/Dashboard";
import ItemDetail from "./containers/ItemDetail";
import AccountWrapper from "./State/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getUser } from "./utils";
import PrivateRoute from "./components/PrivateRoute";
import { DashboardProvider } from "./containers/Dashboard/State/DashboardContext";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import Checkout from "./containers/Checkout";
import MyCart from "./containers/MyCart";
import OrderSuccess from "./containers/OrderSuccess";
import Orders from "./containers/Orders";
import OrderDetail from "./containers/OrderDetail";
import { typeDefs } from "./apollo-client/typeDefs";
import { cache } from "./apollo-client/cache";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const App = () => {
  const auth = getUser();
  const isAuthed = auth === null ? false : true;

  useEffect(() => {
    async function init() {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
    }

    init().catch(console.error.message);
  }, []);

  const client = new ApolloClient({
    cache,
    uri: process.env.REACT_APP_API_KEY,
    credentials: "include",
    typeDefs,
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={AccountWrapper} />
        <DashboardProvider>
          <PrivateRoute authed={isAuthed} path="/home" component={Dashboard} />
          <PrivateRoute
            authed={isAuthed}
            path="/orders/:_id"
            component={OrderDetail}
          />
          <PrivateRoute authed={isAuthed} path="/orders" component={Orders} />
          <PrivateRoute
            authed={isAuthed}
            path="/skin/:_id"
            component={ItemDetail}
          />
          <PrivateRoute authed={isAuthed} path="/my-cart" component={MyCart} />
          <PrivateRoute
            authed={isAuthed}
            path="/checkout"
            component={Checkout}
          />
          <PrivateRoute
            authed={isAuthed}
            path="/order-success/:id"
            component={OrderSuccess}
          />
        </DashboardProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
