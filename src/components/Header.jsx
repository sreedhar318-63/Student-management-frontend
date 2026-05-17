import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="sma-header">
      <div className="sma-header-brand">
        <span className="sma-header-logo">🎓</span>
        <h2 className="sma-header-title">Student App</h2>
      </div>
      <nav className="sma-header-nav" style={{ alignItems: "center" }}>
        <Link 
          to="/" 
          className={`sma-header-nav-item ${currentPath === '/' ? 'sma-nav-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          Home
        </Link>
        <Link 
          to="/students" 
          className={`sma-header-nav-item ${currentPath === '/students' ? 'sma-nav-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          Students
        </Link>
        <Link 
          to="/ai" 
          className="sma-btn-ai"
          style={{ textDecoration: 'none' }}
        >
          ✨ AI Assistant
        </Link>
        <button 
          onClick={handleLogout}
          className="sma-btn sma-btn-outline"
          style={{ marginLeft: '10px', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;