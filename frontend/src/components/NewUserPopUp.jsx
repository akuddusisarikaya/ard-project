import React from "react";
import { Modal, Box, Button, TextField, MenuItem } from "@mui/material";
import useAPI from "../store/storeAPI";

export default function NewUserPopUp() {
  const { setData } = useAPI();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    user_name: "",
    role: "",
    password: "",
  });

  // Modal açma/kapama fonksiyonları
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Yeni kullanıcı ekleme fonksiyonu
  const handleNewUser = async () => {
    try {
      await setData("/createuser", "POST", user);
      handleClose(); // Kullanıcı eklendikten sonra modalı kapat
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
    }
  };

  // Input değişikliklerini yönetme fonksiyonu
  const handleChange = (event) => {
    const { name, value } = event.target; // id yerine name kullanıyoruz
    setUser((prevState) => ({
      ...prevState,
      [name]: value, // name özelliği ile state güncelleniyor
    }));
  };

  return (
    <div>
      {/* Yeni kullanıcı ekleme butonu */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        +
      </Button>

      {/* Kullanıcı ekleme modalı */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Form alanları */}
          <TextField
            label="İsim Soyisim"
            name="name"
            value={user.name}
            variant="standard"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Kullanıcı adı veya numarası"
            name="user_name"
            value={user.user_name}
            variant="standard"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            select
            label="Rol (Avukat/Admin)"
            name="role"
            value={user.role}
            variant="standard"
            fullWidth
            margin="normal"
            onChange={handleChange}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">Avukat</MenuItem>
          </TextField>
          <TextField
            label="Parola"
            name="password"
            type="password"
            value={user.password}
            variant="standard"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          {/* İşlem butonları */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="contained" color="success" onClick={handleNewUser}>
              OK
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              İptal
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
