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
    // Handle form submission (e.g., sending data to a backend)
    console.log(formData);
  };

  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Join Our Team</h1>
        <p>Explore career opportunities at [Your Firm Name]. Apply for open positions below!</p>
      </section>

      {/* Job Listings */}
      <section className="job-listings">
        <h2>Current Job Openings</h2>

        {/* Job Listing 1 */}
        <div className="job-card">
          <div className="job-title">
            <h3>Senior Accountant</h3>
            <p><strong>Location:</strong> New York, USA</p>
          </div>
          <div className="job-description">
            <p>We are seeking a Senior Accountant to join our growing team. The ideal candidate will have 5+ years of experience in financial accounting, tax filings, and auditing. Strong communication skills are required.</p>
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

        {/* Job Listing 2 */}
        <div className="job-card">
          <div className="job-title">
            <h3>Tax Consultant</h3>
            <p><strong>Location:</strong> London, UK</p>
          </div>
          <div className="job-description">
            <p>We are looking for a Tax Consultant with expertise in corporate taxation and international tax law. This role requires analytical skills and the ability to work independently.</p>
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

        {/* Job Listing 3 */}
        <div className="job-card">
          <div className="job-title">
            <h3>Junior Auditor</h3>
            <p><strong>Location:</strong> Mumbai, India</p>
          </div>
          <div className="job-description">
            <p>As a Junior Auditor, you will assist in the execution of audits for various clients. Ideal candidates should have a keen eye for detail and a willingness to learn and grow in the field of auditing.</p>
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
            placeholder="e.g. Senior Accountant"
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
