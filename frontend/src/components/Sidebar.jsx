import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const drawerWidth = "10%"; // Genişliği yüzde olarak ayarla

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px",
        },
      }}
    >
      <Box sx={{ width: "100%", overflow: "auto" }}>
        <List>
          {[
            { text: "Başvuru Oluştur", route: "/admin/app" },
            { text: "Başvuru Listesi", route: "/admin/list-applications" },
            { text: "Dava Listesi", route: "/admin/list-case" },
            { text: "Kullanıcı Listesi", route: "/admin/list-user" },
            { text: "Arşiv Listesi", route: "/admin/list-archive" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Hover rengi
                  },
                }}
              >
                <Link
                  to={item.route}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <ListItemText primary={item.text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
