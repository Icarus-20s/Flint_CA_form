import React from 'react';
import './EmployeeReviews.css';

const EmployeeReviews = () => {
    const reviews = [
        {
            name: 'John Doe',
            photo: 'images/employee/img2.jpg', // Replace with actual image URL
            review: 'Working here has been an amazing experience. I get to work on exciting projects with a great team. The environment is supportive, and I am always learning new things.'
        },
        {
            name: 'Jane Smith',
            photo: 'images/employee/img3.jpg', // Replace with actual image URL
            review: 'The company culture is fantastic! I appreciate the flexibility and the opportunity to grow in my career. My colleagues are great, and I love the challenges we tackle together.'
        },
        {
            name: 'Alex Johnson',
            photo: 'images/employee/img1.jpg', // Replace with actual image URL
            review: 'I’m proud to be part of this team. There’s a strong focus on innovation and continuous improvement. I’ve learned so much here and am excited for the future.'
        }
    ];

    return (
        <section className="employee-reviews">
            <h2> Newly Hired</h2>
            <div className="review-container">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <img src={review.photo} alt={review.name} />
                        <h3>{review.name}</h3>
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EmployeeReviews;
