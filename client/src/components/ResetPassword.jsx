// import React from 'react'
// import { useState } from 'react';
// import {Box} from "@mui/material"
// import SetOTP from "./SetOTP";
// import SetReset from "./SetReset";

// const ResetPassword = ({setIsModalOpen}) => {
//     const [otpverified,setOtpVerified] = useState(false)
//   return (
//     <div>
//         <Box
//       sx={{
//       position:"absolute",
//       top:"50%",
//       left:"50%",
//       transform:"translate(-50%, -50%)",
//       width:"303",
//       bgcolor:"background.paper",
//       boxshadow:24,
//       p:3,
//       borderRadius:3
//       }} 
//       >
//         {otpverified ? (
//         <SetReset 
//         setIsModalOpen={setIsModalOpen}
//         />)
//         :(
//         <SetOTP
//         setOtpVerified ={setOtpVerified} 
//         />)
//         }

//       </Box>
//     </div>
//   )
// }

// export default ResetPassword

import React from 'react';
import { useState } from 'react';
import { Box, Paper } from "@mui/material";
import SetOTP from "./SetOTP";
import SetReset from "./SetReset";

const ResetPassword = ({ setIsModalOpen }) => {
    const [otpVerified, setOtpVerified] = useState(false);

    return (
        <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90%', sm: 400 },
            maxWidth: '100%',
        }}
        >
            <Paper
            elevation={3}
            sx={{
            p: 3,
            borderRadius: 2,
            }}
            >
                {otpVerified ? (
                <SetReset setIsModalOpen={setIsModalOpen} />) 
                :(
                <SetOTP setOtpVerified={setOtpVerified} />
                )}
            </Paper>
        </Box>
    );
};

export default ResetPassword;