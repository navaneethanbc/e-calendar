// import React,{useState} from 'react'
// import {Button,TextField,Box} from "@mui/material"

// const SetReset = ({setIsModalOpen}) => {
//     const[password, setPassword] = useState("")
//     const[confirmpassword, setConfirmPassword] = useState("")
//     const resetPassword = async(event)=>{
//         event.preventDefault();
//         if (password.length < 8) {
//             setError("Password must be at least 8 characters");
//             return;
//         }
      
//         if (password !== confirmpassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         //api call for check pasword and update the password
//         setIsModalOpen(false)
//     }
//   return (
//     <div>
        
//         <TextField
//           type="password"
//           placeholder="New Password"
//           name="password"
//           onChange={(e)=>setPassword(e.target.value)}
//           value={password}
//           required
//           size="small"
//           fullWidth
//           margin="dense"
//         ></TextField>

//         <TextField
//           type="password"
//           placeholder=" Confirm New Password"
//           name="password"
//           onChange={(e)=>setConfirmPassword(e.target.value)}
//           value={confirmpassword}
//           required
//           size="small"
//           fullWidth
//           margin="dense"
//         ></TextField>

//         <Button
//         fullWidth
//         variant="contained"
//         onClick={resetPassword}
//         sx={{mt:2}}>
//           Reset password
//         </Button>
//     </div>
//   )
// }

// export default SetReset

import React, { useState } from 'react';
import { Button, TextField, Stack, Typography } from "@mui/material";
import { LockReset as LockResetIcon } from '@mui/icons-material';

const SetReset = ({ setIsModalOpen }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        if (validatePassword()) {
            try {
                // API call to check password and update it
                // Replace the following line with your actual API call
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error resetting password:", error);
                setPasswordError("Failed to reset password. Please try again.");
            }
        }
    };

    return (
        <Stack spacing={2} component="form" onSubmit={resetPassword}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Reset Password
            </Typography>

            <TextField
                type="password"
                label="New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                fullWidth
                error={!!passwordError}
                helperText={passwordError}
            />

            <TextField
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                fullWidth
                error={!!passwordError}
            />

            <Button
                fullWidth
                variant="contained"
                type="submit"
                startIcon={<LockResetIcon />}
                disabled={!password || !confirmPassword}
                sx={{ 
                    mt: 2, 
                    bgcolor: '#4f46e5', 
                    '&:hover': { bgcolor: '#4338ca' },
                    '&:disabled': { bgcolor: '#9ca3af' }
                }}
            >
                Reset Password
            </Button>
        </Stack>
    );
};

export default SetReset;