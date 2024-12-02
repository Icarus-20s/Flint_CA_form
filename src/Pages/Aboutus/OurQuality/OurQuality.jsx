import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OurQuality = () => {
  return (
    <section className="our-quality">
      <Container>
        <Row>
          <Col md={12}>
            <h2>Our Quality</h2>
            <p>
              We are committed to providing top-quality accounting services by adhering to global standards and
              continuously improving our processes. Our team undergoes regular professional development training, and
              we are proud of the certifications and accolades we have received for our commitment to excellence.
            </p>
            <ul>
              <li>ISO 9001:2015 Certified</li>
              <li>ICAN Accreditation</li>
              <li>Consistent Recognition by Industry Bodies</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurQuality;
