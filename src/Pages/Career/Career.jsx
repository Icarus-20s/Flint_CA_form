import React from 'react';

const Career = () => {
  return (
    <div className="career">
      {/* Career Introduction Section */}
      <div className="career-intro">
        <h2>Join Our Team</h2>
        <p>We are always looking for talented individuals to join our growing team. Explore our current job openings and internship opportunities below, or reach out if you think you’d be a great fit.</p>
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        {/* Job Card 1 */}
        <div className="job-card">
          <img src="job-image1.jpg" alt="Tax Consultant" />
          <h4>Tax Consultant</h4>
          <p>Join our team as a tax consultant and assist clients with tax planning and compliance strategies.</p>
          <a href="#apply">Apply Now</a>
        </div>

        {/* Job Card 2 */}
        <div className="job-card">
          <img src="job-image2.jpg" alt="Accountant" />
          <h4>Accountant</h4>
          <p>We are seeking a detail-oriented accountant to manage our clients' financial records and reports.</p>
          <a href="#apply">Apply Now</a>
        </div>

        {/* Job Card 3 */}
        <div className="job-card">
          <img src="job-image3.jpg" alt="Business Analyst" />
          <h4>Business Analyst</h4>
          <p>As a business analyst, you will help companies optimize their processes and boost profitability.</p>
          <a href="#apply">Apply Now</a>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="application-form">
        <h3>Submit Your Application</h3>
        <form action="#" method="POST">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Cover Letter</label>
            <textarea id="message" name="message" placeholder="Tell us why you'd be a great fit!" required></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default Career;
