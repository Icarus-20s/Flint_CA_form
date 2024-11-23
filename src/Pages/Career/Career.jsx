import React, { useState } from "react";
import "./Career.css";

function Career() {
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

  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Join Our Team</h1>
        <p>Explore exciting career opportunities at CA Firm!</p>
      </section>

      {/* Job Listings */}
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

      {/* Application Form */}
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
    </div>
  );
}

export default Career;
