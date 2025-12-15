import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("shade_user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>ShadeStack</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/collection">My Collection</Link>
        </li>
        <li>
          <Link to="/sunglasses/add">Add Sunglasses</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
