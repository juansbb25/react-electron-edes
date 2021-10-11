import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
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

export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://material-ui.com/customization/theming/
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatabaseProvider>
        <ThemeProvider theme={theme}>
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
                  </Switch>
                  <Switch>
                    <Route exact path="/entrysPage" component={EntrysPage} />
                  </Switch>
                  <Switch>
                    <Route exact path="/gastoPage" component={GastoPage} />
                  </Switch>
                  <Switch>
                    <Route
                      exact
                      path="/presupuestoPage"
                      component={PresupuestoPage}
                    />
                  </Switch>
                </div>
              </HashRouter>
            </main>
          </Box>
        </ThemeProvider>
      </DatabaseProvider>
    </LocalizationProvider>
  );
}
