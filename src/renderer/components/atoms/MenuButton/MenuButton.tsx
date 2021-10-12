import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
type MenuButtonProps = {
  text: string;
  path: string;
};
const MenuButton: React.FC<MenuButtonProps> = ({ text, path }) => {
  return (
    <Link to={path} style={{ textDecoration: "none", width: "100%" }}>
      <Button variant="contained" sx={{ width: 250, height: 80 }}>
        {text}
      </Button>
    </Link>
  );
};

export default MenuButton;
