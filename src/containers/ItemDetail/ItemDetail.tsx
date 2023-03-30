import React, { useContext, ReactElement, useMemo } from "react";
import { DashboardContext } from "../Dashboard/State/DashboardContext";
import "./ItemDetail.css";
import Toolbar from "../../components/Toolbar";
import { Box, Typography, Grid, Divider, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { cartTotalItems, handleType, moneyFormatter } from "../../utils";
import MyDrawer, { CartItem } from "../../components/MyDrawer/MyDrawer";
import BackButton from "../../components/BackButton";
import Aside from "../../components/Aside";
import ProductDetails from "../../components/ProductDetails";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartButton from "../../components/AddToCartButton";
import ItemSummary from "../../components/ItemSummary";
import ZoomCursor from "../../components/ZoomCursor";
import Skeleton from "@mui/material/Skeleton";
import { TOGGLE_CART } from "../../apollo-client/mutations";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { GET_ITEM, GET_CART_ITEMS } from "../../apollo-client/queries";
import { cartItemsVar } from "../../apollo-client/cache";
import { IdParam } from "../OrderDetail/OrderDetail";

export type Item = {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

export interface UserCartItem extends CartItem {
  __typename: string;
}
function ItemDetail(): ReactElement {
  const history = useHistory();
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("sm"));
  const { drawerOpen, setDrawerOpen } = useContext(DashboardContext);
  const { _id } = useParams<IdParam>();
  const itemId = _id;

  const {
    data: myData,
    error: myError,
    loading: itemLoading,
  } = useQuery(GET_ITEM, {
    variables: { _id: itemId },
  });

  const userCartItems = useReactiveVar(cartItemsVar);

  const [mutate, { error }] = useMutation(TOGGLE_CART);
  const selectedItm = userCartItems.find(
    (itm: CartItem) => itm._id.toString() === itemId
  );
  const handleButtonTxt = useMemo(() => {
    if (selectedItm && selectedItm.quantity && userCartItems.length > 0) {
      return `${selectedItm.quantity} added`;
    } else return "Add to Cart";
  }, [userCartItems, selectedItm]);

  console.log("userCartItems");
  console.log(userCartItems);

  const handleCart = async (
    cartItem: CartItem,
    type: string
  ): Promise<void> => {
    try {
      const result = await mutate({
        variables: { cartItem, type },
        update(cache, { data: { addOrRemoveFromCart } }) {
          const qryResult: { myCartItems: CartItem[] } | null = cache.readQuery(
            {
              query: GET_CART_ITEMS,
            }
          );
          const cartItems: Array<CartItem> =
            (qryResult && qryResult.myCartItems && qryResult.myCartItems) || [];

          const existingCartItemId = cache.identify({
            __typename: "CartItem",
            _id: cartItem._id,
          });
          const existingCartItem = cartItems?.find(
            (item: CartItem) => item._id === cartItem._id
          );

          const newQty = handleType(type, existingCartItem?.quantity || 0);
          if (!existingCartItem) {
            const newCartItem = {
              ...cartItem,
              __typename: "CartItem",
              quantity: 1,
            };
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
              cache.gc();
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
        },
      });
    } catch (e) {
      console.log(`Failed to ${type} cart item`, e);
    }
  };

  const addItem = async (): Promise<void> => {
    try {
      let itmCopy: CartItem | undefined = undefined;
      if (selectedItm && selectedItm._id) itmCopy = { ...selectedItm };

      if (!itmCopy || (itmCopy && !itmCopy._id)) {
        const newItm = {
          ...myData.getSkin,
          quantity: 0,
          __typename: "CartItem",
        };
        await handleCart(newItm, "ADD");
      } else if (itmCopy && itmCopy._id) {
        await handleCart(itmCopy, "ADD");
      }
    } catch (e) {
      console.log("Failed to add item to cart", e);
    }
  };

  const removeItem = async (): Promise<void> => {
    try {
      let itmCopy: CartItem | undefined = undefined;
      if (selectedItm && selectedItm._id) itmCopy = { ...selectedItm };
      if (itmCopy && itmCopy.quantity === 1) {
        await handleCart(itmCopy, "REMOVE");
      } else if (itmCopy && itmCopy.quantity > 1) {
        await handleCart(itmCopy, "MINUS");
      }
    } catch (e) {
      console.log("Failed to remove item from cart", e);
    }
  };

  const handleEmptyCart = async (): Promise<void> => {
    try {
      if (!foundInCart) {
        const itmCopy = {
          ...myData.getSkin,
          quantity: 0,
          __typename: "CartItem",
        };
        await handleCart(itmCopy, "ADD");
      } else {
        return undefined;
      }
    } catch (e) {
      console.log("Failed to add initial item to cart", e);
    }
  };

  const buttonText: string = handleButtonTxt;

  const foundInCart = userCartItems.some(
    (itm: CartItem) => itm._id.toString() === itemId
  );
  if (error) console.error(myError);
  if (itemLoading) return <Skeleton variant="rectangular" />;
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Toolbar
        total={cartTotalItems(userCartItems)}
        viewCartDrawer={() => setDrawerOpen(!drawerOpen)}
      />
      <MyDrawer
        handleCheckout={() => history.push("/checkout")}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="item-detail-container">
        <Grid
          direction="column"
          alignItems="center"
          md={10}
          sm={12}
          xs={12}
          sx={{
            marginTop: { xs: "120px", md: "76px" },
            padding: { xs: "0 0 100px", md: "15px 50px 100px" },
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ alignSelf: "flex-start" }}>
              <BackButton onClick={() => history.goBack()} />
            </Box>

            {!largeDevice && myData.getSkin && (
              <Stack alignItems="center" spacing={2} m="25px">
                <ItemSummary
                  name={myData.getSkin.name}
                  price={myData.getSkin.price}
                  rate={myData.getSkin.rate}
                  count={myData.getSkin.count}
                  showRating
                />
              </Stack>
            )}
            <ZoomCursor
              width={"100%"}
              height={"100%"}
              src={myData.getSkin?.image}
            />
            <Typography
              variant="h5"
              sx={{
                width: "calc(100% - 100px)",
                fontSize: { xs: "16px", md: "24px" },
                marginTop: "5%",
              }}
            >
              About this item
            </Typography>
            <Divider
              variant="middle"
              style={{ width: "100%", margin: "15px 0" }}
            />
            <Box sx={{ width: "calc(100% - 100px)" }}>
              <Typography
                variant="body1"
                sx={{
                  margin: "15px 0",
                  fontSize: { xs: "14px", md: "inherit" },
                }}
              >
                Product details
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "12px", md: "inherit" } }}
              >
                {myData.getSkin?.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {largeDevice && !itemLoading && myData.getSkin ? (
          <Stack spacing={1} justifyContent="flex-end" alignItems="center">
            <Aside height={"calc(100% - 76px)"}>
              <ProductDetails
                showRating
                name={myData.getSkin.name}
                price={myData.getSkin.price}
                rate={myData.getSkin.rate}
                count={myData.getSkin.count}
                buttonText={buttonText}
                foundInCart={foundInCart}
                handleEmptyCart={handleEmptyCart}
                handleRemoveItem={removeItem}
                handleAddItem={addItem}
              />
            </Aside>
          </Stack>
        ) : (
          <Box
            sx={{
              position: "fixed",
              padding: "15px 0",
              bottom: 0,
              backgroundColor: "#fff",
              height: "35px",
              zIndex: 100,
              width: "100%",
              boxShadow: "0 1px 2px 1px #00000026",
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              m="0 20px"
            >
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                sx={{ width: "100%", fontSize: { xs: "18px", md: "24px" } }}
              >
                <strong>{moneyFormatter.format(myData.getSkin?.price)}</strong>
              </Typography>
              <Box sx={{ width: "100%" }}>
                <AddToCartButton
                  buttonText={buttonText}
                  foundInCart={foundInCart}
                  handleEmptyCart={handleEmptyCart}
                  handleRemoveItem={removeItem}
                  handleAddItem={addItem}
                />
              </Box>
            </Stack>
          </Box>
        )}
      </div>
    </Grid>
  );
}
export default ItemDetail;
