import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const OurPeople = () => {
  return (
    <section className="our-people">
      <Container>
        <h2>Our People</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/public/Images/img1.jpg" />
              <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Text>
                  Chartered Accountant and Senior Partner with over 20 years of experience in audit, taxation, and financial consulting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="public/Images/img3.jpg" />
              <Card.Body>
                <Card.Title>Jane Smith</Card.Title>
                <Card.Text>
                  Specializing in corporate tax planning and compliance, Jane has helped numerous multinational corporations streamline their operations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="public/Images/img2.jpg" />
              <Card.Body>
                <Card.Title>Raj Kumar</Card.Title>
                <Card.Text>
                  With a focus on financial consulting and business strategy, Raj has been instrumental in transforming small businesses into successful enterprises.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurPeople;
