import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import WhyJoinUs from "./WhyJoinUs/WhyJoinUs";
import ExperienceBenefits from "./ExperienceBenefits/ExperienceBenefits";
import EmployeeReviews from "./EmployeeReview/EmployeeReview";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import "./Career.css";

const Career = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [careers, setCareers] = useState([]);
    const [newCareer, setNewCareer] = useState({
        title: "",
        description: "",
        location: "",
        employment_type: "Full-Time",
        deadline: "",
    });
    const [editingCareer, setEditingCareer] = useState(null);
    const [applicantDetails, setApplicantDetails] = useState({
        full_name: "",
        email: "",
        resumes: null,
        cover_letter: null,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [applyingForCareerId, setApplyingForCareerId] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCardId, setExpandedCardId] = useState(null);
    
    // Animation states
    const [isLoading, setIsLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // Improved animation sequence
    useEffect(() => {
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
            
            const visibilityTimer = setTimeout(() => {
                setIsContentVisible(true);
                
                const completeTimer = setTimeout(() => {
                    setAnimationComplete(true);
                }, 600);
                
                return () => clearTimeout(completeTimer);
            }, 100);
            
            return () => clearTimeout(visibilityTimer);
        }, 800);
        
        return () => clearTimeout(loadTimer);
    }, []);

    // Fetch careers on component mount
    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/career/");
                if (response.status !== 200) {
        throw new Error('Failed to fetch services');  
      }
            setCareers(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrorMessage("Error fetching career opportunities. Please try again later.");
            console.error("Error fetching careers:", err);
        }
    };

    // Clear messages after 5 seconds
    useEffect(() => {
        if (errorMessage || successMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, successMessage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCareer((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplicantChange = (e) => {
        const { name, value } = e.target;
        setApplicantDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setApplicantDetails((prev) => ({
            ...prev,
            [e.target.name]: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setErrorMessage("You must be logged in to add a career opportunity.");
            return;
        }

        try {
            const response = await api.post("/career/create/", newCareer);
            setCareers((prev) => [...prev, response.data]);
            setNewCareer({
                title: "",
                description: "",
                location: "",
                employment_type: "Full-Time",
                deadline: "",
            });
            setSuccessMessage("Career opportunity added successfully!");
        } catch (err) {
            setErrorMessage("Error adding career opportunity. Please try again later.");
            console.error("Error adding career:", err);
        }
    };

    const handleEditCareer = (career) => {
        setEditingCareer({ ...career });
    };

    const handleUpdateCareer = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setErrorMessage("You must be logged in to update a career opportunity.");
            return;
        }

        try {
            const response = await api.put(
                `/career/${editingCareer.id}/update/`,
                editingCareer
            );
            setCareers((prev) =>
                prev.map((career) =>
                    career.id === editingCareer.id ? response.data : career
                )
            );
            setEditingCareer(null);
            setSuccessMessage("Career opportunity updated successfully!");
        } catch (err) {
            setErrorMessage("Error updating career opportunity. Please try again later.");
            console.error("Error updating career:", err);
        }
    };

    const handleDeleteCareer = async (id) => {
        if (!isAuthenticated) {
            setErrorMessage("You must be logged in to delete a career opportunity.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this career opportunity?")) {
            try {
                await api.delete(`/career/${id}/delete/`);
                setCareers((prev) => prev.filter((career) => career.id !== id));
                setSuccessMessage("Career opportunity deleted successfully!");
            } catch (err) {
                setErrorMessage("Error deleting career opportunity. Please try again later.");
                console.error("Error deleting career:", err);
            }
        }
    };

    const handleApplyNow = (careerId) => {
        setApplyingForCareerId(careerId);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (
            !applicantDetails.full_name ||
            !applicantDetails.email ||
            !applicantDetails.resumes
        ) {
            setErrorMessage("Please fill in all required fields and upload a resume.");
            return;
        }

        const formData = new FormData();
        formData.append("job", applyingForCareerId);
        formData.append("full_name", applicantDetails.full_name);
        formData.append("email", applicantDetails.email);
        formData.append("resumes", applicantDetails.resumes);
        if (applicantDetails.cover_letter) {
            formData.append("cover_letter", applicantDetails.cover_letter);
        }

        try {
            await api.post(
                "/jobapplication/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setSuccessMessage("Application submitted successfully! We'll be in touch soon.");
            setApplicantDetails({
                full_name: "",
                email: "",
                resumes: null,
                cover_letter: null,
            });
            setApplyingForCareerId(null);
        } catch (error) {
            console.error("Error applying for career:", error);
            setErrorMessage(
                "Error submitting your application. Please try again later."
            );
        }
    };

    // Toggle expanded card
    const toggleExpandCard = (id) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    // Filter careers by employment type
    const filteredCareers = careers.filter(career => {
        const matchesFilter = activeFilter === "All" || career.employment_type === activeFilter;
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             career.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Apply animation classes based on state
    const contentClasses = `careers-container ${isLoading ? 'loading' : ''} ${isContentVisible ? 'visible' : ''} ${animationComplete ? 'animation-complete' : ''}`;

    return (
        <div className={contentClasses}>
            {isLoading ? (
                <div className="page-loader">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <section className="careers-hero" style={{ backgroundImage: `url('images/careers/hero-bg.jpg')` }}>
                        <div className="careers-hero-content">
                            <h1>Shape the Future With Us</h1>
                            <p>Join our innovative team and build your career in a collaborative, growth-oriented environment</p>
                            <a href="#current-opportunities" className="explore-btn">Explore Opportunities</a>
                        </div>
                    </section>

                    <WhyJoinUs />
                    <ExperienceBenefits />

                    <section id="current-opportunities" className="careers-opportunities">
                        <div className="section-header">
                            <h2>Current Opportunities</h2>
                            <p>Find your perfect role and take the next step in your career journey</p>
                        </div>
                        
                        {/* Notification Banner */}
                        {(errorMessage || successMessage) && (
                            <div className={`notification-banner ${errorMessage ? 'error' : 'success'}`}>
                                <p>{errorMessage || successMessage}</p>
                            </div>
                        )}

                        {/* Admin View Applications Button */}
                        {isAuthenticated && (
                            <div className="admin-controls">
                                <button 
                                    className="admin-btn applications-btn"
                                    onClick={() => navigate("/appliedusers")}
                                >
                                    <span className="icon">📋</span>
                                    View All Applications
                                </button>
                            </div>
                        )}

                        {/* Admin Add New Position Form */}
                        {isAuthenticated && !editingCareer && (
                            <div className="admin-form-panel">
                                <h3 className="panel-title">Add New Position</h3>
                                <form onSubmit={handleSubmit} className="position-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="title">Job Title</label>
                                            <input
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={newCareer.title}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Senior Software Engineer"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location">Location</label>
                                            <input
                                                id="location"
                                                type="text"
                                                name="location"
                                                value={newCareer.location}
                                                onChange={handleInputChange}
                                                placeholder="e.g., New York, NY or Remote"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="employment_type">Employment Type</label>
                                            <select
                                                id="employment_type"
                                                name="employment_type"
                                                value={newCareer.employment_type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Remote">Remote</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deadline">Application Deadline</label>
                                            <input
                                                id="deadline"
                                                type="date"
                                                name="deadline"
                                                value={newCareer.deadline}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Job Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={newCareer.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe job responsibilities, requirements, and benefits"
                                            rows="6"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn">Publish Position</button>
                                </form>
                            </div>
                        )}
                        
                        {/* Admin Edit Position Form */}
                        {editingCareer && (
                            <div className="admin-form-panel editing">
                                <h3 className="panel-title">Edit Position</h3>
                                <form onSubmit={handleUpdateCareer} className="position-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="edit-title">Job Title</label>
                                            <input
                                                id="edit-title"
                                                type="text"
                                                name="title"
                                                value={editingCareer.title}
                                                onChange={(e) =>
                                                    setEditingCareer((prev) => ({
                                                        ...prev,
                                                        title: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="edit-location">Location</label>
                                            <input
                                                id="edit-location"
                                                type="text"
                                                name="location"
                                                value={editingCareer.location}
                                                onChange={(e) =>
                                                    setEditingCareer((prev) => ({
                                                        ...prev,
                                                        location: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="edit-type">Employment Type</label>
                                            <select
                                                id="edit-type"
                                                name="employment_type"
                                                value={editingCareer.employment_type}
                                                onChange={(e) =>
                                                    setEditingCareer((prev) => ({
                                                        ...prev,
                                                        employment_type: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Remote">Remote</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="edit-deadline">Application Deadline</label>
                                            <input
                                                id="edit-deadline"
                                                type="date"
                                                name="deadline"
                                                value={editingCareer.deadline}
                                                onChange={(e) =>
                                                    setEditingCareer((prev) => ({
                                                        ...prev,
                                                        deadline: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-description">Job Description</label>
                                        <textarea
                                            id="edit-description"
                                            name="description"
                                            value={editingCareer.description}
                                            onChange={(e) =>
                                                setEditingCareer((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            rows="6"
                                            required
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn">Save Changes</button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setEditingCareer(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Search and Filter Section */}
                        <div className="careers-search-filter">
                            <div className="search-wrapper">
                                <span className="search-icon">🔍</span>
                                <input 
                                    type="text" 
                                    placeholder="Search by keyword, location, or title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <div className="filter-tabs">
                                <button 
                                    className={`filter-tab ${activeFilter === "All" ? "active" : ""}`} 
                                    onClick={() => setActiveFilter("All")}
                                >
                                    All Positions
                                </button>
                                <button 
                                    className={`filter-tab ${activeFilter === "Full-Time" ? "active" : ""}`} 
                                    onClick={() => setActiveFilter("Full-Time")}
                                >
                                    Full-Time
                                </button>
                                <button 
                                    className={`filter-tab ${activeFilter === "Part-Time" ? "active" : ""}`} 
                                    onClick={() => setActiveFilter("Part-Time")}
                                >
                                    Part-Time
                                </button>
                                <button 
                                    className={`filter-tab ${activeFilter === "Contract" ? "active" : ""}`} 
                                    onClick={() => setActiveFilter("Contract")}
                                >
                                    Contract
                                </button>
                                <button 
                                    className={`filter-tab ${activeFilter === "Remote" ? "active" : ""}`} 
                                    onClick={() => setActiveFilter("Remote")}
                                >
                                    Remote
                                </button>
                            </div>
                        </div>

                        {/* Job Listings */}
                        {loading ? (
                            <div className="loader-container">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <div className="careers-listing">
                                {filteredCareers.length > 0 ? (
                                    filteredCareers.map((career) => (
                                        <div 
                                            className={`career-item ${expandedCardId === career.id ? 'expanded' : ''}`} 
                                            key={career.id}
                                        >
                                            <div className="career-item-header" onClick={() => toggleExpandCard(career.id)}>
                                                <div className="career-item-title">
                                                    <h3>{career.title}</h3>
                                                    <div className="career-meta-brief">
                                                        <span className="career-badge">{career.employment_type}</span>
                                                        <span className="career-location-icon">{career.location}</span>
                                                    </div>
                                                </div>
                                                <span className="expand-icon">{expandedCardId === career.id ? '−' : '+'}</span>
                                            </div>
                                            
                                            {expandedCardId === career.id && (
                                                <div className="career-item-details">
                                                    <div className="career-description">
                                                        <p>{career.description}</p>
                                                    </div>
                                                    <div className="career-item-footer">
                                                        <div className="career-meta">
                                                            <div className="meta-item">
                                                                <span className="meta-label">Location:</span>
                                                                <span className="meta-value">{career.location}</span>
                                                            </div>
                                                            <div className="meta-item">
                                                                <span className="meta-label">Type:</span>
                                                                <span className="meta-value">{career.employment_type}</span>
                                                            </div>
                                                            <div className="meta-item">
                                                                <span className="meta-label">Apply by:</span>
                                                                <span className="meta-value">{new Date(career.deadline).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="career-actions">
                                                            {isAuthenticated && (
                                                                <div className="admin-actions">
                                                                    <button
                                                                        className="edit-btn"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleEditCareer(career);
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="delete-btn"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteCareer(career.id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <button
                                                                className="apply-btn"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleApplyNow(career.id);
                                                                }}
                                                            >
                                                                Apply Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <div className="no-results-icon">🔍</div>
                                        <h3>No Positions Found</h3>
                                        <p>We couldn't find any positions matching your search criteria. Try adjusting your filters or check back later.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    <EmployeeReviews />

                    {/* Application Modal */}
                    {applyingForCareerId && (
                        <div className="application-overlay">
                            <div className="application-modal">
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setApplyingForCareerId(null)}
                                >
                                    &times;
                                </button>
                                <form
                                    onSubmit={handleApplySubmit}
                                    className="application-form"
                                >
                                    {careers.map((career) =>
                                        career.id === applyingForCareerId ? (
                                            <div key={career.id} className="application-header">
                                                <h2>Apply for {career.title}</h2>
                                                <p className="application-meta">
                                                    {career.location} • {career.employment_type} • Application deadline: {new Date(career.deadline).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ) : null
                                    )}
                                    <div className="application-form-body">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="full_name">Full Name</label>
                                                <input
                                                    id="full_name"
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="Enter your full name"
                                                    value={applicantDetails.full_name}
                                                    onChange={handleApplicantChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email address"
                                                    value={applicantDetails.email}
                                                    onChange={handleApplicantChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group file-upload">
                                            <label htmlFor="resumes">
                                                Resume <span className="required-tag">Required</span>
                                            </label>
                                            <input
                                                id="resumes"
                                                type="file"
                                                name="resumes"
                                                onChange={handleFileChange}
                                                required
                                            />
                                            <p className="file-instructions">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                                        </div>
                                        <div className="form-group file-upload">
                                            <label htmlFor="cover_letter">
                                                Cover Letter <span className="optional-tag">Optional</span>
                                            </label>
                                            <input
                                                id="cover_letter"
                                                type="file"
                                                name="cover_letter"
                                                onChange={handleFileChange}
                                            />
                                            <p className="file-instructions">Accepted formats: PDF, DOC, DOCX (Max 2MB)</p>
                                        </div>
                                    </div>
                                    <div className="application-footer">
                                        <button type="submit" className="submit-application-btn">Submit Application</button>
                                        <button
                                            type="button"
                                            className="cancel-application-btn"
                                            onClick={() => setApplyingForCareerId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Career;