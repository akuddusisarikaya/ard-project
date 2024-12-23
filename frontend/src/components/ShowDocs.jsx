import React from "react";
import useAPI from "../store/storeAPI";
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
export default function ShowDocs({ docList }) {
  const { fetchData } = useAPI();
  const [docs, setDocs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const docLi = await Promise.all(
          docList.map(async (docu) => {
            try {
              const response = await fetchData(`/getdocbyid/${docu}`, "GET");
              return response;
            } catch {
              return null;
            }
          })
        );
        setDocs(docLi.filter((doc) => doc !== null));
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [docList]);
  return (
    <Box>
      <h4>Dökümanlar : </h4>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Döküman ismi</TableCell>
              <TableCell>Döküman Linki</TableCell>
              <TableCell>Döküman Açıklama</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {docs.map((document, index) => (
                <TableRow key={document._id}>
                  <TableCell>
                    {" "}
                    {index + 1} - {document?.doc_name || ""}
                  </TableCell>
                  <TableCell>
                    <a
                      href={document.doc_url}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {document?.doc_url || ""}
                    </a>
                  </TableCell>
                  <TableCell>{document?.describe || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
