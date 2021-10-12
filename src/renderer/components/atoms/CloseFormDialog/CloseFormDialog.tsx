import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type CloseFormDialogProps = { handleClose: () => void; open: boolean };
const CloseFormDialog: React.FC<CloseFormDialogProps> = ({
  handleClose,
  open,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Estás seguro seguro que desea salir?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si sale se perderá su progreso y no podrá recuperar los cambios
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color="error">Salir</Button>
        </Link>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseFormDialog;
