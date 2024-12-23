import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CheckBox from "@mui/material/Checkbox";
import { FormGroup, FormControlLabel, Typography } from "@mui/material";

export default function ApplicationForm() {
  const caseCategories = [
    "Aile ve Özel Yaşam Hakkı",
    "Ayrımcılık",
    "Basın Özgürlüğü",
    "Kadına Karşı Şiddet ve Taciz",
    "Çocuğa Karşı Şiddet ve Taciz",
    "Örgütlenme Özgürlüğü",
    "İşkence ve Kötü Muamele",
    "Eğitim Hakkı",
    "Düşünce ve İfade Özgürlüğü",
  ];
  const applicantTypes = [
    "Medya",
    "Sivil Toplum Kuruluşu",
    "Baro Komisyonu",
    "Kamu Kurumu",
  ];
  const [appNumber, setAppNumber] = React.useState("");
  const [appDate, setAppDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [applicantName, setApplicantName] = React.useState("");
  const [applicantFamName, setApplicantFamName] = React.useState("");
  const [applicantIDNum, setApplicantIDNum] = React.useState("");
  const [applicantPhone, setApplicantPhone] = React.useState("");
  const [applicantEmail, setApplicantEmail] = React.useState("");
  const [applicantAddress, setApplicantAddress] = React.useState("");
  const [caseCategory, setCaseCategory] = React.useState("");
  const [explantation, setExplantation] = React.useState("");
  const [selfApplicant, setSelfApplicant] = React.useState(false);
  const [applicantType, setApplicantType] = React.useState("");
  const [applicant, setApplicant] = React.useState("");
  const [docs, setDocs] = React.useState([]);
  const [links, setLinks] = React.useState([]);

  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setAppDate(event.target.value);
  };
  const handleAppNumber = (e) => {
    setAppNumber(e.target.value);
  };
  const handleApplicantName = (e) => {
    setApplicantName(e.target.value);
  };
  const handleApplicantFamName = (e) => {
    setApplicantFamName(e.target.value);
  };
  const handleApplicantIDNum = (e) => {
    const value = e.target.value;

    if (/^\d{0,11}$/.test(value)) {
      setApplicantIDNum(value);
    }
  };
  const handleApplicantPhone = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setApplicantPhone(value);
    }
  };
  const handleApplicantEmail = (e) => {
    setApplicantEmail(e.target.value);
  };
  const handleApplicantAddress = (e) => {
    setApplicantAddress(e.target.value);
  };

  const handleCaseCategory = (e) => {
    setCaseCategory(e.target.value);
  };

  const handleExplantation = (e) => {
    setExplantation(e.target.value);
  };

  const handleSelfApplicant = () => {
    setSelfApplicant(!selfApplicant);
  };

  const handleApplicantType = (e) => {
    setApplicantType(e.target.value);
  };

  const handleApplicant = (e) => {
    setApplicant(e.target.value);
  };

  const handleLinks = (e) => {
    const value = e.target.value.split(",");
    setLinks(value);
  };

  const handleAddClick = () => {
    const formContent  = {
        application_number : appNumber,
        application_date : appDate,
        applicant_name : applicantName,
        applicant_family_name : applicantFamName,
        applicant_id : applicantIDNum,
        applicant_phone : applicantPhone,
        applicant_address : applicantAddress,
        case_category : caseCategory,
        explantation : explantation,
        self_applicant : selfApplicant,
        applicant_type : applicantType,
        applicant : applicant,
        docs : docs,
        links : links
    }
    //navigate("/list-applications");
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
        marginLeft: "-10%",
      }}
      noValidate
      autoComplete="off"
    >
      
      {/* First Name Input */}
      <TextField
        onChange={handleApplicantName}
        id="first-name"
        label="İsim"
        variant="standard"
        required
      />

      {/* Last Name Input */}
      <TextField
        onChange={handleApplicantFamName}
        id="last-name"
        label="Soyisim"
        variant="standard"
        required
      />

      {/* Application Date */}
      <TextField
        id="application-date"
        label="Başvuru Tarihi"
        type="date"
        value={appDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />

      <TextField
        id="TC_number"
        label="TC Kimlik Numarası"
        variant="standard"
        value={applicantIDNum}
        onChange={handleApplicantIDNum}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 11,
        }}
        helperText="Lütfen 11 haneli TC Kimlik Numaranızı giriniz."
        fullWidth
      />

      <TextField
        id="phone_number"
        label="Telefon Numarası"
        variant="standard"
        value={applicantPhone}
        onChange={handleApplicantPhone}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 10,
        }}
        helperText="Lütfen 10 haneli telefon numaranızı giriniz."
        fullWidth
      />

      <TextField
        id="email"
        label="E-posta"
        variant="standard"
        value={applicantEmail}
        onChange={handleApplicantEmail}
        type="email"
        required
      />
      <TextField
        id="adress"
        label="Adres"
        multiline
        rows={4}
        variant="outlined"
        value={applicantAddress}
        onChange={handleApplicantAddress}
        placeholder="Add a description..."
        sx={{ width: "80%" }}
        required
      />

      <h5>Başvuruyu oluşturan : </h5>
      <FormGroup>
        <FormControlLabel
          label="Kendisi"
          control={
            <CheckBox
              label="Kendisi"
              checked={selfApplicant}
              onChange={handleSelfApplicant}
            />
          }
        />
      </FormGroup>

      {selfApplicant === false ? (
        <div>
          <Autocomplete
            id="applicant_type"
            options={applicantTypes}
            freeSolo
            value={applicantType}
            onChange={handleApplicantType}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Başvuru Oluşturan Kurum, Kuruluş"
                variant="standard"
                placeholder="Bir kurum, kuruluş seçiniz..."
              />
            )}
          />
          <TextField
            variant="standard"
            id="applicant"
            value={applicant}
            onChange={handleApplicant}
            label="Başvuruyu Oluşturan Kurum, Kuruluş İsmi"
          />
        </div>
      ) : (
        <div></div>
      )}

      <Autocomplete
        id="cause-of-complaint"
        options={caseCategories}
        freeSolo
        value={caseCategory}
        onChange={handleCaseCategory}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Yakınma(İhlal) Nedeni"
            variant="standard"
            placeholder="Bir ihlal nedeni seçiniz..."
          />
        )}
      />

      {/* Description Text Area */}
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        value={explantation}
        onChange={handleExplantation}
        placeholder="Add a description..."
        sx={{ width: "80%" }}
      />

      {/* Add Button */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Ekle
        </Button>
      </Box>
    </Box>
  );
}