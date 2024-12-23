import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import SearchBar from "../components/Searchbar";
import useAPI from "../store/storeAPI";
import ListingCase from "../components/ListingCase";

export default function ListCase() {
  const { fetchData } = useAPI();
  const [cases, setCases] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    var userRole = "";
    if(user?.role === "Admin" || user?.role === "admin"){
      userRole = "admin"
    }else{
      userRole = "lawyer"
    }
    const getAllCase = async () => {
      setLoading(true);
      try {
        const response = await fetchData(`/${userRole}/getallcases`, "GET");
        setCases(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAllCase();
  }, []);

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
