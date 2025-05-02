import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
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

// CSS Import to be created separately
import './Home.css';

// Advanced Hero Slider with fade and zoom effects
const ModernHeroSlider = () => {
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
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide('next');
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="modern-hero__slider">
      <div 
        className={`modern-hero__slide-container ${isTransitioning ? 'modern-hero__transitioning' : ''}`} 
        ref={slideRef}
      >
        <div 
          className="modern-hero__slide modern-hero__active" 
          style={{ backgroundImage: `url(${images[currentIndex]})` }} 
        />
      </div>
      <div className="modern-hero__controls">
        <IconButton 
          className="modern-hero__arrow modern-hero__prev" 
          onClick={() => changeSlide('prev')}
          aria-label="Previous slide"
        >
          <ArrowBackIcon />
        </IconButton>
        <div className="modern-hero__indicators">
          {images.map((_, index) => (
            <button 
              key={index} 
              className={`modern-hero__indicator ${index === currentIndex ? 'modern-hero__indicator--active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <IconButton 
          className="modern-hero__arrow modern-hero__next" 
          onClick={() => changeSlide('next')}
          aria-label="Next slide"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  );
};

// Enhanced Service Card with hover animations
const ModernServiceCard = ({ service, onLearnMore }) => {
  const icons = {
    'Tax Consultancy': <BusinessCenterIcon fontSize="large" />,
    'Auditing & Assurance': <AccountBalanceIcon fontSize="large" />,
    'Business Advisory': <AssessmentIcon fontSize="large" />,
    'Financial Planning': <SavingsIcon fontSize="large" />,
    'Risk Management': <SecurityIcon fontSize="large" />
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="modern-service__card" elevation={2}>
        <div className="modern-service__icon-wrapper">
          <div className="modern-service__icon">
            {icons[service.title]}
          </div>
        </div>
        <CardContent className="modern-service__content">
          <Typography variant="h5" component="h3" className="modern-service__title">
            {service.title}
          </Typography>
          <Typography variant="body2" className="modern-service__description">
            {service.description}
          </Typography>
          <Button 
            className="modern-service__button"
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

// Modal Component with animation effects
const ModernModal = ({ service, onClose }) => (
  <div className="modern-modal__overlay" onClick={onClose}>
    <div className="modern-modal__content" onClick={(e) => e.stopPropagation()}>
      <div className="modern-modal__header">
        <Typography variant="h5">{service?.title}</Typography>
        <IconButton onClick={onClose} aria-label="close" className="modern-modal__close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="modern-modal__body">
        <div className="modern-modal__image-container">
          <img src={service?.image} alt={service?.title} className="modern-modal__image" />
        </div>
        <Typography variant="body1" className="modern-modal__description">
          {service?.description}
        </Typography>
        <Typography variant="body1" className="modern-modal__extended-description">
          {service?.extendedDescription || `Our ${service?.title} service is designed to provide comprehensive solutions tailored to your specific needs. With our expert team and years of experience, we ensure optimal results and satisfaction.`}
        </Typography>
        
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Key Benefits</Typography>
        <ul className="modern-modal__benefits-list">
          {service?.benefits?.map((benefit, index) => (
            <li key={index} className="modern-modal__benefit-item">
              <CheckCircleOutlineIcon className="modern-modal__benefit-icon" /> {benefit}
            </li>
          )) || (
            <>
              <li className="modern-modal__benefit-item"><CheckCircleOutlineIcon className="modern-modal__benefit-icon" /> Personalized approach tailored to your specific needs</li>
              <li className="modern-modal__benefit-item"><CheckCircleOutlineIcon className="modern-modal__benefit-icon" /> Expert team with specialized industry knowledge</li>
              <li className="modern-modal__benefit-item"><CheckCircleOutlineIcon className="modern-modal__benefit-icon" /> Regular updates and transparent communication</li>
              <li className="modern-modal__benefit-item"><CheckCircleOutlineIcon className="modern-modal__benefit-icon" /> Compliance with all regulatory requirements</li>
            </>
          )}
        </ul>
      </div>
      <div className="modern-modal__footer">
        <Button 
          variant="contained" 
          color="primary" 
          className="modern-modal__action-btn"
          onClick={() => window.location.href = '/contact'}
        >
          Schedule a Consultation
        </Button>
      </div>
    </div>
  </div>
);

// Testimonials Carousel with modern styling
const ModernTestimonials = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const testimonialsPerView = window.innerWidth < 768 ? 1 : 2;
  const maxIndex = Math.ceil(testimonials.length / testimonialsPerView) - 1;

  const next = () => {
    setCurrent(current => Math.min(current + 1, maxIndex));
  };

  const prev = () => {
    setCurrent(current => Math.max(current - 1, 0));
  };

  useEffect(() => {
    const handleResize = () => {
      const newTestimonialsPerView = window.innerWidth < 768 ? 1 : 2;
      const newMaxIndex = Math.ceil(testimonials.length / newTestimonialsPerView) - 1;
      setCurrent(prevCurrent => Math.min(prevCurrent, newMaxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials.length]);

  return (
    <div className="modern-testimonials__container">
      <div 
        className="modern-testimonials__list"
        style={{ transform: `translateX(-${current * 100 / (maxIndex + 1)}%)` }}
      >
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} className="modern-testimonials__card" component={Paper} elevation={2}>
            <div className="modern-testimonials__quote-icon">
              <FormatQuoteIcon />
            </div>
            <Typography variant="body1" className="modern-testimonials__text">
              "{testimonial.testimonial}"
            </Typography>
            <div className="modern-testimonials__profile">
              <div className="modern-testimonials__image-container">
                <img src={testimonial.image} alt={testimonial.name} className="modern-testimonials__image" />
              </div>
              <div className="modern-testimonials__info">
                <Typography variant="h6" className="modern-testimonials__name">{testimonial.name}</Typography>
                <Typography variant="subtitle2" className="modern-testimonials__title">{testimonial.title}</Typography>
              </div>
            </div>
          </Box>
        ))}
      </div>
      {maxIndex > 0 && (
        <div className="modern-testimonials__controls">
          <IconButton 
            onClick={prev} 
            disabled={current === 0}
            className={`modern-testimonials__arrow ${current === 0 ? 'modern-testimonials__arrow--disabled' : ''}`}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="modern-testimonials__dots">
            {Array(maxIndex + 1).fill().map((_, idx) => (
              <button 
                key={idx} 
                className={`modern-testimonials__dot ${idx === current ? 'modern-testimonials__dot--active' : ''}`} 
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
          <IconButton 
            onClick={next} 
            disabled={current === maxIndex}
            className={`modern-testimonials__arrow ${current === maxIndex ? 'modern-testimonials__arrow--disabled' : ''}`}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

// Animated Statistics Component
const ModernStatistics = () => {
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
    
    const element = document.getElementById('modern-statistics__section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  return (
    <Box className="modern-statistics__container">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <div className="modern-statistics__card">
            <Typography variant="h3" className="modern-statistics__number">{stats.clients}+</Typography>
            <Typography variant="subtitle1" className="modern-statistics__label">Happy Clients</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="modern-statistics__card">
            <Typography variant="h3" className="modern-statistics__number">{stats.projects}+</Typography>
            <Typography variant="subtitle1" className="modern-statistics__label">Projects Completed</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="modern-statistics__card">
            <Typography variant="h3" className="modern-statistics__number">{stats.experience}+</Typography>
            <Typography variant="subtitle1" className="modern-statistics__label">Years Experience</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="modern-statistics__card">
            <Typography variant="h3" className="modern-statistics__number">{stats.satisfaction}%</Typography>
            <Typography variant="subtitle1" className="modern-statistics__label">Client Satisfaction</Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

// Industry Expertise Component with hover effects
const ModernIndustryExpertise = () => {
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
    <Box className="modern-industry__container">
      <Typography variant="h2" className="modern-section__title">
        Industry Expertise
      </Typography>
      <Typography variant="subtitle1" className="modern-section__subtitle">
        Specialized knowledge across diverse business sectors
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {industries.map((industry, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} className="modern-industry__card">
              <div className="modern-industry__icon-wrapper">
                {industry.icon}
              </div>
              <Typography variant="h6" className="modern-industry__name">
                {industry.name}
              </Typography>
              <Typography variant="body2" className="modern-industry__description">
                {industry.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Latest Insights with modern card layout
const ModernLatestInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/news');
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
        // Fallback data in case API fails
        setInsights([
          {
            id: 1,
            title: "Latest Tax Reforms and Your Business",
            excerpt: "Understanding the impact of recent tax changes on small and medium enterprises.",
            date: "April 28, 2025",
            image: "public/Images/img8.jpg"
          },
          {
            id: 2,
            title: "Financial Planning Strategies for 2025",
            excerpt: "Expert advice on optimizing your financial strategy in the current economic climate.",
            date: "April 15, 2025",
            image: "public/Images/img6.jpg"
          },
          {
            id: 3,
            title: "Navigating Audit Requirements for Startups",
            excerpt: "Essential guidelines for new businesses to ensure compliance and financial transparency.",
            date: "April 5, 2025",
            image: "public/Images/img5.jpg"
          }
        ]);
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
    <Box className="modern-insights__container">
      <Typography variant="h2" className="modern-section__title">
        Latest Insights
      </Typography>
      <Typography variant="subtitle1" className="modern-section__subtitle">
        Expert knowledge and analysis from our team
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} className="modern-insights__card">
              <div className="modern-insights__image-container">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="modern-insights__image"
                />
                <div className="modern-insights__date">
                  <CalendarTodayIcon fontSize="small" /> {insight.date}
                </div>
              </div>
              <div className="modern-insights__content">
                <Typography variant="h6" className="modern-insights__title">
                  {insight.title}
                </Typography>
                <Typography variant="body2" className="modern-insights__excerpt">
                  {insight.excerpt}
                </Typography>
                <Button 
                  className="modern-insights__button"
                  endIcon={<ArrowForwardIcon />}
                >
                  Read More
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Modern Contact Form with validation
const ModernContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = "Phone number is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box className="modern-contact__container">
      <Paper elevation={3} className="modern-contact__paper">
        <Typography variant="h4" className="modern-contact__title">
          Get in Touch
        </Typography>
        <Typography variant="body1" className="modern-contact__subtitle">
          Have questions? We're here to help. Fill out the form below for a prompt response.
        </Typography>
        
        {submitSuccess && (
          <Paper className="modern-contact__success-message">
            <CheckCircleOutlineIcon className="modern-contact__success-icon" />
            <Typography variant="body1">Thank you for your message. We will get back to you shortly.</Typography>
          </Paper>
        )}
        
        <form onSubmit={handleSubmit} className="modern-contact__form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                className="modern-contact__field"
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
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
                className="modern-contact__field"
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
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                className="modern-contact__field"
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
                error={!!formErrors.message}
                helperText={formErrors.message}
                required
                className="modern-contact__field"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="modern-contact__button"
                startIcon={<EmailIcon />}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

// Modified Trust Elements with text-based badges instead of images
const ModernTrustElements = () => {
  const certifications = [
    {
      name: 'Certified Public Accountants',
      icon: <ArticleIcon fontSize="large" />
    },
    {
      name: 'Tax Specialists',
      icon: <BusinessCenterIcon fontSize="large" />
    },
    {
      name: 'Financial Advisors',
      icon: <AssessmentIcon fontSize="large" />
    },
    {
      name: 'Risk Management Experts',
      icon: <SecurityIcon fontSize="large" />
    }
  ];

  return (
    <Box className="modern-trust__container">
      <Container>
        <Typography variant="h5" align="center" className="modern-trust__heading">
          <VerifiedUserIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Trusted by Businesses Nationwide
        </Typography>
        
        <Grid container spacing={4} className="modern-trust__badges" justifyContent="center" alignItems="center">
          {certifications.map((cert, index) => (
            <Grid item key={index} xs={6} sm={3}>
              <Paper elevation={2} className="modern-trust__badge">
                <div className="modern-trust__icon-wrapper">
                  {cert.icon}
                </div>
                <Typography variant="subtitle1" className="modern-trust__name" align="center">
                  {cert.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Value Proposition with modernized design
const ModernValueProposition = () => {
  return (
    <Box className="modern-value__container">
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box className="modern-value__item">
              <div className="modern-value__icon-wrapper">
                <CheckCircleOutlineIcon className="modern-value__icon" />
              </div>
              <Typography variant="h6" className="modern-value__title">Expertise & Experience</Typography>
              <Typography variant="body2" className="modern-value__description">Team of certified professionals with proven industry expertise</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="modern-value__item">
              <div className="modern-value__icon-wrapper">
                <CheckCircleOutlineIcon className="modern-value__icon" />
              </div>
              <Typography variant="h6" className="modern-value__title">Client-Focused Approach</Typography>
              <Typography variant="body2" className="modern-value__description">Personalized solutions tailored to your specific business needs</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="modern-value__item">
              <div className="modern-value__icon-wrapper">
                <CheckCircleOutlineIcon className="modern-value__icon" />
              </div>
              <Typography variant="h6" className="modern-value__title">Integrity & Reliability</Typography>
              <Typography variant="body2" className="modern-value__description">Committed to highest standards of professional ethics</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Main Home Component with revised layout and structure
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
      testimonial: 'K.B.P.S & Associates has transformed our financial strategy completely. Their advisory services helped us achieve 30% growth in just one year. Their team\'s expertise and dedication are unmatched in the industry.',
      image: 'public/Images/client1.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CFO, ABC Enterprises',
      testimonial: 'Working with K.B.P.S & Associates for our tax planning has been a game-changer. They identified optimization opportunities we had never considered, resulting in significant savings.',
      image: 'public/Images/client2.jpg'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      title: 'Owner, Johnson Retail Group',
      testimonial: 'The audit services provided by K.B.P.S & Associates were thorough, professional, and delivered valuable insights for improving our internal controls. Highly recommended!',
      image: 'public/Images/client3.jpg'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      title: 'Director, Global Investments Ltd',
      testimonial: 'Their risk management team helped us navigate challenging market conditions with confidence. The strategic guidance we received was invaluable to our continued success.',
      image: 'public/Images/client4.jpg'
    }
  ];

  const handleLearnMore = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  return (
    <div className="modern-home__container">
      {/* Hero Section */}
      <section className="modern-hero__section">
        <ModernHeroSlider />
        <div className="modern-hero__content">
          <Container maxWidth="lg">
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} md={8} className="modern-hero__text-container">
                <Typography variant="h1" className="modern-hero__title">
                  Your Trusted Financial Partner
                </Typography>
                <Typography variant="h5" className="modern-hero__subtitle">
                  Expert accounting, tax & financial advisory services tailored for your success
                </Typography>
                <div className="modern-hero__buttons">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className="modern-hero__button"
                    onClick={() => navigate('/contact')}
                  >
                    Schedule a Consultation
                  </Button>
                  <ScrollLink
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <Button 
                      variant="outlined" 
                      className="modern-hero__button modern-hero__button--outline"
                    >
                      Explore Services
                    </Button>
                  </ScrollLink>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="modern-value-proposition__section">
        <Container>
          <ModernValueProposition />
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="modern-services__section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="modern-section__title">
            Our Services
          </Typography>
          <Typography variant="subtitle1" className="modern-section__subtitle">
            Comprehensive financial solutions tailored to your needs
          </Typography>
          
          <Grid container spacing={4} className="modern-services__grid" sx={{ mt: 4 }}>
            {services.map((service) => (
              <ModernServiceCard 
                key={service.id} 
                service={service} 
                onLearnMore={handleLearnMore} 
              />
            ))}
          </Grid>
        </Container>
      </section>

      {/* Statistics Section */}
      <section id="modern-statistics__section" className="modern-statistics__section">
        <Container>
          <ModernStatistics />
        </Container>
      </section>

      {/* Industry Expertise Section */}
      <section className="modern-industry__section">
        <Container>
          <ModernIndustryExpertise />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="modern-testimonials__section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="modern-section__title">
            Client Testimonials
          </Typography>
          <Typography variant="subtitle1" className="modern-section__subtitle">
            Don't take our word for it - hear what our clients have to say
          </Typography>
          
          <ModernTestimonials testimonials={testimonials} />
        </Container>
      </section>

      {/* Trust Elements Section */}
      <section className="modern-trust__section">
        <ModernTrustElements />
      </section>

      {/* Latest Insights Section */}
      <section className="modern-insights__section">
        <Container>
          <ModernLatestInsights />
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="modern-contact__section">
        <Container>
          <ModernContactForm />
        </Container>
      </section>

      {/* Service Modal */}
      {showModal && currentService && (
        <ModernModal service={currentService} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Home;