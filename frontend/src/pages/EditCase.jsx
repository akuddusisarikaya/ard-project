import React, { useEffect, useState } from "react";
import "../App.css";
import { TextField, Box, Typography, Button, Modal } from "@mui/material";
import CourtPopup from "../components/CourtPopup";
import { useParams, useNavigate } from "react-router-dom";
import useAPI from "../store/storeAPI";
import ShowDocs from "../components/ShowDocs";
import ShowCourts from "../components/ShowCourts";
import UploadPopUp from "../components/UploadPopUp";
import ShowApplication from "../components/ShowApplication";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const EditCase = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const { caseNo } = useParams();
  const { fetchData } = useAPI();
  // Modal durumları
  const [courtModalOpen, setCourtModalOpen] = useState(false);
  const [caseInfo, setCaseInfo] = React.useState({});
  const [lawyerInfo, setLawyerInfo] = React.useState({});
  const [courtModal, setCourtModal] = React.useState(false);
  const [docModal, setDocModal] = React.useState(false);
  const [appModal, setAppModal] = React.useState(false);
  const [display, setDisplay] = React.useState("");

  useEffect(() => {
    if (user.role === "Admin" || user.role === "admin") {
      setDisplay("");
    } else {
      setDisplay("lawyerDisplay");
    }
  });

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    console.log("Logged out!");
    navigate("/");
  };

  const handleAppModal = () => {
    setAppModal(!appModal);
  };

  const handleCourtModal = () => {
    setCourtModal(!courtModal);
  };
  const handleDocModal = () => {
    setDocModal(!docModal);
  };
  const showAppForm = () => {
    navigate(`/admin/showapp/${caseInfo.application_number}`);
  };

  // Modal açma ve kapama fonksiyonları
  const handleCourtModalOpen = () => setCourtModalOpen(true);
  const handleCourtModalClose = () => setCourtModalOpen(false);

  React.useEffect(() => {
    const getCase = async () => {
      try {
        const response = await fetchData(`/gettestcase/${caseNo}`, "GET");
        setCaseInfo(response);
        if (user.role === "Admin" || user.role === "admin") {
          if (response.lawyer) {
            const lawRes = await fetchData(
              `/getuserbyid/${response.lawyer}`,
              "GET"
            );
            setLawyerInfo(lawRes);
          }
        }
        setLawyerInfo(user);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };
    getCase();
  }, []);

  return (
    <Box className={display} sx={{}}>
      {user.role !== "Admin" && user.role !== "admin" ? (
        <>
          <Box style={{display : "flex"}}>
            <Button variant="contained" onClick={() => navigate(-1)} style={{ marginLeft: "-10%", marginBottom: "2%" }}>
              Geri Dön
            </Button>
            <Button
              style={{ marginBottom: "2%", marginLeft: "80%" }}
              color="secondary"
              variant="contained"
              onClick={handleLogout}
            >
              <AccountBoxIcon /> Çıkış Yap
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Box>
        <div
          style={{
            marginLeft: "-20%",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          <div>
            <h3>Dosya Numarası</h3>
            <TextField
              variant="outlined"
              disabled
              value={caseInfo.case_number}
            />
          </div>
          <div>
            <h3>Dava Başlangıç Tarihi</h3>
            <TextField
              variant="outlined"
              disabled
              value={caseInfo.case_start_date}
            />
          </div>
          <div>
            <h3>Dava Bitiş Tarihi</h3>
            <TextField
              variant="outlined"
              disabled
              value={caseInfo.case_end_date}
            />
          </div>
          <div>
            <h3>Dava Durumu</h3>
            <TextField
              variant="outlined"
              disabled
              value={caseInfo.case_contiue ? "Sonuçlandı" : "Devam Ediyor"}
            />
          </div>
          <div>
            <h3>Avukat</h3>
            <TextField variant="outlined" disabled value={lawyerInfo.name} />
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          padding: "5%",
          margin: "5%",
          ml: "-20%",
        }}
      >
        {/* Sol Taraf: Form */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          <Button onClick={handleAppModal} variant="contained" color="primary">
            {appModal ? "Başvuruyu Gizle" : "Başvuruyu Görüntüle"}
          </Button>
          {appModal ? (
            <>
              {caseInfo.application_number?.length > 0 && (
                <ShowApplication appID={caseInfo.application_number} />
              )}
            </>
          ) : (
            <></>
          )}

          <Typography variant="h5" component="h1" textAlign="center">
            Mahkemeler
          </Typography>
          <Button
            onClick={handleCourtModal}
            variant="contained"
            color="primary"
          >
            {" "}
            {courtModal ? "Mahkemeleri Kapat" : "Mahkemeleri Görüntüle"}
          </Button>
          {courtModal ? <ShowCourts courtList={caseInfo.courts} /> : <></>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCourtModalOpen}
          >
            Mahkeme Ekle
          </Button>
          <Button onClick={handleDocModal} variant="contained" color="primary">
            {docModal ? "Dokümanları Kapat" : "Dokümanları Görüntüle"}
          </Button>
          {docModal ? (
            <>
              <ShowDocs docList={caseInfo.docs} />
              <UploadPopUp />
              <Button
                style={{ width: "20%", alignSelf: "center" }}
                variant="contained"
                color="primary"
              >
                Dosya Yüklemeyi Onayla
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>

      {/* Mahkeme Modal */}
      <Modal
        open={courtModalOpen}
        onClose={handleCourtModalClose}
        aria-labelledby="court-modal-title"
        aria-describedby="court-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 300,
          }}
        >
          <CourtPopup
            open={courtModalOpen}
            handleClose={handleCourtModalClose}
            caseNumber={caseNo}
            lawyer={lawyerInfo._id}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default EditCase;
