import { Box, TextField, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ResetPassword from "./ForgotPassword/ResetPassword";

const SigninForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("fullname", res.data.name);
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

  // Function to handle Enter key release
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSignin(event); // Trigger sign-in on Enter key release
    }
  };

  return (
    <Box
      width={{ xs: "80vw", sm: "50vw", md: "22vw" }}
      ml={{ md: "4vw", xs: 0 }}
      padding={2}
      bgcolor={"white"}
      borderRadius={3}
    >
      <Typography
        fontFamily={"Kanit"}
        fontSize={45}
        fontWeight={"bold"}
        height={45}
        lineHeight={1}
        mb={1}
      >
        Welcome
      </Typography>

      {/* <div className="p-1"> */}
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
      {/* </div> */}

      {/* <div className="p-1"> */}
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
        onKeyUp={handleKeyUp}
      ></TextField>
      <Link
        className="-mt-1 text-indigo-600 text-right text-sm block"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Forgot password?
      </Link>
      {/* </div> */}

      <div className="p-1 pt-0">
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
      </div>

      <div className="pt-1">
        <p className="text-xm text-center text-gray-600">
          New to Calendar?{" "}
          <Link to="/register" className="text-indigo-600">
            Register Now
          </Link>
        </p>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ResetPassword setIsModalOpen={setIsModalOpen} />
      </Modal>
    </Box>
  );
};

export default SigninForm;
