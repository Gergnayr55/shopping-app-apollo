import React, { ReactElement, MouseEvent } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { moneyFormatter } from "../../utils";
import CustomButton from "../CustomButton";
import { useLocation } from "react-router-dom";
interface CartOverviewProps {
  totalItems: number;
  totalCart: number;
  isCheckout: boolean;
  handleCheckout: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function CartOverview({
  totalItems,
  totalCart,
  isCheckout,
  handleCheckout,
}: CartOverviewProps): ReactElement {
  const location = useLocation();
  const handleBtnText = (): string => {
    let str = "Checkout order";
    if (location.pathname.startsWith("/order-success")) {
      str = "Continue Shopping";
    } else if (location.pathname.startsWith("/checkout")) {
      str = `Place order for ${moneyFormatter.format(totalCart)}`;
    } else {
      str = "Checkout order";
    }
    return str;
  };

  const btnText: string = handleBtnText();

  return (
    <>
      <Stack
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ padding: "5%" }}>
          <CustomButton
            onClick={handleCheckout}
            style={{ fontSize: "11px" }}
            text={btnText}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            padding: { xs: "10px 4%", md: "10px 10%" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" style={{ paddingLeft: 5 }}>
            <strong>Subtotal</strong>
            {` (${totalItems} ${totalItems > 1 ? "Items" : "Item"}): `}
          </Typography>

          <Typography variant="body2" align="right" style={{ display: "flex" }}>
            {moneyFormatter.format(totalCart)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: { xs: "10px 4%", md: "10px 10%" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            style={{ paddingLeft: 5, fontSize: "13px" }}
          >
            Shipping {`${totalCart < 35 ? "(below $35 order minimum)" : ""}`}
          </Typography>
          <Typography
            variant="body2"
            align="right"
            style={{ display: "flex", fontSize: "13px" }}
          >
            {totalCart < 35 ? "$6.99" : "Free"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: { xs: "10px 4%", md: "10px 10%" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            style={{ paddingLeft: 5, fontWeight: "bold" }}
          >
            {btnText === "Checkout order" ? "Estimated taxes" : "Tax"}
          </Typography>
          <Typography
            variant="body2"
            align="right"
            style={{ display: "flex", fontSize: "13px" }}
          >
            {isCheckout
              ? moneyFormatter.format(Math.round(totalCart * 0.0735))
              : "See at checkout"}
          </Typography>
        </Box>
        <Divider
          variant="middle"
          style={{ width: "95%", alignSelf: "center", margin: "15px 0" }}
        />
        {isCheckout && (
          <>
            <Box
              sx={{
                display: "flex",
                padding: { xs: "10px 4%", md: "10px 10%" },
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  paddingLeft: 5,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {btnText === "Checkout order" ? "Estimated" : ""} total
              </Typography>
              <Typography
                variant="body2"
                align="right"
                mb="15px"
                style={{ display: "flex", fontSize: "13px" }}
              >
                {moneyFormatter.format(
                  Math.round(totalCart * 0.0735) + totalCart
                )}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
}
