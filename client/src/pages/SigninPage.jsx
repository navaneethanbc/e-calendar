import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import Footer from "../components/Footer";
import SigninForm from "../components/SigninForm";
import background from "../assets/background.png";
import mobilebg from "../assets/mobilebg.png";

const SigninPage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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
          alignContent={"center"}
          padding={{ xs: 0, md: 4 }}
          display={{ xs: "block", md: "none" }}
        >
          <Box
            component="img"
            src={isSm ? mobilebg : background}
            alt="background"
            height={{ xs: "45vh", md: "60vh" }}
          />
        </Box>
        <Box display={"block"}>
          <SigninForm />
        </Box>
        <Box
          alignSelf={"center"}
          padding={2}
          display={{ xs: "none", md: "block" }}
        >
          <Box component="img" src={background} alt="background" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SigninPage;
