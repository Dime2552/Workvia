import { Outlet, NavLink } from 'react-router-dom';
import '../admin/AdminLayout.css';

export default function EmployeeLayout() {
  return (
    <div className="d-flex" id="wrapper">
      
      {/* Sidebar */}
      <div className="bg-dark text-white border-end" id="sidebar-wrapper" style={{ minWidth: '250px', minHeight: 'calc(100vh - 56px)' }}>
        <div className="sidebar-heading border-bottom bg-dark p-3">
          <h4 className="m-0">Employee Panel</h4>
        </div>
        <div className="list-group list-group-flush">
          <NavLink to="/employee/schedule" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-calendar-week me-2"></i> Schedule
          </NavLink>

          <NavLink to="/employee/notifications" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
            <i className="bi bi-bell me-2"></i> Notifications
          </NavLink>

          <NavLink to="/employee/preferences" className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white p-3">
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