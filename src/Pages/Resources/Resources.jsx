import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import api from "../../Api/api";
import "./Resources.css";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import { useAuth } from "../../Context/AuthContextProvider.jsx";

// Resource card component with different variations
const ResourceCard = ({ item, variant }) => {
    switch (variant) {
        case "notification":
            return (
                <div className="notification-card">
                    <span className="card-date">{item.date}</span>
                    <a href={item.url} className="card-anchor">
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-summary">{item.description}</p>
                        <span className={`card-badge ${item.tagType || ""}`}>
                            {item.tag}
                        </span>
                    </a>
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

// Main component
const CAProfessionalResources = () => {
    const { isAuthenticated } = useAuth();
    const [currentTab, setCurrentTab] = useState("all");
    const [newsletterStatus, setNewsletterStatus] = useState("");
    const [emailInput, setEmailInput] = useState("");
    
    // Modal states
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    // State for API data
    const [notices, setNotices] = useState([]);
    const [links, setLinks] = useState([]);
    const [faqs, setFaqs] = useState([]);

    // Loading states for individual sections
    const [loadingStates, setLoadingStates] = useState({
        notices: true,
        links: true,
        faqs: true,
    });

    // Error states for individual sections
    const [errorStates, setErrorStates] = useState({
        notices: false,
        links: false,
        faqs: false,
    });

    const [isContentVisible, setIsContentVisible] = useState(true);

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
        fetchResource("/links/", setLinks, "links");
        fetchResource("/faqs/", setFaqs, "faqs");
    }, []);

    // Handle tab transitions
    const switchTab = (tabId) => {
        setIsContentVisible(false);
        setTimeout(() => {
            setCurrentTab(tabId);
            setTimeout(() => {
                setIsContentVisible(true);
            }, 50);
        }, 200);
    };

    // Retry function for individual sections
    const retrySection = (resourceKey) => {
        switch (resourceKey) {
            case "notices":
                fetchResource("/notices/", setNotices, "notices");
                break;
            case "links":
                fetchResource("/links/", setLinks, "links");
                break;
            case "faqs":
                fetchResource("/faqs/", setFaqs, "faqs");
                break;
        }
    };

    // Handle notice submission
    const handleNoticeSubmit = async (formData) => {
        try {
        const res = await api.post("/notices/create/", formData, {
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
            
            // Refresh links after successful submission
            fetchResource("/links/", setLinks, "links");
            
            return response.data;
        } catch (error) {
            console.error('Error adding link:', error);
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

    // Navigation tabs
    const tabOptions = [
        { id: "all", label: "All Resources" },
        { id: "notices", label: "Notices" },
        { id: "links", label: "Useful Links" },
    ];

    const contentClassNames = isContentVisible ? "content-visible" : "";

    return (
        <div className={`ca-resources-wrapper ${contentClassNames}`}>
            <header className="page-header">
                <h1 className="page-title">CA Professionals Resources</h1>
                <p className="page-subtitle">
                    Access the latest updates, professional tools, and useful links for Chartered Accountants
                </p>
            </header>

            {/* Tab Navigation */}
            <nav className="tab-navigation" role="tablist">
                {tabOptions.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${
                            currentTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => switchTab(tab.id)}
                        role="tab"
                        aria-selected={currentTab === tab.id}
                        aria-controls={`${tab.id}-panel`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Spotlight Feature */}
            <div className={`spotlight-feature ${contentClassNames}`}>
                <div className="spotlight-content">
                    <span className="spotlight-tag">Spotlight Resource</span>
                    <h2>Updated GST Compliance Framework 2025</h2>
                    <p>
                        New GST compliance framework effective April 1, 2025.
                        Access comprehensive guide, compliance checklists, and
                        implementation strategies for seamless transition.
                    </p>
                    <NavLink
                        to="/access-resources"
                        className="spotlight-button"
                    >
                        Access Resource
                    </NavLink>
                </div>
            </div>

            {/* Notices Section */}
            {(currentTab === "all" || currentTab === "notices") && (
                <section
                    className={`content-section animate-in ${contentClassNames}`}
                    role="tabpanel"
                    id="notice-panel"
                    aria-labelledby="notices-tab"
                >
                    <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Newspaper size={22} aria-hidden="true" />
                            <h2>Notices and Updates</h2>
                        </div>
                        
                        {isAuthenticated && (
                            <button
                                className="btn-add-resource"
                                onClick={() => setIsNoticeModalOpen(true)}
                                aria-label="Add new notice"
                                type="button"
                            >
                                <Plus size={16} />
                                Add Notice
                            </button>
                        )}
                    </div>

                    {loadingStates.notices ? (
                        <SectionLoadingState />
                    ) : errorStates.notices ? (
                        <SectionErrorState
                            sectionName="Notices and Updates"
                            onRetry={() => retrySection("notices")}
                        />
                    ) : notices.length > 0 ? (
                        <>
                            <div className="card-grid">
                                {notices.slice(0, 6).map((item, index) => (
                                    <ResourceCard key={index} item={item} variant="notification" />
                                ))}
                            </div>
                            {notices.length > 6 && (
                                <NavLink to="/all-notices" className="view-all-link">
                                    View all notices <ExternalLink size={16} aria-hidden="true" />
                                </NavLink>
                            )}
                        </>
                    ) : (
                        <p className="no-content">No notices available at the moment.</p>
                    )}
                </section>
            )}

            {/* Links Section */}
            {(currentTab === "all" || currentTab === "links") && (
                <section
                    className={`content-section animate-in ${contentClassNames}`}
                    role="tabpanel"
                    id="links-panel"
                    aria-labelledby="links-tab"
                >
                    <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <ExternalLink size={22} aria-hidden="true" />
                            <h2>Useful Links</h2>
                        </div>
                        
                        {isAuthenticated && (
                            <button
                                className="btn-add-resource"
                                onClick={() => setIsLinkModalOpen(true)}
                                aria-label="Add new link"
                                type="button"
                            >
                                <Plus size={16} />
                                Add Link
                            </button>
                        )}
                    </div>

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
                            No professional links available at the moment.
                        </p>
                    )}
                </section>
            )}

            {/* FAQs Section */}
            {currentTab === "all" && (
                <section
                    className={`content-section animate-in ${contentClassNames}`}
                >
                    <div className="section-heading">
                        <HelpCircle size={22} aria-hidden="true" />
                        <h2>Frequently Asked Questions</h2>
                    </div>

                    {loadingStates.faqs ? (
                        <SectionLoadingState />
                    ) : errorStates.faqs ? (
                        <SectionErrorState
                            sectionName="FAQs"
                            onRetry={() => retrySection("faqs")}
                        />
                    ) : faqs.length > 0 ? (
                        <>
                            <div className="faq-container">
                                {faqs.slice(0, 3).map((faq, index) => (
                                    <FaqAccordion
                                        key={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                ))}
                            </div>
                            {faqs.length > 3 && (
                                <NavLink to="/faqs" className="view-all-link">
                                    View all FAQs{" "}
                                    <ExternalLink
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </NavLink>
                            )}
                        </>
                    ) : (
                        <p className="no-content">
                            No FAQs available at the moment.
                        </p>
                    )}
                </section>
            )}

            {/* Newsletter */}
            <section className={`newsletter-container ${contentClassNames}`}>
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
                            aria-label="Email address"
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    {newsletterStatus && (
                        <p className="subscription-message">
                            {newsletterStatus}
                        </p>
                    )}
                    <p className="privacy-note">
                        We respect your privacy. Unsubscribe anytime.
                    </p>
                </div>
            </section>

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
        </div>
    );
};

export default CAProfessionalResources;