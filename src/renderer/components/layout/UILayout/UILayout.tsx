import CloseFormDialog from "@components/atoms/CloseFormDialog";
import { Box, Button, Stack, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
type UILayoutProps = {
  children: React.ReactElement;
  title: string;
};
const UILayout: React.FC<UILayoutProps> = ({ children, title }) => {
  const [open, isOpen] = useState(false);
  const handleClose = () => {
    isOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        m: "auto",
        overflow: "auto",
      }}
    >
      <Typography variant="h1">{title}</Typography>
      <>{children}</>
      <CloseFormDialog open={open} handleClose={handleClose} />
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{
            bottom: 2,
            left: 40,
            width: 150,
            height: 50,
          }}
          startIcon={<ArrowBack />}
          onClick={() => isOpen(true)}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );
};

export default UILayout;
