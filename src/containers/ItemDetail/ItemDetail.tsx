import { useContext, ReactElement, useMemo } from "react";
import { DashboardContext } from "../Dashboard/State/DashboardContext";
import "./ItemDetail.css";
import Toolbar from "../../components/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import { cartTotalItems, moneyFormatter } from "../../utils";
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
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_ITEM } from "../../apollo-client/queries";
import { cartItemsVar } from "../../apollo-client/cache";
import { useCartMutation } from "../../custom-hooks/useCartMutation";
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
  const navigate = useNavigate();
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

  const { handleCart } = useCartMutation();
  const selectedItm = userCartItems.find(
    (itm: CartItem) => itm._id.toString() === itemId
  );
  const handleButtonTxt = useMemo(() => {
    if (selectedItm && selectedItm.quantity && userCartItems.length > 0) {
      return `${selectedItm.quantity} added`;
    } else return "Add to Cart";
  }, [userCartItems, selectedItm]);

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
      console.error("Failed to add item to cart", e);
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
      console.error("Failed to remove item from cart", e);
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
      console.error("Failed to add initial item to cart", e);
    }
  };

  const buttonText: string = handleButtonTxt;

  const foundInCart = userCartItems.some(
    (itm: CartItem) => itm._id.toString() === itemId
  );
  if (itemLoading) return <Skeleton variant="rectangular" />;
  return (
    <Grid2
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
        handleCheckout={() => navigate("/checkout")}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="item-detail-container">
        <Grid2
          direction="column"
          alignItems="center"
          size={{ xs: 12, sm: 12, md: 10 }}
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
              <BackButton onClick={() => navigate(-1)} />
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
        </Grid2>
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
    </Grid2>
  );
}
export default ItemDetail;
