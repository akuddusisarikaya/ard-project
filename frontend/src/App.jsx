import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./store/DataContext";

import Layout from "./components/Layout";
import Application from "./pages/Application";
import ListApplication from "./pages/ListApplication";
import ListCase from "./pages/ListCase";
import ListUser from "./pages/ListUser";
import ListArchive from "./pages/ListArchive";
import EditApplication from "./pages/EditApplication";
import EditCase from "./pages/EditCase";
import LawyerCases from "./pages/LawyerCases";
import LoginPage from "./pages/Login";
import AppForOther from "./pages/AppForOther";
import EditLawyer from "./pages/EditLawyer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <DataProvider>
      {" "}
      {/* Tüm uygulamayı DataProvider ile sarıyoruz */}
      <Router>
        <Routes>
          {/* Login Sayfası */}

          <Route path = "/" element= {<HomePage/>}/>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/application" element={<AppForOther />} />

          {/* Admin Rotası */}
          <Route path="/admin/*" element={<Layout />}>
            <Route path="app" element={<Application />} />
            <Route path="list-applications" element={<ListApplication />} />
            <Route path="list-case" element={<ListCase />} />
            <Route path="list-user" element={<ListUser />} />
            <Route path="list-archive" element={<ListArchive />} />
            <Route path="edit-application/:id" element={<EditApplication />} />
            <Route path="edit-case/:caseNo" element={<EditCase />} />
            <Route path="edit-lawyer/:lawyerId" element={<EditLawyer />} />
          </Route>

          {/* Lawyer Rotası */}
          <Route path="/lawyer/*">
            <Route path="lawyer-cases" element={<LawyerCases />} />
            <Route path="edit-case/:caseNo" element={<EditCase />} />
          </Route>
          {/* Varsayılan Rota */}
          {/*<Route path="*" element={<LoginPage />} />*/}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
