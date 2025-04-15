import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Resources.css";
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  HelpCircle, 
  Bell, 
  Newspaper 
} from "lucide-react";

// Component for resource items
const ResourceItem = ({ item, type }) => {
  switch(type) {
    case "notice":
      return (
        <div className="resource-item notice">
          <span className="resource-date">{item.date}</span>
          <a href={item.url} className="resource-link">
            <h3>{item.title}</h3>
            <p className="resource-description">{item.description}</p>
            <span className={`resource-tag ${item.tagType || ""}`}>{item.tag}</span>
          </a>
        </div>
      );
    case "news":
      return (
        <div className="resource-item news-card">
          <img src={item.image} alt={item.imageAlt} className="news-image" />
          <div className="news-content">
            <span className="resource-date">{item.date}</span>
            <NavLink to={item.url}>
              <h3>{item.title}</h3>
              <p className="resource-description">{item.description}</p>
            </NavLink>
            <span className="resource-tag">{item.tag}</span>
          </div>
        </div>
      );
    case "learning":
      return (
        <div className="resource-item learning-card">
          <div className="learning-icon">
            <FileText size={28} />
          </div>
          <NavLink to={item.url}>
            <h3>{item.title}</h3>
            <p className="resource-description">{item.description}</p>
            <div className="resource-meta">
              {item.meta.map((meta, index) => (
                <span key={index} className="resource-meta-item">{meta}</span>
              ))}
            </div>
          </NavLink>
        </div>
      );
    case "link":
      return (
        <div className="resource-item link-card">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
            <p className="resource-description">{item.description}</p>
          </a>
        </div>
      );
    default:
      return null;
  }
};

// Component for FAQ items
const FaqItem = ({ question, answer }) => (
  <div className="faq-item">
    <h3>{question}</h3>
    <p>{answer}</p>
  </div>
);

// Main Resources component
const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [email, setEmail] = useState("");
  
  // Mock data - in a real application, this would come from an API
  const notices = [
    {
      date: "April 2, 2025",
      url: "/notices/tax-filing-deadline",
      title: "Extended Tax Filing Deadline",
      description: "Income Tax Department announces extended filing deadline for specified assessees to May 31, 2025.",
      tag: "Urgent",
      tagType: "urgent"
    },
    {
      date: "March 28, 2025",
      url: "/notices/itat-ruling",
      title: "ITAT Ruling: Significant Impact on Section 54F Claims",
      description: "Recent ITAT ruling clarifies conditions for capital gains exemption under Section 54F.",
      tag: "Important"
    },
    {
      date: "March 15, 2025",
      url: "/notices/revised-audit-standards",
      title: "Revised Audit Standards SAS 145 & 146",
      description: "Implementation guidelines for revised Standards on Auditing effective from April 15, 2025.",
      tag: "Standards"
    }
  ];

  // Format date utility function
  const formatDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // News data
  const news = [
    {
      image: "/api/placeholder/400/200",
      imageAlt: "New tax law changes",
      date: formatDate(2),
      url: "/news/tax-reform-2025",
      title: "Finance Act 2025: Key Changes Affecting CA Practice",
      description: "Analysis of significant amendments in the Finance Act 2025 and their impact on CA practice, client advisory, and compliance requirements.",
      tag: "Tax Reform"
    },
    {
      image: "/api/placeholder/400/200",
      imageAlt: "Firm partnership announcement",
      date: formatDate(5),
      url: "/news/faceless-assessment-updates",
      title: "Faceless Assessment 2.0: Enhanced Procedures & Practitioner Guidelines",
      description: "Tax department announces updated procedures for faceless assessments with new documentation requirements and timeline modifications.",
      tag: "Regulatory"
    },
    {
      image: "/api/placeholder/400/200",
      imageAlt: "Digital transformation",
      date: formatDate(10),
      url: "/news/digital-transformation",
      title: "AI & Automation: Reshaping Accounting Practices",
      description: "How AI and automation technologies are transforming audit, tax, and advisory services in accounting firms.",
      tag: "Technology"
    }
  ];

  // Learning resources data
  const learningResources = [
    {
      url: "/learning/gst-masterclass",
      title: "GST Masterclass: Advanced Concepts",
      description: "A comprehensive course covering complex GST scenarios, dispute resolution, and recent case laws.",
      meta: ["12 Modules", "24 CPE Hours"]
    },
    {
      url: "/learning/ifrs-webinar",
      title: "Webinar: IFRS Updates & Implementation Challenges",
      description: "Join industry experts discussing recent IFRS amendments and practical implementation approaches.",
      meta: ["April 15, 2025", "3 CPE Hours"]
    },
    {
      url: "/learning/forensic-accounting",
      title: "Certificate Course: Forensic Accounting & Fraud Detection",
      description: "Develop specialized skills in forensic accounting, fraud investigation techniques, and evidence handling.",
      meta: ["8 Modules", "16 CPE Hours"]
    }
  ];

  // External links data
  const links = [
    {
      url: "https://www.icai.org",
      title: "ICAI Official Portal",
      description: "Institute of Chartered Accountants of India - Official website"
    },
    {
      url: "https://www.incometax.gov.in",
      title: "Income Tax Department",
      description: "Official Income Tax Department portal for e-filing and tax services"
    },
    {
      url: "https://www.gst.gov.in",
      title: "GST Portal",
      description: "Official GST portal for returns filing and GST compliance"
    },
    {
      url: "https://www.mca.gov.in",
      title: "Ministry of Corporate Affairs",
      description: "MCA portal for company registration and compliance"
    },
    {
      url: "https://www.taxmann.com",
      title: "Taxmann",
      description: "Tax and corporate laws research platform"
    },
    {
      url: "https://www.cbic.gov.in",
      title: "Central Board of Indirect Taxes & Customs",
      description: "Official CBIC website for customs and indirect tax information"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I earn CPE credit hours from your resources?",
      answer: "CPE credits are awarded upon completion of eligible courses and webinars. Each learning resource specifies the number of CPE hours available. Certificates are issued automatically upon completion of required assessments."
    },
    {
      question: "How frequently are tax resources updated?",
      answer: "Our tax resources are updated within 48 hours of any significant change in tax legislation, circulars, or notifications. All resources include a \"Last Updated\" timestamp for reference."
    },
    {
      question: "Can I access these resources on mobile devices?",
      answer: "Yes, our resource portal is fully responsive and optimized for mobile access. We also offer a dedicated mobile app for iOS and Android that allows offline access to downloaded resources."
    }
  ];

  // Handle email subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    if (!email.trim()) {
      setSubscribeStatus('Please enter your email');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/emailstorage/', { email });
  
      setSubscribeStatus(
        response.status === 201 
          ? 'Thank you for subscribing!' 
          : 'You are already subscribed.'
      );
  
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('Subscription failed. Please try again.');
    }
  
    // Clear message after 3 seconds
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  // Filter nav items
  const filterItems = [
    { id: "all", label: "All Resources" },
    { id: "notices", label: "Notices" },
    { id: "news", label: "News" },
    { id: "learning", label: "Learning" },
    { id: "links", label: "Links" }
  ];

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1 className="resources-heading">CA Professionals Resources</h1>
        <p className="resources-subtitle">
          Access the latest updates, educational resources, and professional tools for Chartered Accountants
        </p>
      </div>

      {/* Filter Navigation */}
      <div className="resources-filter" role="tablist">
        {filterItems.map(item => (
          <button 
            key={item.id}
            className={`filter-btn ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`${item.id}-panel`}
          >
            {item.label}
          </button>
        ))}
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
        <section 
          className="resources-section fade-in" 
          role="tabpanel" 
          id="notices-panel"
          aria-labelledby="notices-tab"
        >
          <div className="section-header">
            <Bell size={22} aria-hidden="true" />
            <h2 className="section-title">Important Notices</h2>
          </div>
          <div className="resources-items">
            {notices.map((notice, index) => (
              <ResourceItem key={index} item={notice} type="notice" />
            ))}
          </div>
          <NavLink to="/all-notices" className="see-all-link">
            View all notices <ExternalLink size={16} aria-hidden="true" />
          </NavLink>
        </section>
      )}

      {/* News and Updates Section */}
      {(activeTab === "all" || activeTab === "news") && (
        <section 
          className="resources-section fade-in"
          role="tabpanel"
          id="news-panel"
          aria-labelledby="news-tab"
        >
          <div className="section-header">
            <Newspaper size={22} aria-hidden="true" />
            <h2 className="section-title">News & Updates</h2>
          </div>
          <div className="resources-items">
            {news.map((item, index) => (
              <ResourceItem key={index} item={item} type="news" />
            ))}
          </div>
          <NavLink to="/all-news" className="see-all-link">
            View all news <ExternalLink size={16} aria-hidden="true" />
          </NavLink>
        </section>
      )}

      {/* Learning Resources Section */}
      {(activeTab === "all" || activeTab === "learning") && (
        <section 
          className="resources-section fade-in"
          role="tabpanel"
          id="learning-panel"
          aria-labelledby="learning-tab"
        >
          <div className="section-header">
            <BookOpen size={22} aria-hidden="true" />
            <h2 className="section-title">Learning Resources</h2>
          </div>
          <div className="resources-items">
            {learningResources.map((item, index) => (
              <ResourceItem key={index} item={item} type="learning" />
            ))}
          </div>
          <NavLink to="/all-learning" className="see-all-link">
            View all learning resources <ExternalLink size={16} aria-hidden="true" />
          </NavLink>
        </section>
      )}

      {/* Helpful Links Section */}
      {(activeTab === "all" || activeTab === "links") && (
        <section 
          className="resources-section fade-in"
          role="tabpanel"
          id="links-panel"
          aria-labelledby="links-tab"
        >
          <div className="section-header">
            <ExternalLink size={22} aria-hidden="true" />
            <h2 className="section-title">Professional Links</h2>
          </div>
          <div className="resources-items links-grid">
            {links.map((item, index) => (
              <ResourceItem key={index} item={item} type="link" />
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {activeTab === "all" && (
        <section className="resources-section fade-in">
          <div className="section-header">
            <HelpCircle size={22} aria-hidden="true" />
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <NavLink to="/faqs" className="see-all-link">
            View all FAQs <ExternalLink size={16} aria-hidden="true" />
          </NavLink>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for latest updates, resources, and professional insights</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribeStatus && (
            <p className="subscription-status">{subscribeStatus}</p>
          )}
          <p className="newsletter-note">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Resources;