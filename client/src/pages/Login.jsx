import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto redirect if already logged in
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    const employee = JSON.parse(
      localStorage.getItem("employee")
    );

    if (
      employee &&
      employee.email === email &&
      employee.password === password
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      alert("Login Successful ✅");

      navigate("/home");
    } else {
      alert(
        "Invalid Email or Password ❌"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo-section">
          <img
            src={logo}
            alt="Virudavan Fruit Juice"
            className="login-logo"
          />
        </div>

        <h1>🍹 Virudavan Fruit Juice </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="signup-text">
          Don't have an account?
        </p>

        <Link to="/register">
          <button className="secondary-btn">
            Sign Up
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Login;