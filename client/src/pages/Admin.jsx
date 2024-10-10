import React from "react";
import SideMenu from "../components/Admin/SideMenu";
import PageContent from "../components/Admin/PageContent";
import Footer from "../components/Footer";
import AdminHeader from "../components/Admin/AdminHeader";
import { Box } from "@mui/material";

const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <Box display={"flex"} alignItems={"center"}>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Box>
      <Footer />
    </div>
  );
};

export default Admin;
