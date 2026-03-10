import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

export default function Navbar() {
  const navigate = useNavigate();
  const userName = AuthService.getCurrentUserName();
  const isLoggedIn = AuthService.isLoggedIn();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Workvia</Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link text-white me-3">{userName}</span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-success" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}