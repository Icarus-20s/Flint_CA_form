import React from 'react';
import './Loader.css'; // Import CSS for loader styles

const Loader = ({ height = true }) => {
  return (
    <div className="loader-container" style={{ height: `${height ? '70vh' : '50px'}` }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;