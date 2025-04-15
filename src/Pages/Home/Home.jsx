import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Home.css';
import { 
  Card, CardContent, Button, Typography, 
  Grid, Box, Container, IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SavingsIcon from '@mui/icons-material/Savings';
import SecurityIcon from '@mui/icons-material/Security';
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useNavigate } from 'react-router-dom';

// HeroSlider Component with fade transitions
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);
  const navigate = useNavigate();
  
  const images = [
    'public/Images/homepageImg/slide1.jpg',
    'public/Images/homepageImg/slide2.jpg',
    'public/Images/homepageImg/slide3.jpg',
  ];

  const changeSlide = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide('next');
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="hero-slider">
      <div 
        className={`slide-container ${isTransitioning ? 'transitioning' : ''}`} 
        ref={slideRef}
      >
        <div className="slide active" style={{ backgroundImage: `url(${images[currentIndex]})` }} />
      </div>
      <div className="slider-controls">
        <IconButton 
          className="slider-arrow prev" 
          onClick={() => changeSlide('prev')}
          aria-label="Previous slide"
        >
          <ArrowBackIcon />
        </IconButton>
        <div className="slider-dots">
          {images.map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <IconButton 
          className="slider-arrow next" 
          onClick={() => changeSlide('next')}
          aria-label="Next slide"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  );
};

// ServiceCard Component with hover effects
const ServiceCard = ({ service, onLearnMore }) => {
  const icons = {
    'Tax Consultancy': <BusinessCenterIcon fontSize="large" />,
    'Auditing & Assurance': <AccountBalanceIcon fontSize="large" />,
    'Business Advisory': <AssessmentIcon fontSize="large" />,
    'Financial Planning': <SavingsIcon fontSize="large" />,
    'Risk Management': <SecurityIcon fontSize="large" />
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="service-card">
        <div className="service-icon">
          {icons[service.title]}
        </div>
        <CardContent className="service-content">
          <Typography variant="h5" component="h3" className="service-title">
            {service.title}
          </Typography>
          <Typography variant="body2" className="service-description">
            {service.description}
          </Typography>
          <Button 
            className="learn-more-btn"
            onClick={() => onLearnMore(service)}
            endIcon={<ArrowForwardIcon />}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

// Enhanced Modal Component
const Modal = ({ service, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <Typography variant="h5">{service?.title}</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="modal-body">
        <div className="modal-image-container">
          <img src={service?.image} alt={service?.title} className="modal-image" />
        </div>
        <Typography variant="body1" className="modal-description">
          {service?.description}
        </Typography>
        <Typography variant="body1" className="modal-extended-description">
          {service?.extendedDescription || `Our ${service?.title} service is designed to provide comprehensive solutions tailored to your specific needs. With our expert team and years of experience, we ensure optimal results and satisfaction.`}
        </Typography>
      </div>
      <div className="modal-footer">
        <Button 
          variant="contained" 
          className="contact-btn"
          onClick={onClose}
        >
          Contact Us
        </Button>
        <Button 
          variant="outlined" 
          className="close-btn"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  </div>
);

// Enhanced Testimonials Component with carousel
const Testimonials = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const testimonialsPerView = 2;
  const maxIndex = Math.ceil(testimonials.length / testimonialsPerView) - 1;

  const next = () => {
    setCurrent(current => Math.min(current + 1, maxIndex));
  };

  const prev = () => {
    setCurrent(current => Math.max(current - 1, 0));
  };

  return (
    <div className="testimonials-container">
      <div 
        className="testimonials-list"
        style={{ transform: `translateX(-${current * 100 / (maxIndex + 1)}%)` }}
      >
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} className="testimonial-card">
            <div className="testimonial-quote-icon">
              <FormatQuoteIcon />
            </div>
            <Typography variant="body1" className="testimonial-text">
              "{testimonial.testimonial}"
            </Typography>
            <div className="testimonial-profile">
              <div className="testimonial-image-container">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              </div>
              <div className="testimonial-info">
                <Typography variant="h6" className="testimonial-name">{testimonial.name}</Typography>
                <Typography variant="subtitle2" className="testimonial-title">{testimonial.title}</Typography>
              </div>
            </div>
          </Box>
        ))}
      </div>
      {maxIndex > 0 && (
        <div className="testimonial-controls">
          <IconButton 
            onClick={prev} 
            disabled={current === 0}
            className={`testimonial-arrow ${current === 0 ? 'disabled' : ''}`}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="testimonial-dots">
            {Array(maxIndex + 1).fill().map((_, idx) => (
              <button 
                key={idx} 
                className={`testimonial-dot ${idx === current ? 'active' : ''}`} 
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
          <IconButton 
            onClick={next} 
            disabled={current === maxIndex}
            className={`testimonial-arrow ${current === maxIndex ? 'disabled' : ''}`}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

// Statistics Component
const Statistics = () => {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    experience: 0,
    satisfaction: 0
  });
  
  const targetStats = {
    clients: 250,
    projects: 500,
    experience: 15,
    satisfaction: 98
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setStats(prev => {
              const newStats = {...prev};
              let completed = true;
              
              for (const key in targetStats) {
                if (prev[key] < targetStats[key]) {
                  newStats[key] = Math.min(
                    prev[key] + Math.ceil(targetStats[key] / 50),
                    targetStats[key]
                  );
                  completed = false;
                }
              }
              
              if (completed) clearInterval(interval);
              return newStats;
            });
          }, 50);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('statistics-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  return (
    <Box className="statistics-container">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <div className="stat-card">
            <Typography variant="h3" className="stat-number">{stats.clients}+</Typography>
            <Typography variant="subtitle1" className="stat-label">Happy Clients</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="stat-card">
            <Typography variant="h3" className="stat-number">{stats.projects}+</Typography>
            <Typography variant="subtitle1" className="stat-label">Projects Completed</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="stat-card">
            <Typography variant="h3" className="stat-number">{stats.experience}+</Typography>
            <Typography variant="subtitle1" className="stat-label">Years Experience</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="stat-card">
            <Typography variant="h3" className="stat-number">{stats.satisfaction}%</Typography>
            <Typography variant="subtitle1" className="stat-label">Client Satisfaction</Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

// Main Home Component
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Tax Consultancy',
      description: 'Expert advice on tax planning, optimization, and compliance for businesses and individuals.',
      image: 'public/Images/img8.jpg',
      extendedDescription: 'Our comprehensive tax consultancy services help clients navigate complex tax regulations, minimize tax liabilities, and ensure full compliance with local and international tax laws. We provide personalized tax solutions tailored to your specific needs.'
    },
    {
      id: 2,
      title: 'Auditing & Assurance',
      description: 'Rigorous financial statement audits and assurance services to enhance credibility and transparency.',
      image: 'public/Images/img5.jpg',
      extendedDescription: 'Our auditing and assurance services provide an objective evaluation of financial statements and operational processes. We help identify risks, improve internal controls, and enhance the reliability of your financial reporting.'
    },
    {
      id: 3,
      title: 'Business Advisory',
      description: 'Strategic guidance for business growth, operational efficiency, and sustainable development.',
      image: 'public/Images/img6.jpg',
      extendedDescription: 'Our business advisory services provide strategic insights and practical solutions to help your business thrive. From startup guidance to succession planning, we work with you to achieve your business objectives.'
    },
    {
      id: 4,
      title: 'Financial Planning',
      description: 'Customized financial strategies to secure your future and achieve long-term financial goals.',
      image: 'public/Images/story.jpg',
      extendedDescription: 'Our financial planning services help you create a roadmap for your financial future. We analyze your current situation, define goals, and develop strategies for wealth creation, retirement planning, and wealth preservation.'
    },
    {
      id: 5,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment and mitigation strategies to protect your business interests.',
      image: 'public/Images/img10.png',
      extendedDescription: 'Our risk management services help identify, assess, and mitigate financial and operational risks. We develop robust risk management frameworks tailored to your business environment and objectives.'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO, XYZ Corporation',
      testimonial: 'K.B.P.S & Associates has transformed our financial strategy completely. Their advisory services helped us achieve significant growth while maintaining full compliance with regulatory requirements.',
      image: '/public/Images/img4.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CFO, ABC Ltd.',
      testimonial: "The team's expertise in tax planning saved us significant costs while ensuring complete compliance. Their professional approach and attention to detail make them our trusted financial partners.",
      image: 'public/Images/img1.jpg',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      title: 'Founder, FinTech Solutions',
      testimonial: 'I highly recommend their business advisory services for growth-oriented companies. Their strategic insights and practical solutions have been instrumental in our expansion plans.',
      image: 'public/Images/img2.jpg',
    },
    {
      id: 4,
      name: 'Emily Taylor',
      title: 'Owner, Startup Inc.',
      testimonial: 'Their risk management services identified critical vulnerabilities in our operations and provided actionable solutions that helped us minimize potential losses and strengthen our business model.',
      image: 'public/Images/img3.jpg',
    },
  ];

  const openModal = (service) => {
    setCurrentService(service);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'visible';
    setTimeout(() => setCurrentService(null), 300);
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <HeroSlider />
        <div className="hero-overlay">
          <Container>
            <div className="hero-content">
              <Typography variant="h1" className="hero-title">
                <span className="hero-title-first">K.B.P.S</span> 
                <span className="hero-title-and">&</span> 
                <span className="hero-title-second">Associates</span>
              </Typography>
              <Typography variant="h2" className="hero-subtitle">
                Strengthening Compliance and Reporting
              </Typography>
              <Typography variant="h3" className="hero-tagline">
                for transparency and accountability
              </Typography>
              <ScrollLink to="services" smooth={true} duration={800} className="hero-cta">
                <Button 
                  variant="contained" 
                  className="cta-button"
                  endIcon={<ArrowForwardIcon />}
                >
                  Explore Our Services
                </Button>
              </ScrollLink>
            </div>
          </Container>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className="section-title intro-title">
                Your Trusted Financial Partner
              </Typography>
              <Typography variant="body1" className="intro-text">
                At K.B.P.S & Associates, we combine expertise with innovation to deliver exceptional financial services. 
                Our team of certified professionals is committed to helping businesses and individuals navigate complex 
                financial landscapes with confidence and clarity.
              </Typography>
              <Typography variant="body1" className="intro-text">
                With a client-centric approach and attention to detail, we provide tailored solutions that address your 
                unique challenges and help you achieve your financial goals.
              </Typography>
              <Button variant="outlined" className="intro-button" onClick={() => navigate("/about")}
              >
                About Us
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="intro-image-container">
                <img 
                  src="public/Images/img6.jpg" 
                  alt="K.B.P.S & Associates team" 
                  className="intro-image" 
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <Container>
          <Typography variant="h2" className="section-title services-title">
            Our Expertise
          </Typography>
          <Typography variant="subtitle1" className="section-subtitle">
            Comprehensive financial solutions tailored to your needs
          </Typography>
          <Grid container spacing={4} className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onLearnMore={openModal} />
            ))}
          </Grid>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section" id="statistics-section">
        <Container>
          <Statistics />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <Container>
          <Typography variant="h2" className="section-title testimonials-title">
            What Our Clients Say
          </Typography>
          <Typography variant="subtitle1" className="section-subtitle">
            Success stories from businesses we've helped
          </Typography>
          <Testimonials testimonials={testimonials} />
        </Container>
      </section>

        {/* Modal for Service Details */}
      {showModal && <Modal service={currentService} onClose={closeModal} />}
    </main>
  );
};

export default Home;