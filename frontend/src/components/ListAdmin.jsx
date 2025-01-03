import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchBar from "./Searchbar";
import storeAPI from "../store/storeAPI";

export default function ListAdmin() {
  const timeoutRef = React.useRef(null);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);

  const fetchAllAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetchData("/admin/getalladmins", "GET");
      if (response === 401) {
        window.location.reload();
      }
      setAdmins(response);
      clearTimeout(timeoutRef.current);
    } catch (error) {
      window.location.reload();
      console.error("Yönetici listesi alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
      clearTimeout(timeoutRef.current);
    }
  };

  React.useState(() => {
    timeoutRef.current = setTimeout(() => {
      window.location.reload(); // 10 saniye sonunda sayfayı yenile
    }, 3000);
    fetchAllAdmins();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  // Yönetici listesi filtreleme
  const filteredAdmins = (admins || []).filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        padding: 2,
        marginLeft: "0%",
        width: "80%",
      }}
    >
      {/* Başlık ve Arama Çubuğu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="div">
          Yönetici Listesi
        </Typography>
        {/* Arama Çubuğu */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Yönetici Tablosu */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Yönetici Adı</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin._id}>
                    {/* Yönetici Adı */}
                    <TableCell>{admin.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={1} align="center">
                    Yönetici bulunamadı
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
