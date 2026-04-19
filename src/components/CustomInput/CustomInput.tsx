import React, { ReactElement, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
export type TextFieldProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  required: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  customInputProps: {
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown?: () => void;
    endAdornment?: React.ReactNode;
  };
};

const CustomInput = ({
  onChange,
  label,
  value,
  type,
  placeholder,
  customInputProps,
  required,
  fullWidth,
}: TextFieldProps): ReactElement => (
  <TextField
    id="outlined-input"
    label={label}
    value={value}
    type={type}
    variant="outlined"
    InputProps={customInputProps}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    fullWidth={fullWidth}
  />
);
export default CustomInput;
