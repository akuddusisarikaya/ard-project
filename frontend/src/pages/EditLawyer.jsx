import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import storeAPI from "../store/storeAPI";
import ListingCase from "../components/ListingCase";
export default function EditLawyer() {
  const { lawyerId } = useParams(); // URL'den avukat ID'sini al
  const [lawyer, setLawyer] = useState({
    name: "",
    user_name: "",
    cases: [],
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [casesLoading, setCasesLoading] = useState(false);
  const [showCases, setShowCases] = useState(false);
  const [cases, setCases] = useState([]);
  const { fetchData } = storeAPI();
  // Avukat bilgilerini API'den çek
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetchData(
          `/admin/getuserbyid/${lawyerId}`,
          "GET"
        );
        setLawyer(response);
        if (response) {
          fetchLawyerCases(response);
        }
      } catch (error) {
        console.error("Avukat bilgileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
    const fetchLawyerCases = async (lawuser) => {
      setCasesLoading(true);
      const caseList = lawuser.cases;
      try {
        const responses = await Promise.all(
          caseList.map((item) => fetchData(`/admin/getcasebyid/${item}`, "GET"))
        );
        setCases(responses);
      } catch (error) {
        console.error(error);
      } finally {
        setCasesLoading(false);
      }
    };
  }, [lawyerId]);
  // Dava listesini göster/gizle
  const handleViewCases = () => {
    setShowCases(!showCases);
  };
  // Avukat bilgilerini düzenleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLawyer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Avukat bilgilerini kaydetme
  const handleSave = () => {
    console.log("Kaydedilen avukat bilgileri:", lawyer);
    // API ile PUT/POST isteği gönderin
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
        Avukat Düzenleme
      </Typography>
      {/* Avukat Bilgileri */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Ad Soyad"
          name="name"
          value={lawyer.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Kullanıcı Adı"
          name="user_name"
          value={lawyer.user_name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Şifre"
          name="password"
          onChange={handleInputChange}
          type="password"
          fullWidth
        />
        <TextField
          select
          label="Rol"
          name="role"
          defaultValue={lawyer.role}
          onChange={handleInputChange}
          fullWidth
        >
            <MenuItem label="Admin" value={"Admin"}>Admin</MenuItem>
            <MenuItem label="User" value = {"User"}>User</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </Box>
      {/* Dava Listesi Butonu */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleViewCases}
        sx={{ marginBottom: 2 }}
      >
        {showCases ? "Davaları Gizle" : "Dava Listesi"}
      </Button>
      {/* Dava Listesi */}
      {showCases && (
        <Box sx={{ marginTop: 2 }}>
          <ListingCase cases={cases} loading={casesLoading} />
        </Box>
      )}
    </Box>
  );
}
