import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PopupArchive({ onClose }) {
  const [selectedarchive, setSelectedarchive] = useState("");

  const archives = [
    "Medya Taraması",
    "STK Verileri",
    "Baro Komisyonları",
    "Kamu Kurumları",
  ]; // Örnek kurum listesi

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Arşivleme Onayı
        </Typography>
        <Autocomplete
          id="applicant_type"
          options={archives} // Kurumlar listesi
          freeSolo
          value={selectedarchive}
          onChange={(event, newValue) => setSelectedarchive(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Arşiv Türü"
              variant="standard"
              placeholder="Bir arşiv türü giriniz"
            />
          )}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            alert(`Arşivlendi! Seçilen kurum: ${selectedarchive}`);
            onClose();
          }}
          sx={{ mt: 2 }}
        >
          Onayla
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ mt: 2, ml: 2 }}
        >
          İptal
        </Button>
      </Box>
    </Modal>
  );
}
