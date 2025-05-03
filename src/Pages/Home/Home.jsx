import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, Button, Typography, 
  Grid, Box, Container, IconButton, TextField, Paper, Chip, Divider
} from '@mui/material';

// Icons
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Components
import LoadingSpinner from '../../Loaders/LoadingSpinner';

// API
import api from '../../Api/api';

// CSS Import
import './Home.css';

/**
 * Hero Slider Component
 * Displays a responsive image slider with controls
 */
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef(null);
  
  const images = [
    'public/Images/homepageImg/slide1.jpg',
    'public/Images/homepageImg/slide2.jpg',
    'public/Images/homepageImg/slide3.jpg',
  ];

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => changeSlide('next'), 6000);
  }, []);

  const changeSlide = useCallback((direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    resetAutoplay();
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, isTransitioning, images.length, resetAutoplay]);

  useEffect(() => {
    resetAutoplay();
    return () => autoplayRef.current && clearInterval(autoplayRef.current);
  }, [resetAutoplay]);

  return (
    <div 
      className="modern-hero__slider" 
      onMouseEnter={() => clearInterval(autoplayRef.current)}
      onMouseLeave={resetAutoplay}
    >
      <div 
        className={`modern-hero__slide-container ${isTransitioning ? 'modern-hero__transitioning' : ''}`}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className={`modern-hero__slide ${index === currentIndex ? 'modern-hero__active' : ''}`} 
            style={{ 
              backgroundImage: `url(${image})`,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0
            }} 
          />
        ))}
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

/**
 * Service Card Component
 * Displays a service with image, title, description, and action button
 */
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
      <Card className="modern-service__card" elevation={3}>
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
            endIcon={<KeyboardArrowRightIcon />}
          >
            Learn More
          </Button>
        </CardContent>
        <div className="modern-service__hover-overlay">
          <Button 
            className="modern-service__overlay-button"
            onClick={() => onLearnMore(service)}
          >
            View Details
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

/**
 * Service Modal Component
 * Displays detailed information about a selected service
 */
const ServiceModal = ({ service, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(true);
    document.body.classList.add('modal-open');
    
    return () => document.body.classList.remove('modal-open');
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };
  
  return (
    <div 
      className={`modern-modal__overlay ${isOpen ? 'modern-modal__overlay--open' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`modern-modal__content ${isOpen ? 'modern-modal__content--open' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modern-modal__header">
          <Typography variant="h5">{service?.title}</Typography>
          <IconButton onClick={handleClose} aria-label="close" className="modern-modal__close">
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
        </div>
      </div>
    </div>
  );
};

/**
 * Testimonials Component
 * Displays client testimonials in a carousel
 */
const Testimonials = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const autoplayRef = useRef(null);

  const getTestimonialsPerView = useCallback(() => {
    return width < 768 ? 1 : width < 1200 ? 2 : 3;
  }, [width]);

  const getMaxIndex = useCallback(() => {
    return Math.max(0, Math.ceil(testimonials.length / getTestimonialsPerView()) - 1);
  }, [testimonials.length, getTestimonialsPerView]);

  const next = useCallback(() => {
    setCurrent(current => Math.min(current + 1, getMaxIndex()));
  }, [getMaxIndex]);

  const prev = useCallback(() => {
    setCurrent(current => Math.max(current - 1, 0));
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    
    if (testimonials.length > getTestimonialsPerView()) {
      autoplayRef.current = setInterval(() => {
        setCurrent(current => {
          const newCurrent = current + 1;
          return newCurrent > getMaxIndex() ? 0 : newCurrent;
        });
      }, 5000);
    }
  }, [testimonials.length, getTestimonialsPerView, getMaxIndex]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    startAutoplay();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  return (
    <div 
      className="modern-testimonials__container"
      onMouseEnter={() => autoplayRef.current && clearInterval(autoplayRef.current)}
      onMouseLeave={startAutoplay}
    >
      <div 
        className="modern-testimonials__list"
        style={{ 
          transform: `translateX(-${current * (100 / getTestimonialsPerView())}%)`,
          transition: 'transform 0.5s ease'
        }}
      >
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} className="modern-testimonials__card" component={Paper} elevation={3}>
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
      {getMaxIndex() > 0 && (
        <div className="modern-testimonials__controls">
          <IconButton 
            onClick={prev} 
            disabled={current === 0}
            className={`modern-testimonials__arrow ${current === 0 ? 'modern-testimonials__arrow--disabled' : ''}`}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="modern-testimonials__dots">
            {Array(getMaxIndex() + 1).fill().map((_, idx) => (
              <button 
                key={idx} 
                className={`modern-testimonials__dot ${idx === current ? 'modern-testimonials__dot--active' : ''}`} 
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
          <IconButton 
            onClick={next} 
            disabled={current === getMaxIndex()}
            className={`modern-testimonials__arrow ${current === getMaxIndex() ? 'modern-testimonials__arrow--disabled' : ''}`}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

/**
 * Statistics Component
 * Displays animated statistics counters
 */
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
  
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationDuration = 2000; // 2 seconds
  
  const animateStats = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / animationDuration, 1);
    
    setStats({
      clients: Math.floor(progress * targetStats.clients),
      projects: Math.floor(progress * targetStats.projects),
      experience: Math.floor(progress * targetStats.experience),
      satisfaction: Math.floor(progress * targetStats.satisfaction)
    });
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateStats);
    } else {
      // Ensure final values are exact
      setStats(targetStats);
    }
  }, [targetStats]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationRef.current) {
          startTimeRef.current = null;
          animationRef.current = requestAnimationFrame(animateStats);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animateStats]);
  
  return (
    <Box className="modern-statistics__container" ref={sectionRef}>
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

/**
 * Industry Expertise Component
 * Displays industry specializations in a grid
 */
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
            <Paper elevation={3} className="modern-industry__card">
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

/**
 * Latest Insights Component
 * Displays recent blog posts or news articles
 */
const LatestInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const insightsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/news');
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
        // Fallback data
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchInsights();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (insightsRef.current) observer.observe(insightsRef.current);
    
    return () => {
      if (insightsRef.current) observer.disconnect();
    };
  }, []);

  const handleReadMore = (id) => navigate(`/news/${id}`);

  if (loading) {
    return (
      <Box className="modern-insights__loading" ref={insightsRef}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box className="modern-insights__container" ref={insightsRef}>
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
                  loading="lazy"
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
                  onClick={() => handleReadMore(insight.id)}
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

const CTASection = () => {
  const navigate = useNavigate();
  const handleScheduleClick = () => {
    navigate('/contact');
  };
  return (
    <Box className="modern-cta__container">
      <Container maxWidth="lg">
        <Paper elevation={0} className="modern-cta__paper">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" className="modern-cta__title">
                Ready to optimize your financial strategy?
              </Typography>
              <Typography variant="body1" className="modern-cta__text">
                Our team of experts is ready to help you achieve your financial goals and navigate complex financial challenges with confidence.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} className="modern-cta__action">
            <Button 
  variant="contained" 
  color="primary" 
  size="large"
  className="modern-cta__button"
  onClick={handleScheduleClick}
>
  Schedule a Consultation
</Button>

              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                className="modern-cta__button modern-cta__button--outline"
                component="a"
                href="/services"
              >
                Explore Our Services
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

/**
 * Trust Indicators Component
 * Displays elements that build trust with potential clients
 */
const TrustIndicators = () => {
  const features = [
    {
      icon: <VerifiedUserIcon fontSize="large" />,
      title: "Certified Professionals",
      description: "Our team consists of certified accountants and financial experts with years of industry experience."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Data Security",
      description: "Your financial information is protected with bank-level security and encryption protocols."
    },
    {
      icon: <ArticleIcon fontSize="large" />,
      title: "Transparent Reporting",
      description: "Clear, comprehensive reports with insights you can actually understand and act upon."
    }
  ];

  return (
    <Box className="modern-trust__container">
      <Typography variant="h2" className="modern-section__title">
        Why Choose Us
      </Typography>
      <Typography variant="subtitle1" className="modern-section__subtitle">
        Our commitment to excellence sets us apart
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} className="modern-trust__card">
              <div className="modern-trust__icon-wrapper">
                {feature.icon}
              </div>
              <Typography variant="h6" className="modern-trust__title">
                {feature.title}
              </Typography>
              <Typography variant="body2" className="modern-trust__description">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/**
 * Main Home Component
 * Assembles all sections for the homepage
 */
const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Example services data (would normally come from API)
        const servicesData = [
          {
            id: 1,
            title: 'Tax Consultancy',
            description: 'Comprehensive tax planning and compliance services for businesses and individuals.',
            image: 'public/Images/services/tax.jpg',
            benefits: [
              'Strategic tax planning to minimize liabilities',
              'Compliance with all regulatory requirements',
              'Representation during tax audits',
              'Regular updates on tax law changes'
            ],
            extendedDescription: 'Our Tax Consultancy service provides strategic guidance to minimize tax liabilities while ensuring full compliance with current regulations. We help businesses and individuals navigate complex tax codes, prepare and file accurate returns, and represent clients during tax audits. Our proactive approach keeps you informed about tax law changes that could impact your financial situation.'
          },
          {
            id: 2,
            title: 'Auditing & Assurance',
            description: 'Independent financial audit services that enhance credibility and identify potential issues.',
            image: 'public/Images/services/audit.jpg',
            benefits: [
              'Enhanced financial credibility',
              'Identification of control weaknesses',
              'Improved financial reporting',
              'Regulatory compliance assurance'
            ],
            extendedDescription: 'Our Auditing & Assurance services provide independent verification of financial statements to enhance credibility with stakeholders. We conduct thorough examinations to identify control weaknesses, potential fraud risks, and opportunities for operational improvements. Our comprehensive approach ensures compliance with relevant standards while providing actionable insights for better financial management.'
          },
          {
            id: 3,
            title: 'Business Advisory',
            description: 'Strategic guidance to optimize operations, improve profitability, and drive business growth.',
            image: 'public/Images/services/advisory.jpg',
            benefits: [
              'Strategic business planning',
              'Performance improvement strategies',
              'Merger and acquisition support',
              'Succession planning assistance'
            ],
            extendedDescription: 'Our Business Advisory services deliver strategic insights and practical solutions to help your organization thrive. We work closely with management teams to identify growth opportunities, streamline operations, and improve profitability. Our advisors bring industry-specific expertise to address your unique challenges and capitalize on emerging market trends.'
          },
          {
            id: 4,
            title: 'Financial Planning',
            description: 'Personalized financial strategies tailored to achieve your short and long-term objectives.',
            image: 'public/Images/services/planning.jpg',
            benefits: [
              'Comprehensive financial assessment',
              'Goal-oriented investment strategies',
              'Retirement and estate planning',
              'Regular progress reviews and adjustments'
            ],
            extendedDescription: 'Our Financial Planning service takes a holistic approach to your financial wellbeing. We create personalized strategies aligned with your goals, risk tolerance, and timeline. From retirement planning to education funding, our advisors consider all aspects of your financial life to develop a cohesive plan that evolves with your changing needs.'
          },
          {
            id: 5,
            title: 'Risk Management',
            description: 'Identify, assess, and mitigate financial risks that could impact your business objectives.',
            image: 'public/Images/services/risk.jpg',
            benefits: [
              'Comprehensive risk assessment',
              'Development of mitigation strategies',
              'Implementation of control systems',
              'Ongoing monitoring and reporting'
            ],
            extendedDescription: 'Our Risk Management services help organizations identify, assess, and mitigate financial and operational risks. We develop customized frameworks to protect your assets, reputation, and stakeholder interests. Our approach combines preventive measures with responsive strategies to ensure business continuity in challenging circumstances.'
          }
        ];
        
        // Example testimonials data (would normally come from API)
        const testimonialsData = [
          {
            id: 1,
            name: 'Sarah Johnson',
            title: 'CEO, TechStart Inc.',
            testimonial: 'Working with their team transformed our financial operations. Their strategic tax planning saved us thousands while keeping us fully compliant.',
            image: 'public/Images/testimonials/person1.jpg'
          },
          {
            id: 2,
            name: 'Michael Chen',
            title: 'CFO, Retail Solutions',
            testimonial: 'The audit services we received were comprehensive and insightful. They identified key areas for improvement that have significantly enhanced our financial reporting.',
            image: 'public/Images/testimonials/person2.jpg'
          },
          {
            id: 3,
            name: 'Jennifer Williams',
            title: 'Owner, Williams Consulting',
            testimonial: 'Their business advisory services provided exactly the guidance we needed during our expansion. The expertise and personalized approach made all the difference.',
            image: 'public/Images/testimonials/person3.jpg'
          },
          {
            id: 4,
            name: 'Robert Davis',
            title: 'Director, Davis Manufacturing',
            testimonial: 'The financial planning services have given us clarity and confidence. Their team takes the time to understand our goals and create strategies that work for our specific situation.',
            image: 'public/Images/testimonials/person4.jpg'
          },
          {
            id: 5,
            name: 'Elena Martinez',
            title: 'VP Finance, Global Logistics',
            testimonial: 'Their risk management approach helped us navigate a challenging market transition. The preventive measures they implemented saved us from potential significant losses.',
            image: 'public/Images/testimonials/person5.jpg'
          }
        ];
        
        setServices(servicesData);
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError('Failed to load content. Please refresh the page and try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };
  
  const handleCloseModal = () => {
    setSelectedService(null);
  };
  
  if (loading) {
    return (
      <div className="modern-page__loading">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="modern-page__error">
        <Typography variant="h5" color="error">{error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <Box className="modern-home__container">
      {/* Hero Section */}
      <Box className="modern-hero__section">
        <Container maxWidth="lg" className="modern-hero__content-container">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} className="modern-hero__text-container">
              <Typography variant="h1" className="modern-hero__title">
                Financial Expertise for Today's Business Challenges
              </Typography>
              <Typography variant="subtitle1" className="modern-hero__subtitle">
                Strategic accounting, tax, and advisory services tailored for your success
              </Typography>
              <Box className="modern-hero__buttons">
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  className="modern-hero__button"
                  component={ScrollLink}
                  to="services-section"
                  smooth={true}
                  duration={800}
                >
                  Explore Services
                </Button>
                <Button 
  variant="outlined" 
  color="primary" 
  size="large"
  className="modern-hero__button modern-hero__button--outline"
  href="/contact"
>
  Contact Us
</Button>
              </Box>
              <Box className="modern-hero__chips">
                <Chip 
                  icon={<CheckCircleOutlineIcon />} 
                  label="15+ Years Experience" 
                  className="modern-hero__chip"
                />
                <Chip 
                  icon={<CheckCircleOutlineIcon />} 
                  label="Certified Experts" 
                  className="modern-hero__chip"
                />
                <Chip 
                  icon={<CheckCircleOutlineIcon />} 
                  label="Client-Focused Approach" 
                  className="modern-hero__chip"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="modern-hero__slider-container">
              <HeroSlider />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Trust Indicators */}
      <Box component="section" className="modern-section">
        <Container maxWidth="lg">
          <TrustIndicators />
        </Container>
      </Box>
      
      {/* Services Section */}
      <Box component="section" id="services-section" className="modern-section modern-section--gray">
        <Container maxWidth="lg">
          <Typography variant="h2" className="modern-section__title">
            Our Services
          </Typography>
          <Typography variant="subtitle1" className="modern-section__subtitle">
            Comprehensive financial solutions for your business
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                onLearnMore={handleServiceClick}
              />
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Statistics Section */}
      <Box component="section" className="modern-section">
        <Container maxWidth="lg">
          <Statistics />
        </Container>
      </Box>
      
      {/* Industry Expertise */}
      <Box component="section" className="modern-section modern-section--gray">
        <Container maxWidth="lg">
          <IndustryExpertise />
        </Container>
      </Box>
      
      {/* Testimonials Section */}
      <Box component="section" className="modern-section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="modern-section__title">
            Client Testimonials
          </Typography>
          <Typography variant="subtitle1" className="modern-section__subtitle">
            What our clients say about our services
          </Typography>
          
          <Box sx={{ mt: 6 }}>
            <Testimonials testimonials={testimonials} />
          </Box>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box component="section" className="modern-section modern-section--cta">
        <CTASection />
      </Box>
      
      {/* Latest Insights */}
      <Box component="section" className="modern-section modern-section--gray">
        <Container maxWidth="lg">
          <LatestInsights />
        </Container>
      </Box>
      {/* Service Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={handleCloseModal} 
        />
      )}
    </Box>
  );
};

export default Home;