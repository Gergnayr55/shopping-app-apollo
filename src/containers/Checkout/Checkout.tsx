import React, { ReactElement, MouseEvent } from "react";
import { Radio } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Typography, Grid, Divider, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { calculatedCartTotal, getUser, handleTotalItems } from "../../utils";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
import BackButton from "../../components/BackButton";
import MyCartItem from "../../components/MyCartItem";
import Aside from "../../components/Aside";
import CartOverview from "../../components/CartOverview";
import VisaImg from "../../icons/visa-sm.png";
import { gql, useMutation, useReactiveVar, Reference } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { cartItemsVar } from "../../apollo-client/cache";
import { MY_ORDER } from "../../apollo-client/mutations";

export default function Checkout(): ReactElement {
  const history = useHistory();

  const user = getUser();
  const theme = useTheme();
  const userCartItems = useReactiveVar(cartItemsVar);
  const largeDevice = useMediaQuery(theme.breakpoints.up("sm"));

  const totalOrder = calculatedCartTotal(userCartItems);
  const [handleOrder, { data }] = useMutation(MY_ORDER);
  const cartItemsCopy = [...userCartItems];
  const cleanItems = cartItemsCopy.map((itm) => {
    const newItm = {
      _id: itm._id,
      name: itm.name,
      description: itm.description,
      category: itm.category,
      image: itm.image,
      price: itm.price,
      count: itm.count,
      rate: itm.rate,
      quantity: itm.quantity,
    };
    return newItm;
  });

  const handleUsrOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const { data } = await handleOrder({
        variables: {
          cartItems: cleanItems,
          userId: user._id,
          total: totalOrder,
        },
        update(cache, { data: { handleOrder } }) {
          if (handleOrder && handleOrder.id) {
            const unixTimestamp = Math.floor(Date.now());

            // Add __typename key to be picked up and identified by cache
            const cleanItemsWithTypename = cleanItems.map((item) =>
              Object.assign({}, item, { __typename: "OrderItem" })
            );

            const newOrderRef = cache.writeFragment({
              id: `Orders:${handleOrder.id}`,
              data: {
                __typename: "Orders",
                _id: handleOrder.id,
                items: cleanItemsWithTypename,
                userId: user._id,
                createdAt: unixTimestamp.toString(),
                total: totalOrder,
                status: "PENDING",
              },
              fragment: gql`
                fragment NewOrder on Orders {
                  _id
                  items {
                    _id
                    name
                    price
                    description
                    category
                    image
                    rate
                    count
                    quantity
                  }
                  userId
                  createdAt
                  total
                  status
                }
              `,
            }) as Reference;
            // Write the new order to the cache
            cache.modify({
              fields: {
                getOrders(existingOrders = [], { toReference }) {
                  return [...existingOrders, toReference(newOrderRef)];
                },
                myCartItems(existing, { DELETE }) {
                  return DELETE;
                },
              },
            });
          }
        },
      });

      if (data && data.handleOrder) {
        console.log("Successfully sent Order");

        history.push(`/order-success/${data.handleOrder.id}`);
      }
    } catch (e) {
      console.error("Cant send Order", e);
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      md={12}
      sx={{
        minWidth: "365px",
        padding: { xs: "0 25px", md: "0 105px", lg: "0 200px" },
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        m={"0 2.5% 2.5%"}
        sx={{ padding: { xs: "0 25px", md: "0 105px", lg: "0 200px" } }}
      >
        <Box
          sx={{
            backgroundColor: "#0071dc",
            width: "100vw",
            alignItems: "center",
            display: "flex",
            height: "75px",
            paddingLeft: "35px",
          }}
        >
          <BackButton
            title="Go Back"
            color="#fff"
            onClick={() => history.goBack()}
          />
          <Typography
            sx={{ width: "100%", color: "#fff" }}
            variant="h5"
            align="center"
          >
            Checkout
          </Typography>
        </Box>
      </Stack>
      <Stack
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-around"
        sx={{}}
      >
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: { xs: "10px 2.5%", md: "10px 0 5rem" },
            minWidth: "125px",
          }}
        >
          <Box
            sx={{
              borderRadius: "8px",
              padding: { xs: "14px 25px", sm: "14px 18px" },
              marginLeft: "10px !important",
              width: "100%",
              minHeight: "fit-content",
              // minWidth: "195px",
              // maxWidth: { xs: "200px", md: "100%" },
              border: "1px #D5D9D9 solid",
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <LocalShippingOutlinedIcon fontSize="large" />
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "16px", md: "inherit" } }}
              >
                Shipping
              </Typography>
            </Stack>
            <Divider
              variant="middle"
              style={{ width: "100%", alignSelf: "center", margin: "15px 0" }}
            />
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Radio
                checked
                value={true}
                name="radio-btn-ship"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                size="small"
              />
              <Typography
                variant="body2"
                align="left"
                sx={{
                  textTransform: "capitalize",
                  fontSize: { xs: "12px", md: "inherit" },
                }}
              >
                {`${user.firstName} ${user.lastName} 1234 Anywhere Rd. Someplace, USA`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: "8px",
              padding: { xs: "14px 25px", sm: "14px 18px" },
              width: "100%",
              marginLeft: "10px !important",
              minHeight: "fit-content",
              // maxWidth: { xs: "200px", md: "100%" },
              // minWidth: "195px",
              border: "1px #D5D9D9 solid",
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <CreditCardOutlinedIcon fontSize="large" />
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "16px", md: "inherit" } }}
              >
                Payment method
              </Typography>
            </Stack>
            <Divider
              variant="middle"
              style={{ width: "100%", alignSelf: "center", margin: "15px 0" }}
            />
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Radio
                checked
                value={true}
                name="radio-btn-card"
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
              <img
                src={VisaImg}
                alt="card"
                style={{
                  backgroundSize: "contain",
                  width: "min-content",
                  height: "auto",
                  maxHeight: "40px",
                  imageRendering: "auto",
                }}
              />
              <Typography
                variant="body2"
                align="left"
                sx={{
                  marginLeft: "10px",
                  textTransform: "capitalize",
                  fontSize: { xs: "12px", md: "inherit" },
                }}
              >
                Ending in 0101
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: "8px",
              padding: { xs: "14px 25px", sm: "14px 18px" },
              width: "100%",
              marginLeft: "10px !important",
              // width: { xs: "200px", md: "100%" },
              border: "1px #D5D9D9 solid",
              minHeight: "250px",
              // margin: "25px !important",
              // maxWidth: { xs: "200px", md: "100%" },
              // minWidth: "195px",
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <ShoppingBagOutlinedIcon fontSize="large" />
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "16px", md: "inherit" } }}
              >
                Item Details
              </Typography>
            </Stack>
            <Divider
              variant="middle"
              style={{ width: "100%", alignSelf: "center", margin: "15px 0" }}
            />
            {userCartItems.map((itm: CartItem, idx: number) => (
              <React.Fragment key={`${itm}-${idx}`}>
                <MyCartItem
                  item={itm}
                  direction="row"
                  justifyContent="space-between"
                />
              </React.Fragment>
            ))}
          </Box>
        </Stack>
        <Stack
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
          sx={{ position: "sticky", zIndex: 1, top: "40px" }}
        >
          <Aside
            height="100%"
            minWidth={largeDevice ? "100%" : "150px"}
            customStyle={{ margin: "10px 0 0 5%" }}
          >
            <CartOverview
              totalCart={totalOrder}
              totalItems={handleTotalItems(userCartItems)}
              isCheckout
              handleCheckout={(e: MouseEvent<HTMLButtonElement>) =>
                handleUsrOrder(e)
              }
            />
          </Aside>
        </Stack>
      </Stack>
    </Grid>
  );
}
