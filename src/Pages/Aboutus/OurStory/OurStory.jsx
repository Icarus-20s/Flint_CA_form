import React from 'react';
import { Row, Col } from 'react-bootstrap';
import "./ourStory.css";

const OurStory = () => {
  return (
    <section className="our-story py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">Our Story</h2>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <img src="public/Images/story.jpg" alt="Our Story" className="img-fluid rounded" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default OurStory;
