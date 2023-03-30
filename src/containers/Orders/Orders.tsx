import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { Box, Divider, Typography } from "@mui/material";
import { handleDateFormat, moneyFormatter } from "../../utils";
import { useHistory } from "react-router-dom";
import { Stack } from "@mui/system";
import { useQuery } from "@apollo/client";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
import BackButton from "../../components/BackButton";
import { GET_ORDERS } from "../../apollo-client/queries";
export interface OrderItem extends CartItem {
  createdAt: string;
  updatedAt: string;
  status: string;
  total: number;
  items: Array<CartItem>;
}
export default function Orders(): ReactElement {
  const history = useHistory();

  const { data, error, loading } = useQuery(GET_ORDERS);

  const headerItems = ["Date", "Order #", "Total", "Status"];

  const handleIdxWidth = (indx: number) => {
    switch (indx) {
      case 0:
        return { minWidth: { xs: "45px", md: "82px" } };
      case 1:
        return { minWidth: { xs: "110px", md: "211px" } };
      case 2:
        return { minWidth: { xs: "28px", md: "49px" } };
      case 3:
        return { minWidth: { xs: "38px", md: "73px" } };
      default:
        throw new Error("Not a valid index");
    }
  };

  if (loading) return <Skeleton variant="rectangular" height="500px" />;
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minWidth: "365px",
          padding: { xs: "0 25px", md: "0 105px", lg: "0 200px 50px" },
        }}
      >
        <Stack direction="column" alignItems="center" m={"0 2.5% 2.5%"} sx={{}}>
          <Box
            sx={{
              backgroundColor: "#0071dc",
              width: "100vw",
              minWidth: "375px",
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
              sx={{
                width: "100%",
                color: "#fff",
                paddingRight: { xs: "15%", md: "175px" },
              }}
              variant="h5"
              align="center"
            >
              Order History
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            marginTop: "85px",
            borderWidth: "thin",
            borderStyle: "solid",
            minWidth: { xs: "355px", md: "fit-content" },
            borderColor: "rgba(0, 0, 0, 0.12)",
            borderRadius: "12px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{
              borderWidth: 0,
              borderStyle: "solid",
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderBottomWidth: 0,
              padding: { xs: "5px 0", md: "15px 0" },
              borderTopRightRadius: 6,
              borderTopLeftRadius: 6,
              backgroundColor: "lightgray",
            }}
          >
            {headerItems.map((h: string, idx: number) => (
              <Typography
                align="center"
                sx={{
                  fontWeight: "bold",
                  width: "100%",
                  marginTop: "15px",
                  fontSize: { xs: "13px", md: "inherit" },
                  ...handleIdxWidth(idx),
                }}
                key={`${h}-${idx}`}
                gutterBottom
              >
                {h}
              </Typography>
            ))}
          </Stack>
          {!data || !data?.getOrders || data.getOrders?.length === 0 ? (
            <Typography
              variant="h5"
              align="center"
              sx={{ marginTop: "200px", height: "300px" }}
            >
              No Orders found.
            </Typography>
          ) : (
            data.getOrders.map((itm: OrderItem, idx: number) => (
              <React.Fragment key={`${itm}-${idx}`}>
                <Divider variant="middle" style={{ margin: "0" }} />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  sx={{
                    padding: { xs: "5px 0", md: "15px 0" },
                    ":hover": { cursor: "pointer", backgroundColor: "#e6f1fc" },
                  }}
                  onClick={() => {
                    // setOrderItemDetails(itm);
                    history.push(`/orders/${itm._id}`);
                  }}
                >
                  <Typography
                    gutterBottom
                    align="center"
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      fontSize: { xs: "12px", md: "inherit" },
                    }}
                  >
                    {handleDateFormat(Number(itm.createdAt))}
                  </Typography>
                  <Typography
                    gutterBottom
                    align="center"
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      wordBreak: "break-all",
                      fontSize: { xs: "12px", md: "inherit" },
                    }}
                  >
                    {itm._id}
                  </Typography>
                  <Typography
                    gutterBottom
                    align="center"
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      fontSize: { xs: "12px", md: "inherit" },
                    }}
                  >
                    {moneyFormatter.format(itm.total)}
                  </Typography>
                  <Typography
                    gutterBottom
                    align="center"
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      fontSize: { xs: "12px", md: "inherit" },
                    }}
                  >
                    {itm.status}
                  </Typography>
                </Stack>
              </React.Fragment>
            ))
          )}
        </Box>
      </Grid>
    </>
  );
}
