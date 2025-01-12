import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './OurPeople.css';

const OurPeople = () => {
  return (
    <section className="our-people py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Our Team Member</h2>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={member.img}
                    alt={`${member.name} photo`}
                    className="rounded-top"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold text-center">{member.name}</Card.Title>
                  <Card.Subtitle className="text-muted text-center mb-3">{member.title}</Card.Subtitle>
                  <PersonDescription summary={member.summary} highlights={member.highlights} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Toggleable description component
const PersonDescription = ({ summary, highlights }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxSummaryLength = 100;

  return (
    <div className="description-container">
      <p className="summary-text">
        {isExpanded ? (
          <>
            {summary}
            <ul className="list-unstyled">
              {highlights.map((highlight, i) => (
                <li key={i}>• {highlight}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {summary.slice(0, maxSummaryLength)}...
          </>
        )}
      </p>
      <div className="see-more-container">
        <Button
          variant="link"
          className="p-0 text-decoration-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'See More'}
        </Button>
      </div>
    </div>
  );
};

// Team member data
const teamMembers = [
  {
    name: 'CA. Prabhav Krishna Khand',
    title: 'Partner',
    img: '/public/Images/Ca_pranav.jpg',
    summary: 'Member of ICAI and ICAN with 5+ years of experience in assurance services.',
    highlights: [
      'Advised multinational and domestic clients on compliance and tax planning.',
      'Specialist in Accounting Policies and Financial Reporting Standards.',
    ],
  },
  {
    name: 'CA. Sunil Budhathoki',
    title: 'Partner',
    img: '/public/Images/Ca_Sunil.jpg',
    summary:
      'Member of ICAI and ICAN with extensive experience in auditing and business consulting.',
    highlights: [
      'Head of Accounts & Finance at Ventura Bottlers.',
      'Business Consultant at Reanda International Nepal.',
    ],
  },
  {
    name: 'CA. Diwakar Pandey',
    title: 'Manager, Tax Advisory',
    img: '/public/Images/Ca_diwakar.jpg',
    summary: 'Member of ICAI and ICAN with expertise in taxation and advisory services.',
    highlights: [
      'Tax compliance, negotiation, and audit.',
      'Consulted for various tax-related queries and corporate clients.',
    ],
  },
];

export default OurPeople;
