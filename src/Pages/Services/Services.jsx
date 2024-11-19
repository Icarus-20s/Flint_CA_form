// src/pages/Services/Services.jsx
import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      <h1>Our Services</h1>
      <div className="service-list">
        <div className="service">
          <h3>Tax Consultancy</h3>
          <p>We provide expert tax advisory services for individuals and businesses.</p>
        </div>
        <div className="service">
          <h3>Accounting Services</h3>
          <p>Our team offers accurate and timely accounting services.</p>
        </div>
        <div className="service">
          <h3>Business Consultancy</h3>
          <p>Get strategic advice to take your business to the next level.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
