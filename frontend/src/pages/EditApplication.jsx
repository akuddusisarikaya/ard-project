import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import useAPI from "../store/storeAPI";
import CreateCasePopup from "../components/CreateCasePopup";
import ShowApplication from "../components/ShowApplication";

export default function EditApplication() {
  const navigate = useNavigate();
  const { fetchData, setData } = useAPI();
  const { id } = useParams();
  const [showCreateCase, setShowCreateCase] = React.useState(false);
  const [application, setApplication] = React.useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userID = user?._id || "0";

  React.useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await fetchData(`/admin/getappbyid/${id}`, "GET");
        setApplication(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApp();
  }, []);

  const handleArchive = async () => {
    const updatedFormState = {
      ...application,
      caseble: false,
      application_approver: userID,
      status: "Archived",
    };

    try {
      const appID = id;
      const response = await setData(
        `/denemepatchapp/${appID}`,
        "PATCH",
        updatedFormState
      );
      navigate(-1);
    } catch (error) {
      console.error("Error archiving the application:", error);
    }
  };

  const handlecaseclick = () => {
    setShowCreateCase(true);
  };

  const handleCloseCreateCasePopup = () => {
    setShowCreateCase(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        padding: 2,
        gap: 2,
      }}
    >
      {/* Sol Taraf - Başvuru Formu */}
      <ShowApplication appID={id} />

      {/* Sağ Taraf - İşlemler */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">İşlemler</Typography>
        <TextField
          label={application?.status === "Pending" ? "Beklemede" : "Arşivlendi"}
          InputLabelProps={{
            style: { textAlign: "center", width: "100%" },
          }}
          variant="standard"
          disabled
        ></TextField>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlecaseclick}
          fullWidth
        >
          Dava Aç
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleArchive}
          fullWidth
        >
          Arşivle
        </Button>
        <Button variant="contained" color="error" fullWidth>
          Sil
        </Button>
      </Box>

      {/* Dava Popup */}
      {showCreateCase && (
        <CreateCasePopup
          open={showCreateCase}
          handleClose={handleCloseCreateCasePopup}
          appID={id}
        />
      )}
    </Box>
  );
}
