import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
type MenuButtonProps = {
  text: string;
  path: string;
};
const MenuButton: React.FC<MenuButtonProps> = ({ text, path }) => {
  return (
    <Box
      sx={{
        width: "40%",
        height: 1,
        boxShadow: 10,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        bgcolor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Typography variant="h1" color="black" sx={{}}>
          {text}
        </Typography>
      </Link>
    </Box>
  );
};

export default MenuButton;
