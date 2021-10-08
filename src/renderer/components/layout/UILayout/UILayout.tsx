import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
type UILayoutProps = {
  children: React.ReactElement;
};
const UILayout: React.FC<UILayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: "auto",
      }}
    >
      <>{children}</>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            position: "absolute",
            bottom: 2,
            left: 2,
            width: 150,
            height: 50,
          }}
        >
          <Typography>Volver</Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default UILayout;
