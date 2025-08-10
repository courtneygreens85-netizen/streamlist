import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="material-icons">movie</span>
        <span>StreamList</span>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="material-icons">checklist</span> StreamList
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="material-icons">local_movies</span> Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="material-icons">shopping_cart</span> Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="material-icons">info</span> About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
