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
        {"Esta seguro que desea cerrar?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si cierra se perdera su progreso y no podra volver
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="success"
          variant="contained"
          sx={{ marginX: 2 }}
        >
          Volver
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            onClick={handleClose}
            color="error"
            variant="outlined"
            sx={{ marginX: 2 }}
          >
            Salir
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default CloseFormDialog;
