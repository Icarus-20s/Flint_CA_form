// src/components/JobApplicationsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Appliedusers.css';

const Appliedusers = () => {
    const [groupedApplications, setGroupedApplications] = useState({});

    useEffect(() => {
        // Fetch all job applications grouped by job title
        axios
            .get("http://localhost:8000/jobapplications/")  // Your Django API endpoint
            .then((response) => {
                setGroupedApplications(response.data);  // Store grouped applications
            })
            .catch((error) => {
                console.error("Error fetching job applications:", error);
            });
    }, []);

    return (
        <div className="applications-container">
            <h1>Job Applications</h1>
            <button onClick={() => window.location.href = "/apply-job"}>Apply for a Job</button>

            {/* Loop through each job title and display its applications */}
            <div className="job-list">
                {Object.keys(groupedApplications).map((jobTitle) => (
                    <div className="job-category" key={jobTitle}>
                        <h2>{jobTitle}</h2>
                        {/* Only display a table if there are applications for this job */}
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Resumes</th>
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
                                            <a href={application.resumes} target="_blank" rel="noopener noreferrer">
                                                Download Resume
                                            </a>
                                        </td>
                                        <td>
                                            <a href={application.cover_letter} target="_blank" rel="noopener noreferrer">
                                                Download Cover Letter
                                            </a>
                                        </td>
                                        <td>{application.applied_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appliedusers;
