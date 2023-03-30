import React, {
  createContext,
  useState,
  FC,
  SetStateAction,
  Dispatch,
} from "react";

interface IDashboardContext {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<IDashboardContext>({
  menuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMenuOpen: () => {},
  drawerOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDrawerOpen: () => {},
});
const { Provider, Consumer } = DashboardContext;

const DashboardProvider: FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const value: IDashboardContext = {
    menuOpen,
    setMenuOpen,
    drawerOpen,
    setDrawerOpen,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { DashboardContext, DashboardProvider, Consumer as DashboardConsumer };
