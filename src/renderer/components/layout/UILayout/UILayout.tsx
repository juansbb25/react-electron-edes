import CloseFormDialog from "@components/atoms/CloseFormDialog";
import { RefObject } from "@components/atoms/InputsForm/InputsForm";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React, { useState, useRef } from "react";
import logo from "@images/Logo3.png";
import { useHistory } from "react-router-dom";
type UILayoutProps = {
  children: React.ReactElement;
  title: string;
  save?: boolean;
  buttonTitle?: string;
};

const UILayout: React.FC<UILayoutProps> = ({
  children,
  title,
  save = true,
  buttonTitle = "Guardar",
}) => {
  const history = useHistory();
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
          {save ? React.cloneElement(children, { ref: childRef }) : children}
        </Box>
        <CloseFormDialog
          open={open}
          handleClose={handleClose}
          title="¿Estás seguro que desea salir?"
          contentText="Si sale se perderá su progreso y no podrá recuperar los cambios"
          warningReturnButtonText="Salir"
          successButtonText="Cancelar"
          handleSuccess={() => history.push("/")}
        />
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
          {save && (
            <Button
              color="success"
              variant="contained"
              type="submit"
              style={{ width: 200 }}
              onClick={() => {
                childRef?.current?.submitForm();
              }}
            >
              {buttonTitle}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UILayout;
