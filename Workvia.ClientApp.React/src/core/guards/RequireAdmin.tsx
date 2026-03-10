import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

export default function RequireAdmin() {
  if (!AuthService.isLoggedIn() || !AuthService.isAdmin()) {
    return <Navigate to="/employee" replace />;
  }

  return <Outlet />;
}