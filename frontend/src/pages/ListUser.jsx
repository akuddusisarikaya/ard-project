import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ListLawyer from "../components/ListLawyer";
import NewUserPopUp from "../components/NewUserPopUp";
import ListAdmin from "../components/ListAdmin";

export default function ListUser() {
  const [userChoise, setUserChoise] = React.useState(true);

  const handleAdmin = () => {
    setUserChoise(true);
  };
  const handleLawyer = () => {
    setUserChoise(false);
  };

  return (
    <div>
      {/* Butonlar */}
      <Stack spacing={2} direction="row">
        <Button variant={userChoise ? "" : "contained"} onClick={handleAdmin}>
          Yönetici Listesi
        </Button>
        <Button variant={userChoise ? "contained" : ""} onClick={handleLawyer}>
          Avukat Listesi
        </Button>

        <NewUserPopUp></NewUserPopUp>
      </Stack>
      {userChoise === true ? <ListAdmin /> : <ListLawyer />}
    </div>
  );
}
