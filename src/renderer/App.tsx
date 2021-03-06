import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./theme";
import { HashRouter, Route, Switch } from "react-router-dom";
import MainPage from "@components/pages/MainPage";
import EntrysPage from "./components/pages/EntrysPage";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatabaseProvider from "@context/database";
import GastoPage from "@components/pages/GastoPage/GastoPage";
import PresupuestoPage from "@components/pages/PresupuestoPage";
import ViewPage from "@components/pages/ViewPage";
import DataPage from "@components/pages/DataPage";
import RubrosPage from "@components/pages/RubrosPage";

export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://material-ui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment} locale={"esES"}>
        <DatabaseProvider>
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <main>
              <HashRouter>
                <div className="App">
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/entrysPage" component={EntrysPage} />
                    <Route exact path="/gastoPage" component={GastoPage} />
                    <Route
                      exact
                      path="/presupuestoPage"
                      component={PresupuestoPage}
                    />
                    <Route exact path="/viewPage" component={ViewPage} />
                    <Route exact path="/dataPage" component={DataPage} />
                    <Route exact path="/rubroPage" component={RubrosPage} />
                  </Switch>
                </div>
              </HashRouter>
            </main>
          </Box>
        </DatabaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
