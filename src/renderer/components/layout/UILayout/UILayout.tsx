import { Box, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
type UILayoutProps = {
  children: React.ReactElement;
};
const UILayout: React.FC<UILayoutProps> = ({ children }) => {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <>{children}</>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 2,
            left: 2,
            width: 150,
            height: 50,
          }}
        ></Button>
      </Link>
    </Box>
  );
};

export default UILayout;
