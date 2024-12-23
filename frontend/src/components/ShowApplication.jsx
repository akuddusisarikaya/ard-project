import React from "react";
import useAPI from "../store/storeAPI";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckBox from "@mui/material/Checkbox";
import {
  FormGroup,
  FormControlLabel,
  Typography,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";
import ShowDocs from "./ShowDocs";
import { useNavigate } from "react-router-dom";

export default function ShowApplication({ appID }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { fetchData, setData } = useAPI();
  const [application, setApplication] = React.useState({});
  const [appDocs, setAppDocs] = React.useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role || "lawyer";
  const [appNumber, setAppNumber] = React.useState("");

  const handleAppNumber = (e) => {
    setAppNumber(e.target.value);
  }

  const submitChange = async(appNum) => {
    const newApplication = {
      ...application,
      application_number : appNum
    }
    setLoading(true)
    try {
      await setData(`/admin/patchapplication/${appID}`, "PATCH", newApplication);
      navigate(0);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }

  React.useEffect(() => {
    var adminRole = "lawyer";
    if (role === "Admin" || role === "ADMIN" || role === "admin") {
      adminRole = "admin";
    }
    const fetchApp = async () => {
      setLoading(true);
      try {
        const response = await fetchData(
          `/${adminRole}/getappbyid/${appID}`,
          "GET"
        );
        setApplication(response);
        if (response.docs) {
          await fetchDocs(response.docs);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDocs = async (documentList) => {
      try {
        const list = await Promise.all(
          documentList.map(async (item) => {
            const response = await fetchData(`/getdocbyid/${item}`, "GET");
            return response; // Her bir fetch çağrısının sonucu
          })
        );
        setAppDocs(list); // Belge listesini state'e kaydet
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchApp();
  }, []);
  if (!appID) {
    return <></>;
  } else if (loading === true) {
    return <CircularProgress />;
  } else {
    return (
      <Box>
        <br />
        <br />
        <br />
        <Box
          sx={{
            flex: 2,
            minHeight: "150ch",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Başvuru Formu</Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {role === "Admin" ? (
              <Box style={{display :"flex"}}>
                <TextField
                  variant="standard"
                  label="Başvuru Numarası"
                  defaultValue={application?.application_number}
                  onChange={handleAppNumber}
                  InputLabelProps={{
                    style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
                  }}
                  InputProps={{
                    style: { textAlign: "left" }, // Value'yu sola hizala
                  }}
                />
                <Button onClick={() => submitChange(appNumber)} variant="contained">Kaydet</Button>
              </Box>
            ) : (
              <> </>
            )}

            <TextField
              variant="standard"
              label="İsim"
              value={application?.applicant_name}
              required
              disabled={true}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
            <TextField
              variant="standard"
              label="Soyisim"
              value={application?.applicant_family_name}
              required
              disabled={true}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
            <TextField
              variant="standard"
              label="Başvuru Tarihi"
              type="date"
              value={application?.application_date}
              InputLabelProps={{ shrink: true }}
              required
              disabled={true}
            />
            <TextField
              variant="standard"
              label="TC Kimlik Numarası"
              value={application?.applicant_id}
              inputProps={{ maxLength: 11 }}
              helperText="Lütfen 11 haneli TC Kimlik Numaranızı giriniz."
              disabled={true}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
            <TextField
              disabled={true}
              variant="standard"
              label="Telefon Numarası"
              value={application?.applicant_phone}
              inputProps={{ maxLength: 10 }}
              helperText="Lütfen 10 haneli telefon numaranızı giriniz."
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
            <TextField
              variant="standard"
              label="E-posta"
              value={application?.applicant_email}
              type="email"
              required
              disabled={true}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
            <TextField
              variant="standard"
              label="Adres"
              multiline
              rows={4}
              value={application?.applicant_address}
              disabled={true}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />

            <FormGroup>
              <br></br>
              <FormControlLabel
                disabled={true}
                control={<CheckBox checked={application?.self_applicant} />}
                label="Başvuru Kendisi Tarafından Yapıldı"
              />
            </FormGroup>

            {!application?.self_applicant && (
              <>
                <TextField
                  disabled={true}
                  variant="standard"
                  label={application?.applicant_type}
                  value={application?.applicant_type}
                ></TextField>
                <TextField
                  disabled={true}
                  variant="standard"
                  label="Kurum Adı"
                  value={application?.applicant}
                  InputLabelProps={{
                    style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
                  }}
                  InputProps={{
                    style: { textAlign: "left" }, // Value'yu sola hizala
                  }}
                />
              </>
            )}

            <TextField
              disabled={true}
              label={application?.case_category}
              variant="standard"
              value={application?.case_category}
            ></TextField>
            <TextField
              disabled={true}
              variant="standard"
              label="Açıklama"
              multiline
              rows={4}
              value={application?.explanation}
              InputLabelProps={{
                style: { textAlign: "right", width: "100%" }, // Label'ı sağa hizala
              }}
              InputProps={{
                style: { textAlign: "left" }, // Value'yu sola hizala
              }}
            />
          </Box>
          {application?.links?.length > 0 ? (
            <Box>
              <h4>Linkler : </h4>
              <TableContainer>
                <Table>
                  <TableBody>
                    {application?.links.map((link, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {index + 1} -{" "}
                          <a
                            href={link}
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                            }}
                          >
                            {" "}
                            {link}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <></>
          )}

          {appDocs.length > 0 ? (
            <>
              <ShowDocs docList={application?.docs} />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
