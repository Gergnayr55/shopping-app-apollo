import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Fab from "@mui/material/Fab";

interface AddToCartProps {
  buttonText: string;
  foundInCart: boolean;
  handleEmptyCart: () => Promise<void>;
  handleRemoveItem: () => Promise<void>;
  handleAddItem: () => Promise<void>;
}
export const MyFab = styled(Fab)`
  &.MuiFab-root {
    box-shadow: none;
  }
`;

export default function AddToCartButton({
  buttonText,
  foundInCart,
  handleEmptyCart,
  handleRemoveItem,
  handleAddItem,
}: AddToCartProps): ReactElement {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "22px",
        maxWidth: "215px",
      }}
      onClick={handleEmptyCart}
    >
      {foundInCart ? (
        <>
          <MyFab
            color="primary"
            aria-label="remove"
            sx={{ width: "32px", height: "32px", zIndex: 10 }}
            onClick={handleRemoveItem}
          >
            <RemoveIcon />
          </MyFab>
          <Typography
            align="center"
            variant="button"
            sx={{
              color: "white",
              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            {buttonText}
          </Typography>
          <MyFab
            color="primary"
            aria-label="add"
            sx={{ width: "32px", height: "32px", zIndex: 10 }}
            onClick={handleAddItem}
          >
            <AddIcon />
          </MyFab>
        </>
      ) : (
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "36px",
            width: "100%",

            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#1565c0",
              borderRadius: "22px",
            },
          }}
        >
          <Typography
            align="center"
            variant="button"
            sx={{
              color: "white",
              display: "inline-block",
              lineHeight: "36px",
              width: "100%",
              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            {buttonText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
