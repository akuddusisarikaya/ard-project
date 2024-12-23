import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Case() {
  const [applicationDate, setApplicationDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [lawyers, setLawyers] = useState([
    "John Doe",
    "Jane Smith",
    "Emily Davis",
    "Michael Johnson",
  ]);

  const [complaintCauses, setComplaintCauses] = useState([
    "Delayed Response",
    "Unprofessional Behavior",
    "Miscommunication",
    "Billing Issues",
  ]);

  const [followedLawyer, setFollowedLawyer] = useState(null);
  const [complaintCause, setComplaintCause] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate(); // Hook to navigate to another page

  const handleDateChange = (event) => {
    setApplicationDate(event.target.value);
  };

  const handleLawyerChange = (event, newValue) => {
    setFollowedLawyer(newValue);
  };

  const handleComplaintCauseChange = (event, newValue) => {
    setComplaintCause(newValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Document "${file.name}" uploaded successfully.`);
    }
  };

  const handleAddClick = () => {
    navigate("/list-applications"); // Navigate to ListApplication page
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        marginLeft: "-90%"
      }}
      noValidate
      autoComplete="off"
    >
      {/* First Name Input */}
      <TextField
        id="first-name"
        label="First Name"
        variant="standard"
        required
      />

      {/* Last Name Input */}
      <TextField
        id="last-name"
        label="Last Name"
        variant="standard"
        required
      />

      {/* Application Date */}
      <TextField
        id="application-date"
        label="Application Date"
        type="date"
        value={applicationDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />

      {/* Followed Lawyer Autocomplete */}
      <Autocomplete
        id="followed-lawyer"
        options={lawyers}
        freeSolo
        value={followedLawyer}
        onChange={handleLawyerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Followed Lawyer"
            variant="standard"
            placeholder="Select or type a lawyer..."
          />
        )}
      />

      {/* Cause of Complaint Autocomplete */}
      <Autocomplete
        id="cause-of-complaint"
        options={complaintCauses}
        freeSolo
        value={complaintCause}
        onChange={handleComplaintCauseChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cause of Complaint"
            variant="standard"
            placeholder="Select or type a cause..."
          />
        )}
      />

      {/* Document Upload */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" component="label">
          Upload Document
          <input
            type="file"
            hidden
            onChange={handleDocumentUpload}
          />
        </Button>
      </Box>

      {/* Description Text Area */}
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Add a description..."
        sx={{ width: "80%" }}
      />

      {/* Add Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}
