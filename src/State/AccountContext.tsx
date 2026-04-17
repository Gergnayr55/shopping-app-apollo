import React, { createContext, useRef, useState } from "react";
import useContainsNode from "../custom-hooks/useContainsNode";

type NameType = { firstName: string; lastName: string };

type AccountContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  name: NameType;
  setName: React.Dispatch<React.SetStateAction<NameType>>;
  verifyPassword: string;
  setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
  focusedInput: string;
  setFocusedInput: React.Dispatch<React.SetStateAction<string>>;
  focusRef: React.RefObject<HTMLElement>;
  handleClick: (event: React.MouseEvent) => void;
};

const AccountContext = createContext<AccountContextType>({
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  passwordVisible: false,
  setPasswordVisible: () => {},
  name: { firstName: "", lastName: "" },
  setName: () => {},
  verifyPassword: "",
  setVerifyPassword: () => {},
  focusedInput: "",
  setFocusedInput: () => {},
  focusRef: { current: null },
  handleClick: () => {},
});
const { Provider, Consumer } = AccountContext;

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState<NameType>({ firstName: "", lastName: "" });
  const [verifyPassword, setVerifyPassword] = useState("");
  const focusRef = useRef<HTMLElement>(null);
  const [focusedInput, setFocusedInput] = useState("");

  useContainsNode(focusRef, () => {
    focusRef.current?.blur();
  });

  const handleClick = (event: React.MouseEvent) => {
    if (
      focusRef &&
      focusRef.current &&
      event.target instanceof Node &&
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
      {children}
    </Provider>
  );
};

export { AccountContext, AccountProvider, Consumer as AccountConsumer };
