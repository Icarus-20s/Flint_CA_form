import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OurValues = () => {
  return (
    <section className="our-values">
      <Container>
        <Row>
          <Col md={12}>
            <h2>Our Values</h2>
            <ul className="values-list">
              <li><strong>Integrity:</strong> We uphold the highest ethical standards, ensuring trust and transparency in every engagement.</li>
              <li><strong>Excellence:</strong> We strive for excellence in all our services, ensuring we deliver results that exceed expectations.</li>
              <li><strong>Client-Centric:</strong> Our clients are at the heart of everything we do. We focus on providing personalized solutions to meet their specific needs.</li>
              <li><strong>Innovation:</strong> We embrace technology and innovative approaches to enhance the value we bring to clients.</li>
              <li><strong>Professionalism:</strong> We maintain a strong commitment to our profession, delivering expert services with reliability and confidentiality.</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurValues;
