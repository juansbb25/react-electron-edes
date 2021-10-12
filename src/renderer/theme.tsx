import { createTheme } from "@mui/material/styles";
import { esES as xesES } from "@mui/x-data-grid";
import { esES } from "@mui/material/locale";
import { esES as coreEsES } from "@mui/material/locale";
// Create a Material-UI theme instance
// https://material-ui.com/customization/theming/
const theme = createTheme(
  {
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
      MuiButton: {},
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
  },
  esES,
  coreEsES,
  xesES
);

export default theme;
