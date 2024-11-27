import React from "react";
import "./Appliedusers.css"; // Import the styles

const AppliedUsers = () => {
  const applicants = [
    { name: "John Doe", email: "john.doe@example.com", position: "Senior Accountant", resume: "resume1.pdf", date: "2024-11-22" },
    { name: "Jane Smith", email: "jane.smith@example.com", position: "Tax Consultant", resume: "resume2.pdf", date: "2024-11-21" },
    { name: "Mike Lee", email: "mike.lee@example.com", position: "Junior Auditor", resume: "resume3.pdf", date: "2024-11-20" },
    // Add more applicants as needed
  ];

  return (
    <div className="table-container">
      <h2>Applicants List</h2>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Resume</th>
            <th>Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.position}</td>
              <td><a href={`#${applicant.resume}`} className="resume-link">View</a></td>
              <td>{applicant.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedUsers;
