import React, { useState } from 'react';
import "./Joblist.css"

function JobList() {
  const [jobs] = useState([
    {
      title: 'Frontend Developer',
      location: 'Remote',
      description: 'Build beautiful and responsive user interfaces using ReactJS.',
      qualifications: ['Proficient in ReactJS', 'Experience with state management', 'Knowledge of CSS/HTML'],
    },
    {
      title: 'Backend Developer',
      location: 'New York, NY',
      description: 'Work on the server-side of applications, develop APIs and optimize performance.',
      qualifications: ['Experience with Node.js', 'Familiarity with databases (MongoDB, SQL)', 'RESTful API design'],
    }
  ]);

  return (
    <section className="job-listings">
      <h2>Current Job Openings</h2>
      {jobs.map((job, index) => (
        <div className="job-card" key={index}>
          <h3>{job.title}</h3>
          <p><strong>Location:</strong> {job.location}</p>
          <p>{job.description}</p>
          <h4>Qualifications</h4>
          <ul>
            {job.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
          <button>Apply Now</button>
        </div>
      ))}
    </section>
  );
}

export default JobList;
