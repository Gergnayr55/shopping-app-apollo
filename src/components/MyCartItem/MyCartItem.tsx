import React, { ReactElement, MouseEvent } from "react";
import { Typography, Divider, Stack, Button } from "@mui/material";
import { handleType, moneyFormatter } from "../../utils";

import { useHistory } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem } from "../MyDrawer/MyDrawer";
import { useMutation, useReactiveVar } from "@apollo/client";
import { TOGGLE_CART } from "../../apollo-client/mutations";
import { cartItemsVar } from "../../apollo-client/cache";
import { GET_CART_ITEMS } from "../../apollo-client/queries";

type DirectionType = "row" | "column";
interface MyCartItemProps {
  direction: DirectionType;
  justifyContent: string;
  item: CartItem;
  readOnly?: boolean;
}

export default function MyCartItem({
  direction,
  justifyContent,
  item,
  readOnly = false,
}: MyCartItemProps): ReactElement {
  const history = useHistory();
  const iconStyle = {
    fontSize: { xs: "14px", md: "24px" },
    "&:hover": { cursor: "pointer" },
  };
  const userCartItems = useReactiveVar(cartItemsVar);
  console.log("userCartItems");
  console.log(userCartItems);

  const [mutate, { loading, error }] = useMutation(TOGGLE_CART);

  // TODO: Combine this with handleCart function as will now be the same
  const handleMultiItm = async (itm: CartItem, type: string): Promise<void> => {
    const result = await mutate({
      variables: { cartItem: itm, type },
      update(cache, { data: { addOrRemoveFromCart } }) {
        const qryResult: { myCartItems: CartItem[] } | null = cache.readQuery({
          query: GET_CART_ITEMS,
        });
        const cartItems: Array<CartItem> =
          (qryResult && qryResult.myCartItems && qryResult.myCartItems) || [];
        const existingCartItemId = cache.identify({
          __typename: "CartItem",
          _id: itm._id,
        });
        const existingCartItem = cartItems?.find(
          (item: CartItem) => item._id === itm._id
        );

        const newQty = handleType(type, existingCartItem?.quantity || 0);
        if (!existingCartItem) {
          const newCartItem = {
            ...itm,
            __typename: "CartItem",
            quantity: 1,
          };
          // Write new cartItem to the cache
          cache.writeQuery({
            query: GET_CART_ITEMS,
            data: {
              myCartItems: [...cartItems, newCartItem],
            },
          });

          // Update the reactive variable with the new data
          cartItemsVar([...cartItems, newCartItem]);
        } else {
          if (newQty === 0) {
            // If the new quantity value is 0, remove the cartItem from the cache
            cache.evict({ id: existingCartItemId });
          } else {
            cache.modify({
              id: existingCartItemId,
              fields: {
                quantity(existingQuantity) {
                  return handleType(type, existingQuantity);
                },
              },
            });
          }
          // read updated query from cache and save to reactive var
          const newQry: { myCartItems: CartItem[] } = cache.readQuery({
            query: GET_CART_ITEMS,
          }) || { myCartItems: [] };
          cartItemsVar(newQry.myCartItems);
        }
        cache.gc();
      },
    });
  };
  return (
    <Stack
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent={justifyContent}
      sx={{ width: "100%" }}
    >
      <Button
        variant="text"
        color="inherit"
        disableRipple={direction === "row"}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          margin: "10px 50px",
          textTransform: "capitalize",
          justifyContent: "space-evenly",
          minWidth: { xs: "fit-content", sm: "350px" },
          width: "100%",
          maxWidth: { xs: "fit-content", sm: "450px", md: "800px" },
          "&:hover": {
            backgroundColor:
              direction === "column" ? "rgb(245, 245, 245)" : "inherit",
            cursor: direction === "column" ? "pointer" : "default",
          },
        }}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (direction === "column") {
            history.push(`/skin/${item._id}`);
          } else {
            return undefined;
          }
        }}
      >
        <img
          style={{
            width: "65px",
            height: "65px",
            mixBlendMode: "darken",
            imageRendering: "-webkit-optimize-contrast",
          }}
          src={item.image}
          alt="itm-img"
        />
        <Stack
          spacing={2}
          alignItems="center"
          mt="15px"
          ml="25px"
          sx={{
            minWidth: {
              xs: readOnly ? "fit-content" : "min-content",
              sm: "250px",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              maxWidth: "250px",
              whiteSpace: "break-spaces",
              fontSize: { xs: "12px", md: "initial" },
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "12px", md: "initial" } }}
          >
            {moneyFormatter.format(item.price * item.quantity)}
          </Typography>
          {readOnly && (
            <Typography sx={{ fontSize: { xs: "12px", md: "inherit" } }}>
              Qty: {item.quantity}
            </Typography>
          )}
        </Stack>
      </Button>
      {!readOnly && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mt="15px !important"
        >
          <Button
            variant="text"
            color="inherit"
            startIcon={<DeleteOutlineIcon />}
            onClick={async () => await handleMultiItm(item, "REMOVE")}
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "11px", md: "14px" },
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Remove
          </Button>
          <RemoveIcon
            sx={iconStyle}
            onClick={async () => await handleMultiItm(item, "MINUS")}
          />
          <Typography sx={{ fontSize: { xs: "12px", md: "inherit" } }}>
            {item.quantity}
          </Typography>
          <AddIcon
            sx={iconStyle}
            onClick={async () => await handleMultiItm(item, "ADD")}
          />
        </Stack>
      )}
      <Divider
        variant="middle"
        style={{
          width: "79%",
          alignSelf: "center",
          margin: "15px 0",
        }}
      />
    </Stack>
  );
}
