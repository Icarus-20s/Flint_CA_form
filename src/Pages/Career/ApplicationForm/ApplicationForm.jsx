import React, { useState } from 'react';
import "./Application.css"
function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Your application has been submitted!');
  };

  return (
    <section className="application-form">
      <h2>Apply Now</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Resume:
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </label>
        <label>
          Cover Letter:
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </section>
  );
}

export default ApplicationForm;
