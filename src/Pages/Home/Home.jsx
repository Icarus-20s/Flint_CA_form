import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Home.css';
import { 
  Card, CardContent, Button, Typography, 
  Grid, Box, Container, IconButton, TextField, Paper, Chip, Divider
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
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StoreIcon from '@mui/icons-material/Store';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import api from '../../Api/api';

// HeroSlider Component with fade transitions
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);
  
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
      <Card className="service-card" elevation={3}>
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
        
        {/* Added service benefits list */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Key Benefits</Typography>
        <ul className="service-benefits">
          {service?.benefits?.map((benefit, index) => (
            <li key={index} className="benefit-item">
              <CheckCircleOutlineIcon className="benefit-icon" /> {benefit}
            </li>
          )) || (
            <>
              <li className="benefit-item"><CheckCircleOutlineIcon className="benefit-icon" /> Personalized approach tailored to your specific needs</li>
              <li className="benefit-item"><CheckCircleOutlineIcon className="benefit-icon" /> Expert team with specialized industry knowledge</li>
              <li className="benefit-item"><CheckCircleOutlineIcon className="benefit-icon" /> Regular updates and transparent communication</li>
              <li className="benefit-item"><CheckCircleOutlineIcon className="benefit-icon" /> Compliance with all regulatory requirements</li>
            </>
          )}
        </ul>
      </div>
      <div className="modal-footer">
        <Button 
          variant="contained" 
          color="primary" 
          className="modal-action-btn"
          onClick={() => window.location.href = '/contact'}
        >
          Schedule a Consultation
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
          <Box key={testimonial.id} className="testimonial-card" component={Paper} elevation={2}>
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

// NEW: Industry Expertise Component
const IndustryExpertise = () => {
  const industries = [
    {
      icon: <StoreIcon fontSize="large" />,
      name: 'Retail',
      description: 'Specialized services for retail businesses facing unique tax and financial challenges.'
    },
    {
      icon: <ApartmentIcon fontSize="large" />,
      name: 'Real Estate',
      description: 'Expert guidance for property investments, development, and management companies.'
    },
    {
      icon: <BusinessCenterIcon fontSize="large" />,
      name: 'Professional Services',
      description: 'Tailored solutions for law firms, medical practices, and consulting companies.'
    },
    {
      icon: <AssessmentIcon fontSize="large" />,
      name: 'Manufacturing',
      description: 'Comprehensive financial services for manufacturing and production businesses.'
    },
  ];

  return (
    <Box className="industry-expertise-container">
      <Typography variant="h2" className="section-title">
        Industry Expertise
      </Typography>
      <Typography variant="subtitle1" className="section-subtitle">
        Specialized knowledge across diverse business sectors
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {industries.map((industry, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} className="industry-card">
              <div className="industry-icon">
                {industry.icon}
              </div>
              <Typography variant="h6" className="industry-name">
                {industry.name}
              </Typography>
              <Typography variant="body2" className="industry-description">
                {industry.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const LatestInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/news'); // Update to your actual endpoint
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <LoadingSpinner/>;
  }


  return (
<Box className="insights-container">
      <Typography variant="h2" className="section-title">
        Latest Insights
      </Typography>
      <Typography variant="subtitle1" className="section-subtitle">
        Expert knowledge and analysis from our team
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} className="insight-card">
              <div className="insight-image-container">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="insight-image"
                />
                <div className="insight-date">
                  <CalendarTodayIcon fontSize="small" /> {insight.date}
                </div>
              </div>
              <div className="insight-content">
                <Typography variant="h6" className="insight-title">
                  {insight.title}
                </Typography>
                <Typography variant="body2" className="insight-excerpt">
                  {insight.excerpt}
                </Typography>

              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// NEW: Quick Contact Form Component
const QuickContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message. We will get back to you shortly.');
  };

  return (
    <Box className="quick-contact-container">
      <Paper elevation={3} className="contact-form-paper">
        <Typography variant="h4" className="contact-form-title">
          Get in Touch
        </Typography>
        <Typography variant="body1" className="contact-form-subtitle">
          Have questions? We're here to help. Fill out the form below for a prompt response.
        </Typography>
        
        <form onSubmit={handleSubmit} className="quick-contact-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How can we help you?"
                name="message"
                multiline
                rows={4}
                variant="outlined"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="submit-button"
                startIcon={<EmailIcon />}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

// NEW: Trust Elements Component
const TrustElements = () => {
  const certifications = [
    {
      name: 'ICAI',
      logo: 'public/Images/certification1.png'
    },
    {
      name: 'ISO 9001',
      logo: 'public/Images/certification2.png'
    },
    {
      name: 'ACCA',
      logo: 'public/Images/certification3.png'
    },
    {
      name: 'CMA',
      logo: 'public/Images/certification4.png'
    }
  ];

  return (
    <Box className="trust-elements-container">
      <Container>
        <Typography variant="h5" align="center" className="trust-heading">
          <VerifiedUserIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Trusted by Businesses Nationwide
        </Typography>
        
        <Grid container spacing={4} className="certification-logos" justifyContent="center" alignItems="center">
          {certifications.map((cert, index) => (
            <Grid item key={index} xs={6} sm={3}>
              <Box className="certification-logo-container">
                <img src={cert.logo} alt={cert.name} className="certification-logo" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// NEW: Value Proposition Component
const ValuePropositionBanner = () => {
  return (
    <Box className="value-proposition-container">
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box className="value-item">
              <CheckCircleOutlineIcon className="value-icon" />
              <Typography variant="h6" className="value-title">Expertise & Experience</Typography>
              <Typography variant="body2">Team of certified professionals with proven industry expertise</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="value-item">
              <CheckCircleOutlineIcon className="value-icon" />
              <Typography variant="h6" className="value-title">Client-Focused Approach</Typography>
              <Typography variant="body2">Personalized solutions tailored to your specific business needs</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="value-item">
              <CheckCircleOutlineIcon className="value-icon" />
              <Typography variant="h6" className="value-title">Integrity & Reliability</Typography>
              <Typography variant="body2">Committed to highest standards of professional ethics</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Tax Consultancy',
      description: 'Expert advice on tax planning, optimization, and compliance for businesses and individuals.',
      image: 'public/Images/img8.jpg',
      extendedDescription: 'Our comprehensive tax consultancy services help clients navigate complex tax regulations, minimize tax liabilities, and ensure full compliance with local and international tax laws. We provide personalized tax solutions tailored to your specific needs.',
      benefits: [
        'Strategic tax planning to minimize liabilities',
        'Comprehensive compliance with all tax regulations',
        'Representation during tax audits and investigations',
        'Regular tax health checks and optimization'
      ]
    },
    {
      id: 2,
      title: 'Auditing & Assurance',
      description: 'Rigorous financial statement audits and assurance services to enhance credibility and transparency.',
      image: 'public/Images/img5.jpg',
      extendedDescription: 'Our auditing and assurance services provide an objective evaluation of financial statements and operational processes. We help identify risks, improve internal controls, and enhance the reliability of your financial reporting.',
      benefits: [
        'Enhanced financial statement credibility',
        'Identification of control weaknesses and improvement opportunities',
        'Compliance with regulatory requirements',
        'Expert risk assessment and mitigation strategies'
      ]
    },
    {
      id: 3,
      title: 'Business Advisory',
      description: 'Strategic guidance for business growth, operational efficiency, and sustainable development.',
      image: 'public/Images/img6.jpg',
      extendedDescription: 'Our business advisory services provide strategic insights and practical solutions to help your business thrive. From startup guidance to succession planning, we work with you to achieve your business objectives.',
      benefits: [
        'Strategic business planning and implementation',
        'Performance improvement and optimization',
        'Merger and acquisition support',
        'Business restructuring and transformation'
      ]
    },
    {
      id: 4,
      title: 'Financial Planning',
      description: 'Customized financial strategies to secure your future and achieve long-term financial goals.',
      image: 'public/Images/story.jpg',
      extendedDescription: 'Our financial planning services help you create a roadmap for your financial future. We analyze your current situation, define goals, and develop strategies for wealth creation, retirement planning, and wealth preservation.',
      benefits: [
        'Comprehensive financial needs assessment',
        'Strategic investment planning and portfolio management',
        'Retirement and succession planning',
        'Regular financial health check-ups and plan adjustments'
      ]
    },
    {
      id: 5,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment and mitigation strategies to protect your business interests.',
      image: 'public/Images/img10.png',
      extendedDescription: 'Our risk management services help identify, assess, and mitigate financial and operational risks. We develop robust risk management frameworks tailored to your business environment and objectives.',
      benefits: [
        'Comprehensive risk identification and assessment',
        'Development of risk mitigation strategies',
        'Implementation of risk management frameworks',
        'Regular risk monitoring and reporting'
      ]
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

      {/* NEW: Value Proposition Banner */}
      <section className="value-proposition-section">
        <ValuePropositionBanner />
      </section>

      {/* Introduction Section - Enhanced */}
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
                With a client-centric approach and attention to detail,With a client-centric approach and attention to detail, we provide tailored solutions that address your 
                unique challenges and help you achieve your financial goals.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box className="key-feature">
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <Typography variant="body1">Certified CA Professionals</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="key-feature">
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <Typography variant="body1">Tailored Financial Solutions</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="key-feature">
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <Typography variant="body1">Regulatory Compliance</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="key-feature">
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <Typography variant="body1">Industry-Specific Expertise</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Button 
                variant="outlined" 
                className="intro-button" 
                onClick={() => navigate("/about")}
                sx={{ mt: 3 }}
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

      {/* NEW: Trust Elements Section */}
      <section className="trust-elements-section">
        <TrustElements />
      </section>

      {/* Statistics Section */}
      <section className="statistics-section" id="statistics-section">
        <Container>
          <Statistics />
        </Container>
      </section>

      {/* NEW: Industry Expertise Section */}
      <section className="industry-expertise-section">
        <Container>
          <IndustryExpertise />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <Container>
          <Typography variant="h2" className="section-title testimonials-title">
            What Our Clients Say
          </Typography>
          <Typography variant="subtitle1" className="section-subtitle">
            Success sexport default Home;tories from businesses we've helped
          </Typography>
          <Testimonials testimonials={testimonials} />
        </Container>
      </section>

      {/* NEW: Latest Insights Section */}
      <section className="insights-section">
        <Container>
          <LatestInsights />
        </Container>
      </section>

      {/* NEW: Quick Contact Form Section */}
      <section className="quick-contact-section">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <QuickContactForm />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="contact-image-container">
                <img 
                  src="public/Images/story.jpg" 
                  alt="Contact us" 
                  className="contact-image" 
                />
                <Box className="contact-details">
                  <Typography variant="h4" className="contact-heading">
                    Let's Connect
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" className="contact-address">
                    <strong>Address:</strong> 123 Business Avenue, Financial District, City, 123456
                  </Typography>
                  <Typography variant="body1" className="contact-phone">
                    <strong>Phone:</strong> +91 98765 43210
                  </Typography>
                  <Typography variant="body1" className="contact-email">
                    <strong>Email:</strong> info@kbpsassociates.com
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" className="contact-hours">
                      <strong>Business Hours:</strong>
                    </Typography>
                    <Typography variant="body2">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </Typography>
                    <Typography variant="body2">
                      Saturday: 10:00 AM - 2:00 PM
                    </Typography>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>


      {/* Modal for Service Details */}
      {showModal && <Modal service={currentService} onClose={closeModal} />}
    </main>
  );
};

export default Home;