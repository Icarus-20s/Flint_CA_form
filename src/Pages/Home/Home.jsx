import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Home.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      'public/Images/img15.jpg',
      'public/Images/img4.jpg',
      'public/Images/story.jpg',
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="hero-slider">
        <div
          className="slider-images"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
            </div>
          ))}
        </div>
      </div>
    );
  };

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
    <main className="home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <HeroSlider />
        <div className="hero-content">
          <h1>
            <span className="highlight">Welcome</span> to <span className="highlight">K.B.P.S </span>& <span className='highlight'>Associates</span>
          </h1>
          <p>Strengthening Compliance and Reporting for transparency and accountability.
          </p>
          <div className="scroll-to-services">
            <Link to="services" smooth={true} duration={500} className="cta-button">
              Explore Our Services <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2 className="section-heading">Our Services</h2>
        <div className="services-list">
          {services.map((service) => (
            <Card key={service.id} sx={{ maxWidth: 345, margin: '20px', boxShadow: 3 }}>
              <CardMedia
                component="img"
                alt={service.title}
                height="140"
                image={service.image}
                title={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => openModal(service)}>Learn More</Button>
              </CardActions>
            </Card>
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
              <img src={currentService?.image} alt={currentService?.title} className="modal-image" />
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
    </main>
  );
};

export default Home;
