import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type CloseFormDialogProps = {
  handleSuccess: () => void;
  handleClose: () => void;
  open: boolean;
  title: string;
  contentText: string;
  warningReturnButtonText: string;
  successButtonText: string;
};
const CloseFormDialog: React.FC<CloseFormDialogProps> = ({
  handleClose,
  open,
  title,
  contentText,
  warningReturnButtonText,
  successButtonText,
  handleSuccess,
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
        <Button color="error" onClick={handleSuccess}>
          {warningReturnButtonText}
        </Button>
        <Button onClick={handleClose}>{successButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseFormDialog;
