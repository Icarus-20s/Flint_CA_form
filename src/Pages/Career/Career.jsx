import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Loaders/Loader";
import { useAuth } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "./Career.css";
import AppliedUsers from "./Appliedusers/Appliedusers";

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

    // Fetch careers on component mount
    useEffect(() => {
        const fetchCareers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/career/");
                setCareers(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setErrorMessage("Error fetching careers. Please try again later.");
                console.error("Error fetching careers:", err);
            }
        };
        fetchCareers();
    }, []);

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
            alert("You must be logged in to add a career.");
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
            setSuccessMessage("Career added successfully!");
        } catch (err) {
            setErrorMessage("Error adding career. Please try again later.");
            console.error("Error adding career:", err);
        }
    };

    const handleEditCareer = (career) => {
        setEditingCareer({ ...career });
    };

    const handleUpdateCareer = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("You must be logged in to update a career.");
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
            setSuccessMessage("Career updated successfully!");
        } catch (err) {
            setErrorMessage("Error updating career. Please try again later.");
            console.error("Error updating career:", err);
        }
    };

    const handleDeleteCareer = async (id) => {
        if (!isAuthenticated) {
            alert("You must be logged in to delete a career.");
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/career/${id}/delete/`);
            setCareers((prev) => prev.filter((career) => career.id !== id));
            setSuccessMessage("Career deleted successfully!");
        } catch (err) {
            setErrorMessage("Error deleting career. Please try again later.");
            console.error("Error deleting career:", err);
        }
    };

    const handleApplyNow = (careerId) => {
        setApplyingForCareerId(careerId);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (!applicantDetails.full_name || !applicantDetails.email || !applicantDetails.resumes) {
            alert("Please fill in all fields and upload a resume.");
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
            await axios.post("http://127.0.0.1:8000/jobapplication/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccessMessage("Application submitted successfully!");
            setApplicantDetails({
                full_name: "",
                email: "",
                resumes: null,
                cover_letter: null,
            });
            setApplyingForCareerId(null);
        } catch (error) {
            console.error("Error applying for career:", error);
            setErrorMessage("Error submitting your application. Please try again later.");
        }
    };

    return (
        <div className="career-page">
            <h1>Careers</h1>
            {
                isAuthenticated&&(
                    <button onClick={()=>{
                        navigate('/appliedusers')
                    }}>See Applied users</button>
                )
            }

            {errorMessage && <p className="career-error">{errorMessage}</p>}
            {successMessage && <p className="career-success">{successMessage}</p>}

            {isAuthenticated && !editingCareer && (
                <form onSubmit={handleSubmit} className="career-create-form">
                    <input
                        type="text"
                        name="title"
                        value={newCareer.title}
                        onChange={handleInputChange}
                        placeholder="Career Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={newCareer.description}
                        onChange={handleInputChange}
                        placeholder="Career Description"
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        value={newCareer.location}
                        onChange={handleInputChange}
                        placeholder="Location"
                        required
                    />
                    <select
                        name="employment_type"
                        value={newCareer.employment_type}
                        onChange={handleInputChange}
                    >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                    <input
                        type="date"
                        name="deadline"
                        value={newCareer.deadline}
                        onChange={handleInputChange}
                        placeholder="Deadline"
                        required
                    />
                    <button type="submit">Add Career</button>
                </form>
            )}

            {editingCareer && (
                <form onSubmit={handleUpdateCareer} className="career-update-form">
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
                        placeholder="Edit Career Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={editingCareer.description}
                        onChange={(e) =>
                            setEditingCareer((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="Edit Career Description"
                        required
                    />
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
                        placeholder="Edit Location"
                        required
                    />
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
                    </select>
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
                        placeholder="Edit Deadline"
                        required
                    />
                    <button type="submit">Update Career</button>
                    <button type="button" onClick={() => setEditingCareer(null)}>
                        Cancel
                    </button>
                </form>
            )}

            {loading ? (
                <Loader />
            ) : (
                <div className="career-list">
                    {careers.length > 0 ? (
                        careers.map((career) => (
                            <div className="career-card" key={career.id}>
                                <div className="career-card-inner">
                                    <div className="career-card-front">
                                        <h3>{career.title}</h3>
                                    </div>
                                    <div className="career-card-back">
                                        <p>{career.description}</p>
                                        <p>Location: {career.location}</p>
                                        <p>Employment Type: {career.employment_type}</p>
                                        <p>Deadline: {career.deadline}</p>
                                        {isAuthenticated && (
                                            <div className="career-card-actions">
                                                <button onClick={() => handleEditCareer(career)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteCareer(career.id)}>
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
                        <p>No careers available</p>
                    )}
                </div>
            )}
{applyingForCareerId && (
    <div className="career-application-modal">
        <form onSubmit={handleApplySubmit} className="career-application-form">
            {/* Get the career title based on applyingForCareerId */}
            {careers.map((career) =>
                career.id === applyingForCareerId ? (
                    <h2 key={career.id}>Apply for {career.title}</h2>
                ) : null
            )}
            <input
                type="text"
                name="full_name"
                placeholder="Your Full Name"
                value={applicantDetails.full_name}
                onChange={handleApplicantChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={applicantDetails.email}
                onChange={handleApplicantChange}
                required
            />
            <input
                type="file"
                name="resumes"
                onChange={handleFileChange}
                required
            />
            <input
                type="file"
                name="cover_letter"
                onChange={handleFileChange}
            />
            <button type="submit">Submit Application</button>
            <button
                type="button"
                onClick={() => setApplyingForCareerId(null)}
            >
                Cancel
            </button>
        </form>
    </div>
)}
        </div>
    );
};

export default Career;
