import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="nav-links">

        <button
          onClick={() =>
            navigate("/home")
          }
        >
          Home
        </button>

        <button
          onClick={() =>
            navigate("/billing")
          }
        >
          Billing
        </button>

        <button
          onClick={() =>
            navigate("/history")
          }
        >
          History
        </button>

        <button
  onClick={() => navigate("/reports")}
>
  Reports
</button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;