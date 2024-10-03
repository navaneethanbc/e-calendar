import { Box, TextField, Typography, Button, Modal } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ResetPassword from "./ResetPassword";

const SigninForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isModalOpen,setIsModalOpen] = useState(false)

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
  }

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
        <div className="text-xs mt-1">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="invisible">PlaceHolder</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex mt-1 justify-center bg-black text-white p-1 rounded-md hover:bg-yellow-500"
          onClick={handleSignin}
        >
          Sign in
        </button>

        <Button 
          variant="text"
          onClick={()=>{setIsModalOpen(true)}}
          sx={{color: '#4f46e5 ', fontSize: '0.875rem',p:0, mt:1, textTransform: 'none'}}>
          Forgot Password?
        </Button>
      </div>

      <div>
        <Typography
        variant="body2"
        align="center"
        sx={{mt:1}}>
        New to Calendar?{" "}
        <Link to="/register" className="text-indigo-600">
            Register Now
          </Link>
        </Typography>
      </div>
      <Modal
        open={isModalOpen}
        onClose={()=>{setIsModalOpen(false)}}
      >
        <ResetPassword 
        setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </Box>
  );
};

export default SigninForm;





