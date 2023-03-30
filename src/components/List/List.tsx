import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  SyntheticEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { getUser } from "../../utils";
import { ObjectId } from "mongodb";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export type UserType = {
  _id: ObjectId;
  __typename: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
type MenuItm = {
  name: string;
  pathname: string;
};
type ListProps = {
  arr: Array<MenuItm>;
  onLogout: (e: MouseEvent) => Promise<void>;
};
export default function List({ arr, onLogout }: ListProps): ReactElement {
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const curUser: UserType = getUser();
  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
            display: "inline-block",
            color: "#fff",
          }}
        >
          {largeDevice ? (
            <>
              Hello {curUser.firstName}
              <Typography
                variant="subtitle1"
                sx={{ textTransform: "capitalize" }}
              >
                My Profile
              </Typography>
            </>
          ) : (
            <>
              {open ? (
                <CloseIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
              )}
            </>
          )}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                marginTop: "20px",
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{ padding: 0, margin: "8px 0" }}
                  >
                    {arr?.map((itm: MenuItm, idx: number) => (
                      <MenuItem
                        key={`${itm}-${idx}`}
                        onClick={(e) => {
                          if (idx === arr.length - 1) {
                            onLogout(e);
                          } else {
                            history.push(`/${itm.pathname.toLowerCase()}`);
                          }

                          handleClose(e);
                        }}
                      >
                        {itm.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
