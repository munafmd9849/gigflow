import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardShell } from "./components/layout/DashboardShell";
import { AuthBootstrap } from "./components/routes/AuthBootstrap";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardHomePage } from "./pages/dashboard/DashboardHomePage";
import { LeadsPage } from "./pages/dashboard/LeadsPage";

function App() {
  return (
    <AuthBootstrap>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="leads" element={<LeadsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthBootstrap>
  );
}

export default App;
