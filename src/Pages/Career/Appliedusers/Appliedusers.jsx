import React, { useEffect, useState } from 'react';
import "./Appliedusers.css";
import api from "../../../Api/api";

function Appliedusers() {
  const [applications, setApplications] = useState({}); // Default state as an empty object
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetching the applications data from API
    api.get('/jobapplications/')
      .then(response => {
        console.log('API Response:', response.data);
        setApplications(response.data || {});
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
        setError('Failed to load applications. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading applications...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Job Applications</h2>
      {Object.keys(applications).length > 0 ? (
        Object.keys(applications).map(department => (
          <ApplicationsTable
            key={department}
            department={department}
            applications={applications[department]}
          />
        ))
      ) : (
        <div className="alert alert-info text-center">No applications available.</div>
      )}
    </div>
  );
}

const ApplicationsTable = ({ department, applications }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{department} Applications</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Cover Letter</th>
                <th>Applied Date</th>
                <th>Job ID</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td>{application.full_name}</td>
                  <td>{application.email}</td>
                  <td>
                    <a
                      href={`http://localhost:8000${application.resumes}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-link"
                    >
                      View Resume
                    </a>
                  </td>
                  <td>
                    <a
                      href={`http://localhost:8000${application.cover_letter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-link"
                    >
                      View Cover Letter
                    </a>
                  </td>
                  <td>{new Date(application.applied_date).toLocaleDateString()}</td>
                  <td>{application.job}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appliedusers;