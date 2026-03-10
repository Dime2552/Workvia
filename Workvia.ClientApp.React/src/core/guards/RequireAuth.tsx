import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

export default function RequireAuth() {
  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}