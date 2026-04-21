import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();

const theme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: "#0071dc",
      dark: "#004f9a",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: {
      fontWeight: 400,
      fontSize: "0.75rem",
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "0.875rem",
      },
    },
    subtitle2: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { margin: "15px 0", width: "100%", alignSelf: "center" },
      },
    },
  },
});

export default theme;
