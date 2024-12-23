import React from "react";
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
  Fab,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Eksik import
import { useNavigate } from "react-router-dom";

export default function ListingApps({applications, loading}){
  const navigate = useNavigate();
  const handleView = (applicationNo) => {
    navigate(`/admin/edit-application/${applicationNo}`);
  };

  return (
    <Box sx={{ padding: 1, marginLeft: "-250px", ml: "1%" }}>
      {/* Başlık ve Floating Action Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="div">
          Başvuru Listesi
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/app")} // Yeni başvuru oluşturma sayfasına yönlendirme
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Başvuru Tablosu */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Başvuru ID</TableCell>
              <TableCell>Başvuru No</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>

          {loading === true ? (
            <CircularProgress/>
          ) : (
            <TableBody>
              {applications?.length > 0 ? (
                <>
                  {applications.map((application) => (
                    <TableRow key={application._id}>
                      {/* Application No */}
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                        onClick={() => handleView(application._id)}
                      >
                        {application._id}
                      </TableCell>
                      <TableCell>{application.application_number}</TableCell>
                      {/* Durum Değişikliği */}
                      <TableCell>{application.status}</TableCell>

                      {/* İşlemler */}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => handleView(application._id)}
                        >
                          Görüntüle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}