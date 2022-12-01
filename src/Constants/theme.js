import { createTheme } from "@mui/material";
export const MAIN_THEME = createTheme({
  overrides: {
    // Name of the component
    MuiMenu: {
      list: {
        backgroundColor: "#000000",
      },
    },
  },
});
