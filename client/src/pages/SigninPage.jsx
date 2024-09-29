import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import SigninForm from "../components/SigninForm";

function SigninPage() {
  return (
    <>
      <Header />
      <div>
        <Box
          display={{ sm: "flex", xs: "block" }}
          mt={10}
          height="calc(100vh - 140px)"
          width={"100%"}
          alignItems={"center"}
          bgcolor={"#e6f5e8"}
        >
          <Box
            component="img"
            src="src/assets/mobilebg.png"
            alt="background"
            height={300}
            mt={10}
            ml={3.5}
            borderColor="transparent"
            display={{ xs: "block", sm: "none" }}
          />
          <Box
            mt={{ xs: -1.5, sm: 25 }}
            ml={{ xs: 7.75, sm: 10 }}
            mr={{ xs: 0, sm: 15 }}
            height={{ sm: 280 }}
            bgcolor={"white"}
            borderRadius={3}
          >
            <SigninForm />
          </Box>
          <Box
            component="img"
            src="src/assets/background.png"
            alt="background"
            height={540}
            mt={10}
            display={{ xs: "none", sm: "block" }}
          />
        </Box>
      </div>
      <Footer />
    </>
  );
}

export default SigninPage;
