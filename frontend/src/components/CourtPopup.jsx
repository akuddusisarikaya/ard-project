import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CourtPopup({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Mahkeme Bilgileri
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="court-name"
          label="Mahkeme Adı"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="court-number"
          label="Mahkeme Numarası"
          variant="outlined"
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Doküman Ekle
          <input type="file" hidden />
        </Button>
        <TextField
          fullWidth
          margin="normal"
          id="notes"
          label="Notlar"
          multiline
          rows={4}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={handleClose}
          fullWidth
          sx={{ mt: 2 }}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
}
                