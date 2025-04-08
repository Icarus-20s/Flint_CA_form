import React, { useState } from 'react';
import api from "../../Api/api";
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Typography, 
  Alert, 
  Container, 
  Paper, 
  Box, 
  Grid, 
  Divider,
  Card,
  CardContent,
  Snackbar
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  AccessTime, 
  Send as SendIcon, 
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import './Contactus.css';

const Contactus = () => {
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
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle input blur for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  
  // Form validation
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
        return formData.name.length < 2 ? 'Name must be at least 2 characters' : null;
      case 'email':
        return !validateEmail(formData.email) ? 'Please enter a valid email address' : null;
      case 'phone':
        return formData.phone && !validatePhone(formData.phone) ? 'Please enter a valid phone number' : null;
      case 'subject':
        return formData.subject.length < 5 ? 'Subject must be at least 5 characters' : null;
      case 'message':
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

  return (
    <div className="contactus-page">
      {/* Hero Banner */}
      <div className="contact-hero">
        <Container maxWidth="lg">
          <Typography variant="h2" className="contact-hero-title">Contact Us</Typography>
          <Typography variant="h6" className="contact-hero-subtitle">
            Get in touch with our experienced team of CA professionals
          </Typography>
        </Container>
      </div>
      
      <Container maxWidth="lg" className="contact-main-container">
        {/* Contact Info Cards */}
        <Grid container spacing={3} className="contact-info-cards">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="contact-info-card">
              <CardContent>
                <div className="contact-card-icon">
                  <LocationOn />
                </div>
                <Typography variant="h6" className="contact-card-title">Our Location</Typography>
                <Typography variant="body1">Lainchar, Kathmandu</Typography>
                <Typography variant="body2">Nepal</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="contact-info-card">
              <CardContent>
                <div className="contact-card-icon">
                  <Phone />
                </div>
                <Typography variant="h6" className="contact-card-title">Phone Number</Typography>
                <Typography variant="body1">+977 9845012445</Typography>
                <Typography variant="body2">Mon-Fri, 9AM-5PM</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="contact-info-card">
              <CardContent>
                <div className="contact-card-icon">
                  <Email />
                </div>
                <Typography variant="h6" className="contact-card-title">Email Address</Typography>
                <Typography variant="body1">kbpsassociates@gmail.com</Typography>
                <Typography variant="body2">We respond within 24 hours</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="contact-info-card">
              <CardContent>
                <div className="contact-card-icon">
                  <AccessTime />
                </div>
                <Typography variant="h6" className="contact-card-title">Business Hours</Typography>
                <Typography variant="body1">Monday - Friday</Typography>
                <Typography variant="body2">9:00 AM - 5:00 PM</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Main Contact Section */}
        <Paper elevation={0} className="contact-paper">
          <Grid container spacing={4}>
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
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                        required
                        error={!!getValidationError('name')}
                        helperText={getValidationError('name')}
                        className="contact-input"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                        required
                        error={!!getValidationError('email')}
                        helperText={getValidationError('email')}
                        className="contact-input"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number (Optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                        error={!!getValidationError('phone')}
                        helperText={getValidationError('phone')}
                        className="contact-input"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                        required
                        error={!!getValidationError('subject')}
                        helperText={getValidationError('subject')}
                        className="contact-input"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={5}
                        required
                        error={!!getValidationError('message')}
                        helperText={getValidationError('message')}
                        className="contact-input"
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
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
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
                    A professional CA firm providing comprehensive accounting, tax, and financial advisory services to businesses and individuals.
                  </Typography>
                  
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
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      {/* Map Section */}
      <Box className="map-section">
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
      </Box>
      
      {/* FAQ Section */}
      <Container maxWidth="lg" className="faq-section">
        <Typography variant="h4" className="faq-title">
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={3} className="faq-container">
          <Grid item xs={12} md={6}>
            <div className="faq-item">
              <Typography variant="h6" className="faq-question">
                What services does your CA firm provide?
              </Typography>
              <Typography variant="body1" className="faq-answer">
                We offer a comprehensive range of services including accounting, auditing, taxation, financial advisory, company incorporation, and business consulting.
              </Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <div className="faq-item">
              <Typography variant="h6" className="faq-question">
                How quickly can I expect a response after contacting you?
              </Typography>
              <Typography variant="body1" className="faq-answer">
                We aim to respond to all inquiries within 24 business hours. For urgent matters, please contact us directly by phone.
              </Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <div className="faq-item">
              <Typography variant="h6" className="faq-question">
                Do you offer virtual consultations?
              </Typography>
              <Typography variant="body1" className="faq-answer">
                Yes, we offer virtual consultations via video conferencing platforms for clients who cannot visit our office in person.
              </Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <div className="faq-item">
              <Typography variant="h6" className="faq-question">
                What information should I prepare for our first meeting?
              </Typography>
              <Typography variant="body1" className="faq-answer">
                For the initial consultation, please bring your business registration documents, recent financial statements, tax filings from the previous year, and any specific questions or concerns you'd like to discuss.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ width: '100%' }}
        >
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contactus;