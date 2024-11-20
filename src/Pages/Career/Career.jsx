import React from 'react';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import JobList from './jobList/JobList';
import Benefits from './Benefits/Benefits';
import ApplicationForm from './ApplicationForm/ApplicationForm';

const Career = () => {
  return (
    <div className="career">
      <CompanyInfo />
      <JobList />
      <Benefits />
      <ApplicationForm />
     </div>
  );
};

export default Career;
