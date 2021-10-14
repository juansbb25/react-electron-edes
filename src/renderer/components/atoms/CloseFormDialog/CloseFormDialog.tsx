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

type CloseFormDialogProps = {
  handleClose: () => void;
  open: boolean;
  title: string;
  contentText: string;
  warningReturnButtonText: string;
  successButtonText: string;
  path: string;
};
const CloseFormDialog: React.FC<CloseFormDialogProps> = ({
  handleClose,
  open,
  title,
  contentText,
  warningReturnButtonText,
  successButtonText,
  path,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to={path} style={{ textDecoration: "none" }}>
          <Button color="error">{warningReturnButtonText}</Button>
        </Link>
        <Button onClick={handleClose}>{successButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseFormDialog;
