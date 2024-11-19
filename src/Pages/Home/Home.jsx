import React from 'react';
import { Link } from 'react-scroll'; // Importing the react-scroll library for smooth scrolling
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            <span>Welcome</span> to Our <span>Chartered Accountant</span> Firm
          </h1>
          <p>Your trusted partner for expert financial and accounting solutions.</p>
          <Link to="services" smooth={true} duration={500} className="cta-button">
            Our Services
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service">
            <h3>Tax Consultancy</h3>
            <p>Get expert tax planning and advice to optimize your tax liabilities and avoid any compliance issues.</p>
          </div>
          <div className="service">
            <h3>Accounting & Bookkeeping</h3>
            <p>Our team offers reliable accounting services, ensuring accurate financial records and reports.</p>
          </div>
          <div className="service">
            <h3>Business Advisory</h3>
            <p>Strategic advice to help your business grow, reduce costs, and increase profitability.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
