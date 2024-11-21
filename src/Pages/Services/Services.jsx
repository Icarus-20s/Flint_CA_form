import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  // Fetch services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/home/');
        setServices(response.data); // Update state with fetched services
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
    try {
      const response = await axios.post('http://127.0.0.1:8000/home/', newService);
      setServices([...services, response.data]); // Add the new service to the state
      setNewService({ title: '', description: '' }); // Reset the form
    } catch (error) {
      console.log('Error adding service:', error); // Handle errors
    }
  };

  return (
    <div className="services">
      <h1>Our Services</h1>
      
      {/* Form to add a new service */}
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

      {/* Display fetched services */}
      <div className="service-list">
        {loading ? (
          <p>Loading services...</p>
        ) : (
          services.length > 0 ? (
            services.map((service) => (
              <div className="service" key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )
        )}
      </div>
    </div>
  );
};

export default Services;
