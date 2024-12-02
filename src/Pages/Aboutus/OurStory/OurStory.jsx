import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OurStory = () => {
  return (
    <section className="our-story">
      <Container>
        <Row>
          <Col md={6}>
            <h2>Our Story</h2>
            <p>
              Founded in Kathmandu, Nepal, our CA firm has been providing high-quality accounting services for over
              15 years. We have a deep-rooted commitment to integrity and professionalism, which has earned us the trust
              of numerous clients. Our story is one of passion for numbers, a drive for excellence, and a commitment to
              making a positive impact on our clients' businesses and the economy at large.
            </p>
            <p>
              Over the years, we have been a part of numerous success stories, from helping startups navigate their
              financial challenges to providing audit and compliance services to large corporations. Our team of
              dedicated Chartered Accountants is always at the forefront of industry knowledge, ensuring that we
              provide solutions that are not just accurate but also forward-thinking.
            </p>
          </Col>
          <Col md={6}>
            <img src="public/Images/story.jpg" alt="Our Story" className="img-fluid rounded" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurStory;
