import React, { ReactElement } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { handleDateFormat, moneyFormatter } from "../../utils";
import BackButton from "../../components/BackButton";
import MyCartItem from "../../components/MyCartItem";
import { useQuery } from "@apollo/client";

import Skeleton from "@mui/material/Skeleton";
import { ObjectId } from "bson";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
import { GET_ORDER_ITEM } from "../../apollo-client/queries";

export type IdParam = {
  _id: string;
};

export default function OrderDetail(): ReactElement {
  const history = useHistory();
  const { _id } = useParams<IdParam>();

  const { data, loading } = useQuery(GET_ORDER_ITEM, {
    variables: { _id: _id },
  });
  const defaultItm = {
    _id: new ObjectId(),
    name: "",
    image: "",
    price: 0,
    quantity: 0,
    category: "",
    description: "",
    count: null,
    rate: null,
  };

  if (loading) {
    return <Skeleton variant="rectangular" />;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minWidth: "365px",
        padding: { xs: "0 5px", md: "0 105px", lg: "0 200px" },
      }}
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
            Order Detail
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          marginTop: "85px",
          maxWidth: "850px",
          margin: "100px auto",
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
            width: "100%",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.12)",
            borderBottomWidth: 0,
            // height: "50px",
            padding: { xs: "5px 0", md: "15px 0" },
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
            backgroundColor: "lightgray",
          }}
          // sx={{ width: "100%" }}
        >
          <Typography
            align="left"
            sx={{
              fontWeight: "bold",
              width: "100%",
              margin: { xs: "15px 10px 0", sm: "15px 25px 0" },
              fontSize: { xs: "12px", md: "inherit" },
            }}
            gutterBottom
          >
            Order # {data.getOrder._id}
          </Typography>

          <Typography
            align="center"
            sx={{
              fontWeight: "bold",
              width: "100%",
              //   margin: "15px 10px 0",
              margin: { xs: "15px 10px 0", sm: "15px 25px 0" },
              fontSize: { xs: "12px", md: "inherit" },
            }}
            gutterBottom
          >
            Total: {moneyFormatter.format(data.getOrder.total)}
          </Typography>
          <Typography
            align="right"
            sx={{
              fontWeight: "bold",
              width: "100%",
              //   margin: "15px 10px 0",
              margin: { xs: "15px 10px 0", sm: "15px 25px 0" },
              fontSize: { xs: "12px", md: "inherit" },
            }}
            gutterBottom
          >
            Order Date: {handleDateFormat(Number(data.getOrder.createdAt))}
          </Typography>
        </Stack>
        {loading ? (
          <Skeleton variant="rectangular" animation="pulse">
            <Box
              sx={{
                typography: "subtitle2",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <MyCartItem
                item={defaultItm}
                direction="row"
                justifyContent="flex-start"
                readOnly
              />
            </Box>
          </Skeleton>
        ) : (
          data.getOrder &&
          data.getOrder.items &&
          data.getOrder.items.map((itm: CartItem, idx: number) => (
            <Box
              key={idx}
              sx={{
                typography: "subtitle2",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <MyCartItem
                item={itm}
                direction="row"
                justifyContent="flex-start"
                readOnly
              />
            </Box>
          ))
        )}
      </Stack>
    </Grid>
  );
}
