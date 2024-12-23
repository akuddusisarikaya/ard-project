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
import ShowDocs from "./ShowDocs";

export default function ShowCourts({ courtList }) {
  const { fetchData } = useAPI();
  const [courts, setCourt] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      try {
        const docLi = await Promise.all(
          courtList.map(async (docu) => {
            try {
              const response = await fetchData(`/getcourtbyid/${docu}`, "GET");
              return response;
            } catch {
              return null;
            }
          })
        );
        setCourt(docLi.filter((doc) => doc !== null));
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [courtList]);
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mahkeme No</TableCell>
              <TableCell>Mahkeme İsmi</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress/>
          ) : (
            <TableBody>
              {courts?.length > 0 ? (
                <>
                  {courts.map((court) => (
                    <TableBody>
                      <TableRow>
                        <TableCell>{court.court_number}</TableCell>
                        <TableCell>{court.court_name}</TableCell>
                        <TableCell>{court.note}</TableCell>
                      </TableRow>
                      {court.docs?.length > 0 ? (
                        <>
                          {
                            <TableRow>
                              <ShowDocs docList={court.docs} />
                            </TableRow>
                          }
                        </>
                      ) : (
                        <></>
                      )}
                    </TableBody>
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
