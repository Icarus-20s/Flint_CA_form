// src/components/LoadingSpinner/LoadingSpinner.jsx
import React from "react";
import { Loader } from "lucide-react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ overlay = true, message = "Loading..." }) => {
  if (overlay) {
    return (
      <div className="loading-container">
        <div className="spinner-overlay">
          <Loader size={32} className="loading-spinner-icon" />
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-spinner">
      <Loader size={24} className="loading-spinner-icon" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;