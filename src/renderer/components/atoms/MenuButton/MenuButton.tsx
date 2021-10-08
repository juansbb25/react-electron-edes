import { Box, Typography } from "@material-ui/core";
import React from "react";
type MenuButtonProps = {
  text: string;
};
const MenuButton: React.FC<MenuButtonProps> = ({ text }) => {
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
      <Typography variant="h1" color="black" sx={{}}>
        {text}
      </Typography>
    </Box>
  );
};

export default MenuButton;
