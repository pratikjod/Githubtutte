import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Logo() {
  return (
    <Link to="/home">
      <img
        src={logo}
        alt="Virudavan Fruit Juice"
        style={{
          width: "120px",
          cursor: "pointer",
        }}
      />
    </Link>
  );
}

export default Logo;