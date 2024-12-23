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
  const [lawyers, setLawyers] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllLawyers = async () => {
      setLoading(true);
      try {
        const response = await fetchData("/admin/getalllawyers", "GET");
        setLawyers(response);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLawyers();
  }, [fetchData]);

  // Lawyer detaylarına gitme
  const handleView = (lawyerName) => {
    navigate(`/admin/view-lawyer/${lawyerName}`);
  };

  // Lawyer düzenleme
  const handleEdit = (id) => {
    alert(`Edit lawyer with ID: ${id}`);
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
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleView(lawyer.name)}
                  >
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
