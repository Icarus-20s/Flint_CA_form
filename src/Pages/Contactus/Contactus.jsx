import React, { useState, useEffect } from 'react';
import api from "../../Api/api";
import { 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Container, 
  Paper, 
  Box, 
  Grid, 
  Divider,
  Card,
  CardContent,
  Snackbar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  AccessTime, 
  Send as SendIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../Loaders/LoadingSpinner'
import './Contactus.css';

const Contactus = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});
  const [formFocused, setFormFocused] = useState(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    cards: false,
    form: false,
    map: false,
    faq: false
  });
  
  // Animation controls
  useEffect(() => {
    // Set initial visibility with slight delays for cascade effect
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100),
      setTimeout(() => setIsVisible(prev => ({ ...prev, cards: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, form: true })), 500),
      setTimeout(() => setIsVisible(prev => ({ ...prev, map: true })), 700),
      setTimeout(() => setIsVisible(prev => ({ ...prev, faq: true })), 900)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle input focus/blur for enhanced UI feedback
  const handleFocus = (fieldName) => {
    setFormFocused(fieldName);
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setFormFocused(null);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  
  // Form validation with more detailed feedback
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePhone = (phone) => {
    return /^[0-9+ -]{10,15}$/.test(phone);
  };
  
  const getValidationError = (field) => {
    if (!touched[field]) return null;
    
    switch (field) {
      case 'name':
        if (formData.name.length === 0) return 'Name is required';
        return formData.name.length < 2 ? 'Name must be at least 2 characters' : null;
      case 'email':
        if (formData.email.length === 0) return 'Email is required';
        return !validateEmail(formData.email) ? 'Please enter a valid email address' : null;
      case 'phone':
        return formData.phone && !validatePhone(formData.phone) ? 'Please enter a valid phone number' : null;
      case 'subject':
        if (formData.subject.length === 0) return 'Subject is required';
        return formData.subject.length < 5 ? 'Subject must be at least 5 characters' : null;
      case 'message':
        if (formData.message.length === 0) return 'Message is required';
        return formData.message.length < 20 ? 'Message must be at least 20 characters' : null;
      default:
        return null;
    }
  };
  
  const isFormValid = () => {
    return (
      formData.name.length >= 2 &&
      validateEmail(formData.email) &&
      (formData.phone === '' || validatePhone(formData.phone)) &&
      formData.subject.length >= 5 &&
      formData.message.length >= 20
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Touch all fields to show validation errors
    const allFields = { name: true, email: true, phone: true, subject: true, message: true };
    setTouched(allFields);
    
    if (!isFormValid()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await api.post('contact/', formData);

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTouched({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle success notification close
  const handleSnackbarClose = () => {
    setSuccess(false);
  };

  // Framer Motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="contactus-page">
      {/* Hero Banner */}
      <motion.div 
        className="contact-hero"
        initial="hidden"
        animate={isVisible.hero ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" className="contact-hero-title">Contact Us</Typography>
          <Typography variant="h6" className="contact-hero-subtitle">
            Ready to elevate your financial strategy? Our CA professionals are here to help.
          </Typography>
        </Container>
      </motion.div>
      
      <Container maxWidth="lg" className="contact-main-container">
        {/* Contact Info Cards */}
        <motion.div
          className="section-title-container"
          initial="hidden"
          animate={isVisible.cards ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <Typography variant="h4" className="section-title">How to Reach Us</Typography>
          <Divider className="section-divider" />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate={isVisible.cards ? "visible" : "hidden"}
          variants={staggerCards}
        >
          <Grid container spacing={3} className="contact-info-cards">
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={cardVariant}>
                <Card className="contact-info-card" elevation={2}>
                  <CardContent className="contact-card-content">
                    <div className="contact-card-icon">
                      <LocationOn fontSize="large" />
                    </div>
                    <Typography variant="h6" className="contact-card-title">Our Location</Typography>
                    <Typography variant="body1">Lainchar, Kathmandu</Typography>
                    <Typography variant="body2">Nepal</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={cardVariant}>
                <Card className="contact-info-card" elevation={2}>
                  <CardContent className="contact-card-content">
                    <div className="contact-card-icon">
                      <Phone fontSize="large" />
                    </div>
                    <Typography variant="h6" className="contact-card-title">Phone Number</Typography>
                    <Typography variant="body1">+977 9845012445</Typography>
                    <Typography variant="body2">Mon-Fri, 9AM-5PM</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={cardVariant}>
                <Card className="contact-info-card" elevation={2}>
                  <CardContent className="contact-card-content">
                    <div className="contact-card-icon">
                      <Email fontSize="large" />
                    </div>
                    <Typography variant="h6" className="contact-card-title">Email Address</Typography>
                    <Typography variant="body1">kbpsassociates@gmail.com</Typography>
                    <Typography variant="body2">We respond within 24 hours</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={cardVariant}>
                <Card className="contact-info-card" elevation={2}>
                  <CardContent className="contact-card-content">
                    <div className="contact-card-icon">
                      <AccessTime fontSize="large" />
                    </div>
                    <Typography variant="h6" className="contact-card-title">Business Hours</Typography>
                    <Typography variant="body1">Sunday - Friday</Typography>
                    <Typography variant="body2">9:00 AM - 5:00 PM</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
        
        {/* Main Contact Section */}
        <motion.div
          initial="hidden"
          animate={isVisible.form ? "visible" : "hidden"}
          variants={fadeIn}
          className="contact-form-container"
        >
          <Paper elevation={3} className="contact-paper">
            <Grid container spacing={isMobile ? 2 : 4}>
              {/* Left Side - Form */}
              <Grid item xs={12} md={7}>
                <Box className="form-section">
                  <Typography variant="h4" className="form-title">
                    Schedule an Appointment
                  </Typography>
                  <Typography variant="body1" className="form-subtitle">
                    Fill out the form below and our team will get back to you within 24 hours
                  </Typography>
                  
                  <Divider className="form-divider" />
                  
                  {/* Display error message if present */}
                  {error && (
                    <Alert severity="error" className="contact-alert" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit} className="contact-form">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          required
                          error={!!getValidationError('name')}
                          helperText={getValidationError('name')}
                          className={`contact-input ${formFocused === 'name' ? 'input-focused' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          required
                          error={!!getValidationError('email')}
                          helperText={getValidationError('email')}
                          className={`contact-input ${formFocused === 'email' ? 'input-focused' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number (Optional)"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          error={!!getValidationError('phone')}
                          helperText={getValidationError('phone')}
                          className={`contact-input ${formFocused === 'phone' ? 'input-focused' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          required
                          error={!!getValidationError('subject')}
                          helperText={getValidationError('subject')}
                          className={`contact-input ${formFocused === 'subject' ? 'input-focused' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          multiline
                          rows={5}
                          required
                          error={!!getValidationError('message')}
                          helperText={getValidationError('message')}
                          className={`contact-input ${formFocused === 'message' ? 'input-focused' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="large"
                          disabled={loading}
                          className="submit-button"
                          startIcon={loading ? <LoadingSpinner size="small" /> : <SendIcon />}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Grid>
              
              {/* Right Side - Office Info */}
              <Grid item xs={12} md={5}>
                <Box className="office-info-section">
                  <Typography variant="h4" className="office-info-title">
                    Our Office
                  </Typography>
                  
                  <div className="office-image-container">
                    <img 
                      src="/api/placeholder/500/300" 
                      alt="KBPS Associates Office" 
                      className="office-image" 
                    />
                  </div>
                  
                  <Box className="office-details">
                    <Typography variant="h6" className="office-name">
                      KBPS Associates
                    </Typography>
                    <Typography variant="body1" className="office-description">
                      A professional CA firm providing comprehensive accounting, tax, and financial advisory services to businesses and individuals across Nepal.
                    </Typography>
                    
                    <motion.div 
                      className="contact-details-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Box className="contact-detail-item">
                        <LocationOn className="contact-detail-icon" />
                        <Typography>
                          Lainchar, Kathmandu, Nepal
                        </Typography>
                      </Box>
                      
                      <Box className="contact-detail-item">
                        <Phone className="contact-detail-icon" />
                        <Typography>
                          +977 9845012445
                        </Typography>
                      </Box>
                      
                      <Box className="contact-detail-item">
                        <Email className="contact-detail-icon" />
                        <Typography>
                          kbpsassociates@gmail.com
                        </Typography>
                      </Box>
                      
                      <Box className="contact-detail-item">
                        <AccessTime className="contact-detail-icon" />
                        <Typography>
                          Sunday - Friday: 9:00 AM - 5:00 PM
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
      
      {/* Map Section */}
      <motion.div 
        className="map-section"
        initial="hidden"
        animate={isVisible.map ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" className="map-title">Find Us</Typography>
          <Typography variant="body1" className="map-subtitle">
            Located in the heart of Kathmandu, our office is easily accessible
          </Typography>
        </Container>
        
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps?q=27.700769,85.300140&hl=en&z=14&output=embed"
            width="100%"
            height="450"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            title="KBPS Associates Location"
          ></iframe>
        </div>
      </motion.div>
      
      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        animate={isVisible.faq ? "visible" : "hidden"}
        variants={fadeIn}
        className="faq-section-container"
      >
        <Container maxWidth="lg" className="faq-section">
          <Typography variant="h4" className="faq-title">
            Frequently Asked Questions
          </Typography>
          
          <Divider className="faq-divider" />
          
          <Grid container spacing={3} className="faq-container">
            <Grid item xs={12} md={6}>
              <motion.div 
                className="faq-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography variant="h6" className="faq-question">
                  What services does your CA firm provide?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  We offer a comprehensive range of services including accounting, auditing, taxation, financial advisory, company incorporation, and business consulting.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div 
                className="faq-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography variant="h6" className="faq-question">
                  How quickly can I expect a response after contacting you?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  We aim to respond to all inquiries within 24 business hours. For urgent matters, please contact us directly by phone.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div 
                className="faq-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography variant="h6" className="faq-question">
                  Do you offer virtual consultations?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  Yes, we offer virtual consultations via video conferencing platforms for clients who cannot visit our office in person.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div 
                className="faq-item"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography variant="h6" className="faq-question">
                  What information should I prepare for our first meeting?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  For the initial consultation, please bring your business registration documents, recent financial statements, tax filings from the previous year, and any specific questions or concerns you'd like to discuss.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
      
      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contactus;