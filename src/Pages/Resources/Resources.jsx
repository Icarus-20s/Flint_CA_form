import React from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css";  // Import your updated styles

const Resources = () => {
  return (
    <div className="resources-container">
      <h1>CA Professionals</h1>
      
      {/* Notices Section */}
      <section className="resources-section">
        <h2>Notices</h2>
        <div className="resources-items">
          <div className="resource-item">
            <a href="/path-to-notice1.pdf" target="_blank" rel="noopener noreferrer">
              <h3>Notice 1: Important Guidelines</h3>
            </a>
          </div>
          <div className="resource-item">
            <a href="/path-to-notice2.pdf" target="_blank" rel="noopener noreferrer">
              <h3>Notice 2: Tax Updates</h3>
            </a>
          </div>
          {/* Add more items here */}
        </div>
      </section>

      {/* News and Updates Section */}
      <section className="resources-section">
        <h2>News & Updates</h2>
        <div className="resources-items">
          <div className="resource-item news-card">
            <NavLink to="/news1">
              <h3>Latest CA Industry Update</h3>
              <p>Read the latest updates in the CA industry...</p>
            </NavLink>
          </div>
          <div className="resource-item news-card">
            <NavLink to="/news2">
              <h3>Firm's New Announcements</h3>
              <p>Learn more about the new announcements from our firm...</p>
            </NavLink>
          </div>
          {/* Add more news items */}
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="resources-section">
        <h2>Learning Resources</h2>
        <div className="resources-items">
          <div className="resource-item learning-card">
            <NavLink to="/learning/course1">
              <h3>Course: Taxation Basics</h3>
            </NavLink>
          </div>
          <div className="resource-item learning-card">
            <NavLink to="/learning/webinar1">
              <h3>Webinar: Audit Procedures</h3>
            </NavLink>
          </div>
          {/* Add more courses or webinars */}
        </div>
      </section>

      {/* Helpful Links Section */}
      <section className="resources-section">
        <h2>Helpful Links</h2>
        <div className="resources-items">
          <div className="resource-item">
            <a href="https://www.icai.org" target="_blank" rel="noopener noreferrer">
              <h3>ICAI Official Website</h3>
            </a>
          </div>
          <div className="resource-item">
            <a href="https://www.taxguru.in" target="_blank" rel="noopener noreferrer">
              <h3>Tax Guru Resources</h3>
            </a>
          </div>
          {/* Add more helpful links */}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="resources-section">
        <h2>Frequently Asked Questions</h2>
        <div className="resources-items">
          <div className="resource-item">
            <NavLink to="/faqs">
              <h3>Common FAQs about CA Certification</h3>
            </NavLink>
          </div>
          <div className="resource-item">
            <NavLink to="/faqs">
              <h3>How to Register for Webinars?</h3>
            </NavLink>
          </div>
          {/* Add more FAQ items */}
        </div>
      </section>
    </div>
  );
};

export default Resources;
