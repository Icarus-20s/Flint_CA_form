import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CaInNepal = () => {
  return (
    <section className="ca-in-nepal">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2>Chartered Accountancy in Nepal</h2>
            <p className="intro-text">
              Chartered Accountants (CAs) play a crucial role in Nepal's economy. As trusted financial advisors,
              auditors, and tax consultants, CAs are integral to both the corporate and public sectors. The profession
              is regulated by the Institute of Chartered Accountants of Nepal (ICAN), ensuring the highest standards
              of financial services and compliance.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="ca-fact">
              <h4>Growth of CA Professionals</h4>
              <p>
                The demand for Chartered Accountants in Nepal is growing rapidly, with an increasing number of graduates
                choosing to pursue CA as a career. As businesses expand and financial regulations become more complex,
                the need for qualified professionals is more pronounced than ever.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="ca-fact">
              <h4>ICAN – The Governing Body</h4>
              <p>
                ICAN is the national body for Chartered Accountants in Nepal, responsible for maintaining the standards
                and ethical guidelines for the profession. The institute ensures that CAs in Nepal are well-trained, ethical,
                and capable of offering top-tier accounting services.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="ca-fact">
              <h4>Global Recognition</h4>
              <p>
                Nepali CAs are globally recognized and often work in international firms, helping Nepalese businesses
                achieve international standards and expand beyond borders.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CaInNepal;
