import { ReactElement } from "react";
import CustomButton from "../../components/CustomButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../components/MyDrawer/MyDrawer";
import BackButton from "../../components/BackButton";
import MyCartItem from "../../components/MyCartItem";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../apollo-client/cache";

export default function MyCart(): ReactElement {
  const navigate = useNavigate();
  const userCartItems = useReactiveVar(cartItemsVar);
  return (
    <Grid2
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="row" alignItems="center" m={"2.5%"}>
        <BackButton title="Go Back" onClick={() => navigate(-1)} />
        <Typography
          sx={{ margin: "0 auto" }}
          variant="h4"
          align="center"
          color="initial"
        >
          My Cart
        </Typography>
        <Box sx={{ width: "250px" }}>
          <CustomButton
            onClick={() => navigate("/checkout")}
            text="Go to checkout"
          />
        </Box>
      </Stack>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        m={"0 auto"}
        sx={{ width: { xs: "375px", md: "800px" } }}
      >
        {userCartItems.map((itm: CartItem, idx: number) => (
          <MyCartItem
              key={`${itm._id}-${idx}`}
              item={itm}
              direction="row"
              justifyContent="space-between"
            />
        ))}
      </Stack>
    </Grid2>
  );
}
