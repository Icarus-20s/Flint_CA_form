import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './Home.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Hardcoded services data
  const services = [
    {
      id: 1,
      title: 'Tax Consultancy',
      description: 'We provide expert advice on tax planning, optimization, and compliance.',
      image: 'https://via.placeholder.com/250x150?text=Tax+Consultancy',
    },
    {
      id: 2,
      title: 'Auditing & Assurance',
      description: 'We ensure your financial statements are accurate and compliant.',
      image: 'https://via.placeholder.com/250x150?text=Auditing+%26+Assurance',
    },
    {
      id: 3,
      title: 'Business Advisory',
      description: 'We guide businesses to make strategic decisions and optimize operations.',
      image: 'https://via.placeholder.com/250x150?text=Business+Advisory',
    },
  ];

  // Handle opening modal with service details
  const openModal = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentService(null);
  };

  // Hardcoded testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO, XYZ Corporation',
      testimonial: 'Their advisory services helped us achieve financial growth and compliance.',
      image: 'https://via.placeholder.com/100x100?text=John+Doe',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CFO, ABC Ltd.',
      testimonial: 'The team’s expertise in tax planning saved us significant costs.',
      image: 'https://via.placeholder.com/100x100?text=Jane+Smith',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      title: 'Founder, FinTech Solutions',
      testimonial: 'I highly recommend their business advisory services for growth-oriented companies.',
      image: 'https://via.placeholder.com/100x100?text=Michael+Johnson',
    },
  ];

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
          {services.map((service) => (
            <div className="service" key={service.id} onClick={() => openModal(service)}>
              <img src={service.image} alt={service.title} className="service-image" />
              <h3>{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Service Details */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{currentService?.title}</h2>
            <img src={currentService?.image} alt={currentService?.title} className="modal-image" />
            <p>{currentService?.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <div className="testimonial" key={testimonial.id}>
              <div className="testimonial-image-container">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.testimonial}"</p>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
