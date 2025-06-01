import React, { useEffect, useState, useCallback } from 'react';
import "./Appliedusers.css";
import api from "../../../Api/api";

/**
 * AppliedUsers component displays job applications organized by department
 * with functionality to view and manage applications
 */
function AppliedUsers() {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Memoize the fetchApplications function to prevent unnecessary re-renders
  const fetchApplications = useCallback(() => {
    setLoading(true);
    setError(null);
    
    api.get('/jobapplications/')
      .then(response => {
            if (response.status !== 200) {
        throw new Error('Failed to fetch services');  
      }
        else if (response.data && Object.keys(response.data).length > 0) {
          setApplications(response.data);
        } else {
          setApplications({});
        }
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
        setError(
          error.response?.data?.message || 
          'Failed to load applications. Please try again later.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (applicationId, department) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await api.delete(`jobapplication/delete/${applicationId}/`);
      
      // Update the state by removing the deleted application
      setApplications(prevApplications => {
        const updatedApplications = { ...prevApplications };
        updatedApplications[department] = updatedApplications[department].filter(
          app => app.id !== applicationId
        );
        
        // If a department becomes empty, check if we should remove it
        if (updatedApplications[department].length === 0) {
          delete updatedApplications[department];
        }
        
        return updatedApplications;
      });
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'toast-notification success';
      notification.textContent = 'Application deleted successfully';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
      
    } catch (error) {
      console.error('Error deleting application:', error);
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'toast-notification error';
      notification.textContent = 'Failed to delete application. Please try again.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRefresh = () => {
    fetchApplications();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">
          <h4>Error Loading Applications</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={handleRefresh}
            disabled={loading}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (Object.keys(applications).length === 0) {
    return (
      <div className="container mt-5">
        <div className="empty-state">
          <h2 className="text-center mb-4">Job Applications</h2>
          <div className="card shadow">
            <div className="card-body text-center p-5">
              <i className="fa fa-folder-open fa-3x mb-3 text-muted"></i>
              <h3>No Applications Available</h3>
              <p className="text-muted">There are currently no job applications submitted.</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={handleRefresh}
                disabled={loading}
              >
                <i className="fa fa-refresh mr-2"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render applications by department
  return (
    <div className="applications-container">
      <div className="applications-header">
        <h2>Job Applications</h2>
        <button 
          className="btn btn-outline-primary refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          <i className="fa fa-refresh mr-2"></i> Refresh
        </button>
      </div>
      
      <div className="applications-summary">
        <div className="summary-card">
          <h3>{Object.keys(applications).length}</h3>
          <p>Departments</p>
        </div>
        <div className="summary-card">
          <h3>
            {Object.values(applications).reduce((total, apps) => total + apps.length, 0)}
          </h3>
          <p>Total Applications</p>
        </div>
      </div>
      
      {Object.keys(applications).map(department => (
        <ApplicationsTable
          key={department}
          department={department}
          applications={applications[department]}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}

const ApplicationsTable = ({ department, applications, onDelete, isDeleting }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{department} Applications</h5>
          <span className="badge bg-primary">{applications.length}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Documents</th>
                <th scope="col">Applied Date</th>
                <th scope="col">Job ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td data-label="Name" className="font-weight-bold">{application.full_name}</td>
                  <td data-label="Email">
                    <a href={`mailto:${application.email}`}>
                      {application.email}
                    </a>
                  </td>
                  <td data-label="Documents">
                    <div className="btn-group">
                      <a
                        href={`http://localhost:8000${application.resumes}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary"
                        title="View Resume"
                      >
                        <i className="fa fa-file-text mr-1"></i> Resume
                      </a>
                      <a
                        href={`http://localhost:8000${application.cover_letter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary"
                        title="View Cover Letter"
                      >
                        <i className="fa fa-envelope mr-1"></i> Cover Letter
                      </a>
                    </div>
                  </td>
                  <td data-label="Applied Date">{formatDate(application.applied_date)}</td>
                  <td data-label="Job ID">
                    <span className="job-id">{application.job}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button
                        className="btn btn-outline-info btn-sm view-btn"
                        title="View Details"
                        onClick={() => alert('View details functionality to be implemented')}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm delete-btn"
                        title="Delete Application"
                        onClick={() => onDelete(application.id, department)}
                        disabled={isDeleting}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date in a more readable format
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default AppliedUsers;