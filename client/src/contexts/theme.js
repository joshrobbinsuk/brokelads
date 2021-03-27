import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    primary: {
      light: "#ff7961",
      main: "#d32f2f",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const spacing = 8;

theme.overrides = {};
