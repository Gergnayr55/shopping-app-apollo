import React, { ReactElement } from "react";
import CustomButton from "../../components/CustomButton";
import { Typography, Grid, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
import BackButton from "../../components/BackButton";
import MyCartItem from "../../components/MyCartItem";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../apollo-client/cache";

export default function MyCart(): ReactElement {
  const history = useHistory();
  const userCartItems = useReactiveVar(cartItemsVar);
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="row" alignItems="center" m={"2.5%"}>
        <BackButton title="Go Back" onClick={() => history.goBack()} />
        <Typography
          sx={{ margin: "0 auto" }}
          variant="h4"
          align="center"
          color="initial"
        >
          My Cart
        </Typography>
        <CustomButton
          onClick={() => history.push("/checkout")}
          style={{ width: "250px" }}
          text="Go to checkout"
        />
      </Stack>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        m={"0 auto"}
        sx={{ width: { xs: "375px", md: "800px" } }}
      >
        {userCartItems.map((itm: CartItem, idx: number) => (
          <React.Fragment key={`${itm}-${idx}`}>
            <MyCartItem
              item={itm}
              direction="row"
              justifyContent="space-between"
            />
          </React.Fragment>
        ))}
      </Stack>
    </Grid>
  );
}
