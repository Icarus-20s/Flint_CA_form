import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContextProvider";
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
  TextField,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  Divider,
  Fade,
  Grow,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CalculateIcon from "@mui/icons-material/Calculate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import Loader from "../../Loaders/Loader";
import "./Services.css";

const SERVICE_ICONS = {
  "Tax Planning": <CalculateIcon />,
  "Auditing": <ReceiptIcon />,
  "Financial Consulting": <AttachMoneyIcon />,
  "Compliance": <CheckCircleIcon />,
  "Corporate Finance": <BusinessIcon />,
  "Accounting": <AccountBalanceIcon />,
};

const Services = () => {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
    highlights: "",
    price_range: ""
  });
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/services/");
      setServices(response.data);
    } catch (err) {
      setError("Error fetching services. Please try again later.");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showNotification("You must be logged in to add a service.", "error");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/services/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setServices((prev) => [...prev, response.data]);
      setFormData({ 
        title: "", 
        description: "", 
        image: null, 
        category: "", 
        highlights: "", 
        price_range: "" 
      });
      setIsFormOpen(false);
      showNotification("Service added successfully!", "success");
    } catch (err) {
      showNotification("Error adding service. Please try again.", "error");
      console.error("Error adding service:", err);
    }
  };

  const handleEditService = (service) => {
    setEditingService({...service});
    setIsFormOpen(true);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showNotification("You must be logged in to update a service.", "error");
      return;
    }

    const data = new FormData();
    Object.entries(editingService).forEach(([key, value]) => {
      if (value !== null && key !== 'image_url') data.append(key, value);
    });

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/services/${editingService.id}/`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setServices((prev) =>
        prev.map((service) => (service.id === editingService.id ? response.data : service))
      );
      setEditingService(null);
      setIsFormOpen(false);
      showNotification("Service updated successfully!", "success");
    } catch (err) {
      showNotification("Error updating service. Please try again.", "error");
      console.error("Error updating service:", err);
    }
  };

  const handleDeleteService = async (id) => {
    if (!isAuthenticated) {
      showNotification("You must be logged in to delete a service.", "error");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/services/${id}/`);
      setServices((prev) => prev.filter((service) => service.id !== id));
      showNotification("Service deleted successfully!", "success");
    } catch (err) {
      showNotification("Error deleting service. Please try again.", "error");
      console.error("Error deleting service:", err);
    }
  };

  const handleLearnMoreClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingService(null);
    setFormData({ 
      title: "", 
      description: "", 
      image: null, 
      category: "", 
      highlights: "", 
      price_range: "" 
    });
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const getUniqueCategories = () => {
    const categories = services.map(service => service.category || "Uncategorized");
    return ["All", ...new Set(categories)];
  };

  const filterServicesByCategory = () => {
    if (categoryFilter === "All") return services;
    return services.filter(service => service.category === categoryFilter);
  };

  const getIconForService = (service) => {
    if (service.category && SERVICE_ICONS[service.category]) {
      return SERVICE_ICONS[service.category];
    }
    // Default icon if category doesn't match
    return <BusinessIcon />;
  };

  const renderServiceForm = () => {
    const isEdit = !!editingService;
    const currentData = isEdit ? editingService : formData;

    return (
      <Fade in={isFormOpen}>
        <Paper elevation={3} className="service-form-container">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{isEdit ? "Edit Service" : "Add New Service"}</Typography>
            <IconButton onClick={closeForm}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <form onSubmit={isEdit ? handleUpdateService : handleSubmit} className="service-form">
            <TextField
              fullWidth
              label="Service Title"
              name="title"
              value={currentData.title || ""}
              onChange={(e) => {
                isEdit
                  ? setEditingService((prev) => ({ ...prev, title: e.target.value }))
                  : handleInputChange(e);
              }}
              required
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={currentData.category || ""}
              onChange={(e) => {
                isEdit
                  ? setEditingService((prev) => ({ ...prev, category: e.target.value }))
                  : handleInputChange(e);
              }}
              margin="normal"
              variant="outlined"
              placeholder="e.g. Tax Planning, Auditing, Compliance"
            />
            
            <TextField
              fullWidth
              label="Price Range"
              name="price_range"
              value={currentData.price_range || ""}
              onChange={(e) => {
                isEdit
                  ? setEditingService((prev) => ({ ...prev, price_range: e.target.value }))
                  : handleInputChange(e);
              }}
              margin="normal"
              variant="outlined"
              placeholder="e.g. ₹5,000 - ₹25,000"
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={currentData.description || ""}
              onChange={(e) => {
                isEdit
                  ? setEditingService((prev) => ({ ...prev, description: e.target.value }))
                  : handleInputChange(e);
              }}
              required
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Key Highlights (comma separated)"
              name="highlights"
              value={currentData.highlights || ""}
              onChange={(e) => {
                isEdit
                  ? setEditingService((prev) => ({ ...prev, highlights: e.target.value }))
                  : handleInputChange(e);
              }}
              margin="normal"
              variant="outlined"
              placeholder="e.g. Expert analysis, Personalized service, Timely delivery"
            />
            
            <Box mt={2} mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Service Image
              </Typography>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  isEdit
                    ? setEditingService((prev) => ({ ...prev, image: e.target.files[0] }))
                    : handleImageChange(e);
                }}
                className="file-input"
              />
              {isEdit && currentData.image && (
                <Typography variant="caption" color="textSecondary">
                  Current image will be kept if no new image is selected
                </Typography>
              )}
            </Box>
            
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                onClick={closeForm}
                className="form-button cancel"
                style={{ marginRight: '10px' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="form-button submit"
              >
                {isEdit ? "Update Service" : "Add Service"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Fade>
    );
  };

  const renderServiceDetail = () => {
    if (!selectedService) return null;
    
    const highlightsList = selectedService.highlights 
      ? selectedService.highlights.split(',').map(h => h.trim()).filter(h => h)
      : [];

    return (
      <Dialog 
        open={isModalOpen} 
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        scroll="paper"
        className="service-detail-dialog"
      >
        <DialogTitle className="service-detail-title">
          <Box display="flex" alignItems="center">
            <span className="service-icon">{getIconForService(selectedService)}</span>
            <Typography variant="h5" component="div">{selectedService?.title}</Typography>
          </Box>
          {selectedService.category && (
            <Chip 
              label={selectedService.category} 
              color="primary" 
              size="small"
              className="category-chip"
            />
          )}
        </DialogTitle>
        
        <DialogContent className="service-detail-content">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom className="section-title">
                About this Service
              </Typography>
              <Typography variant="body1" className="service-description" paragraph>
                {selectedService?.description}
              </Typography>
              
              {selectedService.price_range && (
                <Box mt={2}>
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
                    Service Highlights
                  </Typography>
                  <ul className="highlights-list">
                    {highlightsList.map((highlight, index) => (
                      <li key={index} className="highlight-item">
                        <CheckCircleIcon fontSize="small" className="highlight-icon" />
                        <Typography variant="body1">{highlight}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              {selectedService?.image && (
                <Box className="service-detail-image-container">
                  <img
                    src={
                      selectedService.image.startsWith("http")
                        ? selectedService.image
                        : `http://127.0.0.1:8000${selectedService.image}`
                    }
                    alt={selectedService.title}
                    className="service-detail-image"
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          
          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom className="contact-info">
              For more information about this service, please contact our office or request a consultation.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions className="service-detail-actions">
          <Button 
            onClick={handleCloseModal} 
            color="primary" 
            variant="contained"
            className="close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="services-page">
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
            {getUniqueCategories().map((category) => (
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

        {isAuthenticated && (
          <Box className="admin-controls" mb={4}>
            {!isFormOpen ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setIsFormOpen(true)}
                className="add-service-button"
              >
                Add New Service
              </Button>
            ) : (
              renderServiceForm()
            )}
          </Box>
        )}

        {error && (
          <Alert severity="error" className="error-alert" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box textAlign="center" py={5}>
            <Loader />
          </Box>
        ) : (
          <Grid container spacing={3} className="services-grid">
            {filterServicesByCategory().length > 0 ? (
              filterServicesByCategory().map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Grow in={true} timeout={300 * (index % 3 + 1)}>
                    <Card className="service-card" elevation={3}>
                      <Box className="service-card-header">
                        <span className="service-icon">{getIconForService(service)}</span>
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
                          image={
                            service.image.startsWith("http")
                              ? service.image
                              : `http://127.0.0.1:8000${service.image}`
                          }
                          title={service.title}
                          className="service-card-media"
                        />
                      )}
                      
                      <CardContent className="service-card-content">
                        <Typography variant="h6" className="service-card-title">
                          {service.title}
                        </Typography>
                        
                        <Typography variant="body2" className="service-card-description">
                          {service.description.length > 120
                            ? `${service.description.substring(0, 120)}...`
                            : service.description}
                        </Typography>
                        
                        {service.price_range && (
                          <Typography variant="body2" className="service-card-price">
                            <AttachMoneyIcon fontSize="small" /> {service.price_range}
                          </Typography>
                        )}
                      </CardContent>
                      
                      <Box className="service-card-actions">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleLearnMoreClick(service)}
                          className="learn-more-button"
                          fullWidth
                        >
                          Learn More
                        </Button>
                        
                        {isAuthenticated && (
                          <Box className="admin-action-buttons">
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEditService(service)}
                                className="edit-button"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteService(service.id)}
                                className="delete-button"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}
                      </Box>
                    </Card>
                  </Grow>
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

        <Box my={6} className="cta-section">
          <Paper elevation={2} className="cta-paper">
            <Typography variant="h5" gutterBottom className="cta-title">
              Need a customized solution?
            </Typography>
            <Typography variant="body1" paragraph className="cta-text">
              We offer tailored services designed specifically for your business requirements.
              Contact us today to discuss how we can help your business thrive.
            </Typography>
            <Button variant="contained" color="primary" className="cta-button">
              Request Consultation
            </Button>
          </Paper>
        </Box>
      </Container>

      {renderServiceDetail()}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Services;