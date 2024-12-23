import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import storeAPI from "../store/storeAPI";

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

export default function CreateCasePopup({ open, handleClose, appID }) {
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyer, setSelectedLawyer] = useState("");
    const handledID = appID
    const [caseNum, setCaseNum] = useState("");

    const { fetchData } = storeAPI();

    // Avukatları API'den çek
    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await fetchData("/getAllLawyers", "GET");
                setLawyers(response);
            } catch (error) {
                console.error("Avukat listesi alınırken hata oluştu:", error);
            }
        };

        fetchLawyers();
    }, [fetchData]);

    const handleSelectChange = (event) => {
        setSelectedLawyer(event.target.value);
    };

    const handleSubmit = () => {
        const newForm = {
            application_number : handledID,
            lawyer: selectedLawyer,
            case_number : caseNum
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Dava Oluştur
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    id="case_number"
                    label="Dosya Numarası"
                    variant="outlined"
                />

                <TextField
                    select
                    label="Avukatlar"
                    value={selectedLawyer}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    onChange={handleSelectChange}
                >
                    {lawyers.length > 0 ? (
                        lawyers.map((lawyer) => (
                            <MenuItem key={lawyer._id} value={lawyer._id}>
                                {lawyer.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Avukat bulunamadı</MenuItem>
                    )}
                </TextField>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Oluştur
                    
                </Button>
            </Box>
        </Modal>
    );
}
