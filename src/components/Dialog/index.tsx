import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DialogProps } from "./type";

const DialogComponent: React.FC<DialogProps> = ({
  open,
  title,
  setOpen,
  children,
  buttonConfirmText,
  handleButtonConfirm,
  disableClose,
}) => {
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!Boolean(disableClose) && (
          <Button onClick={handleClose}>fechar</Button>
        )}
        <Button onClick={handleButtonConfirm}>{buttonConfirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
