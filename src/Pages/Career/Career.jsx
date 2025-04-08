import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loaders/Loader";
import { useAuth } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "./Career.css";
import WhyJoinUs from "./WhyJoinUs/WhyJoinUs";
import ExperienceBenefits from "./ExperienceBenefits/ExperienceBenefits";
import EmployeeReviews from "./EmployeeReview/EmployeeReview";

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

    // Fetch careers on component mount
    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/career/");
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
            const response = await axios.post(
                "http://127.0.0.1:8000/career/create/",
                newCareer
            );
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
            const response = await axios.put(
                `http://127.0.0.1:8000/career/${editingCareer.id}/update/`,
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
                await axios.delete(`http://127.0.0.1:8000/career/${id}/delete/`);
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
            await axios.post(
                "http://127.0.0.1:8000/jobapplication/",
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

    // Filter careers by employment type
    const filteredCareers = careers.filter(career => {
        const matchesFilter = activeFilter === "All" || career.employment_type === activeFilter;
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             career.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="career-page">
            <div className="career-hero">
                <h1>Join Our Team</h1>
                <p>Discover exciting career opportunities and become part of our growing team</p>
            </div>

            <WhyJoinUs />
            <ExperienceBenefits />

            <div className="career-opportunities-section">
                <h2>Current Opportunities</h2>
                
                {isAuthenticated && (
                    <div className="admin-actions">
                        <button 
                            className="admin-button view-applications"
                            onClick={() => navigate("/appliedusers")}
                        >
                            View Applications
                        </button>
                    </div>
                )}

                {(errorMessage || successMessage) && (
                    <div className={`notification ${errorMessage ? 'error' : 'success'}`}>
                        <p>{errorMessage || successMessage}</p>
                    </div>
                )}

                {isAuthenticated && !editingCareer && (
                    <div className="admin-form-container">
                        <h3>Add New Career Opportunity</h3>
                        <form onSubmit={handleSubmit} className="career-create-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    value={newCareer.title}
                                    onChange={handleInputChange}
                                    placeholder="Job Title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    value={newCareer.description}
                                    onChange={handleInputChange}
                                    placeholder="Job Description"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="location"
                                        value={newCareer.location}
                                        onChange={handleInputChange}
                                        placeholder="Location"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
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
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={newCareer.deadline}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="submit-button">Add Career</button>
                        </form>
                    </div>
                )}

                {editingCareer && (
                    <div className="admin-form-container">
                        <h3>Edit Career Opportunity</h3>
                        <form onSubmit={handleUpdateCareer} className="career-update-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    value={editingCareer.title}
                                    onChange={(e) =>
                                        setEditingCareer((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Job Title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    value={editingCareer.description}
                                    onChange={(e) =>
                                        setEditingCareer((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="Job Description"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="location"
                                        value={editingCareer.location}
                                        onChange={(e) =>
                                            setEditingCareer((prev) => ({
                                                ...prev,
                                                location: e.target.value,
                                            }))
                                        }
                                        placeholder="Location"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
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
                                    <input
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
                            <div className="form-actions">
                                <button type="submit" className="submit-button">Update</button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setEditingCareer(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="career-filters">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Search positions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        <button 
                            className={activeFilter === "All" ? "active" : ""} 
                            onClick={() => setActiveFilter("All")}
                        >
                            All
                        </button>
                        <button 
                            className={activeFilter === "Full-Time" ? "active" : ""} 
                            onClick={() => setActiveFilter("Full-Time")}
                        >
                            Full-Time
                        </button>
                        <button 
                            className={activeFilter === "Part-Time" ? "active" : ""} 
                            onClick={() => setActiveFilter("Part-Time")}
                        >
                            Part-Time
                        </button>
                        <button 
                            className={activeFilter === "Contract" ? "active" : ""} 
                            onClick={() => setActiveFilter("Contract")}
                        >
                            Contract
                        </button>
                        <button 
                            className={activeFilter === "Remote" ? "active" : ""} 
                            onClick={() => setActiveFilter("Remote")}
                        >
                            Remote
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <div className="career-list">
                        {filteredCareers.length > 0 ? (
                            filteredCareers.map((career) => (
                                <div className="career-card" key={career.id}>
                                    <div className="career-card-inner">
                                        <div className="career-card-front">
                                            <div className="career-badge">{career.employment_type}</div>
                                            <h3>{career.title}</h3>
                                            <p className="career-location">{career.location}</p>
                                        </div>
                                        <div className="career-card-back">
                                            <h3>{career.title}</h3>
                                            <div className="career-details">
                                                <p className="career-description">{career.description}</p>
                                                <div className="career-meta">
                                                    <p><strong>Location:</strong> {career.location}</p>
                                                    <p><strong>Type:</strong> {career.employment_type}</p>
                                                    <p><strong>Apply by:</strong> {new Date(career.deadline).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {isAuthenticated && (
                                                <div className="career-card-actions">
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => handleEditCareer(career)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteCareer(career.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                className="career-apply-now-btn"
                                                onClick={() => handleApplyNow(career.id)}
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No career opportunities found matching your criteria</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <EmployeeReviews />

            {applyingForCareerId && (
                <div className="career-application-overlay">
                    <div className="career-application-modal">
                        <button 
                            className="close-modal" 
                            onClick={() => setApplyingForCareerId(null)}
                        >
                            &times;
                        </button>
                        <form
                            onSubmit={handleApplySubmit}
                            className="career-application-form"
                        >
                            {careers.map((career) =>
                                career.id === applyingForCareerId ? (
                                    <div key={career.id} className="application-header">
                                        <h2>Apply for {career.title}</h2>
                                        <p className="application-subheader">
                                            {career.location} • {career.employment_type}
                                        </p>
                                    </div>
                                ) : null
                            )}
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
                            <div className="form-group">
                                <label htmlFor="resumes">Resume (Required)</label>
                                <input
                                    id="resumes"
                                    type="file"
                                    name="resumes"
                                    onChange={handleFileChange}
                                    required
                                />
                                <p className="file-hint">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cover_letter">Cover Letter (Optional)</label>
                                <input
                                    id="cover_letter"
                                    type="file"
                                    name="cover_letter"
                                    onChange={handleFileChange}
                                />
                                <p className="file-hint">Accepted formats: PDF, DOC, DOCX (Max 2MB)</p>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">Submit Application</button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setApplyingForCareerId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Career;