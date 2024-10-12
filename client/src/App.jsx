import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import CalendarView from "./pages/CalendarView";
import Help from "./components/CalendarFunction/Help";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import PageContent from "./components/Admin/PageContent";
import Users from "./pages/AdminPages/Users";
import Dashboard from "./pages/AdminPages/Dashboard";
import EventManage from "./pages/AdminPages/EventManage";
import Reports from "./pages/AdminPages/Reports";
import Settings from "./pages/AdminPages/Settings";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const user = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const getAdmin = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/getadmin/${username}`
      );
      setRole(response.data);
    } catch (error) {
      console.log("Error admin", error);
    }
  };

  useEffect(() => {
    if (username) {
      getAdmin(username);
    }
  }, [username]);

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

          {/* Admin routes, rendered only if the user role is ADM */}
          {role === "ADM" && (
            <Route path="/admin/*" element={<PageContent />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="events" element={<EventManage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
            </Route>
          )}

          {/* Catch-all route to redirect invalid URLs to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
