import React, { CSSProperties, ReactElement, MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
export type ButtonProps = {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  style?: CSSProperties;
  text?: string;
};

const MyCustomButton = styled(Button)`

  &.MuiButton-root {
    background-color: #0071dc;
    border: none;
    outline: none;
    border-radius: 22px;
    color: white;
    fontSize: 14px;
    min-width: 60px;
    height: 2.5rem;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  :hover {
    background-color: #004f9a;
  }
  :disabled: {
    cursor: default;
    background-color: darkgray;
`;

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
