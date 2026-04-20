import { ReactElement, useContext, useEffect } from "react";
import Toolbar from "../../components/Toolbar";
import { useQuery, useReactiveVar } from "@apollo/client";
import Skin from "../../components/Skin";
import MyDrawer from "../../components/MyDrawer";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "./State/DashboardContext";
import "./Dashboard.css";
import Grid2 from "@mui/material/Grid2";
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
  const navigate = useNavigate();

  const { data, error, loading } = useQuery(GET_ITEMS);

  if (loading) {
    return (
      <Grid2 container direction="column" spacing={2}>
        <Toolbar
          total={cartTotalItems(userCartItems)}
          viewCartDrawer={() => setDrawerOpen(!drawerOpen)}
        />

        <MyDrawer
          handleCheckout={() => navigate("/checkout")}
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <Grid2
          container
          direction="column"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{ margin: "10rem 0 5rem" }}
        >
          <Grid2
            direction="column"
            size={{ xs: 12, sm: 12, md: 12 }}
            style={{ padding: 12, width: "calc(100vw - 25%)" }}
          >
            {[0, 0, 0, 0, 0].map((itm, idx) => (
              <Skeleton key={`${itm}-${idx}`} animation="pulse" height={"450px"} />
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    );
  }
  if (error) {
    window.location.href = "/";
    return <p> Something went wrong.Please try again!</p>;
  }

  return (
    <Grid2 container direction="column" spacing={2}>
      <Toolbar
        total={cartTotalItems(userCartItems)}
        viewCartDrawer={() => setDrawerOpen(!drawerOpen)}
      />

      <MyDrawer
        handleCheckout={() => navigate("/checkout")}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <Grid2
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
            <Grid2
              key={`${itm}-${idx}`}
              direction="column"
              size={{ xs: 12, sm: 12, md: 12 }}
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
            </Grid2>
          ))}
      </Grid2>
    </Grid2>
  );
};
export default Dashboard;
