import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aboutus.css';

const AboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="about-us-page">
      {/* Hero Section with Parallax Effect */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <Row className="align-items-center justify-content-center">
            <Col lg={10} className="text-center">
              <div className="hero-text-container">
                <h1 className="hero-title">About K.B.P.S & Associates</h1>
                <div className="title-underline"></div>
                <p className="hero-subtitle">A trusted partner for your financial success since 2017</p>
                <Button variant="primary" className="hero-cta-button" onClick={()=>{
                  navigate('/services');
                }}>Our Services</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story Section with Animation */}
      <section className="our-story-section py-5">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Our Story</h2>
            <div className="section-divider"></div>
          </div>
          <Row className="align-items-center story-content">
            <Col lg={6} className="mb-4 story-image-col">
              <div className="story-image-container">
                <img src="/Images/story.jpg" alt="Our Story" className="img-fluid rounded shadow story-image" />
                <div className="experience-badge">
                  <span className="years">7+</span>
                  <span className="text">Years of Excellence</span>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mb-4">
              <div className="story-text">
                <h3 className="story-subtitle">Chartered Accountants with a Difference</h3>
                <p>
                  K. B. P. S. & Associates, is a Chartered Accountants firm registered with the Institute of Chartered Accountants of Nepal with firm registration number 1200. We are dedicated to providing exceptional services across various domains.
                </p>
                <p>
                  Our areas of expertise include Audit & Assurance, Tax Advisory, Corporate Advisory, and Consulting Services for both domestic and foreign companies.
                </p>
                <p>
                  We have established a strong association with Chartered Accountants, Management Consultants, Company Secretaries, IT Professionals, and other experts. These collaborations enable us to offer a comprehensive range of services to our clients.
                </p>
                <p>
                  Each service area is led by experienced professionals who possess specialized knowledge, ensuring that our clients receive expert guidance in every aspect of our practice.
                </p>
                <div className="story-signature">
                  <strong>The K.B.P.S Team</strong>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CA in Nepal Section with Cards */}
      <section className="ca-in-nepal-section py-5 bg-light">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Chartered Accountancy in Nepal</h2>
            <div className="section-divider"></div>
          </div>
          <Row>
            <Col md={12} className="text-center mb-5">
              <p className="intro-text">
                Chartered Accountants (CAs) in Nepal hold a critical position in the nation's financial ecosystem. As trusted financial advisors, auditors, and tax consultants, they are integral to the success of businesses and the economy. The profession is overseen by the Institute of Chartered Accountants of Nepal (ICAN), which ensures adherence to the highest standards of financial reporting, compliance, and ethics.
              </p>
            </Col>
          </Row>
          <Row className="ca-facts-row">
            <Col md={4} className="mb-4">
              <div className="ca-fact-card">
                <div className="ca-fact-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4 className="fact-title">Expanding Demand for CA Professionals</h4>
                <p className="fact-text">
                  The demand for Chartered Accountants in Nepal has seen significant growth in recent years. As businesses evolve and expand, the need for qualified financial professionals who can navigate complex regulations and provide strategic guidance has never been higher.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="ca-fact-card">
                <div className="ca-fact-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h4 className="fact-title">ICAN – Upholding Professional Standards</h4>
                <p className="fact-text">
                  The Institute of Chartered Accountants of Nepal (ICAN) is the authoritative body regulating the CA profession in Nepal. ICAN ensures that all Chartered Accountants maintain high standards of professionalism, ethics, and expertise.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="ca-fact-card">
                <div className="ca-fact-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h4 className="fact-title">Global Recognition and Opportunities</h4>
                <p className="fact-text">
                  Nepali Chartered Accountants are recognized globally and are in demand by international firms. Many Nepalese CAs work abroad in multinational corporations, helping to bridge the gap between Nepalese businesses and global markets.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section with Hover Effects */}
      <section className="services-section py-5">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Our Services</h2>
            <div className="section-divider"></div>
          </div>
          <Row className="mt-5">
            <Col lg={3} md={6} sm={12} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Audit & Assurance</h4>
                <p>Comprehensive audit services ensuring compliance with regulatory requirements and enhancing the credibility of financial statements.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-calculator"></i>
                </div>
                <h4>Tax Advisory</h4>
                <p>Strategic tax planning, compliance, and representation to help clients navigate complex tax laws and optimize their tax positions.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h4>Corporate Advisory</h4>
                <p>Expert guidance on corporate governance, structuring, mergers, acquisitions, and business strategies for sustainable growth.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-laptop"></i>
                </div>
                <h4>Consulting Services</h4>
                <p>Tailored consulting solutions addressing specific business challenges and opportunities for both domestic and international clients.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values & Vision Tabbed Section */}
      <section className="values-vision-section py-5 bg-light">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Our Foundation</h2>
            <div className="section-divider"></div>
          </div>
          <div className="tab-container">
            <ul className="nav nav-tabs nav-justified" id="foundationTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="values-tab" data-bs-toggle="tab" data-bs-target="#values" type="button" role="tab" aria-controls="values" aria-selected="true">
                  <i className="fas fa-gem me-2"></i>Core Values
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="vision-tab" data-bs-toggle="tab" data-bs-target="#vision" type="button" role="tab" aria-controls="vision" aria-selected="false">
                  <i className="fas fa-eye me-2"></i>Our Vision
                </button>
              </li>
            </ul>
            <div className="tab-content" id="foundationTabsContent">
              {/* Values Tab */}
              <div className="tab-pane fade show active" id="values" role="tabpanel" aria-labelledby="values-tab">
                <div className="tab-inner-content">
                  <Row>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-trophy"></i>
                        </div>
                        <h4>Success</h4>
                        <p>Your success is at the core of our business. We are committed to delivering results that exceed expectations and drive your growth.</p>
                      </div>
                    </Col>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-sync"></i>
                        </div>
                        <h4>Adaptability</h4>
                        <p>Change is an inevitable aspect of business. We continuously adapt to evolving environments and regulatory landscapes.</p>
                      </div>
                    </Col>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-book"></i>
                        </div>
                        <h4>Lifelong Learning</h4>
                        <p>We are committed to constant learning and staying at the forefront of industry developments.</p>
                      </div>
                    </Col>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-brain"></i>
                        </div>
                        <h4>Expertise</h4>
                        <p>A deep understanding of both legal principles and their practical application is fundamental to our work.</p>
                      </div>
                    </Col>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-users"></i>
                        </div>
                        <h4>Collaboration</h4>
                        <p>Knowledge-sharing is integral to our approach. We believe in empowering our clients by providing valuable insights.</p>
                      </div>
                    </Col>
                    <Col md={6} lg={4} className="mb-4">
                      <div className="value-item">
                        <div className="value-icon">
                          <i className="fas fa-award"></i>
                        </div>
                        <h4>Excellence</h4>
                        <p>Our mission is to establish ourselves as a leading authority in assurance and related services.</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              
              {/* Vision Tab */}
              <div className="tab-pane fade" id="vision" role="tabpanel" aria-labelledby="vision-tab">
                <div className="tab-inner-content">
                  <div className="vision-wrapper">
                    <div className="vision-statement">
                      <p>
                        To be recognized as a trusted and leading Chartered Accountants Firm, renowned for delivering exceptional financial and advisory services to our clients. We aspire to be the firm of choice for businesses, individuals, and organizations seeking expert guidance, innovative solutions, and unwavering integrity.
                      </p>
                    </div>
                    <h5 className="text-center my-4">Our vision is centered around the following key pillars:</h5>
                    <Row>
                      <Col md={6} className="mb-4">
                        <div className="vision-pillar">
                          <div className="pillar-icon">
                            <i className="fas fa-handshake"></i>
                          </div>
                          <h4>Client Success</h4>
                          <p>We are committed to the success of our clients, understanding their unique needs, and providing tailored solutions.</p>
                        </div>
                      </Col>
                      <Col md={6} className="mb-4">
                        <div className="vision-pillar">
                          <div className="pillar-icon">
                            <i className="fas fa-star"></i>
                          </div>
                          <h4>Excellence and Expertise</h4>
                          <p>We strive for excellence in everything we do. With a team of highly skilled professionals at the forefront of industry trends.</p>
                        </div>
                      </Col>
                      <Col md={6} className="mb-4">
                        <div className="vision-pillar">
                          <div className="pillar-icon">
                            <i className="fas fa-shield-alt"></i>
                          </div>
                          <h4>Trusted Advisors</h4>
                          <p>Building enduring relationships with our clients based on trust, transparency, and reliability is paramount.</p>
                        </div>
                      </Col>
                      <Col md={6} className="mb-4">
                        <div className="vision-pillar">
                          <div className="pillar-icon">
                            <i className="fas fa-lightbulb"></i>
                          </div>
                          <h4>Innovation and Adaptability</h4>
                          <p>As the business landscape evolves, we embrace innovation and adaptability to stay ahead of the curve.</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Team Section with Card Flip Effect */}
      <section className="team-section py-5">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Our Leadership Team</h2>
            <div className="section-divider"></div>
          </div>
          <Row className="mt-5">
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} className="mb-5" key={index}>
                <TeamMemberCard member={member} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section with Carousel */}
      <section className="testimonials-section py-5 bg-light">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="section-divider"></div>
          </div>
          <div className="testimonial-carousel mt-5">
            <div className="testimonial-slide">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>{testimonials[activeTestimonial].content}</p>
                <div className="testimonial-author">
                  <h5>{testimonials[activeTestimonial].name}</h5>
                  <p>{testimonials[activeTestimonial].position}</p>
                </div>
              </div>
            </div>
            <div className="carousel-controls">
              <button className="carousel-control" onClick={prevTestimonial}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="carousel-indicators">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`carousel-indicator ${idx === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(idx)}
                  ></button>
                ))}
              </div>
              <button className="carousel-control" onClick={nextTestimonial}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section with Animation */}
      <section className="contact-section py-5">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider"></div>
          </div>
          <Row className="contact-details mt-5">
            <Col lg={4} md={4} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-info">
                  <h4>Our Office</h4>
                  <p>Putalisadak Chowk, Kathmandu, 44600, Nepal</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-info">
                  <h4>Email Us</h4>
                  <p>info@kbpsassociates.com.np</p>
                  <p>contact@kbpsassociates.com.np</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-info">
                  <h4>Call Us</h4>
                  <p>+977-1-4221456</p>
                  <p>+977-9851012345</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

// Team Member Card Component with Flip Effect
const TeamMemberCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className={`team-card-container ${isFlipped ? 'flipped' : ''}`} onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <div className="team-card-inner">
        {/* Front Side */}
        <div className="team-card-front">
          <div className="team-img-container">
            <img src={member.img} alt={`${member.name} photo`} className="team-img" />
          </div>
          <div className="team-card-content">
            <h4 className="member-name">{member.name}</h4>
            <p className="member-title">{member.title}</p>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="team-card-back">
          <div className="team-card-back-content">
            <h4 className="member-name">{member.name}</h4>
            <p className="member-title">{member.title}</p>
            <p className="member-summary">{member.summary}</p>
            <div className="member-social">
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fas fa-envelope"></i></a>
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
    name: 'CA. Prabhav Krishna Khand',
    title: 'Managing Partner',
    img: '/Images/Ca_pranav.jpg',
    summary: 'Member of ICAI and ICAN with 5+ years of experience in assurance services and financial consulting.',
    highlights: [
      'Advised multinational and domestic clients on compliance and tax planning.',
      'Specialist in Accounting Policies and Financial Reporting Standards.',
      'Certified in International Financial Reporting Standards (IFRS).',
      'Regular speaker at industry conferences and professional forums.'
    ],
  },
  {
    name: 'CA. Sunil Budhathoki',
    title: 'Partner',
    img: '/Images/Ca_Sunil.jpg',
    summary: 'Member of ICAI and ICAN with extensive experience in auditing and business consulting.',
    highlights: [
      'Former Head of Accounts & Finance at Ventura Bottlers.',
      'Business Consultant at Reanda International Nepal.',
      'Expert in financial restructuring and corporate governance.',
      'Specialized in cross-border transactions and international taxation.'
    ],
  },
  {
    name: 'CA. Diwakar Pandey',
    title: 'Manager, Tax Advisory',
    img: '/Images/Ca_diwakar.jpg',
    summary: 'Member of ICAI and ICAN with expertise in taxation and advisory services.',
    highlights: [
      'Specialized in tax compliance, negotiation, and audit defense.',
      'Consulted for various high-profile clients on complex tax matters.',
      'Former tax consultant at a Big Four accounting firm.',
      'Regular contributor to taxation publications and professional journals.'
    ],
  },
];

// Testimonials data
const testimonials = [
  {
    content: "K.B.P.S & Associates has been instrumental in helping our business navigate complex financial challenges. Their expertise and dedication to client success have made them an invaluable partner for our company.",
    name: "Rajesh Sharma",
    position: "CEO, Everest Technologies"
  },
  {
    content: "The team at K.B.P.S provides exceptional service with a personal touch. Their understanding of our industry and commitment to excellence has helped us achieve significant growth over the past three years.",
    name: "Sunita Thapa",
    position: "CFO, Himalayan Exports Ltd."
  },
  {
    content: "Working with the professionals at K.B.P.S has been a game-changer for our financial operations. Their proactive approach and strategic guidance have helped us optimize our tax position while ensuring full compliance.",
    name: "Anil Gurung",
    position: "Director, Nepal Trading Co."
  }
];

export default AboutUs;