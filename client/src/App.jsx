import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import CalendarView from "./pages/CalendarView";
import Help from "./components/CalendarFunction/Help";
import Terms from "./components/Htmlpages/Terms";
import Cookies from "./components/Htmlpages/Cookies_policy";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";

// import TheCalendar from "./components/TheCalendar";

import PageContent from "./components/Admin/PageContent";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import EventManage from "./pages/EventManage";
import Reports from "./pages/Reports";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* {user && <Route path="/calendar" element={<TheCalendar />} />} */}
          {user && <Route path="/calendar" element={<CalendarView />} />}
          <Route path="/calendar/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Catch-all route to redirect invalid URLs to home */}
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/admin/*" element={<PageContent />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<EventManage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
