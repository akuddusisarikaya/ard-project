import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "../components/Searchbar";
import useAPI from "../store/storeAPI";
import ListingCase from "../components/ListingCase";

export default function ListCase() {
  const timeoutRef = React.useRef(null);
  const { fetchData } = useAPI();
  const [cases, setCases] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = React.useState("");

  const getAllCase = async () => {
    var userRole = "";
    if (user.role === "Admin" || user.role === "admin") {
      userRole = "admin";
    } else {
      userRole = "lawyer";
    }
    setLoading(true);
    try {
      const response = await fetchData(`/${userRole}/getallcases`, "GET");
      if (response === 401) {
        window.location.reload();
      }
      setCases(response);
      clearTimeout(timeoutRef.current);
    } catch (error) {
      window.location.reload();
      console.error(error);
    } finally {
      clearTimeout(timeoutRef.current);
      setLoading(false);
    }
  };

  React.useState(() => {
    timeoutRef.current = setTimeout(() => {
      window.location.reload(); // 10 saniye sonunda sayfayı yenile
    }, 5000);
    getAllCase();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  // Filtrelenmiş veriler
  const filteredCases = cases.filter((caseItem) =>
    caseItem.case_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Başlık ve SearchBar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="div">
          Dava Listesi
        </Typography>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </Box>

      {/* Case Tablosu */}
      <ListingCase cases={filteredCases} loading={loading} />
    </Box>
  );
}
