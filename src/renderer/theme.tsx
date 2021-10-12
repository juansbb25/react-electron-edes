import { createTheme } from "@mui/material/styles";
import MillerText from "@fonts/MillerText.otf";
import GothamBookRegular from "@fonts/GothamBookRegular.otf";
// Create a Material-UI theme instance
// https://material-ui.com/customization/theming/
const theme = createTheme({
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
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Miller Text SC';
          src: local('Miller Text SC'), url(${MillerText}) format('opentype');
        }

        @font-face {
          font-family: 'Gotham Book';
          src: local('Gotham Book'), url(${GothamBookRegular}) format('opentype');}
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // apply theme's border-radius instead of component's default
          fontSize: "0.9rem",
          fontFamily: "Gotham Book",
        },
      },
    },
  },
  typography: {
    fontWeightMedium: 600,
    fontSize: 17,
    fontFamily: "Miller Text SC",
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
      fontSize: "2rem",
      fontWeight: 400,
      color: "#FFFFFF",
    },
  },
});
export default theme;
