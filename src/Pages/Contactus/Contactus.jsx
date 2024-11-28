import React, { useState } from 'react';
import api from "../../Api/api"; // API helper for making requests
import './Contactus.css';
import Loader from "../../Loaders/Loader"; // Loader for feedback during submission

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(''); // State to store error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await api.post('contact/', formData);

      if (response.status === 200) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        {/* Display error message if present */}
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </label>

        <label htmlFor="subject">
          Subject:
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
          />
        </label>

        <label htmlFor="message">
          Message:
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
          ></textarea>
        </label>

        {/* Submit button with loading animation */}
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {loading && (
            <div className="loader-wrapper">
              <Loader size={16} color="#fff" /> {/* Adjusted loader size */}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contactus;
