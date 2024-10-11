import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  FileDownload as FileDownloadIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu({ open }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      key: "/admin/dashboard",
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      key: "/admin/settings",
    },
    {
      label: "Events",
      icon: <EventIcon />,
      key: "/admin/events",
    },
    {
      label: "Users",
      icon: <PeopleIcon />,
      key: "/admin/users",
    },
    {
      label: "Reports",
      icon: <FileDownloadIcon />,
      key: "/admin/reports",
    },
  ];

  return (
    <Box
      height="calc(100vh - 64px)"
      bgcolor={"beige"}
      width={open ? "25%" : "0%"}
      sx={{
        transition: "width 0.3s",
        overflow: "hidden",
        "@media (max-width:1440px)": { width: open ? "30%" : "0%" },
        "@media (max-width:1200px)": { width: open ? "43%" : "0%" },
        "@media (max-width:768px)": {
          width: open ? "63%" : "0%",
        },
        "@media (max-width:642px)": { width: open ? "100%" : "0%" },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.key}
            selected={selectedKeys === item.key}
            onClick={() => {
              navigate(item.key);
              setSelectedKeys(item.key);
            }}
            sx={{
              bgcolor: selectedKeys === item.key ? "#000000" : "transparent",
              "&:hover": {
                bgcolor: selectedKeys === item.key ? "black" : "lightgray",
              },
              cursor: "pointer",
            }}
            component="div"
          >
            <ListItemIcon
              sx={{
                color: selectedKeys === item.key ? "#febe00" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                color: selectedKeys === item.key ? "#febe00" : "black",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SideMenu;
