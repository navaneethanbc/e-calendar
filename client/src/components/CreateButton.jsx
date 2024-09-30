import React from "react";
import { Box, Typography } from "@mui/material";

export const CreateButton = ({ open, handleModalOpen }) => {
  return (
    <Box position={"absolute"} top={100} zIndex={50} ml={2.5}>
      <button
        class="rounded-full bg-[#febe00] flex items-center justify-center shadow-lg hover:bg-[#febe00]"
        onClick={handleModalOpen}
        style={{
          width: open ? 150 : 50,
          height: 50,
          transition: "width 0.1s",
        }}
      >
        <Box component="img" src={"src/assets/add_icon.png"} height={25} />
        <Typography
          fontSize={25}
          ml={1}
          fontFamily={"Kanit"}
          color={"#252525"}
          textTransform={"none"}
          display={open ? "block" : "none"}
        >
          Create
        </Typography>
      </button>
    </Box>
  );
};
