import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './Home.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Tax Consultancy',
      description: 'We provide expert advice on tax planning, optimization, and compliance.',
      image: 'public/Images/img8.jpg',
    },
    {
      id: 2,
      title: 'Auditing & Assurance',
      description: 'We ensure your financial statements are accurate and compliant.',
      image: 'public/Images/img5.jpg',
    },
    {
      id: 3,
      title: 'Business Advisory',
      description: 'We guide businesses to make strategic decisions and optimize operations.',
      image: 'public/Images/img6.jpg',
    },
    {
      id: 4,
      title: 'Financial Planning',
      description: 'We help individuals and businesses plan for a secure financial future.',
      image: 'public/Images/story.jpg',
    },
    {
      id: 5,
      title: 'Risk Management',
      description: 'We provide risk assessment and management services for businesses.',
      image: 'public/Images/img10.png',
    },
    {
      id: 6,
      title: 'Forensic Accounting',
      description: 'We provide investigative accounting services for fraud detection and litigation support.',
      image: 'public/Images/img11.png',
    },
  ];

  const openModal = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentService(null);
  };

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO, XYZ Corporation',
      testimonial: 'Their advisory services helped us achieve financial growth and compliance.',
      image: '/public/Images/img4.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CFO, ABC Ltd.',
      testimonial: 'The team’s expertise in tax planning saved us significant costs.',
      image: 'public/Images/img1.jpg',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      title: 'Founder, FinTech Solutions',
      testimonial: 'I highly recommend their business advisory services for growth-oriented companies.',
      image: 'public/Images/img2.jpg',
    },
    {
      id: 4,
      name: 'Emily Taylor',
      title: 'Owner, Startup Inc.',
      testimonial: 'Their risk management services helped us minimize operational losses.',
      image: 'public/Images/img3.jpg',
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            <span className="highlight">Welcome</span> to Our <span className="highlight">Chartered Accountant</span> Firm
          </h1>
          <p>Your trusted partner for expert financial and accounting solutions.</p>
        </div>
        {/* Scroll to Services */}
        <div className="scroll-to-services">
          <Link to="services" smooth={true} duration={500} className="cta-button">
            Explore Our Services <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2 className="section-heading">Our Services</h2>
        <div className="services-list">
          {services.map((service) => (
            <div className="service-card" key={service.id} onClick={() => openModal(service)}>
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-info">
                <h3 className="service-title">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Service Details */}
{showModal && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h5 className="modal-title">{currentService?.title}</h5>
        <button type="button" className="close" onClick={closeModal}>×</button>
      </div>
      <div className="modal-body">
        {/* Display Service Image */}
        <img src={currentService?.image} alt={currentService?.title} className="modal-image" />
        {/* Display Service Description */}
        <p>{currentService?.description}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={closeModal}>Close</button>
      </div>
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
