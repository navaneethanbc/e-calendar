import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    employee_id: "",
    branch: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/adduser",
        formData
      );
      setSuccess("User created successfully!");
      setFormData({
        username: "",
        password: "",
        email: "",
        fullname: "",
        employee_id: "",
        branch: "",
        role: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the user"
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        margin: "auto",
        paddingBottom: "80px",
      }}
    >
      <div className="bg-[#504f4a]">
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "#febe00",
            fontSize: "bold",
            padding: "20px 3px 3px 20px",
          }}
        >
          Add New User
        </Typography>
      </div>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* First Row with Username, Employee ID, and Branch */}
      <Box
        sx={{
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          margin: "auto",
          padding: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Employee ID"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl required fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <MenuItem value="Branch A">Branch A</MenuItem>
                <MenuItem value="Branch B">Branch B</MenuItem>
                <MenuItem value="Branch C">Branch C</MenuItem>
                <MenuItem value="Branch D">Branch D</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Second Row with Full Name and Email */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Password Field */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#b8860c",
            },
          }}
        >
          ADD NEW USER
        </Button>
      </Box>
    </Box>
  );
};

export default AddUserForm;
