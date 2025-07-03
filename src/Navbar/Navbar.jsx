import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";

const Navbar = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State to control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Keep track of the last scroll position
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      auth.logout();
      navigate("/");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isNavbarVisible ? "visible" : "hidden"}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="images/logo.jpg" alt="Logo" className="logo-img" style={{ height: "40px" }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarResponsive">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/" onClick={closeMenu} >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/services" onClick={closeMenu} >Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/careers" onClick={closeMenu} >Career</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/resources" onClick={closeMenu} >Resources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about" onClick={closeMenu} >About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact" onClick={closeMenu} >Contact Us</NavLink>
            </li>
          </ul>
          <div className="ms-3">
            {!auth.isAuthenticated ? (
              <NavLink className="btn btn-primary" to="/login" onClick={closeMenu}>Login</NavLink>
            ) : (
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
