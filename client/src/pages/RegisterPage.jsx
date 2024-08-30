import React from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

function RegisterPage() {
  return (
    <>
      <Header />
      <Box display={"flex"} alignItems={"center"}>
        <Box
          component="img"
          src="src/assets/background.jpg"
          alt="background"
          // flex={5}
          height={550}
          mt={17}
          borderColor="transparent"
          display={{ xs: "none", sm: "block" }}
        ></Box>
        <Box
          component={"form"}
          // flex={2}
          mt={{ xs: -1.5, sm: 15 }}
          ml={{ xs: 7.75, sm: 15 }}
          mr={{ xs: 0, sm: 20 }}
          width={{ xs: 250, sm: 600 }}
        >
          <RegisterForm />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default RegisterPage;
