import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import FileUpload from "./FileUpload";

export default function UploadPopUp() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Dosya Yükle
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Dosyalarınızı yükleyiniz...
          </Typography>
          <FileUpload />
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            İptal
          </Button>
        </Box>
      </Modal>
    </div>
  );
}