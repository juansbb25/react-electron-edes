import { createMuiTheme } from "@material-ui/core/styles";

// Create a Material-UI theme instance
// https://material-ui.com/customization/theming/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003C71",
    },
    secondary: {
      main: "#9575CD",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontWeightMedium: 600,
    fontSize: 17,
    h1: {
      fontSize: "2.2rem",
      fontWeight: 400,
      color: "#003C71",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#000000",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 400,
      color: "#FFFFFF",
    },
  },
});

export default theme;
