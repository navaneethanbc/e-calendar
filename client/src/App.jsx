<<<<<<< HEAD
import React from 'react'
import Login from './components/Login/Login'
=======
import "./App.css";
import Register from "./components/Register/Register";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
>>>>>>> 3653e1845d681d102c885bd69ffe313cd46d1166

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
          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
