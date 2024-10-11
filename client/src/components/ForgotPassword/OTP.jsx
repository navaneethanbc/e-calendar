import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Mail as MailIcon,
  LockReset as LockResetIcon,
} from "@mui/icons-material";
import axios from "axios";

const OTP = ({ setOtpVerified, username, setUsername }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [code, setCode] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const checkUsername = () => {
    if (!username.trim()) {
      setUsernameError("Username cannot be empty");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    if (checkUsername()) {
      try {
        const response = await axios.post(
          "https://e-calendar-cocq.vercel.app/users/otp",
          {
            username,
          }
        );
        setOtpSent(true);
        setSnackbar({
          open: true,
          message: response?.data?.message,
          severity: "success",
        });
      } catch (error) {
        console.error("Error in sending OTP:", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to send OTP",
          severity: "error",
        });
      }
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setOtpError("Please enter the OTP");
      return;
    }
    try {
      const response = await axios.post(
        "http://e-calendar-cocq.vercel.app/users/otpverify",
        { username, otp: code }
      );

      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
      setTimeout(() => {
        setOtpVerified(true);
      }, 1000);
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      setOtpError("Invalid OTP. Please try again.");
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to verify OTP",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Forgot Password
      </Typography>

      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        error={!!usernameError}
        helperText={usernameError}
        onChange={(e) => setUsername(e.target.value)}
        disabled={otpSent}
      />

      <Button
        onClick={sendOTP}
        variant="contained"
        startIcon={<MailIcon />}
        disabled={otpSent}
        sx={{ bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}
      >
        Send OTP
      </Button>

      {otpSent && (
        <>
          <Alert severity="info">OTP has been sent to your Email</Alert>

          <TextField
            fullWidth
            label="Enter the OTP"
            value={code}
            variant="outlined"
            onChange={(e) => setCode(e.target.value)}
            error={!!otpError}
            helperText={otpError}
          />

          <Button
            variant="contained"
            onClick={verifyOTP}
            startIcon={<LockResetIcon />}
            sx={{ bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}
          >
            Verify OTP
          </Button>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default OTP;
