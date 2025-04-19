import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css";
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  HelpCircle, 
  Bell, 
  Newspaper,
  Loader
} from "lucide-react";

import api from "../../Api/api";

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

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner-overlay">
      <Loader size={32} className="loading-spinner-icon" />
      <p>Loading resources...</p>
    </div>
  </div>
);

// Main Resources component
const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [email, setEmail] = useState("");
  
  // State for API data
  const [notices, setNotices] = useState([]);
  const [news, setNews] = useState([]);
  const [learningResources, setLearningResources] = useState([]);
  const [links, setLinks] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentVisible, setContentVisible] = useState(false);


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setContentVisible(false);
      
      try {
        // Fetch all resources in parallel
        const [noticesRes, newsRes, learningRes, linksRes, faqsRes] = await Promise.all([
          api.get(`/notices/`),
          api.get(`/news/`),
          api.get(`/learning/`),
          api.get(`/links/`),
          api.get(`/faqs/`),
        ]);
        
        setNotices(noticesRes.data);
        setNews(newsRes.data);
        setLearningResources(learningRes.data);
        setLinks(linksRes.data);
        setFaqs(faqsRes.data);
        setError(null);
        
        // Delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            setContentVisible(true);
          }, 100); // Small delay before showing content
        }, 300); // Minimum loading time for better UX
        
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab changes with smooth transitions
  const handleTabChange = (tabId) => {
    setContentVisible(false);
    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => {
        setContentVisible(true);
      }, 50);
    }, 200);
  };

  // Handle email subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    if (!email.trim()) {
      setSubscribeStatus('Please enter your email');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/emailstorage/`, { email });
  
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <HelpCircle size={32} />
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button 
            className="retry-button" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const contentClass = contentVisible ? 'content-visible' : '';

  return (
    <div className={`resources-container ${contentClass}`}>
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
            onClick={() => handleTabChange(item.id)}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`${item.id}-panel`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Featured Resource Banner */}
      <div className={`featured-resource ${contentClass}`}>
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
      {(activeTab === "all" || activeTab === "notices") && notices.length > 0 && (
        <section 
          className={`resources-section fade-in ${contentClass}`}
          role="tabpanel" 
          id="notices-panel"
          aria-labelledby="notices-tab"
        >
          <div className="section-header">
            <Bell size={22} aria-hidden="true" />
            <h2 className="section-title">Important Notices</h2>
          </div>
          <div className="resources-items">
            {notices.slice(0, 3).map((notice, index) => (
              <ResourceItem key={index} item={notice} type="notice" />
            ))}
          </div>
          {notices.length > 3 && (
            <NavLink to="/all-notices" className="see-all-link">
              View all notices <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* News and Updates Section */}
      {(activeTab === "all" || activeTab === "news") && news.length > 0 && (
        <section 
          className={`resources-section fade-in ${contentClass}`}
          role="tabpanel"
          id="news-panel"
          aria-labelledby="news-tab"
        >
          <div className="section-header">
            <Newspaper size={22} aria-hidden="true" />
            <h2 className="section-title">News & Updates</h2>
          </div>
          <div className="resources-items">
            {news.slice(0, 3).map((item, index) => (
              <ResourceItem key={index} item={item} type="news" />
            ))}
          </div>
          {news.length > 3 && (
            <NavLink to="/all-news" className="see-all-link">
              View all news <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Learning Resources Section */}
      {(activeTab === "all" || activeTab === "learning") && learningResources.length > 0 && (
        <section 
          className={`resources-section fade-in ${contentClass}`}
          role="tabpanel"
          id="learning-panel"
          aria-labelledby="learning-tab"
        >
          <div className="section-header">
            <BookOpen size={22} aria-hidden="true" />
            <h2 className="section-title">Learning Resources</h2>
          </div>
          <div className="resources-items">
            {learningResources.slice(0, 3).map((item, index) => (
              <ResourceItem key={index} item={item} type="learning" />
            ))}
          </div>
          {learningResources.length > 3 && (
            <NavLink to="/all-learning" className="see-all-link">
              View all learning resources <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Helpful Links Section */}
      {(activeTab === "all" || activeTab === "links") && links.length > 0 && (
        <section 
          className={`resources-section fade-in ${contentClass}`}
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
      {activeTab === "all" && faqs.length > 0 && (
        <section className={`resources-section fade-in ${contentClass}`}>
          <div className="section-header">
            <HelpCircle size={22} aria-hidden="true" />
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.slice(0, 3).map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          {faqs.length > 3 && (
            <NavLink to="/faqs" className="see-all-link">
              View all FAQs <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Newsletter Signup */}
      <section className={`newsletter-section ${contentClass}`}>
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