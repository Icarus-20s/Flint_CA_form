import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../Api/api';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    companyName: '',
    businessType: '',
    serviceId: '',
    serviceName: '',
    serviceCategory: '',
    serviceNeedDate: '',
    message: '',
    budget: '',
    agreesToTerms: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      // Extract unique categories using category_name
      const uniqueCategories = [...new Set(services.map(service => service.category_name))];
      setCategories(uniqueCategories);
      
      // Filter services based on active category
      filterServicesByCategory(activeCategory);
    }
  }, [services, activeCategory]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get('services/');
      setServices(response.data);
      setFilteredServices(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load services. Please try again later.');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterServicesByCategory = (category) => {
    if (category === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category_name === category));
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleServiceSelect = async (service) => {
    try {
      const response = await api.get(`services/${service.slug}/`);
      setSelectedService(response.data);
      setQuoteForm({
        ...quoteForm,
        serviceId: response.data.id,
        serviceName: response.data.title,
        serviceCategory: response.data.category_name || 'General'
      });
    } catch (err) {
      console.error('Failed to fetch service detail:', err);
    }
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
  };

  // Updated to close the service detail popup before scrolling
  const scrollToQuoteForm = () => {
    // First close the service detail popup
    setSelectedService(null);
    
    // Then scroll to the quote form - adding a small delay ensures the close animation
    // completes before scrolling, providing a smoother user experience
    setTimeout(() => {
      document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuoteForm({
      ...quoteForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quoteForm.agreesToTerms) {
      setFormError('You must agree to the terms and conditions to proceed.');
      return;
    }
    
    try {
      setFormError(null);
      await api.post('quote-requests/', quoteForm);
      setFormSubmitted(true);
      
      // Reset form
      setQuoteForm({
        fullName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        companyName: '',
        businessType: '',
        serviceId: selectedService ? selectedService.id : '',
        serviceName: selectedService ? selectedService.title : '',
        serviceCategory: selectedService ? (selectedService.category_name || 'General') : '',
        serviceNeedDate: '',
        message: '',
        budget: '',
        agreesToTerms: false
      });
      
      // Clear selected service
      setSelectedService(null);
    } catch (err) {
      setFormError('Failed to submit your request. Please try again or contact us directly.');
      console.error('Error submitting quote request:', err);
    }
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="spinner"></div>
        <p>Loading our services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-error">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={fetchServices} className="retry-button">Try Again</button>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Our Professional Services</h1>
          <p>Comprehensive accounting and financial solutions tailored for your business needs</p>
        </div>
      </div>

      <div className="services-container">
        <h2 className="services-section-title">Services We Offer</h2>
        <p className="services-section-subtitle">
          Our firm provides expert financial guidance to businesses of all sizes. Select a service to learn more.
        </p>

        <div className="category-filter">
          <button 
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Services
          </button>
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div 
          className="services-grid"
          layout
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleServiceSelect(service)}
                layout
              >
                <div className="service-image">
                  {service.image ? (
                    <img src={service.image} alt={service.title} />
                  ) : (
                    <div className="service-image-placeholder">
                      <i className="fas fa-calculator"></i>
                    </div>
                  )}
                  {service.is_featured && (
                    <div className="featured-badge">
                      <i className="fas fa-star"></i> Featured
                    </div>
                  )}
                </div>
                <div className="service-content">
                  <div className="service-category">{service.category_name}</div>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.short_description}</p>
                  {service.pricing_starts_at && (
                    <div className="service-pricing">
                      Starts at ₹{service.pricing_starts_at}
                    </div>
                  )}
                  <button className="service-button">Learn More</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="service-detail-container"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="service-detail-header">
                <h2>{selectedService.title}</h2>
                <button className="close-button" onClick={closeServiceDetail}>×</button>
              </div>
              <div className="service-detail-content">
                {selectedService.image && (
                  <div className="service-detail-image">
                    <img src={selectedService.image} alt={selectedService.title} />
                  </div>
                )}
                <div className="service-detail-info">
                  <div className="service-detail-description">
                    <p>{selectedService.short_description}</p>
                  </div>
                  
                  {selectedService.pricing_starts_at && (
                    <div className="service-pricing-detail">
                      <div className="pricing-label">Starting at</div>
                      <div className="pricing-amount">₹{selectedService.pricing_starts_at}</div>
                      <div className="pricing-note">* Final pricing depends on specific requirements</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="service-detail-cta">
                <button className="quote-button" onClick={scrollToQuoteForm}>
                  Request a Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="quote-form" className="quote-request-section">
        <div className="quote-request-container">
          <h2>Request a Quote</h2>
          <p>Fill out the form below to receive a customized quote for your business needs.</p>

          {formSubmitted ? (
            <div className="form-success">
              <i className="fas fa-check-circle"></i>
              <h3>Thank You!</h3>
              <p>Your quote request has been successfully submitted. We'll get back to you within 24-48 hours.</p>
              <button onClick={() => setFormSubmitted(false)} className="new-quote-button">
                Request Another Quote
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form">
              {formError && <div className="form-error-message">{formError}</div>}
              
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={quoteForm.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={quoteForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={quoteForm.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredContact">Preferred Contact Method</label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={quoteForm.preferredContact}
                      onChange={handleInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="either">Either</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Business Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={quoteForm.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="businessType">Business Type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={quoteForm.businessType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Business Type</option>
                      <option value="sole-proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="non-profit">Non-Profit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Service Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="serviceName">Selected Service</label>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      value={quoteForm.serviceName}
                      onChange={handleInputChange}
                      readOnly={selectedService !== null}
                      placeholder="Select a service from above or type here"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceNeedDate">When do you need this service?</label>
                    <input
                      type="text"
                      id="serviceNeedDate"
                      name="serviceNeedDate"
                      value={quoteForm.serviceNeedDate}
                      onChange={handleInputChange}
                      placeholder="e.g., ASAP, Next Month, Q4 2025"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={quoteForm.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="under-5000">Under ₹5,000</option>
                      <option value="5000-15000">₹5,000 - ₹15,000</option>
                      <option value="15000-30000">₹15,000 - ₹30,000</option>
                      <option value="30000-50000">₹30,000 - ₹50,000</option>
                      <option value="over-50000">Over ₹50,000</option>
                      <option value="not-sure">Not Sure / To Be Discussed</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="message">Message / Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={quoteForm.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Please describe your specific requirements and any relevant details about your project."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="agreesToTerms"
                    name="agreesToTerms"
                    checked={quoteForm.agreesToTerms}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="agreesToTerms">
                    I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">Submit Quote Request</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;