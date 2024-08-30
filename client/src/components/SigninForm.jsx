import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      const url = "http://localhost:8000/api/auth";
      const res = await axios.post(url, user);
      localStorage.setItem("token", res.data.token);
      window.location = "/dummypage";
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
    <>
      <Typography
        fontFamily={"Kanit, sans-serif"}
        fontSize={{ xs: 25, sm: 45 }}
        fontWeight={"bold"}
        mb={{ xs: 0, sm: 2 }}
      >
        Welcome
      </Typography>

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

      <div className="mb-3">
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <button
          type="submit"
          className="w-full flex mt-4 justify-center bg-black text-white p-2 rounded-md hover:bg-yellow-500"
          onClick={handleSignin}
        >
          Sign in
        </button>
        <Link to="/PasswordReset" className="text-indigo-600 text-sm ">
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
    </>
  );
};

export default SigninForm;
