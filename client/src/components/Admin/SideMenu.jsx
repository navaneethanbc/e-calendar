import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  FileDownload as FileDownloadIcon,
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
      label: "Reports",
      icon: <FileDownloadIcon />,
      key: "/admin/reports",
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
            button
            key={item.key}
            selected={selectedKeys === item.key}
            onClick={() => {
              navigate(item.key);
              setSelectedKeys(item.key);
            }}
            sx={{
              bgcolor: selectedKeys === item.key ? "yellow" : "transparent",
              "&:hover": {
                bgcolor: selectedKeys === item.key ? "orange" : "lightgray",
              },
            }}
            className={selectedKeys === item.key ? "text-yellow-500" : ""}
          >
            <ListItemIcon
              sx={{
                color:
                  selectedKeys === item.key ? "text-yellow-500" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                className:
                  selectedKeys === item.key ? "text-yellow-500" : "text-black",
              }}
              sx={{
                color:
                  selectedKeys === item.key ? "text-yellow-500" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SideMenu;
