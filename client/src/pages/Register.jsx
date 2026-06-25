import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.jpeg";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "employee",
      JSON.stringify(formData)
    );

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🍹 Employee Registration</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
        />

        <select
          name="gender"
          onChange={handleChange}
        >
          <option value="">
            Select Gender
          </option>
          <option value="Male">
            Male
          </option>
          <option value="Female">
            Female
          </option>
          <option value="Other">
            Other
          </option>
        </select>

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p>
          Already Registered?
        </p>

        <Link to="/login">
          <button className="secondary-btn">
            Login
          </button>
        </Link>
        <div style={{ textAlign: "center" }}>
  <img
    src={logo}
    alt="Logo"
    style={{
      width: "180px",
      marginBottom: "20px",
    }}
  />
</div>
      </div>
    </div>
  );
}

export default Register;