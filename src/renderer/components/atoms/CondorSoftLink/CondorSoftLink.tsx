import { Button, Typography } from "@mui/material";
import React from "react";
import electron from "electron";
const RayoLink: React.FC = () => {
  return (
    <Button
      onClick={() => electron.shell.openExternal("https://condor-soft.com/")}
    >
      <Typography
        fontSize={{ xs: "0.3rem", md: "1rem" }}
        sx={{ color: "#C4C4C4" }}
      >
        Powered by @condorSoft
      </Typography>
    </Button>
  );
};

export default RayoLink;
