import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function HomePage (){
    const navigate = useNavigate();
    return(
        <Box style={{margin : "25%"}}>
            <Typography variant="h4">ADR-BİLİŞM</Typography>
            <Typography variant="h4">HAK İHLALLERİ SAYFASI</Typography>
            <Button variant="contained" style={{margin : "5%"}} onClick={() => {navigate("/login")}}>
                Giriş Yap
            </Button>
            <Button variant="contained" style={{margin : "5%"}} onClick={() => {navigate("/application")}}>
                Başvuru Formu
            </Button>
        </Box>
    )
}