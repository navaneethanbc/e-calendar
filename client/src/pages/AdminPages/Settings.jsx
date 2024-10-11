import React from "react";
import UserHandler from "../../components/Admin/UserHandler";
import { Box } from "@mui/material";
import AddUserForm from "../../components/Admin/AddUser";

const Settings = () => {
  return (
    <div>
      <Box sx={{ padding: 3, height: "90vh", overflowY: "auto" }}>
        <AddUserForm />
        <UserHandler />
      </Box>
    </div>
  );
};

export default Settings;
