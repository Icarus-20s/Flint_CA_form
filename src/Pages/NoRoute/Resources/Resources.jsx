import React from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css"; // Import the updated CSS file

const Resources = () => {
  return (
    <div className="resources-container">
      <h1 className="resources-heading">CA Professionals Resources</h1>

      {/* Notices Section */}
      <section className="resources-section fade-in">
        <h2 className="section-title">Notices</h2>
        <div className="resources-items">
          <div className="resource-item">
            <a href="https://en.ican.org.np/site/show/laws-legislation" target="_blank" rel="noopener noreferrer">
              <h3>Notice 1: Important Guidelines</h3>
              <p className="resource-description">Find detailed guidelines and important updates.</p>
            </a>
          </div>
          <div className="resource-item">
            <a href="/path-to-notice2.pdf" target="_blank" rel="noopener noreferrer">
              <h3>Notice 2: Tax Updates</h3>
              <p className="resource-description">Stay informed about the latest tax updates.</p>
            </a>
          </div>
        </div>
      </section>

      {/* News and Updates Section */}
      <section className="resources-section fade-in">
        <h2 className="section-title">News & Updates</h2>
        <div className="resources-items">
          <div className="resource-item news-card">
            <NavLink to="/news1">
              <h3>Latest CA Industry Update</h3>
              <p className="resource-description">Read the latest updates in the CA industry...</p>
            </NavLink>
          </div>
          <div className="resource-item news-card">
            <NavLink to="/news2">
              <h3>Firm's New Announcements</h3>
              <p className="resource-description">Learn more about the new announcements from our firm...</p>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="resources-section fade-in">
        <h2 className="section-title">Learning Resources</h2>
        <div className="resources-items">
          <div className="resource-item learning-card">
            <NavLink to="/learning/course1">
              <h3>Course: Taxation Basics</h3>
              <p className="resource-description">A fundamental course on taxation procedures.</p>
            </NavLink>
          </div>
          <div className="resource-item learning-card">
            <NavLink to="/learning/webinar1">
              <h3>Webinar: Audit Procedures</h3>
              <p className="resource-description">Join our insightful webinar on audit practices.</p>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Helpful Links Section */}
      <section className="resources-section fade-in">
        <h2 className="section-title">Helpful Links</h2>
        <div className="resources-items">
          <div className="resource-item">
            <a href="https://www.icai.org" target="_blank" rel="noopener noreferrer">
              <h3>ICAI Official Website</h3>
              <p className="resource-description">Access official CA resources and updates.</p>
            </a>
          </div>
          <div className="resource-item">
            <a href="https://www.taxguru.in" target="_blank" rel="noopener noreferrer">
              <h3>Tax Guru Resources</h3>
              <p className="resource-description">Find comprehensive tax resources and articles.</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="resources-section fade-in">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="resources-items">
          <div className="resource-item">
            <NavLink to="/faqs">
              <h3>Common FAQs about CA Certification</h3>
              <p className="resource-description">Get answers to common questions about certification.</p>
            </NavLink>
          </div>
          <div className="resource-item">
            <NavLink to="/faqs">
              <h3>How to Register for Webinars?</h3>
              <p className="resource-description">Learn how to sign up for our informative webinars.</p>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
