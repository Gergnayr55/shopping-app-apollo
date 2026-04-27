import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

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
});
const { Provider, Consumer } = AccountContext;

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState<NameType>({ firstName: "", lastName: "" });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

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
      }}
    >
      {children}
    </Provider>
  );
};

export { AccountContext, AccountProvider, Consumer as AccountConsumer };
