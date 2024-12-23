import React from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";

export default function LinkPopUp() {
  const [open, setOpen] = React.useState(false);
  const [links, setLinks] = React.useState([]);

  const handleLinks = (e) => {
    setLinks(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setLinktoSession = () => {
    sessionStorage.setItem("links", links); 
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Link Ekle
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
            Linklerinizi "," ile ayırarak yazınız...
          </Typography>
          <TextField
            label="Linklerinizi ',' işareti ile ayırarak yazınız..."
            variant="outlined"
            value={links}
            onChange={handleLinks}
            placeholder="https://example.co"
          ></TextField>
          <Button onClick={setLinktoSession} sx={{ mt: 2 }} variant="contained">
            OK
          </Button>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            İptal
          </Button>
        </Box>
      </Modal>
    </div>
  );
}