import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UploadPopUp from "./UploadPopUp";
import useAPI from "../store/storeAPI";
import { DataContext } from "../store/DataContext";

const modalStyle = {
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

export default function CourtPopup({ open, handleClose, lawyerID, caseNum }) {
  const { updateData,data } = React.useContext(DataContext);
  const { setData } = useAPI();
  const [court, setCourt] = React.useState({
    case_number: caseNum,
    lawyer_id: lawyerID,
    court_number: "",
    court_name: "",
    docs: [],
    notes: "",
  });

  const handleChange = (field, value) => {
    setCourt((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitDoc = () => {
    const newDoc = JSON.parse(data.docs);
    setCourt((prev) => ({ ...prev, docs: newDoc }));
    updateData("docs", "")
  };

  const handleCaseSave = async (courtID) => {
    const newBody = { newCourt: courtID };
    try {
      const response = await setData(`/addtocase/${caseNum}`, "PATCH", newBody);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await setData("/admin/createcourt", "POST", court);
      handleCaseSave(response._id);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

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
          value={court.court_name}
          onChange={(e) => handleChange("court_name", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="court-number"
          label="Mahkeme Numarası"
          variant="outlined"
          value={court.court_number}
          onChange={(e) => handleChange("court_number", e.target.value)}
        />
        <UploadPopUp />
        <Button variant="contained" onClick={handleSubmitDoc}>
          Dokümanı onayla
        </Button>
        <TextField
          fullWidth
          margin="normal"
          id="notes"
          label="Notlar"
          multiline
          rows={4}
          variant="outlined"
          value={court.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          fullWidth
          sx={{ mt: 2 }}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
}
