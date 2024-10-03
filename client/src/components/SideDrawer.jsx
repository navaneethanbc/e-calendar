import React from "react";
import { Box } from "@mui/material";
// import MUIDatePicker from "./DatePicker";

const SideDrawer = ({ open }) => {
  return (
    <Box
      height="calc(100vh - 64px)"
      bgcolor={"beige"}
      width={open ? "22%" : "0%"}
      sx={{
        transition: "width 0.3s",
        overflow: "hidden",
        "@media (max-width:1200px)": { width: open ? "58%" : "0%" },
      }}
    >
      <Box
        // display={open ? "contents" : "none"}
        position={"relative"}
        top={120}
        sx={{ transition: "width 0.3s" }}
      >
        SideDrawer Content
      </Box>
    </Box>
  );
};

export default SideDrawer;
