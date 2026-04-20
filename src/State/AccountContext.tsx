import { createContext, useRef, useState, Dispatch, SetStateAction, RefObject, MouseEvent, ReactNode } from "react";
import useContainsNode from "../custom-hooks/useContainsNode";

type NameType = { firstName: string; lastName: string };

type AccountContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordVisible: boolean;
  setPasswordVisible: Dispatch<SetStateAction<boolean>>;
  name: NameType;
  setName: Dispatch<SetStateAction<NameType>>;
  verifyPassword: string;
  setVerifyPassword: Dispatch<SetStateAction<string>>;
  focusedInput: string;
  setFocusedInput: Dispatch<SetStateAction<string>>;
  focusRef: RefObject<HTMLElement>;
  handleClick: (event: MouseEvent) => void;
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

const AccountProvider = ({ children }: { children: ReactNode }) => {
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

  const handleClick = (event: MouseEvent) => {
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
