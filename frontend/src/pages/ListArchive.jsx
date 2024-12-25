import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListingApps from "../components/ListingApps";
import useAPI from "../store/storeAPI";

export default function ListArchive() {
  const timeoutRef = React.useRef();
  const [activeContent, setActiveContent] = React.useState(0);
  const [applications, setApplications] = React.useState([]);

  const { fetchData } = useAPI();
  const [loading, setLoading] = React.useState(false);

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const response = await fetchData(
        "/admin/getuncasebleapplications",
        "GET"
      );
      if (response === 401) {
        window.location.reload();
      }
      clearTimeout(timeoutRef.current);
      setApplications(response);
    } catch (error) {
      window.location.reload;
      console.error(error);
    } finally {
      clearTimeout(timeoutRef.current);
      setLoading(false);
    }
  };
  React.useState(() => {
    timeoutRef.current = setTimeout(() => {
      window.location.reload(); // 10 saniye sonunda sayfayı yenile
    }, 10000);
    fetchAllApplications();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  // İçerikleri URL'ye göre kontrol eden fonksiyon

  function RenderApplicant({ applications, loading, content }) {
    var appforshow = applications;
    if (content === 0) {
      appforshow = applications;
    } else if (content === 1) {
      const filtredApplications = applications.filter(
        (item) => item.applicant_type === "Medya Kuruluşu"
      );
      appforshow = filtredApplications;
    } else if (content === 2) {
      const filtredApplications = applications.filter(
        (item) => item.applicant_type === "Sivil Toplum Kuruluşu"
      );
      appforshow = filtredApplications;
    } else if (content === 3) {
      const filtredApplications = applications.filter(
        (item) => item.applicant_type === "Baro Komisyonu"
      );
      appforshow = filtredApplications;
    } else if (content === 4) {
      const filtredApplications = applications.filter(
        (item) => item.applicant_type === "Kamu Kurumu"
      );
      appforshow = filtredApplications;
    }
    return (
      <ListingApps name={"Arşiv"} applications={appforshow} loading={loading} />
    );
  }

  // Buton Tıklama İşlemleri
  return (
    <Box sx={{ p: 2 }}>
      {/* Butonlar */}
      <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
        <Button onClick={() => setActiveContent(0)} variant="outlined">
          Hepsi
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setActiveContent(1)}
        >
          Medya Taraması
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setActiveContent(2)}
        >
          STK Verileri
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setActiveContent(3)}
        >
          Baro Komisyonları
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => setActiveContent(4)}
        >
          Kamu Kurumları
        </Button>
      </Stack>
      <Box>
        <RenderApplicant
          content={activeContent}
          applications={applications}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
