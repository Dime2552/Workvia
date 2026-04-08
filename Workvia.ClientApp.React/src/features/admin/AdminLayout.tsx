import { Outlet, NavLink } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="d-flex" id="wrapper">
      
      {/* Sidebar */}
      <div className="bg-dark text-white border-end" id="sidebar-wrapper" style={{ minWidth: '250px', minHeight: 'calc(100vh - 56px)' }}>
        <div className="sidebar-heading border-bottom bg-dark p-3">
          <h4 className="m-0">Admin Panel</h4>
        </div>
        <div className="list-group list-group-flush">
          <NavLink to="/admin/dashboard" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>

          <NavLink to="/admin/users" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-people me-2"></i> Users
          </NavLink>

          <NavLink to="/admin/schedule" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-calendar-week me-2"></i> Shifts
          </NavLink>

          <NavLink to="/admin/notifications" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-bell me-2"></i> Notifications
          </NavLink>

          <NavLink to="/admin/preferences" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-gear me-2"></i> Preferences
          </NavLink>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper" className="bg-light">
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>

    </div>
  );
}