import React from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

function RegisterPage() {
  return (
    <>
      <Header />
      
      <Box
        display={{ sm: "flex", xs: "block" }}
        mt={10}
        height={"calc(100vh - 140px)"}
        width={"100%"}
        alignItems={"center"}
        bgcolor={"#e6f5e8"}
      >
        <Box
          component="img"
          src="src/assets/background.png"
          alt="background"
          height={540}
          mt={10}
          borderColor="transparent"
          display={{ xs: "none", sm: "block" }}
        ></Box>
        <Box
          component={"form"}
          mt={{ xs: -1.5, sm: 5 }}
          ml={{ xs: 7.75, sm: 15 }}
          mr={{ xs: 0, sm: 15 }}
          width={{ xs: 250, sm: 640 }}
          height={560}
          bgcolor={"white"}
          borderRadius={3}
          
        >
          <RegisterForm />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default RegisterPage;