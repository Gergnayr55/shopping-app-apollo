import React, { useEffect, useState } from "react";
import Dashboard from "./containers/Dashboard";
import ItemDetail from "./containers/ItemDetail";
import AccountWrapper from "./State/index";
import Login from "./containers/Login";
import Register from "./containers/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUser, deleteUser } from "./utils";
import PrivateRoute from "./components/PrivateRoute";
import { DashboardProvider } from "./containers/Dashboard/State/DashboardContext";
import { ApolloClient, ApolloProvider, from } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client";
import Checkout from "./containers/Checkout";
import MyCart from "./containers/MyCart";
import OrderSuccess from "./containers/OrderSuccess";
import Orders from "./containers/Orders";
import OrderDetail from "./containers/OrderDetail";
import { typeDefs } from "./apollo-client/typeDefs";
import { cache } from "./apollo-client/cache";
import { persistor } from "./apollo-client/persistor";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.some(e => e.extensions?.code === 'UNAUTHENTICATED')) {
    deleteUser();
    window.location.href = '/';
  }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_KEY,
  credentials: 'include',
});

const App = () => {
  const auth = getUser();
  const isAuthed = auth === null ? false : true;
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    async function init() {
      await persistor.restore();
      setClient(
        new ApolloClient({
          cache,
          link: from([errorLink, httpLink]),
          typeDefs,
        })
      );
    }
    init().catch(console.error);
  }, []);

  if (!client) return null;

  return (
    <ApolloProvider client={client}>
      <Router>
        <AccountWrapper>
          <DashboardProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders/:_id"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <OrderDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/skin/:_id"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <ItemDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-cart"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <MyCart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order-success/:id"
                element={
                  <PrivateRoute authed={isAuthed}>
                    <OrderSuccess />
                  </PrivateRoute>
                }
              />
            </Routes>
          </DashboardProvider>
        </AccountWrapper>
      </Router>
    </ApolloProvider>
  );
};

export default App;
