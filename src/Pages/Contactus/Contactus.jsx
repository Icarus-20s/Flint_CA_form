import React, { useState } from 'react';
import api from "../../Api/api"; // API helper for making requests
import { TextField, Button, CircularProgress, Typography, Alert, Container, Paper, Box, Grid } from '@mui/material';
import './Contactus.css'; // Custom styling if needed

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(''); // State to store error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await api.post('contact/', formData);

      if (response.status === 200) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
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

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }} className="contactus-container">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Left Section (Contact Form) */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ padding: 3 }} className="contactus-paper">
              <Typography variant="h4" gutterBottom align="center" className="contactus-title">Contact Us</Typography>

              {/* Display error message if present */}
              {error && <Alert severity="error" sx={{ mb: 2 }} className="contactus-error">{error}</Alert>}

              <form onSubmit={handleSubmit} className="contactus-form">
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  className="contactus-input"
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  className="contactus-input"
                />
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  className="contactus-input"
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  className="contactus-input"
                />
                
                {/* Submit button with loading animation */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={loading}
                  className="contactus-submit"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Right Section (Address) */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: '100%',
              }}
            >
              <Typography variant="h5"><strong>Address:</strong> Lainchar, Kathmandu</Typography>
              <Typography variant="h5"><strong>Phone:</strong> 9845012445</Typography>
              <Typography variant="h5"><strong>Email:</strong> Cafirm@gmail.com</Typography>
              <Typography variant="h5" sx={{ mt: 3 }}>
                <strong>Business Hours:</strong> Mon - Fri: 9 AM - 5 PM
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Google Map - Simple Embed */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps?q=27.700769,85.300140&hl=en&z=14&output=embed"
          width="100%"
          height="400"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default Contactus;
