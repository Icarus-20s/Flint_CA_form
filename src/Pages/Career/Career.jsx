import React, { useState } from "react";
import "./Career.css";
import { useAuth } from "../../Context/AuthContextProvider";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

function Career() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    resume: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleuserapplied = () => {
    navigate('/career/applieduser');
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission (e.g., sending data to a backend)
  };

  // Check if the current path is the one for the child component
  const isChildRoute = location.pathname.includes('/career/applieduser');

  return (
    <div className="career-page">
      {/* Hero Section */}
      {!isChildRoute && (
        <section className="hero">
          <h1>Join Our Team</h1>
          <p>Explore exciting career opportunities at CA Firm!</p>
          {isAuthenticated && (
            <button onClick={handleuserapplied}>See applied users</button>
          )}
        </section>
      )}

      {/* Job Listings */}
      {!isChildRoute && (
        <section className="job-listings">
          <h2>Current Openings</h2>
          <div className="job-cards">
            {/* Job Listing */}
            {["Senior Accountant", "Tax Consultant", "Junior Auditor"].map((title, index) => (
              <div key={index} className="job-card">
                <div className="job-title">
                  <h3>{title}</h3>
                  <p><strong>Location:</strong> {["New York", "London", "Mumbai"][index]}</p>
                </div>
                <div className="job-description">
                  <p>
                    {index === 0
                      ? "We are seeking a Senior Accountant with 5+ years of experience in financial accounting."
                      : index === 1
                      ? "Looking for a Tax Consultant with expertise in corporate taxation."
                      : "Join as a Junior Auditor, assisting with audits for various clients."}
                  </p>
                  <button
                    className="apply-btn"
                    onClick={() => {
                      window.scrollTo({ top: document.querySelector('.application-form').offsetTop, behavior: 'smooth' });
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Application Form */}
      {!isChildRoute && (
        <section className="application-form">
          <h2>Submit Your Application</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="position">Position Applying For</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Position Name"
              value={formData.position}
              onChange={handleChange}
              required
            />

            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              required
            />

            <label htmlFor="message">Cover Letter</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write a brief cover letter"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        </section>
      )}

      {/* Render the Outlet for Child Components */}
      <Outlet />
    </div>
  );
}

export default Career;
