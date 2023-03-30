import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
interface BackButtonProps {
  title?: string;
  color?: string;
  onClick: () => void;
}

export default function BackButton({
  title = "Back to results",
  color = "#000",
  onClick,
}: BackButtonProps): ReactElement {
  return (
    <Button
      variant="text"
      color="inherit"
      startIcon={<KeyboardArrowLeftIcon />}
      onClick={onClick}
      sx={{
        width: "fit-content",
        textTransform: "capitalize",
        display: "flex",
        whiteSpace: "nowrap",
        color: `${color}`,
      }}
    >
      {title}
    </Button>
  );
}
