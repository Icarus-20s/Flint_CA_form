import React from 'react';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <section className="about-us" id="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p className="intro">
          We are a team of professional Chartered Accountants dedicated to providing expert financial solutions to individuals and businesses alike.
        </p>
        <div className="values">
          <div className="value">
            <h3>Our Mission</h3>
            <p>
              Our mission is to empower businesses and individuals with expert financial advice, ensuring their long-term success and growth.
            </p>
          </div>
          <div className="value">
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and reliable financial partner, providing innovative solutions to all financial challenges.
            </p>
          </div>
          <div className="value">
            <h3>Our Values</h3>
            <ul>
              <li>Integrity</li>
              <li>Transparency</li>
              <li>Commitment to Excellence</li>
              <li>Client-Centric Approach</li>
            </ul>
          </div>
        </div>

        <div className="team">
          <h3>Meet the Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src="team-member1.jpg" alt="Team Member 1" />
              <h4>John Doe</h4>
              <p>Partner</p>
            </div>
            <div className="team-member">
              <img src="team-member2.jpg" alt="Team Member 2" />
              <h4>Jane Smith</h4>
              <p>Senior Accountant</p>
            </div>
            <div className="team-member">
              <img src="team-member3.jpg" alt="Team Member 3" />
              <h4>Emily Johnson</h4>
              <p>Tax Consultant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
