import React, {
  createContext,
  useState,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { useLocation } from "react-router-dom";

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

const DashboardProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const value: IDashboardContext = {
    menuOpen,
    setMenuOpen,
    drawerOpen,
    setDrawerOpen,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { DashboardContext, DashboardProvider, Consumer as DashboardConsumer };
