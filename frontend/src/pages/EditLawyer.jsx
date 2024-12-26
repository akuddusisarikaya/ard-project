import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
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
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [casesLoading, setCasesLoading] = useState(false);
  const [showCases, setShowCases] = useState(false);
  const [cases, setCases] = useState([]);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [passwordUpdate, setpasswordUpdate] = React.useState(false);
  const [oldPasswordView, setOldPasswordView] = React.useState(false);
  const [newPasswordView, setNewPasswordView] = React.useState(false);
  const { fetchData, setData } = storeAPI();

  const handlePasswordView = () => {
    setpasswordUpdate(!passwordUpdate);
  };

  const handleOldPasswordView = () => {
    setOldPasswordView(!oldPasswordView);
  };

  const handleNewPasswordView = () => {
    setNewPasswordView(!newPasswordView);
  };

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetchData(
          `/admin/getuserbyid/${lawyerId}`,
          "GET"
        );
        setLawyer(response || {});
        if (response?.cases) {
          await fetchLawyerCases(response);
        }
      } catch (error) {
        console.error("Avukat bilgileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLawyerCases = async (lawuser) => {
      setCasesLoading(true);
      const caseList = lawuser.cases || [];
      try {
        const responses = await Promise.all(
          caseList
            .filter((item) => item !== null && item !== undefined)
            .map((item) => fetchData(`/admin/getcasebyid/${item}`, "GET"))
        );
        setCases(responses);
      } catch (error) {
        setCases([]);
        console.error("Error fetching cases:", error);
      } finally {
        setCasesLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId]);

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassWord = (e) => {
    setNewPassword(e.target.value);
  };

  const handleViewCases = () => {
    setShowCases(!showCases);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLawyer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await setData(
        `/admin/patchuser/${lawyerId}`,
        "PATCH",
        lawyer
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.history.back();
    }
  };
  const handleChangePassword = async () => {
    setLoading(true);
    const newPasswordBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    try {
      const response = await setData(
        `/admin/changePassword/${lawyerId}`,
        "PATCH",
        newPasswordBody
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setOldPassword("");
      setNewPassword("");
      setLoading(false);
      setpasswordUpdate(false);
      window.location.reload();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
        Avukat Düzenleme
      </Typography>
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
          select
          label="Rol"
          name="role"
          defaultValue={lawyer.role}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordView}
        >
          Şifre değiştir
        </Button>
        {passwordUpdate && (
          <Box>
            <TextField
              style={{ width: "50%" }}
              onChange={handleOldPassword}
              value={oldPassword}
              type={oldPasswordView ? "text" : "password"}
              label="Eski parola"
            ></TextField>
            <Button onClick={handleOldPasswordView}>
              {oldPasswordView ? "Gizle" : "Göster"}
            </Button>
            <br />
            <br />
            <TextField
              style={{ width: "50%" }}
              onChange={handleNewPassWord}
              value={newPassword}
              type={newPasswordView ? "text" : "password"}
              label="Yeni parola"
            ></TextField>
            <Button onClick={handleNewPasswordView}>
              {newPasswordView ? "Gizle" : "Göster"}
            </Button>
            <br />
            <br />
            <Button variant="contained" onClick={handleChangePassword}>
              Parolayı değiştir
            </Button>
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </Box>
      {casesLoading ? (
        <CircularProgress />
      ) : cases.length > 0 ? (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewCases}
            sx={{ marginBottom: 2 }}
          >
            {showCases ? "Davaları Gizle" : "Dava Listesi"}
          </Button>
          {showCases && (
            <Box sx={{ marginTop: 2 }}>
              <ListingCase cases={cases} loading={casesLoading} />
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Bu avukata ait dava bulunmamaktadır.
        </Typography>
      )}
    </Box>
  );
}
