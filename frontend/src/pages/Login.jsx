import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert, Paper } from "@mui/material";
import useAPI from "../store/storeAPI";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setData } = useAPI(); // Store'dan setData metodunu alın

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Önceki hatayı sıfırla

    try {
      // Store'un setData fonksiyonunu kullanarak login işlemi
      const response = await setData("/login", "POST", {
        user_name: username,
        password,
      });
      if (response?.token) {
        const newToken = JSON.stringify(response.token);
        const newUser = JSON.stringify(response.user);
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("user", newUser);

        // Role'ye göre yönlendirme
        if (response.user.role === "admin" || response.user.role === "Admin") {
          navigate("/admin/app");
        } else if (response.user.role === "user" || response.user.role === "User") {
          navigate("/lawyer/lawyer-cases");
        } else {
          setError("Geçersiz rol.");
        }
      } else {
        setError(response?.error || "Giriş başarısız.");
      }
    } catch (err) {
      console.error(err)
      setError("Giriş sırasında bir hata oluştu.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Giriş Yap
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Şifre"
            variant="outlined"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
