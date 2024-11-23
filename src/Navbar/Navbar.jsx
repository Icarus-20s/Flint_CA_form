import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/Images/logo.jpg"; // Ensure the path to your logo is correct
import { useAuth } from "../Context/AuthContextProvider";

const Navbar = () => {
    const auth = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate hook to redirect after logout

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState); // Toggle state in a cleaner way
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Do you really want to logout?");
        if (confirmLogout) {
            auth.logout(); // Perform the logout operation
            navigate("/"); // Redirect to home (or login page) after logout
        }
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
                    className={({ isActive }) => (isActive ? "active" : "")}
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
                    Career
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

                {/* Conditionally render Login or Logout based on authentication */}
                {!auth.isAuthenticated ? (
                    <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Login
                    </NavLink>
                ) : (
                    <NavLink
                        to="/logout"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            handleLogout(); // Trigger the logout process
                        }}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Logout
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
