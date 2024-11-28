import React from 'react';
import './Loader.css'; // Import the styles

const Loader = ({ height = true, size = 50, color = "#4CAF50" }) => {
  const containerHeight = height ? '70vh' : '50px'; // Adjust container height
  const loaderStyles = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${size / 10}px`, // Scaled border width
    borderTopColor: color,
  };

  return (
    <div className="loader-container" style={{ height: containerHeight }}>
      <div className="loader" style={loaderStyles}></div>
    </div>
  );
};

export default Loader;
