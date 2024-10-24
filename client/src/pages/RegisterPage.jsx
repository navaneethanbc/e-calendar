import React from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import background from "../assets/background.png";

const RegisterPage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      width={"100vw"}
      sx={{ flexFlow: "nowrap" }}
    >
      <Header />
      <Box
        display={"flex"}
        gap={1}
        flexDirection={{ xs: "column", md: "row" }}
        flex={"auto"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"#e6f5e8"}
      >
        <Box
          alignSelf={"center"}
          padding={2}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Box component="img" src={background} alt="background" />
        </Box>
        <Box
          alignSelf={"center"}
          padding={2}
          display={{ xs: "none", sm: "block", md: "none" }}
        >
          <Box
            component="img"
            src={background}
            alt="background"
            height={"30vh"}
          />
        </Box>
        <Box display={"block"} alignSelf={"center"}>
          <RegisterForm />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default RegisterPage;
