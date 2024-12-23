import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useAPI from "../store/storeAPI";
import ListingCase from "../components/ListingCase";

const LawyerCases = () => {
  const { fetchData } = useAPI();
  const navigate = useNavigate();
  const [activate, setActivate] = React.useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [cases, setCases] = React.useState([]);
  const caseList = user?.cases || [];
  const [loading, setLoading] = React.useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    console.log("Logged out!");
    navigate("/");
  };

  React.useEffect(() => {
    const fetchCases = async () => {
      if(caseList.length === 0){
        return
      }
      setLoading(true);
      try {
        const responses = await Promise.all(
          caseList.map((item) =>
            fetchData(`/lawyer/getcasebyid/${item}`, "GET")
          )
        );
        const filteredCases = responses.filter((item)=> item.case_continue === activate);
        setCases(filteredCases);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [activate]);
  
  return (
    <Box sx={{ p: 2, mt: 2, textAlign: "center" }}>
      <Button
        style={{ marginBottom: "2%", marginLeft: "80%" }}
        color="secondary"
        variant="contained"
        onClick={handleLogout}
      >
        <AccountBoxIcon /> Çıkış Yap
      </Button>
      {/* Butonlar */}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        sx={{
          mb: 4,
          backgroundColor: "#1976d2",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Button
          variant={activate ? "" : "contained"}
          onClick={() => setActivate(true)}
        >
          Aktif Davalar
        </Button>
        <Button
          variant={activate ? "contained" : ""}
          onClick={() => setActivate(false)}
        >
          Geçmiş Davalar
        </Button>
      </Stack>

      {/* Dinamik İçerik */}
      <Box>
        <ListingCase cases={cases} loading={loading} />
      </Box>
    </Box>
  );
};

export default LawyerCases;
