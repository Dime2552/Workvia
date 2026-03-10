import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}