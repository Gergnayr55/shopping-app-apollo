import React, { ReactElement, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
export type TextFieldProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  required: boolean;
  placeholder?: string;
  customInputProps: {
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown?: () => void;
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
  />
);
export default CustomInput;
