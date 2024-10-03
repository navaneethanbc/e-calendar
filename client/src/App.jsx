import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import CalendarView from "./components/CalendarView";
import Help from "./components/CalendarComponent/Help";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {user && <Route path="/calendar" element={<CalendarView />} />}
          <Route path="/calendar/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
