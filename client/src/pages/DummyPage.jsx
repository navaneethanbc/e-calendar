import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

// DummyPage component with a working logout button
function DummyPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
    // window.location.reload();
  };

  return (
    <>
      <Header />
      <Box
        display={{ sm: "flex", xs: "block" }}
        justifyItems={"flex-start"}
        alignItems={"center"}
      >
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
          ml={{ xs: 7.75, sm: 20 }}
          mr={{ xs: 0, sm: 15 }}
          width={{ xs: 250, sm: 300 }}
        >
          <h1>Welcome to the Dummy Page</h1>
          <button onClick={handleLogout}>Logout</button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default DummyPage;
