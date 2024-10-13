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
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const user = localStorage.getItem("token");
  const adminRole = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {user && <Route path="/calendar" element={<CalendarView />} />}
          <Route path="/calendar/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />

          {/* Admin routes, rendered only if the user role is ADM */}
          {adminRole === "ADM" && (
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
