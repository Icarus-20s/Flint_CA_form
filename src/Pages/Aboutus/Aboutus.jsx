import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center">
              <h1>About K.B.P.S & Associates</h1>
              <p className="lead">A trusted partner for your financial success since 2017</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CA in Nepal Section */}
      <section className="ca-in-nepal py-5">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h2 className="section-title">Chartered Accountancy in Nepal</h2>
              <p className="intro-text">
                Chartered Accountants (CAs) in Nepal hold a critical position in the nation's financial ecosystem. As trusted financial advisors, auditors, and tax consultants, they are integral to the success of businesses and the economy. The profession is overseen by the Institute of Chartered Accountants of Nepal (ICAN), which ensures adherence to the highest standards of financial reporting, compliance, and ethics.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4} className="mb-4">
              <div className="ca-fact">
                <h4 className="fact-title">Expanding Demand for CA Professionals</h4>
                <p className="fact-text">
                  The demand for Chartered Accountants in Nepal has seen significant growth in recent years. As businesses evolve and expand, the need for qualified financial professionals who can navigate complex regulations and provide strategic guidance has never been higher. This has made the profession more attractive to a new generation of accounting professionals.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="ca-fact">
                <h4 className="fact-title">ICAN – Upholding Professional Standards</h4>
                <p className="fact-text">
                  The Institute of Chartered Accountants of Nepal (ICAN) is the authoritative body regulating the CA profession in Nepal. ICAN ensures that all Chartered Accountants maintain high standards of professionalism, ethics, and expertise, offering services in audit, taxation, corporate finance, and more. It plays a pivotal role in the growth and international recognition of the profession.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="ca-fact">
                <h4 className="fact-title">Global Recognition and Opportunities</h4>
                <p className="fact-text">
                  Nepali Chartered Accountants are recognized globally and are in demand by international firms. Many Nepalese CAs work abroad in multinational corporations, helping to bridge the gap between Nepalese businesses and global markets. Their expertise enables local companies to meet international financial standards and expand their reach globally.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="our-story py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <h2 className="section-title text-center mb-4">Our Story</h2>
              <Row className="align-items-center">
                <Col lg={6} className="mb-4">
                  <p>
                    K. B. P. S. & Associates, is a Chartered Accountants firm registered with the Institute of Chartered Accountants of Nepal with firm registration number 1200. We are dedicated to providing exceptional services across various domains. Our areas of expertise include Audit & Assurance, Tax Advisory, Corporate Advisory, and Consulting Services for both domestic and foreign companies.
                  </p>
                  <p>
                    We are well-prepared to handle professional assignments in the aforementioned areas. We have established a strong association with Chartered Accountants, Management Consultants, Company Secretaries, IT Professionals, and other experts. These collaborations enable us to offer a comprehensive range of services to our clients.
                  </p>
                  <p>
                    Each service area is led by experienced professionals who possess specialized knowledge, ensuring that our clients receive expert guidance in every aspect of our practice. As part of our commitment to our Mission Statement, we continuously strive to expand our knowledge in the ever-changing landscape of laws and regulations. This dedication enables us to provide our clients with up-to-date and comprehensive assistance.
                  </p>
                  <p>
                    At K. B. P. S. & Associates, we aim to deliver high-quality services, guided by our experienced team, extensive collaborations, and a relentless pursuit of knowledge. We are dedicated to meeting our clients' needs and exceeding their expectations in every aspect of our practice.
                  </p>
                </Col>
                <Col lg={6} className="mb-4">
                  <div className="story-image-container">
                    <img src="/Images/story.jpg" alt="Our Story" className="img-fluid rounded shadow" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="our-services py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Our Services</h2>
          <Row>
            <Col md={3} sm={6} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Audit & Assurance</h4>
                <p>Comprehensive audit services ensuring compliance with regulatory requirements and enhancing the credibility of financial statements.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-calculator"></i>
                </div>
                <h4>Tax Advisory</h4>
                <p>Strategic tax planning, compliance, and representation to help clients navigate complex tax laws and optimize their tax positions.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h4>Corporate Advisory</h4>
                <p>Expert guidance on corporate governance, structuring, mergers, acquisitions, and business strategies for sustainable growth.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
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

      {/* Our Values Section */}
      <section className="our-values py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <h2 className="section-title text-center mb-4">Our Firm's Core Values</h2>
              <div className="values-container">
                <Row>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-trophy value-icon"></i> Success</h4>
                      <p>Your success is at the core of our business. We are committed to delivering results that exceed expectations and drive your growth.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-sync value-icon"></i> Adaptability</h4>
                      <p>Change is an inevitable aspect of business. We continuously adapt to evolving environments and regulatory landscapes to provide relevant, up-to-date solutions.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-book value-icon"></i> Lifelong Learning</h4>
                      <p>We are committed to constant learning and staying at the forefront of industry developments. Our team is dedicated to acquiring new skills and knowledge to better serve our clients.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-brain value-icon"></i> Expertise</h4>
                      <p>A deep understanding of both legal principles and their practical application is fundamental to our work. We bring unparalleled expertise to every client interaction.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-users value-icon"></i> Collaboration</h4>
                      <p>Knowledge-sharing is integral to our approach. We believe in empowering our clients by providing valuable insights and fostering strong partnerships.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-clock value-icon"></i> Timeliness</h4>
                      <p>We prioritize delivering on time, ensuring that our solutions and services are always provided promptly and efficiently to meet your business needs.</p>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6} className="mb-4">
                    <div className="value-item">
                      <h4><i className="fas fa-award value-icon"></i> Excellence</h4>
                      <p>Our mission is to establish ourselves as a leading authority in assurance and related services, offering unparalleled quality and professionalism in everything we do.</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Vision Section */}
      <section className="our-vision py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <h2 className="section-title text-center mb-4">Our Vision</h2>
              <div className="vision-content">
                <p className="vision-statement">
                  To be recognized as a trusted and leading Chartered Accountants Firm, renowned for delivering exceptional financial and advisory services to our clients. We aspire to be the firm of choice for businesses, individuals, and organizations seeking expert guidance, innovative solutions, and unwavering integrity.
                </p>
                <h5 className="text-center my-4">Our vision is centered around the following key pillars:</h5>
                <Row>
                  <Col md={6} className="mb-4">
                    <div className="vision-pillar">
                      <h4><i className="fas fa-handshake pillar-icon"></i> Client Success</h4>
                      <p>We are committed to the success of our clients, understanding their unique needs, and providing tailored solutions that drive growth, maximize profitability, and ensure long-term financial stability.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="vision-pillar">
                      <h4><i className="fas fa-star pillar-icon"></i> Excellence and Expertise</h4>
                      <p>We strive for excellence in everything we do. With a team of highly skilled and knowledgeable professionals, we aim to deliver services of the highest quality, staying at the forefront of industry trends and best practices.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="vision-pillar">
                      <h4><i className="fas fa-shield-alt pillar-icon"></i> Trusted Advisors</h4>
                      <p>Building enduring relationships with our clients based on trust, transparency, and reliability is paramount. We aim to be their trusted advisors, providing strategic insights, proactive guidance, and ethical practices to navigate complex financial challenges.</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="vision-pillar">
                      <h4><i className="fas fa-lightbulb pillar-icon"></i> Innovation and Adaptability</h4>
                      <p>As the business landscape evolves, we embrace innovation and adaptability to stay ahead of the curve. We continuously invest in advanced technologies, training, and professional development to provide cutting-edge solutions and services.</p>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6} className="mb-4">
                    <div className="vision-pillar">
                      <h4><i className="fas fa-globe pillar-icon"></i> Social Responsibility</h4>
                      <p>We are committed to making a positive impact on society and our communities. We uphold ethical standards, contribute to the welfare of society, and actively engage in initiatives that promote sustainability, diversity, and inclusivity.</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team Section */}
      <section className="our-team py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Our Leadership Team</h2>
          <Row>
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <TeamMemberCard member={member} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="section-title text-center mb-5">What Our Clients Say</h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} className="mb-4" key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <i className="fas fa-quote-left quote-icon"></i>
                    <p>{testimonial.content}</p>
                    <div className="testimonial-author">
                      <h5>{testimonial.name}</h5>
                      <p className="text-muted">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Get In Touch</h2>
          <Row className="justify-content-center">
            <Col lg={4} md={6} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h4>Our Office</h4>
                <p>Putalisadak Chowk, Kathmandu, 44600, Nepal</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h4>Email Us</h4>
                <p>info@kbpsassociates.com.np</p>
                <p>contact@kbpsassociates.com.np</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h4>Call Us</h4>
                <p>+977-1-4221456</p>
                <p>+977-9851012345</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="team-card h-100">
      <div className="team-img-container">
        <Card.Img variant="top" src={member.img} alt={`${member.name} photo`} />
        <div className="team-social">
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="text-center">{member.name}</Card.Title>
        <Card.Subtitle className="text-center text-muted mb-3">{member.title}</Card.Subtitle>
        <div className="member-description">
          <p>
            {isExpanded ? member.summary : `${member.summary.slice(0, 100)}...`}
          </p>
          {isExpanded && (
            <ul className="member-highlights">
              {member.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          )}
          <Button 
            variant="link" 
            className="read-more-btn p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Team members data
const teamMembers = [
  {
    name: 'CA. Prabhav Krishna Khand',
    title: 'Managing Partner',
    img: '/Images/Ca_pranav.jpg',
    summary: 'Member of ICAI and ICAN with 5+ years of experience in assurance services and financial consulting. Prabhav leads our audit and assurance practice with a strong focus on quality and client satisfaction.',
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
    summary: 'Member of ICAI and ICAN with extensive experience in auditing and business consulting. Sunil brings valuable industry insight from his previous roles in corporate finance and international business operations.',
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
    summary: 'Member of ICAI and ICAN with expertise in taxation and advisory services. Diwakar leads our tax practice with a focus on optimizing tax positions while ensuring full compliance with regulatory requirements.',
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

export default Aboutus;