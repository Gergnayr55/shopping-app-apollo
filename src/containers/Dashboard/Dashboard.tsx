import React, { ReactElement, useContext, useEffect } from "react";
import Toolbar from "../../components/Toolbar";
import { useQuery, useReactiveVar } from "@apollo/client";
import Skin from "../../components/Skin";
import MyDrawer from "../../components/MyDrawer";
import { useHistory } from "react-router-dom";
import { DashboardContext } from "./State/DashboardContext";
import "./Dashboard.css";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { cartItemsVar } from "../../apollo-client/cache";
import { GET_CART_ITEMS, GET_ITEMS } from "../../apollo-client/queries";
import { cartTotalItems } from "../../utils";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
const Dashboard = (): ReactElement => {
  const { drawerOpen, setDrawerOpen } = useContext(DashboardContext);

  const userCartItems = useReactiveVar(cartItemsVar);
  const { data: cartData } = useQuery(GET_CART_ITEMS);

  useEffect(() => {
    if (cartData && cartData.myCartItems) cartItemsVar(cartData.myCartItems);
  }, [cartData]);
  const history = useHistory();

  const { data, error, loading } = useQuery(GET_ITEMS);

  if (loading) {
    return (
      <Grid container direction="column" spacing={2}>
        <Toolbar
          total={cartTotalItems(userCartItems)}
          viewCartDrawer={() => setDrawerOpen(!drawerOpen)}
        />

        <MyDrawer
          handleCheckout={() => history.push("/checkout")}
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{ margin: "10rem 0 5rem" }}
        >
          <Grid
            direction="column"
            md={12}
            sm={12}
            xs={12}
            style={{ padding: 12, width: "calc(100vw - 25%)" }}
          >
            {[0, 0, 0, 0, 0].map((itm, idx) => (
              <React.Fragment key={`${itm}-${idx}`}>
                <Skeleton animation="pulse" height={"450px"} />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  if (error) {
    window.location.href = "/";
    return <p> Something went wrong.Please try again!</p>;
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Toolbar
        total={cartTotalItems(userCartItems)}
        viewCartDrawer={() => setDrawerOpen(!drawerOpen)}
      />

      <MyDrawer
        handleCheckout={() => history.push("/checkout")}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
        style={{ margin: "10rem 0 5rem" }}
      >
        {data &&
          data.getSkins.length > 0 &&
          data.getSkins.map((itm: CartItem, idx: number) => (
            <Grid
              key={`${itm}-${idx}`}
              direction="column"
              md={12}
              sm={12}
              xs={12}
              style={{ padding: 12, width: "calc(100vw - 25%)" }}
            >
              <Skin
                id={itm._id}
                image={itm.image}
                description={itm.description}
                category={itm.category}
                name={itm.name}
                rate={itm.rate}
                count={itm.count}
                price={itm.price}
                uri={`/skin/${itm._id}`}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};
export default Dashboard;
