import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Aboutus.css"; // Use a unique CSS filename
import { Linkedin } from 'lucide-react';

const Aboutus = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [visibleSection, setVisibleSection] = useState("");
    const navigate = useNavigate();

    // For testimonial navigation
    const nextTestimonial = () => {
        setActiveTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    // For section animations when scrolling
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(".kbps-section");

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add("kbps-visible");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // For tab navigation in Values & Vision section
    const [activeTab, setActiveTab] = useState("values");

    return (
        <div className="kbps-about-page">
            {/* Hero Section */}
            <section
                className="kbps-hero-section"
                style={{ backgroundImage: "url(images/about-us/hero-bg.jpg)" }}
            >
                <div className="kbps-hero-overlay"></div>
                <Container>
                    <div className="kbps-hero-content">
                        <h1 className="kbps-hero-title">
                            About K.B.P.S & Associates
                        </h1>
                        <div className="kbps-title-underline"></div>
                        <p className="kbps-hero-subtitle">
                            A trusted partner for your financial success since
                            2017
                        </p>
                    </div>
                </Container>
            </section>

            {/* Our Story Section */}
            <section className="kbps-section kbps-story-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">Our Story</h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <Row className="kbps-story-content align-items-center">
                        <Col
                            lg={5}
                            md={12}
                            className="kbps-story-image-wrapper"
                        >
                            <div className="kbps-story-image-container">
                                <img
                                    src="images/about-us/header.jpg"
                                    alt="Our Story"
                                    className="kbps-story-image"
                                />
                                <div className="kbps-experience-badge">
                                    <span className="kbps-years">7+</span>
                                    <span className="kbps-text">
                                        Years of Excellence
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col lg={7} md={12} className="kbps-story-text-wrapper">
                            <div className="kbps-story-text">
                                <h3 className="kbps-story-subtitle">
                                    Chartered Accountants with a Difference
                                </h3>
                                <p>
                                    K. B. P. S. & Associates, is a Chartered
                                    Accountants firm registered with the
                                    Institute of Chartered Accountants of Nepal
                                    with firm registration number 1200. We are
                                    dedicated to providing exceptional services
                                    across various domains.
                                </p>
                                <p>
                                    Our areas of expertise include Audit &
                                    Assurance, Tax Advisory, Corporate Advisory,
                                    and Consulting Services for both domestic
                                    and foreign companies.
                                </p>
                                <p>
                                    We have established a strong association
                                    with Chartered Accountants, Management
                                    Consultants, Company Secretaries, IT
                                    Professionals, and other experts. These
                                    collaborations enable us to offer a
                                    comprehensive range of services to our
                                    clients.
                                </p>
                                <p>
                                    Each service area is led by experienced
                                    professionals who possess specialized
                                    knowledge, ensuring that our clients receive
                                    expert guidance in every aspect of our
                                    practice.
                                </p>
                                <div className="kbps-story-signature">
                                    <strong>The K.B.P.S Team</strong>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CA in Nepal Section */}
            <section className="kbps-section kbps-ca-nepal-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">
                            Chartered Accountancy in Nepal
                        </h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <div className="kbps-intro-text-container text-center">
                        <p className="kbps-intro-text">
                            Chartered Accountants (CAs) in Nepal hold a critical
                            position in the nation's financial ecosystem. As
                            trusted financial advisors, auditors, and tax
                            consultants, they are integral to the success of
                            businesses and the economy. The profession is
                            overseen by the Institute of Chartered Accountants
                            of Nepal (ICAN), which ensures adherence to the
                            highest standards of financial reporting,
                            compliance, and ethics.
                        </p>
                    </div>

                    <Row className="kbps-facts-row">
                        <Col lg={4} md={6} sm={12} className="kbps-fact-col">
                            <div className="kbps-fact-card">
                                <div className="kbps-fact-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h4>Expanding Demand</h4>
                                <p>
                                    The demand for Chartered Accountants in
                                    Nepal has seen significant growth in recent
                                    years. As businesses evolve and expand, the
                                    need for qualified financial professionals
                                    who can navigate complex regulations and
                                    provide strategic guidance has never been
                                    higher.
                                </p>
                            </div>
                        </Col>

                        <Col lg={4} md={6} sm={12} className="kbps-fact-col">
                            <div className="kbps-fact-card">
                                <div className="kbps-fact-icon">
                                    <i className="fas fa-certificate"></i>
                                </div>
                                <h4>ICAN Standards</h4>
                                <p>
                                    The Institute of Chartered Accountants of
                                    Nepal (ICAN) is the authoritative body
                                    regulating the CA profession in Nepal. ICAN
                                    ensures that all Chartered Accountants
                                    maintain high standards of professionalism,
                                    ethics, and expertise.
                                </p>
                            </div>
                        </Col>

                        <Col lg={4} md={6} sm={12} className="kbps-fact-col">
                            <div className="kbps-fact-card">
                                <div className="kbps-fact-icon">
                                    <i className="fas fa-globe"></i>
                                </div>
                                <h4>Global Recognition</h4>
                                <p>
                                    Nepali Chartered Accountants are recognized
                                    globally and are in demand by international
                                    firms. Many Nepalese CAs work abroad in
                                    multinational corporations, helping to
                                    bridge the gap between Nepalese businesses
                                    and global markets.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Services Grid Section
            <section className="kbps-section kbps-services-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">Our Services</h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <Row className="kbps-services-grid">
                        <Col lg={3} md={6} sm={12} className="kbps-service-col">
                            <div className="kbps-service-card">
                                <div className="kbps-service-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h4>Audit & Assurance</h4>
                                <p>
                                    Comprehensive audit services ensuring
                                    compliance with regulatory requirements and
                                    enhancing the credibility of financial
                                    statements.
                                </p>
                                <div className="kbps-service-hover">
                                    <a href="#" className="kbps-service-link">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={6} sm={12} className="kbps-service-col">
                            <div className="kbps-service-card">
                                <div className="kbps-service-icon">
                                    <i className="fas fa-calculator"></i>
                                </div>
                                <h4>Tax Advisory</h4>
                                <p>
                                    Strategic tax planning, compliance, and
                                    representation to help clients navigate
                                    complex tax laws and optimize their tax
                                    positions.
                                </p>
                                <div className="kbps-service-hover">
                                    <a href="#" className="kbps-service-link">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={6} sm={12} className="kbps-service-col">
                            <div className="kbps-service-card">
                                <div className="kbps-service-icon">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                <h4>Corporate Advisory</h4>
                                <p>
                                    Expert guidance on corporate governance,
                                    structuring, mergers, acquisitions, and
                                    business strategies for sustainable growth.
                                </p>
                                <div className="kbps-service-hover">
                                    <a href="#" className="kbps-service-link">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={6} sm={12} className="kbps-service-col">
                            <div className="kbps-service-card">
                                <div className="kbps-service-icon">
                                    <i className="fas fa-laptop"></i>
                                </div>
                                <h4>Consulting Services</h4>
                                <p>
                                    Tailored consulting solutions addressing
                                    specific business challenges and
                                    opportunities for both domestic and
                                    international clients.
                                </p>
                                <div className="kbps-service-hover">
                                    <a href="#" className="kbps-service-link">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button
                            variant="outline-primary"
                            className="kbps-view-all-btn"
                            onClick={() => navigate("/services")}
                        >
                            View All Services
                        </Button>
                    </div>
                </Container>
            </section> */}

            {/* Values & Vision Section */}
            <section className="kbps-section kbps-values-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">Our Foundation</h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <div className="kbps-tabs-container">
                        <div className="kbps-tabs-header">
                            <button
                                className={`kbps-tab-btn ${
                                    activeTab === "values" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("values")}
                            >
                                <i className="fas fa-gem me-2"></i>Core Values
                            </button>
                            <button
                                className={`kbps-tab-btn ${
                                    activeTab === "vision" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("vision")}
                            >
                                <i className="fas fa-eye me-2"></i>Our Vision
                            </button>
                        </div>

                        <div className="kbps-tabs-content">
                            {/* Values Tab */}
                            <div
                                className={`kbps-tab-pane ${
                                    activeTab === "values" ? "active" : ""
                                }`}
                            >
                                <Row>
                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-trophy"></i>
                                            </div>
                                            <h4>Success</h4>
                                            <p>
                                                Your success is at the core of
                                                our business. We are committed
                                                to delivering results that
                                                exceed expectations and drive
                                                your growth.
                                            </p>
                                        </div>
                                    </Col>

                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-sync"></i>
                                            </div>
                                            <h4>Adaptability</h4>
                                            <p>
                                                Change is an inevitable aspect
                                                of business. We continuously
                                                adapt to evolving environments
                                                and regulatory landscapes.
                                            </p>
                                        </div>
                                    </Col>

                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-book"></i>
                                            </div>
                                            <h4>Lifelong Learning</h4>
                                            <p>
                                                We are committed to constant
                                                learning and staying at the
                                                forefront of industry
                                                developments.
                                            </p>
                                        </div>
                                    </Col>

                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-brain"></i>
                                            </div>
                                            <h4>Expertise</h4>
                                            <p>
                                                A deep understanding of both
                                                legal principles and their
                                                practical application is
                                                fundamental to our work.
                                            </p>
                                        </div>
                                    </Col>

                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-users"></i>
                                            </div>
                                            <h4>Collaboration</h4>
                                            <p>
                                                Knowledge-sharing is integral to
                                                our approach. We believe in
                                                empowering our clients by
                                                providing valuable insights.
                                            </p>
                                        </div>
                                    </Col>

                                    <Col
                                        md={6}
                                        lg={4}
                                        className="kbps-value-col"
                                    >
                                        <div className="kbps-value-card">
                                            <div className="kbps-value-icon">
                                                <i className="fas fa-award"></i>
                                            </div>
                                            <h4>Excellence</h4>
                                            <p>
                                                Our mission is to establish
                                                ourselves as a leading authority
                                                in assurance and related
                                                services.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Vision Tab */}
                            <div
                                className={`kbps-tab-pane ${
                                    activeTab === "vision" ? "active" : ""
                                }`}
                            >
                                <div className="kbps-vision-container">
                                    <div className="kbps-vision-statement">
                                        <p>
                                            To be recognized as a trusted and
                                            leading Chartered Accountants Firm,
                                            renowned for delivering exceptional
                                            financial and advisory services to
                                            our clients. We aspire to be the
                                            firm of choice for businesses,
                                            individuals, and organizations
                                            seeking expert guidance, innovative
                                            solutions, and unwavering integrity.
                                        </p>
                                    </div>

                                    <h5 className="kbps-vision-subtitle">
                                        Our vision is centered around the
                                        following key pillars:
                                    </h5>

                                    <Row>
                                        <Col md={6} className="kbps-pillar-col">
                                            <div className="kbps-vision-pillar">
                                                <div className="kbps-pillar-icon">
                                                    <i className="fas fa-handshake"></i>
                                                </div>
                                                <h4>Client Success</h4>
                                                <p>
                                                    We are committed to the
                                                    success of our clients,
                                                    understanding their unique
                                                    needs, and providing
                                                    tailored solutions.
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={6} className="kbps-pillar-col">
                                            <div className="kbps-vision-pillar">
                                                <div className="kbps-pillar-icon">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <h4>
                                                    Excellence and Expertise
                                                </h4>
                                                <p>
                                                    We strive for excellence in
                                                    everything we do. With a
                                                    team of highly skilled
                                                    professionals at the
                                                    forefront of industry
                                                    trends.
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={6} className="kbps-pillar-col">
                                            <div className="kbps-vision-pillar">
                                                <div className="kbps-pillar-icon">
                                                    <i className="fas fa-shield-alt"></i>
                                                </div>
                                                <h4>Trusted Advisors</h4>
                                                <p>
                                                    Building enduring
                                                    relationships with our
                                                    clients based on trust,
                                                    transparency, and
                                                    reliability is paramount.
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={6} className="kbps-pillar-col">
                                            <div className="kbps-vision-pillar">
                                                <div className="kbps-pillar-icon">
                                                    <i className="fas fa-lightbulb"></i>
                                                </div>
                                                <h4>
                                                    Innovation and Adaptability
                                                </h4>
                                                <p>
                                                    As the business landscape
                                                    evolves, we embrace
                                                    innovation and adaptability
                                                    to stay ahead of the curve.
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Team Section */}
            <section className="kbps-section kbps-team-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">
                            Our Leadership Team
                        </h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <Row className="kbps-team-row">
                        {teamMembers.map((member, index) => (
                            <Col
                                lg={4}
                                md={6}
                                sm={12}
                                key={index}
                                className="kbps-team-col"
                            >
                                <KbpsTeamCard member={member} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Testimonials Section */}
            <section className="kbps-section kbps-testimonial-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">
                            What Our Clients Say
                        </h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <div className="kbps-testimonial-container">
                        <div className="kbps-testimonial-card">
                            <div className="kbps-quote-icon">
                                <i className="fas fa-quote-left"></i>
                            </div>

                            <div className="kbps-testimonial-content">
                                <p>{testimonials[activeTestimonial].content}</p>
                            </div>

                            <div className="kbps-testimonial-author">
                                <h5>{testimonials[activeTestimonial].name}</h5>
                                <p>
                                    {testimonials[activeTestimonial].position}
                                </p>
                            </div>
                        </div>

                        <div className="kbps-testimonial-controls">
                            <button
                                className="kbps-testimonial-btn"
                                onClick={prevTestimonial}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            <div className="kbps-testimonial-indicators">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`kbps-indicator ${
                                            idx === activeTestimonial
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveTestimonial(idx)
                                        }
                                    ></button>
                                ))}
                            </div>

                            <button
                                className="kbps-testimonial-btn"
                                onClick={nextTestimonial}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="kbps-section kbps-contact-section">
                <Container>
                    <div className="kbps-section-header text-center">
                        <h2 className="kbps-section-title">Get In Touch</h2>
                        <div className="kbps-section-divider"></div>
                    </div>

                    <Row className="kbps-contact-row">
                        <Col lg={4} md={4} sm={12} className="kbps-contact-col">
                            <div className="kbps-contact-card">
                                <div className="kbps-contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="kbps-contact-info">
                                    <h4>Our Office</h4>
                                    <p>
                                        Putalisadak Chowk, Kathmandu, 44600,
                                        Nepal
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12} className="kbps-contact-col">
                            <div className="kbps-contact-card">
                                <div className="kbps-contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="kbps-contact-info">
                                    <h4>Email Us</h4>
                                    <p>info@kbps.com.np</p>
                                    <p>contact@kbps.com.np</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12} className="kbps-contact-col">
                            <div className="kbps-contact-card">
                                <div className="kbps-contact-icon">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="kbps-contact-info">
                                    <h4>Call Us</h4>
                                    <p>+977-1-4221456</p>
                                    <p>+977-9851012345</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="kbps-cta-container text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            className="kbps-contact-cta"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Us Today
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

// Team Member Card Component
const KbpsTeamCard = ({ member }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`kbps-team-card ${isFlipped ? "flipped" : ""}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className="kbps-team-card-inner">
                {/* Front Side */}
                <div className="kbps-team-card-front">
                    <div className="kbps-member-img-container">
                        <img
                            src={member.img}
                            alt={`${member.name} photo`}
                            className="kbps-member-img"
                        />
                    </div>
                    <div className="kbps-member-info">
                        <h4>{member.name}</h4>
                        <p>{member.title}</p>
                    </div>
                </div>

                {/* Back Side */}
                <div className="kbps-team-card-back">
                    <div className="kbps-member-details">
                        <h4>{member.name}</h4>
                        <p className="kbps-member-title">{member.title}</p>
                        <p className="kbps-member-bio">{member.summary}</p>
                        <div className="kbps-member-social">
                            <a href={member.url} className="kbps-social-link">
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Team members data
const teamMembers = [
    {
        name: "CA. Prabhav Krishna Khand",
        title: "Managing Partner",
        img: "images/profiles/Ca_pranav.jpg",
        summary:
            "Member of ICAI and ICAN with 5+ years of experience in assurance services and financial consulting.",
        url: "https://www.linkedin.com/in/ca-prabhav-krishna-khand-71788bb0"
    },
    {
        name: "CA. Sunil Budhathoki",
        title: "Partner",
        img: "images/profiles/Ca_Sunil.jpg",
        summary:
        "Member of ICAI and ICAN with extensive experience in auditing and business consulting.",
        url: "https://www.linkedin.com/in/sunil-budhathoki-chartered-accountant-4597a7109"
    },
    {
        name: "CA. Diwakar Pandey",
        title: "Manager, Tax Advisory",
        img: "images/profiles/Ca_diwakar.jpg",
        summary:
            "Member of ICAI and ICAN with expertise in taxation and advisory services.",
        url: "https://www.linkedin.com/in/ca-diwakar-pandey-61783574"
    },
];

// Testimonials data
const testimonials = [
    {
        content:
            "K.B.P.S & Associates has been instrumental in helping our business navigate complex financial challenges. Their expertise and dedication to client success have made them an invaluable partner for our company.",
        name: "Rajesh Sharma",
        position: "CEO, Everest Technologies",
    },
    {
        content:
            "The team at K.B.P.S provides exceptional service with a personal touch. Their understanding of our industry and commitment to excellence has helped us achieve significant growth over the past three years.",
        name: "Sunita Thapa",
        position: "CFO, Himalayan Exports Ltd.",
    },
    {
        content:
            "Working with the professionals at K.B.P.S has been a game-changer for our financial operations. Their proactive approach and strategic guidance have helped us optimize our tax position while ensuring full compliance.",
        name: "Anil Gurung",
        position: "Director, Nepal Trading Co.",
    },
];

export default Aboutus;
