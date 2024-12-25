import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import {
  FormGroup,
  FormControlLabel,
  Typography,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../store/DataContext";
import useAPI from "../store/storeAPI";
import LinkPopUp from "../components/LinkPopUp";
import UploadPopUp from "../components/UploadPopUp";

const caseCategories = [
  {
    key: 1,
    value: "Aile ve Özel Yaşam Hakkı",
    label: "Aile ve Özel Yaşam Hakkı",
  },
  {
    key: 2,
    value: "Ayrımcılık",
    label: "Ayrımcılık",
  },
  {
    key: 3,
    value: "Basın Özgürlüğü",
    label: "Basın Özgürlüğü",
  },
  {
    key: 4,
    value: "Kadına Karşı Şiddet ve Taciz",
    label: "Kadına Karşı Şiddet ve Taciz",
  },
  {
    key: 5,
    value: "Çocuğa Karşı Şiddet ve Taciz",
    label: "Çocuğa Karşı Şiddet ve Taciz",
  },
  {
    key: 6,
    value: "Örgütlenme Özgürlüğü",
    label: "Örgütlenme Özgürlüğü",
  },
  {
    key: 7,
    value: "İşkence ve Kötü Muamele",
    label: "İşkence ve Kötü Muamele",
  },
  {
    key: 8,
    value: "Eğitim Hakkı",
    label: "Eğitim Hakkı",
  },
  {
    key: 9,
    value: "Düşünce ve İfade Özgürlüğü",
    label: "Düşünce ve İfade Özgürlüğü",
  },
];
const applicantTypes = [
  {
    key: 1,
    value: "Medya Kuruluşu",
    label: "Medya Kuruluşu",
  },
  {
    key: 2,
    value: "Sivil Toplum Kuruluşu",
    label: "Sivil Toplum Kuruluşu",
  },
  {
    key: 3,
    value: "Baro Komisyonu",
    label: "Baro Komisyonu",
  },
  {
    key: 4,
    value: "Kamu Kurumu",
    label: "Kamu Kurumu",
  },
];

export default function Application() {
  const [role, setUserRole] = React.useState("User");
  const { data, updateData } = React.useContext(DataContext);
  const size = "app-form-general";
  const navigate = useNavigate();
  const { setData } = useAPI();
  const [formState, setFormState] = React.useState({
    application_approver: "",
    caseble: true,
    case_id: "",
    application_number: "",
    application_date: new Date().toISOString().split("T")[0],
    applicant_name: "",
    applicant_family_name: "",
    applicant_id: "",
    applicant_phone: "",
    applicant_email: "",
    applicant_address: "",
    case_category: "",
    explantation: "",
    self_applicant: false,
    applicant_type: "",
    applicant: "",
    docs: [],
    links: [],
    status: "Pending",
  });

  const controlEn = false;

  const user = JSON.parse(sessionStorage.getItem("user"));
  React.useEffect(() => {
    if (!user) {
      setUserRole("User");
    } else if (user.role === "Admin") {
      setUserRole("Admin");
    }
  }, []);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formState.applicant_name || !formState.applicant_family_name) {
      alert("Lütfen gerekli alanları doldurunuz.");
      return false;
    }
    if (!/^\d{11}$/.test(formState.applicant_id)) {
      alert("TC Kimlik Numarası 11 haneli olmalıdır.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formState.applicant_phone)) {
      alert("Telefon numarası 10 haneli olmalıdır.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formState.applicant_email)) {
      alert("Geçerli bir e-posta adresi giriniz.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    var docsData = [""];
    var linksData = [""];
    if (data.docs?.length > 0) {
      docsData = JSON.parse(data.docs);
    }
    if (data.links?.length > 0) {
      linksData = data.links.split(",");
    }

    const formData = {
      ...formState,
      docs: docsData || [],
      links: linksData || [],
    };
    try {
      const response = await setData("/creatapplication", "POST", formData);
      if (!response?.newApplication?._id?.length) {
        alert(error);
        return error;
      }
      alert("Başvuru oluşturuldu");
      navigate(0);
    } catch (error) {
      return error;
    }finally{
      updateData("docs", "");
      updateData("links", "");
    }
    // Navigate or submit logic here
    //navigate("/success");
  };

  return (
    <Box
      component="form"
      className={size}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4">Başvuru Formu</Typography>
      <br />

      {role === "Admin" ? (
        <TextField
          variant="standard"
          label="Başvuru Numarası"
          value={formState.application_number}
          onChange={(e) => handleChange("appNumber", e.target.value)}
        />
      ) : (
        <> </>
      )}

      <TextField
        variant="standard"
        label="İsim"
        value={formState.applicant_name}
        onChange={(e) => handleChange("applicant_name", e.target.value)}
        required
        disabled={controlEn}
      />
      <TextField
        variant="standard"
        label="Soyisim"
        value={formState.applicant_family_name}
        onChange={(e) => handleChange("applicant_family_name", e.target.value)}
        required
        disabled={controlEn}
      />
      <TextField
        variant="standard"
        label="Başvuru Tarihi"
        type="date"
        value={formState.application_date}
        onChange={(e) => handleChange("application_date", e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        disabled={controlEn}
      />
      <TextField
        variant="standard"
        label="TC Kimlik Numarası"
        value={formState.applicant_id}
        onChange={(e) => handleChange("applicant_id", e.target.value)}
        inputProps={{ maxLength: 11 }}
        helperText="Lütfen 11 haneli TC Kimlik Numaranızı giriniz."
        disabled={controlEn}
      />
      <TextField
        variant="standard"
        disabled={controlEn}
        label="Telefon Numarası"
        value={formState.applicant_phone}
        onChange={(e) => handleChange("applicant_phone", e.target.value)}
        inputProps={{ maxLength: 10 }}
        helperText="Lütfen 10 haneli telefon numaranızı giriniz."
      />
      <TextField
        variant="standard"
        label="E-posta"
        value={formState.applicant_email}
        onChange={(e) => handleChange("applicant_email", e.target.value)}
        type="email"
        required
        disabled={controlEn}
      />
      <TextField
        variant="standard"
        label="Adres"
        multiline
        rows={4}
        value={formState.applicant_address}
        onChange={(e) => handleChange("applicant_address", e.target.value)}
        disabled={controlEn}
      />

      <FormGroup>
        <br></br>
        <FormControlLabel
          disabled={controlEn}
          control={
            <CheckBox
              checked={formState.self_applicant}
              onChange={(e) => handleChange("self_applicant", e.target.checked)}
            />
          }
          label="Başvuru Kendisi Tarafından Yapıldı"
        />
      </FormGroup>

      {!formState.self_applicant && (
        <>
          <TextField
            disabled={controlEn}
            select
            variant="standard"
            label="Başvuru Oluşturan Kurum"
            value={formState.applicant_type}
            onChange={(e) => handleChange("applicant_type", e.target.value)}
          >
            {applicantTypes.map((type) => (
              <MenuItem key={type.key} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            disabled={controlEn}
            variant="standard"
            label="Kurum Adı"
            value={formState.applicant}
            onChange={(e) => handleChange("applicant", e.target.value)}
          />
        </>
      )}

      <TextField
        disabled={controlEn}
        select
        label="Yakınma Nedeni"
        variant="standard"
        value={formState.case_category}
        onChange={(e) => handleChange("case_category", e.target.value)}
      >
        {caseCategories.map((category) => (
          <MenuItem key={category.key} value={category.value}>
            {category.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        disabled={controlEn}
        variant="standard"
        label="Açıklama"
        multiline
        rows={4}
        value={formState.explantation}
        onChange={(e) => handleChange("explantation", e.target.value)}
      />

      <br />
      <LinkPopUp />
      <br />
      <UploadPopUp />
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        {size === "app-form-general" ? "Başvuru Gönder" : "Kaydet"}
      </Button>
    </Box>
  );
}
