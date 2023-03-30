import React, { ReactElement, MouseEvent } from "react";
import { useMutation } from "@apollo/client";
import { deleteUser } from "../../utils";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Badge } from "@mui/material";
import "./Toolbar.css";
import List from "../List";
import { LOGOUT } from "../../apollo-client/mutations";

type ToolbarProps = {
  total: number;
  viewCartDrawer: () => void;
};
type MenuItem = {
  name: string;
  pathname: string;
};

function Toolbar({ viewCartDrawer, total = 0 }: ToolbarProps): ReactElement {
  const menuItems: Array<MenuItem> = [
    { name: "Dashboard", pathname: "home" },
    { name: "Orders", pathname: "orders" },
    { name: "Sign Out", pathname: "logout" },
  ];

  const [logout] = useMutation(LOGOUT);

  const handleLogout = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const { data } = await logout();
    if (data && data.logout) {
      deleteUser();
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <List arr={menuItems} onLogout={handleLogout} />
        <Box
          onClick={viewCartDrawer}
          sx={{
            marginRight: { xs: "15%", sm: "10%", xl: "4%" },
            "&:hover": { cursor: "pointer" },
          }}
        >
          <Badge
            showZero
            badgeContent={total}
            color="info"
            sx={{
              "&.MuiBadge-root": {},
            }}
          >
            <ShoppingCartOutlinedIcon htmlColor="#fff" fontSize="large" />
          </Badge>
        </Box>
      </Box>
    </nav>
  );
}

export default Toolbar;
