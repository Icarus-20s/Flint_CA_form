import React from 'react';
import { Row, Col } from 'react-bootstrap';
import "./ourValues.css";

const OurValues = () => {
  return (
    <section className="our-values py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">Our Firm's Core Values</h2>
          <div className="values-list">
            <ul>
              <li><strong>Success:</strong> Your success is at the core of our business. We are committed to delivering results that exceed expectations and drive your growth.</li>
              <li><strong>Adaptability:</strong> Change is an inevitable aspect of business. We continuously adapt to evolving environments and regulatory landscapes to provide relevant, up-to-date solutions.</li>
              <li><strong>Lifelong Learning:</strong> We are committed to constant learning and staying at the forefront of industry developments. Our team is dedicated to acquiring new skills and knowledge to better serve our clients.</li>
              <li><strong>Expertise:</strong> A deep understanding of both legal principles and their practical application is fundamental to our work. We bring unparalleled expertise to every client interaction.</li>
              <li><strong>Collaboration:</strong> Knowledge-sharing is integral to our approach. We believe in empowering our clients by providing valuable insights and fostering strong partnerships.</li>
              <li><strong>Timeliness:</strong> We prioritize delivering on time, ensuring that our solutions and services are always provided promptly and efficiently to meet your business needs.</li>
              <li><strong>Excellence:</strong> Our mission is to establish ourselves as a leading authority in assurance and related services, offering unparalleled quality and professionalism in everything we do.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default OurValues;
