import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalculateIcon from "@mui/icons-material/Calculate";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import parse from 'html-react-parser';
import api from "../../../Api/api";
import QuoteRequestForm from "../../QuoteRequestForm/QuoteRequestForm";
import 'react-quill/dist/quill.snow.css';
import "./ServiceDetail.css";

// Service category icons mapping
const SERVICE_ICONS = {
  "Tax Planning": <CalculateIcon />,
  "Auditing": <ReceiptIcon />,
  "Financial Consulting": <AttachMoneyIcon />,
  "Compliance": <CheckCircleIcon />,
  "Corporate Finance": <BusinessIcon />,
  "Accounting": <AccountBalanceIcon />,
};

const ServiceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [quoteRequestOpen, setQuoteRequestOpen] = useState(false);
  const [relatedServices, setRelatedServices] = useState([]);

  // Format image URL utility function
  const getImageUrl = useCallback((image) => {
    if (!image) return null;
    return image.startsWith("http") ? image : `${process.env.REACT_APP_API_BASE_URL}${image}`;
  }, []);

  // Get icon for service category
  const getIconForService = useCallback((service) => {
    if (service?.category && SERVICE_ICONS[service.category]) {
      return SERVICE_ICONS[service.category];
    }
    return <BusinessIcon />;
  }, []);

  // Fetch service details with retry mechanism
  const fetchServiceDetails = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await api.get(`/services/${id}/`);
      if (response.data) {
        setService(response.data);
        // After successful fetch, get related services
        fetchRelatedServices(response.data.category);
      } else {
        throw new Error("Service not found");
      }
    } catch (err) {
      console.error("Error fetching service details:", err);
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        setTimeout(() => fetchServiceDetails(retryCount + 1), 1000);
        return;
      }
      setError("Error fetching service details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch related services
  const fetchRelatedServices = useCallback(async (category) => {
    try {
      const response = await api.get('/services/', {
        params: { category: category }
      });
      // Filter out current service and limit to 3 related services
      const filtered = response.data
        .filter(s => s.id !== parseInt(id))
        .slice(0, 3);
      setRelatedServices(filtered);
    } catch (err) {
      console.error("Error fetching related services:", err);
      // Non-critical error, don't show to user
    }
  }, [id]);

  useEffect(() => {
    // Always fetch service details on mount and when ID changes
    fetchServiceDetails();
    // Reset state when ID changes
    setActiveTab(0);
    setError(null);
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, fetchServiceDetails]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenQuoteRequest = () => {
    setQuoteRequestOpen(true);
  };

  const handleCloseQuoteRequest = () => {
    setQuoteRequestOpen(false);
  };

  // Go back to services page
  const handleBackToServices = () => {
    navigate('/services');
  };

  // Navigate to related service
  const handleViewRelatedService = (relatedService) => {
    navigate(`/services/${relatedService.id}`, { state: { service: relatedService } });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Loading service details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh">
          <Alert 
            severity="error" 
            sx={{ width: "100%", maxWidth: "500px" }}
            action={
              <Button color="inherit" size="small" onClick={handleBackToServices}>
                Go Back
              </Button>
            }
          >
            {error || "Service not found"}
          </Alert>
        </Box>
      </Container>
    );
  }

  const highlightsList = service.highlights
    ? service.highlights.split(',').map(h => h.trim()).filter(h => h)
    : [];

  const hasProcess = service.process && service.process.trim() !== '';
  const hasBenefits = service.benefits && service.benefits.trim() !== '';
  const hasFaq = service.faq && service.faq.trim() !== '';

  return (
    <div className="service-detail-page">
      {/* Hero Section with Service Title */}
      <Box className="service-detail-hero">
        <Container maxWidth="lg">
          <Box className="service-breadcrumbs" mb={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link 
                color="inherit" 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link 
                color="inherit" 
                href="/services" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/services');
                }}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ArrowBackIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                Services
              </Link>
              <Typography color="textPrimary">{service.title}</Typography>
            </Breadcrumbs>
          </Box>
          
          <Box display="flex" alignItems="center" className="service-title-container">
            <span className="service-icon-large">{getIconForService(service)}</span>
            <Typography variant="h3" component="h1" className="service-title">
              {service.title}
            </Typography>
          </Box>
          
          {service.category && (
            <Chip 
              label={service.category} 
              color="primary" 
              className="service-category-chip"
              sx={{ mb: 2 }}
            />
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" className="service-detail-container">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="service details tabs"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
          >
            <Tab label="Overview" id="tab-0" aria-controls="tabpanel-0" />
            {hasProcess && <Tab label="Our Process" id="tab-1" aria-controls="tabpanel-1" />}
            {hasBenefits && <Tab label="Benefits" id="tab-2" aria-controls="tabpanel-2" />}
            {hasFaq && <Tab label="FAQ" id="tab-3" aria-controls="tabpanel-3" />}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
          {activeTab === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="h5" gutterBottom className="section-title">
                  About this Service
                </Typography>
                
                <Box className="rich-text-content service-description">
                  {service.description ? 
                    parse(service.description) : 
                    <Typography variant="body1">No description available</Typography>
                  }
                </Box>
                
                {service.price_range && (
                  <Box mt={4} p={3} className="price-box">
                    <Typography variant="subtitle1" className="price-label">
                      <AttachMoneyIcon /> Price Range:
                    </Typography>
                    <Typography variant="h6" className="price-value">
                      {service.price_range}
                    </Typography>
                  </Box>
                )}
                
                {highlightsList.length > 0 && (
                  <Box mt={4}>
                    <Typography variant="h5" gutterBottom className="section-title">
                      Key Highlights
                    </Typography>
                    <Grid container spacing={2} className="highlights-grid">
                      {highlightsList.map((highlight, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper elevation={1} className="highlight-item">
                            <CheckCircleIcon color="primary" className="highlight-icon" />
                            <Typography variant="body1">{highlight}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={5}>
                {service.image && (
                  <Box className="service-image-container">
                    <img
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      className="service-image"
                    />
                  </Box>
                )}
                
                <Paper elevation={2} className="service-action-card">
                  <Typography variant="h5" gutterBottom>
                    Interested in this Service?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Get a customized quote for your business needs or speak with one of our specialists about how we can help you.
                  </Typography>
                  <Box className="action-buttons">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      fullWidth
                      onClick={handleOpenQuoteRequest}
                      className="quote-button"
                      startIcon={<CalculateIcon />}
                    >
                      Request a Quote
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="large"
                      fullWidth
                      onClick={() => navigate('/contact')}
                      className="contact-button"
                    >
                      Contact Us
                    </Button>
                  </Box>
                </Paper>
                
                <Paper elevation={1} className="related-info-card" sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Why Choose Us
                  </Typography>
                  <Box className="benefit-list">
                    <Box display="flex" alignItems="flex-start" mb={2}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                      <Typography variant="body1">
                        Expert team with years of industry experience
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start" mb={2}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                      <Typography variant="body1">
                        Tailored solutions for your specific business needs
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <CheckCircleIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                      <Typography variant="body1">
                        Dedicated support throughout the entire process
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<BookmarkBorderIcon />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                      // This could save the service to favorites or trigger another action
                      setNotification && setNotification({
                        open: true,
                        message: "Service saved for later",
                        severity: "success"
                      });
                    }}
                  >
                    Save for Later
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>

        {hasProcess && (
          <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
            {activeTab === 1 && (
              <Box className="tab-content process-content">
                <Typography variant="h5" gutterBottom className="section-title">
                  Our Process
                </Typography>
                <Box className="rich-text-content">
                  {parse(service.process)}
                </Box>
                <Box display="flex" justifyContent="center" mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenQuoteRequest}
                  >
                    Get Started Now
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {hasBenefits && (
          <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
            {activeTab === 2 && (
              <Box className="tab-content benefits-content">
                <Typography variant="h5" gutterBottom className="section-title">
                  Benefits
                </Typography>
                <Box className="rich-text-content">
                  {parse(service.benefits)}
                </Box>
              </Box>
            )}
          </Box>
        )}

        {hasFaq && (
          <Box role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3" aria-labelledby="tab-3">
            {activeTab === 3 && (
              <Box className="tab-content faq-content">
                <Typography variant="h5" gutterBottom className="section-title">
                  Frequently Asked Questions
                </Typography>
                <Box className="rich-text-content">
                  {parse(service.faq)}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Container>

      {/* Related Services Section */}
      <Box className="related-services-section" mt={8} py={5}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom className="section-title">
            You Might Also Be Interested In
          </Typography>
          
          {relatedServices.length > 0 ? (
            <Grid container spacing={3} sx={{ mt: 3, mb: 4 }}>
              {relatedServices.map(relatedService => (
                <Grid item xs={12} sm={6} md={4} key={relatedService.id}>
                  <Paper 
                    elevation={2} 
                    className="related-service-card"
                    onClick={() => handleViewRelatedService(relatedService)}
                    sx={{ 
                      cursor: 'pointer', 
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center" p={2}>
                      <span className="service-icon">{getIconForService(relatedService)}</span>
                      <Typography variant="h6">{relatedService.title}</Typography>
                    </Box>
                    {relatedService.image && (
                      <Box 
                        sx={{ 
                          height: 120, 
                          backgroundImage: `url(${getImageUrl(relatedService.image)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }} 
                      />
                    )}
                    <Box p={2}>
                      <Typography variant="body2" noWrap>
                        {relatedService.description?.replace(/<[^>]*>/g, '').substring(0, 80)}...
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" sx={{ my: 3 }}>
              No related services found.
            </Typography>
          )}
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/services')}
            sx={{ mt: 2 }}
          >
            View All Services
          </Button>
        </Container>
      </Box>

      {/* Quote Request Form Dialog */}
      <QuoteRequestForm 
        open={quoteRequestOpen} 
        onClose={handleCloseQuoteRequest} 
        service={service} 
      />
    </div>
  );
};

export default ServiceDetail;