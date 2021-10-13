import CloseFormDialog from "@components/atoms/CloseFormDialog";
import { RefObject } from "@components/atoms/InputsForm/InputsForm";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React, { useState, useRef } from "react";
import logo from "@images/Logo3.png";
type UILayoutProps = {
  children: React.ReactElement;
  title: string;
};

const UILayout: React.FC<UILayoutProps> = ({ children, title }) => {
  const childRef = useRef<RefObject>();
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
        padding: 2,
        background: "#dbdbdb",
      }}
    >
      <AppBar>
        <Toolbar>
          <img src={logo} style={{ width: 120 }} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Paper
        elevation={2}
        style={{ width: "100%", height: "100%" }}
        sx={{ padding: 5, overflow: "auto", boxShadow: 10, borderRadius: 5 }}
      >
        <Typography variant="h1" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Box
          sx={{
            paddingY: 4,
          }}
        >
          {React.cloneElement(children, { ref: childRef })}
        </Box>
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
          <Button
            color="success"
            variant="contained"
            type="submit"
            style={{ width: 200 }}
            onClick={() => childRef?.current?.submitForm()}
          >
            Guardar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UILayout;
