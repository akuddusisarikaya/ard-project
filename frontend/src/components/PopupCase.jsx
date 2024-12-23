import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CasePopup = ({ open, onClose }) => {
    const navigate = useNavigate();

    // Başvuru türleri
    const apps = [
        "7",
        "5",
        
    ];

    const [applicantType, setApplicantType] = useState("");

    // Başvuru türü değişim işlemi
    const handleApp = (event, value) => {
        setApplicantType(value);
    };

    // Devam Et butonu işlemi
    const handleContinue = () => {
        if (applicantType) {
            navigate(`/admin/edit-case/${applicantType}`);
        } else {
            alert("Lütfen bir başvuru seçin!");
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="case-popup-title"
            aria-describedby="case-popup-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="case-popup-title" variant="h6" component="h2" gutterBottom>
                    Başvurular
                </Typography>

                <Autocomplete
                    id="applicant_type"
                    options={apps}
                    freeSolo
                    value={applicantType}
                    onChange={handleApp}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Başvuru"
                            variant="standard"
                            placeholder="Bir başvuru seçiniz..."
                        />
                    )}
                />

                <Box sx={{ mt: 3, textAlign: "right" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleContinue}
                    >
                        Devam Et
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CasePopup;
