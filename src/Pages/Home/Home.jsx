import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import axios from 'axios'; // Axios for API calls
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]); // State to store services
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/home/'); // Adjust the endpoint as needed
        setServices(response.data); // Store the fetched services
        setLoading(false); // Set loading to false after fetching is done
      } catch (error) {
        console.log("Error fetching services:", error);
        setLoading(false); // In case of an error, stop loading
      }
    };

    fetchServices();
  }, []); // Empty dependency array to fetch only once when component mounts

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
        {/* Conditionally render services or loading text */}
        <div className="services-list">
          {loading ? (
            <p>Loading services...</p> // Display loading message while fetching data
          ) : (
            services.map((service) => (
              <div className="service" key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
