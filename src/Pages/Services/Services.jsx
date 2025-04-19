import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Paper,
  Snackbar,
  Alert,
  Chip,
  Divider,
  Tab,
  Tabs,
  CircularProgress
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalculateIcon from "@mui/icons-material/Calculate";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import "./Services.css";
import { useNavigate } from "react-router-dom";
import QuoteRequestForm from "../QuoteRequestForm/QuoteRequestForm";
import api from "../../Api/api";
// Service category icons mapping
const SERVICE_ICONS = {
  "Tax Planning": <CalculateIcon />,
  "Auditing": <ReceiptIcon />,
  "Financial Consulting": <AttachMoneyIcon />,
  "Compliance": <CheckCircleIcon />,
  "Corporate Finance": <BusinessIcon />,
  "Accounting": <AccountBalanceIcon />,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [detailTab, setDetailTab] = useState(0);
  const navigate = useNavigate();
  const [quoteRequestOpen, setQuoteRequestOpen] = useState(false);
  const [serviceForQuote, setServiceForQuote] = useState(null);
  


  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch services from API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/services/`);
      setServices(response.data);
    } catch (err) {
      setError("Error fetching services. Please try again later.");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle opening quote request form
  const handleOpenQuoteRequest = (service) => {
    setServiceForQuote(service);
    setQuoteRequestOpen(true);
    // Close the service detail modal when opening quote request
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  // Handle closing quote request form
  const handleCloseQuoteRequest = () => {
    setQuoteRequestOpen(false);
    // Show success notification if needed
    setNotification({
      open: true,
      message: "Thank you for your interest. We'll be in touch soon!",
      severity: "success"
    });
  };

  // View service details
  const handleViewService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setDetailTab(0); // Reset to first tab when opening
  };

  // Close service details modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Don't reset selectedService immediately to avoid UI flicker
    // It's better to let React handle the unmounting
  };

  // Handle tab changes in details modal
  const handleTabChange = (event, newValue) => {
    setDetailTab(newValue);
  };

  // Close notification
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Get unique categories for filtering
  const uniqueCategories = useMemo(() => {
    const categories = services.map(service => service.category || "Uncategorized");
    return ["All", ...new Set(categories)];
  }, [services]);

  // Filter services by selected category
  const filteredServices = useMemo(() => {
    if (categoryFilter === "All") return services;
    return services.filter(service => service.category === categoryFilter);
  }, [services, categoryFilter]);

  // Get icon for service category
  const getIconForService = (service) => {
    if (service?.category && SERVICE_ICONS[service.category]) {
      return SERVICE_ICONS[service.category];
    }
    return <BusinessIcon />;
  };

  // Format image URL
  const getImageUrl = (image) => {
    if (!image) return null;
    return image.startsWith("http") ? image : `${API_BASE_URL}${image}`;
  };

  // Service card component
  const ServiceCard = ({ service, index }) => {
    const highlightsList = service.highlights
      ? service.highlights.split(',').map(h => h.trim()).filter(h => h)
      : [];
    
    return (
      <Card className="service-card" elevation={3}>
        <Box className="service-card-header">
          <Box display="flex" alignItems="center">
            <span className="service-icon">{getIconForService(service)}</span>
            <Typography variant="subtitle1" fontWeight="medium">
              {service.title}
            </Typography>
          </Box>
          {service.category && (
            <Chip 
              label={service.category} 
              size="small" 
              className="category-chip"
            />
          )}
        </Box>
        
        {service.image && (
          <CardMedia
            component="img"
            alt={service.title}
            height="180"
            image={getImageUrl(service.image)}
            title={service.title}
            className="service-card-media"
          />
        )}
        
        <CardContent className="service-card-content">
          <Typography variant="body2" className="service-card-description">
            {service.description ? 
              (service.description.replace(/<[^>]*>/g, '').length > 120 
                ? `${service.description.replace(/<[^>]*>/g, '').substring(0, 120)}...` 
                : service.description.replace(/<[^>]*>/g, ''))
              : "No description available"}
          </Typography>
          
          {highlightsList.length > 0 && (
            <Box mt={2}>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                Key Highlights:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                {highlightsList.slice(0, 2).map((highlight, idx) => (
                  <Chip 
                    key={idx} 
                    label={highlight} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
                {highlightsList.length > 2 && (
                  <Chip 
                    label={`+${highlightsList.length - 2} more`} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </Box>
          )}
          
          {service.price_range && (
            <Box mt={2} display="flex" alignItems="center">
              <AttachMoneyIcon fontSize="small" color="primary" />
              <Typography variant="body2" fontWeight="medium" color="primary">
                {service.price_range}
              </Typography>
            </Box>
          )}
        </CardContent>
        
        <Box className="service-card-actions">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleViewService(service)}
            className="learn-more-button"
            fullWidth
          >
            View Details
          </Button>
        </Box>
      </Card>
    );
  };

  // Service detail modal
  const ServiceDetailModal = () => {
    if (!selectedService) return null;
    
    const highlightsList = selectedService.highlights 
      ? selectedService.highlights.split(',').map(h => h.trim()).filter(h => h)
      : [];

    const hasProcess = selectedService.process && selectedService.process.trim() !== '';
    const hasBenefits = selectedService.benefits && selectedService.benefits.trim() !== '';
    const hasFaq = selectedService.faq && selectedService.faq.trim() !== '';

    return (
      <Dialog 
        open={isModalOpen} 
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        className="service-detail-dialog"
      >
        <DialogTitle className="service-detail-title">
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <span className="service-icon">{getIconForService(selectedService)}</span>
            <Typography variant="h5" component="div">{selectedService.title}</Typography>
            {selectedService.category && (
              <Chip 
                label={selectedService.category} 
                color="primary" 
                size="small"
                className="category-chip"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
        </DialogTitle>
        
        <Divider />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={detailTab} onChange={handleTabChange} aria-label="service details tabs">
            <Tab label="Overview" />
            {hasProcess && <Tab label="Process" />}
            {hasBenefits && <Tab label="Benefits" />}
            {hasFaq && <Tab label="FAQ" />}
          </Tabs>
        </Box>
        
        <DialogContent className="service-detail-content">
          {detailTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Typography variant="subtitle1" gutterBottom className="section-title">
                  About this Service
                </Typography>
                
                <Box className="rich-text-content">
                  {selectedService.description ? 
                    parse(selectedService.description) : 
                    <Typography variant="body1">No description available</Typography>
                  }
                </Box>
                
                {selectedService.price_range && (
                  <Box mt={3} p={2} className="price-box">
                    <Typography variant="subtitle2" className="price-label">
                      <AttachMoneyIcon fontSize="small" /> Price Range:
                    </Typography>
                    <Typography variant="body1" className="price-value">
                      {selectedService.price_range}
                    </Typography>
                  </Box>
                )}
                
                {highlightsList.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" gutterBottom className="section-title">
                      Key Highlights
                    </Typography>
                    <Grid container spacing={2} className="highlights-grid">
                      {highlightsList.map((highlight, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper elevation={1} className="highlight-item-card">
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
                {selectedService.image && (
                  <Box className="service-detail-image-container">
                    <img
                      src={getImageUrl(selectedService.image)}
                      alt={selectedService.title}
                      className="service-detail-image"
                    />
                  </Box>
                )}
                
                <Paper elevation={1} className="contact-info-box" sx={{ mt: 3, p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Request This Service
                  </Typography>
                  <Typography variant="body2" paragraph>
                    For detailed pricing and consultation about this {selectedService.category?.toLowerCase() || "service"}, 
                    please contact our team or request a custom quote.
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      className="request-button"
                      onClick={() => handleOpenQuoteRequest(selectedService)}
                    >
                      Request Quote
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth
                      className="contact-button"
                      onClick={() => {
                        navigate("/contact");
                      }}
                    >
                      Contact Us
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {detailTab === 1 && hasProcess && (
            <Box className="tab-content">
              <Typography variant="h6" gutterBottom>Our Process</Typography>
              <Box className="rich-text-content process-content">
                {parse(selectedService.process)}
              </Box>
            </Box>
          )}
          
          {detailTab === 2 && hasBenefits && (
            <Box className="tab-content">
              <Typography variant="h6" gutterBottom>Service Benefits</Typography>
              <Box className="rich-text-content benefits-content">
                {parse(selectedService.benefits)}
              </Box>
            </Box>
          )}
          
          {detailTab === 3 && hasFaq && (
            <Box className="tab-content">
              <Typography variant="h6" gutterBottom>Frequently Asked Questions</Typography>
              <Box className="rich-text-content faq-content">
                {parse(selectedService.faq)}
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions className="service-detail-actions">
          <Button 
            onClick={handleCloseModal} 
            color="primary" 
            variant="text"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <Container maxWidth="lg">
          <Typography variant="h2" className="hero-title" gutterBottom>
            Our Professional Services
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Expert accounting and financial solutions for your business needs
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg" className="services-container">
        {/* Page Introduction */}
        <Box mt={5} mb={4} className="services-intro">
          <Typography variant="body1" className="intro-text" paragraph>
            Our Chartered Accountancy firm offers comprehensive financial and accounting services 
            tailored to meet your specific business requirements. With years of experience and
            a team of dedicated professionals, we ensure accuracy, compliance, and growth 
            for your business.
          </Typography>
        </Box>

        {/* Category Filter */}
        <Box className="category-filter-container" mb={4}>
          <Typography variant="subtitle1" className="filter-label">
            Filter by Category:
          </Typography>
          <Box className="category-chips">
            {uniqueCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setCategoryFilter(category)}
                color={categoryFilter === category ? "primary" : "default"}
                className={`category-chip ${categoryFilter === category ? "active" : ""}`}
              />
            ))}
          </Box>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" className="error-alert" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Services Grid */}
        {loading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <ServiceCard service={service} index={index} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper className="no-services-message" elevation={0}>
                  <Typography variant="h6" align="center">
                    No services available in this category
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {/* Call to Action Section */}
        <Box my={6} className="cta-section">
          <Paper elevation={2} className="cta-paper">
            <Typography variant="h5" gutterBottom className="cta-title">
              Need a customized solution?
            </Typography>
            <Typography variant="body1" paragraph className="cta-text">
              We offer tailored services designed specifically for your business requirements.
              Contact us today to discuss how we can help your business thrive.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              className="cta-button"
              onClick={() => handleOpenQuoteRequest(null)}
            >
              Request Consultation
            </Button>
          </Paper>
        </Box>
      </Container>

      {/* Quote Request Form Dialog - Make sure it renders independently from the service detail modal */}
      <QuoteRequestForm 
        open={quoteRequestOpen} 
        onClose={handleCloseQuoteRequest} 
        service={serviceForQuote} 
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Services;