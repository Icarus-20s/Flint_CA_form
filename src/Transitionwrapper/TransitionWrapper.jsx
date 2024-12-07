import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Transitionwrapper.css';

const TransitionWrapper = ({ children }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set show to true when location changes to trigger the transition
    setShow(false);
    setTimeout(() => setShow(true), 100); // Delay for the fade-in effect
  }, [location]);

  return (
    <div className={`fade ${show ? 'show' : ''}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
