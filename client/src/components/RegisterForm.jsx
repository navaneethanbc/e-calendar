import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import axios from "axios";
import "../index.css";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    employee_id: "",
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

    const { firstname, surname, ...restUserData } = user;

    if (!firstname || !surname) {
      setError("Please fill both the name fields");
      return;
    }

    const firstName =
      firstname.trim().charAt(0).toUpperCase() +
      firstname.trim().slice(1).toLowerCase();
    const surName =
      surname.trim().charAt(0).toUpperCase() +
      surname.trim().slice(1).toLowerCase();
    const fullname = `${firstName} ${surName}`;

    const userData = { fullname, ...restUserData };

    try {
      const url = "http://localhost:8000/users/register";
      const res = await axios.post(url, userData);
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
        console.error("Unexpected error:", error);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  // Function to handle Enter key release
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleRegister(event); // Trigger sign-in on Enter key release
    }
  };

  return (
    <Box
      width={{ xs: "80vw", sm: "50vw", md: "24vw" }}
      mr={{ md: "3vw", xs: 0 }}
      mt={{ md: 0, sm: "3vh", xs: "8vh" }}
      padding={2}
      borderRadius={3}
      bgcolor={"white"}
    >
      <Typography
        fontFamily={"Kanit"}
        fontSize={45}
        fontWeight={"bold"}
        height={45}
        lineHeight={1}
        mb={1}
      >
        Register
      </Typography>

      <div className="flex gap-1">
        <TextField
          type="text"
          placeholder="First name"
          name="firstname"
          onChange={handleChange}
          value={user.firstname}
          size="small"
          fullWidth
          margin="dense"
        />

        <TextField
          type="text"
          placeholder="Surname"
          name="surname"
          onChange={handleChange}
          value={user.surname}
          size="small"
          fullWidth
          margin="dense"
        />
      </div>

      {/* <div> */}
      <Tooltip
        title="Enter a valid email address. e.g., name@example.com"
        placement="bottom-start"
        followCursor
      >
        <TextField
          type="email"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          value={user.email}
          size="small"
          fullWidth
          margin="dense"
        />
      </Tooltip>
      {/* </div> */}

      {/* <div> */}
      <Tooltip
        title="Enter a valid Employee ID. e.g., EMP000001"
        placement="bottom-start"
        followCursor
      >
        <TextField
          type="text"
          placeholder="Employee ID"
          name="employee_id"
          onChange={handleChange}
          value={user.employee_id}
          size="small"
          fullWidth
          margin="dense"
        />
      </Tooltip>
      {/* </div> */}

      <Autocomplete
        size="small"
        options={options.map((option) => option.label)}
        onChange={handleBranchChange}
        renderInput={(params) => (
          <TextField
            type="text"
            {...params}
            label="Branch"
            variant="outlined"
            fullWidth
            margin="dense"
          />
        )}
      />

      {/* <div> */}
      <Tooltip
        title="Valid username contains only alphabets and numbers."
        placement="bottom-start"
        followCursor
      >
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={user.username}
          size="small"
          fullWidth
          margin="dense"
        />
      </Tooltip>
      {/* </div> */}

      {/* <div> */}
      <Tooltip
        title="Password should be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character"
        placement="bottom-start"
        followCursor
      >
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
          size="small"
          fullWidth
          margin="dense"
        />
      </Tooltip>
      {/* </div> */}

      {/* <div> */}
      <TextField
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={user.confirmPassword}
        size="small"
        fullWidth
        margin="dense"
        onKeyUp={handleKeyUp}
      />
      <div className="text-sm -mt-1">
        {user.confirmPassword && user.confirmPassword !== user.password ? (
          <div className="text-red-500">Passwords do not match</div>
        ) : (
          <div className="invisible">PlaceHolder</div>
        )}
      </div>
      {/* </div> */}

      <div className="p-1 pb-0">
        <p className="text-xs text-gray-600">
          By clicking "Get Started", you agree to our{" "}
          <Link to="/terms" className="text-indigo-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacypolicy" className="text-indigo-600">
            Privacy Policy
          </Link>
        </p>
      </div>

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
          onClick={handleRegister}
        >
          Get Started
        </button>
      </div>

      <div className="pt-1">
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
