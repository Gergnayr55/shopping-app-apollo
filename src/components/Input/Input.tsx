import React, { SyntheticEvent, forwardRef } from "react";
import "./Input.css";
export type InputProps = {
  className: string;
  text: string;
  onChange: () => SyntheticEvent<HTMLInputElement>;
  type: string;
  placeholder: string;
  onKeyDown: () => void;
  ref: React.ForwardedRef<HTMLInputElement>;
  onClick: () => SyntheticEvent<HTMLInputElement>;
  onFocus: () => void;
  onBlur: () => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      text,
      onChange,
      type,
      placeholder,
      onKeyDown,
      onClick,
      onFocus,
      onBlur,
    },
    ref
  ) => (
    <input
      ref={ref}
      className={`input ${className ? className : ""}`}
      type={type}
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      required
      autoComplete="off"
    />
  )
);
export default Input;
