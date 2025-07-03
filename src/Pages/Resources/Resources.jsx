import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

import {
    FileText,
    ExternalLink,
    HelpCircle,
    Newspaper,
    Loader,
    AlertCircle,
    Plus,
    X,
    Upload,
    ArrowRight,
} from "lucide-react";
import api from "../../Api/api";
import "./Resources.css";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import { useAuth } from "../../Context/AuthContextProvider.jsx";

const ResourceCard = ({ item, variant }) => {
    switch (variant) {
        case "notification":
            return (
                <div className="notification-card">
                    {/* Date */}
                    {item.date && (
                        <span className="card-date">{item.date}</span>
                    )}

                    {/* Title + Description */}
                    <div className="card-anchor">
                        <h3 className="card-title">{item.title}</h3>
                       <p className="card-summary">
                            {item.description?.slice(0, 180)}{item.description?.length > 180 && '...'}
                        </p>


                        {/* PDF Link */}
                        {item.pdf && (
                            <a
                                href={item.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="notice-pdf-link"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    marginTop: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    color: "#27667B",
                                }}
                            >
                                <FileText size={16} />
                                View PDF
                            </a>
                        )}

                        {/* Optional Tag */}
                        {item.tag && (
                            <span
                                className={`card-badge ${item.tagType || ""}`}
                                style={{ marginTop: "8px" }}
                            >
                                {item.tag}
                            </span>
                        )}
                    </div>
                </div>
            );

        case "external":
            return (
                <div className="external-card">
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-anchor"
                    >
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-summary">{item.description}</p>
                        <div className="link-icon">
                            <ExternalLink size={16} />
                        </div>
                    </a>
                </div>
            );

        case "resource":
            return (
                <div className="resource-card resource-list">
                    <div className="card-anchor">
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-summary">
                            {item.description?.slice(0, 180)}{item.description?.length > 180 && '...'}
                        </p>
                        {item.category && (
                            <span className="resource-category">{item.category}</span>
                        )}
                        {item.pdf && (
                            <a
                                href={item.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="notice-pdf-link"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    marginTop: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    color: "#27667B",
                                }}
                            >
                                <FileText size={16} />
                                View PDF
                            </a>
                        )}
                    </div>
                </div>
            );

        default:
            return null;
    }
};

// FAQ component
const FaqAccordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-accordion">
            <button
                className={`accordion-header ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h3>{question}</h3>
                <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
            </button>
            <div className={`accordion-content ${isOpen ? "expanded" : ""}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

// Error state component for individual sections
const SectionErrorState = ({ sectionName, onRetry }) => (
    <div className="section-error">
        <AlertCircle size={24} />
        <p>Unable to load {sectionName}. Please try again.</p>
        <button className="retry-button" onClick={onRetry}>
            Retry
        </button>
    </div>
);

// Loading state for individual sections
const SectionLoadingState = () => (
    <div className="section-loading">
        <Loader size={24} className="spinner" />
        <p>Loading content...</p>
    </div>
);

// Add Notice Modal Component
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
                        <button type="submit" disabled={isSubmitting} className="btn-submit">
                            {isSubmitting ? 'Adding...' : 'Add Notice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AddFaqModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({ question: "", answer: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New FAQ</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="question">Question *</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              required
              placeholder="Enter the question"
            />
          </div>

          <div className="form-group">
            <label htmlFor="answer">Answer *</label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Enter the answer"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting ? "Adding..." : "Add FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Link Modal Component
const AddLinkModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
            setFormData({
                title: '',
                description: '',
                url: '',
            });
            onClose();
        } catch (error) {
            console.error('Error submitting link:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Link</h2>
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
                            placeholder="Enter link title"
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
                            rows={3}
                            placeholder="Enter link description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">URL *</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            required
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="btn-submit">
                            {isSubmitting ? 'Adding...' : 'Add Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Add Resource Modal Component
const AddResourceModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        pdf: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            pdf: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('description', formData.description);
            payload.append('category', formData.category);
            if (formData.pdf) payload.append('pdf', formData.pdf);

            await onSubmit(payload);

            setFormData({
                title: '',
                description: '',
                category: '',
                pdf: null,
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
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                            rows={3}
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
                            placeholder="Enter resource category"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pdf">PDF Document *</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="pdf"
                                name="pdf"
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="file-input"
                                required
                            />
                            <div className="file-input-display">
                                <Upload size={20} />
                                <span>{formData.pdf ? formData.pdf.name : 'Choose a PDF file'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="btn-submit">
                            {isSubmitting ? 'Adding...' : 'Add Resource'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// Section Header Component
const SectionHeader = ({ icon: Icon, title, onAdd, addLabel, showAddButton, to }) => {
  const navigate = useNavigate();

  return (
    <div className="resource-section-header">
      <div
        className="section-title"
        onClick={() => navigate(`/${to}`)}
        style={{ cursor: "pointer" }}
      >
        <Icon size={24} />
        <h2>{title}</h2>
      </div>

      {showAddButton && (
        <button className="btn-add-resource" onClick={onAdd} type="button">
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
};

// View All Link Component
const ViewAllLink = ({ to, children, count }) => (
    <div className="view-all-container">
        <NavLink to={to} className="view-all-link">
            <span>{children}</span>
            <ArrowRight size={16} />
        </NavLink>
        {count > 0 && (
            <span className="item-count">+{count} more</span>
        )}
    </div>
);

// Main component
const CAProfessionalResources = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [newsletterStatus, setNewsletterStatus] = useState("");
    const [emailInput, setEmailInput] = useState("");
    
    // Modal states
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

    // State for API data
    const [notices, setNotices] = useState([]);
    const [links, setLinks] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [resources, setResources] = useState([]);

    // Loading states for individual sections
    const [loadingStates, setLoadingStates] = useState({
        resources: true,
        notices: true,
        links: true,
        faqs: true,
    });

    // Error states for individual sections
    const [errorStates, setErrorStates] = useState({
        resources: false,
        notices: false,
        links: false,
        faqs: false,
    });

    // Fetch individual resource type
    const fetchResource = async (endpoint, setter, resourceKey) => {
        try {
            setLoadingStates((prev) => ({ ...prev, [resourceKey]: true }));
            setErrorStates((prev) => ({ ...prev, [resourceKey]: false }));

            const response = await api.get(endpoint);
            setter(response.data);

            setLoadingStates((prev) => ({ ...prev, [resourceKey]: false }));
        } catch (err) {
            console.error(`Error fetching ${resourceKey}:`, err);
            setErrorStates((prev) => ({ ...prev, [resourceKey]: true }));
            setLoadingStates((prev) => ({ ...prev, [resourceKey]: false }));
        }
    };

    // Fetch data from API
    useEffect(() => {
        fetchResource("/notices/", setNotices, "notices");
        fetchResource("/resources/", setResources, "resources");
        fetchResource("/links/", setLinks, "links");
        fetchResource("/faqs/", setFaqs, "faqs");
    }, []);

    // Retry function for individual sections
    const retrySection = (resourceKey) => {
        switch (resourceKey) {
            case "notices":
                fetchResource("/notices/", setNotices, "notices");
                break;
            case "resources":
                fetchResource("/resources/", setResources, "resources");
                break;
            case "links":
                fetchResource("/links/", setLinks, "links");
                break;
            case "faqs":
                fetchResource("/faqs/", setFaqs, "faqs");
                break;
        }
    };

    const handleResourceSubmit = async (formData) => {
        try {
            const response = await api.post("/resources/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            fetchResource("/resources/", setResources, "resources");

            return response.data;
        } catch (error) {
            console.error("Error adding resource:", error);
            throw error;
        }
    };

    // Handle notice submission
    const handleNoticeSubmit = async (formData) => {
        try {
            const response = await api.post("/notices/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            fetchResource("/notices/", setNotices, "notices");
            
            return response.data;
        } catch (error) {
            console.error('Error adding notice:', error);
            throw error;
        }
    };

    // Handle link submission
    const handleLinkSubmit = async (formData) => {
        try {
            const response = await api.post("/links/create/", formData);
            
            fetchResource("/links/", setLinks, "links");
            
            return response.data;
        } catch (error) {
            console.error('Error adding link:', error);
            throw error;
        }
    };

    // Handle FAQ submission
    const handleFaqSubmit = async (formData) => {
        try {
            const response = await api.post("/faqs/create/", formData);

            fetchResource("/faqs/", setFaqs, "faqs");

            return response.data;
        } catch (error) {
            console.error("Error adding FAQ:", error);
            throw error;
        }
    };

    // Handle newsletter subscription
    const handleEmailSubscription = async (e) => {
        e.preventDefault();

        if (!emailInput.trim()) {
            setNewsletterStatus("Please enter a valid email address");
            return;
        }

        try {
            const response = await api.post(`emailstorage/`, {
                email: emailInput,
            });
            setNewsletterStatus("Thank you for subscribing to our newsletter!");
            setEmailInput("");
        } catch (error) {
            console.error("Subscription error:", error);
            setNewsletterStatus("Subscription failed. Please try again.");
        }

        setTimeout(() => setNewsletterStatus(""), 3000);
    };

    return (
        <div className="ca-resources-wrapper">
            <header className="page-header">
                <h1 className="page-title">CA Professionals Resources</h1>
                <p className="page-subtitle">
                    Access the latest updates, professional tools, and useful links for Chartered Accountants
                </p>
            </header>

            {/* Professional Resources Section */}
            <section className="content-section">
                <SectionHeader 
                    icon={BookOpen}
                    title="Professional Resources"
                    onAdd={() => setIsResourceModalOpen(true)}
                    addLabel="Add Resource"
                    showAddButton={isAuthenticated}
                    to="access-resources"
                />

                {loadingStates.resources ? (
                    <SectionLoadingState />
                ) : errorStates.resources ? (
                    <SectionErrorState
                        sectionName="Professional Resources"
                        onRetry={() => retrySection("resources")}
                    />
                ) : resources.length > 0 ? (
                    <>
                        <div className="resource-preview-grid">
                            {resources.slice(0, 4).map((item, index) => (
                                <ResourceCard key={index} item={item} variant="resource" />
                            ))}
                        </div>
                        {resources.length > 4 && (
                            <ViewAllLink 
                                to="/access-resources" 
                                count={resources.length - 4}
                            >
                                View All Resources
                            </ViewAllLink>
                        )}
                    </>
                ) : (
                    <p className="no-content">No resources available at the moment.</p>
                )}
            </section>

            {/* Notices Section */}
            <section className="content-section">
                <SectionHeader 
                    icon={Newspaper}
                    title="Latest Notices & Updates"
                    onAdd={() => setIsNoticeModalOpen(true)}
                    addLabel="Add Notice"
                    showAddButton={isAuthenticated}
                    to="access-notices"
                />

                {loadingStates.notices ? (
                    <SectionLoadingState />
                ) : errorStates.notices ? (
                    <SectionErrorState
                        sectionName="Notices and Updates"
                        onRetry={() => retrySection("notices")}
                    />
                ) : notices.length > 0 ? (
                    <>
                        <div className="notice-preview-grid">
                            {notices.slice(0, 3).map((item, index) => (
                                <ResourceCard key={index} item={item} variant="notification" />
                            ))}
                        </div>
                        {notices.length > 3 && (
                            <ViewAllLink 
                                to="/access-notices" 
                                count={notices.length - 3}
                            >
                                View All Notices
                            </ViewAllLink>
                        )}
                    </>
                ) : (
                    <p className="no-content">No notices available at the moment.</p>
                )}
            </section>

            {/* Links Section */}
            <section className="content-section">
                <SectionHeader 
                    icon={ExternalLink}
                    title="Useful Links"
                    onAdd={() => setIsLinkModalOpen(true)}
                    addLabel="Add Link"
                    showAddButton={isAuthenticated}
                    to="resources"
                />

                {loadingStates.links ? (
                    <SectionLoadingState />
                ) : errorStates.links ? (
                    <SectionErrorState
                        sectionName="professional links"
                        onRetry={() => retrySection("links")}
                    />
                ) : links.length > 0 ? (
                    <div className="link-grid">
                        {links.map((item, index) => (
                            <ResourceCard
                                key={index}
                                item={item}
                                variant="external"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-content">
                        No links available at the moment.
                    </p>
                )}
            </section>

            {/* FAQs Section */}
            <section className="content-section">
                <SectionHeader 
                    icon={HelpCircle}
                    title="Frequently Asked Questions"
                    onAdd={() => setIsFaqModalOpen(true)}
                    addLabel="Add FAQ"
                    showAddButton={isAuthenticated}
                    to="resources"
                />

                {loadingStates.faqs ? (
                    <SectionLoadingState />
                ) : errorStates.faqs ? (
                    <SectionErrorState sectionName="FAQs" onRetry={() => retrySection("faqs")} />
                ) : faqs.length > 0 ? (
                    <>
                        <div className="faq-container">
                            {faqs.slice(0, 3).map((faq, index) => (
                                <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>

                        {faqs.length > 3 && (
                            <ViewAllLink 
                                to="/faqs" 
                                count={faqs.length - 3}
                            >
                                View All FAQs
                            </ViewAllLink>
                        )}
                    </>
                ) : (
                    <p className="no-content">No FAQs available at the moment.</p>
                )}
            </section>

            {/* Newsletter
            <section className="newsletter-container">
                <div className="newsletter-wrapper">
                    <h2>Stay Informed</h2>
                    <p>
                        Subscribe to our newsletter for latest updates,
                        resources, and professional insights
                    </p>
                    <form
                        className="subscribe-form"
                        onSubmit={handleEmailSubscription}
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="email-input"
                        />
                        <button type="submit" className="subscribe-btn">
                            Subscribe
                        </button>
                    </form>
                    {newsletterStatus && (
                        <div
                            className={`newsletter-message ${
                                newsletterStatus.includes("Thank you")
                                    ? "success"
                                    : "error"
                            }`}
                        >
                            {newsletterStatus}
                        </div>
                    )}
                </div>
            </section> */}

            {/* Modals */}
            <AddNoticeModal
                isOpen={isNoticeModalOpen}
                onClose={() => setIsNoticeModalOpen(false)}
                onSubmit={handleNoticeSubmit}
            />

            <AddLinkModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                onSubmit={handleLinkSubmit}
            />

            <AddResourceModal
                isOpen={isResourceModalOpen}
                onClose={() => setIsResourceModalOpen(false)}
                onSubmit={handleResourceSubmit}
            />

            <AddFaqModal
                isOpen={isFaqModalOpen}
                onClose={() => setIsFaqModalOpen(false)}
                onSubmit={handleFaqSubmit}
            />
        </div>
    );
};

export default CAProfessionalResources;