import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './features/auth/Login';
import AdminLayout from './features/admin/AdminLayout';
import EmployeeLayout from './features/employee/EmployeeLayout';
import RequireAuth from './core/guards/RequireAuth';
import RequireAdmin from './core/guards/RequireAdmin';
import MainLayout from './components/MainLayout';
import Users from './features/admin/pages/Users';
import UserPreferences from './features/shared/pages/UserPreferences';
import AdminSchedule from './features/admin/pages/AdminSchedule';
import EmployeeSchedule from './features/employee/pages/EmployeeSchedule';
import AdminDashboard from './features/admin/pages/AdminDashboard';

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} />

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Auth required */}
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            {/* Admin */}
            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="schedule" element={<AdminSchedule />} />
                <Route path="preferences" element={<UserPreferences />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>
            {/* Employee */}
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route path="schedule" element={<EmployeeSchedule />} />
              <Route path="preferences" element={<UserPreferences />} />
              <Route index element={<Navigate to="schedule" replace />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}