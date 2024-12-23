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
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchAllAdmins = async () => {
      setLoading(true);
      try {
        const response = await fetchData("/admin/getalladmins", "GET");
        setAdmins(response);
      } catch (error) {
        console.error("Yönetici listesi alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdmins();
  }, [fetchData]);

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
