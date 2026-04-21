import { ReactElement, MouseEvent } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { moneyFormatter } from "../../utils";

import { useNavigate } from "react-router-dom";
import { DeleteOutline, Add, Remove } from "@mui/icons-material";
import { CartItem } from "../MyDrawer/MyDrawer";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../apollo-client/cache";
import { useCartMutation } from "../../custom-hooks/useCartMutation";

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
  const navigate = useNavigate();
  const iconStyle = {
    fontSize: { xs: "14px", md: "24px" },
    "&:hover": { cursor: "pointer" },
  };
  const userCartItems = useReactiveVar(cartItemsVar);

  const { handleCart, loading, error } = useCartMutation();
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
            navigate(`/skin/${item._id}`);
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
            startIcon={<DeleteOutline />}
            onClick={async () => await handleCart(item, "REMOVE")}
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
          <Remove
            sx={iconStyle}
            onClick={async () => await handleCart(item, "MINUS")}
          />
          <Typography sx={{ fontSize: { xs: "12px", md: "inherit" } }}>
            {item.quantity}
          </Typography>
          <Add
            sx={iconStyle}
            onClick={async () => await handleCart(item, "ADD")}
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
