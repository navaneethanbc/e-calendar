import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import CalendarView from "./pages/CalendarView";
import Help from "./components/CalendarFunction/Help";
import Terms from "./components/Htmlpages/Terms";
import PrivacyPolicy from "./components/Htmlpages/Privacy_policy";
import PageContent from "./components/Admin/PageContent";
import Users from "./pages/AdminPages/Users";
import Dashboard from "./pages/AdminPages/Dashboard";
import EventManage from "./pages/AdminPages/EventManage";
import Reports from "./pages/AdminPages/Reports";
import Settings from "./pages/AdminPages/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

// deployment check

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {token ? (
            <>
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/calendar/help" element={<Help />} />
            </>
          ) : (
            <>
              <Route path="/calendar" element={<Navigate to="/" />} />
              <Route path="/calendar/help" element={<Navigate to="/" />} />
            </>
          )}

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />

          {role === "admin" && (
            <Route path="/admin/" element={<PageContent />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="events" element={<EventManage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
            </Route>
          )}

          <Route path="*" element={<NotFoundPage token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
