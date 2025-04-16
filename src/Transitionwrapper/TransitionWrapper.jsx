import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Transitionwrapper.css';

const TransitionWrapper = ({
  children,
  animation = 'fade',
  duration = 300,
  delay = 50,
}) => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [location, delay]);

  return (
    <div
      className={`transition-wrapper ${animation} ${show ? 'in' : 'out'}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
