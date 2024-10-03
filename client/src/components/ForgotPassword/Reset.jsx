import React, { useState } from "react";
import { Button, TextField, Stack, Typography, Alert } from "@mui/material";
import { LockReset as LockResetIcon } from "@mui/icons-material";
import axios from "axios";

const Reset = ({ setIsModalOpen, username }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = () => {
    if (!password.trim()) {
      setErrors("Password cannot be empty");
      return false;
    }

    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return false;
    }
    setErrors("");
    return true;
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/users/resetpassword",
          { username, password }
        );
        if (response.status === 200) {
          setSuccessMessage(response.data.message);
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1000);
        }
      } catch (error) {
        console.error("error occured in reset password", error);
        setErrors(
          `${error.response?.data?.message}` ||
            "An error occurred during password reset"
        );
      }
    }
  };

  return (
    <Stack spacing={2} component="form" onSubmit={resetPassword}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Reset Password
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errors.api && <Alert severity="error">{errors.api}</Alert>}

      <TextField
        type="password"
        label="New Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        fullWidth
        error={!!errors}
        helperText={errors}
      />

      <TextField
        type="password"
        label="Confirm New Password"
        name="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        required
        fullWidth
        error={!!errors}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        startIcon={<LockResetIcon />}
        disabled={!password || !confirmPassword}
        sx={{
          mt: 2,
          bgcolor: "#4f46e5",
          "&:hover": { bgcolor: "#4338ca" },
          "&:disabled": { bgcolor: "#9ca3af" },
        }}
      >
        Reset Password
      </Button>
    </Stack>
  );
};

export default Reset;
