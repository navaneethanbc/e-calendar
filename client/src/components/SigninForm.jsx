import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

const SigninForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
    setError("");
  };

  const handleSignin = async (event) => {
    event.preventDefault();

    if (!user.username) {
      setError("Username is required");
      return;
    }

    if (!user.password) {
      setError("Password is required");
      return;
    }

    try {
      const url = "http://localhost:8000/users/login";
      const res = await axios.post(url, user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", user.username);
      window.location = "/calendar";
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
    <Box
      width={{ xs: "80vw", sm: "40vw", md: "25vw" }}
      ml={{ md: 5, xs: 0 }}
      padding={1}
      bgcolor={"white"}
      borderRadius={3}
    >
      <Typography
        fontFamily={"Kanit"}
        fontSize={45}
        fontWeight={"bold"}
        height={45}
        lineHeight={1}
        ml={1}
      >
        Welcome
      </Typography>

      <Box padding={1}>
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
      </Box>

      <Box padding={1}>
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
        <Link
          to="/otp"
          className="-mt-1 text-indigo-600 text-right text-sm block"
        >
          Forgot password?
        </Link>
      </Box>

      <Box padding={1}>
        <div className="text-sm">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="invisible">PlaceHolder</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center bg-black text-white p-1 rounded-md hover:bg-yellow-500"
          onClick={handleSignin}
        >
          Sign in
        </button>
      </Box>

      <Box mt={1}>
        <p className="text-xm text-center text-gray-600">
          New to Calendar?{" "}
          <Link to="/register" className="text-indigo-600">
            Register Now
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default SigninForm;
