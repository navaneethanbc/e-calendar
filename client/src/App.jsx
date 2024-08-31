import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import CalendarView from "./components/CalendarView";
import Notification from "./components/Notification";
import Help from "./components/CalendarComponent/Help";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import Reset from "./components/ForgotPassword/Reset";
import OTP from "./components/ForgotPassword/OTP";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const user = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {user && <Route path="/calendar" element={<CalendarView />} />}
          <Route path="/notification" element={<Notification />} />
          <Route path="/calendar/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/reset" element={<Reset setPassword={setPassword} />} />
          <Route
            path="/otp"
            element={
              <OTP
                otp={otp}
                setOtp={setOtp}
                email={username}
                setEmail={setUsername}
              />
            }
          />

          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
