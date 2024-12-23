import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const drawerWidth = "10%"; // Genişliği yüzde olarak ayarla

  return (
    <div style={{ display: "flex" }}>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          padding: "16px",
          marginTop: "64px",
          marginLeft: drawerWidth, // Burada yüzde değerini kullanıyoruz
        }}
      >
        <Outlet /> {/* Bu, iç içe geçmiş rotaları render eder */}
      </div>
    </div>
  );
}
