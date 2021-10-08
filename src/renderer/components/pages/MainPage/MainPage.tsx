import { Box } from "@material-ui/core";
import React from "react";
import MenuButton from "../../atoms/MenuButton";

const MainPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex-col", width: "100vw", height: "100vh", p: 4 }}>
      <Box
        sx={{
          display: "flex",
          height: 1 / 3,
          p: 1,
          justifyContent: "space-evenly",
        }}
      >
        <MenuButton text="MENU1" />
        <MenuButton text="MENU1" />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: 1 / 3,
          p: 1,
          justifyContent: "space-evenly",
        }}
      >
        <MenuButton text="MENU1" />
        <MenuButton text="MENU1" />
      </Box>
      <Box
        sx={{ display: "flex", height: 1 / 3, p: 1, justifyContent: "center" }}
      >
        <MenuButton text="MENU1" />
      </Box>
    </Box>
  );
};
export default MainPage;
