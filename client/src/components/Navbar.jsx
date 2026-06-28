import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button onClick={() => navigate("/home")}>
          Home
        </button>

        <button onClick={() => navigate("/billing")}>
          Billing
        </button>

        <button onClick={() => navigate("/history")}>
           History
        </button>

        <button onClick={() => navigate("/reports")}>
          Reports
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div
        className="nav-logo-box"
        onClick={() => navigate("/home")}
      >
        <img
          src={logo}
          alt="Logo"
          className="nav-logo"
        />
      </div>
    </nav>
  );
}

export default Navbar;