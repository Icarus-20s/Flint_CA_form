import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Transitionwrapper.css';

const TransitionWrapper = ({
  children,
  animation = 'fade',
  duration = 300,
  delay = 50,
  loaderComponent = null, // Optional custom loader component
}) => {
  const [show, setShow] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [isChanging, setIsChanging] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start transition when location changes
    setIsChanging(true);
    setShow(false);
    
    // Step 1: Fade out current content
    const fadeOutTimer = setTimeout(() => {
      // Step 2: Update content (while hidden)
      setCurrentChildren(children);
      
      // Step 3: After a brief delay to ensure DOM updates, fade in new content
      const fadeInTimer = setTimeout(() => {
        setShow(true);
        
        // Step 4: Mark transition as complete after animation finishes
        const completeTimer = setTimeout(() => {
          setIsChanging(false);
        }, duration + 50);
        
        return () => clearTimeout(completeTimer);
      }, 50); // Small buffer for content swap
      
      return () => clearTimeout(fadeInTimer);
    }, duration); // Wait for exit animation to complete
    
    return () => clearTimeout(fadeOutTimer);
  }, [location.pathname, children, duration]);

  // Ensure page scrolls to top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Default loader
  const DefaultLoader = () => (
    <div className="transition-loader">
      <div className="loader-spinner"></div>
    </div>
  );

  return (
    <div className="transition-wrapper-container">
      {/* The actual content with transition */}
      <div
        className={`transition-wrapper ${animation} ${show ? 'in' : 'out'}`}
        style={{ 
          transitionDuration: `${duration}ms`,
          visibility: show ? 'visible' : 'hidden' // Prevent layout shifts
        }}
        aria-live="polite"
      >
        {currentChildren}
      </div>
      
      {/* Optional loader overlay during transitions */}
      {isChanging && (
        <div className="transition-loader-container">
          {loaderComponent || <DefaultLoader />}
        </div>
      )}
    </div>
  );
};

export default TransitionWrapper;