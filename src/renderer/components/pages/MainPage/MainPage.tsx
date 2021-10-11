import MenuButton from "@components/atoms/MenuButton";
import { Box } from "@mui/material";
import React from "react";

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
        <MenuButton text="Ingresos" path="/entryspage" />
        <MenuButton text="Gastos" path="/gastoPage" />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: 1 / 3,
          p: 1,
          justifyContent: "space-evenly",
        }}
      >
        <MenuButton text="Presupuesto" path="/presupuestoPage" />
        <MenuButton text="Ver datos" path="/viewPage" />
      </Box>
      <Box
        sx={{ display: "flex", height: 1 / 3, p: 1, justifyContent: "center" }}
      >
        <MenuButton text="MENU1" path="/" />
      </Box>
    </Box>
  );
};
export default MainPage;
