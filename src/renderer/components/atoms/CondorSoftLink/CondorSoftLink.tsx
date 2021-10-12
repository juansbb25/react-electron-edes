import { Button, Typography } from "@mui/material";
import React from "react";
import electron from "electron";
const RayoLink: React.FC = () => {
  return (
    <Button
      onClick={() => electron.shell.openExternal("http://www.google.com")}
    >
      <Typography fontSize={{ xs: "0.3rem", md: "1rem" }}>
        Un software desarrollado por @condorSoft
      </Typography>
    </Button>
  );
};

export default RayoLink;
