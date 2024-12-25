import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import storeAPI from "../store/storeAPI";
import SearchBar from "./Searchbar";
export default function ListLawyer() {
  const timeoutRef = React.useRef(null)
  const [lawyers, setLawyers] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const fetchAllLawyers = async () => {
    setLoading(true);
    try {
      const response = await fetchData("/admin/getalllawyers", "GET");
      if(response === 401) {
        window.location.reload()
      }
      clearTimeout(timeoutRef.current);
      setLawyers(response);
    } catch (error) {
      window.location.reload();
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
      clearTimeout(timeoutRef.current);
    }
  };

    React.useState(() => {
      timeoutRef.current = setTimeout(() => {
        window.location.reload(); // 10 saniye sonunda sayfayı yenile
      }, 3000);
      fetchAllLawyers();
      return () => {
        clearTimeout(timeoutRef.current);
      };
    });

  // Lawyer detaylarına gitme
  const handleView = (lawyerName) => {
    navigate(`/admin/view-lawyer/${lawyerName}`);
  };

  // Lawyer düzenleme
  const handleEdit = (id) => {
    navigate(`/admin/edit-lawyer/${id}`);
  };

  // Lawyer silme
  const handleDelete = (id) => {
    setLawyers((prevLawyers) =>
      prevLawyers.filter((lawyer) => lawyer._id !== id)
    );
  };

  // Filtrelenmiş Lawyer listesi
  const filteredLawyers = (lawyers || []).filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Başlık */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="div">
          Avukat Listesi
        </Typography>

        <SearchBar
          placeholder="Avukat Ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Lawyer Tablosu */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avukat Adı</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {filteredLawyers.map((lawyer) => (
                <TableRow key={lawyer._id}>
                  {/* Lawyer Name */}
                  <TableCell>
                    {lawyer.name}
                  </TableCell>

                  {/* İşlemler */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(lawyer._id)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(lawyer._id)}
                    >
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
