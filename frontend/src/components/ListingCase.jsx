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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListingCase({cases, loading}) {
    const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  // Düzenleme butonu
  const handleEdit = (caseNo) => {
    if(user.role === "Admin" || user.role === "admin"){
        navigate(`/admin/edit-case/${caseNo}`);
    } else {
        navigate(`/lawyer/edit-case/${caseNo}`);
    }
  };

  return (
    <Box>
      {/* Case Tablosu */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dava No</TableCell>
              <TableCell>Dava Başlangıç Tarihi</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Dava Sonlanma Tarihi</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem?._id}>
                  {/* Case No */}
                  <TableCell>{caseItem?.case_number}</TableCell>
                  <TableCell>{caseItem?.case_start_date}</TableCell>
                  <TableCell>
                    {caseItem?.case_continue ? "Devam Ediyor" : "Sonlandı"}
                  </TableCell>
                  <TableCell>{caseItem?.case_end_date}</TableCell>
                  {/* İşlemler */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(caseItem?._id)}
                    >
                      Düzenle
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
