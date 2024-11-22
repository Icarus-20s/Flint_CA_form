import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Changed Link to NavLink
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/Images/logo.jpg"; // Ensure the path to your logo is correct

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);  // Toggle state in a cleaner way
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      {/* Logo link */}
      <NavLink to="/" className="logo-link" onClick={closeMenu}>
        <img src={logo} alt="Logo" className="logo-img" />
      </NavLink>

      {/* Menu Icon for mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        <MenuIcon />
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")} // React Router v6: Set active class
          exact
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Services
        </NavLink>
        <NavLink
          to="/career"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Carrer
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/login"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
