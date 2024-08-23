import "./App.css";
import Register from "./components/Register/Register";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import Login from "./components/Login/Login";
import Reset from "./components/ForgotPassword/Reset";
import OTP from "./components/ForgotPassword/OTP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp,setOtp] = useState('')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login 
          email={email} 
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}/>} 
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP 
          otp={otp}
          setOtp={setOtp}
          email={email}
          setEmail={setEmail}/>} 
          />
          <Route path="/reset" element={<Reset 
          setPassword={setPassword}/>} 
          />

          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
