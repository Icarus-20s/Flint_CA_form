import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import "./Resources.css";
import LoadingSpinner from "../../Loaders/LoadingSpinner";

// Resource card component with different variations
const ResourceCard = ({ item, variant }) => {
  switch(variant) {
    case "notification":
      return (
        <div className="notification-card">
          <span className="card-date">{item.date}</span>
          <a href={item.url} className="card-anchor">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-summary">{item.description}</p>
            <span className={`card-badge ${item.tagType || ""}`}>{item.tag}</span>
          </a>
        </div>
      );
    case "article":
      return (
        <div className="article-card">
          <img src={item.image} alt={item.imageAlt} className="article-image" />
          <div className="article-body">
            <span className="card-date">{item.date}</span>
            <NavLink to={item.url} className="card-anchor">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-summary">{item.description}</p>
            </NavLink>
            <span className="card-badge">{item.tag}</span>
          </div>
        </div>
      );
    case "educational":
      return (
        <div className="educational-card">
          <div className="card-icon">
            <FileText size={28} />
          </div>
          <NavLink to={item.url} className="card-anchor">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-summary">{item.description}</p>
            <div className="card-metadata">
              {item.meta.map((meta, index) => (
                <span key={index} className="metadata-item">{meta}</span>
              ))}
            </div>
          </NavLink>
        </div>
      );
    case "external":
      return (
        <div className="external-card">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="card-anchor">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-summary">{item.description}</p>
            <div className="link-icon">
              <ExternalLink size={16} />
            </div>
          </a>
        </div>
      );
    default:
      return null;
  }
};

// FAQ component
const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="faq-accordion">
      <button 
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3>{question}</h3>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'expanded' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

// Loading component
const LoadingState = () => (
  <LoadingSpinner />
);

// Main component
const CAProfessionalResources = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [emailInput, setEmailInput] = useState("");
  
  // State for API data
  const [notices, setNotices] = useState([]);
  const [news, setNews] = useState([]);
  const [learningResources, setLearningResources] = useState([]);
  const [links, setLinks] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setIsContentVisible(false);
      
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
        setFetchError(null);
        
        // Animation timing
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsContentVisible(true);
          }, 100);
        }, 300);
        
      } catch (err) {
        console.error("Error fetching resources:", err);
        setFetchError("Unable to load resources. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Handle tab transitions
  const switchTab = (tabId) => {
    setIsContentVisible(false);
    setTimeout(() => {
      setCurrentTab(tabId);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 50);
    }, 200);
  };

  // Handle newsletter subscription
  const handleEmailSubscription = async (e) => {
    e.preventDefault();
  
    if (!emailInput.trim()) {
      setNewsletterStatus('Please enter a valid email address');
      return;
    }

    try {
      // Replace with actual API endpoint
      const response = await api.post(`emailstorage/`, { email: emailInput });
  
      setNewsletterStatus('Thank you for subscribing to our newsletter!');
      setEmailInput('');
    } catch (error) {
      console.error('Subscription error:', error);
      setNewsletterStatus('Subscription failed. Please try again.');
    }
  
    // Clear message after delay
    setTimeout(() => setNewsletterStatus(''), 3000);
  };

  // Navigation tabs
  const tabOptions = [
    { id: "all", label: "All Resources" },
    { id: "notices", label: "Notifications & Alerts" },
    { id: "news", label: "Industry News" },
    { id: "learning", label: "Learning Material" },
    { id: "links", label: "Professional Links" }
  ];

  if (isLoading) {
    return <LoadingState />;
  }

  if (fetchError) {
    return (
      <div className="error-wrapper">
        <div className="error-container">
          <HelpCircle size={32} />
          <h2>Resource Loading Error</h2>
          <p>{fetchError}</p>
          <button 
            className="refresh-button" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const contentClassNames = isContentVisible ? 'content-visible' : '';

  return (
    <div className={`ca-resources-wrapper ${contentClassNames}`}>
      <header className="page-header">
        <h1 className="page-title">CA Professionals Resources</h1>
        <p className="page-subtitle">
          Access the latest updates, educational resources, and professional tools for Chartered Accountants
        </p>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-navigation" role="tablist">
        {tabOptions.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? "active" : ""}`}
            onClick={() => switchTab(tab.id)}
            role="tab"
            aria-selected={currentTab === tab.id}
            aria-controls={`${tab.id}-panel`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Spotlight Feature */}
      <div className={`spotlight-feature ${contentClassNames}`}>
        <div className="spotlight-content">
          <span className="spotlight-tag">Spotlight Resource</span>
          <h2>Updated GST Compliance Framework 2025</h2>
          <p>
            New GST compliance framework effective April 1, 2025. Access comprehensive guide, compliance 
            checklists, and implementation strategies for seamless transition.
          </p>
          <NavLink to="/resources/gst-compliance-2025" className="spotlight-button">
            Access Resource
          </NavLink>
        </div>
      </div>

      {/* Notifications Section */}
      {(currentTab === "all" || currentTab === "notices") && notices.length > 0 && (
        <section 
          className={`content-section animate-in ${contentClassNames}`}
          role="tabpanel" 
          id="notices-panel"
          aria-labelledby="notices-tab"
        >
          <div className="section-heading">
            <Bell size={22} aria-hidden="true" />
            <h2>Important Notifications</h2>
          </div>
          <div className="card-grid">
            {notices.slice(0, 3).map((notice, index) => (
              <ResourceCard key={index} item={notice} variant="notification" />
            ))}
          </div>
          {notices.length > 3 && (
            <NavLink to="/all-notices" className="view-all-link">
              View all notifications <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* News Section */}
      {(currentTab === "all" || currentTab === "news") && news.length > 0 && (
        <section 
          className={`content-section animate-in ${contentClassNames}`}
          role="tabpanel"
          id="news-panel"
          aria-labelledby="news-tab"
        >
          <div className="section-heading">
            <Newspaper size={22} aria-hidden="true" />
            <h2>Industry News & Updates</h2>
          </div>
          <div className="card-grid">
            {news.slice(0, 3).map((item, index) => (
              <ResourceCard key={index} item={item} variant="article" />
            ))}
          </div>
          {news.length > 3 && (
            <NavLink to="/all-news" className="view-all-link">
              View all news <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Learning Section */}
      {(currentTab === "all" || currentTab === "learning") && learningResources.length > 0 && (
        <section 
          className={`content-section animate-in ${contentClassNames}`}
          role="tabpanel"
          id="learning-panel"
          aria-labelledby="learning-tab"
        >
          <div className="section-heading">
            <BookOpen size={22} aria-hidden="true" />
            <h2>Learning Materials</h2>
          </div>
          <div className="card-grid">
            {learningResources.slice(0, 3).map((item, index) => (
              <ResourceCard key={index} item={item} variant="educational" />
            ))}
          </div>
          {learningResources.length > 3 && (
            <NavLink to="/all-learning" className="view-all-link">
              View all learning materials <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Links Section */}
      {(currentTab === "all" || currentTab === "links") && links.length > 0 && (
        <section 
          className={`content-section animate-in ${contentClassNames}`}
          role="tabpanel"
          id="links-panel"
          aria-labelledby="links-tab"
        >
          <div className="section-heading">
            <ExternalLink size={22} aria-hidden="true" />
            <h2>Professional Resources</h2>
          </div>
          <div className="link-grid">
            {links.map((item, index) => (
              <ResourceCard key={index} item={item} variant="external" />
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {currentTab === "all" && faqs.length > 0 && (
        <section className={`content-section animate-in ${contentClassNames}`}>
          <div className="section-heading">
            <HelpCircle size={22} aria-hidden="true" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.slice(0, 3).map((faq, index) => (
              <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          {faqs.length > 3 && (
            <NavLink to="/faqs" className="view-all-link">
              View all FAQs <ExternalLink size={16} aria-hidden="true" />
            </NavLink>
          )}
        </section>
      )}

      {/* Newsletter */}
      <section className={`newsletter-container ${contentClassNames}`}>
        <div className="newsletter-wrapper">
          <h2>Stay Informed</h2>
          <p>Subscribe to our newsletter for latest updates, resources, and professional insights</p>
          <form className="subscribe-form" onSubmit={handleEmailSubscription}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              aria-label="Email address"
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
          {newsletterStatus && (
            <p className="subscription-message">{newsletterStatus}</p>
          )}
          <p className="privacy-note">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default CAProfessionalResources;