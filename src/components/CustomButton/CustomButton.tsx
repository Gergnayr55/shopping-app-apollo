import { CSSProperties, ReactElement, MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
export type ButtonProps = {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  style?: CSSProperties;
  text?: string;
};

const MyCustomButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    backgroundColor: theme.palette.primary.main,
    border: "none",
    outline: "none",
    borderRadius: "22px",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    minWidth: "60px",
    height: "2.5rem",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  ":hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  ":disabled": {
    cursor: "default",
    backgroundColor: "darkgray",
  },
}));

function CustomButton({
  className,
  onClick,
  disabled,
  text = "Submit",
  style,
}: ButtonProps): ReactElement {
  return (
    <MyCustomButton
      className={className}
      variant="text"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {text}
    </MyCustomButton>
  );
}

export default CustomButton;
