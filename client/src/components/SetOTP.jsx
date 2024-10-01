// import {useState} from 'react'
// import {Typography, TextField, Button} from "@mui/material"

// const SetOTP = ({setOtpVerified}) => {
//   const [username, setUserName] = useState("")
//   const [otpSent, setOtpSent] = useState(false)
//   const [code,setCode] = useState('')

//   const sendOTP = ()=>{
//     // api call 
//     //Search the user by username, retrieve their email address, and send a 6-digit OTP to their email
//     setOtpSent(true)
//   }

//   const verifyOTP = ()=>{
//     // api call
//     //check the enterd code correct  
//     setOtpVerified(true)
//   }

//   return (
//     <div>
//         <Typography
//         variant="h5"
//         component="h2"
//         gutterBottom
//         align="center"
//         >
//           Forgot Password
//         </Typography>

//         <TextField
//         fullWidth
//         label="Username"
//         variant = "outlined"
//         value ={username}
//         onChange={(e)=>setUserName(e.target.value)} 
//         margin="normal" 
//         />

//         <Button 
//         onClick={sendOTP}
//         variant="text"
//         sx={{color: '#4f46e5 ', fontSize: '0.875rem',p:0, mt:0.5, textTransform: 'none'}}>
//           Send OTP
//         </Button>
//         {otpSent &&(
//           <div>
//             <Typography
//             >
//              OTP has been sent to your email 
//             </Typography>

//             <TextField
//             fullWidth
//             label = "Enter the OTP"
//             value={code}
//             variant='outlined'
//             onChange={(e)=>setCode(e.target.value)}
//             />
//             <Button 
//             variant="text"
//             onClick={verifyOTP}
//             sx={{color: '#4f46e5 ', fontSize: '0.875rem',p:0, mt:0.5, textTransform: 'none'}}>
//               Verify OTP
//             </Button>
//           </div>
//         )
//         }
//     </div>
//   )
// }

// export default SetOTP
import { useState } from 'react';
import { Typography, TextField, Button, Stack } from "@mui/material";
import { Mail as MailIcon, LockReset as LockResetIcon } from '@mui/icons-material';
import axios from 'axios';

const SetOTP = ({ setOtpVerified }) => {
    const [username, setUserName] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [code, setCode] = useState('');
    const [usernameError, setUserNameError] = useState("");

    const checkUserName = ()=>{
        if (!username) {
            setUserNameError("Username can not be empty");
            return false;
          }
    }
    const sendOTP = async(e) => {
        e.preventDefault()
        if (checkUserName()){
            try {
                const response = await axios.post("http://localhost:8000/users/otp",{"username":username})
                if(response.ok){
                    setOtpSent(true)
                }
                
            }
            catch{

            }
        }
        
        
     
        // API call 
        // Search the user by username, retrieve their email address, and send a 6-digit OTP to their email
    };

    const verifyOTP = () => {
        // API call
        // Check if the entered code is correct  
        setOtpVerified(true);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Forgot Password
            </Typography>

            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />

            <Button 
                onClick={sendOTP}
                variant="contained"
                startIcon={<MailIcon />}
                disabled={!username}
                sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
            >
                Send OTP
            </Button>

            {otpSent && (
                <>
                    <Typography variant="body2" color="text.secondary">
                        OTP has been sent to your email
                    </Typography>

                    <TextField
                        fullWidth
                        label="Enter the OTP"
                        value={code}
                        variant='outlined'
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <Button 
                        variant="contained"
                        onClick={verifyOTP}
                        startIcon={<LockResetIcon />}
                        disabled={code.length !== 6}
                        sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
                    >
                        Verify OTP
                    </Button>
                </>
            )}
        </Stack>
    );
};

export default SetOTP;