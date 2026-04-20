import { ReactElement } from "react";
import Button from "@mui/material/Button";
import { KeyboardArrowLeft } from "@mui/icons-material";
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
      startIcon={<KeyboardArrowLeft />}
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
