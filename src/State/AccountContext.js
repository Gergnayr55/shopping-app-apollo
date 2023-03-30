import React, { createContext, useRef, useState } from "react";
import useContainsNode from "../custom-hooks/useContainsNode";
const AccountContext = createContext();
const { Provider, Consumer } = AccountContext;

const AccountProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [verifyPassword, setVerifyPassword] = useState("");
  const focusRef = useRef(null);

  const [focusedInput, setFocusedInput] = useState("");
  useContainsNode(focusRef, () => {
    focusRef.current.blur();
  });
  const handleClick = (event) => {
    if (
      focusRef &&
      focusRef.current &&
      focusRef.current.contains(event.target)
    ) {
      focusRef.current.focus();
    }
  };

  return (
    <Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        passwordVisible,
        setPasswordVisible,
        name,
        setName,
        verifyPassword,
        setVerifyPassword,
        focusedInput,
        setFocusedInput,
        focusRef,
        handleClick,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { AccountContext, AccountProvider, Consumer as AccountConsumer };
