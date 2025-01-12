import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CaInNepal = () => {
  return (
    <section className="ca-in-nepal">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2 className="section-title">Chartered Accountancy in Nepal</h2>
            <p className="intro-text">
              Chartered Accountants (CAs) in Nepal hold a critical position in the nation's financial ecosystem. As trusted financial advisors, auditors, and tax consultants, they are integral to the success of businesses and the economy. The profession is overseen by the Institute of Chartered Accountants of Nepal (ICAN), which ensures adherence to the highest standards of financial reporting, compliance, and ethics.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="ca-fact card-hover-effect">
              <h4 className="fact-title">Expanding Demand for CA Professionals</h4>
              <p className="fact-text">
                The demand for Chartered Accountants in Nepal has seen significant growth in recent years. As businesses evolve and expand, the need for qualified financial professionals who can navigate complex regulations and provide strategic guidance has never been higher. This has made the profession more attractive to a new generation of accounting professionals.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="ca-fact card-hover-effect">
              <h4 className="fact-title">ICAN – Upholding Professional Standards</h4>
              <p className="fact-text">
                The Institute of Chartered Accountants of Nepal (ICAN) is the authoritative body regulating the CA profession in Nepal. ICAN ensures that all Chartered Accountants maintain high standards of professionalism, ethics, and expertise, offering services in audit, taxation, corporate finance, and more. It plays a pivotal role in the growth and international recognition of the profession.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="ca-fact card-hover-effect">
              <h4 className="fact-title">Global Recognition and Opportunities</h4>
              <p className="fact-text">
                Nepali Chartered Accountants are recognized globally and are in demand by international firms. Many Nepalese CAs work abroad in multinational corporations, helping to bridge the gap between Nepalese businesses and global markets. Their expertise enables local companies to meet international financial standards and expand their reach globally.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CaInNepal;
