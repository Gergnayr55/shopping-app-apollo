import { ReactElement, MouseEvent } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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
          <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
            <strong>Subtotal</strong>
            {` (${totalItems} ${totalItems > 1 ? "Items" : "Item"}): `}
          </Typography>

          <Typography variant="body2" align="right" sx={{ display: "flex" }}>
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
          <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
            Shipping {`${totalCart < 35 ? "(below $35 order minimum)" : ""}`}
          </Typography>
          <Typography variant="body2" align="right" sx={{ display: "flex" }}>
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
          <Typography variant="body2" sx={{ paddingLeft: "5px", fontWeight: "bold" }}>
            {btnText === "Checkout order" ? "Estimated taxes" : "Tax"}
          </Typography>
          <Typography variant="body2" align="right" sx={{ display: "flex" }}>
            {isCheckout
              ? moneyFormatter.format(Math.round(totalCart * 0.0735))
              : "See at checkout"}
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ width: "95%" }} />
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
                sx={{ paddingLeft: "5px", fontWeight: "bold", textTransform: "capitalize" }}
              >
                {btnText === "Checkout order" ? "Estimated" : ""} total
              </Typography>
              <Typography
                variant="body2"
                align="right"
                mb="15px"
                sx={{ display: "flex" }}
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
