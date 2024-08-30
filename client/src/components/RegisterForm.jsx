import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    employeeID: "",
    branch: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const options = [
    { label: "Branch A", value: "option1" },
    { label: "Branch B", value: "option2" },
    { label: "Branch C", value: "option3" },
    { label: "Branch D", value: "option4" },
    { label: "Branch E", value: "option5" },
    { label: "Branch F", value: "option6" },
    { label: "Branch G", value: "option7" },
    { label: "Branch H", value: "option8" },
  ];

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
    setError("");
  };

  const handleBranchChange = (event, value) => {
    setUser({ ...user, branch: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (user.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Password does not match");
      return;
    }

    try {
      const url = "http://localhost:8000/api/users";
      const res = await axios.post(url, user);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Box width={320}>
      <Typography
        fontFamily={"Kanit, sans-serif"}
        fontSize={{ xs: 25, sm: 45 }}
        fontWeight={"bold"}
        mb={{ xs: 0, sm: 1 }}
      >
        Register
      </Typography>

      <Box display={"flex"} mb={0}>
        <Box mr={0.5}>
          <TextField
            type="text"
            placeholder="First name"
            name="firstname"
            onChange={handleChange}
            value={user.firstname}
            required
            size="small"
            fullWidth
            margin="dense"
          ></TextField>
        </Box>

        <Box>
          <TextField
            type="text"
            placeholder="Surname"
            name="surname"
            onChange={handleChange}
            value={user.surname}
            required
            size="small"
            fullWidth
            margin="dense"
          ></TextField>
        </Box>
      </Box>

      <div>
        <TextField
          type="email"
          placeholder="Email address"
          required
          name="email"
          onChange={handleChange}
          value={user.email}
          size="small"
          fullWidth
          margin="dense"
        ></TextField>
      </div>

      <div>
        <TextField
          type="text"
          placeholder="Employee ID"
          name="employeeID"
          onChange={handleChange}
          value={user.employeeID}
          required
          size="small"
          fullWidth
          margin="dense"
        ></TextField>
      </div>

      <Autocomplete
        size="small"
        options={options.map((option) => option.label)}
        onChange={handleBranchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Branch"
            required
            variant="outlined"
            fullWidth
            margin="dense"
          />
        )}
      />

      <div>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={user.username}
          required
          size="small"
          fullWidth
          margin="dense"
        ></TextField>
      </div>

      <div>
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
          required
          size="small"
          fullWidth
          margin="dense"
        ></TextField>
      </div>

      <div>
        <TextField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={user.confirmPassword}
          required
          size="small"
          fullWidth
          margin="dense"
        ></TextField>
      </div>

      <div className="mb-3 my-1">
        <p className="text-xs text-gray-600">
          By clicking "Get Started", you agree to our{" "}
          <Link to="/termsofservice" className="text-indigo-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacypolicy" className="text-indigo-600">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="mb-4">
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <button
          type="submit"
          className="w-full flex mt-2 justify-center bg-black text-white p-2 rounded-md hover:bg-yellow-500"
          onClick={handleRegister}
        >
          Get Started
        </button>
      </div>

      <div>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </Box>
  );
};

export default RegisterForm;
