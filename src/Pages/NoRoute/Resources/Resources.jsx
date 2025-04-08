import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css";
import { Calendar, FileText, BookOpen, ExternalLink, HelpCircle, Bell, Newspaper } from "lucide-react";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filterResources = (category) => {
    setActiveTab(category);
  };

  // Current date formatting for news items
  const formatDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1 className="resources-heading">CA Professionals Resources</h1>
        <p className="resources-subtitle">
          Access the latest updates, educational resources, and professional tools for Chartered Accountants
        </p>
      </div>

      {/* Filter Navigation */}
      <div className="resources-filter">
        <button 
          className={`filter-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => filterResources("all")}
        >
          All Resources
        </button>
        <button 
          className={`filter-btn ${activeTab === "notices" ? "active" : ""}`}
          onClick={() => filterResources("notices")}
        >
          Notices
        </button>
        <button 
          className={`filter-btn ${activeTab === "news" ? "active" : ""}`}
          onClick={() => filterResources("news")}
        >
          News
        </button>
        <button 
          className={`filter-btn ${activeTab === "learning" ? "active" : ""}`}
          onClick={() => filterResources("learning")}
        >
          Learning
        </button>
        <button 
          className={`filter-btn ${activeTab === "links" ? "active" : ""}`}
          onClick={() => filterResources("links")}
        >
          Links
        </button>
      </div>

      {/* Featured Resource Banner */}
      <div className="featured-resource">
        <div className="featured-content">
          <span className="featured-tag">Featured Resource</span>
          <h2>Updated GST Compliance Framework 2025</h2>
          <p>
            New GST compliance framework effective April 1, 2025. Access comprehensive guide, compliance 
            checklists, and implementation strategies.
          </p>
          <NavLink to="/resources/gst-compliance-2025" className="featured-btn">
            Access Resource
          </NavLink>
        </div>
      </div>

      {/* Notices Section */}
      {(activeTab === "all" || activeTab === "notices") && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <Bell size={22} />
            <h2 className="section-title">Important Notices</h2>
          </div>
          <div className="resources-items">
            <div className="resource-item notice">
              <span className="resource-date">April 2, 2025</span>
              <a href="/notices/tax-filing-deadline" className="resource-link">
                <h3>Extended Tax Filing Deadline</h3>
                <p className="resource-description">
                  Income Tax Department announces extended filing deadline for specified assessees to May 31, 2025.
                </p>
                <span className="resource-tag urgent">Urgent</span>
              </a>
            </div>
            <div className="resource-item notice">
              <span className="resource-date">March 28, 2025</span>
              <a href="/notices/itat-ruling" className="resource-link">
                <h3>ITAT Ruling: Significant Impact on Section 54F Claims</h3>
                <p className="resource-description">
                  Recent ITAT ruling clarifies conditions for capital gains exemption under Section 54F.
                </p>
                <span className="resource-tag">Important</span>
              </a>
            </div>
            <div className="resource-item notice">
              <span className="resource-date">March 15, 2025</span>
              <a href="/notices/revised-audit-standards" className="resource-link">
                <h3>Revised Audit Standards SAS 145 & 146</h3>
                <p className="resource-description">
                  Implementation guidelines for revised Standards on Auditing effective from April 15, 2025.
                </p>
                <span className="resource-tag">Standards</span>
              </a>
            </div>
          </div>
          <NavLink to="/all-notices" className="see-all-link">
            View all notices <ExternalLink size={16} />
          </NavLink>
        </section>
      )}

      {/* News and Updates Section */}
      {(activeTab === "all" || activeTab === "news") && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <Newspaper size={22} />
            <h2 className="section-title">News & Updates</h2>
          </div>
          <div className="resources-items">
            <div className="resource-item news-card">
              <img src="/api/placeholder/400/200" alt="New tax law changes" className="news-image" />
              <div className="news-content">
                <span className="resource-date">{formatDate(2)}</span>
                <NavLink to="/news/tax-reform-2025">
                  <h3>Finance Act 2025: Key Changes Affecting CA Practice</h3>
                  <p className="resource-description">
                    Analysis of significant amendments in the Finance Act 2025 and their impact on CA practice, client advisory, and compliance requirements.
                  </p>
                </NavLink>
                <span className="resource-tag">Tax Reform</span>
              </div>
            </div>
            <div className="resource-item news-card">
              <img src="/api/placeholder/400/200" alt="Firm partnership announcement" className="news-image" />
              <div className="news-content">
                <span className="resource-date">{formatDate(5)}</span>
                <NavLink to="/news/faceless-assessment-updates">
                  <h3>Faceless Assessment 2.0: Enhanced Procedures & Practitioner Guidelines</h3>
                  <p className="resource-description">
                    Tax department announces updated procedures for faceless assessments with new documentation requirements and timeline modifications.
                  </p>
                </NavLink>
                <span className="resource-tag">Regulatory</span>
              </div>
            </div>
            <div className="resource-item news-card">
              <img src="/api/placeholder/400/200" alt="Digital transformation" className="news-image" />
              <div className="news-content">
                <span className="resource-date">{formatDate(10)}</span>
                <NavLink to="/news/digital-transformation">
                  <h3>AI & Automation: Reshaping Accounting Practices</h3>
                  <p className="resource-description">
                    How AI and automation technologies are transforming audit, tax, and advisory services in accounting firms.
                  </p>
                </NavLink>
                <span className="resource-tag">Technology</span>
              </div>
            </div>
          </div>
          <NavLink to="/all-news" className="see-all-link">
            View all news <ExternalLink size={16} />
          </NavLink>
        </section>
      )}

      {/* Learning Resources Section */}
      {(activeTab === "all" || activeTab === "learning") && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <BookOpen size={22} />
            <h2 className="section-title">Learning Resources</h2>
          </div>
          <div className="resources-items">
            <div className="resource-item learning-card">
              <div className="learning-icon">
                <FileText size={28} />
              </div>
              <NavLink to="/learning/gst-masterclass">
                <h3>GST Masterclass: Advanced Concepts</h3>
                <p className="resource-description">
                  A comprehensive course covering complex GST scenarios, dispute resolution, and recent case laws.
                </p>
                <div className="resource-meta">
                  <span className="resource-meta-item">12 Modules</span>
                  <span className="resource-meta-item">24 CPE Hours</span>
                </div>
              </NavLink>
            </div>
            <div className="resource-item learning-card">
              <div className="learning-icon">
                <Calendar size={28} />
              </div>
              <NavLink to="/learning/ifrs-webinar">
                <h3>Webinar: IFRS Updates & Implementation Challenges</h3>
                <p className="resource-description">
                  Join industry experts discussing recent IFRS amendments and practical implementation approaches.
                </p>
                <div className="resource-meta">
                  <span className="resource-meta-item">April 15, 2025</span>
                  <span className="resource-meta-item">3 CPE Hours</span>
                </div>
              </NavLink>
            </div>
            <div className="resource-item learning-card">
              <div className="learning-icon">
                <FileText size={28} />
              </div>
              <NavLink to="/learning/forensic-accounting">
                <h3>Certificate Course: Forensic Accounting & Fraud Detection</h3>
                <p className="resource-description">
                  Develop specialized skills in forensic accounting, fraud investigation techniques, and evidence handling.
                </p>
                <div className="resource-meta">
                  <span className="resource-meta-item">8 Modules</span>
                  <span className="resource-meta-item">16 CPE Hours</span>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink to="/all-learning" className="see-all-link">
            View all learning resources <ExternalLink size={16} />
          </NavLink>
        </section>
      )}

      {/* Helpful Links Section */}
      {(activeTab === "all" || activeTab === "links") && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <ExternalLink size={22} />
            <h2 className="section-title">Professional Links</h2>
          </div>
          <div className="resources-items links-grid">
            <div className="resource-item link-card">
              <a href="https://www.icai.org" target="_blank" rel="noopener noreferrer">
                <h3>ICAI Official Portal</h3>
                <p className="resource-description">Institute of Chartered Accountants of India - Official website</p>
              </a>
            </div>
            <div className="resource-item link-card">
              <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer">
                <h3>Income Tax Department</h3>
                <p className="resource-description">Official Income Tax Department portal for e-filing and tax services</p>
              </a>
            </div>
            <div className="resource-item link-card">
              <a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer">
                <h3>GST Portal</h3>
                <p className="resource-description">Official GST portal for returns filing and GST compliance</p>
              </a>
            </div>
            <div className="resource-item link-card">
              <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer">
                <h3>Ministry of Corporate Affairs</h3>
                <p className="resource-description">MCA portal for company registration and compliance</p>
              </a>
            </div>
            <div className="resource-item link-card">
              <a href="https://www.taxmann.com" target="_blank" rel="noopener noreferrer">
                <h3>Taxmann</h3>
                <p className="resource-description">Tax and corporate laws research platform</p>
              </a>
            </div>
            <div className="resource-item link-card">
              <a href="https://www.cbic.gov.in" target="_blank" rel="noopener noreferrer">
                <h3>Central Board of Indirect Taxes & Customs</h3>
                <p className="resource-description">Official CBIC website for customs and indirect tax information</p>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {(activeTab === "all") && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <HelpCircle size={22} />
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            <div className="faq-item">
              <h3>How do I earn CPE credit hours from your resources?</h3>
              <p>
                CPE credits are awarded upon completion of eligible courses and webinars. Each learning resource 
                specifies the number of CPE hours available. Certificates are issued automatically upon completion 
                of required assessments.
              </p>
            </div>
            <div className="faq-item">
              <h3>How frequently are tax resources updated?</h3>
              <p>
                Our tax resources are updated within 48 hours of any significant change in tax legislation, 
                circulars, or notifications. All resources include a "Last Updated" timestamp for reference.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I access these resources on mobile devices?</h3>
              <p>
                Yes, our resource portal is fully responsive and optimized for mobile access. We also offer a 
                dedicated mobile app for iOS and Android that allows offline access to downloaded resources.
              </p>
            </div>
          </div>
          <NavLink to="/faqs" className="see-all-link">
            View all FAQs <ExternalLink size={16} />
          </NavLink>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for latest updates, resources, and professional insights</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="newsletter-note">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Resources;