import React, { useEffect, useState } from "react";
import {
    Typography,
    Chip,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Tooltip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Paper
} from "@mui/material";
import {
    FileText,
    ExternalLink,
    HelpCircle,
    Bell,
    Newspaper,
    Loader,
    AlertCircle,
    Plus,
    X,
    Upload,
    Link2,
    Calendar,
} from "lucide-react";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import api from "../../Api/api.jsx";
import "./AccessResources.css";
import { useAuth } from "../../Context/AuthContextProvider.jsx";


const AccessResources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

    

    useEffect(() => {
        setLoading(true);
        api.get("resources/")
            .then((response) => {
                setResources(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching resources:", error);
                setError("Failed to load resources. Please try again later.");
                setLoading(false);
            });
    }, []);
  const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        });
    };
    const fetchResource = async (endpoint, setter, resourceKey) => {
        try {
            setLoading(true);

            const response = await api.get(endpoint);
            setter(response.data);

        } catch (err) {
            console.error(`Error fetching ${resourceKey}:`, err);
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };

    const handleResourceSubmit = async (formData) => {
        try {
        const res = await api.post("/resources/create/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
            
            fetchResource("/resources/", setResources, "resources");
        } catch (error) {
            console.error('Error adding resources:', error);
            throw error;
        } finally{
            setIsResourceModalOpen(false);
        }

    };
    
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </Box>
        );
    }

  if (resources.length === 0) {
    return (
      <Typography className="resources-empty">
        No resources available at this time.
      </Typography>
    );
  }

const AddResourceModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        pdf: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            pdf: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('category', formData.category);
        if (formData.pdf) {
            submitData.append('pdf', formData.pdf);
        }

        try {
            await onSubmit(submitData);
            setFormData({
                title: '',
                description: '',
                category: '',
                pdf: null
            });
            onClose();
        } catch (error) {
            console.error('Error submitting resource:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Resource</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter resource title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            placeholder="Enter resource description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pdf">PDF Document</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="pdf"
                                name="pdf"
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="file-input"
                            />
                            <div className="file-input-display">
                                <Upload size={20} />
                                <span>
                                    {formData.pdf ? formData.pdf.name : 'Choose PDF file'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="resource-add-button-primary">
                            {isSubmitting ? 'Adding...' : 'Add Resource'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
     <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: "#046B0D", // --text-primary from your CSS
                    borderBottom: "2px solid #06D001", // --primary-color from your CSS
                    pb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DescriptionIcon sx={{ 
                        mr: 1, 
                        verticalAlign: "middle",
                        color: "#06D001" // --primary-color to match the border
                    }} />
                    Official Notices
                </Box>
                {isAuthenticated && (
                    <button
                        className="resource-add-button-primary"
                        onClick={() => setIsResourceModalOpen(true)}
                        aria-label="Add new notice"
                        type="button"
                    >
                        <Plus size={16} />
                        Add Resource
                    </button>
                )}
            </Typography>
    <Paper className="resources-container" elevation={0}>
      <List className="resources-list">
        {resources.map((resource, index) => (
          <React.Fragment key={resource.id}>
            <ListItem className="resource-item">
              {/* <ListItemIcon className="resource-icon-wrapper">
                <DescriptionIcon className="resource-icon" />
              </ListItemIcon> */}
              
              <ListItemText
                className="resource-content"
                primary={
                  <Typography className="resource-title">
                    {resource.title}
                  </Typography>
                }
                secondary={
                  <Box className="resource-secondary">
                    <Typography className="resource-description">
                      {resource.description}
                    </Typography>
                    
                    <Box className="resource-meta">
                      <Box className="resource-date">
                        <CalendarTodayIcon className="resource-date-icon" />
                        <Typography className="resource-date-text">
                          {formatDate(resource.created_at)}
                        </Typography>
                      </Box>
                      
                      <Box className="resource-category">
                        <LocalOfferIcon className="resource-category-icon" />
                        <Chip
                          label={resource.category}
                          className="resource-chip"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>
                }
              />
              
              <Box className="resource-actions">
                <Tooltip title="View Document">
                  <IconButton
                    href={resource.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-action-btn resource-action-btn--view"
                    size="small"
                  >
                    <VisibilityIcon className="resource-action-icon" />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Download Document">
                  <IconButton
                    href={resource.pdf}
                    download
                    className="resource-action-btn resource-action-btn--download"
                    size="small"
                  >
                    <GetAppIcon className="resource-action-icon" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
            
            {index < resources.length - 1 && (
              <Divider className="resource-divider" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
    <AddResourceModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        onSubmit={handleResourceSubmit}
    />
    </Box>
  );
};

export default AccessResources;