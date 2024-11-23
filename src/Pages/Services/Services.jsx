import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';
import Loader from '../../Loaders/Loader'; // Ensure you are importing the Loader component
import { useAuth } from '../../Context/AuthContextProvider'; // Import the authentication context

const Services = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from context
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  // Fetch services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); // Set loading to true when the request starts
      try {
        const response = await axios.get('http://127.0.0.1:8000/home/');
        setServices(response.data); // Update state with fetched services
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false if error occurs
        setError('Error fetching services. Please try again later.');
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
  };

  // Submit form to add a new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("You must be logged in to add a service.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/home/', newService);
      setServices([...services, response.data]); // Add the new service to the state
      setNewService({ title: '', description: '' }); // Reset the form
    } catch (error) {
      setError('Error adding service. Please try again later.'); // Set error message
      console.log('Error adding service:', error); // Handle errors
    }
  };

  return (
    <div className="services">
      <h1>Our Services</h1>
      
      {/* Conditional rendering of the form based on authentication */}
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newService.title}
            onChange={handleInputChange}
            placeholder="Service Title"
            required
          />
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            placeholder="Service Description"
            required
          />
          <button type="submit">Add Service</button>
        </form>
      )}

      {/* Error handling */}
      {error && <p className="error">{error}</p>}

      {/* Display loader while data is being fetched */}
      {loading ? (
        <Loader /> 
      ) : (
        <div className="service-list">
          {/* Display fetched services */}
          {services.length > 0 ? (
            services.map((service) => (
              <div className="service" key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
