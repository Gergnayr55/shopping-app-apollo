import { useEffect, useState, lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AccountWrapper from "./State/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUser, deleteUser } from "./utils";
import PrivateRoute from "./components/PrivateRoute";
import LoadingFallback from "./components/LoadingFallback";
import ErrorBoundary from "./components/ErrorBoundary";
import { DashboardProvider } from "./containers/Dashboard/State/DashboardContext";
import { ApolloClient, ApolloProvider, from } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client";
import { typeDefs } from "./apollo-client/typeDefs";
import { cache, cartItemsVar } from "./apollo-client/cache";
import { persistor } from "./apollo-client/persistor";
import { GET_CART_ITEMS } from "./apollo-client/queries";
import { CartItem } from "./components/MyDrawer/MyDrawer";

const Dashboard = lazy(() => import("./containers/Dashboard"));
const ItemDetail = lazy(() => import("./containers/ItemDetail"));
const Login = lazy(() => import("./containers/Login"));
const Register = lazy(() => import("./containers/Register"));
const Checkout = lazy(() => import("./containers/Checkout"));
const MyCart = lazy(() => import("./containers/MyCart"));
const OrderSuccess = lazy(() => import("./containers/OrderSuccess"));
const Orders = lazy(() => import("./containers/Orders"));
const OrderDetail = lazy(() => import("./containers/OrderDetail"));

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
      const restored = cache.readQuery<{ myCartItems: CartItem[] }>({ query: GET_CART_ITEMS });
      if (restored?.myCartItems) cartItemsVar(restored.myCartItems);
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
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <AccountWrapper>
          <DashboardProvider>
            <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
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
            </Suspense>
            </ErrorBoundary>
          </DashboardProvider>
        </AccountWrapper>
      </Router>
    </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
