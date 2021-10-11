import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./fonts/MillerText.otf";

declare module "@material-ui/core/Button" {
  interface ButtonPropsColorOverrides {
    error: true;
    info: true;
    success: true;
    warning: true;
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Setup root node where our React app will be attached to
const root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Render the app component
render(<App />, document.getElementById("root"));
