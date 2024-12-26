import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserDeletePopUp({
  lawyerName,
  lawyerId,
  onConfirm,
  onCancel,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) onConfirm(lawyerId);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Sil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-dialog-title"
        aria-describedby="delete-confirmation-dialog-description"
      >
        <DialogTitle id="delete-confirmation-dialog-title">
          Silme İşlemini Onayla
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {lawyerName} kişisi tamamen silinecek.
          </DialogContentText>
          <DialogContentText id="delete-confirmation-dialog-description">
            Bu işlemi geri alamazsınız. Devam etmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Vazgeç
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
