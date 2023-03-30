import React, { ReactElement, MouseEvent, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { cartTotalItems, calculatedCartTotal, getUser } from "../../utils";
import { useHistory, useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import Aside from "../../components/Aside";
import CartOverview from "../../components/CartOverview";
import VisaImg from "../../icons/visa-sm.png";

import BackButton from "../../components/BackButton";
import { cartItemsVar } from "../../apollo-client/cache";
import { useReactiveVar } from "@apollo/client";
export type RouteParam = {
  id: string;
};
export default function OrderSuccess(): ReactElement {
  const user = getUser();
  const history = useHistory();

  const { id } = useParams<RouteParam>();

  const userCartItems = useReactiveVar(cartItemsVar);

  useEffect(() => {
    return () => {
      cartItemsVar([]);
    };
  }, []);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="column" alignItems="center" m={"0 2.5% 2.5%"}>
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
            onClick={() => {
              cartItemsVar([]);
              history.replace("/home");
            }}
          />
          <Typography
            sx={{ width: "100%", color: "#fff", paddingRight: "175px" }}
            variant="h5"
            align="center"
          >
            Order History
          </Typography>
        </Box>
      </Stack>
      <Stack
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-around"
      >
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "10px 0 5rem" }}
        >
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "100%" }}
            mb="15px"
          >
            <CheckCircleOutlineIcon color="primary" fontSize="large" />
            <Typography variant="h6" textTransform="capitalize" gutterBottom>
              Thank you {user.firstName}!
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{ width: "100%", marginTop: "0px !important" }}
          >
            Order Confirmation # {id}
          </Typography>

          <Box
            sx={{
              borderRadius: "8px",
              padding: "14px 18px",
              width: "100%",
              minHeight: "fit-content",
              border: "1px #D5D9D9 solid",
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              mb="15px"
            >
              <Typography variant="h6" textTransform="capitalize">
                Order updates
              </Typography>
            </Stack>
            <Typography variant="body2">
              You’ll get shipping and delivery updates by email.
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: "8px",
              padding: "14px 18px",
              width: "100%",
              minHeight: "fit-content",
              border: "1px #D5D9D9 solid",
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              mb="15px"
            >
              <Typography variant="h6" textTransform="capitalize" gutterBottom>
                Customer information
              </Typography>
            </Stack>
            <Box sx={{}}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box sx={{}}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold" }}
                    textTransform="capitalize"
                    gutterBottom
                  >
                    Contact information
                  </Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
                <Box sx={{}}>
                  <Typography
                    variant="subtitle2"
                    textTransform="capitalize"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    Payment method
                  </Typography>
                  <Stack direction="row" alignItems="center">
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
                      sx={{ marginLeft: "10px", textTransform: "capitalize" }}
                    >
                      Ending in 0101
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Typography
                variant="subtitle2"
                textTransform="capitalize"
                sx={{
                  paddingTop: "20px",
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                Shipping address
              </Typography>
              <Typography variant="body2" sx={{ width: "200px" }} gutterBottom>
                1234 Anywhere Rd. Someplace, USA
              </Typography>
              <Typography
                variant="subtitle2"
                textTransform="capitalize"
                sx={{ paddingTop: "20px", fontWeight: "bold" }}
                gutterBottom
              >
                Shipping method
              </Typography>
              <Typography variant="body2" textTransform="capitalize">
                Economy (1-6 Days)
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
          sx={{ position: "sticky", zIndex: 1, top: "40px" }}
        >
          <Aside height="100%">
            <CartOverview
              totalCart={calculatedCartTotal(userCartItems)}
              totalItems={cartTotalItems(userCartItems)}
              isCheckout
              handleCheckout={(e: MouseEvent<HTMLButtonElement>) => {
                cartItemsVar([]);
                history.replace("/home");
              }}
            />
          </Aside>
        </Stack>
      </Stack>
    </Grid>
  );
}
