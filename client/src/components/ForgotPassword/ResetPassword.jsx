import React from "react";
import { useState } from "react";
import { Box, Paper } from "@mui/material";
import OTP from "./OTP";
import Reset from "./Reset";

const ResetPassword = ({ setIsModalOpen }) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 400 },
        maxWidth: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
        }}
      >
        {otpVerified ? (
          <Reset setIsModalOpen={setIsModalOpen} username={username} />
        ) : (
          <OTP
            setOtpVerified={setOtpVerified}
            username={username}
            setUsername={setUsername}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
