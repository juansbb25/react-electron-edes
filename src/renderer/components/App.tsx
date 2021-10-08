import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../theme";
import { HashRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DatabaseProvider from "../context/database";
export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://material-ui.com/customization/theming/
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
                  <Route exact path="/page1" component={MainPage} />
                </Switch>
              </div>
            </HashRouter>
          </main>
        </Box>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
