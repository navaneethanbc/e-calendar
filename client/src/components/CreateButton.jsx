import React from "react";
import { Box, Typography, Button } from "@mui/material";
import addIcon from "../assets/add_icon.png";

export const CreateButton = ({ open, handleModalOpen }) => {
  return (
    <Box
      position={"absolute"}
      top={{ xs: "90vh", sm: "10vh" }}
      zIndex={50}
      ml={{ xs: "80vw", sm: "1vw" }}
    >
      <Button
        onClick={handleModalOpen}
        sx={{
          borderRadius: 10,
          backgroundColor: "transparent",
          width: !open ? 0 : { xs: "40vw", sm: "25vh", md: "12vw" },
          height: "8vh",
          display: !open ? "flex" : { xs: "none", sm: "flex" },
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        <Box component="img" src={addIcon} height="4vh" />
        <Typography
          fontSize={{ sm: "4vh", xs: "5vh" }}
          ml={1}
          fontFamily={"Kanit"}
          color={"#363533"}
          textTransform={"none"}
          display={open ? "block" : "none"}
        >
          Create
        </Typography>
      </Button>
    </Box>
  );
};
