import { Box, AppBar, Toolbar, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../theme";
import MainPage from "@components/pages/MainPage";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://material-ui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          <HashRouter>
            <>
              <AppBar position="fixed">
                <Toolbar>
                  <Link to="/">
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Home
                    </Typography>
                  </Link>
                  <Link to="/page1">
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Page 1
                    </Typography>
                  </Link>
                </Toolbar>
              </AppBar>
              <Toolbar />
            </>
            <div className="App">
              <Switch>
                <Route exact path="/" component={MainPage} />
              </Switch>
              <Switch>
                <Route exact path="/page1" component={Page1} />
              </Switch>
            </div>
          </HashRouter>
        </main>
      </Box>
    </ThemeProvider>
  );
}
