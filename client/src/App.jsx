import "./App.css";
import Register from "./components/Register/Register";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import Login from "./components/Login/Login";
import Reset from "./components/ForgotPassword/Reset";
import OTP from "./components/ForgotPassword/OTP";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset" element={<Reset />} />

          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
