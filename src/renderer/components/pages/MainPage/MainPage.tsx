import MenuButton from "@components/atoms/MenuButton";
import { Stack, Box, Paper } from "@mui/material";
import React from "react";
import bg from "@images/Sprinkle.svg";
import logo from "@images/Logo2.png";
import CondorSoftLink from "@components/atoms/CondorSoftLink";
const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100vw",
        height: "100vh",
        p: 4,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack
        spacing={{ xs: 2, md: 10 }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper
          elevation={3}
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        >
          <div
            style={{ width: "100%", height: "100", backgroundColor: "red" }}
          ></div>
          <img src={logo} style={{ width: 540 }} />
        </Paper>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <MenuButton text="Ingresos" path="/entryspage" />
          <MenuButton text="Gastos" path="/gastoPage" />
          <MenuButton text="Presupuesto" path="/presupuestoPage" />
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <MenuButton text="Ver datos" path="/viewPage" />
          <MenuButton text="MENU1" path="/" />
        </Stack>
      </Stack>
      <Box sx={{ position: "absolute", bottom: 6, right: 6 }}>
        <CondorSoftLink />
      </Box>
    </Box>
  );
};
export default MainPage;
