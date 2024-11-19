import React from 'react';
import './Contactus.css';

const Contactus = () => {
  return (
    <div className="contact-us">
      <section className="contact-form-section" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-form">
            <h3>Get In Touch</h3>
            <form action="mailto:your-email@example.com" method="POST" encType="text/plain">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
          <div className="contact-details">
            <h3>How Can We Help?</h3>
            <p>Our team of Chartered Accountants is here to assist you with financial planning, tax advisory, bookkeeping, and more. Let us help you grow and manage your business with expert guidance!</p>
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> your-email@example.com</p>
            <p><strong>Phone:</strong> +1 234 567 890</p>
            <p><strong>Address:</strong> 123 Business St, City, Country</p>
          </div>
        </div>
      </section>

      <section className="google-map">
        <h3>Find Us On The Map</h3>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.6545953368477!2d-79.3832!3d43.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ2l0eSwgQ2FsaWZvcm5pYSBCdWlkbGluZywgQ2FuYWRh!5e0!3m2!1sen!2sus!4v1642471321320!5m2!1sen!2sus"
            width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
