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
    <Box width={320} margin={2}>
      <Typography
        fontFamily={"Kanit"}
        fontSize={{ xs: 25, sm: 45 }}
        fontWeight={"bold"}
        mt={{ xs: 0, sm: -2 }}
        mb={{ xs: 0, sm: -1 }}
      >
        Welcome
      </Typography>

      <div>
        <TextField
          type=""
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

      <div className="mt-2">
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
        <div className="mt-1 text-xs">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="invisible">PlaceHolder</div>
          )}
        </div>
        <button
          type="submit"
          className="flex justify-center w-full p-1 mt-2 text-white bg-black rounded-md hover:bg-yellow-500"
          onClick={handleSignin}
        >
          Sign in
        </button>
        <Link to="/otp" className="text-sm text-indigo-600 ">
          Forgot password?
        </Link>
      </div>

      <div>
        <p className="text-sm text-center text-gray-600">
          New to Calendar?{" "}
          <Link to="/register" className="text-indigo-600">
            Register Now
          </Link>
        </p>
      </div>
    </Box>
  );
};

export default SigninForm;
