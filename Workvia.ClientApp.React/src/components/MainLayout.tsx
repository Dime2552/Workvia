import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <Outlet />
    </div>
  );
}