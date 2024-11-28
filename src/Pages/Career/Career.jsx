import React, { useState, useEffect } from 'react';
import api from "../../Api/api"; // Assuming you have a proper axios instance in this file
import "./Career.css";
import { useAuth } from '../../Context/AuthContextProvider';
import AppliedUsers from './Appliedusers/Appliedusers'; // Your AppliedUsers component
import { useLocation, useNavigate } from 'react-router-dom';

const Career = () => {
  const [careers, setCareers] = useState([]);
  const { isAuthenticated } = useAuth();
  const [careerDetail, setCareerDetail] = useState(null);
  const [application, setApplication] = useState({
    full_name: '',
    email: '',
    resumes: null,
    cover_letter: null,
    job: null,  // To store the job id
  });

  // State to toggle between Career page and Applied Users page
  const [isAppliedUsersView, setIsAppliedUsersView] = useState(false);

  // Fetch careers from backend
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await api.get('/career/');
        setCareers(response.data);
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    };
    fetchCareers();
  }, []);

  // Handle job application form input changes
  const handleApplicationChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resumes' || name === 'cover_letter') {
      setApplication((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setApplication((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    // Check if files are valid
    if (!validateFiles()) return;

    const formData = new FormData();
    formData.append('full_name', application.full_name);
    formData.append('email', application.email);

    // Check if resumes and cover letter exist before appending
    if (application.resumes) {
      formData.append('resumes', application.resumes);
    }

    if (application.cover_letter) {
      formData.append('cover_letter', application.cover_letter);
    }

    formData.append('job', careerDetail.id); // Attach the job ID

    try {
      const response = await api.post('/jobapplication/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
        },
      });

      if (response.status === 201) {
        alert('Application submitted successfully!');
        setCareerDetail(null); // Go back to career list after application
      } else {
        alert('There was an error submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  // File validation (e.g., max 5MB)
  const validateFiles = () => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (application.resumes && application.resumes.size > maxSize) {
      alert("Resume file is too large. Max size is 5MB.");
      return false;
    }
    if (application.cover_letter && application.cover_letter.size > maxSize) {
      alert("Cover letter file is too large. Max size is 5MB.");
      return false;
    }
    return true;
  };

  // Handle the cancel button click (go back to job list)
  const handleCancel = () => {
    setCareerDetail(null); // Reset career detail
    setApplication({ // Reset the application form
      full_name: '',
      email: '',
      resumes: null,
      cover_letter: null,
      job: null,
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Career Opportunities</h1>
      </header>

      {/* Conditional Rendering for Applied Users or Career Page */}
      {isAuthenticated && !isAppliedUsersView && (
        <button onClick={() => setIsAppliedUsersView(true)}>See Applied Users</button>
      )}

      {/* Applied Users Section */}
      {isAuthenticated && isAppliedUsersView && (
        <div>
          <AppliedUsers />
          <button onClick={() => setIsAppliedUsersView(false)}>Back to Career Opportunities</button>
        </div>
      )}

      {/* Job Details and Application Form */}
      {isAuthenticated && !isAppliedUsersView && careerDetail && (
        <div className="job-details">
          <h2>Job Details</h2>
          <p><strong>Title:</strong> {careerDetail.title}</p>
          <p><strong>Description:</strong> {careerDetail.description}</p>
          <p><strong>Location:</strong> {careerDetail.location}</p>
          <p><strong>Employment Type:</strong> {careerDetail.employment_type}</p>
          <p><strong>Deadline:</strong> {careerDetail.deadline}</p>

          <h3>Apply Now</h3>
          <form onSubmit={handleApplicationSubmit}>
            <input
              type="text"
              name="full_name"
              value={application.full_name}
              onChange={handleApplicationChange}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="email"
              value={application.email}
              onChange={handleApplicationChange}
              placeholder="Email"
              required
            />
            <input
              type="file"
              name="resumes"
              onChange={handleApplicationChange}
              required
            />
            <input
              type="file"
              name="cover_letter"
              onChange={handleApplicationChange}
            />
            <button type="submit">Submit Application</button>
          </form>
          <button onClick={handleCancel}>Cancel</button> {/* Cancel Button */}
        </div>
      )}

      {/* List of Careers (for navigation) */}
      {isAuthenticated && !isAppliedUsersView && (
        <div className="job-container">
          {careers.map((career) => (
            <div key={career.id} className="job-card">
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="job-location"><strong>Location:</strong> {career.location}</p>
              <p className="employment-type"><strong>Employment Type:</strong> {career.employment_type}</p>
              <button className="btn-apply" onClick={() => setCareerDetail(career)}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Career;
