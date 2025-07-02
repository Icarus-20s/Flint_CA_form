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
import "./AccessNotices.css";
import { useAuth } from "../../Context/AuthContextProvider.jsx";


const AccessNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

    

    useEffect(() => {
        setLoading(true);
        api.get("notices/")
            .then((response) => {
                setNotices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching notices:", error);
                setError("Failed to load notices. Please try again later.");
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
    const fetchNotice = async (endpoint, setter, resourceKey) => {
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

    const handleNoticeSubmit = async (formData) => {
        try {
        const res = await api.post("/notices/create/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
            
            fetchNotice("/notices/", setNotices, "notices");
        } catch (error) {
            console.error('Error adding notices:', error);
            throw error;
        } finally{
            setIsNoticeModalOpen(false);
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

  if (notices.length === 0) {
    return (
      <Typography className="notices-empty">
        No notices available at this time.
      </Typography>
    );
  }

const AddNoticeModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
           title: '',
           description: '',
           date: '',
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
           submitData.append('date', formData.date);
           if (formData.pdf) {
               submitData.append('pdf', formData.pdf);
           }
   
           try {
               await onSubmit(submitData);
               setFormData({
                   title: '',
                   description: '',
                   date: '',
                   pdf: null
               });
               onClose();
           } catch (error) {
               console.error('Error submitting notice:', error);
           } finally {
               setIsSubmitting(false);
           }
       };
   
       if (!isOpen) return null;
   
       return (
           <div className="modal-overlay" onClick={onClose}>
               <div className="modal-content" onClick={e => e.stopPropagation()}>
                   <div className="modal-header">
                       <h2>Add New Notice</h2>
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
                               placeholder="Enter notice title"
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
                               placeholder="Enter notice description"
                           />
                       </div>
   
                       <div className="form-group">
                           <label htmlFor="date">Date *</label>
                           <input
                               type="date"
                               id="date"
                               name="date"
                               value={formData.date}
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
                           <button type="submit" disabled={isSubmitting} className="notice-add-button-primary">
                               {isSubmitting ? 'Adding...' : 'Add Notice'}
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
                        className="notice-add-button-primary"
                        onClick={() => setIsNoticeModalOpen(true)}
                        aria-label="Add new notice"
                        type="button"
                    >
                        <Plus size={16} />
                        Add Notice
                    </button>
                )}
            </Typography>
    <Paper className="notices-container" elevation={0}>
      <List className="notices-list">
        {notices.map((notice, index) => (
          <React.Fragment key={notice.id}>
            <ListItem className="notice-item">
              {/* <ListItemIcon className="notice-icon-wrapper">
                <DescriptionIcon className="notice-icon" />
              </ListItemIcon> */}
              
              <ListItemText
                className="notice-content"
                primary={
                  <Typography className="notice-title">
                    {notice.title}
                  </Typography>
                }
                secondary={
                  <Box className="notice-secondary">
                    <Typography className="notice-description">
                      {notice.description}
                    </Typography>
                    
                    <Box className="notice-meta">
                      <Box className="notice-date">
                        <CalendarTodayIcon className="notice-date-icon" />
                        <Typography className="notice-date-text">
                          {formatDate(notice.date)}
                        </Typography>
                      </Box>
                      
                    </Box>
                  </Box>
                }
              />
              
              <Box className="notice-actions">
                <Tooltip title="View Document">
                  <IconButton
                    href={notice.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notice-action-btn notice-action-btn--view"
                    size="small"
                  >
                    <VisibilityIcon className="notice-action-icon" />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Download Document">
                  <IconButton
                    href={notice.pdf}
                    download
                    className="notice-action-btn notice-action-btn--download"
                    size="small"
                  >
                    <GetAppIcon className="notice-action-icon" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
            
            {index < notices.length - 1 && (
              <Divider className="notice-divider" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
    <AddNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onSubmit={handleNoticeSubmit}
    />
    </Box>
  );
};

export default AccessNotices;