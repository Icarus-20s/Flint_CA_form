import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Appliedusers.css";

const AppliedUsers = () => {
    const [groupedApplications, setGroupedApplications] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch all job applications grouped by job title
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:8000/jobapplications/");
                setGroupedApplications(response.data); // Store grouped applications
            } catch (err) {
                setError("Failed to fetch job applications. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return (
            <div className="applications-container">
                <h1>Job Applications</h1>
                <p className="loading-message">Loading applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="applications-container">
                <h1>Job Applications</h1>
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="applications-container">
            <h1>Job Applications</h1>

            {Object.keys(groupedApplications).length === 0 ? (
                <p className="no-data-message">No applications available at the moment.</p>
            ) : (
                <div className="job-list">
                    {Object.keys(groupedApplications).map((jobTitle) => (
                        <div className="job-category" key={jobTitle}>
                            <h2>{jobTitle}</h2>
                            <table className="applications-table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Resume</th>
                                        <th>Cover Letter</th>
                                        <th>Applied Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedApplications[jobTitle].map((application) => (
                                        <tr key={application.id}>
                                            <td>{application.full_name}</td>
                                            <td>{application.email}</td>
                                            <td>
                                                <a
                                                    href={application.resumes}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Resume
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href={application.cover_letter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Cover Letter
                                                </a>
                                            </td>
                                            <td>{new Date(application.applied_date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedUsers;
