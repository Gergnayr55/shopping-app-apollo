import React, { ReactElement, useEffect, MouseEvent } from "react";
import { ObjectId } from "mongodb";
import "./MyDrawer.css";
import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import MyCartItem from "../MyCartItem";
import CartOverview from "../CartOverview";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../apollo-client/cache";
import { calculatedCartTotal, cartTotalItems } from "../../utils";

export interface CartItem {
  _id: ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  count: number | null;
  rate: number | null;
}
export type ProductItem = {
  category: string;
  count: number | null;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  rate: number | null;
  __typename?: string;
  _id: ObjectId;
};
export type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  handleCheckout: (e: MouseEvent<HTMLButtonElement>) => void;
};

function MyDrawer({
  visible,
  onClose,
  handleCheckout,
}: DrawerProps): ReactElement {
  const history = useHistory();
  const userCartItems = useReactiveVar(cartItemsVar);

  useEffect(() => {
    const unListen = history.listen(() => {
      if (visible) {
        onClose();
      }
    });
    return unListen;
  }, [history, onClose, visible]);

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={visible}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 375,
          boxSizing: "border-box",
          whiteSpace: "nowrap",
          height: "100%",
          boxShadow: "0px 0px 17px 1px #1d1f26",
          backgroundColor: "white",
          animation: "cart-slide 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          maxWidth: { xs: 300, sm: 500 },
          position: "absolute",
        },
      }}
    >
      {userCartItems.length === 0 ? (
        <Typography
          variant="body2"
          align="center"
          style={{
            height: "100%",
            marginTop: "40%",
          }}
        >
          No items in cart.
        </Typography>
      ) : (
        <>
          <CartOverview
            totalCart={calculatedCartTotal(userCartItems)}
            totalItems={cartTotalItems(userCartItems)}
            isCheckout={false}
            handleCheckout={handleCheckout}
          />
          <Box
            sx={{
              typography: "subtitle2",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {userCartItems &&
              userCartItems.length > 0 &&
              userCartItems.map((itm: CartItem, idx: number) => (
                <MyCartItem
                  item={itm}
                  direction="column"
                  justifyContent="space-between"
                />
              ))}
          </Box>
        </>
      )}
    </Drawer>
  );
}
export default MyDrawer;
