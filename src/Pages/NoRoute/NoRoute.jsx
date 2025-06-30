import React, { useEffect } from "react";
import "./NoRoute.css";
import { useNavigate } from "react-router-dom";

const NoMatchRoute = () => {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/");
    };
    return (
        <div className="no-match-container">
            <h1>Error 404</h1>
            <p>Page not found</p>
            <button onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default NoMatchRoute;
