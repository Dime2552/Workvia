import { Outlet } from 'react-router-dom';

export default function EmployeeLayout() {
  return (
    <div>
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}