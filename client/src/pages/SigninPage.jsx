import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import SigninForm from "../components/SigninForm";

function SigninPage() {
  return (
    <>
      <Header />
      <Box
        display={{ sm: "flex", xs: "block" }}
        justifyItems={"flex-start"}
        alignItems={"center"}
      >
        <Box
          component="img"
          src="src/assets/mobilebg.jpg"
          alt="background"
          height={300}
          mt={10}
          ml={3.5}
          borderColor="transparent"
          display={{ xs: "block", sm: "none" }}
        />
        <Box
          // flex={2}
          mt={{ xs: -1.5, sm: 25 }}
          ml={{ xs: 7.75, sm: 15 }}
          mr={{ xs: 0, sm: 15 }}
          width={{ xs: 250, sm: 300 }}
        >
          <SigninForm />
        </Box>
        <Box
          // flex={5}
          component="img"
          src="src/assets/background.jpg"
          alt="background"
          height={550}
          mt={17}
          borderColor="transparent"
          display={{ xs: "none", sm: "block" }}
        />
      </Box>
      <Footer />
    </>
  );
}

export default SigninPage;
