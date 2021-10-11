import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
type MenuButtonProps = {
  text: string;
  path: string;
};
const MenuButton: React.FC<MenuButtonProps> = ({ text, path }) => {
  return (
    <Link to={path} style={{ textDecoration: "none", width: "100%" }}>
      <Box
        sx={{
          margin: "auto",
          width: "80%",
          height: 1,
          boxShadow: 10,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography variant="h2" sx={{}}>
          {text}
        </Typography>
      </Box>
    </Link>
  );
};

export default MenuButton;
